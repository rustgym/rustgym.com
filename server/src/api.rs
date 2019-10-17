use actix_identity::Identity;
use actix_web::{web, Error, HttpResponse, Result};
use chrono::prelude::*;
use futures::future::Future;
use sendgrid::v3::Sender;

use crate::app_settings::AppSettings;
use crate::db;
use crate::errors::ServiceError;
use crate::models::*;

fn some_db() -> Result<(), String> {
    Ok(())
}

pub fn api_config(cfg: &mut web::ServiceConfig) {
    cfg.service(web::resource("/session").route(web::get().to_async(session)))
        .service(web::resource("/signup").route(web::post().to_async(signup)))
        .service(web::resource("/invitation").route(web::post().to_async(invitation)));
}

fn session(id: Identity) -> impl Future<Item = HttpResponse, Error = Error> {
    web::block(move || some_db()).then(move |res| match res {
        Ok(_) => {
            if let Some(username) = id.identity() {
                Ok(HttpResponse::Ok().body(format!("{:?}", username)))
            } else {
                let now: DateTime<Local> = Local::now();
                id.remember(now.to_string());
                Ok(HttpResponse::Ok().body(format!("{:?}", now)))
            }
        }
        Err(_) => Ok(HttpResponse::InternalServerError().into()),
    })
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
    app_settings: web::Data<AppSettings>,
    invitation_form: web::Form<InvitationForm>,
    sender: web::Data<Sender>,
    pool: web::Data<db::PgPool>,
) -> impl Future<Item = HttpResponse, Error = ServiceError> {
    web::block(move || {
        db::create_invitation(invitation_form.into_inner(), &app_settings, &sender, &pool)
    })
    .from_err()
    .map(|_| HttpResponse::Ok().body("Ok"))
}
