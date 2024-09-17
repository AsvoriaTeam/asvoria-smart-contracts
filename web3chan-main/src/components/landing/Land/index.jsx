import land_1 from "../../../assets/Land/land-1.svg";
import land_2 from "../../../assets/Land/land-2.svg";
import Button from "../../Shared/Button/index";
import video from "../../../assets/Land/video.mp4";
import poster from "../../../assets/Land/poster.svg";
import "./style.css";
const Land = () => {
  return (
    <div>
      <div
        className="px-[20px] py-12  "
        style={{
          paddingLeft: "20px",
          paddingRight: "20px",
          maxWidth: "1400px",
          margin: "auto",
        }}
      >
        <div className="flex flex-col items-center justify-center">
          <h1 style={{ fontWeight: "800", fontSize: "52px" }}>Asvoria land</h1>
          <p
            className=" text-center "
            style={{ fontWeight: "400", fontSize: "20px", color: "#bababa" }}
          >
            Secure your virtual real estate in the Asvoria ecosystem. Our LAND
            NFTs offer prime digital real estate{" "}
            <br className="sm:hidden xsm:hidden" /> for creators and businesses
            to build, interact, and thrive in the Spatial Web.
          </p>
        </div>
        <div className="flex gap-4 pt-12 sm:flex-col xsm:flex-col">
          <div
            className=" flex  items-center justify-center flex-col"
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#0d0d0d",
              borderRadius: "24px",
              padding: "50px 20px",
            }}
          >
            <p>20,000LAND</p>
            <h1
              className=" pb-6"
              style={{ fontWeight: "700", fontSize: "42px" }}
            >
              Standard
            </h1>
            <div
              className=" flex items-center justify-center "
              style={{
                width: "116px",
                height: "40px",
                borderRadius: "4px",
                backgroundColor: "#d632ff",
                fontWeight: "700",
                fontSize: "24px",
              }}
            >
              2,500m2
            </div>
            <img src={land_1} alt="" />
            <div className="py-2 flex items-center gap-4 xsm:flex-col">
              <div
                className="  h-[120px] "
                style={{
                  backgroundColor: "#121212",
                  borderRadius: "12px",
                  padding: "8px 16px",
                  width: "227px",
                }}
              >
                <div className="flex items-center justify-between">
                  <p className="font-bold text-[16px]">Early Bird</p>
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "#D632FF",
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
                  <p className="font-normal text-[13px] text-primary">Price</p>
                  <p className="font-normal text-[13px] text-primary">LAND</p>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#DC1FFF",
                    }}
                  >
                    SOLD OUT
                  </p>

                  <p className="font-medium text-[14px] ">800 Parcels</p>
                </div>
              </div>
              <div
                className="h-[120px]  "
                style={{
                  backgroundColor: "#121212",
                  borderRadius: "12px",
                  padding: "8px 16px",
                  width: "227px",
                }}
              >
                <div className="flex items-center justify-between">
                  <p className="font-bold text-[16px]">Phase 1</p>
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
                  <p className="font-normal text-[13px] text-primary">Price</p>
                  <p className="font-normal text-[13px] text-primary">LAND</p>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <p className="font-normal text-[13px] ">0.50 SOL</p>
                  <p className="font-medium text-[14px] ">4,000 Parcels</p>
                </div>
              </div>
            </div>
            <div className="pt-2 pb-6 flex items-center gap-4 xsm:flex-col">
              <div
                className="h-[120px]  "
                style={{
                  backgroundColor: "#121212",
                  borderRadius: "12px",
                  padding: "8px 16px",
                  width: "227px",
                }}
              >
                <div className="flex items-center justify-between">
                  <p className="font-bold text-[16px]">Phase 2</p>
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "#D632FF",
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
                  <p className="font-normal text-[13px] text-primary">Price</p>
                  <p className="font-normal text-[13px] text-primary">LAND</p>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <p className="font-normal text-[13px] ">0.70 SOL</p>
                  <p className="font-medium text-[14px] ">8,000 Parcels</p>
                </div>
              </div>
              <div
                className="h-[120px]  "
                style={{
                  backgroundColor: "#121212",
                  borderRadius: "12px",
                  padding: "8px 16px",
                  width: "227px",
                }}
              >
                <div className="flex items-center justify-between">
                  <p className="font-bold text-[16px]">Public (APP)</p>
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "#01FEA8",
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
                  <p className="font-normal text-[13px] text-primary">Price</p>
                  <p className="font-normal text-[13px] text-primary">LAND</p>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <p className="font-normal text-[13px] ">1.00 SOL</p>
                  <p className="font-medium text-[14px] ">7,200 Parcels</p>
                </div>
              </div>
            </div>
            <div className="w-full">
              <a href="/standard-land">
                <button
                  className="font-bold w-full text-[16px] md:text-[18px] text-white flex items-center justify-center  bg-gradient-to-br from-customGreen via-customBlue to-customPurple"
                  style={{
                    borderRadius: "100%",
                    borderRadius: "58px",
                    height: "48px",
                  }}
                >
                  Mint Standard Land
                </button>
              </a>
            </div>
          </div>
          <div
            className=" flex  items-center justify-center flex-col"
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#0d0d0d",
              borderRadius: "24px",
              padding: "50px 20px",
            }}
          >
            <p>5,000LAND</p>
            <h1
              className=" pb-6"
              style={{ fontWeight: "700", fontSize: "42px" }}
            >
              Premium
            </h1>
            <div
              className=" flex items-center justify-center"
              style={{
                width: "116px",
                height: "40px",
                borderRadius: "4px",
                backgroundColor: "#d632ff",
                fontWeight: "700",
                fontSize: "24px",
              }}
            >
              10,000m2
            </div>
            <img src={land_2} alt="" />
            <div className="py-2 flex items-center gap-4 xsm:flex-col">
              <div
                className="  h-[120px] "
                style={{
                  backgroundColor: "#121212",
                  borderRadius: "12px",
                  padding: "8px 16px",
                  width: "227px",
                }}
              >
                <div className="flex items-center justify-between">
                  <p className="font-bold text-[16px]">Early Bird</p>
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "#D632FF",
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
                  <p className="font-normal text-[13px] text-primary">Price</p>
                  <p className="font-normal text-[13px] text-primary">LAND</p>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#DC1FFF",
                    }}
                  >
                    SOLD OUT
                  </p>

                  <p className="font-medium text-[14px] ">200 Parcels</p>
                </div>
              </div>
              <div
                className="h-[120px]  "
                style={{
                  backgroundColor: "#121212",
                  borderRadius: "12px",
                  padding: "8px 16px",
                  width: "227px",
                }}
              >
                <div className="flex items-center justify-between">
                  <p className="font-bold text-[16px]">Phase 1</p>
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
                  <p className="font-normal text-[13px] text-primary">Price</p>
                  <p className="font-normal text-[13px] text-primary">LAND</p>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <p className="font-normal text-[13px] ">1.7 SOL</p>
                  <p className="font-medium text-[14px] ">1,000 Parcels</p>
                </div>
              </div>
            </div>
            <div className="pt-2 pb-6 flex items-center gap-4 xsm:flex-col">
              <div
                className="h-[120px]  "
                style={{
                  backgroundColor: "#121212",
                  borderRadius: "12px",
                  padding: "8px 16px",
                  width: "227px",
                }}
              >
                <div className="flex items-center justify-between">
                  <p className="font-bold text-[16px]">Phase 2</p>
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "#D632FF",
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
                  <p className="font-normal text-[13px] text-primary">Price</p>
                  <p className="font-normal text-[13px] text-primary">LAND</p>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <p className="font-normal text-[13px] ">2.00 SOL</p>
                  <p className="font-medium text-[14px] ">2,000 Parcels</p>
                </div>
              </div>
              <div
                className="h-[120px]  "
                style={{
                  backgroundColor: "#121212",
                  borderRadius: "12px",
                  padding: "8px 16px",
                  width: "227px",
                }}
              >
                <div className="flex items-center justify-between">
                  <p className="font-bold text-[16px]">Public (APP)</p>
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "#01FEA8",
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
                  <p className="font-normal text-[13px] text-primary">Price</p>
                  <p className="font-normal text-[13px] text-primary">LAND</p>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <p className="font-normal text-[13px] ">2.70 SOL</p>
                  <p className="font-medium text-[14px] ">1,800 Parcels</p>
                </div>
              </div>
            </div>

            <div className="w-full">
              <a href="/premium-land">
                <button
                  className="font-bold w-full text-[16px] md:text-[18px] text-white flex items-center justify-center  bg-gradient-to-br from-customGreen via-customBlue to-customPurple"
                  style={{
                    borderRadius: "100%",
                    borderRadius: "58px",
                    height: "48px",
                  }}
                >
                  Mint Premium Land
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="relative pt-12">
        <video
          className="w-full h-full object-contain rounded-[4px]"
          src={video}
          autoPlay
          loop
          playsInline
          controls
          poster={poster}
        />
        <div className="absolute inset-0 bg-black opacity-50 z-5 pointer-events-none"></div>

        <div className="content-wrapper">
          <div className="content">
            <div className="label">Community and Partnerships</div>
            <h1 className="heading">
              Launching Utility-Driven NFTs and Play-to-Earn Games
            </h1>
            <p className="paragraph" style={{ textAlign: "center" }}>
              Unleash the potential of utility-driven NFTs that go beyond mere
              collectibles. Asvoria’s NFTs offer real-world benefits and
              interactive features, enhancing user engagement and value. Combine
              this with our thrilling play-to-earn games where your skills and
              strategy translate into tangible rewards, creating a vibrant and
              dynamic ecosystem.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Land;
