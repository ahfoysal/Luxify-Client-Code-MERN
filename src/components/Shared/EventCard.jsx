/* eslint-disable react/prop-types */
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@nextui-org/react";
import { GanttChartSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CardDescription } from "../ui/card";

const EventCard = ({ item }) => {
  return (
    <Link
      to={`/service/${item.id}`}
      className="w-full md:w-[calc(50%-40px)] self-center place-self-center place-content-center"
    >
      <Card className="text-center  py-3   ">
        <CardHeader>
          <CardTitle>
            <span className="text-lg md:text-xl  line-clamp-1 relative before:content-[''] before:absolute before:ml-auto before:rounded-md before:left-[calc(50%-40px)] before:-top-4 before:w-28 before:bg-foreground-900  before:h-[1.5px]">
              {item.name}
            </span>
          </CardTitle>
          <CardDescription>
            <p className="line-clamp-2  text-sm "> {item.description}</p>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="relative   rounded-md overflow-hidden group">
            <motion.img
              src={item.image}
              whileHover={{
                scale: 1.1,
              }}
              transition={{
                delay: 0.1,
              }}
              className="w-full h-[200px] md:h-[230px]  rounded-md overflow-hidden  group-hover:transform  group-hover:transition-all group-hover:duration-300 group-hover:ease-linear  "
              alt=""
            />
            <div className="absolute top-3 left-3  text-sm bg-background/80 px-2 py-1 rounded-full">
              <p> ৳ {item.price}</p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button
            color="primary"
            radius="full"
            className="font-bold pointer-events-none text-xs   md:text-sm "
            // as={Link}
            // to={}
            // onClick={() => navigate(`/event/${item.id}`)}
            endContent={
              <GanttChartSquare
                size={16}
                className={
                  "group-data-[hover=true]:translate-x-0.5 outline-none  transition-transform "
                }
              />
            }
          >
            {" "}
            View Details
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default EventCard;
