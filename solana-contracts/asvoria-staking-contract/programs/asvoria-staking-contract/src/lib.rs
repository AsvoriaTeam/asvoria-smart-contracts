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
use crate::{constants::* ,errors::ErrorCode, events::*, states::*, instructions::*, utils::*};

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

    pub fn create_pool(ctx: Context<CreatePool>, _apy: u8, _duration: u8) -> Result<()> {   
        let admin_account = &mut ctx.accounts.admin_account;
        require!(
            admin_account.admin == *ctx.accounts.admin.key, 
            ErrorCode::NotAllowed
        );

        configure_pool(&mut ctx.accounts.pool_account, _apy, _duration)?;

        Ok(())
    }

    pub fn deposit(ctx: Context<Deposit>, _amount: u64) -> Result<()> {
        let pool = &mut ctx.accounts.pool_info_account;
        let user = &mut ctx.accounts.user_info_account;
        let total_stats = &mut ctx.accounts.total_stats_account;
        // let clock = Clock::get()?;

        msg!("pool Account: {:?}", pool.key().to_string());
        msg!("user Account: {:?}", user.key().to_string());
        msg!("total_stats Account: {:?}", total_stats.key().to_string());
        msg!("stake_account Account: {:?}", ctx.accounts.stake_account.key().to_string());
        // update_pool(pool)?;
        // lock_pending_token(pool, user, total_stats)?;

        // let stake_amount = _amount.checked_mul(10u64.pow(ctx.accounts.mint.decimals as u32)).unwrap_or(0);
        // // let stake_amount = _amount * (10u64.pow(ctx.accounts.mint.decimals as u32));

        // if stake_amount > 0 {
        //     if user.amount == 0 {
        //         user.timestamp = clock.unix_timestamp as u64;
        //     }
        //     // implement Transfer token
        //     transfer_checked(
        //         CpiContext::new(
        //             ctx.accounts.token_program.to_account_info(),
        //             TransferChecked {
        //                 from: ctx.accounts.user_token_account.to_account_info(),
        //                 mint: ctx.accounts.mint.to_account_info(),
        //                 to: ctx.accounts.stake_account.to_account_info(),
        //                 authority: ctx.accounts.user.to_account_info(),
        //             },
        //         ),
        //         stake_amount, ctx.accounts.mint.decimals
        //     )?;

        //     user.amount = user.amount.checked_add(stake_amount).unwrap_or(0);
        //     pool.total_supply = pool.total_supply.checked_add(stake_amount).unwrap_or(0);

        //     //emit deposit event
        //     emit!(DepositEvent {
        //         from: ctx.accounts.user.key(),
        //         pool: pool.to_account_info().key(),
        //         amount: stake_amount,
        //         timestamp: clock.unix_timestamp
        //     });
        // }

        Ok(())
    }

    pub fn withdraw(ctx: Context<Withdraw>) -> Result<()> {
        let pool = &mut ctx.accounts.pool_info_account;
        let user = &mut ctx.accounts.user_info_account;
        let total_stats = &mut ctx.accounts.total_stats_account;
        let clock = Clock::get()?;

        // let unstake_period = user.timestamp + pool.duration; // use this for production

        let unstake_period = user.timestamp + 600; // use this for testing.. 

        require!(
            clock.unix_timestamp as u64 >= unstake_period,
            ErrorCode::StakingNotExpired
        );

        update_pool(pool)?;
        lock_pending_token(pool, user, total_stats)?;

        let amount = user.amount;

        if amount > 0 {
            user.amount = user.amount - amount;
            pool.total_supply = pool.total_supply - amount;

            let staker = ctx.accounts.user.key();
            let pool_account = pool.to_account_info().key();
            let bump = ctx.bumps.stake_account;
            let signer: &[&[&[u8]]] = &[&[TOKEN_SEED, staker.as_ref(), pool_account.as_ref(), &[bump]]];

            // transferring stake amount
            transfer_checked(
                CpiContext::new_with_signer(
                    ctx.accounts.token_program.to_account_info(), 
                    TransferChecked{
                        from: ctx.accounts.stake_account.to_account_info(),
                        mint: ctx.accounts.mint.to_account_info(),
                        authority: ctx.accounts.stake_account.to_account_info(),
                        to: ctx.accounts.user_token_account.to_account_info()
                    }, 
                    signer
                ), 
                amount, ctx.accounts.mint.decimals
            )?;

            emit!(WithdrawEvent {
                amount: amount,
                user: ctx.accounts.user.key(),
                pool: pool.to_account_info().key(),
                timestamp: clock.unix_timestamp
            });
        }

        let rewards = user.reward_lockedup;

        if rewards > 0 {
            user.reward_lockedup = user.reward_lockedup - rewards;
            user.reward_debt = rewards;
            total_stats.total_lockedup_rewards = total_stats.total_lockedup_rewards - rewards;
            total_stats.total_claimed_rewards = total_stats.total_claimed_rewards + rewards;

            let vault_bump = ctx.bumps.token_vault_account;
            let vault_signer: &[&[&[u8]]] = &[&[VAULT_SEED, &[vault_bump]]];

            // transferring rewards
            transfer_checked(
                CpiContext::new_with_signer(
                    ctx.accounts.token_program.to_account_info(), 
                    TransferChecked{
                        from: ctx.accounts.token_vault_account.to_account_info(),
                        mint: ctx.accounts.mint.to_account_info(),
                        to: ctx.accounts.user_token_account.to_account_info(),
                        authority: ctx.accounts.token_vault_account.to_account_info()
                    }, 
                    vault_signer
                ), 
                rewards, ctx.accounts.mint.decimals
            )?;

            emit!(RewardTransferEvent{
                pool: pool.to_account_info().key(),
                user: ctx.accounts.user.key(),
                reward: rewards,
                timestamp: clock.unix_timestamp
            });
        }


        Ok(())
    }

    pub fn withdraw_tokens_from_vault(ctx: Context<WithdrawFromVault>) -> Result<()> {
        let admin_account = &mut ctx.accounts.admin_account;
        require!(
            admin_account.admin == *ctx.accounts.admin.key, 
            ErrorCode::NotAllowed
        );

        let token_balance = ctx.accounts.token_vault_account.amount;
        let vault_bump = ctx.bumps.token_vault_account;
        let vault_signer: &[&[&[u8]]] = &[&[VAULT_SEED, &[vault_bump]]];

        // transferring rewards
        transfer_checked(
            CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(), 
                TransferChecked{
                    from: ctx.accounts.token_vault_account.to_account_info(),
                    mint: ctx.accounts.mint.to_account_info(),
                    to: ctx.accounts.admin_token_account.to_account_info(),
                    authority: ctx.accounts.token_vault_account.to_account_info()
                }, 
                vault_signer
            ), 
            token_balance, ctx.accounts.mint.decimals
        )?;


        Ok(())
    }

}
