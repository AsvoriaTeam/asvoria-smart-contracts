use anchor_lang::prelude::*;
// use anchor_spl::token::{Mint, Token, TokenAccount};
use anchor_spl::token_interface::{ TokenAccount, TokenInterface, Mint };
use anchor_spl::associated_token::AssociatedToken;
use token_launchpad::program::TokenLaunchpad;

use crate::{
    states::*,
    constants::*
};

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,

    #[account(
        init,
        payer = admin,
        seeds = [FACTORY_CONFIG],
        bump,
        space = 8 + std::mem::size_of::<Factory>()
    )]
    pub factory_config: Box<Account<'info, Factory>>,
    /// CHECK
    #[account(mut)]
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
    /// CHECK
    #[account(mut)]
    pub fee_collector_info: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CreatePresale<'info> {
    /// CHECK
    #[account(mut)]
    pub presale: AccountInfo<'info>,

    /// CHECK
    #[account(mut)]
    pub vault: AccountInfo<'info>,

    /// CHECK
    #[account(mut)]
    pub token_vault_account: AccountInfo<'info>,

    #[account(
        mut,
        seeds = [FACTORY_CONFIG],
        bump,
    )]
    pub factory_config: Box<Account<'info, Factory>>,

    /// CHECK
    #[account(mut)]
    pub fee_collector: AccountInfo<'info>,

    #[account(
        mut,
        associated_token::mint = token_mint, 
        associated_token::authority = owner,
        associated_token::token_program = token_program
    )]
    pub owner_token_account: InterfaceAccount<'info, TokenAccount>,

    #[account(mut)]
    pub owner: Signer<'info>,
    // This is the reference to the TokenPresale program where the presale is managed
    pub presale_program: Program<'info, TokenLaunchpad>,
    pub token_mint: InterfaceAccount<'info, Mint>,
    pub token_program: Interface<'info, TokenInterface>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
}
