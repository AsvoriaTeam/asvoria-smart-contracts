use anchor_lang::prelude::*;
use token_launchpad::states::{
    RefundType,
    LiquidityType,
    ListingOpt
};

#[account]
pub struct Presale {
    pub token_price: u64,
    pub hard_cap: u64,
    pub soft_cap: u64,
    pub min_contribution: u64,
    pub max_contribution: u64,
    pub total_raised: u64,
    pub start_time: i64,
    pub end_time: i64,
    pub presale_ended: bool,
    pub presale_canceled: bool,
    pub presale_refund: bool,
    pub listing_rate: u64,
    pub liquidity_bp: u16,
    pub service_fee: u16,
    pub refund_type: RefundType,
    pub listing_opt: ListingOpt,
    pub liquidity_type: LiquidityType,
    pub fee_collector: Pubkey,
    pub enable_whitelist: bool,
    pub whitelist_users: Vec<Pubkey>
}

#[account]
pub struct Vault {
    pub authority: Pubkey,
}