import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { getData } from "../helpers/Axios";
import { Spinner } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import DetailsProduct from "../components/Products/ProductDetails";

const ProductDetail = () => {
  const { id } = useParams();
  const { data: item, isLoading } = useQuery({
    queryKey: ["products", id],
    queryFn: () => getData("products/" + id),
  });
  if (isLoading) return <Spinner />;

  return (
    <motion.div
      variants={containerVariants}
      exit="exit"
      initial="hidden"
      animate="visible"
      className="my-8 md:my-16 max-w-6xl w-[93%] mx-auto"
    >
      <DetailsProduct item={item.data} />
    </motion.div>
  );
};

export default ProductDetail;
const containerVariants = {
  hidden: {
    opacity: 0,
    x: "-100vh",
  },
  exit: {
    x: "100vh",
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
