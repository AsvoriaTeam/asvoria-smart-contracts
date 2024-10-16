use anchor_lang::prelude::*;
use solana_program::clock::Clock;

use crate::{PoolInfo, UserInfo, Total};

pub fn configure_pool<'info>(
    pool_account: &mut Account<'info, PoolInfo>,
    _apy: u8,
    _duration: u8
) -> Result<()> {

    let clock = Clock::get()?;
    
    let timestamp: u64 = clock.unix_timestamp as u64;
 
    pool_account.duration = _duration as u64 * 30 * 24 * 60 * 60;
    pool_account.apy = _apy;
    pool_account.last_reward_time = timestamp;

    Ok(())

}

pub fn get_multiplier(from: u64, to: u64) -> u64 {
    let result = to.checked_sub(from).unwrap();
    result
}

pub fn update_pool<'info>(
    pool_account: &mut Account<'info, PoolInfo>
) -> Result<()> {
    
    let clock = Clock::get()?;

    let timestamp: u64 = clock.unix_timestamp as u64;

    if timestamp <= pool_account.last_reward_time {
        return Ok(());
    }

    let lp_supply = pool_account.total_supply;

    if lp_supply == 0 {
        return Ok(());
    }

    let multiplier = get_multiplier(pool_account.last_reward_time, timestamp);

    let token_reward = (multiplier * (lp_supply * pool_account.apy as u64) / 100) / (365 * 100);

    let token_reward_changed = token_reward / lp_supply;

    pool_account.acc_token_per_share = pool_account.acc_token_per_share + token_reward_changed;

    pool_account.last_reward_time = timestamp;

    Ok(())
}

pub fn lock_pending_token<'info>(
    pool: &mut Account<'info, PoolInfo>,
    user: &mut Account<'info, UserInfo>,
    total_stats: &mut Account<'info, Total>,
) -> Result<()> {

    let pending = (user.amount * pool.acc_token_per_share) - user.reward_debt;

    user.reward_lockedup = user.reward_lockedup + pending;

    total_stats.total_lockedup_rewards = total_stats.total_lockedup_rewards + pending;

    Ok(())
}
