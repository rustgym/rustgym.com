use actix_web::{web, HttpResponse};
use sendgrid::v3::Sender;

use crate::app_settings::AppSettings;
use crate::db;
use crate::errors::ServiceError;
use crate::models::invitation::*;

pub async fn invitation(
    invitation_form: web::Form<InvitationForm>,
    app_settings: web::Data<AppSettings>,
    sender: web::Data<Sender>,
    pool: web::Data<db::PgPool>,
) -> Result<HttpResponse, ServiceError> {
    db::invitation::create_invitation(invitation_form.into_inner(), &app_settings, &sender, &pool)
        .map(|_| HttpResponse::Ok().body("Ok"))
}

pub async fn reset_password_invitation(
    invitation_form: web::Form<InvitationForm>,
    app_settings: web::Data<AppSettings>,
    sender: web::Data<Sender>,
    pool: web::Data<db::PgPool>,
) -> Result<HttpResponse, ServiceError> {
    db::invitation::create_reset_password_invitation(
        invitation_form.into_inner(),
        &app_settings,
        &sender,
        &pool,
    )
    .map(|_| HttpResponse::Ok().body("Ok"))
}
