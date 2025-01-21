import axios from "axios";

const upload_preset = "Do An Tot Nghiep";
const cloud_name = "dlgaomunb";
const cloudinary_api_url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

export const uploadImageToCloudinary = async (file, folder) => {
  const data = new FormData();

  data.append("file", file);
  data.append("upload_preset", upload_preset);
  data.append("cloud_name", cloud_name);
  if (folder) {
    data.append("folder", "DoAnTotNghiep/" + folder);
  }

  const response = await axios.post(cloudinary_api_url, data);

  const fileData = response.data;
  return fileData.url;
};
