use uuid::Uuid;

#[derive(Deserialize)]
pub struct SignupForm {
    pub invitation_id: Uuid,
    pub email: String,
    pub password: String,
    pub first_name: String,
    pub last_name: String,
    pub middle_name: Option<String>,
}

#[derive(Deserialize)]
pub struct SigninForm {
    pub email: String,
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
