import axios from "axios";

const cloudinary = {
  cloud_name: "diwcbidtu",
  api_key: "829485526543539",
  api_secret: "n_ESYvxomHsrPMVR8AR4IIAG4yE",
};
const imageUpload = async (file) => {
  if (file.type.match("image.*")) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my_chat_images");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinary.cloud_name}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data.secure_url);
      const imageUrl = response.data.secure_url;
      console.log(imageUrl);
      return imageUrl;
    } catch (error) {
      console.error(error);
    }
  }
};
export { cloudinary, imageUpload };
