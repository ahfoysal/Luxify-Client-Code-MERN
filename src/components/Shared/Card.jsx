/* eslint-disable react/prop-types */
import { Card, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button, Image } from "@nextui-org/react";
import { StarFilledIcon } from "@radix-ui/react-icons";

const RowCard = ({ item, showButton }) => {
  return (
    <Link
      to={`/product/${item.id}`}
      className="w-full   rounded-none  self-center place-self-center place-content-center"
    >
      <Card className=" rounded-none border-none  p-0 overflow-hidden  bg-transparent ">
        <div className="relative  flex-1 w-full md:h-[260px]  home-card p-0    rounded-lg overflow-hidden group">
          <Image
            src={item?.images[0]}
            width={260}
            height={400}
            className="w-full h-[200px] md:h-[260px]  overflow-hidden  bg-white group-hover:transform  group-hover:transition-all group-hover:duration-300 group-hover:ease-linear  "
            alt=""
          />

          <div className="absolute z-10 top-2 left-2 rounded-full  text-xs text-white bg-[#C3073F] font-lilyOne px-2 py-1">
            <div className="flex gap-1">
              <StarFilledIcon />
              <span> {item.ratings}</span>
            </div>
          </div>
        </div>

        <CardFooter className="flex flex-col gap-3  items-start p-0  py-3">
          <h1 className="text-sm font-bold text-[#C3073F]">{item.brand}</h1>
          <div className="flex flex-col gap-2 md:flex-row  md:justify-between w-full md:items-center">
            <h1 className="md:text-lg line-clamp-1">{item.name}</h1>
            <h1 className="text-sm md:text-base text-foreground-500 ">
              ${item.price}
            </h1>
          </div>
          {showButton && (
            <div className="flex gap-2 flex-col md:flex-row w-full">
              <Button
                radius="sm"
                size="sm"
                color="primary"
                as={Link}
                to={"/product/" + item.id}
                // onClick={() => navigate("/events/")}

                className="group  w-full   font-medium    "
              >
                Details
              </Button>
              <Button
                color="primary"
                as={Link}
                size="sm"
                to={"/update/" + item.id}
                radius="sm"
                variant="bordered"
                className="group  w-full      "
              >
                Update
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default RowCard;
