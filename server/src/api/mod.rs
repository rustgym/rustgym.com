use actix_web::web;

mod auth;
mod invitation;
mod user;

use auth::{reset_password, session, signin, signout, signup};
use invitation::{invitation, reset_password_invitation};
use user::{get_user, list_user, update_user};

pub fn api_config(cfg: &mut web::ServiceConfig) {
    cfg.service(web::resource("/session").route(web::get().to(session)))
        .service(web::resource("/signup").route(web::post().to(signup)))
        .service(web::resource("/signin").route(web::post().to(signin)))
        .service(web::resource("/signout").route(web::post().to(signout)))
        .service(web::resource("/invitation").route(web::post().to(invitation)))
        .service(web::resource("/reset-password").route(web::post().to(reset_password)))
        .service(
            web::resource("/reset-password-invitation")
                .route(web::post().to(reset_password_invitation)),
        )
        .service(
            web::resource("/users/{user_id}")
                .route(web::get().to(get_user))
                .route(web::post().to(update_user)),
        )
        .service(web::resource("/users").route(web::get().to(list_user)));
}
