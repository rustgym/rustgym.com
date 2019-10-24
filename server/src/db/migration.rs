use crate::db::{get_conn, PgPool};
use crate::errors::ServiceError;

embed_migrations!();

pub fn run_db_migrations(pool: &PgPool) -> Result<(), ServiceError> {
    let conn = get_conn(pool)?;
    embedded_migrations::run_with_output(&conn, &mut std::io::stdout())?;
    Ok(())
}
