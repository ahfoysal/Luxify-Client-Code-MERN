import { Button, Divider, Input, Select, SelectItem } from "@nextui-org/react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { imageUpload } from "../helpers/Cloudinary";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postData } from "../helpers/Axios";

const AddProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const items = useLoaderData();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const onSubmit = async (userData) => {
    setIsLoading(true);
    console.log(userData);
    const {
      price,
      image,
      name,
      subCategory,
      brand,
      shortDescription,
      ratings,
    } = userData;
    const fileInput = document?.querySelector('input[type="file"]');
    const file = fileInput?.files ?? [0];
    let imageUrl;
    if (file.length) {
      try {
        imageUrl = await imageUpload(file[0]);
      } catch (e) {
        console.log(e);
        toast({
          title: "Something Went wrong",
          variant: "destructive",

          duration: 3000,
        });
        return setIsLoading(false);
      }
    }

    const data = {
      price,
      name,
      subCategory,
      brand,
      shortDescription,
      ratings,
      images: [imageUrl || image],
    };
    mutate(data);
    setIsLoading(false);
  };
  const { mutate } = useMutation({
    mutationFn: (obj) => postData("/products", obj),
    onSuccess: (mutatedData) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: "Product created  Successfully.",

        duration: 3000,
      });
      console.log(mutatedData.data);

      navigate("/product/" + mutatedData?.data?._id);
      setIsLoading(false);
    },
  });

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-[93%] mx-auto  py-32   flex items-center justify-center "
    >
      <Card className=" bg-transparent w-full  ">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl mb-4">Add a product</CardTitle>
          <Divider />
        </CardHeader>
        <CardContent className="grid gap-4 max-w-4xl">
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
                      type="text"
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
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="mb-4 flex-1">
                <Controller
                  name="subCategory"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Subcategory is required" }}
                  render={({ field }) => (
                    <div>
                      <Select
                        {...field}
                        label="Select an Category"
                        variant="bordered"
                      >
                        {categories.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </Select>
                      {errors.subCategory && (
                        <p className="text-left text-red-500 text-sm mt-2">
                          {errors.subCategory.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>

              <div className="mb-4 flex-1">
                <Controller
                  name="brand"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Brands is required" }}
                  render={({ field }) => (
                    <div>
                      <Select
                        {...field}
                        label="Select an brand"
                        variant="bordered"
                      >
                        {items.map((item) => (
                          <SelectItem key={item.name} value={item.name}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </Select>
                      {errors.brand && (
                        <p className="text-left text-red-500 text-sm mt-2">
                          {errors.brand.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
            <div className="md:flex gap-4 w-full">
              <div className="mb-4 flex-1">
                <Controller
                  name="price"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Price is required" }}
                  render={({ field }) => (
                    <div>
                      <Input
                        {...field}
                        type="number"
                        variant="bordered"
                        label="Price"
                        endContent={
                          <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">
                              $
                            </span>
                          </div>
                        }
                      />
                      {errors.price && (
                        <p className="text-left text-red-500 text-sm mt-2">
                          {errors.price.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
              <div className="mb-4 flex-1">
                <Controller
                  name="ratings"
                  control={control}
                  rules={{
                    max: { value: 5, message: "Ratings cannot exceed 5" },
                  }}
                  defaultValue=""
                  render={({ field }) => (
                    <div>
                      <Input
                        {...field}
                        type="number"
                        variant="bordered"
                        label="Ratings"
                      />
                      {errors.ratings && (
                        <p className="text-left text-red-500 text-sm mt-2">
                          {errors.ratings.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
            <div className="md:flex gap-4 w-full">
              <div className="mb-4 ">
                <Controller
                  name="file"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <div>
                      <Input {...field} type="file" variant="underlined" />
                    </div>
                  )}
                />
              </div>
              <div className="relative flex items-center">
                <Divider className="flex-1" />
                <div className="relative flex justify-center text-xs uppercase">
                  <span className=" px-2 text-muted-foreground">Or</span>
                </div>
                <Divider className="flex-1" />
              </div>
              <div className="mb-4 flex-1">
                <Controller
                  name="image"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <div>
                      <Input
                        {...field}
                        type="text"
                        variant="bordered"
                        label="Image Url"
                      />
                      {errors.image && (
                        <p className="text-left text-red-500 text-sm mt-2">
                          {errors.image.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>

            <div className="mb-4">
              <Controller
                name="shortDescription"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <div>
                    <Input
                      {...field}
                      type="text"
                      variant="bordered"
                      label="Short Description"
                    />
                  </div>
                )}
              />
            </div>

            <Button
              disabled={isLoading}
              color="primary"
              className="w-[20%]  rounded-lg py-1 font-bold  "
              type="submit"
            >
              {isLoading ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Adding
                </>
              ) : (
                <>Add</>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AddProduct;

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
const categories = [
  "Shirt",
  "T-shirt",
  "Pant",
  "Watch",
  "Shoes",
  "Hat",
  "Dress",
  "Jeans",
  "Jacket",
  "Sneakers",
  "Belt",
  "Gloves",
  "Scarf",
  "Sunglasses",
  "Boots",
  "Skirt",
  "Sweater",
  "Shorts",
  "Socks",
  "Blouse",
  "Coat",
  "Flip Flops",
  "Suit",
  "Tie",
  "Handbag",
  "Backpack",
  "Umbrella",
  "Jumpsuit",
  "Cardigan",
  "Tank Top",
];
