use actix_web::{web, HttpResponse};
use futures::future::Future;

use crate::db;
use crate::errors::ServiceError;
use crate::models::user::{User, UserForm};

pub fn get_user(
    _: User,
    info: web::Path<(i32,)>,
    pool: web::Data<db::PgPool>,
) -> impl Future<Item = HttpResponse, Error = ServiceError> {
    web::block(move || db::user::get_user(info.0, &pool))
        .from_err()
        .map(|user| HttpResponse::Ok().json(user))
}

pub fn update_user(
    user: User,
    info: web::Path<(i32,)>,
    user_form: web::Form<UserForm>,
    pool: web::Data<db::PgPool>,
) -> impl Future<Item = HttpResponse, Error = ServiceError> {
    web::block(move || db::user::update_user(user, info.0, user_form.into_inner(), &pool))
        .from_err()
        .map(|updated_user| HttpResponse::Ok().json(updated_user))
}

pub fn list_user(
    _: User,
    pool: web::Data<db::PgPool>,
) -> impl Future<Item = HttpResponse, Error = ServiceError> {
    web::block(move || db::user::list_user(&pool))
        .from_err()
        .map(|users| HttpResponse::Ok().json(users))
}
