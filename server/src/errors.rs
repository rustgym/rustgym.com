use actix_web::error::BlockingError;
use actix_web::error::ResponseError;
use actix_web::HttpResponse;
use diesel::result::{DatabaseErrorKind, Error as DBError};
use diesel_migrations::RunMigrationsError;
use failure::Fail;
use r2d2::Error as R2d2Error;
use sendgrid::errors::SendgridError;
use std::convert::From;
use uuid::parser::ParseError;

#[derive(Debug, Fail)]
pub enum ServiceError {
    #[fail(display = "Internal Server Error")]
    InternalServerError,

    #[fail(display = "BadRequest: {}", info)]
    BadRequest { info: String },

    #[fail(display = "Unauthorized")]
    Unauthorized,
}

impl ResponseError for ServiceError {
    fn error_response(&self) -> HttpResponse {
        match self {
            ServiceError::InternalServerError => HttpResponse::InternalServerError().into(),
            ServiceError::BadRequest { info: _ } => HttpResponse::BadRequest().into(),
            ServiceError::Unauthorized => HttpResponse::Unauthorized().into(),
        }
    }
}

impl From<ParseError> for ServiceError {
    fn from(error: ParseError) -> ServiceError {
        ServiceError::BadRequest {
            info: format!("{:?}", error),
        }
    }
}

impl From<DBError> for ServiceError {
    fn from(error: DBError) -> ServiceError {
        warn!("{:?}", error);
        match error {
            DBError::DatabaseError(kind, info) => {
                if let DatabaseErrorKind::UniqueViolation = kind {
                    let message = info.details().unwrap_or_else(|| info.message()).to_string();
                    return ServiceError::BadRequest { info: message };
                }
                ServiceError::InternalServerError
            }
            _ => ServiceError::InternalServerError,
        }
    }
}

impl From<SendgridError> for ServiceError {
    fn from(error: SendgridError) -> ServiceError {
        error!("SendgridError {:?}", error);
        ServiceError::InternalServerError
    }
}

impl From<RunMigrationsError> for ServiceError {
    fn from(error: RunMigrationsError) -> ServiceError {
        error!("RunMigrationsError {:?}", error);
        ServiceError::InternalServerError
    }
}

impl From<R2d2Error> for ServiceError {
    fn from(error: R2d2Error) -> ServiceError {
        error!("R2d2Error {:?}", error);
        ServiceError::InternalServerError
    }
}

impl From<BlockingError<ServiceError>> for ServiceError {
    fn from(error: BlockingError<ServiceError>) -> ServiceError {
        info!("BlockingError<ServiceError> {:?}", error);
        if let BlockingError::Error(service_error) = error {
            service_error
        } else {
            ServiceError::InternalServerError
        }
    }
}
