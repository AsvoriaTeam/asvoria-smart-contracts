use anchor_lang::prelude::*;

#[event]
pub struct TokensPurchased {
    pub purchaser: Pubkey,
    pub amount: u64,
    pub timestamp: i64,
}

#[event]
pub struct PresaleFinalized {
    pub success: bool,
    pub timestamp: i64,
}

#[event]
pub struct PresaleCanceled {
    pub success: bool,
    pub timestamp: i64,
}

#[event]
pub struct TokensClaimed {
    pub claimer: Pubkey,
    pub amount: u64,
    pub timestamp: i64,
}

#[event]
pub struct LiquidityAdded {
    pub token_amount: u64,
    pub sol_amount: u64,
    pub timestamp: i64,
}

#[event]
pub struct LPTokenWithdrawn {
    pub owner: Pubkey,
    pub amount: u64,
    pub timestamp: i64,
}