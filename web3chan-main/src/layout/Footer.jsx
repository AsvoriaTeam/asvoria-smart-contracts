import React, { useRef, useState } from "react";
import { useSnackbar } from "notistack";

import "../Page/Home/index.css";

const Footer = () => {
  const [isCheck, setIsChecked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("Choose Service");
  const [userName, setUserName] = useState("");
  const [userNumber, setUserNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const form = useRef();
  const { enqueueSnackbar } = useSnackbar();

  const handleSelectChange = (service) => {
    setSelectedService(service);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (email === "" || selectedService === "" || userName === "") {
  //     toast.error("Please enter your email and consent to be contacted.");
  //     return;
  //   }
  //   setIsSending(true);
  //   // setMessage("");
  //   emailjs
  //     .sendForm(
  //       "service_peh0fdp",
  //       "template_w00h86g",
  //       form.current,
  //       "xiJ7xdvkGwCqYYUJQ",
  //       {
  //         to: "info@web3chan.com", // Replace with your desired recipient email
  //         to_name: "Web3Chan", // Replace with the recipient's name
  //         from_email_name: userName,
  //         subject: "",
  //         message: `User: ${userName}, Services: ${selectedService}, Email: ${email}, Phone: ${userNumber}`,
  //         from: email, // Use the user's email as the 'from' address
  //         reply_to: email, // Use the user's email as the 'reply-to' address
  //       }
  //     )
  //     .then(
  //       () => {
  //         setUserName("");
  //         setSelectedService("");
  //         setUserNumber("");
  //         toast.success("Email has been sent successfully!");
  //         setEmail("");
  //         setIsSending(false);
  //       },
  //       (error) => {
  //         toast.error("Failed to send your message. Please try again later.");
  //         setIsSending(false);
  //         console.error("EmailJS error:", error);
  //       }
  //     );
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "" || selectedService === "" || userName === "") {
      enqueueSnackbar("Please enter your email and consent to be contacted.", {
        variant: "error",
      });
      return;
    }
    setIsSending(true);
    // Simulate email sending process here
    setTimeout(() => {
      setUserName("");
      setSelectedService("");
      setUserNumber("");
      setEmail("");
      setIsSending(false);
      enqueueSnackbar("Email has been sent successfully!", {
        variant: "success",
      });
    }, 2000);
  };

  return (
    <div
      id="contact"
      className="pt-[0px] pb-[50px] footer lg:py-[100px] bg-[#1D1635] px-5"
      style={{
        backgroundColor: "#1d1635",
        paddingBottom: "100px",
        paddingLeft: "20px",
        paddingRight: "20px",
      }}
    >
      <div
        className="w-[90%] lg:flex-row flex-col-reverse items-center lg:items-start flex gap-11 max-w-[1000px] mx-auto"
        style={{ width: "90%", maxWidth: "1000px", margin: "0 auto" }}
      >
        <form
          ref={form}
          onSubmit={handleSubmit}
          className="border-[5px] border-[#5D4B97] w-full lg:max-w-max lg:w-max "
          style={{
            border: "5px solid #5D4B97",
            maxWidth: "500px",
            padding: "20px",
          }}
        >
          <strong
            className="text-white max-w-[440px] w-full flex text-xl md:text-3xl"
            style={{ maxWidth: "440px", color: "white", width: "full" }}
          >
            Let’s get in contact, where can we help you with?
          </strong>
          <div
            className=" flex lg:flex-nowrap flex-wrap gap-5 "
            style={{ width: "full", marginTop: "28px" }}
          >
            <div
              className="w-full  justify-between lg:max-w-full flex flex-col gap-y-3"
              style={{ width: "100%" }}
            >
              <div
                className="relative w-full"
                style={{ position: "relative", width: "100%" }}
              >
                <div
                  className="bg-[#5D4B97] flex justify-between items-center min-h-14 pl-2 w-full rounded-[5px] cursor-pointer"
                  style={{
                    backgroundColor: "#5d4b97",
                    minHeight: "3.5rem",
                    paddingLeft: "8px",
                    borderRadius: "5px",
                  }}
                  onClick={toggleDropdown}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/web3chan-631d9.appspot.com/o/assets%2FsearchIcon.svg?alt=media&token=dbef4a0c-5aac-449b-aa3d-f14364ea732b"
                      alt=""
                    />
                    <div
                      className="relative"
                      style={{ position: "relative", width: "100%" }}
                    >
                      <div
                        className="text-[#BCAFE6] font_ProximaNovaSemibold text-base"
                        style={{ color: "#bcafe6", textAlign: "base" }}
                      >
                        {selectedService ? selectedService : "Choose Service"}
                      </div>
                    </div>
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/web3chan-631d9.appspot.com/o/assets%2Fchevron.left.svg?alt=media&token=1bc0a7fd-0749-40a4-a6e9-211346719107"
                      alt=""
                      className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>
                {isOpen && (
                  <div
                    className="absolute top-full left-0 w-full mt-1 bg-[#232A47] rounded-[5px] overflow-hidden shadow-shadow400"
                    style={{
                      position: "absolute",
                      marginTop: "4px",
                      backgroundColor: "#232a47",
                      borderRadius: "5px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      className="py-2 px-4 text-[#BCAFE6] cursor-pointer  footer-input"
                      style={{ color: "#bcafe6" }}
                      onClick={() => handleSelectChange("Coding")}
                    >
                      Coding
                    </div>
                    <div
                      className="py-2 px-4 text-[#BCAFE6] cursor-pointer footer-input"
                      style={{ color: "#bcafe6" }}
                      onClick={() => handleSelectChange("Crafting art")}
                    >
                      Crafting art
                    </div>
                    <div
                      className="py-2 px-4 text-[#BCAFE6] cursor-pointer footer-input"
                      style={{ color: "#bcafe6" }}
                      onClick={() => handleSelectChange("NFT's")}
                    >
                      NFT's
                    </div>
                    <div
                      className="py-2 px-4 text-[#BCAFE6] cursor-pointer footer-input"
                      style={{ color: "#bcafe6" }}
                      onClick={() => handleSelectChange("Meme's")}
                    >
                      Meme's
                    </div>
                  </div>
                )}
              </div>
              <input
                type="hidden"
                name="selectedService"
                value={selectedService}
                style={{ width: "100%" }}
              />
              <div className="w-full" style={{ width: "100%" }}>
                <div
                  className="bg-[#5D4B97] flex items-center min-h-14 px-2 w-full rounded-[5px]"
                  style={{
                    backgroundColor: "#5d4b97",
                    minHeight: "3.5rem",
                    width: "100%",
                    borderRadius: "5px",
                    padding: "0 8px",
                  }}
                >
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/web3chan-631d9.appspot.com/o/assets%2FuserIcon.svg?alt=media&token=18c6a2c9-6423-4868-980b-b4b1891e976a"
                    alt=""
                  />
                  <input
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    type="text"
                    name="userName"
                    placeholder="Name"
                    className="border-0 bg-transparent w-full placeholder:text-[#BCAFE6] outline-none px-2 text-[#BCAFE6] text-base"
                    style={{ background: "transparent", color: "#bcafe6" }}
                  />
                </div>
              </div>

              <div className="w-full" style={{ width: "100%" }}>
                <div
                  className="bg-[#5D4B97] flex items-center min-h-14 px-2 w-full rounded-[5px]"
                  style={{
                    backgroundColor: "#5d4b97",
                    minHeight: "3.5rem",
                    width: "100%",
                    borderRadius: "5px",
                    padding: "0 8px",
                  }}
                >
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/web3chan-631d9.appspot.com/o/assets%2FemailIcon.svg?alt=media&token=823c6710-7418-4d2d-90f0-3fd167743772"
                    alt=""
                  />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name="email"
                    placeholder="Your E-mail"
                    className="border-0 ml-1 bg-transparent w-full placeholder:text-[#BCAFE6] outline-none px-2 text-[#BCAFE6] text-base"
                    style={{
                      backgroundColor: "transparent",
                      width: "100%",
                      color: "#bcafe6",
                      padding: "0 8px",
                    }}
                  />
                </div>
              </div>

              <div className="w-full" style={{ width: "100%" }}>
                <div
                  className="bg-[#5D4B97] flex items-center min-h-14 px-3 w-full rounded-[5px]"
                  style={{
                    backgroundColor: "#5d4b97",
                    minHeight: "3.5rem",
                    width: "100%",
                    borderRadius: "5px",
                    padding: "0 8px",
                  }}
                >
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/web3chan-631d9.appspot.com/o/assets%2FphoneIcon.svg?alt=media&token=2afcc1f2-0da2-482b-a6d7-bb0ede869882"
                    alt=""
                  />
                  <input
                    value={userNumber}
                    onChange={(e) => setUserNumber(e.target.value)}
                    type="text"
                    name="userNumber"
                    placeholder="Phone number (optional)"
                    className="border-0 ml-1 bg-transparent font-normal w-full placeholder:text-[#BCAFE6] outline-none px-2 text-[#BCAFE6] text-base"
                    style={{
                      backgroundColor: "transparent",
                      width: "100%",
                      color: "#bcafe6",
                      padding: "0 8px",
                    }}
                  />
                </div>
              </div>
              {!isSending ? (
                <button
                  type="submit"
                  className="bg-[#8125FF] w-full text-white text-lg px-7 py-3"
                  style={{
                    backgroundColor: "#8125ff",
                    width: "100%",
                    color: "white",
                    padding: "12px 28px",
                  }}
                >
                  Send
                </button>
              ) : (
                <button
                  disabled
                  className="bg-[#8125FF] w-full text-white text-lg px-7 py-3"
                  style={{
                    backgroundColor: "#8125ff",
                    width: "100%",
                    color: "white",
                    padding: "12px 28px",
                  }}
                >
                  Loading...
                </button>
              )}
            </div>
          </div>

          <div
            className="flex items-center gap-4 mt-5"
            style={{ marginTop: "20px" }}
          >
            <button
              type="button"
              onClick={() => setIsChecked(!isCheck)}
              className="w-[40px] cursor-pointer h-[40px] rounded-full bg-[#8125FF] flex justify-center items-center"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "100%",
                backgroundColor: "#8125ff",
              }}
            >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/web3chan-631d9.appspot.com/o/assets%2Ftick.svg?alt=media&token=bf6880e9-cfd1-4e59-a2ca-ba45af37a35c"
                className={`w-4 object-contain transition-all ease-in ${
                  isCheck ? "opacity-100" : "opacity-0"
                }`}
                alt=""
              />
            </button>
            <span className="text-white text-base sm:text-lg">
              I consent that you can contact me
            </span>
          </div>
        </form>
        <div className="flex flex-col md:ml-5 mt-11">
          <h1 className="text-white font-bold text-3xl">Contact details</h1>
          <a
            className="text-white mt-2 text-lg"
            href="mailto:info@web3chan.com"
          >
            info@web3chan.com
          </a>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default Footer;
