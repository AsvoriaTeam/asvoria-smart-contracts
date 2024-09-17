import React from "react";

const Token = () => {
  return (
    <>
      <div
        className="w-full bg-[#5D4B97] min-h-[430px] pb-[50px] lg:pb-0  "
        style={{
          width: "100%",
          backgroundColor: "#5D4B97",
          minHeight: "430px",
          paddingBottom: "50px",
          paddingTop: "50px",
        }}
        id="token"
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
              marginTop: "2.75rem",
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
              }}
            >
              Join early and benefit. Get ready for our upcoming token presale.
              By joining early, you can earn more rewards and take advantage of
              exclusive opportunities. Don't miss out on this chance to be part
              of our growing ecosystem!
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
        </div>
      </div>
    </>
  );
};

export default Token;
