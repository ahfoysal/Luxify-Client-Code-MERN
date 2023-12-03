import {
  Navbar,
  NavbarContent,
  Button,
  Input,
  useDisclosure,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Badge,
} from "@nextui-org/react";

import { Link, NavLink } from "react-router-dom";
import { SearchIcon } from "../assets/SearchIcon";
import SearchModal from "../components/navbar/SearchModal";
import { ModeToggle } from "../components/ModeToggle";
import { useContext, useState } from "react";
import { AuthContext } from "../hooks/AuthContextProvider";
import AuthDropDown from "../components/navbar/AuthDropDown";
import { motion } from "framer-motion";
import { CartIcon } from "../assets/icons/Cart";
import { getData } from "../helpers/Axios";
import { useQuery } from "@tanstack/react-query";

export default function Header() {
  const { onOpen, isOpen, onOpenChange } = useDisclosure();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, logout } = useContext(AuthContext);
  const { data: cart } = useQuery({
    queryKey: ["cart", user?.uid],

    queryFn: () => getData("/cart/" + user?.uid),
  });

  return (
    <Navbar
      isBordered={false}
      shouldHideOnScroll
      maxWidth="xl"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-black/75 text-white dark:bg-background/50 backdrop-blur-sm fixed top-0 "
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-[#C3073F]",
          "data-[active=true]:text-[#C3073F]",
          "data-[active=false]:hover:text-[#C3073F]",
        ],
      }}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <motion.div
          initial="hidden"
          className="flex gap-6"
          animate="visible"
          variants={menuVariant}
        >
          <motion.div variants={childVariant}>
            <NavLink to="/">
              {({ isActive }) => (
                <NavbarItem
                  className="hover:text-[#C3073F]"
                  isActive={isActive}
                >
                  {" "}
                  Home{" "}
                </NavbarItem>
              )}
            </NavLink>
          </motion.div>

          <motion.div variants={childVariant}>
            <NavLink to="/products" aria-current="page">
              {({ isActive }) => (
                <NavbarItem
                  className="hover:text-[#C3073F]"
                  isActive={isActive}
                >
                  Products
                </NavbarItem>
              )}
            </NavLink>
          </motion.div>
          {user && (
            <motion.div variants={childVariant}>
              <NavLink to="/add">
                {({ isActive }) => (
                  <NavbarItem
                    className="hover:text-[#C3073F]"
                    isActive={isActive}
                  >
                    Add Product
                  </NavbarItem>
                )}
              </NavLink>
            </motion.div>
          )}
        </motion.div>
      </NavbarContent>

      <NavbarContent
        className=" flex flex-1 items-center gap-4 justify-center"
        justify="center"
      >
        <motion.div
          className="flex justify-center"
          initial="hidden"
          animate="visible"
          variants={logoVariant}
        >
          <Link to={"/"}>
            <img className=" max-h-[40px] " src="/BigLogo.webp" alt="" />
          </Link>
        </motion.div>
      </NavbarContent>
      <NavbarContent as="div" className="items-center" justify="end">
        <SearchModal isOpen={isOpen} onOpenChange={onOpenChange} />
        <Input
          onClick={onOpen}
          classNames={{
            base: "hidden md:block max-w-full sm:max-w-[10rem] h-10 ",
            mainWrapper: "h-full cursor-pointer",
            input: "text-small cursor-pointer",
            inputWrapper:
              "h-full cursor-pointer font-normal text-default-500  bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Search product..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />
        <Link to={"/cart"} className="flex items-center">
          <Badge
            color="primary"
            content={cart?.data?.products?.length || 0}
            shape="circle"
          >
            <CartIcon size={30} />
          </Badge>
        </Link>
        {user ? (
          <AuthDropDown user={user} logout={logout} />
        ) : (
          <div>
            <Button
              as={Link}
              to={"/login"}
              color="default"
              className="text-white"
              prevent
              variant="bordered"
            >
              Login
            </Button>
          </div>
        )}
        <div className=" hidden md:block">
          <ModeToggle />
        </div>
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem>
          <NavLink to="/">
            {({ isActive }) => (
              <NavbarItem
                className="hover:text-[#C3073F] h-fit mb-4"
                isActive={isActive}
              >
                {" "}
                Home{" "}
              </NavbarItem>
            )}
          </NavLink>

          <NavLink to="/products" aria-current="page">
            {({ isActive }) => (
              <NavbarItem
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-[#C3073F] h-fit mb-4"
                isActive={isActive}
              >
                {" "}
                Products{" "}
              </NavbarItem>
            )}
          </NavLink>
          {user && (
            <NavLink to="/add" aria-current="page">
              {({ isActive }) => (
                <NavbarItem
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:text-[#C3073F] h-fit mb-4"
                  isActive={isActive}
                >
                  Add Product
                </NavbarItem>
              )}
            </NavLink>
          )}

          <ModeToggle />
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}

const logoVariant = {
  hidden: {
    y: -100,
  },
  visible: {
    y: 0,
    transition: {
      duration: 1,
      type: "spring",
      stiffness: 80,
    },
  },
};
const menuVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const childVariant = {
  hidden: {
    y: -100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,

    transition: {
      duration: 1,
    },
  },
};
