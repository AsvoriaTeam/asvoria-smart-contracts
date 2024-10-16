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
use crate::{errors::ErrorCode, events::*, states::*, instructions::*, utils::*};

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

    pub fn deposit(ctx: Context<Deposit>, _amount: u64) -> Result<()> {
        let pool = &mut ctx.accounts.pool_info_account;
        let user = &mut ctx.accounts.user_info_account;
        let total_stats = &mut ctx.accounts.total_stats_account;
        let clock = Clock::get()?;

        let _ = update_pool(pool);
        let _ = lock_pending_token(pool, user, total_stats);

        let stake_amount = _amount * (10u64.pow(ctx.accounts.mint.decimals as u32));

        if stake_amount > 0 {
            if user.amount == 0 {
                user.timestamp = clock.unix_timestamp as u64;
            }
            // implement Transfer token
            transfer_checked(
                CpiContext::new(
                    ctx.accounts.token_program.to_account_info(),
                    TransferChecked {
                        from: ctx.accounts.user_token_account.to_account_info(),
                        mint: ctx.accounts.mint.to_account_info(),
                        to: ctx.accounts.stake_account.to_account_info(),
                        authority: ctx.accounts.user.to_account_info(),
                    },
                ),
                stake_amount, ctx.accounts.mint.decimals
            )?;

            user.amount = user.amount + stake_amount;
            pool.total_supply = pool.total_supply + stake_amount;

            //emit deposit event
            emit!(DepositEvent {
                from: ctx.accounts.user.key(),
                pool: pool.to_account_info().key(),
                amount: stake_amount,
                timestamp: clock.unix_timestamp
            });
        }

        Ok(())
    }

    pub fn withdraw(ctx: Context<Withdraw>) -> Result<()> {
        Ok(())
    }

    // pub fn withdraw_tokens_from_vault() -> Result<()> {
    //     Ok(())
    // }

}
