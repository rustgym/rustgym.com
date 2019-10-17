#[derive(Debug, Clone)]
pub struct AppSettings {
    pub url_prefix_for_email: String,
    pub noreply_email_address: String,
    pub domain: String,
    pub expiration_in_minutes: u32,
    pub welcome_email_template_id: String,
    pub local_salt: String,
}
