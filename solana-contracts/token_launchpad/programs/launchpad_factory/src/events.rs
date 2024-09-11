use anchor_lang::prelude::*;

#[event]
pub struct LaunchpadCreated {
    pub launchpad: Pubkey,
    pub owner: Pubkey,
    pub timestamp: i64,
}