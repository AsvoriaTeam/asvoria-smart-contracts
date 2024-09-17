import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import confetti from "canvas-confetti";
import * as anchor from "@project-serum/anchor";
import {
  Commitment,
  Connection,
  PublicKey,
  Transaction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { GatewayProvider } from "@civic/solana-gateway-react";
import Countdown from "react-countdown";
import { Snackbar, Paper, LinearProgress, Chip } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { AlertState, getAtaForMint, toDate } from "./utils";
import { MintButton } from "./MintButton";
import {
  awaitTransactionSignatureConfirmation,
  CANDY_MACHINE_PROGRAM,
  CandyMachineAccount,
  createAccountsForMint,
  getCandyMachineState,
  getCollectionPDA,
  mintOneToken,
  SetupState,
} from "./candy-machine";
import { SnackbarProvider, useSnackbar } from "notistack";

// import verified from "../assets/Standard/verified.svg";
// import ethereum from "../assets/Standard/ethereum.svg";
// import Button from "../components/Shared/Button";
import Countdown1 from "./components/Shared/Countdown";
// import land1 from "../assets/Land/land-1.svg";
// import left_gradient from "../assets/left-gradient.png";
// import News from "../components/landing/News";
// import land2 from "../assets/Land/land-2.svg";
import mint_video from "./assets/mint-video.mp4";
import poster from "./assets/poster.svg";
import Footer from "./layout/Footer";
import Header from "./layout/Header";

const cluster = process.env.REACT_APP_SOLANA_NETWORK!.toString();
const decimals = process.env.REACT_APP_SPL_TOKEN_TO_MINT_DECIMALS
  ? +process.env.REACT_APP_SPL_TOKEN_TO_MINT_DECIMALS!.toString()
  : 9;
const splTokenName = process.env.REACT_APP_SPL_TOKEN_TO_MINT_NAME
  ? process.env.REACT_APP_SPL_TOKEN_TO_MINT_NAME.toString()
  : "TOKEN";

const WalletContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: right;
`;

const WalletAmount = styled.div`
  color: white;
  width: 100%;
  padding: 0;
  min-width: 48px;
  min-height: auto;
  border-radius: 22px;
  background-color: var(--main-text-color);
  box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%),
    0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%);
  box-sizing: border-box;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-weight: 500;
  line-height: 1.75;
  text-transform: uppercase;
  border: 0;
  margin: 20px 0;
  display: inline-flex;
  outline: 0;
  position: relative;
  align-items: center;
  user-select: none;
  vertical-align: middle;
  justify-content: flex-start;
  gap: 10px;
`;

const Wallet = styled.ul`
  flex: 0 0 auto;
  margin: 0;
  padding: 0;
`;

const ConnectButton = styled(WalletMultiButton)`
  border-radius: 0px !important;
  padding: 6px 16px;
  width: 100%;
  height: 43px;
  justify-content: center !important;
  background-color: #8125ff;
  /* background: linear-gradient(135deg, #01fea8 0%, #46a5ff 51.04%, #d632ff 100%); */
  margin: 0 auto;
  /* :hover {
    background: linear-gradient(
      135deg,
      #01fea8 0%,
      #46a5ff 51.04%,
      #d632ff 100%
    ) !important;
  } */
`;

const NFT = styled(Paper)`
  min-width: 500px;
  margin: 0 auto;
  padding: 5px 20px 20px 20px;
  flex: 1 1 auto;
  background-color: var(--card-background-color) !important;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22) !important;
`;

const Card = styled(Paper)`
  display: inline-block;
  background-color: var(--countdown-background-color) !important;
  margin: 5px;
  min-width: 40px;
  padding: 24px;

  h1 {
    margin: 0px;
  }
`;

const MintButtonContainer = styled.div`
  button.MuiButton-contained:not(.MuiButton-containedPrimary).Mui-disabled {
    color: #464646;
  }

  button.MuiButton-contained:not(.MuiButton-containedPrimary):hover,
  button.MuiButton-contained:not(.MuiButton-containedPrimary):focus {
    -webkit-animation: pulse 1s;
    animation: pulse 1s;
    box-shadow: 0 0 0 2em rgba(255, 255, 255, 0);
  }

  @-webkit-keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 #ef8f6e;
    }
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 #ef8f6e;
    }
  }
