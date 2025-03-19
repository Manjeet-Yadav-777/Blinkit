import SummeryApi from "../common/SummeryApi";
import Axios from "./Axios";

const UploadImage = async (image) => {
  try {
    const formData = new FormData();
    formData.append("image", image);

    const response = await Axios({
      ...SummeryApi.uploadImage,
      data: formData,
    });

    return response;
  } catch (error) {
    return error;
  }
};

export default UploadImage;
