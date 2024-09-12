use anchor_lang::prelude::*;
use anchor_lang::solana_program::{program::invoke, system_instruction};
use anchor_spl::token_interface::{TransferChecked, transfer_checked};
use anchor_spl::token::Mint;

use crate::errors::PresaleError;

pub fn transfer_sols<'info>(
    from: &AccountInfo<'info>,
    to: &AccountInfo<'info>,
    system_program: &AccountInfo<'info>,
    amount: u64,
) -> Result<()> {
    let transfer_ix = system_instruction::transfer(
        &from.key(),
        &to.key(),
        amount,
    );

    invoke(
        &transfer_ix,
        &[
            from.to_account_info(),
            to.to_account_info(),
            system_program.to_account_info(),
        ],
    )?;

    Ok(())
}

pub fn transfer_tokens<'info>(
    from: AccountInfo<'info>,
    to: AccountInfo<'info>,
    token_program: AccountInfo<'info>,
    mint: Account<'info, Mint>,
    amount: u64,
) -> Result<()> {
    // Set up the CPI (Cross-Program Invocation) context
    let cpi_accounts = TransferChecked {
        from: from.clone(),
        to: to.clone(),
        authority: from.clone(),
        mint: mint.to_account_info().clone()
    };
    let cpi_program = token_program.clone();
    let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);

    // Invoke the transfer based on the token program
    transfer_checked(cpi_ctx, amount, mint.decimals)?;
    Ok(())
}

pub fn tranfer_sol_from_vault<'info>(
    vault: AccountInfo<'info>,
    user: AccountInfo<'info>,
    amount: u64
) -> Result<()> {   

    let vault_lamports = **vault.lamports.borrow();

    require!(vault_lamports > amount, PresaleError::InsufficientFunds);

    **vault.try_borrow_mut_lamports()? -= amount;
    **user.try_borrow_mut_lamports()? += amount;

    Ok(())
}



