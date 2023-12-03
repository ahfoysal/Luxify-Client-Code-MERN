/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import Autoplay from "./../../../node_modules/swiper/modules/autoplay.mjs";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

SwiperCore.use([Autoplay]);

const Slider = ({ items }) => {
  return (
    <div className="bg-[#ecd8b8]   w-full h-fit py-10 md:py-16 md:mt-0 md:h-full flex flex-col justify-center items-start gap-4 md:gap-6 ">
      <div className="text-center mb-8 w-full">
        <h1 className="text-center inline font-lilita font-normal from-[#1D1D1F] to-[#000000] text-xl lg:text-4xl bg-clip-text text-transparent bg-gradient-to-b ">
          Featured Brands
        </h1>
      </div>
      <div className="w-full  h-fit flex justify-center items-center">
        <Swiper
          breakpoints={{
            256: {
              slidesPerView: 2.1,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 2.1,
              spaceBetween: 0,
            },
            1024: {
              slidesPerView: 4.1,
              spaceBetween: 0,
            },
          }}
          centeredSlides={true}
          initialSlide={3}
          effect={"slide"}
          speed={500}
          loop={true}
          autoplay={{
            delay: 1000,
            loop: true,
          }}
        >
          {items.map((item, index) => (
            <SwiperSlide key={Math.random() * index}>
              <Link to={`/products?brand=${item.name}`}>
                <Card
                  className={`bg-none  rounded-none border-none bg-transparent overflow-hidden col-span-2 w-full text-primary  h-full p-0 `}
                >
                  <img
                    src={item?.image}
                    alt=""
                    className={`md:w-full  fill-white object-contain   bg-transparent  overflow-hidden w-full h-full max-h-[100px] `}
                  />
                </Card>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;
