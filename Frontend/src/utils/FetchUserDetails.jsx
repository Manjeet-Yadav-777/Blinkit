import Axios from "./Axios";
import SummeryApi from "../common/SummeryApi";

const FetchUserDetails = async () => {
  try {
    const response = await Axios({
      ...SummeryApi.userDetails,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default FetchUserDetails;
