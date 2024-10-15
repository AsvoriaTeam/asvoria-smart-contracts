use anchor_lang::prelude::*;

declare_id!("5e879LHNF7n4MxSfSiugekAM1dvJxyZsfzn4919iM1As");

#[program]
pub mod asvoria_staking_contract {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
