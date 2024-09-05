use anchor_lang::prelude::*;

declare_id!("7p4mLDWLVj7d36G4kVj6s4uWs5bMGymt4KVpFF6tqYdW");

#[program]
pub mod token_launchpad {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
