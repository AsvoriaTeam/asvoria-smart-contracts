import React from "react";

const Tokenomics = () => {
  return (
    <>
      <div
        id="tokenomics"
        className="w-[90%] max-w-[1000px] mx-auto my-[4%]"
        style={{
          width: "90%",
          maxWidth: "1000px",
          margin: "40 auto",
        }}
      >
        <h1
          className="text-[#8125FF] font-bold text-[42px] mb-7"
          style={{
            color: " #8125ff",
            fontWeight: "700",
            fontSize: "42px",
            marginBottom: "28px",
            marginTop: "48px",
          }}
        >
          Tokenomics
        </h1>

        <div className="t_scrollar overflow-auto" style={{ overflow: "auto" }}>
          <div
            className="relative w-[950px] overflow-hidden"
            style={{
              position: "relative ",
              width: "950px",
              overflow: "hidden",
            }}
          >
            <table
              cellSpacing={3}
              className="border-separate text-[18px] overflow-hidden relative "
              style={{
                border: "separate",
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
                    fontWeight: "700",
                  }}
                >
                  Category
                </td>
                <td
                  className="text-center border-l border-r border-[#1d1635] text-white py-2 font-bold"
                  style={{
                    textAlign: "center",
                    color: "white",
                    padding: "8px 0",
                    fontWeight: "700",
                    borderLeft: "1px solid #1d1635",
                    borderRight: "1px solid #1d1635",
                  }}
                >
                  %
                </td>
                <td
                  className="text-center border-r border-[#1d1635] text-white py-2 font-bold"
                  style={{
                    textAlign: "center",
                    color: "white",
                    padding: "8px 0",
                    fontWeight: "700",
                    borderRight: "1px solid #1d1635",
                  }}
                >
                  Tokens
                </td>
                <td
                  className="text-center border-r border-[#1d1635] text-white py-2 font-bold"
                  style={{
                    textAlign: "center",
                    color: "white",
                    padding: "8px 0",
                    fontWeight: "700",
                    borderRight: "1px solid #1d1635",
                  }}
                >
                  TGE
                </td>
                <td
                  className="text-center border-r border-[#1d1635] text-white py-2 font-bold"
                  style={{
                    textAlign: "center",
                    color: "white",
                    padding: "8px 0",
                    fontWeight: "700",
                    borderRight: "1px solid #1d1635",
                  }}
                >
                  Vesting
                </td>
              </tr>

              <tr
                className="bg-[#1d1635]"
                style={{ backgroundColor: "#1d1635" }}
              >
                <td className="py-1 px-1" style={{ padding: "4px" }}>
                  <div
                    className="flex items-center justify-start"
                    style={{
                      backgroundColor: "#5d5497",
                      minWidth: "250px",
                      minHeight: "50px",
                      padding: "0 8px 0 16px",
                      color: "white",
                      fontWeight: "600",
                    }}
                  >
                    Seed, Private and <br /> Public Sales
                  </div>
                </td>
                <td className="">
                  <div
                    className="py-2 min-w-[80px] text-white font-semibold flex items-center justify-center"
                    style={{
                      padding: "8px",
                      minWidth: "80px",
                      color: "white",
                      fontWeight: "600",
                    }}
                  >
                    35%
                  </div>
                </td>
                <td className="">
                  <div
                    className="py-2 min-w-[250px] text-white font-semibold flex items-center justify-center"
                    style={{
                      padding: "8px",
                      minWidth: "250px",
                      color: "white",
                      fontWeight: "600",
                    }}
                  >
                    11,666,666,667
                  </div>
                </td>
                <td className="">
                  <div
                    className="py-2 min-w-[100px] text-white font-semibold flex items-center justify-center"
                    style={{
                      padding: "8px",
                      minWidth: "100px",
                      color: "white",
                      fontWeight: "600",
                    }}
                  >
                    4/5/16%
                  </div>
                </td>
                <td className="">
                  <div
                    className="py-2 min-w-[220px] text-white font-semibold flex items-center justify-center"
                    style={{
                      padding: "8px",
                      minWidth: "220px",
                      color: "white",
                      fontWeight: "600",
                    }}
                  >
                    6/5/4 months linear
                  </div>
                </td>
              </tr>
              {/*  */}
              <tr
                className="bg-[#1d1635]"
                style={{ backgroundColor: "#1d1635" }}
              >
                <td className="py-1 px-1" style={{ padding: "4px" }}>
                  <div
                    className="bg-[#bcafe6] min-w-[250px] min-h-[50px] pl-4 pr-2 text-white font-semibold flex items-center justify-start"
                    style={{
                      backgroundColor: "#bcafe6",
                      minWidth: "250px",
                      minHeight: "50px",
                      padding: "0 8px 0 16px",
                      color: "white",
                      fontWeight: "600",
                    }}
                  >
                    Airdrop
                  </div>
                </td>
                <td className="">
                  <div className="py-2 min-w-[80px] text-white font-semibold flex items-center justify-center">
                    5%
                  </div>
                </td>
                <td className="">
                  <div className="py-2 min-w-[250px] text-white font-semibold flex items-center justify-center">
                    1,666,666,667
                  </div>
                </td>
                <td className="">
                  <div className="py-2 min-w-[100px] text-white font-semibold flex items-center justify-center">
                    0%
                  </div>
                </td>
                <td className="">
                  <div className="py-2 min-w-[220px] text-white font-semibold flex items-center justify-center">
                    6 months linear
                  </div>
                </td>
              </tr>
              {/*  */}
              <tr
                className="bg-[#1d1635]"
                style={{ backgroundColor: "#1d1635" }}
              >
                <td className="py-1 px-1" style={{ padding: "4px" }}>
                  <div
                    className="bg-[#bcafe6] min-w-[250px] min-h-[50px] pl-4 pr-2 text-white font-semibold flex items-center justify-start"
                    style={{
                      backgroundColor: "#bcafe6",
                      minWidth: "250px",
                      minHeight: "50px",
                      padding: "0 8px 0 16px",
                      color: "white",
                      fontWeight: "600",
                    }}
                  >
                    Community Incentives
                  </div>
                </td>
                <td className="">
                  <div className="py-2 min-w-[80px] text-white font-semibold flex items-center justify-center">
                    10%
                  </div>
                </td>
                <td className="">
                  <div className="py-2 min-w-[250px] text-white font-semibold flex items-center justify-center">
                    3,333,333,333
                  </div>
                </td>
                <td className="">
                  <div className="py-2 min-w-[100px] text-white font-semibold flex items-center justify-center">
                    10%
                  </div>
                </td>
                <td className="">
                  <div className="py-2 min-w-[220px] text-white font-semibold flex items-center justify-center">
                    6 months linear
                  </div>
                </td>
              </tr>

              {/*  */}
              <tr
                className="bg-[#1d1635]"
                style={{ backgroundColor: "#1d1635" }}
              >
                <td className="py-1 px-1" style={{ padding: "4px" }}>
                  <div
                    className="bg-[#bcafe6] min-w-[250px] min-h-[50px] pl-4 pr-2 text-white font-semibold flex items-center justify-start"
                    style={{
                      backgroundColor: "#bcafe6",
                      minWidth: "250px",
                      minHeight: "50px",
                      padding: "0 8px 0 16px",
                      color: "white",
                      fontWeight: "600",
                    }}
                  >
                    Marketing & Operations
                  </div>
                </td>
                <td className="">
                  <div className="py-2 min-w-[80px] text-white font-semibold flex items-center justify-center">
                    5%
                  </div>
                </td>
                <td className="">
                  <div className="py-2 min-w-[250px] text-white font-semibold flex items-center justify-center">
                    1,666,666,667
                  </div>
                </td>
                <td className="">
                  <div className="py-2 min-w-[100px] text-white font-semibold flex items-center justify-center">
                    0%
                  </div>
                </td>
                <td className="">
                  <div className="py-2 min-w-[220px] text-white font-semibold flex items-center justify-center">
                    1 year linear
                  </div>
                </td>
              </tr>

              {/*  */}
              <tr
                className="bg-[#1d1635]"
                style={{ backgroundColor: "#1d1635" }}
              >
                <td className="py-1 px-1" style={{ padding: "4px" }}>
                  <div
                    className="bg-[#00e5aa] min-w-[250px] min-h-[50px] pl-4 pr-2 text-white font-semibold flex items-center justify-start"
                    style={{
                      backgroundColor: "#00e5aa",
                      minWidth: "250px",
                      minHeight: "50px",
                      padding: "0 8px 0 16px",
                      color: "white",
                      fontWeight: "600",
                    }}
                  >
                    Team Allocation
                  </div>
                </td>
                <td className="">
                  <div className="py-2 min-w-[80px] text-white font-semibold flex items-center justify-center">
                    10%
                  </div>
                </td>
                <td className="">
                  <div className="py-2 min-w-[250px] text-white font-semibold flex items-center justify-center">
                    3,333,333,333
                  </div>
                </td>
                <td className="">
                  <div className="py-2 min-w-[100px] text-white font-semibold flex items-center justify-center">
                    0%
                  </div>
                </td>
                <td className="">
                  <div className="py-2 min-w-[220px] text-white font-semibold flex items-center justify-center">
                    1 year linear
                  </div>
                </td>
              </tr>

              {/*  */}
              <tr
                className="bg-[#1d1635]"
                style={{ backgroundColor: "#1d1635" }}
              >
                <td className="py-1 px-1" style={{ padding: "4px" }}>
                  <div
                    className="bg-[#00dee5] min-w-[250px] min-h-[50px] pl-4 pr-2 text-white font-semibold flex items-center justify-start"
                    style={{
                      backgroundColor: "#00dee5",
                      minWidth: "250px",
                      minHeight: "50px",
                      padding: "0 8px 0 16px",
                      color: "white",
                      fontWeight: "600",
                    }}
                  >
                    Exchange Listings
                  </div>
                </td>
                <td className="">
                  <div className="py-2 min-w-[80px] text-white font-semibold flex items-center justify-center">
                    12.5%
                  </div>
                </td>
                <td className="">
                  <div className="py-2 min-w-[250px] text-white font-semibold flex items-center justify-center">
                    4,166,666,667
                  </div>
                </td>
                <td className="">
                  <div className="py-2 min-w-[100px] text-white font-semibold flex items-center justify-center">
                    0%
                  </div>
                </td>
                <td className="">
                  <div className="py-2 min-w-[220px] text-white font-semibold flex items-center justify-center">
                    3 months locked
                  </div>
                </td>
              </tr>
              {/*  */}
              <tr
                className="bg-[#1d1635]"
                style={{ backgroundColor: "#1d1635" }}
              >
                <td className="py-1 px-1" style={{ padding: "4px" }}>
                  <div
                    className="bg-[#14bfff] min-w-[250px] min-h-[50px] pl-4 pr-2 text-white font-semibold flex items-center justify-start"
                    style={{
                      backgroundColor: "#14bfff",
                      minWidth: "250px",
                      minHeight: "50px",
                      padding: "0 8px 0 16px",
                      color: "white",
                      fontWeight: "600",
                    }}
                  >
                    Initial Liquidity Pool
                  </div>
                </td>
                <td className="">
                  <div className="py-2 min-w-[80px] text-white font-semibold flex items-center justify-center">
                    20%
                  </div>
                </td>
                <td className="">
                  <div className="py-2 min-w-[250px] text-white font-semibold flex items-center justify-center">
                    6,666,666,667
                  </div>
                </td>
                <td className="">
                  <div className="py-2 min-w-[100px] text-white font-semibold flex items-center justify-center">
                    100%
                  </div>
                </td>
                <td className="">
                  <div className="py-2 min-w-[220px] text-white font-semibold flex items-center justify-center">
                    -
                  </div>
                </td>
              </tr>
              {/*  */}
              <tr
                className="bg-[#1d1635]"
                style={{ backgroundColor: "#1d1635" }}
              >
                <td className="py-1 px-1" style={{ padding: "4px" }}>
                  <div
                    className="bg-[#5b5aff] min-w-[250px] min-h-[50px] pl-4 pr-2 text-white font-semibold flex items-center justify-start"
                    style={{
                      backgroundColor: "#5b5aff",
                      minWidth: "250px",
                      minHeight: "50px",
                      padding: "0 8px 0 16px",
                      color: "white",
                      fontWeight: "600",
                    }}
                  >
                    Treasury
                  </div>
                </td>
                <td className="">
                  <div className="py-2 min-w-[80px] text-white font-semibold flex items-center justify-center">
                    2.5%
                  </div>
                </td>
                <td className="">
                  <div className="py-2 min-w-[250px] text-white font-semibold flex items-center justify-center">
                    833,333,333
                  </div>
                </td>
                <td className="">
                  <div className="py-2 min-w-[100px] text-white font-semibold flex items-center justify-center">
                    100%
                  </div>
                </td>
                <td className="">
                  <div className="py-2 min-w-[220px] text-white font-semibold flex items-center justify-center">
                    -
                  </div>
                </td>
              </tr>
              {/*  */}
              <tr className="bg-[]">
                <td className="py-1 px-1" style={{ padding: "4px" }}>
                  <div
                    className=" min-w-[250px] min-h-[50px] pl-4 pr-2 text-[#8125FF] font-semibold flex items-center justify-start"
                    style={{ color: "#8125FF" }}
                  >
                    Total
                  </div>
                </td>
                <td className="">
                  <div
                    className="py-2 min-w-[80px] text-[#8125FF] font-semibold flex items-center justify-center"
                    style={{ color: "#8125FF" }}
                  >
                    100%
                  </div>
                </td>
                <td className="">
                  <div
                    className="py-2 min-w-[250px] text-[#8125FF] font-semibold flex items-center justify-center"
                    style={{ color: "#8125FF" }}
                  >
                    33,333,333,333
                  </div>
                </td>
                <td className="">
                  <div
                    className="py-2 min-w-[100px] text-[#8125FF] font-semibold flex items-center justify-center"
                    style={{ color: "#8125FF" }}
                  >
                    TGE
                  </div>
                </td>
                <td className="">
                  <div
                    className="py-2 min-w-[220px] text-[#8125FF] font-semibold flex items-center justify-center"
                    style={{ color: "#8125FF" }}
                  >
                    -
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tokenomics;
