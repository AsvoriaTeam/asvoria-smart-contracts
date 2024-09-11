use anchor_lang::prelude::*;
use token_launchpad::states::{
    RefundType,
    LiquidityType,
    ListingOpt
};


#[account]
pub struct Factory {
    pub admin: Pubkey,
    pub launchpads: Vec<Pubkey>,
    pub creator_fee: u64,
    pub service_fee: u16,
    pub fee_collector: Pubkey
}
