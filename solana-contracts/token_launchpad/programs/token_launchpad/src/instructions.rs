use anchor_lang::prelude::*;
use anchor_spl::{associated_token::AssociatedToken, token::{Mint, Token, TokenAccount}};

use crate::{
    states::*,
    constants::*
};

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init, 
        payer = owner,
        seeds = [PRESALE_SEED, owner.key().as_ref()],
        bump, 
        space = 8 + std::mem::size_of::<PresaleState>()
    )]
    pub presale: Box<Account<'info, PresaleState>>,

    #[account(
        init,
        payer = owner,
        seeds = [VAULT_SEED, owner.key().as_ref()],
        bump,
        space = 8 + std::mem::size_of::<Vault>()
    )]
    pub vault: Box<Account<'info, Vault>>,

    #[account(
        init,
        payer = owner,
        seeds = [TOKEN_VAULT_SEED, owner.key().as_ref()],
        bump,
        token::mint = token,
        token::authority = token_vault_account
    )]
    pub token_vault_account: Account<'info, TokenAccount>,

    pub token: Account<'info, Mint>,

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
pub struct ClaimTokens<'info> {
    #[account(mut)]
    pub presale: Account<'info, PresaleState>,

    #[account(mut)]
    pub contribution: Account<'info, ContributionState>,

    #[account(mut, seeds = [TOKEN_VAULT_SEED, owner.key().as_ref()], bump)]
    pub token_vault_account: Account<'info, TokenAccount>,

    #[account(mut)]
    pub user_token_account: Account<'info, TokenAccount>,

    #[account(mut)]
    pub user: Signer<'info>,

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
