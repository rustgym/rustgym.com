use actix_identity::Identity;
use actix_web::{web, HttpResponse};
use futures::future::Future;

use crate::db;
use crate::errors::ServiceError;
mod auth;
mod invitation;

use auth::{reset_password, signin, signup};
use invitation::{invitation, reset_password_invitation};

pub fn api_config(cfg: &mut web::ServiceConfig) {
    cfg.service(web::resource("/session").route(web::get().to_async(session)))
        .service(web::resource("/signup").route(web::post().to_async(signup)))
        .service(web::resource("/signin").route(web::post().to_async(signin)))
        .service(web::resource("/invitation").route(web::post().to_async(invitation)))
        .service(web::resource("/reset-password").route(web::post().to_async(reset_password)))
        .service(
            web::resource("/reset-password-invitation")
                .route(web::post().to_async(reset_password_invitation)),
        );
}

fn session(id: Identity) -> impl Future<Item = HttpResponse, Error = ServiceError> {
    let user_id = id.identity();
    web::block(move || db::session(user_id))
        .from_err()
        .map(|user_id| HttpResponse::Ok().body(format!("{}", user_id)))
}
