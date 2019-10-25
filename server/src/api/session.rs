use actix_web::{web, HttpResponse};
use futures::future::Future;

use crate::db;
use crate::errors::ServiceError;
use crate::models::user::User;

pub fn session(user: User) -> impl Future<Item = HttpResponse, Error = ServiceError> {
    web::block(move || db::session(user))
        .from_err()
        .map(|user| HttpResponse::Ok().json(user))
}
