use diesel::insert_into;
use diesel::pg::PgConnection;
use diesel::prelude::*;
use diesel::r2d2::{ConnectionManager, Pool, PoolError, PooledConnection};
use http::status::StatusCode;
use sendgrid::v3::Sender;

use crate::email::send_invitation;
use crate::errors::ServiceError;
use crate::models::*;
use crate::schema::invitations;

embed_migrations!();

pub type PgPool = Pool<ConnectionManager<PgConnection>>;
type PgPooledConnection = PooledConnection<ConnectionManager<PgConnection>>;

pub fn init_pool(database_url: &str) -> Result<PgPool, PoolError> {
    let manager = ConnectionManager::<PgConnection>::new(database_url);
    Pool::builder().build(manager)
}

fn get_conn(pool: &PgPool) -> Result<PgPooledConnection, r2d2::Error> {
    pool.get()
}

pub fn run_db_migrations(pool: &PgPool) -> Result<(), ServiceError> {
    let conn = get_conn(pool)?;
    embedded_migrations::run_with_output(&conn, &mut std::io::stdout())?;
    Ok(())
}

pub fn create_invitation(
    invitation_form: InvitationForm,
    app_settings: &AppSettings,
    sender: &Sender,
    pool: &PgPool,
) -> Result<(), ServiceError> {
    let conn = get_conn(pool)?;
    let invitation = insert_into(invitations::table)
        .values(Invitation::from(invitation_form.email))
        .get_result(&conn)?;
    let code = send_invitation(invitation, &sender, &app_settings)?;
    match code {
        StatusCode::ACCEPTED => Ok(()),
        StatusCode::BAD_REQUEST => Err(ServiceError::BadRequest(format!("Invalid email"))),
        _ => Err(ServiceError::InternalServerError),
    }
}
