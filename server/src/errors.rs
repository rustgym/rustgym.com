use actix_web::error::BlockingError;
use actix_web::error::ResponseError;
use actix_web::HttpResponse;
use diesel::result::{DatabaseErrorKind, Error as DBError};
use diesel_migrations::RunMigrationsError;
use r2d2::Error as R2d2Error;
use sendgrid::errors::SendgridError;
use std::collections::HashMap;
use std::convert::From;
use std::fmt;
use uuid::parser::ParseError;
use validator::{ValidationErrors, ValidationErrorsKind};

#[derive(Debug)]
pub enum ServiceError {
    InternalServerError,
    BadRequest(HashMap<String, String>),
    Unauthorized,
    Forbidden,
}

impl ResponseError for ServiceError {
    fn error_response(&self) -> HttpResponse {
        match self {
            ServiceError::InternalServerError => HttpResponse::InternalServerError().into(),
            ServiceError::BadRequest(_) => HttpResponse::BadRequest().into(),
            ServiceError::Unauthorized => HttpResponse::Unauthorized().into(),
            ServiceError::Forbidden => HttpResponse::Forbidden().into(),
        }
    }
}

impl fmt::Display for ServiceError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            ServiceError::InternalServerError => write!(f, "InternalServerError"),
            ServiceError::BadRequest(error_info) => write!(f, "{:?}", error_info),
            ServiceError::Unauthorized => write!(f, "Unauthorized"),
            ServiceError::Forbidden => write!(f, "Forbidden"),
        }
    }
}

impl From<ValidationErrors> for ServiceError {
    fn from(errors: ValidationErrors) -> ServiceError {
        let mut hm: HashMap<String, String> = HashMap::new();
        for (k, v) in errors.into_errors() {
            match v {
                ValidationErrorsKind::Field(errs) => {
                    for err in errs {
                        hm.insert(k.to_string(), err.message.unwrap_or_default().to_string());
                    }
                }
                _ => {}
            }
        }
        ServiceError::BadRequest(hm)
    }
}

impl From<ParseError> for ServiceError {
    fn from(error: ParseError) -> ServiceError {
        error!("SendgridError {:?}", error);
        bad_request!("uuid_parse_error".to_string() => error.to_string())
    }
}

impl From<DBError> for ServiceError {
    fn from(error: DBError) -> ServiceError {
        warn!("{:?}", error);
        match error {
            DBError::DatabaseError(kind, info) => {
                if let DatabaseErrorKind::UniqueViolation = kind {
                    let message = info.details().unwrap_or_else(|| info.message()).to_string();
                    return bad_request!("diesel_result_error".to_string() => message.to_string());
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
