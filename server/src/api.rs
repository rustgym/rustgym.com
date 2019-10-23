use actix_identity::Identity;
use actix_web::{web, Error, HttpResponse};
use futures::future::Future;
use sendgrid::v3::Sender;

use crate::app_settings::AppSettings;
use crate::db;
use crate::errors::ServiceError;
use crate::models::auth::*;
use crate::models::invitation::*;

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

fn signup(
    signup_form: web::Form<SignupForm>,
    app_settings: web::Data<AppSettings>,
    pool: web::Data<db::PgPool>,
) -> impl Future<Item = HttpResponse, Error = ServiceError> {
    web::block(move || db::process_signup_form(signup_form.into_inner(), &app_settings, &pool))
        .from_err()
        .map(|_| HttpResponse::Ok().body("Ok"))
}

fn invitation(
    invitation_form: web::Form<InvitationForm>,
    app_settings: web::Data<AppSettings>,
    sender: web::Data<Sender>,
    pool: web::Data<db::PgPool>,
) -> impl Future<Item = HttpResponse, Error = ServiceError> {
    web::block(move || {
        db::create_invitation(invitation_form.into_inner(), &app_settings, &sender, &pool)
    })
    .from_err()
    .map(|_| HttpResponse::Ok().body("Ok"))
}

fn reset_password_invitation(
    invitation_form: web::Form<InvitationForm>,
    app_settings: web::Data<AppSettings>,
    sender: web::Data<Sender>,
    pool: web::Data<db::PgPool>,
) -> impl Future<Item = HttpResponse, Error = ServiceError> {
    web::block(move || {
        db::create_reset_password_invitation(
            invitation_form.into_inner(),
            &app_settings,
            &sender,
            &pool,
        )
    })
    .from_err()
    .map(|_| HttpResponse::Ok().body("Ok"))
}

fn reset_password(
    reset_password_form: web::Form<ResetPasswordForm>,
    app_settings: web::Data<AppSettings>,
    pool: web::Data<db::PgPool>,
) -> impl Future<Item = HttpResponse, Error = ServiceError> {
    web::block(move || {
        db::process_reset_password_form(reset_password_form.into_inner(), &app_settings, &pool)
    })
    .from_err()
    .map(|_| HttpResponse::Ok().body("Ok"))
}

fn signin(
    signin_form: web::Form<SigninForm>,
    id: Identity,
    app_settings: web::Data<AppSettings>,
    pool: web::Data<db::PgPool>,
) -> impl Future<Item = HttpResponse, Error = ServiceError> {
    web::block(move || db::process_signin_form(signin_form.into_inner(), &app_settings, &pool))
        .from_err()
        .map(move |user_id| {
            id.remember(user_id.to_string());
            HttpResponse::Ok().body("Ok")
        })
}
