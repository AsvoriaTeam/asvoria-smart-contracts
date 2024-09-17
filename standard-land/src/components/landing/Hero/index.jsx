import hero_video from "../../../assets/hero/hero-video.mp4";
import sol from "../../../assets/hero/sol.svg";
import ton from "../../../assets/hero/ton.svg";
import base from "../../../assets/hero/base.svg";
import eth from "../../../assets/hero/eth.svg";
import Button from "../../Shared/Button";
import hero from "../../../assets/hero/hero.svg";

const Hero = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        src={hero_video}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
        poster={hero}
        onError={(e) => console.error("Video failed to load", e)}
      >
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-5 pointer-events-none"></div>

      <div className="absolute inset-0 flex items-center justify-center px-4 pt-8 z-10">
        <div
          style={{
            width: "720px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
          }}
        >
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "800",
              color: "white",
              lineHeight: "1.25",
              marginBottom: "0",
            }}
          >
            Engage. Create. Earn. <br /> All in One Platform.
          </h1>
          <p
            style={{
              fontSize: "20px",
              fontWeight: "500",
              color: "#bababa",
              margin: "0",
            }}
          >
            Step Into the Future: Mint NFTs, Launch Tokens, and Play-to-Earn
            with Asvoria. Unleash the Power of Multi-Chain Capabilities and
            Gaming Utilities.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px 0",
            }}
          >
            <button
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#a2a2a2",
                backgroundColor: "#101010",
                width: "84px",
                height: "36px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
              }}
            >
              <img src={sol} alt="" />
              SOL
            </button>
            <button
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#a2a2a2",
                backgroundColor: "#101010",
                width: "92px",
                height: "36px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
              }}
            >
              <img src={base} alt="" />
              Base
            </button>
            <button
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#a2a2a2",
                backgroundColor: "#101010",
                width: "87px",
                height: "36px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
              }}
            >
              <img src={ton} alt="" />
              Ton
            </button>
            <button
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#a2a2a2",
                backgroundColor: "#101010",
                width: "85px",
                height: "36px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
              }}
            >
              <img src={eth} alt="" />
              ETH
            </button>
          </div>
          <button
            className="font-bold  h-10 text-[16px] md:text-[18px] text-white flex items-center justify-center  bg-gradient-to-br from-customGreen via-customBlue to-customPurple "
            style={{ width: "192px", borderRadius: "12px" }}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
