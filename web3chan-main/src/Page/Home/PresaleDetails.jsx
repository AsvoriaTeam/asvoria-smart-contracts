import React from "react";

const data = [
  {
    color: "#5B5AFF",
    text: "Airdrop",
  },
  {
    color: "#14BFFF",
    text: "Community incentives",
  },
  {
    color: "#00DCFA",
    text: "Marketing & Operations",
  },
  {
    color: "#00E5AE",
    text: "Team Allocation",
  },
  {
    color: "#BCAFE6",
    text: "Treasury",
  },
  {
    color: "#9387C1",
    text: "Initial Liquidity Pool (LP)",
  },
  {
    color: "#5D4B97",
    text: "Exchange Listing",
  },
  {
    color: "#8125FF",
    text: "Seed, Private, and Public Presale",
  },
];
const PresaleDetails = () => {
  return (
    <div
      id="presale"
      className="w-full bg-[#1D1635] py-[4%]"
      style={{ width: "100%", backgroundColor: "#1d1635", padding: "40px 0" }}
    >
      <div
        id="platform"
        className="w-[90%] max-w-[1000px] mx-auto my-[4%]"
        style={{ width: "90%", maxWidth: "1000px", margin: "60px auto" }}
      >
        <h1
          className="text-[#8125FF] font-bold presale-heading md:text-[42px] mb-7"
          style={{
            color: "#8125ff",
            fontWeight: "bold",

            marginBottom: "28px",
          }}
        >
          Presale details
        </h1>

        <div className="t_scrollar overflow-auto" style={{ overflow: "auto" }}>
          <div
            className="relative w-[950px] overflow-hidden"
            style={{ position: "relative", width: "950px", overflow: "hidden" }}
          >
            <table
              cellSpacing={3}
              className="text-[18px] overflow-hidden relative "
              style={{
                fontSize: "18px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <tr className="">
                <td
                  className="text-white pl-5 font-bold"
                  style={{
                    color: "white",
                    paddingLeft: "20px",
                    fontWeight: "bold",
                  }}
                >
                  Round
                </td>
                <td
                  className="text-center text-white py-2 font-bold"
                  style={{
                    textAlign: "center",
                    borderLeft: "1px solid #1d1635",
                    borderRight: "1px solid #1d1635",
                    padding: "8px 0",
                    color: "white",
                  }}
                >
                  xTokens
                </td>

                <td className="text-center  text-white py-2 font-bold">TGE</td>
                <td className="text-center  text-white py-2 font-bold">
                  Vesting
                </td>
                <td className="text-center  text-white py-2 font-bold">
                  Hardcap
                </td>
              </tr>

              <tr
                className="border-b-2 border-black bg-[#1d1635]"
                style={{
                  borderBottom: "2px solid black",
                  backgroundColor: "#1d1635",
                }}
              >
                <td className="py-1 px-1" style={{ padding: "4px" }}>
                  <div
                    className="bg-[#8125ff] min-w-[250px] min-h-[50px] pl-4 pr-2 text-white font-semibold flex items-center justify-start"
                    style={{
                      backgroundColor: "#8125ff",
                      minWidth: "250px",
                      minHeight: "50px",
                      paddingLeft: "16px",
                      paddingRight: "8px",
                    }}
                  >
                    Seed
                  </div>
                </td>
                <td className="border-l-2 border-r-2 border-black">
                  <div
                    className="py-2 min-w-[80px] text-white font-semibold flex items-center justify-center"
                    style={{ padding: "8px 0", minWidth: "80px" }}
                  >
                    2.2x
                  </div>
                </td>

                <td className="">
                  <div
                    className="py-2 min-w-[100px] text-white font-semibold flex items-center justify-center"
                    style={{ padding: "8px 0", minWidth: "100px" }}
                  >
                    4%
                  </div>
                </td>
                <td className="border-l-2 border-r-2 border-black">
                  <div
                    className="py-2 min-w-[250px]  text-white font-semibold flex items-center justify-center"
                    style={{ padding: "8px", minWidth: "250px" }}
                  >
                    6 months linear
                  </div>
                </td>
                <td className="">
                  <div
                    className="py-2 min-w-[220px] text-white font-semibold flex items-center justify-center"
                    style={{ padding: "8px", minWidth: "220px" }}
                  >
                    500 SOL
                  </div>
                </td>
              </tr>
              <tr className="border-b-2 border-black bg-[#1d1635]">
                <td className="py-1 px-1" style={{ padding: "4px" }}>
                  <div
                    className="bg-[#5b5aff] min-w-[250px] min-h-[50px] pl-4 pr-2 text-white font-semibold flex items-center justify-start"
                    style={{
                      backgroundColor: "#5b5aff",
                      padding: "0 8px 0 16px",
                      minHeight: "50px",
                      minWidth: "250px",
                    }}
                  >
                    Private
                  </div>
                </td>
                <td className="border-l-2 border-r-2 border-black">
                  <div className="py-2 min-w-[80px]  text-white font-semibold flex items-center justify-center">
                    1.75x
                  </div>
                </td>

                <td className="">
                  <div className="py-2 min-w-[100px] text-white font-semibold flex items-center justify-center">
                    5%
                  </div>
                </td>
                <td className="border-l-2 border-r-2 border-black">
                  <div className="py-2 min-w-[250px]  text-white font-semibold flex items-center justify-center">
                    5 months linear
                  </div>
                </td>
                <td className="">
                  <div className="py-2 min-w-[220px] text-white font-semibold flex items-center justify-center">
                    1500 SOL
                  </div>
                </td>
              </tr>

              <tr className="border-b-2 border-black bg-[#1d1635]">
                <td className="py-1 px-1">
                  <div
                    className="bg-[#00dcfa] min-w-[250px] min-h-[50px] pl-4 pr-2 text-white font-semibold flex items-center justify-start"
                    style={{
                      backgroundColor: "#00dcfa",
                      padding: "0 8px 0 16px",
                      minHeight: "50px",
                      minWidth: "250px",
                    }}
                  >
                    Public
                  </div>
                </td>
                <td className="border-l-2 border-r-2 border-black">
                  <div className="py-2 min-w-[80px]  text-white font-semibold flex items-center justify-center">
                    1.3x
                  </div>
                </td>

                <td className="">
                  <div className="py-2 min-w-[100px] text-white font-semibold flex items-center justify-center">
                    16%
                  </div>
                </td>
                <td className="border-l-2 border-r-2 border-black">
                  <div className="py-2 min-w-[250px]  text-white font-semibold flex items-center justify-center">
                    4 months linear
                  </div>
                </td>
                <td className="">
                  <div className="py-2 min-w-[220px] text-white font-semibold flex items-center justify-center">
                    Fair launch
                  </div>
                </td>
              </tr>

              <tr className="bg-[#1d1635]">
                <td className="py-1 px-1">
                  <div
                    className="bg-[#00efae] min-w-[250px] min-h-[50px] pl-4 pr-2 text-white font-semibold flex items-center justify-start"
                    style={{
                      backgroundColor: "#00efae",
                      padding: "0 8px 0 16px",
                      minHeight: "50px",
                      minWidth: "250px",
                    }}
                  >
                    Listing
                  </div>
                </td>
                <td className="border-l-2 border-r-2 border-black">
                  <div className="py-2 min-w-[80px]  text-white font-semibold flex items-center justify-center">
                    1x
                  </div>
                </td>

                <td className="">
                  <div className="py-2 min-w-[100px] text-white font-semibold flex items-center justify-center">
                    NA
                  </div>
                </td>
                <td className="border-l-2 border-r-2 border-black">
                  <div className="py-2 min-w-[250px]  text-white font-semibold flex items-center justify-center">
                    NA
                  </div>
                </td>
                <td className="">
                  <div className="py-2 min-w-[220px] text-white font-semibold flex items-center justify-center">
                    NA
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>

        <div
          className="w-full lg:flex-row flex-col items-center gap-y-11 gap-x-16 flex mt-[100px]"
          style={{ width: "100%", marginTop: "100px" }}
        >
          <img
            className="max-w-[500px] w-full -ml-4"
            src="https://firebasestorage.googleapis.com/v0/b/web3chan-631d9.appspot.com/o/assets%2Fpieces.svg?alt=media&token=ee7b2908-3218-4459-8166-18a964c259c7"
            alt="chart"
            style={{ maxWidth: "500px", width: "full", marginLeft: "-20px" }}
          />
          <div>
            <h1
              className="text-white text-3xl font-bold mb-5"
              style={{
                color: "white",
                fontSize: "30px",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              Web3Chan Token <br /> Distribution
            </h1>
            {data.map((data, i) => {
              return (
                <div
                  key={i}
                  className="flex my-1 items-center gap-2"
                  style={{ margin: "4px 0" }}
                >
                  <div
                    className={`w-[20px] h-[20px] `}
                    style={{
                      backgroundColor: data.color,
                      width: "20px",
                      height: "20px",
                    }}
                  ></div>
                  <span
                    className="text-[#BCAFE6] font-bold"
                    style={{ color: "#bcafe6", fontWeight: "bold" }}
                  >
                    {data.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresaleDetails;
