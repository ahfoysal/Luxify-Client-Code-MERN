/* eslint-disable react/prop-types */

import EventCard from "../Shared/EventCard";

export default function ServicesContainer({ items }) {
  return (
    <div className="max-w-6xl w-[93%] mx-auto flex flex-wrap mt-8 md:mt-16 gap-6  justify-center ">
      {items.map((item, index) => (
        <EventCard key={index} item={item} />
      ))}
    </div>
  );
}
