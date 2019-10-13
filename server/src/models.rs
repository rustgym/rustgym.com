use crate::schema::*;
use chrono::{NaiveDateTime, Utc};
use uuid::Uuid;

#[derive(Debug, Clone)]
pub struct AppSettings {
    pub url_prefix_for_email: String,
    pub noreply_email_address: String,
    pub domain: String,
    pub expiration_in_minutes: u32,
    pub welcome_email_template_id: String,
}

#[derive(Deserialize)]
pub struct InvitationForm {
    pub email: String,
}

#[derive(Debug, Serialize, Deserialize, Queryable, Insertable)]
#[table_name = "invitations"]
pub struct Invitation {
    pub id: Uuid,
    pub email: String,
    pub created_at: NaiveDateTime,
}

impl From<String> for Invitation {
    fn from(email: String) -> Self {
        Invitation {
            id: Uuid::new_v4(),
            email: email,
            created_at: Utc::now().naive_utc(),
        }
    }
}
