import poster from "../../assets/poster.svg";
import mint_video from "../../assets/mint-video.mp4";
import Countdown from "../../components/Shared/Countdown";

const Mint = () => {
  const targetDate = "2024-09-12T23:59:59";

  return (
    <div
      style={{
        width: "90%",
        maxWidth: "1000px",
        margin: "0 auto",
        paddingBottom: "150px",
      }}
      className="max-w-312 mx-auto"
      id="mint"
    >
      <div className="px-[20px] pb-12 pt-32 top">
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
            className=""
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
              <a href="/mint">
                <button
                  className="flex items-center justify-center"
                  style={{
                    width: "100%",
                    height: "48px",
                    backgroundColor: "#6340DD",
                    color: "white",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  Mint
                </button>
              </a>
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
    </div>
  );
};

export default Mint;
