use actix_identity::Identity;
use actix_web::{web, HttpResponse};

use crate::app_settings::AppSettings;
use crate::db;
use crate::errors::ServiceError;
use crate::models::auth::*;
use crate::models::user::User;

pub async fn signup(
    signup_form: web::Form<SignupForm>,
    id: Identity,
    app_settings: web::Data<AppSettings>,
    pool: web::Data<db::PgPool>,
) -> Result<HttpResponse, ServiceError> {
    db::auth::process_signup_form(signup_form.into_inner(), &app_settings, &pool).map(
        move |(user, _)| {
            id.remember(serde_json::to_string(&user).unwrap());
            HttpResponse::Ok().body("Ok")
        },
    )
}

pub async fn reset_password(
    reset_password_form: web::Form<ResetPasswordForm>,
    app_settings: web::Data<AppSettings>,
    pool: web::Data<db::PgPool>,
) -> Result<HttpResponse, ServiceError> {
    db::auth::process_reset_password_form(reset_password_form.into_inner(), &app_settings, &pool)
        .map(|_| HttpResponse::Ok().body("Ok"))
}

pub async fn signin(
    signin_form: web::Form<SigninForm>,
    id: Identity,
    app_settings: web::Data<AppSettings>,
    pool: web::Data<db::PgPool>,
) -> Result<HttpResponse, ServiceError> {
    db::auth::process_signin_form(signin_form.into_inner(), &app_settings, &pool).map(move |user| {
        id.remember(serde_json::to_string(&user).unwrap());
        HttpResponse::Ok().body("Ok")
    })
}

pub async fn signout(id: Identity) -> HttpResponse {
    id.forget();
    HttpResponse::Ok().body("Ok")
}

pub async fn session(user: User) -> Result<HttpResponse, ServiceError> {
    db::session(user).map(|user| HttpResponse::Ok().json(user))
}
