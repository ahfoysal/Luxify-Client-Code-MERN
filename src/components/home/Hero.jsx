/* eslint-disable react/prop-types */

import { Button } from "@nextui-org/button";

import { useState } from "react";
import Slider from "./Slider";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export default function Hero({ items }) {
  const unfinishedEvents = items.filter((item) => !item.is_finished);

  const [activeData, setActiveData] = useState(unfinishedEvents[0]);

  return (
    <div className="   bg-[url('https://nextui.org/gradients/docs-right.png')] bg-no-repeat  bg-left-top ">
      <div className="bg-[url('https://nextui.org/gradients/looper-pattern.svg')] bg-no-repeat bg-cover  bg-center  ">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={mainContainersVariants}
          className="flex h-fit  md:py-40 pb-8 py-8 justify-center items-center gap-6    flex-col-reverse md:flex-row container mx-auto     "
        >
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeData?.name}
              variants={containersVariants}
              className="md:w-[40%] w-full text-center sm:text-left  flex items-center"
            >
              <div className="w-full md:w-[450px] mx-auto ">
                <motion.h1
                  key={activeData?.name}
                  variants={titleVariants}
                  className="text-lg  md:text-4xl mb-2 line-clamp-1"
                >
                  {activeData?.name}
                </motion.h1>
                <motion.h1
                  key={activeData?.name}
                  variants={descVariants}
                  className="sm:text-sm  text-xs font-normal w-full sm:w-[400px] text-muted-foreground line-clamp-4"
                >
                  {activeData?.description}
                </motion.h1>
                <motion.div key={activeData?.name} variants={buttonVariants}>
                  <Button
                    color="primary"
                    radius="full"
                    as={Link}
                    to={`/event/${activeData?.id}`}
                    endContent={
                      <ArrowRight
                        size={16}
                        className={
                          "group-data-[hover=true]:translate-x-0.5 outline-none transition-transform "
                        }
                      />
                    }
                    className="group mt-6  text-xs   md:text-sm  font-bold"
                  >
                    Buy Ticket
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
          <motion.div
            variants={containersVariants}
            className="w-full md:w-[60%] "
          >
            <Slider
              setActiveData={setActiveData}
              activeData={activeData}
              items={items}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
const mainContainersVariants = {
  hidden: {
    opacity: 0,
    x: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.2,
    },
  },
};
const containersVariants = {
  hidden: {
    opacity: 0,
    x: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      delay: 0.1,
    },
  },
};
const buttonVariants = {
  hidden: {
    x: 60,
  },
  visible: {
    x: 0,

    transition: {
      duration: 0.7,
    },
  },
};
const descVariants = {
  hidden: {
    x: 30,
  },
  visible: {
    x: 0,

    transition: {
      duration: 0.7,
    },
  },
};
const titleVariants = {
  hidden: {
    x: 5,
  },
  visible: {
    x: 0,
    transition: {
      duration: 0.7,
    },
  },
};
