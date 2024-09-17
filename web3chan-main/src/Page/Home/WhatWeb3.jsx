import "../Home/index.css";
const WhatWeb3 = () => {
  return (
    <div id="Web3" className="webb" style={{ width: "100%" }}>
      <div style={{ width: "90%", maxWidth: "1000px", margin: "40px auto" }}>
        <h1
          className="text-[#8125FF] text-center font-bold text-[42px] mb-11"
          style={{
            color: "#8125FF",
            textAlign: "center",
            fontWeight: "700",
            fontSize: "42px",
            marginBottom: "44px",
          }}
        >
          What is Web3?
        </h1>
        <div
          className="w-full gap-y-7 gap-x-7 justify-between lg:flex-row flex-col flex items-start"
          style={{ width: "100%" }}
        >
          <div className="w-full lg:w-[31%]">
            <h1 className="font-bold text-white text-3xl">
              Decentralized community
            </h1>
            <p
              className="text-[#BCAFE6] font-normal leading-[2] tracking-[-1px] text-justify mt-5 text-base"
              style={{
                color: "#BCAFE6",
                fontWeight: "normal",
                lineHeight: "2",
                letterSpacing: "-1px",
                textAlign: "justify",
                marginTop: "1.25rem",
                fontSize: "1rem",
              }}
            >
              Experience the future of the internet with a decentralized
              community. Web3 enables users to interact directly without
              intermediaries, ensuring greater security and privacy.
            </p>
          </div>
          <div className="w-full lg:w-[31%]">
            <h1 className="font-bold text-white text-3xl">
              Tokenization and incentives
            </h1>
            <p
              className="text-[#BCAFE6] font-normal leading-[2] tracking-[-1px] text-justify mt-5 text-base"
              style={{
                color: "#BCAFE6",
                fontWeight: "normal",
                lineHeight: "2",
                letterSpacing: "-1px",
                textAlign: "justify",
                marginTop: "1.25rem",
                fontSize: "1rem",
              }}
            >
              Our platform leverages tokenization to provide incentives for
              participation. Earn tokens by contributing to the community and
              using them within our ecosystem or trading them on supported
              exchanges.
            </p>
          </div>
          <div className="w-full lg:w-[31%]">
            <h1 className="font-bold text-white text-3xl">
              Transparency and Trust
            </h1>
            <p
              className="text-[#BCAFE6] font-normal leading-[2] tracking-[-1px] text-justify mt-5 text-base"
              style={{
                color: "#BCAFE6",
                fontWeight: "normal",
                lineHeight: "2",
                letterSpacing: "-1px",
                textAlign: "justify",
                marginTop: "1.25rem",
                fontSize: "1rem",
              }}
            >
              Open and secure. Benefit from a transparent and trust-based
              environment. Our blockchain technology ensures all transactions
              and interactions are secure and verifiable, promoting trust within
              the community.
            </p>
          </div>
        </div>
        <div className="w-full mt-7">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/web3chan-631d9.appspot.com/o/assets%2FCommunity_.gif?alt=media&token=be80e92c-7cfe-44a1-92e1-4970f4f73ed7"
            className="w-full object-contain"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default WhatWeb3;
