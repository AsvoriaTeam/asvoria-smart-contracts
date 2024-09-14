use anchor_lang::prelude::*;
use anchor_lang::solana_program::{program::invoke, system_instruction};
use anchor_spl::token_interface::{Transfer, transfer};
use anchor_spl::token::Mint;

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
    owner: AccountInfo<'info>,
    amount: u64,
) -> Result<()> {
    // Set up the CPI (Cross-Program Invocation) context
    let cpi_accounts = Transfer {
        from: from.clone(),
        to: to.clone(),
        authority: owner.clone(),
    };
    let cpi_program = token_program.clone();
    let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);

    // Invoke the transfer based on the token program
    transfer(cpi_ctx, amount)?;
    Ok(())
}



