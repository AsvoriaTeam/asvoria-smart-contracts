use anchor_lang::prelude::*;


#[error_code]
pub enum FactoryError {
    #[msg("Caller must be admin")]
    Unauthorized,
    #[msg("Invalid fee account")]
    InvalidFeeAccount,
}