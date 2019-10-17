use crate::schema::*;
use argon2rs::defaults::{KIB, LANES, PASSES};
use argon2rs::verifier::Encoded;
use argon2rs::{Argon2, Variant};
use chrono::{NaiveDateTime, Utc};
use rand::distributions::Alphanumeric;
use rand::Rng;
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

#[derive(Deserialize)]
pub struct SignupForm {
    pub invitation_id: Uuid,
    pub email: String,
    pub password: String,
    pub first_name: String,
    pub last_name: String,
    pub middle_name: Option<String>,
}

#[derive(Debug, Serialize, Deserialize, Queryable, Insertable)]
#[table_name = "credentials"]
pub struct Credential {
    pub id: Uuid,
    pub email: String,
    pub user_id: i32,
    pub salt: String,
    pub pass_hash: String,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
}

impl Credential {
    pub fn new(user_id: i32, email: String, password: String, local_salt: String) -> Self {
        let random_salt = rand::thread_rng()
            .sample_iter(&Alphanumeric)
            .take(32)
            .collect::<String>();

        let a2 = Argon2::new(PASSES, LANES, KIB, Variant::Argon2d).unwrap();
        let random_salt_hash =
            Encoded::new(a2, random_salt.as_bytes(), local_salt.as_bytes(), b"", b"").to_u8();
        let random_salt_hash_storable_encoding = String::from_utf8(random_salt_hash).unwrap();

        let a2 = Argon2::new(PASSES, LANES, KIB, Variant::Argon2d).unwrap();
        let data_hash = Encoded::new(
            a2,
            password.as_bytes(),
            random_salt_hash_storable_encoding.as_bytes(),
            b"",
            b"",
        )
        .to_u8();
        let data_hash_storable_encoding = String::from_utf8(data_hash).unwrap();

        Credential {
            id: Uuid::new_v4(),
            user_id,
            email,
            salt: random_salt,
            pass_hash: data_hash_storable_encoding,
            created_at: Utc::now().naive_utc(),
            updated_at: Utc::now().naive_utc(),
        }
    }

    pub fn compare(&self, password: String, local_salt: String) -> bool {
        let a2 = Argon2::new(PASSES, LANES, KIB, Variant::Argon2d).unwrap();
        let random_salt_hash =
            Encoded::new(a2, self.salt.as_bytes(), local_salt.as_bytes(), b"", b"").to_u8();
        let random_salt_hash_storable_encoding = String::from_utf8(random_salt_hash).unwrap();

        let a2 = Argon2::new(PASSES, LANES, KIB, Variant::Argon2d).unwrap();
        let data_hash = Encoded::new(
            a2,
            password.as_bytes(),
            random_salt_hash_storable_encoding.as_bytes(),
            b"",
            b"",
        )
        .to_u8();
        let data_hash_storable_encoding = String::from_utf8(data_hash).unwrap();
        self.pass_hash == data_hash_storable_encoding
    }
}

#[cfg(test)]
mod tests {
    // Note this useful idiom: importing names from outer (for mod tests) scope.
    use super::*;

    #[test]
    fn test_credential() {
        let credential = Credential::new(
            1,
            "user@domain.com".to_string(),
            "password".to_string(),
            "local_salt".to_string(),
        );
        assert_eq!(
            credential.compare("password".to_string(), "local_salt".to_string()),
            true
        );
        assert_eq!(
            credential.compare("password1".to_string(), "local_salt".to_string()),
            false
        );
        assert_eq!(
            credential.compare("password".to_string(), "local_salt1".to_string()),
            false
        );
    }
}

#[derive(Debug, Serialize, Deserialize, Queryable, Insertable)]
#[table_name = "users"]
pub struct User {
    pub id: i32,
    pub first_name: String,
    pub last_name: String,
    pub middle_name: Option<String>,
}
