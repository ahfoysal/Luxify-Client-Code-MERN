import { Button, Input } from "@nextui-org/react";
import confetti from "canvas-confetti";
import { ReloadIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
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

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const { signUp, user, setUser, googleSignIn, githubSignIn } =
    useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const { toast } = useToast();

  const { path } = location.state || {};
  const onSubmit = async (userData) => {
    setIsLoading(true);
    confetti();
    const { email, password, name } = userData;
    console.log(name);
    signUp(email, password, name)
      .then((result) => {
        setUser(result.user);
        navigate(path || "/");
        toast({
          title: "Successfully signed in",

          duration: 3000,
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        toast({
          title: "Email already in use.",
          variant: "destructive",
          duration: 3000,
        });
      });
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className=" mx-auto w-[93%] min-h-[90vh] my-16 flex items-center justify-center "
    >
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-6">
            <AuthButton
              variant="outline"
              onClick={() => {
                githubSignIn()
                  .then((result) => {
                    console.log(result);
                    setUser(result.user);
                    toast({
                      title: "Successfully signed in",

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
              <GitHubLogoIcon className="mr-2 h-4 w-4" />
              Github
            </AuthButton>
            <AuthButton
              variant="outline"
              onClick={() => {
                googleSignIn()
                  .then((result) => {
                    console.log(result);
                    toast({
                      title: "Successfully signed in",

                      duration: 3000,
                    });
                    setUser(result.user);

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
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="text-center ">
            <div className="mb-4">
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <div>
                    <Input
                      {...field}
                      type="test"
                      variant={"bordered"}
                      label="Name"
                    />
                    {errors.name && (
                      <p className="text-left text-red-500 text-sm mt-2">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
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
                      <p className="text-left text-red-500 text-sm mt-2  break-words	">
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
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/,
                    message:
                      "Password must contain at least one capital letter and one special character",
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
                      <p className="text-left text-red-500 text-sm mt-2  w-72 line-clamp-2">
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
              className="w-full font-bold  rounded-lg py-1 "
              type="submit"
            >
              {isLoading ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Signing Up
                </>
              ) : (
                <>Sign Up</>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className=" text-sm text-center">
            Already have a account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-[#FF705B] hover:text-[#FFB457] cursor-pointer font-semibold"
            >
              Login
            </span>
          </p>
        </CardFooter>
        <div className="max-w-sm w-full  rounded-lg  shadow-md"></div>
      </Card>
    </motion.div>
  );
};

export default SignUp;
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
