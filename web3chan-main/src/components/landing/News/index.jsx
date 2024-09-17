import NewsCard from "./N-Card";
import news_1 from "../../../assets/News/news-1.svg";
import news_2 from "../../../assets/News/news-2.svg";
import news_3 from "../../../assets/News/news-3.svg";
import news_4 from "../../../assets/News/news-4.svg";
import Button from "../../Shared/Button/index";

const News = () => {
  return (
    <div
      className=" py-12  "
      style={{
        paddingLeft: "20px",
        paddingRight: "20px",
        maxWidth: "1400px",
        margin: "auto",
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <h1
          className=" xsm:text-[46px]"
          style={{ fontWeight: "800", fontSize: "48px" }}
        >
          News and Blogs
        </h1>
        <p style={{ fontWeight: "400", fontSize: "24px" }}>
          Buy land inside our virtual world
        </p>
      </div>
      <div className="grid grid-cols-4 gap-4 py-12 sm:grid-cols-2 xsm:grid-cols-1">
        <NewsCard
          image={news_1}
          text={"Partner"}
          heading={"Welcome Bad Days to the Asvoria family"}
          description={"Iconic NFTS & Exclusive Virtual experiences!"}
          style="w-[49px]"
        />
        <NewsCard
          image={news_2}
          text={"Reward News"}
          heading={"NFT AIRDROP"}
          description={"Thank you for joining the quest for momentum "}
          style="w-[83px]"
        />
        <NewsCard
          image={news_3}
          text={"Quest For the Momentum"}
          heading={"Earn Tokens"}
          description={"Rare opportunity to earn more ASV"}
          style="w-[154px]"
        />
        <NewsCard
          image={news_4}
          text={"Updates"}
          heading={"Launchpad and Marketplace"}
          description={"We will add 4 chains to the platform"}
          style="w-[54px]"
        />
      </div>
      <div className="flex items-center justify-center">
        <button
          className="font-bold text-[16px] md:text-[18px] text-white flex items-center justify-center  bg-gradient-to-br from-customGreen via-customBlue to-customPurple "
          style={{ width: "243px", height: "48px", borderRadius: "58px" }}
        >
          View All
        </button>
      </div>
    </div>
  );
};

export default News;
