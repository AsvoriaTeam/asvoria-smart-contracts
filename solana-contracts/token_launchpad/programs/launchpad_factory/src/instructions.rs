use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, Token, TokenAccount};
use token_launchpad::{
    program::TokenLaunchpad,
    states::Vault,
    states::PresaleState
};

use crate::{
    states::*,
    constants::*
};

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,

    #[account(
        init_if_needed,
        payer = admin,
        seeds = [FACTORY_CONFIG],
        bump,
        space = 8 + std::mem::size_of::<Factory>()
    )]
    pub factory_config: Box<Account<'info, Factory>>,
    pub fee_collector_info: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct SetCreatorFee<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,

    #[account(
        mut,
        seeds = [FACTORY_CONFIG],
        bump,
    )]
    pub factory_config: Box<Account<'info, Factory>>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct SetServiceFee<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,

    #[account(
        mut,
        seeds = [FACTORY_CONFIG],
        bump,
    )]
    pub factory_config: Box<Account<'info, Factory>>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct SetFeeCollector<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,

    #[account(
        mut,
        seeds = [FACTORY_CONFIG],
        bump,
    )]
    pub factory_config: Box<Account<'info, Factory>>,
    pub fee_collector_info: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CreatePresale<'info> {
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
        token::mint = token_mint,
        token::authority = token_vault_account
    )]
    pub token_vault_account: Account<'info, TokenAccount>,

    #[account(
        mut,
        seeds = [FACTORY_CONFIG],
        bump,
    )]
    pub factory_config: Box<Account<'info, Factory>>,

    #[account(mut)]
    pub owner: Signer<'info>,
    // This is the reference to the TokenPresale program where the presale is managed
    pub presale_program: Program<'info, TokenLaunchpad>,
    pub token_mint: Account<'info, Mint>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}
