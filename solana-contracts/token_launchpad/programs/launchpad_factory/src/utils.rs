use anchor_lang::prelude::*;
use anchor_lang::solana_program::{program::invoke, system_instruction};

pub fn transfer_fee(
    from: AccountInfo,
    to: Pubkey,
    system_program: AccountInfo,
    amount: u64,
) -> Result<()> {
    let ix = system_instruction::transfer(from.key, &to, amount);
    
    invoke(&ix, &[from.clone(), system_program.clone()])?;
    Ok(())
}
