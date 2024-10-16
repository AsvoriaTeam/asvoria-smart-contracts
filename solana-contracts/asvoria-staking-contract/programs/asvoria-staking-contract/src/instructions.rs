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
pub struct InitializePools<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,

    #[account(mut)]
    pub admin_account: Account<'info, Admin>,

    #[account(
        init,
        payer = admin,
        seeds = [POOL_INFO_SEED, &[1].as_ref(), &[1].as_ref()],
        bump,
        space = 8 + std::mem::size_of::<PoolInfo>()
    )]
    pub pool_account_1_month: Box<Account<'info, PoolInfo>>,

    #[account(
        init,
        payer = admin,
        seeds = [POOL_INFO_SEED, &[4].as_ref(), &[3].as_ref()],
        bump,
        space = 8 + std::mem::size_of::<PoolInfo>()
    )]
    pub pool_account_3_month: Box<Account<'info, PoolInfo>>,

    #[account(
        init,
        payer = admin,
        seeds = [POOL_INFO_SEED, &[8].as_ref(), &[6].as_ref()],
        bump,
        space = 8 + std::mem::size_of::<PoolInfo>()
    )]
    pub pool_account_6_month: Box<Account<'info, PoolInfo>>,

    #[account(
        init,
        payer = admin,
        seeds = [POOL_INFO_SEED, &[12].as_ref(), &[9].as_ref()],
        bump,
        space = 8 + std::mem::size_of::<PoolInfo>()
    )]
    pub pool_account_9_month: Box<Account<'info, PoolInfo>>,

    #[account(
        init,
        payer = admin,
        seeds = [POOL_INFO_SEED, &[18].as_ref(), &[12].as_ref()],
        bump,
        space = 8 + std::mem::size_of::<PoolInfo>()
    )]
    pub pool_account_12_month: Box<Account<'info, PoolInfo>>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Deposit<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        mut
    )]
    pub total_stats_account: Account<'info, Total>,

    #[account(
        mut
    )]
    pub pool_info_account: Account<'info, PoolInfo>,

    #[account(
        init_if_needed,
        seeds = [USER_INFO_SEED, user.key().as_ref(), pool_info_account.to_account_info().key().as_ref()], 
        bump, 
        payer = user, 
        space = 8 + std::mem::size_of::<UserInfo>()
    )]
    pub user_info_account: Box<Account<'info, UserInfo>>,

    #[account(
        init_if_needed,
        seeds = [TOKEN_SEED, user.key().as_ref(), pool_info_account.to_account_info().key().as_ref()], 
        bump, 
        payer = user, 
        token::mint = mint,
        token::authority = stake_account
    )]
    pub stake_account: InterfaceAccount<'info, TokenAccount>,

    #[account(
        mut, 
        associated_token::mint = mint, 
        associated_token::authority = user,
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
}