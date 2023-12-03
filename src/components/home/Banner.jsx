/* eslint-disable react/prop-types */

import { Button } from "@nextui-org/button";

import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
// import { TypeAnimation } from "react-type-animation";
// import { Link, useNavigate } from "react-router-dom";

export default function Banner() {
  // const navigate = useNavigate();

  return (
    <div className="h-[500px] md:h-[700px]  banner   bg-[url('https://i.imgur.com/RFn1dtN.jpg')] bg-no-repeat bg-cover  bg-center bg-fixed  ">
      <div className="  max-w-2xl mx-auto text-center h-full flex justify-center items-center ">
        <div className=" flex flex-col mx-auto overflow-hidden">
          <h1 className=" mb-2 text-xl md:text-5xl  line-clamp-2 inline font-normal from-[#d4cbca] to-[#C3073F]  bg-clip-text text-transparent bg-gradient-to-b font-lilita">
            Experience Authentic Luxury – Your Ultimate Marketplace for Opulent
            Finds.
          </h1>

          <a href="#services">
            <Button
              color="primary"
              to={"/products"}
              radius="full"
              as={Link}
              // onClick={() => navigate("/events/")}

              endContent={
                <ArrowRight
                  size={16}
                  className={
                    "group-data-[hover=true]:translate-x-0.5 outline-none transition-transform "
                  }
                />
              }
              className="group py-3 px-4 mt-6 bg-[#C3073F] text-white    font-semibold"
            >
              Discover Our Collection
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
