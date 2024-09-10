use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, Token, TokenAccount};

use crate::states::*;

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = owner,
        space = 8 + std::mem::size_of::<PresaleState>()
    )]
    pub presale: Box<Account<'info, PresaleState>>,
    pub token: Account<'info, Mint>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Contribute<'info> {
    #[account(mut)]
    pub presale: Account<'info, PresaleState>,
    #[account(init_if_needed, payer = user, space = 8 + std::mem::size_of::<ContributionState>())]
    pub contribution: Box<Account<'info, ContributionState>>,
    #[account(mut)]
    pub token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
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
pub struct ClaimTokens<'info> {
    #[account(mut)]
    pub presale: Account<'info, PresaleState>,
    #[account(mut)]
    pub contribution: Account<'info, ContributionState>,
    #[account(mut)]
    pub token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub user_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct RefundContributors<'info> {
    #[account(mut)]
    pub presale: Account<'info, PresaleState>,
    #[account(mut)]
    pub contribution: Account<'info, ContributionState>,
    #[account(mut)]
    pub user: Signer<'info>,
}
