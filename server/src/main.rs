#[macro_use]
extern crate diesel;
#[macro_use]
extern crate log;
#[macro_use]
extern crate diesel_migrations;
#[macro_use]
extern crate serde;

use actix_files as fs;
use actix_identity::{CookieIdentityPolicy, IdentityService};
use actix_session::CookieSession;
use actix_web::{middleware, web, App, HttpServer};
use dotenv::dotenv;
use sendgrid::v3::*;
use std::env;

mod api;
mod db;
mod email;
mod errors;
mod models;
mod schema;

use models::AppSettings;

static SESSION_SIGNING_KEY: &[u8] = &[0; 32];

fn main() -> Result<(), std::io::Error> {
    dotenv().ok();

    env::set_var("RUST_LOG", "info,actix_web=info");
    env_logger::init();

    let url_prefix_for_email =
        env::var("URL_PREFIX_FOR_EMAIL").expect("Fail to get url_prefix_for_email");
    let noreply_email_address =
        env::var("NOREPLY_EMAIL_ADDRESS").expect("Fail to get noreply_email_address");
    let expiration_in_minutes = env::var("EXPIRATION_IN_MINUTES")
        .expect("Fail to get expiration_in_minutes")
        .parse::<u32>()
        .expect("Fail to parse expiration_in_minutes");
    let welcome_email_template_id =
        env::var("WELCOME_EMAIL_TEMPLATE_ID").expect("Fail to get welcome_email_template_id");
    let domain = env::var("DOMAIN").expect("Failed to get domain");
    let app_settings = AppSettings {
        url_prefix_for_email,
        noreply_email_address,
        expiration_in_minutes,
        welcome_email_template_id,
        domain: domain.to_string(),
    };

    let sendgrid_api_key = env::var("SENDGRID_API_KEY").expect("Fail to get sendgrid_api_key");
    let sender = Sender::new(sendgrid_api_key);

    let port = env::var("PORT").expect("Failed to get port");
    let addr = format!("0.0.0.0:{}", port);

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let pool = db::init_pool(&database_url).expect("Failed to create pool");
    db::run_db_migrations(&pool.clone()).expect("Failed migration");

    let app = move || {
        info!("Constructing the App");
        let session_store = CookieSession::signed(SESSION_SIGNING_KEY).secure(false);
        App::new()
            .data(app_settings.clone())
            .data(sender.clone())
            .data(pool.clone())
            .data(web::JsonConfig::default().limit(4096))
            .wrap(middleware::Logger::default())
            .wrap(session_store)
            .wrap(IdentityService::new(
                CookieIdentityPolicy::new(SESSION_SIGNING_KEY)
                    .name("rustgym_auth")
                    .path("/")
                    .domain(domain.as_str())
                    .max_age_time(chrono::Duration::minutes(1))
                    .secure(false),
            ))
            .service(
                web::scope("/api/")
                    .service(web::resource("/session").route(web::get().to_async(api::session)))
                    .service(
                        web::resource("/invitation").route(web::post().to_async(api::invitation)),
                    ),
            )
            .service(fs::Files::new("/portal/", "portal").index_file("index.html"))
            .service(fs::Files::new("/", "static").index_file("index.html"))
    };

    info!("Starting server");
    HttpServer::new(app).bind(addr)?.run()
}
