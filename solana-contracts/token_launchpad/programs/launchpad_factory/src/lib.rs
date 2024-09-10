use anchor_lang::prelude::*;
// use anchor_spl::token::{Token, Mint};
use token_launchpad::instructions::Initialize as TokenInitialize;
use token_launchpad::token_launchpad::initialize as token_initialize;

pub mod instructions;
pub mod states;
pub mod constants;
use crate::instructions::*;


declare_id!("C1A3qnPnS3yGv8kwsNHMACRK6TPHQ2ev3bo7zeKvMo7C");

#[program]
pub mod launchpad_factory {
    use super::*;

    pub fn create_presale(
        ctx: Context<CreatePresale>,
        presale_start: i64,
        presale_end: i64,
        rate: u64,
        hard_cap: u64,
        soft_cap: u64,
        token_supply: u64,
        payment_method: u8, // 0 for SOL, 1 for USDT
    ) -> Result<()> {
        let presale_account = &mut ctx.accounts.presale;
        let token_mint = &ctx.accounts.token_mint;
        let owner = &ctx.accounts.owner;

        // Initialize the presale program with provided parameters
        let cpi_ctx = CpiContext::new(
            ctx.accounts.presale_program.to_account_info(),
            TokenInitialize {
                presale: presale_account.to_account_info(),
                owner: owner.to_account_info(),
                token_mint: token_mint.to_account_info(),
                token_program: ctx.accounts.token_program.to_account_info(),
                rent: ctx.accounts.rent.to_account_info(),
            },
        );
        
        // Call the `initialize_presale` function from the TokenPresale program
        token_initialize(
            cpi_ctx,
            presale_start,
            presale_end,
            rate,
            hard_cap,
            soft_cap,
            token_supply,
            payment_method
        )?;

        Ok(())
    }

}

