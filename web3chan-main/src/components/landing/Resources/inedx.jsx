import image2 from "../../../assets/Platform/image2.svg";
import left_gradient from "../../../assets/left-gradient.png";
import resources_1 from "../../../assets/Resources/resources-1.mp4";
import resources_2 from "../../../assets/Resources/resources-2.svg";
import resources_3 from "../../../assets/Resources/resources-3.svg";
import r_poster from "../../../assets/Resources/r-poster.svg";
import "./style.css";

const Resources = () => {
  return (
    <div
      className="px-[20px] pb-12 pt-20"
      style={{
        paddingLeft: "20px",
        paddingRight: "20px",
        maxWidth: "1400px",
        margin: "auto",
      }}
    >
      <div className="flex flex-col justify-center items-center">
        <h1 style={{ fontWeight: "800", fontSize: "52px" }}>Why Asvoria</h1>
        <p style={{ fontWeight: "400", fontSize: "24px" }}>
          Buy land inside our virtual world
        </p>
      </div>
      <div className="py-12 space-y-12">
        <div className="flex gap-6 sm:flex-col xsm:flex-col">
          <div
            c
            style={{
              padding: "8px",
              borderRadius: "8px",
              width: "100%",
              height: "100%",
              backgroundColor: "#101010",
            }}
          >
            <video
              src={resources_1}
              autoPlay
              loop
              playsInline
              controls
              poster={r_poster}
              alt=""
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div className="space-y-2">
            <h1 style={{ fontWeight: "700", fontSize: "30px" }}>
              Multi-chain Support
            </h1>
            <p className="paragraph ">
              Asvoria offers robust multi-chain support, providing you with the
              flexibility to operate across multiple blockchain networks. This
              ensures that your NFTs, tokens, and digital assets are not
              confined to a single ecosystem, giving you greater reach and
              interoperability. Whether you’re leveraging the speed of Solana,
              the security of Ethereum, or other prominent chains, Asvoria
              seamlessly integrates with them all, empowering you to choose the
              best network for your specific needs.
            </p>
            <div className="pt-4 space-y-2 font-normal text-[14px] text-primary">
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
                <p> Seamless integration with multiple blockchain networks</p>
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
                <p> Greater reach and interoperability for your assets</p>
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
                <p> Flexibility to choose the best chain for your needs</p>
              </div>
              <div className="flex items-center gap-2 ">
                <span
                  style={{
                    width: "4px",
                    height: "4px",
                    borderRadius: "100%",
                    display: "block",
                    backgroundColor: "#46A5FF",
                  }}
                ></span>
                <p> Reduced risk of network dependency</p>
              </div>
            </div>
          </div>
        </div>
        <img
          src={left_gradient}
          alt=""
          className="left-0 absolute "
          style={{ zIndex: "-1000" }}
        />
        <div className="flex gap-6 sm:flex-col-reverse xsm:flex-col-reverse ">
          <div className="space-y-2">
            <h1 style={{ fontWeight: "700", fontSize: "30px" }}>
              Token and NFT Ecosytem
            </h1>
            <p className="paragraph">
              Our platform goes beyond mere transactions, embedding real-world
              utility into the spatial web. Asvoria’s NFTs and digital assets
              can be used within our expansive virtual environments, offering
              practical applications that enhance user engagement and value.
              From virtual real estate that hosts events and exhibitions to
              utility-driven NFTs that provide exclusive access and benefits,
              our spatial web ecosystem is designed to offer meaningful
              interactions and experiences.
            </p>
            <div className="pt-4 space-y-2 font-normal text-[14px] text-primary">
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
                <p> NFTs with real-world applications</p>
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
                <p> Enhanced user engagement through practical use</p>
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
                <p> Dynamic virtual environments for immersive experiences</p>
              </div>
              <div className="flex items-center gap-2 ">
                <span
                  style={{
                    width: "4px",
                    height: "4px",
                    borderRadius: "100%",
                    display: "block",
                    backgroundColor: "#46A5FF",
                  }}
                ></span>
                <p> Virtual real estate for hosting events and exhibitions</p>
              </div>
              <div className="flex items-center gap-2 ">
                <span
                  style={{
                    width: "4px",
                    height: "4px",
                    borderRadius: "100%",
                    display: "block",
                    backgroundColor: "#46A5FF",
                  }}
                ></span>
                <p>
                  Utility-driven NFTs offering exclusive access and benefits
                </p>
              </div>
            </div>
          </div>
          <div className="p-[8px] rounded-[8px] w-full h-full bg-[#101010]">
            <img
              src={resources_2}
              alt=""
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
        <div className="flex gap-6 sm:flex-col xsm:flex-col ">
          <div className="p-[8px] rounded-[8px] w-full h-full bg-[#101010]">
            <img
              src={resources_3}
              alt=""
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div className="space-y-2">
            <h1 style={{ fontWeight: "700", fontSize: "30px" }}>
              Experts in Blockchain and Unreal Engine 5.3 Developers
            </h1>
            <p className="paragraph">
              At Asvoria, our team comprises industry experts in blockchain
              technology and Unreal Engine 5.3 development. This combination
              allows us to create cutting-edge, high-quality virtual experiences
              that push the boundaries of what’s possible in Web3. With our
              expertise, we deliver unparalleled graphical fidelity,
              interactivity, and security, ensuring that your projects are not
              only visually stunning but also robust and secure. Our developers
              are constantly innovating, bringing the latest advancements in
              technology to the Asvoria platform.
            </p>
            <div className="pt-4 space-y-2 font-normal text-[14px] text-primary">
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
                <p> Industry-leading blockchain technology expertise</p>
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
                <p> Advanced development using Unreal Engine 5.3</p>
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
                <p>High-quality virtual experiences and innovative solutions</p>
              </div>
              <div className="flex items-center gap-2 ">
                <span
                  style={{
                    width: "4px",
                    height: "4px",
                    borderRadius: "100%",
                    display: "block",
                    backgroundColor: "#46A5FF",
                  }}
                ></span>
                <p>
                  {" "}
                  Continuous innovation and adoption of the latest technologies
                </p>
              </div>
              <div className="flex items-center gap-2 ">
                <span
                  style={{
                    width: "4px",
                    height: "4px",
                    borderRadius: "100%",
                    display: "block",
                    backgroundColor: "#46A5FF",
                  }}
                ></span>
                <p>Robust security and seamless interactivity </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
