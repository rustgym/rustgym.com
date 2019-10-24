use diesel::prelude::*;
use diesel::result::Error::NotFound;
use diesel::{insert_into, update};
use time::Duration;

use crate::app_settings::AppSettings;
use crate::db::{get_conn, PgPool};
use crate::errors::ServiceError;
use crate::models::auth::*;
use crate::models::credential::*;
use crate::models::invitation::*;
use crate::models::user::*;

pub fn process_signup_form(
    signup_form: SignupForm,
    app_settings: &AppSettings,
    pool: &PgPool,
) -> Result<(User, Credential), ServiceError> {
    use crate::schema::credentials::dsl::*;
    use crate::schema::invitations::dsl::*;
    use crate::schema::users::dsl::*;

    let conn = get_conn(pool)?;

    let invitation: Invitation = invitations
        .find(signup_form.invitation_id)
        .first(&conn)
        .map_err(|error| match error {
            NotFound => ServiceError::BadRequest {
                info: format!("InvalidUuid"),
            },
            _ => ServiceError::InternalServerError,
        })?;
    let duration = Duration::minutes(app_settings.expiration_in_minutes as i64);
    if invitation.is_expired(duration) {
        return Err(ServiceError::BadRequest {
            info: format!("InvitationExpired"),
        });
    }
    if invitation.email != signup_form.email {
        return Err(ServiceError::BadRequest {
            info: format!("InvalidEmail"),
        });
    }

    let cs: Vec<Credential> = credentials
        .filter(crate::schema::credentials::dsl::email.eq(&signup_form.email))
        .load(&conn)
        .map_err(|_| ServiceError::InternalServerError)?;
    if cs.len() > 0 {
        return Err(ServiceError::BadRequest {
            info: format!("EmailExists"),
        });
    }

    let user: User = insert_into(users)
        .values((
            first_name.eq(signup_form.first_name),
            last_name.eq(signup_form.last_name),
            middle_name.eq(signup_form.middle_name),
        ))
        .get_result(&conn)
        .map_err(|_| ServiceError::InternalServerError)?;

    let credential: Credential = insert_into(credentials)
        .values(Credential::new(
            user.id,
            signup_form.email,
            signup_form.password,
            app_settings.local_salt.to_string(),
        ))
        .get_result(&conn)
        .map_err(|_| ServiceError::InternalServerError)?;

    Ok((user, credential))
}

pub fn process_signin_form(
    signin_form: SigninForm,
    app_settings: &AppSettings,
    pool: &PgPool,
) -> Result<i32, ServiceError> {
    use crate::schema::credentials::dsl::*;

    let conn = get_conn(pool)?;

    let credential: Credential = credentials
        .filter(email.eq(signin_form.email))
        .first(&conn)
        .map_err(|err| match err {
            diesel::result::Error::NotFound => ServiceError::BadRequest {
                info: format!("Invalid"),
            },
            _ => ServiceError::InternalServerError,
        })?;
    if credential.compare(signin_form.password, app_settings.local_salt.to_string()) {
        Ok(credential.user_id)
    } else {
        Err(ServiceError::BadRequest {
            info: format!("Invalid"),
        })
    }
}

pub fn process_reset_password_form(
    reset_password_form: ResetPasswordForm,
    app_settings: &AppSettings,
    pool: &PgPool,
) -> Result<Credential, ServiceError> {
    use crate::schema::credentials::dsl::*;
    use crate::schema::invitations::dsl::*;
    let conn = get_conn(pool)?;

    let invitation: Invitation = invitations
        .find(reset_password_form.invitation_id)
        .first(&conn)
        .map_err(|error| match error {
            NotFound => ServiceError::BadRequest {
                info: format!("InvalidUuid"),
            },
            _ => ServiceError::InternalServerError,
        })?;
    let duration = Duration::minutes(app_settings.expiration_in_minutes as i64);
    if invitation.is_expired(duration) {
        return Err(ServiceError::BadRequest {
            info: format!("InvitationExpired"),
        });
    }
    if invitation.email != reset_password_form.email {
        return Err(ServiceError::BadRequest {
            info: format!("InvalidEmail"),
        });
    }
    let credential: Credential = credentials
        .filter(crate::schema::credentials::dsl::email.eq(&reset_password_form.email))
        .first(&conn)
        .map_err(|_| ServiceError::InternalServerError)?;
    let credential: Credential = credential.update_password(
        reset_password_form.password,
        app_settings.local_salt.to_string(),
    );
    let credential: Credential = update(credentials.find(credential.id))
        .set(&credential)
        .get_result(&conn)?;
    Ok(credential)
}
