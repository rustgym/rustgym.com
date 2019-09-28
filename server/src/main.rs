use actix_web::{middleware, web, App, HttpRequest, HttpServer};
use actix_files as fs;
use std::env;

fn main() -> std::io::Result<()> {
    env::set_var("RUST_LOG", "actix_web=info");
    env_logger::init();
    let port = env::var("PORT").unwrap_or("8080".to_string());
    let addr = format!("0.0.0.0:{}", port);

    HttpServer::new(|| {
        App::new()
            // enable logger
            .wrap(middleware::Logger::default())
            .service(fs::Files::new("/", "static").index_file("index.html"))
    })
    .bind(addr)?
    .run()
}
