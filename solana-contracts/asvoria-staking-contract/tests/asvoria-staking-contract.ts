// Client
import {PublicKey, Transaction, sendAndConfirmTransaction} from "@solana/web3.js";
import {createTransferInstruction, TOKEN_2022_PROGRAM_ID, transferCheckedWithFee} from "@solana/spl-token";

// console.log("My address:", pg.wallet.publicKey.toString());
// const balance = await pg.connection.getBalance(pg.wallet.publicKey);
// console.log(`My balance: ${balance / web3.LAMPORTS_PER_SOL} SOL`);

async function transfer_tokens_to_vault() {
  const connection = pg.connection

  const userTokenAccount = new PublicKey('Cr4CwQfjyPdHYNTd7oHHKJXf8fSSoj3CqyfSkKw6Afoy')
  const token_vault_account = new PublicKey('9DsMc1rVMP9RgjEExVfBXFmismZFrSAQqiiuijxuPxF2')

  const transferAmount = BigInt(10_000_000_000_000);
  const fee = (transferAmount * BigInt(300)) / BigInt(10_000);

  await transferCheckedWithFee(
    connection,
    pg.wallet.keypair,
    userTokenAccount,
    new PublicKey('FgURwKN9ASXFj22cWJnd867rLhzUZrCcdrPJZxdAGyiZ'),
    token_vault_account,
    pg.wallet.publicKey,
    transferAmount,
    9,
    fee,
    [],
    undefined,
    TOKEN_2022_PROGRAM_ID
  );
  
}

transfer_tokens_to_vault().then(() => {
  console.log('done')
})