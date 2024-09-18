use anchor_lang::prelude::*;
use solana_program::clock::Clock;
use token_launchpad::{
    cpi::initialize as initialize_launchpad,
    cpi::accounts::Initialize as TokenInitialize,
    states::{
        ListingOpt,
        LiquidityType,
        RefundType,
        PresaleParams
    }
};

pub mod instructions;
pub mod states;
pub mod constants;
pub mod errors;
pub mod utils;
pub mod events;
use crate::{
    instructions::*,
    errors::*,
    events::LaunchpadCreated
};
use crate::utils::*;


declare_id!("3EWEm3bTAdMPawiD1pAzRyXRsMjYJbwhHSiRWy7VimMx");

#[program]
pub mod launchpad_factory {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, creator_fee: u64, service_fee: u16) -> Result<()> {
        let factory = &mut ctx.accounts.factory_config;
        factory.admin = ctx.accounts.admin.key();
        factory.creator_fee = creator_fee;
        factory.service_fee = service_fee;
        factory.fee_collector = ctx.accounts.fee_collector_info.key();

        Ok(())
    }

    pub fn set_creator_fee(ctx: Context<SetCreatorFee>, creator_fee: u64) -> Result<()> {
        let factory: &mut Box<Account<'_, states::Factory>> = &mut ctx.accounts.factory_config;
        require!(factory.admin == *ctx.accounts.admin.key, FactoryError::Unauthorized);
        factory.creator_fee = creator_fee;

        Ok(())
    }

    pub fn set_service_fee(ctx: Context<SetServiceFee>, service_fee: u16) -> Result<()> {
        let factory: &mut Box<Account<'_, states::Factory>> = &mut ctx.accounts.factory_config;
        require!(factory.admin == *ctx.accounts.admin.key, FactoryError::Unauthorized);

        factory.service_fee = service_fee;
        Ok(())
    }

    pub fn set_fee_collector(ctx: Context<SetFeeCollector>) -> Result<()> {
        let factory: &mut Box<Account<'_, states::Factory>> = &mut ctx.accounts.factory_config;
        require!(factory.admin == *ctx.accounts.admin.key, FactoryError::Unauthorized);

        factory.fee_collector = ctx.accounts.fee_collector_info.key();
        Ok(())
    }

    pub fn create_presale(
        ctx: Context<CreatePresale>,
        token_price: u64,
        presale_tokens: u64,
        hard_cap: u64,
        soft_cap: u64,
        min_contribution: u64,
        max_contribution: u64,
        start_time: i64,
        end_time: i64,
        listing_rate: u64,
        liquidity_bp: u16,
        refund_type: RefundType,
        listing_opt: ListingOpt,
        liquidity_type: LiquidityType,
        enable_whitelist: bool
    ) -> Result<()> {
        let presale_account = &mut ctx.accounts.presale;
        let token_mint = &ctx.accounts.token_mint;
        let owner = &ctx.accounts.owner;
        let factory = &mut ctx.accounts.factory_config;
        let fee_collector = &mut ctx.accounts.fee_collector;

        require!(factory.fee_collector == *fee_collector.key, FactoryError::InvalidFeeAccount);

        transfer_sols(&ctx.accounts.owner.to_account_info(), &fee_collector, &ctx.accounts.system_program.to_account_info(), factory.creator_fee)?;

        // Initialize the presale program with provided parameters
        let cpi_ctx = CpiContext::new(
           ctx.accounts.presale_program.to_account_info(),
           TokenInitialize {
            owner: owner.to_account_info(),
            presale: presale_account.to_account_info(),
            token: token_mint.to_account_info(),
            system_program: ctx.accounts.system_program.to_account_info(),
            token_program: ctx.accounts.token_program.to_account_info(),
            token_vault_account: ctx.accounts.token_vault_account.to_account_info(),
            vault: ctx.accounts.vault.to_account_info(),
            fee_collector: fee_collector.clone()
           }
        );

        let presale_config = PresaleParams {
            token_price ,
            hard_cap,
            soft_cap,
            min_contribution,
            max_contribution,
            start_time,
            end_time,
            listing_rate,
            liquidity_bp,
            service_fee: factory.service_fee,
            refund_type,
            listing_opt,
            liquidity_type,
            enable_whitelist
        };
        
        // Call the `initialize_presale` function from the TokenPresale program
        initialize_launchpad(
            cpi_ctx,
            presale_config
        )?;

        transfer_tokens(
            ctx.accounts.owner_token_account.to_account_info(), 
            ctx.accounts.token_vault_account.to_account_info(), 
            ctx.accounts.token_mint.clone(), 
            ctx.accounts.owner.to_account_info(),
            ctx.accounts.token_program.to_account_info(),
            presale_tokens
        )?;

        emit!(LaunchpadCreated {
            launchpad: presale_account.key(),
            owner: owner.key(),
            timestamp: Clock::get().unwrap().unix_timestamp
        });

        Ok(())
    }

}