`;

const SolExplorerLink = styled.a`
  color: var(--title-text-color);
  border-bottom: 1px solid var(--title-text-color);
  font-weight: bold;
  list-style-image: none;
  list-style-position: outside;
  list-style-type: none;
  outline: none;
  text-decoration: none;
  text-size-adjust: 100%;

  :hover {
    border-bottom: 2px solid var(--title-text-color);
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-right: 4%;
  margin-left: 4%;
  text-align: center;
  justify-content: center;
`;

const MintContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;
  flex-wrap: wrap;
  gap: 20px;
`;

const DesContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  gap: 20px;
`;

const Price = styled(Chip)`
  position: absolute;
  margin: 5px;
  font-weight: bold;
  font-size: 1.2em !important;
  font-family: "Patrick Hand", cursive !important;
`;

const Image = styled.img`
  height: 400px;
  width: auto;
  border-radius: 7px;
  box-shadow: 5px 5px 40px 5px rgba(0, 0, 0, 0.5);
`;

const BorderLinearProgress = styled(LinearProgress)`
  margin: 20px 0;
  height: 12px !important;
  border-radius: 30px;
  border: 2px solid #2b2a2a;
  box-shadow: 5px 5px 40px 5px rgba(0, 0, 0, 0.5);
  /* background: linear-gradient(
      135deg,
      #01fea8 0%,
      #46a5ff 51.04%,
      #d632ff 100%
    ); */
  background: #545454 !important;

  > div.MuiLinearProgress-barColorPrimary {
    background-image: linear-gradient(
      135deg,
      #01fea8 0%,
      #46a5ff 51.04%,
      #d632ff 100%
    ) !important;

    /* background-color: #01fea8 !important; */
  }

  > div.MuiLinearProgress-bar1Determinate {
    border-radius: 30px !important;
    background-image: linear-gradient(
      270deg,
      rgba(255, 255, 255, 0.01),
      rgba(255, 255, 255, 0.5)
    );
  }
`;

export interface HomeProps {
  candyMachineId?: anchor.web3.PublicKey;
  connection: anchor.web3.Connection;
  txTimeout: number;
  rpcHost: string;
  network: WalletAdapterNetwork;
}

const Home = (props: HomeProps) => {
  const targetDate = "2024-09-12T23:59:59";

  const [balance, setBalance] = useState<number>();
  const [isMinting, setIsMinting] = useState(false); // true when user got to press MINT
  const [isActive, setIsActive] = useState(false); // true when countdown completes or whitelisted
  const [solanaExplorerLink, setSolanaExplorerLink] = useState<string>("");
  const [itemsAvailable, setItemsAvailable] = useState(0);
  const [itemsRedeemed, setItemsRedeemed] = useState(0);
  const [itemsRemaining, setItemsRemaining] = useState(0);
  const [isSoldOut, setIsSoldOut] = useState(false);
  const [payWithSplToken, setPayWithSplToken] = useState(false);
  const [price, setPrice] = useState(0);
  const [priceLabel, setPriceLabel] = useState<string>("SOL");
  const [whitelistPrice, setWhitelistPrice] = useState(0);
  const [whitelistEnabled, setWhitelistEnabled] = useState(false);
  const [isBurnToken, setIsBurnToken] = useState(false);
  const [whitelistTokenBalance, setWhitelistTokenBalance] = useState(0);
  const [isEnded, setIsEnded] = useState(false);
  const [endDate, setEndDate] = useState<Date>();
  const [isPresale, setIsPresale] = useState(false);
  const [isWLOnly, setIsWLOnly] = useState(false);

  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    message: "",
    severity: undefined,
  });

  const [needTxnSplit, setNeedTxnSplit] = useState(true);
  const [setupTxn, setSetupTxn] = useState<SetupState>();

  const wallet = useWallet();
  const [candyMachine, setCandyMachine] = useState<CandyMachineAccount>();

  const rpcUrl = props.rpcHost;
  const solFeesEstimation = 0.012; // approx of account creation fees

  const anchorWallet = useMemo(() => {
    if (
      !wallet ||
      !wallet.publicKey ||
      !wallet.signAllTransactions ||
      !wallet.signTransaction
    ) {
      return;
    }

    return {
      publicKey: wallet.publicKey,
      signAllTransactions: wallet.signAllTransactions,
      signTransaction: wallet.signTransaction,
    } as anchor.Wallet;
  }, [wallet]);

  const refreshCandyMachineState = useCallback(
    async (commitment: Commitment = "confirmed") => {
      if (!anchorWallet) {
        return;
      }

      const connection = new Connection(props.rpcHost, commitment);

      if (props.candyMachineId) {
        try {
          const cndy = await getCandyMachineState(
            anchorWallet,
            props.candyMachineId,
            connection
          );

          setCandyMachine(cndy);
          setItemsAvailable(cndy.state.itemsAvailable);
          setItemsRemaining(cndy.state.itemsRemaining);
          setItemsRedeemed(cndy.state.itemsRedeemed);

          var divider = 1;
          if (decimals) {
            divider = +("1" + new Array(decimals).join("0").slice() + "0");
          }

          // detect if using spl-token to mint
          if (cndy.state.tokenMint) {
            setPayWithSplToken(true);
            // Customize your SPL-TOKEN Label HERE
            // TODO: get spl-token metadata name
            setPriceLabel(splTokenName);
            setPrice(cndy.state.price.toNumber() / divider);
            setWhitelistPrice(cndy.state.price.toNumber() / divider);
          } else {
            setPrice(cndy.state.price.toNumber() / LAMPORTS_PER_SOL);
            setWhitelistPrice(cndy.state.price.toNumber() / LAMPORTS_PER_SOL);
          }

          // fetch whitelist token balance
          if (cndy.state.whitelistMintSettings) {
            setWhitelistEnabled(true);
            setIsBurnToken(cndy.state.whitelistMintSettings.mode.burnEveryTime);
            setIsPresale(cndy.state.whitelistMintSettings.presale);
            setIsWLOnly(
              !isPresale &&
                cndy.state.whitelistMintSettings.discountPrice === null
            );

            if (
              cndy.state.whitelistMintSettings.discountPrice !== null &&
              cndy.state.whitelistMintSettings.discountPrice !==
                cndy.state.price
            ) {
              if (cndy.state.tokenMint) {
                setWhitelistPrice(
                  cndy.state.whitelistMintSettings.discountPrice?.toNumber() /
                    divider
                );
              } else {
                setWhitelistPrice(
                  cndy.state.whitelistMintSettings.discountPrice?.toNumber() /
                    LAMPORTS_PER_SOL
                );
              }
            }

            let balance = 0;
            try {
              const tokenBalance =
                await props.connection.getTokenAccountBalance(
                  (
                    await getAtaForMint(
                      cndy.state.whitelistMintSettings.mint,
                      anchorWallet.publicKey
                    )
                  )[0]
                );

              balance = tokenBalance?.value?.uiAmount || 0;
            } catch (e) {
              console.error(e);
              balance = 0;
            }
            if (commitment !== "processed") {
              setWhitelistTokenBalance(balance);
            }
            setIsActive(isPresale && !isEnded && balance > 0);
          } else {
            setWhitelistEnabled(false);
          }

          // end the mint when date is reached
          if (cndy?.state.endSettings?.endSettingType.date) {
            setEndDate(toDate(cndy.state.endSettings.number));
            if (
              cndy.state.endSettings.number.toNumber() <
              new Date().getTime() / 1000
            ) {
              setIsEnded(true);
              setIsActive(false);
            }
          }
          // end the mint when amount is reached
          if (cndy?.state.endSettings?.endSettingType.amount) {
            let limit = Math.min(
              cndy.state.endSettings.number.toNumber(),
              cndy.state.itemsAvailable
            );
            setItemsAvailable(limit);
            if (cndy.state.itemsRedeemed < limit) {
              setItemsRemaining(limit - cndy.state.itemsRedeemed);
            } else {
              setItemsRemaining(0);
              cndy.state.isSoldOut = true;
              setIsEnded(true);
            }
          } else {
            setItemsRemaining(cndy.state.itemsRemaining);
          }

          if (cndy.state.isSoldOut) {
            setIsActive(false);
          }

          const [collectionPDA] = await getCollectionPDA(props.candyMachineId);
          const collectionPDAAccount = await connection.getAccountInfo(
            collectionPDA
          );

          const txnEstimate =
            892 +
            (!!collectionPDAAccount && cndy.state.retainAuthority ? 182 : 0) +
            (cndy.state.tokenMint ? 66 : 0) +
            (cndy.state.whitelistMintSettings ? 34 : 0) +
            (cndy.state.whitelistMintSettings?.mode?.burnEveryTime ? 34 : 0) +
            (cndy.state.gatekeeper ? 33 : 0) +
            (cndy.state.gatekeeper?.expireOnUse ? 66 : 0);

          setNeedTxnSplit(txnEstimate > 1230);
        } catch (e) {
          if (e instanceof Error) {
            if (
              e.message === `Account does not exist ${props.candyMachineId}`
            ) {
              setAlertState({
                open: true,
                message: `Couldn't fetch candy machine state from candy machine with address: ${props.candyMachineId}, using rpc: ${props.rpcHost}! You probably typed the REACT_APP_CANDY_MACHINE_ID value in wrong in your .env file, or you are using the wrong RPC!`,
                severity: "error",
                hideDuration: null,
              });
            } else if (
              e.message.startsWith("failed to get info about account")
            ) {
              setAlertState({
                open: true,
                message: `Couldn't fetch candy machine state with rpc: ${props.rpcHost}! This probably means you have an issue with the REACT_APP_SOLANA_RPC_HOST value in your .env file, or you are not using a custom RPC!`,
                severity: "error",
                hideDuration: null,
              });
            }
          } else {
            setAlertState({
              open: true,
              message: `${e}`,
              severity: "error",
              hideDuration: null,
            });
          }
          console.log(e);
        }
      } else {
        setAlertState({
          open: true,
          message: `Your REACT_APP_CANDY_MACHINE_ID value in the .env file doesn't look right! Make sure you enter it in as plain base-58 address!`,
          severity: "error",
          hideDuration: null,
        });
      }
    },
    [
      anchorWallet,
      props.candyMachineId,
      props.rpcHost,
      isEnded,
      isPresale,
      props.connection,
    ]
  );

  const renderGoLiveDateCounter = ({ days, hours, minutes, seconds }: any) => {
    return (
      <div>
        <Card elevation={1}>
          <h1>{days}</h1>Days
        </Card>
        <Card elevation={1}>
          <h1>{hours}</h1>
          Hours
        </Card>
        <Card elevation={1}>
          <h1>{minutes}</h1>Mins
        </Card>
        <Card elevation={1}>
          <h1>{seconds}</h1>Secs
        </Card>
      </div>
    );
  };

  const renderEndDateCounter = ({ days, hours, minutes }: any) => {
    let label = "";
    if (days > 0) {
      label += days + " days ";
    }
    if (hours > 0) {
      label += hours + " hours ";
    }
    label += minutes + 1 + " minutes left to MINT.";
    return (
      <div>
        <h3>{label}</h3>
      </div>
    );
  };

  function displaySuccess(mintPublicKey: any, qty: number = 1): void {
    let remaining = itemsRemaining - qty;
    setItemsRemaining(remaining);
    setIsSoldOut(remaining === 0);
    if (isBurnToken && whitelistTokenBalance && whitelistTokenBalance > 0) {
      let balance = whitelistTokenBalance - qty;
      setWhitelistTokenBalance(balance);
      setIsActive(isPresale && !isEnded && balance > 0);
    }
    setSetupTxn(undefined);
    setItemsRedeemed(itemsRedeemed + qty);
    if (!payWithSplToken && balance && balance > 0) {
      setBalance(
        balance -
          (whitelistEnabled ? whitelistPrice : price) * qty -
          solFeesEstimation
      );
    }
    setSolanaExplorerLink(
      cluster === "devnet" || cluster === "testnet"
        ? "https://solscan.io/token/" + mintPublicKey + "?cluster=" + cluster
        : "https://solscan.io/token/" + mintPublicKey
    );
    setIsMinting(false);
    throwConfetti();
  }

  function throwConfetti(): void {
    confetti({
      particleCount: 400,
      spread: 70,
      origin: { y: 0.6 },
    });
  }

  const onMint = async (
    beforeTransactions: Transaction[] = [],
    afterTransactions: Transaction[] = []
  ) => {
    try {
      if (wallet.connected && candyMachine?.program && wallet.publicKey) {
        setIsMinting(true);
        let setupMint: SetupState | undefined;
        if (needTxnSplit && setupTxn === undefined) {
          setAlertState({
            open: true,
            message: "Please validate account setup transaction",
            severity: "info",
          });
          setupMint = await createAccountsForMint(
            candyMachine,
            wallet.publicKey
          );
          let status: any = { err: true };
          if (setupMint.transaction) {
            status = await awaitTransactionSignatureConfirmation(
              setupMint.transaction,
              props.txTimeout,
              props.connection,
              true
            );
          }
          if (status && !status.err) {
            setSetupTxn(setupMint);
            setAlertState({
              open: true,
              message:
                "Setup transaction succeeded! You can now validate mint transaction",
              severity: "info",
            });
          } else {
            setAlertState({
              open: true,
              message: "Mint failed! Please try again!",
              severity: "error",
            });
            return;
          }
        }

        const setupState = setupMint ?? setupTxn;
        const mint = setupState?.mint ?? anchor.web3.Keypair.generate();
        let mintResult = await mintOneToken(
          candyMachine,
          wallet.publicKey,
          mint,
          beforeTransactions,
          afterTransactions,
          setupState
        );

        let status: any = { err: true };
        let metadataStatus = null;
        if (mintResult) {
          status = await awaitTransactionSignatureConfirmation(
            mintResult.mintTxId,
            props.txTimeout,
            props.connection,
            true
          );

          metadataStatus =
            await candyMachine.program.provider.connection.getAccountInfo(
              mintResult.metadataKey,
              "processed"
            );
          console.log("Metadata status: ", !!metadataStatus);
        }

        if (status && !status.err && metadataStatus) {
          setAlertState({
            open: true,
            message: "Congratulations! Mint succeeded!",
            severity: "success",
          });

          // update front-end amounts
          displaySuccess(mint.publicKey);
          refreshCandyMachineState("processed");
        } else if (status && !status.err) {
          setAlertState({
            open: true,
            message:
              "Mint likely failed! Anti-bot SOL 0.01 fee potentially charged! Check the explorer to confirm the mint failed and if so, make sure you are eligible to mint before trying again.",
            severity: "error",
            hideDuration: 8000,
          });
          refreshCandyMachineState();
        } else {
          setAlertState({
            open: true,
            message: "Mint failed! Please try again!",
            severity: "error",
          });
          refreshCandyMachineState();
        }
      }
    } catch (error: any) {
      let message = error.msg || "Minting failed! Please try again!";
      if (!error.msg) {
        if (!error.message) {
          message = "Transaction Timeout! Please try again.";
        } else if (error.message.indexOf("0x138")) {
        } else if (error.message.indexOf("0x137")) {
          message = `SOLD OUT!`;
        } else if (error.message.indexOf("0x135")) {
          message = `Insufficient funds to mint. Please fund your wallet.`;
        }
      } else {
        if (error.code === 311) {
          message = `SOLD OUT!`;
        } else if (error.code === 312) {
          message = `Minting period hasn't started yet.`;
        }
      }

      setAlertState({
        open: true,
        message,
        severity: "error",
      });
    } finally {
      setIsMinting(false);
    }
  };

  useEffect(() => {
    (async () => {
      if (anchorWallet) {
        const balance = await props.connection.getBalance(
          anchorWallet!.publicKey
        );
        setBalance(balance / LAMPORTS_PER_SOL);
      }
    })();
  }, [anchorWallet, props.connection]);

  useEffect(() => {
    refreshCandyMachineState();
  }, [
    anchorWallet,
    props.candyMachineId,
    props.connection,
    isEnded,
    isPresale,
    refreshCandyMachineState,
  ]);

  return (
    <>
      <Header />
      <div
        style={{
          width: "90%",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
        className="max-w-312 mx-auto"
      >
        <div className="px-[20px] pb-12 pt-32">
          <div className="w-full md:flex lg:hidden justify-end mb-5">
            <a href="" target="_blank">
              <button className="w-[100px] flex cursor-pointer">
                <img
                  className="w-full object-contain"
                  src="./buy_btn_premium.svg"
                  alt=""
                />
                {/* <img
                className="w-full object-contain"
                src="./buy_btn_standard.svg"
                alt=""
              /> */}
              </button>
            </a>
          </div>
          <div className="pb-8">
            <h1
              className="font-extrabold text-3xl my-2 md:text-5xl lg:text-5xl"
              style={{ color: "#8125FF" }}
            >
              Mint Web3Chan
              {/* Premium land */}
            </h1>
            <p
              className="font-bold text-[24px] flex items-center gap-2"
              style={{ color: "white" }}
            >
              Early Acces
              {/* <img src={verified} alt="Verified" /> */}
            </p>
          </div>

          <div className="flex items-center gap-10 lg:flex-row flex-col justify-between ">
            {/* <img src={land1} alt="Land" className="z-20 max-w-150 w-full" /> */}
            {/* <div className="sm:flex md:flex xsm:flex lg:hidden">
            {wallet ? (
              <WalletAmount>
                <ConnectButton />
              </WalletAmount>
            ) : (
              <ConnectButton>Connect Wallet</ConnectButton>
            )}
          </div> */}
            <video
              src={mint_video}
              playsInline
              autoPlay
              loop
              muted
              // poster={poster}
              style={{
                maxWidth: "654px",
                width: "100%",
                maxHeight: "654px",
                height: "100%",
              }}
              className="lg:mb-80 mint sm:mb-0"
            />
            <div
              className="relative mt-5 lg:mt-0 mint-video"
              style={{ maxWidth: "494px", width: "100%" }}
            >
              <div className="lg:absolute lg:block hidden right-0 -top-24">
                <a href="s" target="_blank">
                  <button className="w-[100px] flex cursor-pointer">
                    <img
                      className="w-full object-contain"
                      src="./buy_btn_premium.svg"
                      alt=""
                    />
                    {/* <img
                    className="w-full object-contain"
                    src="./buy_btn_standard.svg"
                    alt=""
                  /> */}
                  </button>
                </a>
              </div>
              <div
                className=" mb-6 standardcard"
                style={{
                  padding: "16px",
                }}
              >
                <div
                  className=""
                  style={{
                    width: "100%",
                    borderRadius: "0px",
                    padding: "8px",
                    backgroundColor: "#100A23",
                    marginBottom: "8px",
                    minHeight: "100%",
                    paddingTop: "16px",
                    paddingBottom: "16px",
                  }}
                >
                  <p
                    className="font-normal text-[14px] text-[#a2a2a2]"
                    style={{
                      fontWeight: "400",
                      fontSize: "14px",
                      color: "#a2a2a2",
                    }}
                  >
                    Public Mint Price
                  </p>
                  <div className="flex gap-2 ">
                    {/* <img src={ethereum} alt="Ethereum" className="pb-5" /> */}
                    <div>
                      <h1
                        className="font-bold text-[24px]"
                        style={{
                          fontWeight: "700",
                          fontSize: "24px",
                          color: "white",
                        }}
                      >
                        {isActive &&
                        whitelistEnabled &&
                        whitelistTokenBalance > 0
                          ? whitelistPrice + " " + priceLabel
                          : price + " " + priceLabel}
                      </h1>
                      {/* <button
                       className={`rounded-full font-bold px-4 py-2 h-10 text-[16px] md:text-[18px] text-white flex items-center justify-center rounded-[12px] bg-gradient-to-br from-customGreen via-customBlue to-customPurple`}
                     >
                       Connect Wallet
                     </button> */}
                      {/* <p className="font-normal text-[14px] text-[#a2a2a2]">
                      Proxima Nova
                    </p> */}
                    </div>
                  </div>
                  {/* <div className="flex items-center justify-center pt-3">
                  <Button
                    text={"Mint"}
                    style="w-[430px] h-[48px] md:h-[42px] rounded-full xsm:w-[290px]"
                  />
                </div> */}
                  {wallet ? (
                    <div className="__d" style={{ width: "100%" }}>
                      <WalletAmount>
                        <ConnectButton />
                      </WalletAmount>
                    </div>
                  ) : (
                    <ConnectButton>Connect Wallet</ConnectButton>
                  )}
                  {!isActive &&
                  !isEnded &&
                  candyMachine?.state.goLiveDate &&
                  (!isWLOnly || whitelistTokenBalance > 0) ? (
                    <Countdown
                      date={toDate(candyMachine?.state.goLiveDate)}
                      onMount={({ completed }) =>
                        completed && setIsActive(!isEnded)
                      }
                      onComplete={() => {
                        setIsActive(!isEnded);
                      }}
                      renderer={renderGoLiveDateCounter}
                    />
                  ) : !wallet ? (
                    <ConnectButton>Connect Wallet</ConnectButton>
                  ) : !isWLOnly || whitelistTokenBalance > 0 ? (
                    candyMachine?.state.gatekeeper &&
                    wallet.publicKey &&
                    wallet.signTransaction ? (
                      <GatewayProvider
                        wallet={{
                          publicKey:
                            wallet.publicKey ||
                            new PublicKey(CANDY_MACHINE_PROGRAM),
                          //@ts-ignore
                          signTransaction: wallet.signTransaction,
                        }}
                        gatekeeperNetwork={
                          candyMachine?.state?.gatekeeper?.gatekeeperNetwork
                        }
                        clusterUrl={rpcUrl}
                        cluster={cluster}
                        options={{ autoShowModal: false }}
                      >
                        <MintButton
                          candyMachine={candyMachine}
                          isMinting={isMinting}
                          isActive={isActive}
                          isEnded={isEnded}
                          isSoldOut={isSoldOut}
                          onMint={onMint}
                        />
                      </GatewayProvider>
                    ) : (
                      <MintButton
                        candyMachine={candyMachine}
                        isMinting={isMinting}
                        isActive={isActive}
                        isEnded={isEnded}
                        isSoldOut={isSoldOut}
                        onMint={onMint}
                      />
                    )
                  ) : (
                    <h1>Mint is private.</h1>
                  )}

                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "#1D1635",
                      padding: "16px",
                      borderRadius: "8px",
                      marginTop: "12px",
                    }}
                  >
                    <h1
                      className="font-bold text-[16px]"
                      style={{ color: "white" }}
                    >
                      Using a Smartphone?
                    </h1>
                    <p
                      className="font-semibold text-[14px]"
                      style={{ color: "#a2a2a2" }}
                    >
                      if you try to mint from your smartphone, open the link in
                      the explorer of your wallet.
                    </p>
                  </div>
                  {wallet &&
                    isActive &&
                    endDate &&
                    Date.now() < endDate.getTime() && (
                      <Countdown
                        date={toDate(candyMachine?.state?.endSettings?.number)}
                        onMount={({ completed }) =>
                          completed && setIsEnded(true)
                        }
                        onComplete={() => {
                          setIsEnded(true);
                        }}
                        renderer={renderEndDateCounter}
                      />
                    )}
                  {wallet && isActive && (
                    <h3
                      style={{
                        fontWeight: "400",
                        fontSize: "14px",
                        color: "#a2a2a2",
                      }}
                      className="mt-5"
                    >
                      TOTAL MINTED : {itemsRedeemed} / {itemsAvailable}
                    </h3>
                  )}
                  {wallet && isActive && (
                    <BorderLinearProgress
                      variant="determinate"
                      value={100 - (itemsRemaining * 100) / itemsAvailable}
                    />
                  )}
                </div>

                <span
                  style={{
                    width: "100%",
                    height: "1px",
                    backgroundColor: "#262626",
                    display: "block",
                    maxWidth: "100%",
                  }}
                ></span>

                <div
                  style={{
                    display: "flex",
                    gap: "16px",
                    alignItems: "center",
                    justifyContent: "center",

                    height: "48px",

                    padding: "8px",
                    backgroundColor: "#5D4B97",
                    marginTop: "8px",
                    minWidth: "100%",
                  }}
                >
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "#01FEA8",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <span
                      style={{
                        width: "8px",
                        height: "8px",

                        backgroundColor: "#01FEA8",
                        display: "block",
                      }}
                    ></span>
                    Live
                  </p>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "normal",
                      color: "#a2a2a2",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    Early Birds Ends: <Countdown1 targetDate={targetDate} />
                  </div>
                </div>
              </div>
              <span
                style={{
                  width: "100%",
                  height: "1px",
                  backgroundColor: "#262626",
                  display: "block",
                  maxWidth: "494px",
                }}
              ></span>
              <div style={{ maxWidth: "494px", width: "100%" }}>
                <h1
                  style={{
                    color: "#a2a2a2",
                    fontWeight: "400",
                    fontSize: "14px",
                  }}
                  className="py-6"
                >
                  Mint Stages
                </h1>
                <div className="py-2 flex items-center gap-4 xsm:flex-col">
                  <div
                    className="w-full  h-[120px] "
                    style={{
                      backgroundColor: "#100A23",

                      padding: "8px 16px",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <p
                        className="font-bold text-[16px]"
                        style={{ color: "#a2a2a2" }}
                      >
                        Early Bird
                      </p>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: "bold",
                          color: "#8125FF",
                        }}
                      >
                        Ended
                      </p>
                    </div>
                    <span
                      style={{
                        width: "100%",
                        height: "1px",
                        backgroundColor: "#262626",
                        display: "block",
                        margin: "16px 0",
                      }}
                    ></span>
                    <div className="flex items-center justify-between">
                      <p
                        className="font-normal text-[13px] text-primary"
                        style={{ color: "#a2a2a2" }}
                      >
                        Price
                      </p>
                      <p
                        className="font-normal text-[13px] text-primary"
                        style={{ color: "#a2a2a2" }}
                      >
                        WEB3CHAN
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <p
                        style={{
                          fontSize: "14px",
                          fontWeight: "bold",
                          color: "#8125FF",
                        }}
                      >
                        SOLD OUT
                      </p>

                      {/* <p className="font-medium text-[14px] ">200 Parcels</p> */}
                      <p
                        className="font-medium text-[14px] "
                        style={{ color: "#a2a2a2" }}
                      >
                        650 Pieces
                      </p>
                    </div>
                  </div>
                  <div
                    className="w-full   h-[120px]  "
                    style={{
                      backgroundColor: "#100A23",

                      padding: "8px 16px",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <p
                        className="font-bold text-[16px]"
                        style={{ color: "white" }}
                      >
                        Phase 1
                      </p>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: "bold",
                          color: "#01FEA8",
                        }}
                      >
                        Live
                      </p>
                    </div>
                    <span
                      style={{
                        width: "100%",
                        height: "1px",
                        backgroundColor: "#262626",
                        display: "block",
                        margin: "16px 0",
                      }}
                    ></span>
                    <div className="flex items-center justify-between">
                      <p
                        className="font-normal text-[13px] text-primary"
                        style={{ color: "#a2a2a2" }}
                      >
                        Price
                      </p>
                      <p
                        className="font-normal text-[13px] text-primary"
                        style={{ color: "#a2a2a2" }}
                      >
                        WEB3CHAN
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      {/* <p className="font-normal text-[13px] ">1.7 SOL</p>
                    <p className="font-medium text-[14px] ">1,000 Parcels</p> */}
                      <p
                        className="font-normal text-[13px] "
                        style={{ color: "white" }}
                      >
                        1.00 SOL
                      </p>
                      <p
                        className="font-medium text-[14px] "
                        style={{ color: "white" }}
                      >
                        1,850 Pieces
                      </p>
                    </div>
                  </div>
                </div>
                <div className="py-2  flex items-center gap-4 xsm:flex-col">
                  <div
                    className="w-full   h-[120px]  "
                    style={{
                      backgroundColor: "#100A23",

                      padding: "8px 16px",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <p
                        className="font-bold text-[16px]"
                        style={{ color: "white" }}
                      >
                        Phase 2
                      </p>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: "bold",
                          color: "#5D4B97",
                        }}
                      >
                        Live Soon
                      </p>
                    </div>
                    <span
                      style={{
                        width: "100%",
                        height: "1px",
                        backgroundColor: "#262626",
                        display: "block",
                        margin: "16px 0",
                      }}
                    ></span>
                    <div className="flex items-center justify-between">
                      <p
                        className="font-normal text-[13px] text-primary"
                        style={{ color: "#a2a2a2" }}
                      >
                        Price
                      </p>
                      <p
                        className="font-normal text-[13px] text-primary"
                        style={{ color: "#a2a2a2" }}
                      >
                        WEB3CHAN
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      {/* <p className="font-normal text-[13px] ">2.00 SOL</p>
                    <p className="font-medium text-[14px] ">2,000 Parcels</p> */}

                      <p
                        className="font-normal text-[13px] "
                        style={{ color: "white" }}
                      >
                        1.25 SOL
                      </p>
                      <p
                        className="font-medium text-[14px] "
                        style={{ color: "white" }}
                      >
                        2,500 Pieces
                      </p>
                    </div>
                  </div>
                  <div
                    className="w-full   h-[120px]  "
                    style={{
                      backgroundColor: "#100A23",

                      padding: "8px 16px",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <p
                        className="font-bold text-[16px]"
                        style={{ color: "white" }}
                      >
                        Phase 3
                      </p>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: "bold",
                          color: "#5D4B97",
                        }}
                      >
                        Live Soon
                      </p>
                    </div>
                    <span
                      style={{
                        width: "100%",
                        height: "1px",
                        backgroundColor: "#262626",
                        display: "block",
                        margin: "16px 0",
                      }}
                    ></span>
                    <div className="flex items-center justify-between">
                      <p
                        className="font-normal text-[13px] text-primary"
                        style={{ color: "#a2a2a2" }}
                      >
                        Price
                      </p>
                      <p
                        className="font-normal text-[13px] text-primary"
                        style={{ color: "#a2a2a2" }}
                      >
                        WEB3CHAN
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      {/* <p className="font-normal text-[13px] ">2.00 SOL</p>
                    <p className="font-medium text-[14px] ">2,000 Parcels</p> */}

                      <p
                        className="font-normal text-[13px] "
                        style={{ color: "white" }}
                      >
                        1.50 SOL
                      </p>
                      <p
                        className="font-medium text-[14px] "
                        style={{ color: "white" }}
                      >
                        2,500 Pieces
                      </p>
                    </div>
                  </div>
                </div>
                <div className="pt-2 pb-6 flex items-center gap-4 xsm:flex-col">
                  <div
                    className="   h-[120px]  "
                    style={{
                      backgroundColor: "#100A23",
                      padding: "8px 16px",
                      maxWidth: "243px",
                      width: "100%",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <p
                        className="font-bold text-[16px]"
                        style={{ color: "white" }}
                      >
                        Phase 4
                      </p>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: "bold",
                          color: "#5D4B97",
                        }}
                      >
                        Live Soon
                      </p>
                    </div>
                    <span
                      style={{
                        width: "100%",
                        height: "1px",
                        backgroundColor: "#262626",
                        display: "block",
                        margin: "16px 0",
                      }}
                    ></span>
                    <div className="flex items-center justify-between">
                      <p
                        className="font-normal text-[13px] text-primary"
                        style={{ color: "#a2a2a2" }}
                      >
                        Price
                      </p>
                      <p
                        className="font-normal text-[13px] text-primary"
                        style={{ color: "#a2a2a2" }}
                      >
                        WEB3CHAN
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      {/* <p className="font-normal text-[13px] ">2.00 SOL</p>
                    <p className="font-medium text-[14px] ">2,000 Parcels</p> */}

                      <p
                        className="font-normal text-[13px] "
                        style={{ color: "white" }}
                      >
                        1.75 SOL
                      </p>
                      <p
                        className="font-medium text-[14px] "
                        style={{ color: "white" }}
                      >
                        2,500 Pieces
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <img
        src={left_gradient}
        className="absolute top-0 left-0"
        alt="Left Gradient"
        style={{ zIndex: "-1000" }}
      /> */}
        <Snackbar
          open={alertState.open}
          autoHideDuration={6000}
          onClose={() => setAlertState({ ...alertState, open: false })}
        >
          <Alert
            onClose={() => setAlertState({ ...alertState, open: false })}
            severity={alertState.severity}
          >
            {alertState.message}
          </Alert>
        </Snackbar>
      </div>
      <div
        className="w-full bg-[#5D4B97] min-h-[430px] pb-[50px] lg:pb-0  "
        style={{
          width: "100%",
          backgroundColor: "#5D4B97",
          minHeight: "430px",
          paddingBottom: "50px",
          paddingTop: "50px",
          marginTop: "150px",
        }}
      >
        <div
          className="  w-[90%] max-w-[1000px] lg:block flex flex-col justify-center items-center mx-auto relative"
          style={{
            width: "90%",
            maxWidth: "1000px",
            alignItems: "center",
            margin: "0 auto",
          }}
        >
          <img
            src="https://firebasestorage.googleapis.com/v0/b/web3chan-631d9.appspot.com/o/assets%2F3.png?alt=media&token=6243ab6a-2845-45ff-bf05-c1890e3cffec"
            className="lg:absolute -top-[120px] object-cover max-w-[600px] w-full right-[0%]"
            style={{
              top: "-180px",
              objectFit: "cover",
              maxWidth: "600px",
              width: "100%",
              right: "0%",
            }}
            alt=""
          />
          <div
            className="flex mt-11 lg:mt-0 flex-col max-w-[500px]"
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "2rem",
              maxWidth: "400px",
            }}
          >
            <h1
              className=" token-h font-bold token-p text-white text-2xl md:text-[40px]"
              style={{
                fontWeight: "bold",
                color: "white",
                fontSize: "2rem",
              }}
            >
              Our Token Presale is starting soon
            </h1>
            <p
              className=" token text-[#BCAFE6] font-normal max-w-full md:max-w-[80%] text-justify mt-5 text-base"
              style={{
                color: "#bcafe6",
                fontWeight: "400",
                maxWidth: "100%",
                textAlign: "justify",
                marginTop: "20px",
                marginLeft: "0px",
              }}
            >
              Earn more by getting booked by new customers and save time by
              automatically managing your administration. You are the boss!
            </p>
            {/* <div className="flex w-max items-center justify-start gap-x-5 mt-5">
           <button className="bg-[#8125FF] lg:mt-0 mt-5 min-w-[140px] mx-auto text-white px-4 py-2 hover:bg-opacity-80">
             Whitelist
           </button>
           <button className="bg-[#1D1635] lg:mt-0 mt-5 min-w-[140px] mx-auto text-[#8125FF] px-4 py-2 hover:bg-opacity-80">
             Add to calendar
           </button>
         </div> */}
          </div>
          <div className="flex gap-4 py-8 mint-button items-center">
            <button
              style={{
                width: "159px",
                height: "60px",
                backgroundColor: "#8125FF",
                color: "white",
                fontWeight: "600",
                fontSize: "20px",
              }}
              className="flex items-center justify-center"
            >
              Whitelist
            </button>
            <button
              style={{
                width: "189px",
                height: "60px",
                backgroundColor: "#1D1635",
                color: "#8125ff",
                fontWeight: "600",
                fontSize: "20px",
              }}
              className="flex items-center justify-center"
            >
              Add to calender
            </button>
          </div>
        </div>
      </div>
      <SnackbarProvider maxSnack={3}>
        <Footer />
      </SnackbarProvider>
    </>
  );
};

export default Home;
