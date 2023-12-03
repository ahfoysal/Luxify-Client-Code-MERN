import { Divider } from "@nextui-org/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" border-t w-full">
      <div
        className="max-w-6xl w-[85%] mx-auto grid lg:grid-cols-3 md:grid-cols-2
       sm:grid-cols-1 grid-cols-1 py-12 md:items-start md:place-items-center md:justify-center md:content-center gap-10 lg:gap-0  "
      >
        <div className="">
          <img className="max-h-[40px]" src="/BigLogo.webp" alt="" />

          <div className="my-6">
            <p className="text-sm text-muted-foreground mb-1">
              House 6969, Road-69
            </p>
            <p className="text-sm text-muted-foreground  ">
              Mirpur-69, Dhaka-1269
            </p>
          </div>
        </div>
        <div className="">
          <h1 className=" inline font-normal from-[#d4cbca] to-[#C3073F] text-lg lg:text-xl bg-clip-text text-transparent bg-gradient-to-b font-lilita">
            Others Links
          </h1>
          <ul className="mt-4 list-disc list-inside ">
            {[
              { name: "About", path: "about" },

              { name: "Terms", path: "terms" },
              { name: "Refund", path: "refund" },
            ].map((el, index) => {
              return (
                <Link key={index} to={`/${el?.path}`}>
                  <motion.li
                    variants={hoverVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    className=" cursor-pointer mt-2"
                  >
                    {el.name}
                  </motion.li>
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="">
          <h1 className=" inline font-normal from-[#d4cbca] to-[#C3073F] text-lg lg:text-xl bg-clip-text text-transparent bg-gradient-to-b font-lilita">
            FOLLOW US ON SOCIAL{" "}
          </h1>
        </div>
      </div>

      <Divider className="mb-4" />

      <div className="py-3">
        <p className="text-sm text-muted-foreground  text-center">
          2023© Luxify by
          <span className="text-secondary-foreground"> Pewds </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
const hoverVariants = {
  hidden: {
    opacity: 0,
    x: 0,
  },
  visible: {
    opacity: 1,

    transition: {
      type: "spring",
      stiffness: 300,
    },
  },
  hover: {
    scale: [1, 1.06, 1, 1.06, 1],
    originX: 0,
    color: "#C3073F",
  },
};
