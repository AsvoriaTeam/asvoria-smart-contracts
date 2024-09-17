import aiAvatar from "../../../assets/aiAvatar.mp4";
import aiposter from "../../../assets/aiposter.svg";
import "../Land/style.css";

const AIAvatar = () => {
  return (
    <div className="relative py-12">
      <video
        className="w-full h-full object-cover rounded-[4px]"
        src={aiAvatar}
        autoPlay
        loop
        playsInline
        controls
        poster={aiposter}
      />
      <div className="absolute inset-0 bg-black opacity-50 z-5 pointer-events-none"></div>

      <div className="content-wrapper">
        <div className="content">
          <div className="label">AI AVATARS</div>
          <h1 className="heading">Meet Your AI Avatar</h1>
          <p className="paragraph " style={{ textAlign: "center" }}>
            Experience Seamless Interactions with AI-Powered Avatars Tailored to
            Your Needs. Empower your digital presence with AI avatars that
            reflect your brand’s personality. Our AI avatars provide
            personalized, 24/7 customer support, helping to enhance user
            engagement and satisfaction
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIAvatar;
