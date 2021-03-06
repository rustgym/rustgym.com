use actix_identity::Identity;
use actix_web::{dev::Payload, Error, FromRequest, HttpRequest};
use futures::future::Future;
use std::pin::Pin;
use validator::Validate;

use crate::errors::ServiceError;
use crate::schema::users;

#[derive(Debug, Serialize, Deserialize, Queryable, Insertable)]
#[table_name = "users"]
pub struct User {
    pub id: i32,
    pub first_name: String,
    pub last_name: String,
    pub middle_name: Option<String>,
}

impl FromRequest for User {
    type Config = ();
    type Error = Error;
    type Future = Pin<Box<dyn Future<Output = Result<User, Error>>>>;

    fn from_request(req: &HttpRequest, pl: &mut Payload) -> Self::Future {
        let fut = Identity::from_request(req, pl);
        Box::pin(async move {
            if let Some(identity) = fut.await?.identity() {
                let user: User = serde_json::from_str(&identity)?;
                return Ok(user);
            };
            Err(ServiceError::Unauthorized.into())
        })
    }
}

#[derive(Deserialize, AsChangeset, Validate)]
#[table_name = "users"]
pub struct UserForm {
    #[validate(length(min = 1, message = "First Name is empty"))]
    pub first_name: String,
    #[validate(length(min = 1, message = "Last Name is empty"))]
    pub last_name: String,
    pub middle_name: Option<String>,
}

#[derive(Deserialize)]
pub struct UserQueryByText {
    pub text: String,
}
