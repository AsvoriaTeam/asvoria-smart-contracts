use anchor_lang::prelude::*;
use anchor_spl::{associated_token::AssociatedToken, token::{Mint, Token, TokenAccount}};

use crate::{
    states::*,
    constants::*
};

#[derive(Accounts)]
#[instruction(
    token_price: u64,
    hard_cap: u64,
    soft_cap: u64,
    min_contribution: u64,
    max_contribution: u64,
    start_time: i64,
    end_time: i64,
    listing_rate: u64,
    liquidity_bp: u16,
    service_fee: u16,
    refund_type: RefundType,
    listing_opt: ListingOpt,
    liquidity_type: LiquidityType,
    enable_whitelist: bool,
    presale_id: u64
)]
pub struct Initialize<'info> {
    #[account(
        init, 
        payer = owner,
        seeds = [PRESALE_SEED, presale_id.to_le_bytes().as_ref()],
        bump, 
        space = 8 + std::mem::size_of::<PresaleState>()
    )]
    pub presale: Box<Account<'info, PresaleState>>,

    #[account(
        init,
        payer = owner,
        seeds = [VAULT_SEED, presale_id.to_le_bytes().as_ref()],
        bump,
        space = 8 + std::mem::size_of::<Vault>()
    )]
    pub vault: Box<Account<'info, Vault>>,

    #[account(
        init,
        payer = owner,
        seeds = [TOKEN_VAULT_SEED, presale_id.to_le_bytes().as_ref()],
        bump,
        token::mint = token,
        token::authority = token_vault_account
    )]
    pub token_vault_account: Account<'info, TokenAccount>,

    pub token: Account<'info, Mint>,

    /// CHECK
    #[account(mut)]
    pub fee_collector: AccountInfo<'info>,

    #[account(mut)]
    pub owner: Signer<'info>,

    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Contribute<'info> {
    #[account(mut)]
    pub presale: Account<'info, PresaleState>,

    #[account(mut)]
    pub vault: Box<Account<'info, Vault>>,

    #[account(mut)]
    pub token_vault_account: Account<'info, TokenAccount>,

    #[account(init_if_needed, payer = user, space = 8 + std::mem::size_of::<ContributionState>())]
    pub contribution: Box<Account<'info, ContributionState>>,

    #[account(mut)]
    pub user: Signer<'info>,
    
    pub token: Account<'info, Mint>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct FinalizePresale<'info> {
    #[account(mut)]
    pub presale: Account<'info, PresaleState>,
    
    pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct CancelPresale<'info> {
    #[account(mut)]
    pub presale: Account<'info, PresaleState>,
    
    pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct WithdrawUnsoldTokens<'info> {
    #[account(mut)]
    pub presale: Account<'info, PresaleState>,

    #[account(mut)]
    pub owner: Signer<'info>,

    #[account(mut)]
    pub token_vault_account: Account<'info, TokenAccount>,

    #[account(
        mut,
        associated_token::mint = token_mint, 
        associated_token::authority = owner,
    )]
    pub owner_token_account: Account<'info, TokenAccount>,
    
    pub token_mint: Account<'info, Mint>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(presale_id: u64)]
pub struct ClaimTokens<'info> {
    #[account(mut)]
    pub presale: Account<'info, PresaleState>,

    #[account(mut)]
    pub contribution: Account<'info, ContributionState>,

    #[account(mut, seeds = [TOKEN_VAULT_SEED, presale_id.to_le_bytes().as_ref()], bump)]
    pub token_vault_account: Account<'info, TokenAccount>,

    #[account(mut)]
    pub user_token_account: Account<'info, TokenAccount>,

    #[account(mut)]
    pub user: Signer<'info>,

    /// CHECK
    #[account(mut)]
    pub owner: AccountInfo<'info>,

    pub token: Account<'info, Mint>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,

}

#[derive(Accounts)]
pub struct RefundContributors<'info> {
    #[account(mut)]
    pub presale: Account<'info, PresaleState>,

    #[account(mut)]
    pub contribution: Account<'info, ContributionState>,

    #[account(mut)]
    pub vault: Box<Account<'info, Vault>>,
    
    #[account(mut)]
    pub user: Signer<'info>,
}
