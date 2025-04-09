import axios from "axios";
import SummeryApi, { baseUrl } from "../common/SummeryApi";
import AxiosToastError from "./AxiosToastError";

const Axios = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

Axios.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accesstoken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.request.use(
  (response) => {
    return response;
  },
  async (error) => {
    let originRequest = error.config;

    if (error.response.status === 401 && !originRequest.retry) {
      originRequest.retry = true;

      const refreshToken = localStorage.getItem("refreshtoken");

      if (refreshToken) {
        const newAccessToken = await refreshAccessToken(refreshToken);

        if (newAccessToken) {
          originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return Axios(originRequest);
        }
      }
    }
    return Promise.reject(error);
  }
);

const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await Axios({
      ...SummeryApi.refreshToken,
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    const accessToken = response.data.data.accessToken;
    localStorage.setItem("accesstoken", accessToken);
    return accessToken;
  } catch (error) {
    AxiosToastError(error);
  }
};

export default Axios;
