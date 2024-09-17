import footer_logo from "../../../assets/footer-logo.svg";
const Footer = () => {
  return (
    <div className="flex max-w-350 mx-auto justify-between sm:flex-col xsm:flex-col items-center px-8 py-12">
      <a href="https://asvoria.io/" target="_blank">
        <img src={footer_logo} alt="" />
      </a>
      <div className="flex gap-16 xsm:flex-col">
        <div className="flex gap-16 sm:gap-10">
          <div className="space-y-4">
            <h1 className="font-bold text-[16px]">Quick Menu</h1>
            <div className="font-normal text-[14px] text-primary flex flex-col gap-2">
              <a href="https://asvoria.io/" target="_blank">Home</a>
              <a href="https://standard-land.asvoria.io/" target="_blank">
                Standard
              </a>
              <a href="https://premium-land.asvoria.io/" target="_blank">
                Premium
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="font-bold text-[16px]">Resources</h1>
            <div className="font-normal text-[14px] text-primary flex flex-col gap-2">
              <a href="./Whitepaper.pdf" target="_blank">
                Whitepaper
              </a>
              <a href="./Tokenomics.pdf" target="_blank">
                Tokenomics
              </a>
              {/* <a href="./Launcher.pdf" target="_blank">
                Partners
              </a> */}
              <a href="./Media.pdf" target="_blank">
                Media partners
              </a>
              {/* <a href="./Battleplan.pdf" target="_blank">
                Battleplan
              </a> */}
              <a href="https://asvoria.io/terms-and-conditions" target="_blank">
                Terms & Conditions
              </a>
              <a href="https://asvoria.io/privacy-policy" target="_blank">
                Privacy Policy
              </a>
              <a href="https://asvoria.io/disclaimers" target="_blank">
                Disclaimers
              </a>
              <a href="https://asvoria.io/cookie-policy" target="_blank">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
        <div className="flex gap-16 sm:gap-10">
          <div className="space-y-4">
            <h1 className="font-bold text-[16px]">Socials</h1>
            <div className="font-normal text-[14px] text-primary flex flex-col gap-2">
              <a href="https://facebook.com/asvoriaweb3" target="_blank">Facebook</a>
              <a href="https://www.youtube.com/channel/UC6fA-HARPcDtzR7mf4Bq6IQ" target="_blank">youtube</a>
              <a href="https://t.me/+2K_vrCkea2lmNDlk" target="_blank">Telegram</a>
              <a href="https://discord.gg/dBfMnRaffQ" target="_blank">Discord</a>
              <a href="https://www.tiktok.com/@asvoria_web3" target="_blank">Tiktok</a>
              <a href="https://www.linkedin.com/company/asvoria" target="_blank">Linkedin</a>
              <a href="https://www.instagram.com/asvoria_web3/" target="_blank">Instagram</a>
              <a href="https://twitter.com/Asvoria_web3" target="_blank">X</a>
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="font-bold text-[16px]">Find Us</h1>
            <div className="font-normal text-[14px] text-primary flex flex-col gap-2">
              <a href="">Oceania Business Plaza</a>
              <a href="">21st floor, Punta Pacifica</a>
              <a href="">0801 Panama City</a>
              <a href="">Panama</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
