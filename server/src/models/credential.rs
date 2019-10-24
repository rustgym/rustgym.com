use crate::schema::credentials;
use argon2rs::defaults::{KIB, LANES, PASSES};
use argon2rs::verifier::Encoded;
use argon2rs::{Argon2, Variant};
use chrono::{NaiveDateTime, Utc};
use rand::distributions::Alphanumeric;
use rand::Rng;
use uuid::Uuid;

#[derive(Debug, Serialize, Deserialize, Queryable, Insertable, AsChangeset)]
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
    fn encode_password(password: String, random_salt: String, local_salt: String) -> String {
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
        data_hash_storable_encoding
    }

    pub fn new(user_id: i32, email: String, password: String, local_salt: String) -> Self {
        let random_salt = rand::thread_rng()
            .sample_iter(&Alphanumeric)
            .take(32)
            .collect::<String>();
        let data_hash_storable_encoding =
            Self::encode_password(password, random_salt.to_string(), local_salt);
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

    pub fn update_password(mut self, password: String, local_salt: String) -> Self {
        let random_salt = rand::thread_rng()
            .sample_iter(&Alphanumeric)
            .take(32)
            .collect::<String>();
        self.salt = random_salt.to_string();
        self.pass_hash = Self::encode_password(password, random_salt, local_salt);
        self
    }

    pub fn compare(&self, password: String, local_salt: String) -> bool {
        let data_hash_storable_encoding =
            Self::encode_password(password, self.salt.to_string(), local_salt);
        self.pass_hash == data_hash_storable_encoding
    }
}

#[cfg(test)]
mod tests {
    // Note this useful idiom: importing names from outer (for mod tests) scope.
    use super::*;

    #[test]
    fn create_credential() {
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

    #[test]
    fn update_credential() {
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
        let credential = credential.update_password("new_pass".to_string(), "new_salt".to_string());
        assert_eq!(
            credential.compare("password".to_string(), "local_salt".to_string()),
            false
        );
        assert_eq!(
            credential.compare("new_pass".to_string(), "local_salt".to_string()),
            false
        );
        assert_eq!(
            credential.compare("new_pass".to_string(), "new_salt".to_string()),
            true
        );
    }
}
