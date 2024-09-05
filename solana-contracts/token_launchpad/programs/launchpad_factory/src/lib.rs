use anchor_lang::prelude::*;

declare_id!("C1A3qnPnS3yGv8kwsNHMACRK6TPHQ2ev3bo7zeKvMo7C");

#[program]
pub mod launchpad_factory {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
