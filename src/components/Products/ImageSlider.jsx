/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import Autoplay from "./../../../node_modules/swiper/modules/autoplay.mjs";
import Navigation from "./../../../node_modules/swiper/modules/navigation.mjs";
import Thumbs from "./../../../node_modules/swiper/modules/thumbs.mjs";
import Pagination from "./../../../node_modules/swiper/modules/pagination.mjs";
import Controller from "./../../../node_modules/swiper/modules/controller.mjs";

import SwiperCore from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/thumbs";
import { Card } from "@/components/ui/card";
let mainSwiper;
let thumbsSwiper;

SwiperCore.use([Autoplay, Navigation, Pagination, Thumbs, Controller]);

const ImageSlider = ({ images }) => {
  return (
    <div className="w-[95%] h-fit">
      {/* Main Slider */}
      <Swiper
        slidesPerView={1}
        onSwiper={(swiper) => (mainSwiper = swiper)}
        controller={{ control: thumbsSwiper }}
        allowSlidePrev={false}
        allowSlideNext={false}
      >
        {images.map((item, index) => (
          <SwiperSlide key={index}>
            <Card
              className={`bg-none rounded-none border-none bg-transparent overflow-hidden col-span-2 w-full h-full p-0`}
            >
              <img
                src={item}
                alt=""
                className={`md:w-full object-contain bg-transparent overflow-hidden w-full h-full`}
              />
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbs Slider */}
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        className="gallery mt-3"
        loop={true}
        centeredSlides={true}
        onSwiper={(swiper) => (thumbsSwiper = swiper)}
        controller={{ control: mainSwiper }}
      >
        {images.map((item, index) => (
          <SwiperSlide key={index}>
            <Card
              className={`bg-none rounded-none border-none bg-transparent overflow-hidden col-span-2 w-full h-full p-0`}
            >
              <img
                src={item}
                alt=""
                className={`md:w-full object-contain bg-transparent overflow-hidden w-full h-full`}
              />
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
