use uuid::Uuid;
use validator::Validate;

#[derive(Deserialize, Validate)]
pub struct SignupForm {
    pub invitation_id: Uuid,
    #[validate(email(message = "Email is invalid"))]
    pub email: String,
    #[validate(length(min = 8, message = "Password is less than 8 characters"))]
    pub password: String,
    #[validate(length(min = 1, message = "First Name is empty"))]
    pub first_name: String,
    #[validate(length(min = 1, message = "Last Name is empty"))]
    pub last_name: String,
    pub middle_name: Option<String>,
}

#[derive(Deserialize, Validate)]
pub struct SigninForm {
    #[validate(email(message = "Email is invalid"))]
    pub email: String,
    #[validate(length(min = 8, message = "Password is less than 8 characters"))]
    pub password: String,
}

#[derive(Deserialize, Validate)]
pub struct ForgetPasswordForm {
    #[validate(email(message = "Email is invalid"))]
    pub email: String,
}

#[derive(Deserialize, Validate)]
pub struct ResetPasswordForm {
    pub invitation_id: Uuid,
    #[validate(email(message = "Email is invalid"))]
    pub email: String,
    #[validate(length(min = 8, message = "Password is less than 8 characters"))]
    pub password: String,
}
