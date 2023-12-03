/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import RowCard from "../Shared/Card";
import { useQuery } from "@tanstack/react-query";
import { getData } from "../../helpers/Axios";
import { Spinner } from "@nextui-org/react";

const Featured = () => {
  const { data: items, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => getData("products"),
  });
  if (isLoading) return <Spinner />;

  return (
    <div className="container mx-auto w-full h-fit py-10 md:py-16 md:mt-0 md:h-full flex flex-col justify-center items-start gap-4 md:gap-6 ">
      <div className="text-center mb-8 w-full">
        <h1 className="text-center inline font-normal from-[#ffffff] to-[#ffffff] text-xl lg:text-4xl bg-clip-text text-transparent bg-gradient-to-b font-lilita">
          Featured Products
        </h1>
      </div>
      <div className="w-full h-fit flex justify-center items-center">
        <Swiper
          breakpoints={{
            256: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 40,
            },
          }}
          slidesPerView={5}
          spaceBetween={40}
          speed={500}
        >
          {items?.data?.slice(0, 6)?.map((item, index) => (
            <SwiperSlide key={Math.random() * index}>
              <RowCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Featured;
