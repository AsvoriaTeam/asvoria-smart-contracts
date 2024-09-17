import React from "react";

const Platform = () => {
  return (
    <>
      <div
        id="platform"
        className="w-[90%] max-w-[1000px] mx-auto my-[4%]"
        style={{
          width: "90%",
          maxWidth: "1000px",
          margin: "40px auto",
        }}
      >
        <h1
          style={{
            color: "#8125FF",
            fontWeight: "700",
            fontSize: "42px",
            marginBottom: "28px",
          }}
        >
          Platform
        </h1>
        <div
          className="w-full md:flex-row flex-col flex justify-between gap-y-11 gap-x-7 items-center"
          style={{ width: "100%" }}
        >
          <div className=" md:w-1/2 platform" style={{ width: "100%" }}>
            <h1 style={{ color: "white", fontWeight: "700", fontSize: "30px" }}>
              Discuss topics
            </h1>
            <p
              className="text-[#BCAFE6] font-normal leading-[2] text-justify mt-5 text-base"
              style={{
                color: "#BCAFE6",
                fontWeight: "400",
                lineHeight: "30px",
                textAlign: "justify",
                marginTop: "20px",
                textAlign: "base",
              }}
            >
              Explore a vibrant space to discuss and share insights on
              cryptocurrencies, NFT’s, games, memes, and much more. Whether
              you're a beginner or an expert, join our community to learn,
              debate, and stay updated on the latest trends and developments in
              Web3.
            </p>
          </div>
          <div className="  platform-img  " style={{ maxWidth: "100%" }}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/web3chan-631d9.appspot.com/o/assets%2FDiscussTopics.gif?alt=media&token=1720dbbb-3800-480c-82d3-0c5d7dd2a1e9"
              className="w-full"
              style={{ width: "100%" }}
              alt="Discuss Topics"
            />
          </div>
        </div>
        {/*  */}
        <div
          className="w-full md:flex-row flex-col-reverse flex justify-between gap-y-11 gap-x-7 items-center"
          style={{ width: "100%" }}
        >
          <div className="w-full md:w-1/2 platform" style={{ width: "100%" }}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/web3chan-631d9.appspot.com/o/assets%2FBuildingACommunity.gif?alt=media&token=5f8305a8-1507-4ae9-80c4-ff494f9efd10"
              className="w-full"
              style={{ width: "100%" }}
              alt="Built a Community"
            />
          </div>
          <div
            className="w-full md:w-1/2 platform md:mt-0 mt-5 margin"
            style={{ width: "100%", marginTop: "20px" }}
          >
            <h1
              className="font-bold text-white text-3xl"
              style={{ fontWeight: "700", color: "white", fontSize: "30px" }}
            >
              Built a Community
            </h1>
            <p
              className="text-[#BCAFE6] font-normal leading-[2] text-justify mt-5 text-base"
              style={{
                color: "#BCAFE6",
                fontWeight: "400",
                lineHeight: "30px",
                textAlign: "justify",
                marginTop: "20px",
                textAlign: "base",
              }}
            >
              Connect and grow. Join a dedicated community focused on
              cryptocurrencies, NFT’s, games, memes, and much more. Network with
              like-minded individuals, share your experiences and participate in
              discussions that help build a stronger and more informed
              community.
            </p>
          </div>
        </div>
        {/*  */}
        <div
          className="w-full md:flex-row margin md:mt-0 mt-5 flex-col flex justify-between gap-y-11 gap-x-7 items-center"
          style={{ width: "100%", marginTop: "20px" }}
        >
          <div className="w-full md:w-1/2 platform" style={{ width: "100%" }}>
            <h1
              className="font-bold text-white text-3xl"
              style={{ fontWeight: "700", color: "white", fontSize: "30px" }}
            >
              Engage to Earn
            </h1>
            <p
              className="text-[#BCAFE6] font-normal leading-[2] text-justify mt-5 text-base"
              style={{
                color: "#BCAFE6",
                fontWeight: "400",
                lineHeight: "30px",
                textAlign: "justify",
                marginTop: "20px",
                textAlign: "base",
              }}
            >
              Earn rewards through participation. Contribute to discussions,
              share valuable insights, and earn rewards. Our platform
              incentivizes active participation, allowing you to earn while you
              engage with the community.
            </p>
          </div>
          <div className="w-full md:w-1/2 platform" style={{ width: "100%" }}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/web3chan-631d9.appspot.com/o/assets%2FEngageToEarn.gif?alt=media&token=5014e8a3-765c-491d-8f28-41cb195c7a31"
              className="w-full"
              alt="Engage To Earn"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Platform;
