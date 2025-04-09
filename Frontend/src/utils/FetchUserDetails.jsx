import Axios from "./Axios";
import SummeryApi from "../common/SummeryApi";
import AxiosToastError from "./AxiosToastError";

const FetchUserDetails = async () => {
  try {
    const response = await Axios({
      ...SummeryApi.userDetails,
    });

    return response.data;
  } catch (error) {
    AxiosToastError(error);
  }
};

export default FetchUserDetails;
