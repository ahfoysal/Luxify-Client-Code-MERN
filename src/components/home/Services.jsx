/* eslint-disable react/prop-types */

import EventCard from "../Shared/EventCard";

const Services = ({ items }) => {
  return (
    <div
      id="services"
      className="bg-foreground-50/25  w-full flex flex-col items-center py-10  "
    >
      <h1 className=" text-center inline font-normal from-[#FF705B] to-[#FFB457] text-2xl lg:text-4xl bg-clip-text text-transparent bg-gradient-to-b font-lilita">
        Our Services
      </h1>
      <p className="line-clamp-3 text-sm w-[90%] md:w-[550px] mt-2 text-center  ">
        Ready to host your own event? Explore our top-notch event management
        services, specializing in concerts, festivals, and a variety of
        unforgettable experiences. we transform your vision into a seamless and
        extraordinary reality.
      </p>
      <div className="max-w-6xl w-[93%] mx-auto flex  flex-wrap mt-8 md:mt-16 gap-6  items-start place-items-center justify-center content-center justify-items-center row-auto ">
        {items.map((item, index) => (
          <EventCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Services;
