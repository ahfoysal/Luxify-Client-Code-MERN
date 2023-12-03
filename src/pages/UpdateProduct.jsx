import { Divider, Spinner } from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { imageUpload } from "../helpers/Cloudinary";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getData, updateData } from "../helpers/Axios";
import { useParams } from "react-router-dom";
import UpdateForm from "../components/form/UpdateForm";
import DeleteDialog from "../components/form/DeleteDialog";

const UpdateProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

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
    console.log(file);
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
      images: imageUrl || image,
    };
    console.log(data);
    mutate(data);
  };

  const { mutate, data, isSuccess, isError, error } = useMutation({
    mutationFn: (obj) => updateData("/products/" + id, obj),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: "Updated Successfully in",

        duration: 3000,
      });

      navigate("/");
      setIsLoading(false);
    },
    onError: () => {
      toast({
        title: "Something went wrong.",
        variant: "destructive",

        duration: 3000,
      });
    },
  });
  if (isSuccess) {
    console.log(data);
  }
  if (isError) {
    console.log(error);
  }
  const {
    data: items,

    isLoading: isQueryLoading,
  } = useQuery({
    queryKey: ["products", id],
    queryFn: () => getData("products/" + id),
  });

  if (isQueryLoading) return <Spinner />;
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
          <div className="flex justify-between">
            <CardTitle className="md:text-2xl text-base mb-4">
              Update a product
            </CardTitle>
            <CardTitle className="text-sm cursor-pointer  text-danger mb-4">
              <DeleteDialog id={id} navigate={navigate} toast={toast} />
            </CardTitle>
          </div>
          <Divider />
        </CardHeader>
        <CardContent className="grid gap-4 max-w-4xl">
          <UpdateForm
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
            control={control}
            items={items}
            errors={errors}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UpdateProduct;

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
