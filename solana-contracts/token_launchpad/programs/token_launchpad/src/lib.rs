use anchor_lang::prelude::*;
use anchor_spl::token::{self, Transfer};
use solana_program::clock::Clock;

declare_id!("7p4mLDWLVj7d36G4kVj6s4uWs5bMGymt4KVpFF6tqYdW");

pub mod instructions;
pub mod states;
pub mod errors;
pub mod events;
pub mod utils;
pub mod constants;
use crate::{states::*, errors::PresaleError, instructions::*, events::*, utils::*};

#[program]
pub mod token_launchpad {
    use constants::TOKEN_VAULT_SEED;

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
        let vault = &mut ctx.accounts.vault;
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
        presale.owner = ctx.accounts.owner.key();
        vault.authority = ctx.accounts.owner.key();
        
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
        // transfer sol amount to the vault pda account
        transfer_sols(&ctx.accounts.user.to_account_info(), &ctx.accounts.vault.to_account_info(), &ctx.accounts.system_program.to_account_info(), amount)?;

        let tokens = amount.checked_mul(10u64.pow(ctx.accounts.token.decimals as u32)).and_then(|f| f.checked_div(presale.token_price)).unwrap();

        presale.total_raised += amount;
        contribution.amount += amount;
        contribution.contributor = ctx.accounts.user.key();
        contribution.tokens_purchased = tokens;

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
            presale.owner == *ctx.accounts.user.key,
            PresaleError::Unauthorized
        );

        require!(
            Clock::get().unwrap().unix_timestamp > presale.end_time 
            || presale.total_raised >= presale.hard_cap,
            PresaleError::PresaleNotEnded
        );

        presale.presale_ended = true;

        if presale.total_raised >= presale.soft_cap {

            let sol_sold_fee = presale.total_raised.checked_add(presale.service_fee as u64).and_then(|f| f.checked_div(10000)).unwrap();

            // check listing type for auto or manual
            if presale.listing_opt == ListingOpt::Auto {
                let net_raised = presale.total_raised.checked_sub(sol_sold_fee).unwrap();
                let sol_for_liquidity = net_raised.checked_mul(presale.liquidity_bp as u64).and_then(|f| f.checked_div(10000)).unwrap();
                let sol_for_owner = net_raised.checked_sub(sol_for_liquidity).unwrap();

                // pay sol_sold_fee to fee collector 
                // add liquidity
                // pay sol_for_owner to owner

                if presale.liquidity_type == LiquidityType::Burn {
                    // burn lp tokens
                }
               
            } else {
                // pay sol_sold_fee to fee collector 
                let sol_for_owner = presale.total_raised.checked_sub(sol_sold_fee).unwrap();
                // pay sol_for_owner to owner
            }

            if presale.refund_type == RefundType::Burn {
                // burn spl token
            }

        } else {
            presale.presale_refund = true;
        }
        
        emit!(PresaleFinalized {
            success: true,
            timestamp: Clock::get().unwrap().unix_timestamp
        });

        Ok(())
    }

    pub fn cancel_presale(ctx: Context<CancelPresale>) -> Result<()> {
        let presale = &mut ctx.accounts.presale;
        require!(
            presale.owner == *ctx.accounts.user.key,
            PresaleError::Unauthorized
        );

        presale.presale_canceled = true;
        presale.presale_refund = true;

        emit!(PresaleCanceled {
            success: true,
            timestamp: Clock::get().unwrap().unix_timestamp
        });

        Ok(())
    }

    pub fn withdraw_unsold_tokens(ctx: Context<WithdrawUnsoldTokens>) -> Result<()> {
        let presale = &mut ctx.accounts.presale;
        require!(
            presale.owner == *ctx.accounts.owner.key,
            PresaleError::Unauthorized
        );

        require!(presale.presale_ended, PresaleError::PresaleEndedOrCanceled);
        require!(presale.presale_canceled, PresaleError::PresaleEndedOrCanceled);

        // get token_valut remaining token balance and transfer it to the owner

        Ok(())
    }

    pub fn claim_tokens(ctx: Context<ClaimTokens>) -> Result<()> {
        let presale: &Account<'_, PresaleState> = &ctx.accounts.presale;
        let contribution = &mut ctx.accounts.contribution;

        require!(presale.presale_ended, PresaleError::PresaleNotFinalized);
        require!(!presale.presale_canceled, PresaleError::PresaleCanceled);
        require!(!presale.presale_refund, PresaleError::PresaleRefund);
        require!(contribution.amount > 0, PresaleError::NoTokensToClaim);

        let owner_key = ctx.accounts.owner.key();

        let bump = ctx.bumps.token_vault_account;
        let signer: &[&[&[u8]]] = &[&[TOKEN_VAULT_SEED, owner_key.as_ref(), &[bump]]];

        token::transfer(
            CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(), 
                Transfer {
                    from: ctx.accounts.token_vault_account.to_account_info(),
                    to: ctx.accounts.user_token_account.to_account_info(),
                    authority: ctx.accounts.token_vault_account.to_account_info()
                }, 
                signer,
            ),
            contribution.tokens_purchased
        )?;

        contribution.amount = 0;
        contribution.tokens_purchased = 0;

        Ok(())
    }

    pub fn refund_contributors(ctx: Context<RefundContributors>) -> Result<()> {
        let presale = &ctx.accounts.presale;
        let contribution = &mut ctx.accounts.contribution;

        require!(presale.presale_refund, PresaleError::PresaleNotRefunded);
        require!(contribution.contributor == ctx.accounts.user.key(), PresaleError::Unauthorized);

        let refund_amount: u64 = contribution.amount;
        if refund_amount > 0 {
            contribution.amount = 0;
            contribution.tokens_purchased = 0;

            // Transfer SOL back to the user
            tranfer_sol_from_vault(ctx.accounts.vault.to_account_info(), ctx.accounts.user.to_account_info(), refund_amount)?;
            // let vault_lamports = **ctx.accounts.vault.to_account_info().lamports.borrow();

            // require!(vault_lamports > refund_amount, PresaleError::InsufficientFunds);
            // **ctx.accounts.vault.to_account_info().try_borrow_mut_lamports()? -= refund_amount;
            // **ctx.accounts.user.to_account_info().try_borrow_mut_lamports()? += refund_amount;
        
        }

        Ok(())
    }
}



