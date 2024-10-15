use anchor_lang::prelude::*;

use anchor_spl::{
    associated_token::AssociatedToken,
    token_interface::{transfer_checked, TransferChecked}
};
use solana_program::{clock::Clock, pubkey, pubkey::Pubkey};

declare_id!("5e879LHNF7n4MxSfSiugekAM1dvJxyZsfzn4919iM1As");

pub mod constants;
pub mod errors;
pub mod events;
pub mod states;
pub mod instructions;
pub mod utils;
use crate::{constants::*, errors::ErrorCode, events::*, states::*, instructions::*, utils::*};

#[program]
pub mod asvoria_staking_contract {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let admin_account = &mut ctx.accounts.admin;
        let total_stats_account = &mut ctx.account.total_stats_account;
        admin_account.admin = ctx.accounts.signer.key();
        total_stats_account.total_lockedup_rewards = 0;
        total_stats_account.total_claimed_rewards = 0;

        Ok(())
    }

    pub fn Initialize_Pools(ctx: Context<InitializePools>) -> Result<()> {   
        let admin_account = &mut ctx.accounts.admin_account;
        require!(
            admin_account.admin == *ctx.accounts.signer.key, 
            ErrorCode::NotAllowed
        );

        configure_pool(&mut ctx.accounts.pool_account_1_month, 1, 1);
        configure_pool(&mut ctx.accounts.pool_account_3_month, 4, 3);
        configure_pool(&mut ctx.accounts.pool_account_6_month, 8, 6);
        configure_pool(&mut ctx.accounts.pool_account_9_month, 12, 9);
        configure_pool(&mut ctx.accounts.pool_account_12_month, 18, 12);

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
