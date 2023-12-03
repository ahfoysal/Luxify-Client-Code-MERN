/* eslint-disable react/prop-types */
import { Button } from "@nextui-org/react";
import { LucidePhoneCall } from "lucide-react";

const ServiceDetail = ({ item }) => {
  return (
    <div>
      <div className="md:pt-16 pt-8   ">
        <h1 className="text-primary text-center text-2xl md:text-4xl relative font-medium after:content-[''] after:absolute after:ml-auto after:rounded-md after:left-[calc(50%-40px)] after:-bottom-3 after:w-20 after:bg-[#00999a]  after:h-[3px]">
          {item.name}
        </h1>
        <img
          src={item.image}
          className="mt-12 w-full h-full rounded-md max-h-[500px]"
          alt=""
        />
        <h2 className="my-4 text-sm md:text-base text-muted-foreground ">
          {item.description}
        </h2>
      </div>
      {item?.features && (
        <div className="mt-8   ">
          <h2 className="text-xl">Event Features:</h2>
          <ul className="flex flex-wrap gap-x-6">
            {item?.features.map((event) => (
              <li
                className="relative text-sm md:text-base text-muted-foreground
                 after:content-[''] after:absolute after:ml-auto after:rounded-md after:-right-3 after:top-2
                 after:w-[1px] after:bg-[#00999a]  after:h-[14px]"
                key={event}
              >
                {event}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-8   ">
        <h1 className="text-xl">Why choose us?</h1>
        <h2 className="my-2 text-sm md:text-base text-muted-foreground ">
          {item?.why_choose_us}
        </h2>
      </div>
      <div className="my-16  flex justify-center items-center ">
        <Button
          // color="primary"
          radius="full"
          className="font-semibold bg-[#FF705B] text-secondary"
          endContent={
            <LucidePhoneCall
              size={16}
              className={
                "group-data-[hover=true]:translate-x-0.5 outline-none transition-transform "
              }
            />
          }
        >
          Contact Us
        </Button>
      </div>
    </div>
  );
};

export default ServiceDetail;
