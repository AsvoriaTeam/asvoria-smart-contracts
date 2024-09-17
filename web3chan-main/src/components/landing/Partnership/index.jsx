import Slider from "react-slick";
import card from "../../../assets/Partnership/card.svg";
import card_1 from "../../../assets/Partnership/card-2.svg";
import card_2 from "../../../assets/Partnership/card-3.svg";
import card_3 from "../../../assets/Partnership/card-4.svg";
import right_gradient from "../../../assets/right-gradient.png";

const Partnership = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const slidesData = [
    {
      image: card,
    },
    {
      image: card_1,
    },
    {
      image: card_2,
    },
    {
      image: card_1,
    },
  ];

  return (
    <div
      className="slider-container p-6"
      style={{ maxWidth: "1400px", margin: "auto" }}
    >
      <img
        src={right_gradient}
        alt=""
        className="absolute right-0 h-[1100px]"
        style={{ zIndex: "-1000" }}
      />
      <div className="flex flex-col items-center justify-center py-12">
        <h1 className="font-extrabold text-[52px]">Partnerships</h1>
        <p className="font-normal text-[20px]">Join a Thriving Community</p>
      </div>
      <Slider {...settings}>
        {slidesData.map((slide, index) => (
          <div key={index} className="slide-content px-[20px] relative">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-[351px] h-[700px]"
              style={{ width: "280px", height: "700px" }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Partnership;
