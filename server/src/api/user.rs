use actix_web::{web, HttpResponse};

use crate::db;
use crate::errors::ServiceError;
use crate::models::user::{User, UserForm};

pub async fn get_user(
    _: User,
    info: web::Path<(i32,)>,
    pool: web::Data<db::PgPool>,
) -> Result<HttpResponse, ServiceError> {
    db::user::get_user(info.0, &pool).map(|user| HttpResponse::Ok().json(user))
}

pub async fn update_user(
    user: User,
    info: web::Path<(i32,)>,
    user_form: web::Form<UserForm>,
    pool: web::Data<db::PgPool>,
) -> Result<HttpResponse, ServiceError> {
    db::user::update_user(user, info.0, user_form.into_inner(), &pool)
        .map(|updated_user| HttpResponse::Ok().json(updated_user))
}

pub async fn list_user(_: User, pool: web::Data<db::PgPool>) -> Result<HttpResponse, ServiceError> {
    db::user::list_user(&pool).map(|users| HttpResponse::Ok().json(users))
}
