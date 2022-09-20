// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "../../../styles/swiper.css";
import Tweet from "./tweet";
import { Autoplay, Pagination } from "swiper";

export default () => {
  return (
    <>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
        }}
        className="rounded-lg w-full cursor-grab"
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
      >
        <SwiperSlide>
          <div>
            <Tweet
              author="Emilia Zapata"
              avatar="https://pbs.twimg.com/profile_images/1426010455055638531/xUFu5JP7_400x400.jpg"
              comments={2}
              handle="synecdokey"
              likes={75}
              retweets={9}
              date="Jul 31"
              text="Finally had the chance to play with @trpcio and it's scary how easy it makes to make your data flow, with full type safety and backend validation. With create-t3-app and @supabase, I was able to create a simple to-do app with auth in less than 3 hours, scary."
              verified={false}
              tweetId="1553580714591158272"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <Tweet
              author="Anthony (ajcwebdev.x)"
              avatar="https://pbs.twimg.com/profile_images/1549247631867711488/hK_Qr-Dx_400x400.png"
              comments={9}
              handle="ajcwebdev"
              likes={18}
              retweets={4}
              date="Jul 7"
              text="Now that Blitz.js has pivoted and Bison has stagnated, create-t3-app will be the only framework to give Redwood a run for its money in the quest to build a legitimate fullstack React framework."
              verified={false}
              tweetId="1544909672137867264"
            />
          </div>
        </SwiperSlide>
        <div className="mb-10">
          <div className="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal"></div>
        </div>
      </Swiper>
    </>
  );
};
