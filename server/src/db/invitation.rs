use diesel::insert_into;
use diesel::prelude::*;
use http::status::StatusCode;
use sendgrid::v3::Sender;

use crate::app_settings::AppSettings;
use crate::db::{get_conn, PgPool};
use crate::email::*;
use crate::errors::ServiceError;
use crate::models::credential::*;
use crate::models::invitation::*;

pub fn create_invitation(
    invitation_form: InvitationForm,
    app_settings: &AppSettings,
    sender: &Sender,
    pool: &PgPool,
) -> Result<(), ServiceError> {
    use crate::schema::invitations::dsl::*;

    let conn = get_conn(pool)?;
    let invitation = insert_into(invitations)
        .values(Invitation::from(invitation_form.email))
        .get_result(&conn)?;
    let code = send_invitation(invitation, &sender, &app_settings)?;
    match code {
        StatusCode::ACCEPTED => Ok(()),
        StatusCode::BAD_REQUEST => Err(ServiceError::BadRequest {
            info: format!("InvalidEmail"),
        }),
        _ => Err(ServiceError::InternalServerError),
    }
}

pub fn create_reset_password_invitation(
    invitation_form: InvitationForm,
    app_settings: &AppSettings,
    sender: &Sender,
    pool: &PgPool,
) -> Result<(), ServiceError> {
    use crate::schema::credentials::dsl::*;
    use crate::schema::invitations::dsl::*;

    let conn = get_conn(pool)?;
    let _: Credential = credentials
        .filter(crate::schema::credentials::dsl::email.eq(&invitation_form.email))
        .first(&conn)
        .map_err(|err| match err {
            diesel::result::Error::NotFound => ServiceError::BadRequest {
                info: format!("InvalidEmail"),
            },
            _ => ServiceError::InternalServerError,
        })?;

    let invitation = insert_into(invitations)
        .values(Invitation::from(invitation_form.email))
        .get_result(&conn)?;
    let code = send_reset_password_invitation(invitation, &sender, &app_settings)?;
    match code {
        StatusCode::ACCEPTED => Ok(()),
        StatusCode::BAD_REQUEST => Err(ServiceError::BadRequest {
            info: format!("InvalidEmail"),
        }),
        _ => Err(ServiceError::InternalServerError),
    }
}
