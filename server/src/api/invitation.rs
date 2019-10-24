use actix_web::{web, HttpResponse};
use futures::future::Future;
use sendgrid::v3::Sender;

use crate::app_settings::AppSettings;
use crate::db;
use crate::errors::ServiceError;
use crate::models::invitation::*;

pub fn invitation(
    invitation_form: web::Form<InvitationForm>,
    app_settings: web::Data<AppSettings>,
    sender: web::Data<Sender>,
    pool: web::Data<db::PgPool>,
) -> impl Future<Item = HttpResponse, Error = ServiceError> {
    web::block(move || {
        db::invitation::create_invitation(
            invitation_form.into_inner(),
            &app_settings,
            &sender,
            &pool,
        )
    })
    .from_err()
    .map(|_| HttpResponse::Ok().body("Ok"))
}

pub fn reset_password_invitation(
    invitation_form: web::Form<InvitationForm>,
    app_settings: web::Data<AppSettings>,
    sender: web::Data<Sender>,
    pool: web::Data<db::PgPool>,
) -> impl Future<Item = HttpResponse, Error = ServiceError> {
    web::block(move || {
        db::invitation::create_reset_password_invitation(
            invitation_form.into_inner(),
            &app_settings,
            &sender,
            &pool,
        )
    })
    .from_err()
    .map(|_| HttpResponse::Ok().body("Ok"))
}
