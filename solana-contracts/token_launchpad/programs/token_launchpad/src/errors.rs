use anchor_lang::prelude::*;


#[error_code]
pub enum PresaleError {
    #[msg("Presale is not active")]
    PresaleNotActive,
    #[msg("Presale has ended")]
    PresaleEnded,
    #[msg("Contribution not within limits")]
    ContributionNotWithinLimits,
    #[msg("Exceeds hard cap")]
    ExceedsHardCap,
    #[msg("Presale not ended")]
    PresaleNotEnded,
    #[msg("Presale not finalized")]
    PresaleNotFinalized,
    #[msg("Presale canceled")]
    PresaleCanceled,
    #[msg("Presale canceled")]
    PresaleRefund,
    #[msg("No tokens to claim")]
    NoTokensToClaim,
    #[msg("Presale is not refunded")]
    PresaleNotRefunded,
}