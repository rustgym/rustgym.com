use crate::db::{get_conn, PgPool};
use crate::errors::ServiceError;
use crate::models::user::{User, UserForm};
use diesel::prelude::*;
use diesel::update;

pub fn get_user(user_id: i32, pool: &PgPool) -> Result<User, ServiceError> {
    use crate::schema::users::dsl::*;

    let conn = get_conn(pool)?;
    let user: User = users.find(user_id).first(&conn).map_err(|err| match err {
        diesel::result::Error::NotFound => ServiceError::BadRequest {
            info: format!("NotFound"),
        },
        _ => ServiceError::InternalServerError,
    })?;
    Ok(user)
}

pub fn update_user(
    user: User,
    user_id: i32,
    user_form: UserForm,
    pool: &PgPool,
) -> Result<User, ServiceError> {
    use crate::schema::users::dsl::*;
    if user.id != user_id {
        return Err(ServiceError::Forbidden);
    }
    let conn = get_conn(pool)?;
    let user: User = update(users.find(user_id))
        .set(&user_form)
        .get_result(&conn)?;
    Ok(user)
}

pub fn list_user(pool: &PgPool) -> Result<Vec<User>, ServiceError> {
    use crate::schema::users::dsl::*;

    let conn = get_conn(pool)?;
    let list: Vec<User> = users.load(&conn)?;
    Ok(list)
}