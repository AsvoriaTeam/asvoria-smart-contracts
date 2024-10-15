use anchor_lang::prelude::*;

use anchor_spl::token_interface::{transfer_checked, TransferChecked};
use solana_program::clock::Clock;

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
        let total_stats_account = &mut ctx.accounts.total_stats_account;
        admin_account.admin = ctx.accounts.signer.key();
        total_stats_account.total_lockedup_rewards = 0;
        total_stats_account.total_claimed_rewards = 0;

        Ok(())
    }

    pub fn initialize_pools(ctx: Context<InitializePools>) -> Result<()> {   
        let admin_account = &mut ctx.accounts.admin_account;
        require!(
            admin_account.admin == *ctx.accounts.admin.key, 
            ErrorCode::NotAllowed
        );

        let _ = configure_pool(&mut ctx.accounts.pool_account_1_month, 1, 1);
        let _ = configure_pool(&mut ctx.accounts.pool_account_3_month, 4, 3);
        let _ = configure_pool(&mut ctx.accounts.pool_account_6_month, 8, 6);
        let _ = configure_pool(&mut ctx.accounts.pool_account_9_month, 12, 9);
        let _ = configure_pool(&mut ctx.accounts.pool_account_12_month, 18, 12);

        Ok(())
    }
}
