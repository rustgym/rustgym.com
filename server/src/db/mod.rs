use crate::errors::ServiceError;
use diesel::pg::PgConnection;
use diesel::r2d2::{ConnectionManager, Pool, PoolError, PooledConnection};

pub mod auth;
pub mod invitation;
pub mod migration;

pub type PgPool = Pool<ConnectionManager<PgConnection>>;
type PgPooledConnection = PooledConnection<ConnectionManager<PgConnection>>;

pub fn init_pool(database_url: &str) -> Result<PgPool, PoolError> {
    let manager = ConnectionManager::<PgConnection>::new(database_url);
    Pool::builder().build(manager)
}

pub fn get_conn(pool: &PgPool) -> Result<PgPooledConnection, r2d2::Error> {
    pool.get()
}

pub fn session(id: Option<String>) -> Result<String, ServiceError> {
    match id {
        Some(user_id) => Ok(user_id),
        None => Err(ServiceError::Unauthorized),
    }
}
