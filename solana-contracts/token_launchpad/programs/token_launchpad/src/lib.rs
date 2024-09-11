use anchor_lang::prelude::*;
use anchor_spl::token::{self, Transfer};
use solana_program::clock::Clock;

declare_id!("7p4mLDWLVj7d36G4kVj6s4uWs5bMGymt4KVpFF6tqYdW");

pub mod instructions;
pub mod states;
pub mod errors;
pub mod events;
use crate::{states::*, errors::PresaleError, instructions::*, events::*};

#[program]
pub mod token_launchpad {
    use super::*;

    pub fn initialize(
        ctx: Context<Initialize>,
        token_price: u64,
        hard_cap: u64,
        soft_cap: u64,
        min_contribution: u64,
        max_contribution: u64,
        start_time: i64,
        end_time: i64,
        listing_rate: u64,
        liquidity_bp: u16,
        service_fee: u16,
        refund_type: RefundType,
        listing_opt: ListingOpt,
        liquidity_type: LiquidityType,
        fee_collector: Pubkey,
        enable_whitelist: bool
    ) -> Result<()> {
        let presale = &mut ctx.accounts.presale;
        presale.token_price = token_price;
        presale.hard_cap = hard_cap;
        presale.soft_cap = soft_cap;
        presale.min_contribution = min_contribution;
        presale.max_contribution = max_contribution;
        presale.start_time = start_time;
        presale.end_time = end_time;
        presale.listing_rate = listing_rate;
        presale.liquidity_bp = liquidity_bp;
        presale.service_fee = service_fee;
        presale.refund_type = refund_type;
        presale.listing_opt = listing_opt;
        presale.liquidity_type = liquidity_type;
        presale.total_raised = 0;
        presale.presale_ended = false;
        presale.presale_canceled = false;
        presale.presale_refund = false;
        presale.fee_collector = fee_collector;
        presale.enable_whitelist = enable_whitelist;

        Ok(())
    }

    pub fn contribute(ctx: Context<Contribute>, amount: u64) -> Result<()> {
        let presale = &mut ctx.accounts.presale;
        let contribution = &mut ctx.accounts.contribution;
        
        require!(
            Clock::get().unwrap().unix_timestamp >= presale.start_time 
            && Clock::get().unwrap().unix_timestamp <= presale.end_time,
            PresaleError::PresaleNotActive
        );
        require!(
            !presale.presale_ended,
            PresaleError::PresaleEnded
        );
        require!(
            !presale.presale_canceled,
            PresaleError::PresaleCanceled
        );
        require!(
            amount >= presale.min_contribution && amount <= presale.max_contribution,
            PresaleError::ContributionNotWithinLimits
        );
        require!(
            presale.total_raised + amount <= presale.hard_cap,
            PresaleError::ExceedsHardCap
        );

        // Transfer tokens from the user to the presale account
        // let tokens = amount.checked_mul(10u64.pow(presale.token_decimals)).and_then(|f| f.checked_div(presale.token_price)).unwrap();
        

        presale.total_raised += amount;
        contribution.amount += amount;

        emit!(TokensPurchased {
            purchaser: ctx.accounts.user.key(),
            amount: amount,
            timestamp: Clock::get().unwrap().unix_timestamp
        });

        Ok(())
    }

    pub fn finalize_presale(ctx: Context<FinalizePresale>) -> Result<()> {
        let presale = &mut ctx.accounts.presale;
        require!(
            Clock::get().unwrap().unix_timestamp > presale.end_time 
            || presale.total_raised >= presale.hard_cap,
            PresaleError::PresaleNotEnded
        );

        presale.presale_ended = true;

        if presale.total_raised >= presale.soft_cap {
            // Handle liquidity and fund distribution based on options
            // Logic for listingOpt, refundType, liquidityType
        } else {
            // Refund contributors if the soft cap is not met
            presale.presale_refund = true;
        }

        emit!(PresaleFinalized {
            success: true,
            timestamp: Clock::get().unwrap().unix_timestamp
        });

        Ok(())
    }

    pub fn claim_tokens(ctx: Context<ClaimTokens>) -> Result<()> {
        let presale = &ctx.accounts.presale;
        let contribution = &mut ctx.accounts.contribution;

        require!(presale.presale_ended, PresaleError::PresaleNotFinalized);
        require!(!presale.presale_canceled, PresaleError::PresaleCanceled);
        require!(!presale.presale_refund, PresaleError::PresaleRefund);
        require!(contribution.amount > 0, PresaleError::NoTokensToClaim);

        let token_amount = (contribution.amount * 10u64.pow(6)) / presale.token_price;

        // Transfer tokens to the user
        let cpi_accounts = Transfer {
            from: ctx.accounts.token_account.to_account_info(),
            to: ctx.accounts.user_token_account.to_account_info(),
            authority: ctx.accounts.presale.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        token::transfer(cpi_ctx, token_amount)?;

        contribution.amount = 0;

        Ok(())
    }

    pub fn refund_contributors(ctx: Context<RefundContributors>) -> Result<()> {
        let presale = &ctx.accounts.presale;
        let contribution = &mut ctx.accounts.contribution;

        require!(presale.presale_refund, PresaleError::PresaleNotRefunded);

        let refund_amount: u64 = contribution.amount;
        contribution.amount = 0;

        // Transfer SOL back to the user

        Ok(())
    }
}



