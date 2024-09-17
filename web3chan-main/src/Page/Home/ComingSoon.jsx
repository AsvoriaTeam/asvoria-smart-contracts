import React from "react";
import Token from "./Token";
import Hero from "./Hero";

const ComingSoon = () => {
  return (
    <>
      <div className="max-w-[1400px] px-5 mx-auto flex justify-between my-5 items-center relative">
      <div className="flex mx-auto items-center gap-3">
            <a href="https://x.com/web3_chan" target="_blank">
              <img className="w-5" src="https://firebasestorage.googleapis.com/v0/b/web3chan-631d9.appspot.com/o/assets%2Ftwitter.svg?alt=media&token=cbc9108e-b245-47a9-9b83-f9c7ffe92e33" alt="X" />
            </a>
            <a href="">
              <img className="w-6" src="https://firebasestorage.googleapis.com/v0/b/web3chan-631d9.appspot.com/o/assets%2Ftelegram.svg?alt=media&token=362b94b4-641d-4df3-86ae-481e5f836ef5" alt="telegram" />
            </a>
          </div>
      </div>
      <div className="">
        <Hero
          className="my-7 px-5 max-w-[300px] mx-auto w-full"
          img="https://firebasestorage.googleapis.com/v0/b/web3chan-631d9.appspot.com/o/assets%2Fcomingsoon.svg?alt=media&token=347c8e51-cddc-44d8-a969-f031ee43e7fb"
        />
        <Token />
      </div>
    </>
  );
};

export default ComingSoon;
