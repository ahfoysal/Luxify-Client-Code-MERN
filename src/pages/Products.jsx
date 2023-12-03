import ProductsContainer from "../components/Products/ProductsContainer";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getData } from "../helpers/Axios";

import { useLoaderData, useLocation } from "react-router-dom";
import AdvertisementSlider from "../components/Products/AdvertisementSlider";

const Products = () => {
  const { search } = useLocation();
  const brands = useLoaderData();

  const params = new URLSearchParams(search);
  const brand = params.get("brand");

  console.log(brand);

  const {
    data: items,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products", brand],
    queryFn: () => getData("products", { brand }),
  });

  return (
    <motion.div
      exit="exit"
      initial="hidden"
      animate="visible"
      className="py-20 container mx-auto"
    >
      <AdvertisementSlider />
      <ProductsContainer
        brands={brands}
        refetch={refetch}
        items={items?.data}
        isLoading={isLoading}
        brandName={brand}
      />
    </motion.div>
  );
};

export default Products;
// const containerVariants = {
//   hidden: {
//     x: "100vh",
//   },
//   exit: {
//     x: "-100vh",
//     transition: {
//       ease: "easeInOut",
//     },
//   },
//   visible: {
//     x: 0,
//     transition: {
//       duration: 0.5,

//       type: "spring",
//     },
//   },
// };
