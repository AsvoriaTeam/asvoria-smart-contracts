use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken, 
    token_interface::{Mint, TokenAccount, TokenInterface}
};

use crate::{
    states::*,
    constants::*
};

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(
        init,
        payer = signer,
        seeds = [ADMIN_ACCOUNT_SEED],
        bump,
        space = 8 + std::mem::size_of::<Admin>()
    )]
    pub admin: Box<Account<'info, Admin>>,

    #[account(
        init,
        payer = signer,
        seeds = [TOTAL_STATS_SEED],
        bump,
        space = 8 + std::mem::size_of::<Total>()
    )]
    pub total_stats_account: Box<Account<'info, Total>>,

    #[account(
        init,
        payer = signer,
        seeds = [VAULT_SEED],
        bump,
        token::mint = mint,
        token::authority = token_vault_account,
    )]
    pub token_vault_account: InterfaceAccount<'info, TokenAccount>,

    pub mint: InterfaceAccount<'info, Mint>,
    pub token_program: Interface<'info, TokenInterface>,
    pub system_program: Program<'info, System>,
}


#[derive(Accounts)]
#[instruction(_apy: u8, _duration: u8)]
pub struct CreatePool<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,

    #[account(mut)]
    pub admin_account: Account<'info, Admin>,

    #[account(
        init,
        payer = admin,
        seeds = [POOL_INFO_SEED, &[_apy].as_ref(), &[_duration].as_ref()],
        bump,
        space = 8 + std::mem::size_of::<PoolInfo>()
    )]
    pub pool_account: Box<Account<'info, PoolInfo>>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Deposit<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(
        mut
    )]
    pub total_stats_account: Box<Account<'info, Total>>,

    #[account(
        mut
    )]
    pub pool_info_account: Box<Account<'info, PoolInfo>>,

    #[account(
        init_if_needed,
        payer = signer, 
        seeds = [TOKEN_SEED, signer.key().as_ref(), pool_info_account.to_account_info().key().as_ref()], 
        bump, 
        token::mint = mint,
        token::authority = stake_account
    )]
    pub stake_account: InterfaceAccount<'info, TokenAccount>,

    #[account(
        init_if_needed,
        payer = signer, 
        seeds = [USER_INFO_SEED, signer.key().as_ref(), pool_info_account.to_account_info().key().as_ref()], 
        bump, 
        space = 8 + std::mem::size_of::<UserInfo>(),
    )]
    pub user_info_account: Box<Account<'info, UserInfo>>,

    #[account(
        mut, 
        associated_token::mint = mint, 
        associated_token::authority = signer,
        associated_token::token_program = token_program
    )]
    pub user_token_account: InterfaceAccount<'info, TokenAccount>,

    pub mint: InterfaceAccount<'info, Mint>,
    pub token_program: Interface<'info, TokenInterface>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,

}

#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(mut)]
    pub total_stats_account: Account<'info, Total>,

    #[account(mut)]
    pub pool_info_account: Account<'info, PoolInfo>,

    #[account(
        mut,
        seeds = [USER_INFO_SEED, user.key().as_ref(), pool_info_account.to_account_info().key().as_ref()], 
        bump, 
    )]
    pub user_info_account: Account<'info, UserInfo>,

    #[account(
        mut,
        seeds = [TOKEN_SEED, user.key().as_ref(), pool_info_account.to_account_info().key().as_ref()], 
        bump, 
    )]
    pub stake_account: InterfaceAccount<'info, TokenAccount>,

    #[account(
        mut, 
        associated_token::mint = mint, 
        associated_token::authority = user,
        associated_token::token_program = token_program
    )]
    pub user_token_account: InterfaceAccount<'info, TokenAccount>,

    #[account(
        mut,
        seeds = [VAULT_SEED],
        bump
    )]
    pub token_vault_account: InterfaceAccount<'info, TokenAccount>,

    pub mint: InterfaceAccount<'info, Mint>,
    pub token_program: Interface<'info, TokenInterface>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,

}

#[derive(Accounts)]
pub struct WithdrawFromVault<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,

    #[account(mut)]
    pub admin_account: Account<'info, Admin>,

    #[account(
        mut,
        seeds = [VAULT_SEED],
        bump
    )]
    pub token_vault_account: InterfaceAccount<'info, TokenAccount>,

    #[account(
        mut, 
        associated_token::mint = mint, 
        associated_token::authority = admin,
        associated_token::token_program = token_program
    )]
    pub admin_token_account: InterfaceAccount<'info, TokenAccount>,

    pub mint: InterfaceAccount<'info, Mint>,
    pub token_program: Interface<'info, TokenInterface>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
}
