import { Button, Divider, Input } from "@nextui-org/react";
import confetti from "canvas-confetti";
import { GitHubLogoIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../hooks/AuthContextProvider";
import { EyeSlashFilledIcon } from "../assets/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../assets/EyeFilledIcon";
import { Icons } from "../assets/Icons";
import { Button as AuthButton } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn, user, setUser, googleSignIn, githubSignIn } =
    useContext(AuthContext);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const { toast } = useToast();

  const { path } = location.state || {};

  const onSubmit = async (userData) => {
    console.log(path);
    confetti();
    setIsLoading(true);
    const { email, password } = userData;
    console.log(email, password);
    signIn(email, password)
      .then((result) => {
        setUser(result.user);
        toast({
          title: "Successfully logged in",

          duration: 3000,
        });
        navigate(path || "/");
        console.log(path);

        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        toast({
          title: "Password is incorrect or the provided email does not exist",
          variant: "destructive",
          duration: 3000,
        });
        setIsLoading(false);
      });
  };
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-[93%] mx-auto  min-h-[90vh] my-16 flex items-center justify-center "
    >
      <Card className="bg-foreground-100/60">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-6">
            <AuthButton
              className="bg-foreground-100/60"
              onClick={() => {
                githubSignIn()
                  .then((result) => {
                    console.log(result);
                    setUser(result.user);
                    toast({
                      title: "Successfully logged in",

                      duration: 3000,
                    });
                    navigate(path || "/");
                    setIsLoading(false);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}
              variant="outline"
            >
              <GitHubLogoIcon className="mr-2 h-4 w-4" />
              Github
            </AuthButton>
            <AuthButton
              variant="outline"
              className="bg-foreground-100/60"
              onClick={() => {
                googleSignIn()
                  .then((result) => {
                    setUser(result.user);
                    toast({
                      title: "Successfully logged in",

                      duration: 3000,
                    });
                    navigate(path || "/");
                    setIsLoading(false);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}
            >
              <Icons.google className="mr-2 h-4 w-4" />
              Google
            </AuthButton>
          </div>
          <div className="relative flex items-center">
            <Divider className="flex-1" />
            <div className="relative flex justify-center text-xs uppercase">
              <span className=" px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
            <Divider className="flex-1" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="text-center ">
            <div className="mb-4">
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{ required: "Email is required" }}
                render={({ field }) => (
                  <div>
                    <Input
                      {...field}
                      type="email"
                      variant={"bordered"}
                      label="Email"
                    />
                    {errors.email && (
                      <p className="text-left text-red-500 text-sm mt-2">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            <div className="mb-4">
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password is incorrect",
                  },
                }}
                render={({ field }) => (
                  <div>
                    <Input
                      {...field}
                      type={isVisible ? "text" : "password"}
                      variant={"faded"}
                      label="Password"
                      endContent={
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={toggleVisibility}
                        >
                          {isVisible ? (
                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                          ) : (
                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                          )}
                        </button>
                      }
                    />
                    {errors.password && (
                      <p className="text-left text-red-500 text-sm mt-2">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            <Button
              disabled={isLoading}
              color="primary"
              className="w-full  rounded-lg py-1 font-bold  "
              type="submit"
            >
              {isLoading ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Signing In
                </>
              ) : (
                <>Sign In</>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className=" text-sm text-center">
            Dont’t Have An Account ?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-[#FF705B] hover:text-[#FFB457] cursor-pointer font-semibold"
            >
              Register
            </span>
          </p>
        </CardFooter>
        <div className="max-w-sm w-full  rounded-lg  shadow-md"></div>
      </Card>
    </motion.div>
  );
};

export default SignIn;

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
