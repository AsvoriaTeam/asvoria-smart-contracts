use anchor_lang::prelude::*;
use token_launchpad::{
    token_launchpad::initialize as initialize_launchpad,
    instructions::Initialize as TokenInitialize,
    states::{
        ListingOpt,
        LiquidityType,
        RefundType
    }
};

pub mod instructions;
pub mod states;
pub mod constants;
pub mod errors;
pub mod utils;
use crate::{
    instructions::*,
    errors::*
};
use crate::utils::transfer_fee;


declare_id!("C1A3qnPnS3yGv8kwsNHMACRK6TPHQ2ev3bo7zeKvMo7C");

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
        fee_collector: Pubkey,
        enable_whitelist: bool,
    ) -> Result<()> {
        let presale_account = &mut ctx.accounts.presale;
        let token_mint = &ctx.accounts.token_mint;
        let owner = &ctx.accounts.owner;
        let factory = &mut ctx.accounts.factory_config;

        // Initialize the presale program with provided parameters
        let cpi_ctx = CpiContext::new(
           ctx.accounts.presale_program.to_account_info(),
           TokenInitialize {
            owner: owner.clone(),
            presale: presale_account.clone(),
            token: token_mint.clone(),
            system_program: ctx.accounts.system_program
           }
        );
        
        // Call the `initialize_presale` function from the TokenPresale program
        initialize_launchpad(
            cpi_ctx,
            token_price,
            hard_cap,
            soft_cap,
            min_contribution,
            max_contribution,
            start_time,
            end_time,
            listing_rate,
            liquidity_bp,
            factory.service_fee,
            refund_type,
            listing_opt,
            liquidity_type,
            fee_collector,
            enable_whitelist
        )?;

        transfer_fee(&owner.to_account_info(), factory.fee_collector, &ctx.accounts.system_program.to_account_info(), factory.creator_fee);

        Ok(())
    }

}

