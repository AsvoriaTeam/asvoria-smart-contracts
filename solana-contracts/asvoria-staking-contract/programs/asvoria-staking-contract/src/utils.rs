use anchor_lang::prelude::*;
use solana_program::clock::Clock;

use crate::PoolInfo;

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