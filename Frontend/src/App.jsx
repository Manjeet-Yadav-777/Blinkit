import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import toast, { Toaster } from "react-hot-toast";
import FetchUserDetails from "./utils/FetchUserDetails";
import { setUserDetails } from "./store/userSlice";
import { useDispatch } from "react-redux";
import SummeryApi from "./common/SummeryApi";
import Axios from "./utils/Axios";
import {
  setAllCategory,
  setAllSubCategory,
  setLoadingCategory,
} from "./store/ProductSlice";
import AxiosToastError from "./utils/AxiosToastError";
import GlobalProvider from "./provider/GlobalProvider";

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    const userData = await FetchUserDetails();
    dispatch(setUserDetails(userData.data));
  };

  const fetchCategory = async () => {
    try {
      setLoading(true);
      dispatch(setLoadingCategory(true));

      const resposne = await Axios({
        ...SummeryApi.getCategory,
      });

      const { data: responseData } = resposne;

      if (responseData.success) {
        dispatch(setAllCategory(responseData.data));
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
      dispatch(setLoadingCategory(false));
    }
  };

  const fetchSubCategory = async () => {
    try {
      setLoading(true);

      const resposne = await Axios({
        ...SummeryApi.getSubCategory,
      });

      const { data: responseData } = resposne;

      if (responseData.success) {
        dispatch(setAllSubCategory(responseData.data));
        // setCategoryData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchCategory();
    fetchSubCategory();
  }, []);

  return (
    <GlobalProvider>
      <Header />
      <main className="min-h-[100vh] w-full bg-slate-100">
        <Outlet />
      </main>
      <Footer />
      <Toaster />

    </GlobalProvider>
  );
};

export default App;
