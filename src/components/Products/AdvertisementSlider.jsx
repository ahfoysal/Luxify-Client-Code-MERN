/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import Autoplay from "./../../../node_modules/swiper/modules/autoplay.mjs";
import Navigation from "./../../../node_modules/swiper/modules/navigation.mjs";
import EffectFade from "./../../../node_modules/swiper/modules/effect-fade.mjs";
import SwiperCore from "swiper";
import "swiper/css";

import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { Image } from "@nextui-org/react";

SwiperCore.use([Navigation, EffectFade, Autoplay]);

const AdvertisementSlider = () => {
  const images = [
    "https://i.imgur.com/VcYKt1b.jpg",
    "https://i.imgur.com/aWp5P7W.jpg",
    "https://i.imgur.com/n8toWo2.jpg",
  ];
  return (
    <Swiper
      navigation
      effect="fade"
      autoplay={{ delay: 2000, disableOnInteraction: false }}
      fadeEffect={{ crossFade: true }}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <Image
            className="w-full h-full object-cover"
            src={image}
            alt={`Slide ${index + 1}`}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default AdvertisementSlider;
