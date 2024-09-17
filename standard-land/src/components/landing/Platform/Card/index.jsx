import "../../Land/style.css";
const Card = ({ Video, logo, heading, text, poster }) => {
  return (
    <div
      className=""
      style={{
        border: "3px solid #101010",
        borderRadius: "20px",
        padding: "24px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "32px",
      }}
    >
      <video
        src={Video}
        autoPlay
        loop
        playsInline
        controls
        poster={poster}
        alt=""
        className="cardImage"
      />
      <div className="space-y-3">
        <img src={logo} alt="" className="w-[32px] h-[35px]" />
        <h1 style={{ fontWeight: "700", fontSize: "32px" }}>{heading}</h1>
        <p style={{ fontWeight: "400", fontSize: "14px", color: "#a2a2a2" }}>
          {text}
        </p>
      </div>
    </div>
  );
};

export default Card;
