/* eslint-disable react/prop-types */
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button, Input } from "@nextui-org/react";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { Trash2 } from "lucide-react";

const CartCard = ({ item, quantity, handleCart }) => {
  return (
    <Card className="flex  rounded-none border-none w-full  p-0 overflow-hidden  bg-transparent ">
      <Link to={`/product/${item?._id}`} className="   rounded-none  ">
        <CardContent className={"p-0"}>
          <div className="relative  max-w-[150px] h-full w-full bg-white  p-0   overflow-hidden group">
            <motion.img
              src={item?.images[0]}
              className="w-full h-full  overflow-hidden      "
              alt=""
            />
          </div>
        </CardContent>
      </Link>

      <CardFooter className="flex flex-col gap-1  py-3 items-start w-full">
        <h1 className="text-xl">{item?.name}</h1>
        <h1 className="text-sm font-bold text-[#C3073F]">{item?.brand}</h1>

        <div className="flex flex-col justify-end w-full flex-1 gap-3">
          <h1>${item?.price}</h1>
        </div>
        <div className="flex flex-col md:flex-row gap-3 md:justify-between w-full flex-1 md:items-center mt-3">
          <div className="flex gap-3 ">
            <Button
              radius="sm"
              size="sm"
              variant="bordered"
              onClick={() => handleCart("plus", item?._id)}
              className="    text-white    "
            >
              <PlusIcon />
            </Button>
            <Input
              type="text"
              value={quantity}
              variant="bordered"
              disabled
              size="sm"
              className="w-fit max-w-[64px] px-0 input"
            />

            <Button
              radius="sm"
              size="sm"
              variant="bordered"
              onClick={() => handleCart("minus", item?._id)}
              className="     text-white    "
              disabled={quantity <= 1 ? true : false}
            >
              <MinusIcon />
            </Button>
          </div>
          <Button
            radius="sm"
            size="sm"
            variant="solid"
            color="primary"
            onClick={() => handleCart("delete", item?._id)}
            endContent={
              <Trash2
                size={16}
                className={
                  "group-data-[hover=true]:translate-x-0.5 outline-none transition-transform text-secondary"
                }
              />
            }
            className="    text-sm font-semibold "
          >
            Remove
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CartCard;
