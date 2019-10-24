use crate::schema::invitations;
use chrono::{NaiveDateTime, Utc};
use time::Duration;
use uuid::Uuid;

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

impl Invitation {
    pub fn is_expired(&self, duration: Duration) -> bool {
        Utc::now().naive_utc() - self.created_at > duration
    }
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
