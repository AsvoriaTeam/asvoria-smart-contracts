import p_logo from "../../../assets/Platform/p-logo.svg";
import Button from "../../Shared/Button/index";
import p_right from "../../../assets/Platform/p-right.svg";
import Card from "./Card";
import platform_1 from "../../../assets/Platform/platform-1.mp4";
import platform_2 from "../../../assets/Platform/platform2.mp4";
import platform_3 from "../../../assets/Platform/platform-3.mp4";
import mode from "../../../assets/Platform/mode.svg";
import rocket from "../../../assets/Platform/rocket.svg";
import game from "../../../assets/Platform/game.svg";
import rocket_2 from "../../../assets/Platform/rocket-2.svg";
import mint from "../../../assets/Platform/mint.svg";
import people from "../../../assets/Platform/people.svg";
import avatar from "../../../assets/Platform/avatar.svg";
import game_2 from "../../../assets/Platform/game-2.svg";
import left_gradient from "../../../assets/left-gradient.png";
import right_gradient from "../../../assets/right-gradient.png";
import poster1 from "../../../assets/Platform/poster1.svg";
import poster2 from "../../../assets/Platform/poster2.svg";
import poster3 from "../../../assets/Platform/poster3.svg";
import "../Land/style.css";

const Platform = () => {
  return (
    <div
      style={{
        paddingLeft: "20px",
        paddingRight: "20px",
        maxWidth: "1400px",
        margin: "auto",
      }}
    >
      <img
        src={right_gradient}
        alt=""
        className="absolute right-0 "
        style={{ zIndex: "-1000" }}
      />
      <div className="flex flex-col items-center justify-between pt-20 px-4">
        <h1
          className=" flex  items-center gap-4"
          style={{ fontSize: "53px", fontWeight: "900" }}
        >
          <img src={p_logo} alt="" className="xsm:w-[80px] xsm:h-[60px]" />
          Platform
        </h1>
        <p
          className=" xsm:w-full sm:w-full  text-center"
          style={{
            fontSize: "20px",
            fontWeight: "400",
            color: "#bababa",
            textAlign: "center",
            paddingTop: "12px",
          }}
        >
          Welcome to Asvoria, your ultimate multi-chain marketplace{" "}
          <br className="sm:hidden xsm:hidden" /> and launchpad for NFTs,
          tokens, and play-to-earn games.
        </p>
        <div className="w-[90%] mx-auto max-w-[1200px] grid grid-cols-5 xsm:grid-cols-1 gap-6 sm:grid-cols-2 py-12 z-20 ">
          <div
            className="text-center  p-5 flex justify-center items-center flex-col"
            style={{
              backgroundColor: "#10101080",
              border: "1px solid #101010",
              borderRadius: "12px",
            }}
          >
            <img src={rocket_2} alt="" />
            <span className="text-primary">
              Launch Tokens <br /> with Ease
            </span>
            <span className="text-purple500">Live in September</span>
          </div>
          {/*  */}
          <div
            className="text-center  p-5 flex justify-center items-center flex-col"
            style={{
              backgroundColor: "#10101080",
              border: "1px solid #101010",
              borderRadius: "12px",
            }}
          >
            <img src={mint} alt="" />

            <span className="text-primary">
              Mint NFTs on Solana,
              <br /> Base, and Ethereum
            </span>
            <span className="text-purple400">Live in September</span>
          </div>
          {/*  */}
          <div
            className="text-center  p-5 flex justify-center items-center flex-col"
            style={{
              backgroundColor: "#10101080",
              border: "1px solid #101010",
              borderRadius: "12px",
            }}
          >
            {" "}
            <img src={people} alt="" />
            <span className="text-primary">
              Web3 Community <br /> Dashboard
            </span>
            <span className="text-blue500">Under Development</span>
          </div>
          {/*  */}
          <div
            className="text-center  p-5 flex justify-center items-center flex-col"
            style={{
              backgroundColor: "#10101080",
              border: "1px solid #101010",
              borderRadius: "12px",
            }}
          >
            {" "}
            <img src={avatar} alt="" />
            <span className="text-primary">
              Avatar <br /> AI Tools
            </span>
            <span className="text-blue400">Under Development</span>
          </div>
          {/*  */}
          <div
            className="text-center  p-5 flex justify-center items-center flex-col"
            style={{
              backgroundColor: "#10101080",
              border: "1px solid #101010",
              borderRadius: "12px",
            }}
          >
            {" "}
            <img src={game_2} alt="" />
            <span className="text-primary">
              Earn While <br /> You Play
            </span>
            <span className="text-green500">Under Development</span>
          </div>
        </div>
      </div>
      <div
        className=" xsm:p-[20px] flex justify-between items-center  gap-4 xsm:gap-8 sm:gap-12 sm:flex-col-reverse xsm:flex-col-reverse "
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "30px",
          padding: "30px",
          backgroundColor: "#101010",
        }}
      >
        <div className="space-y-4 ">
          <h1
            className="font-extrabold text-[42px] headingtext md:text-[32px]  xsm:gap-[14px] sm:text-[30px] sm:gap-[16px] md:gap-[16px] flex gap-[24px] items-center"
            style={{ fontWeight: "800", fontSize: "42px" }}
          >
            <img
              src={p_logo}
              alt=""
              className="w-[73px] h-[53px] sm:w-[63px] smh-[43px] xsm:w-[60px] xsm:h-[40px]"
            />
            All in one Ecosystem
          </h1>
          <p
            className="font-normal text-[14px] text-primary  pb-4 "
            style={{ fontWeight: "400", fontSize: "14px" }}
          >
            Asvoria is a pioneering platform designed to bring the best of Web3
            to your fingertips. <br className="sm:hidden xsm:hidden" /> Launch
            and manage your NFTs, create and distribute tokens, and leverage our{" "}
            <br className="sm:hidden xsm:hidden" /> powerful token launchpad to
            propel your projects. Stay tuned for upcoming features,{" "}
            <br className="sm:hidden xsm:hidden" /> including our community
            platform, AI avatar tools, and Play-and-Educate-to-Earn{" "}
            <br className="sm:hidden xsm:hidden" /> experiences.
          </p>

          <div className="flex items-center gap-6 xsm:flex-col">
            <button
              className="font-bold text-[16px] md:text-[18px] text-white flex items-center justify-center rounded-[12px] bg-gradient-to-br from-customGreen via-customBlue to-customPurple "
              style={{ width: "154px", height: "60px", borderRadius: "12px" }}
            >
              Launch Token
            </button>
            <button
              style={{
                position: "relative",
                width: "233px",
                height: "60px",
                display: "inline-block",
                padding: "2px",
                borderRadius: "12px",
                backgroundImage:
                  "linear-gradient(to bottom right, #01FEA8, #46A5FF, #D632FF)",
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "16px 16px",
                  fontWeight: "600",
                  color: "white",
                  backgroundColor: "#101010",
                  borderRadius: "12px",
                }}
              >
                Launch NFT Collection
              </span>
            </button>
          </div>
        </div>
        <div className="imageContainer">
          <img
            src={p_right}
            alt=""
            style={{
              borderRadius: "30px",
              width: "100%",
              height: "100%",
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
      <img
        src={left_gradient}
        alt=""
        className="absolute left-0  pt-52"
        style={{ zIndex: "-1000" }}
      />
      <div
        className="flex gap-[24px] py-12 sm:flex-col xsm:flex-col"
        style={{ gap: "24px" }}
      >
        <Card
          Video={platform_1}
          poster={poster1}
          logo={mode}
          heading={"NFT Marketplace"}
          text={
            <div>
              <p className="font-normal text-[14px] text-primary">
                Showcase your digital masterpieces or collect unique assets with
                ease and security. Our user-friendly tools support artists in
                minting NFTs and provide collectors with a seamless experience
                in finding rare items.
              </p>
              <div className="pt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span
                    style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "100%",
                      display: "block",
                      backgroundColor: "#46A5FF",
                    }}
                  ></span>
                  <p> Easy minting tools for creators</p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "100%",
                      display: "block",
                      backgroundColor: "#46A5FF",
                    }}
                  ></span>
                  <p> Wide range of formats (art, music, video, etc.)</p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "100%",
                      display: "block",
                      backgroundColor: "#46A5FF",
                    }}
                  ></span>
                  <p> Access to a global marketplace</p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "100%",
                      display: "block",
                      backgroundColor: "#46A5FF",
                    }}
                  ></span>
                  <p> Discover exclusive NFTs</p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "100%",
                      display: "block",
                      backgroundColor: "#46A5FF",
                    }}
                  ></span>
                  <p> Secure transactions</p>
                </div>
              </div>
            </div>
          }
        />
        <Card
          Video={platform_2}
          poster={poster2}
          logo={rocket}
          heading={"Token Launchpad"}
          text={
            <div>
              <p className="font-normal text-[14px] text-primary">
                Leverage Asvoria’s powerful token launchpad to create,
                distribute, and manage your tokens. Our platform ensures a
                smooth and efficient process, from initial creation to market
                entry.`
              </p>
              <div className="pt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span
                    style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "100%",
                      display: "block",
                      backgroundColor: "#46A5FF",
                    }}
                  ></span>
                  <p> Simple token creation</p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "100%",
                      display: "block",
                      backgroundColor: "#46A5FF",
                    }}
                  ></span>
                  <p> Efficient distribution tools</p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "100%",
                      display: "block",
                      backgroundColor: "#46A5FF",
                    }}
                  ></span>
                  <p> Secure management</p>
                </div>
                <div className="flex items-center gap-2 lg:pb-7 ">
                  <span
                    style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "100%",
                      display: "block",
                      backgroundColor: "#46A5FF",
                    }}
                  ></span>
                  <p> Access to a broad audience</p>
                </div>
              </div>
            </div>
          }
        />
        <Card
          Video={platform_3}
          poster={poster3}
          logo={game}
          heading={"Play-to-earn Gaming"}
          text={
            <div>
              <p className="font-normal text-[14px] text-primary">
                Dive into our immersive play-to-earn games and turn your gaming
                skills into real rewards. Asvoria’s gaming platform combines
                entertainment with earning opportunities, providing a unique and
                engaging experience.
              </p>
              <div className="pt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span
                    style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "100%",
                      display: "block",
                      backgroundColor: "#46A5FF",
                    }}
                  ></span>
                  <p>Exciting games with real rewards</p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "100%",
                      display: "block",
                      backgroundColor: "#46A5FF",
                    }}
                  ></span>
                  <p> Engaging and interactive gameplay</p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "100%",
                      display: "block",
                      backgroundColor: "#46A5FF",
                    }}
                  ></span>
                  <p> Opportunities to earn while playing</p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "100%",
                      display: "block",
                      backgroundColor: "#46A5FF",
                    }}
                  ></span>
                  <p> Connect with a vibrant gaming community</p>
                </div>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default Platform;
