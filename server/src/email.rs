use crate::models::*;
use http::status::StatusCode;
use sendgrid::errors::SendgridError;
use sendgrid::v3::*;
// use chrono::Duration;

pub fn send_invitation(
    invitation: Invitation,
    sender: &Sender,
    app_settings: &AppSettings,
) -> Result<StatusCode, SendgridError> {
    let url_prefix_for_email = app_settings.url_prefix_for_email.to_string();
    let id = invitation.id;
    let email = invitation.email.to_string();
    // let created_at = invitation.created_at;
    // let expiration = Duration::minutes(app_settings.expiration_in_minutes as i64);
    // let expires_at = created_at + expiration;
    let registration_link = format!(
        "{}/register.html?id={}&email={}",
        url_prefix_for_email, id, email
    );
    let template_data = [("registration_link".to_string(), registration_link)]
        .iter()
        .cloned()
        .collect();
    let personalization = Personalization::new()
        .add_to(Email::new().set_email(&invitation.email))
        .add_dynamic_template_data(template_data);
    let mail = Message::new()
        .set_from(Email::new().set_email(&app_settings.noreply_email_address))
        .set_template_id(&app_settings.welcome_email_template_id)
        .add_personalization(personalization);
    sender.send(&mail).map(|res| res.status())
}
