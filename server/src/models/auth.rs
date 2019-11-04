use uuid::Uuid;
use validator::Validate;

#[derive(Deserialize)]
pub struct SignupForm {
    pub invitation_id: Uuid,
    pub email: String,
    pub password: String,
    pub first_name: String,
    pub last_name: String,
    pub middle_name: Option<String>,
}

#[derive(Deserialize, Validate)]
pub struct SigninForm {
    #[validate(email(message = "Email is not valid"))]
    pub email: String,
    #[validate(length(min = 8, message = "Password is less than 8 characters"))]
    pub password: String,
}

#[derive(Deserialize)]
pub struct ForgetPasswordForm {
    pub email: String,
}

#[derive(Deserialize)]
pub struct ResetPasswordForm {
    pub invitation_id: Uuid,
    pub email: String,
    pub password: String,
}
