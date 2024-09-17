import React from "react";
import Header from "../../layout/Header";
import Hero from "./Hero";
import Platform from "./Platform";
import WhatWeb3 from "./WhatWeb3";
import Token from "./Token";
import About from "./About";
import Tokenomics from "./Tokenomics";
import PresaleDetails from "./PresaleDetails";
import Footer from "../../layout/Footer";
import { SnackbarProvider, useSnackbar } from "notistack";
import Mint from "./Mint";

const Landing = () => {
  return (
    <>
      <Header />

      <Hero
        text="Whether you’re coding, crafting art, trading NFTs, or crafting
      memes, find your pixelated posse right here on Web3chan."
        img="https://firebasestorage.googleapis.com/v0/b/web3chan-631d9.appspot.com/o/assets%2FdiscoverText.svg?alt=media&token=984ba408-92d8-4157-b418-e6cc40c00b53"
        className="my-7 px-5 max-w-[550px] mx-auto w-full"
      />
      <Platform />
      <WhatWeb3 />
      <Mint />
      <Token />
      <Tokenomics />
      <PresaleDetails />
      <About />
      <SnackbarProvider maxSnack={3}>
        <Footer />
      </SnackbarProvider>
    </>
  );
};

export default Landing;
