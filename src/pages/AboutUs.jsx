import Banner from "../components/home/Banner";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <motion.div
      variants={containerVariants}
      exit="exit"
      initial="hidden"
      animate="visible"
      className=" bg-[url('https://nextui.org/gradients/docs-right.png')] bg-no-repeat bg-cover bg-left-top mt-16"
    >
      <Banner />
    </motion.div>
  );
};

export default AboutUs;

const containerVariants = {
  hidden: {
    // opacity: 0,
    x: "-100vh",
  },
  exit: {
    y: "100vh",
    transition: {
      ease: "easeInOut",
    },
  },
  visible: {
    // opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,

      type: "spring",
    },
  },
};
