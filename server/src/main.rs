#[macro_use]
extern crate diesel;
use actix_web::{middleware, web, App, HttpRequest, HttpServer};
use actix_files as fs;
use std::env;
use diesel::prelude::*;
use diesel::pg::PgConnection;
use postgres::{Connection, TlsMode};

// pub fn establish_connection() -> PgConnection {
//     let database_url = env::var("DATABASE_URL").unwrap();
//     PgConnection::establish(&database_url)
//         .expect(&format!("Error connecting to {}", database_url))
// }


fn main() -> std::io::Result<()> {
    env::set_var("RUST_LOG", "actix_web=info");
    env_logger::init();
    let port = env::var("PORT").unwrap_or("8080".to_string());
    let addr = format!("0.0.0.0:{}", port);
    HttpServer::new(|| {
        App::new()
            // enable logger
            .wrap(middleware::Logger::default())
            .service(web::resource("/db").to(|| {
                let database_url = env::var("DATABASE_URL").unwrap();
                let conn = Connection::connect(database_url, TlsMode::None).unwrap();
                let mut s = "".to_string();
                for row in &conn.query("SELECT * FROM guestbook", &[]).unwrap() {
                    let a: String = row.get(0);
                    let b: String = row.get(1);
                    s += &a;
                    s += "===";
                    s += &b;
                    s += "+++";
                }
                s
            }))
            .service(fs::Files::new("/", "static").index_file("index.html"))
    })
    .bind(addr)?
    .run()
}
