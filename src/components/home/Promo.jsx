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
import { Button } from "@nextui-org/react";

SwiperCore.use([Navigation, EffectFade, Autoplay]);

const Promo = () => {
  return (
    <Swiper
      navigation
      effect="fade"
      autoplay={{ delay: 2000, disableOnInteraction: false }}
      fadeEffect={{ crossFade: true }}
      className="h-full w-full rounded-none container mx-auto"
    >
      <SwiperSlide k className="rounded-none w-full">
        <div className=" relative">
          <img
            className="w-full md:h-[300px]  rounded-none"
            src={
              "https://n.nordstrommedia.com/it/210fe1ca-e113-4deb-965d-e5c4050604f8.jpeg?h=400&w=1608"
            }
            alt={`Slide `}
          />
          <div className="my-5 md:absolute container mx-auto flex flex-col gap-3  md:text-black left-[15%] top-[25%] ">
            <h1 className="text-xl font-poppins  font-semibold ">
              Give the Gift of Choice
            </h1>
            <h1 className="max-w-md text-xs font-poppins   ">
              Don`t know what to get? Let them pick with a Nordstrom Gift Card.
            </h1>
            <Button
              radius="full"
              size="sm"
              variant="bordered"
              color="secondary"
              className="  w-fit  text-white md:text-black  "
            >
              Explore Gift Cards
            </Button>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="rounded-none w-full">
        <div className=" relative">
          <img
            className="w-full md:h-[300px]  rounded-none"
            src={
              "https://n.nordstrommedia.com/it/e1f03242-c4f8-4109-bdfa-47d98d0a9df0.jpeg?h=400&w=1608"
            }
            alt={`Slide `}
          />
          <div className="my-5 md:absolute flex flex-col gap-3 container mx-auto text-white left-[60%] top-[25%] ">
            <h1>Don`t Know What to Wear? We Do!</h1>
            <h1 className="max-w-md text-xs font-poppins   ">
              Get festive fashion advice from our experts in store and
              online—it`s free, fun and convenient.
            </h1>
            <Button
              radius="full"
              size="sm"
              variant="bordered"
              color="primary"
              className="  w-fit    text-white "
            >
              Explore More
            </Button>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Promo;
