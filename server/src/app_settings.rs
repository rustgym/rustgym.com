use std::env;
#[derive(Debug, Clone)]
pub struct AppSettings {
    pub url_prefix_for_email: String,
    pub noreply_email_address: String,
    pub domain: String,
    pub expiration_in_minutes: u32,
    pub welcome_email_template_id: String,
    pub local_salt: String,
}

impl AppSettings {
    pub fn new() -> Self {
        let url_prefix_for_email =
            env::var("URL_PREFIX_FOR_EMAIL").expect("Fail to get url_prefix_for_email");
        let noreply_email_address =
            env::var("NOREPLY_EMAIL_ADDRESS").expect("Fail to get noreply_email_address");
        let expiration_in_minutes = env::var("EXPIRATION_IN_MINUTES")
            .expect("Fail to get expiration_in_minutes")
            .parse::<u32>()
            .expect("Fail to parse expiration_in_minutes");
        let welcome_email_template_id =
            env::var("WELCOME_EMAIL_TEMPLATE_ID").expect("Fail to get welcome_email_template_id");
        let domain = env::var("DOMAIN").expect("Failed to get domain");
        let local_salt = env::var("LOCAL_SALT").expect("Fail to get local_salt");
        AppSettings {
            url_prefix_for_email,
            noreply_email_address,
            expiration_in_minutes,
            welcome_email_template_id,
            domain: domain,
            local_salt,
        }
    }
}
