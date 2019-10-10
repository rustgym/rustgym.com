#[macro_use] extern crate log;
#[macro_use] extern crate diesel_migrations;

use std::env;
use dotenv::dotenv;
use actix_session::CookieSession;
use actix_web::{middleware, App, HttpServer};
use actix_files as fs;

mod db;

static SESSION_SIGNING_KEY: &[u8] = &[0; 32];


fn main() -> Result<(), std::io::Error> {
    dotenv().ok();

    env::set_var("RUST_LOG", "actix_web=info");
    env_logger::init();

    let port = env::var("PORT").expect("Failed to get port");
    let addr = format!("0.0.0.0:{}", port);
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let pool = db::init_pool(&database_url).expect("Failed to create pool");
    db::run_db_migrations(&pool.clone()).expect("Failed migration");

    let app = move || {
        debug!("Constructing the App");
        let session_store = CookieSession::signed(SESSION_SIGNING_KEY).secure(false);
        App::new()
            .data(pool.clone())
            .wrap(middleware::Logger::default())
            .wrap(session_store)
            .service(fs::Files::new("/", "static").index_file("index.html"))
    };

    debug!("Starting server");
    HttpServer::new(app).bind(addr)?.run()

}
