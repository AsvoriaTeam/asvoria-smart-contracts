const NewsCard = ({ image, text, heading, description, style }) => {
  return (
    <div
      className=" space-y-3"
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "12px",
        padding: "16px 8px",
        backgroundColor: "#101010",
      }}
    >
      <div>
        <img src={image} alt="" style={{ width: "100%", height: "100%" }} />
      </div>
      <div
        className={` flex items-center justify-center  ${style}`}
        style={{
          padding: "4px 2px",
          height: "20px",
          borderRadius: "4px",
          backgroundColor: "white",
          fontWeight: "700",
          fontSize: "12px",
          color: "#121212",
        }}
      >
        {text}
      </div>
      <h1 style={{ fontWeight: "700", fontSize: "18px" }}>{heading}</h1>
      <p style={{ fontWeight: "700", fontSize: "14px", color: "#a2a2a2" }}>
        {description}
      </p>
    </div>
  );
};

export default NewsCard;
