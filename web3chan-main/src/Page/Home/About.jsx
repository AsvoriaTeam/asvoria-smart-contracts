import React from "react";

const About = () => {
  return (
    <>
      <div
        id="about"
        className="w-[90%] max-w-[1000px] mx-auto my-[4%]"
        style={{ width: "90%", maxWidth: "1000px", margin: "60px auto" }}
      >
        <h1
          className="text-[#8125FF] font-bold text-[42px] mb-7"
          style={{
            color: "#8125ff",
            fontWeight: "bold",
            fontSize: "42px",
            marginBottom: "28px",
          }}
        >
          About us
        </h1>
        <div
          className="w-full lg:flex-row flex-col flex justify-between gap-y-11 gap-x-7 items-center"
          style={{ width: "100%" }}
        >
          <div className="w-full lg:w-1/2 platform" style={{ width: "100%" }}>
            <div className="w-full flex flex-col" style={{ width: "100%" }}>
              <h1
                className="font-bold text-white text-3xl"
                style={{ fontWeight: "bold", color: "white", fontSize: "30px" }}
              >
                Background
              </h1>
              <p
                className="text-[#BCAFE6] font-normal leading-[2] tracking-[px] text-justify mt-5 text-base"
                style={{
                  color: "#bcafe6",
                  fontWeight: "normal",
                  lineHeight: "30px",
                  textAlign: "justify",
                  marginTop: "20px",
                }}
              >
                Web3Chan was created for enthusiasts of cryptocurrencies, NFTs,
                games, memes, and more. Inspired by 4chan and 9gag, we aim to
                revive the vibrant culture of the 90s and 00s internet while
                onboarding everyone to web3. Our mission is to build a robust
                and engaged community for learning, sharing, and growth.
              </p>
            </div>

            <div className="w-full flex mt-7 flex-col">
              <h1 className="font-bold text-white text-3xl">
                Problem/Solution
              </h1>
              <p
                className="text-[#BCAFE6] font-normal leading-[2] tracking-[px] text-justify  mt-5 text-base"
                style={{
                  color: "#bcafe6",
                  fontWeight: "normal",
                  lineHeight: "30px",
                  textAlign: "justify",
                  marginTop: "20px",
                }}
              >
                We saw the need for a space where enthusiasts of
                cryptocurrencies, NFTs, games, and memes can connect and share
                knowledge. Web3Chan offers a comprehensive platform tailored to
                our diverse community. By blending early internet culture with
                modern web3 innovations, we create a unique space for everyone.
              </p>
            </div>

            <div className="w-full flex mt-7 flex-col">
              <h1 className="font-bold text-white text-3xl">
                Solana ecosystem
              </h1>
              <p
                className="text-[#BCAFE6] font-normal leading-[2] tracking-[px] text-justify mt-5 text-base"
                style={{
                  color: "#bcafe6",
                  fontWeight: "normal",
                  lineHeight: "30px",
                  textAlign: "justify",
                  marginTop: "20px",
                }}
              >
                Our platform leverages the Solana blockchain for its high speed
                and low transaction costs, providing an efficient user
                experience. Join us and benefit from Solana's quick transactions
                and robust security while engaging in diverse
                discussions and activities.
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 platform" style={{ width: "100%" }}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/web3chan-631d9.appspot.com/o/assets%2FSolution.gif?alt=media&token=2aa4165e-d025-4ffb-af8f-421e2fb22996"
              className="w-full"
              style={{ width: "100%" }}
              alt="ProblemSolution"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
