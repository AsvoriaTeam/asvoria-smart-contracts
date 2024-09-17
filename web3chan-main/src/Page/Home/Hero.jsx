import React from "react";

const Hero = ({ img, text, className }) => {
  return (
    <>
      <div
        className=" hero relative flex flex-col justify-center items-center"
        style={{ width: "100%", minHeight: "400px", objectFit: "cover" }}
        id="home"
      >
        <img
          src="https://firebasestorage.googleapis.com/v0/b/web3chan-631d9.appspot.com/o/assets%2Fbackground.svg?alt=media&token=5da11948-c26a-42ce-8773-faa6bfebe802"
          className="absolute  "
          style={{
            objectFit: "cover",
            top: "0px",
            width: "100%",
            height: "100%",
            zIndex: "-20",
          }}
          alt=""
        />
        <div className="flex flex-col text-center">
          <img
            className="max-w-[800px] px-5 w-full mx-auto"
            style={{ maxWidth: "800px", width: "100%", margin: "auto" }}
            src="https://firebasestorage.googleapis.com/v0/b/web3chan-631d9.appspot.com/o/assets%2Fmain_logo.svg?alt=media&token=871ad5be-1c21-4123-aefa-4c5f71240643"
            alt=""
          />
          <img
            src={img}
            className={className}
            alt=""
            style={{
              maxWidth: "550px",
              width: "100%",
              margin: "auto",
              padding: "28px 20px",
            }}
          />
          <p
            className="text-white text-center px-5 max-w-[670px] text-lg mx-auto"
            style={{ maxWidth: "670px", margin: "auto", padding: " 0 20px" }}
          >
            {text}
          </p>
        </div>
      </div>
    </>
  );
};

export default Hero;
