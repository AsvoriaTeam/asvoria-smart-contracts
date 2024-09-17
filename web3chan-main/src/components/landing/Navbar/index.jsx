import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Make sure to install react-icons
import logo from "../../../assets/Navbar/logo.svg";
import Button from "../../Shared/Button";
import styled from "styled-components";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const wallet = useWallet();
  const [balance, setBalance] = useState();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const WalletContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: right;
  `;

  const WalletAmount = styled.div`
    color: white;
    width: auto;
    padding: 5px 5px 5px 16px;
    min-width: 48px;
    min-height: auto;
    border-radius: 22px;
    /* background-color: #121212; */
    box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%),
      0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%);
    box-sizing: border-box;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    font-weight: 500;
    line-height: 1.75;
    text-transform: uppercase;
    border: 0;
    margin: 0;
    display: inline-flex;
    outline: 0;
    position: relative;
    align-items: center;
    user-select: none;
    vertical-align: middle;
    justify-content: flex-start;
    gap: 10px;
  `;

  const Wallet = styled.ul`
    flex: 0 0 auto;
    margin: 0;
    padding: 0;
  `;

  const ConnectButton = styled(WalletMultiButton)`
    border-radius: 18px !important;
    padding: 2px 16px;
    background-color: #6340DD;
    margin: 0 auto;
  `;
  return (
    <div
      style={{
        padding: "20px",
        width: "100%",
        position: "absolute",
        zIndex: "1000",
      }}
    >
      {/* Navbar for larger screens */}
      <div
        className=" flex items-center justify-between  "
        style={{ width: "100%", maxWidth: "1400px", margin: "auto" }}
      >
        <div
          className="hidden lg:flex items-center justify-between"
          style={{
            backgroundColor: "#121212",
            opacity: "90",
            width: "870px",
            height: "90px",
            borderRadius: "30px",
            padding: "20px 20px",
          }}
        >
          <a href="https://asvoria.io/" target="_blank">
            <img
              src={logo}
              alt="Logo"
              style={{ width: "110px", height: "46px" }}
            />
          </a>
          <span
            style={{
              backgroundColor: "#404040",
              width: "1px",
              height: "56px",
              display: "block",
              transform:"translateX(-90px)"
            }}
          ></span>
          <div
            className=" space-x-6 "
            style={{
              fontWeight: "600",
              fontSize: "14px",
              color: "#bebebe",
              marginRight: "12px",
            }}
          >
            <a href="https://asvoria.io" target="_blank">Home</a>
            <a href="https://asvoria.io/#platform" target="_blank">Platform</a>
            <a href="https://asvoria.io/#land" target="_blank">Land</a>
            <a href="https://asvoria.io/#partnerships" target="_blank">Partnerships</a>
            <a href="https://asvoria.io/#why-asvoria" target="_blank">Why Asvoria</a>
            <a href="https://asvoria.io/#news" target="_blank">News</a>
          </div>
        </div>

        {/* Get Started Button */}
        <div className="md:hidden sm:hidden xsm:hidden flex  items-center gap-4">
          {" "}
          <button
            className=" text-white flex items-center justify-center  bg-gradient-to-br from-customGreen via-customBlue to-customPurple "
            style={{
              width: "130px",
              height: "40px",
              borderRadius: "20px",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            Get Started
          </button>
          {wallet ? (
            <WalletAmount>
              {/* {(balance || 0).toLocaleString()} SOL */}
              <ConnectButton />
            </WalletAmount>
          ) : (
            <ConnectButton>Connect Wallet</ConnectButton>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between w-full ">
        <div className="lg:hidden xl:hidden ">
          {" "}
          <img src={logo} alt="Logo" />
        </div>

        {/* Hamburger Menu for mobile devices */}
        <div className="lg:hidden">
          <button onClick={toggleSidebar} className="text-white text-2xl">
            <FaBars />
          </button>
        </div>
      </div>

      {/* Sidebar for mobile devices */}
      <div
        className={`fixed top-0 left-0 h-full w-1/2 xsm:w-8/12 bg-black bg-opacity-90 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-40 lg:hidden`}
      >
        <div className="flex items-center justify-end p-4">
          <button onClick={toggleSidebar} className="text-white text-2xl">
            <FaTimes />
          </button>
        </div>
        <ul className="flex flex-col items-center mt-8">
          <li className="py-4">
            <a href="/" className="text-white text-xl" onClick={toggleSidebar}>
              Home
            </a>
          </li>
          <li className="py-4">
            <a
              href="#nft-marketplace"
              className="text-white text-xl"
              onClick={toggleSidebar}
            >
              NFT Marketplace
            </a>
          </li>
          <li className="py-4">
            <a
              href="#token-launchpad"
              className="text-white text-xl"
              onClick={toggleSidebar}
            >
              Token Launchpad
            </a>
          </li>
          <li className="py-4">
            <a
              href="#play-to-earn"
              className="text-white text-xl"
              onClick={toggleSidebar}
            >
              Play-to-earn
            </a>
          </li>
          <li className="py-4">
            <a
              href="#partnerships"
              className="text-white text-xl"
              onClick={toggleSidebar}
            >
              Partnerships
            </a>
          </li>
          <li className="py-4">
            <a
              href="#resources"
              className="text-white text-xl"
              onClick={toggleSidebar}
            >
              Resources
            </a>
          </li>
          <li className="py-4">
            <a
              href="#news"
              className="text-white text-xl"
              onClick={toggleSidebar}
            >
              News
            </a>
          </li>
        </ul>
        <div className="flex flex-col items-center justify-center pt-8 gap-6">
          <button
            className=" text-white flex items-center justify-center  bg-gradient-to-br from-customGreen via-customBlue to-customPurple "
            style={{
              width: "170px",
              height: "48px",
              borderRadius: "20px",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            Get Started
          </button>
          <div className="sm:hidden md:hidden xsm:hidden lg:flex">
            {wallet ? (
              <WalletAmount>
                {/* {(balance || 0).toLocaleString()} SOL */}
                <ConnectButton />
              </WalletAmount>
            ) : (
              <ConnectButton>Connect Wallet</ConnectButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
