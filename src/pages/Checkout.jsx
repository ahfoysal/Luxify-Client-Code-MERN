import { useQuery } from "@tanstack/react-query";
import { CardsPaymentMethod } from "../components/checkout/PaymentCard";
import { motion } from "framer-motion";
import { getData } from "../helpers/Axios";
import { useContext } from "react";
import { AuthContext } from "../hooks/AuthContextProvider";

const Checkout = () => {
  const { user } = useContext(AuthContext);

  const { data: cart } = useQuery({
    queryKey: ["cart", user.uid],

    queryFn: () => getData("/cart/" + user.uid),
  });
  const totalPrice = cart?.data?.products
    .reduce((total, product) => {
      return total + product?.product?.price * product?.quantity;
    }, 0)
    .toFixed(2);

  // Calculate total quantity
  const totalQuantity = cart?.data?.products?.reduce((total, product) => {
    return total + product?.quantity;
  }, 0);
  return (
    <motion.div
      variants={containerVariants}
      exit="exit"
      initial="hidden"
      animate="visible"
      className="my-16 max-w-5xl w-[93%] mx-auto"
    >
      <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="">
          <CardsPaymentMethod />
        </div>
        <div>
          <div className="w-full my-5 h-10 bg-primary/5 text-center flex justify-center items-center">
            <div className="">ORDER SUMMARY</div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="text-3xl flex justify-between w-full">
              <span>Sub-Total</span>
              <span>{totalPrice}</span>
            </div>
            <div className="text-xl  flex justify-between w-full">
              <span className=" text-[#C3073F]"> Number of items</span>
              <span>{totalQuantity}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;
const containerVariants = {
  hidden: {
    opacity: 0,
    x: "100vh",
  },
  exit: {
    x: "-100vh",
    transition: {
      ease: "easeInOut",
    },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,

      type: "spring",
    },
  },
};
