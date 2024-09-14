import * as anchor from '@coral-xyz/anchor'
import { Program } from '@coral-xyz/anchor'
import { Keypair, PublicKey } from '@solana/web3.js'
import { LaunchpadFactory } from '../target/types/launchpad_factory'
import { TokenLaunchpad } from '../target/types/token_launchpad'
import { expect } from 'chai'


describe("token_launchpad", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.LaunchpadFactory as Program<LaunchpadFactory>;
  const signer = Keypair.generate()
  it("Is initialized!", async () => {
    
    const programId = new PublicKey('A1PsWzmpiYJ9mm3kPLxCLUsifn9h7nGDpXmHwmJm11sG')

    const [PDA, bump] = PublicKey.findProgramAddressSync([Buffer.from('factory_config')], programId);

    // Add your test here.
    const tx = await program.methods
                        .initialize(new anchor.BN(0.2), 500)
                        .accounts({
                            admin: signer.publicKey,
                            factoryConfig: PDA,
                            feeCollectorInfo: new PublicKey('4bRYs66kGxujekaRGHJjvjP4g7SCou28FZJ8LPDsyDnR')
                        }).signers([signer]).rpc()

    console.log("Your transaction signature", tx);
  });
});
