import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-scroll";
import { HashLink } from "react-router-hash-link";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    // Function to toggle body scrolling
    const toggleBodyScroll = () => {
      if (isSidebarOpen) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }
    };

    // Call toggleBodyScroll when isSidebarOpen changes
    toggleBodyScroll();

    // Cleanup function to remove event listener
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleOverlayClick = (event) => {
    if (event.target === sidebarRef.current) {
      closeSidebar();
    }
  };

  return (
    <div
      className="max-w-[1400px] px-5 mx-auto flex justify-between my-5 items-center relative py-5"
      style={{ maxWidth: "1400px", margin: "auto" }}
    >
      <a href="/">
        <img
          className="lg:mt-0 mt-2"
          src="https://firebasestorage.googleapis.com/v0/b/web3chan-631d9.appspot.com/o/assets%2Fweb3chain.svg?alt=media&token=d6f131ab-db0f-4ec8-8936-6d28c715d05a"
          alt="Logo"
        />
      </a>

      {/* Hamburger menu icon */}
      <div className="lg:hidden mt-2" onClick={toggleSidebar}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-white cursor-pointer"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </div>

      {/* Sidebar */}
      <div
        className={` inset-0 bg-gray-900 z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform ease-in-out duration-300 lg:bg-transparent w-full lg:w-max lg:transform-none lg:flex lg:items-center lg:justify-end lg:static fixed overflow-y-auto`}
        ref={sidebarRef}
        onClick={handleOverlayClick}
      >
        <div className="flex flex-col lg:flex-row text-center lg:space-x-4 lg:py-0 py-4">
          <img
            className="lg:hidden block max-w-[500px] w-full px-5   mx-auto"
            style={{
              width: "100%",
              maxWidth: "500px",
              paddingBottom: "30px",
              paddingTop: "50px",
            }}
            src="https://firebasestorage.googleapis.com/v0/b/web3chan-631d9.appspot.com/o/assets%2Fweb3chain.svg?alt=media&token=d6f131ab-db0f-4ec8-8936-6d28c715d05a"
            alt="Logo"
          />

          <HashLink
            onClick={closeSidebar}
            to="/#home"
            className=" nav-links-home cursor-pointer lg:px-1 lg:py-1 px-4 py-2 flex items-center justify-center xl:px-4 xl:py-3 bg-[#5D4B97] hover:bg-[#5D4B97] transition rounded-[7px] w-max mx-auto lg:mx-0 text-white"
          >
            Home
          </HashLink>
          <HashLink
            onClick={closeSidebar}
            to="/#platform"
            className=" nav-links cursor-pointer lg:px-1 lg:py-1 px-4 py-2 lg:mt-0 mt-3 flex items-center justify-center xl:px-4 xl:py-3 bg-transparent hover:bg-[#5D4B97] transition rounded-[7px] w-max mx-auto lg:mx-0 text-gray-400 hover:text-white"
          >
            Platform
          </HashLink>
          <HashLink
            onClick={closeSidebar}
            to="/#Web3"
            className=" nav-links cursor-pointer lg:px-1 lg:py-1 px-4 py-2 flex items-center justify-center xl:px-4 xl:py-3 bg-transparent hover:bg-[#5D4B97] transition rounded-[7px] w-max mx-auto lg:mx-0 text-gray-400 hover:text-white"
          >
            Web3
          </HashLink>
          <HashLink
            onClick={closeSidebar}
            to="/#presale"
            className=" nav-links cursor-pointer lg:px-1 lg:py-1 px-4 py-2 flex items-center justify-center xl:px-4 xl:py-3 bg-transparent hover:bg-[#5D4B97] transition rounded-[7px] w-max mx-auto lg:mx-0 text-gray-400 hover:text-white"
          >
            Presale
          </HashLink>

          <a
            onClick={closeSidebar}
            href="/mint"
            className=" nav-links cursor-pointer lg:px-1 lg:py-1 px-4 py-2 flex items-center justify-center xl:px-4 xl:py-3 bg-transparent hover:bg-[#5D4B97] transition rounded-[7px] w-max mx-auto lg:mx-0 text-gray-400 hover:text-white"
          >
            NFT
          </a>

          {/* <a
            onClick={closeSidebar}
            href="#"
            className="cursor-pointer lg:px-1 lg:py-1 px-4 py-2 flex items-center justify-center xl:px-4 xl:py-3 bg-transparent hover:bg-[#5D4B97] transition rounded-[7px] w-max mx-auto lg:mx-0 text-gray-400 hover:text-white"
          >
            Docs
          </a> */}
          <HashLink
            onClick={closeSidebar}
            to="/#tokenomics"
            className=" nav-links cursor-pointer lg:px-1 lg:py-1 px-4 py-2 flex items-center justify-center xl:px-4 xl:py-3 bg-transparent hover:bg-[#5D4B97] transition rounded-[7px] w-max mx-auto lg:mx-0 text-gray-400 hover:text-white"
          >
            Tokenomics
          </HashLink>
          <HashLink
            onClick={closeSidebar}
            to="/#about"
            className=" nav-links cursor-pointer lg:px-1 lg:py-1 px-4 py-2 flex items-center justify-center xl:px-4 xl:py-3 bg-transparent hover:bg-[#5D4B97] transition rounded-[7px] w-max mx-auto lg:mx-0 text-gray-400 hover:text-white"
          >
            About us
          </HashLink>
          <HashLink
            onClick={closeSidebar}
            smooth
            to="/#contact"
            className=" nav-links cursor-pointer lg:px-1 lg:py-1 px-4 py-2 flex items-center justify-center xl:px-4 xl:py-3 bg-transparent hover:bg-[#5D4B97] transition rounded-[7px] w-max mx-auto lg:mx-0 text-gray-400 hover:text-white"
          >
            Contact
          </HashLink>

          <div className="flex lg:mt-0 mt-3 mx-auto items-center gap-3">
            <a href="https://x.com/web3_chan" target="_blank">
              <img
                className="w-5"
                src="https://firebasestorage.googleapis.com/v0/b/web3chan-631d9.appspot.com/o/assets%2Ftwitter.svg?alt=media&token=cbc9108e-b245-47a9-9b83-f9c7ffe92e33"
                alt="X"
              />
            </a>
            <a href="https://t.me/web3chancommunity" target="_blank">
              <img
                className="w-6"
                src="https://firebasestorage.googleapis.com/v0/b/web3chan-631d9.appspot.com/o/assets%2Ftelegram.svg?alt=media&token=362b94b4-641d-4df3-86ae-481e5f836ef5"
                alt="telegram"
              />
            </a>
          </div>
          {/* <a
            href="http://www.web3chan.com/"
            target="_blank"
            className="bg-[#8125FF] lg:mt-0 flex items-center justify-center mt-5 xl:w-[140px] w-[140px] lg:w-[100px] mx-auto text-white px-4 py-2 hover:bg-opacity-80"
          >
            Login
          </a> */}
        </div>

        {/* Close button */}
        <div className="lg:hidden absolute top-2 right-0 p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 cursor-pointer text-white hover:text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            onClick={closeSidebar}
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        ></div>
      )}
    </div>
  );
};

export default Header;
