/* eslint-disable react/prop-types */

import { Button, Divider } from "@nextui-org/react";
import ImageSlider from "./ImageSlider";
import { addToCart } from "../../helpers/Axios";
import { useContext } from "react";
import { AuthContext } from "../../hooks/AuthContextProvider";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const DetailsProduct = ({ item }) => {
  const { user } = useContext(AuthContext);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (obj) => addToCart(obj),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast({
        title: "Product added to cart successfully!",

        duration: 3000,
      });
    },
  });

  const handleAddToCartClick = async () => {
    const data = {
      uid: user.uid,
      products: [
        {
          product: item._id,
          quantity: 1,
        },
      ],
    };
    try {
      await mutate(data);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast({
        title: "Error adding product to cart!",
        variant: "destructive",

        duration: 3000,
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 py-16">
      <div className="w-full md:w-[60%]">
        <ImageSlider images={item.images} />
      </div>
      <div className="w-full md:w-[40%] flex flex-col gap-6">
        <h1 className="md:text-xl text-base font-bold text-[#C3073F]">
          {item.brand} -{" "}
          <span className="text-primary/80 text-base font-normal">
            {item.subCategory}
          </span>{" "}
        </h1>
        <Divider />
        <h1 className=" text-2xl md:text-4xl   ">{item.name}</h1>
        <h1 className="text-xl md:text-2xl">
          <span className="text-muted-foreground/50  line-through ">
            ${(item.price + item.price * 0.2).toFixed(2)}
          </span>
          <span className="ml-2">${item.price}</span>
        </h1>
        <div className="flex gap-4">
          <Button
            radius="sm"
            onClick={() => handleAddToCartClick()}
            className="group py-3 px-4  bg-[#C3073F] text-white    "
          >
            Add To Cart{" "}
          </Button>
          <Button
            color="primary"
            radius="sm"
            variant="bordered"
            // onClick={() => navigate("/events/")}

            className="group py-3 px-4       "
          >
            Buy Now
          </Button>
        </div>
        <Divider />
        <h1 className="text-xl ">PRODUCT DESCRIPTION</h1>
        <Divider />
        <h1 className="text-sm ">{item.shortDescription}</h1>
      </div>
    </div>
  );
};

export default DetailsProduct;
