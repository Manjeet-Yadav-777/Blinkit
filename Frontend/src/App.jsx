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
import { setAllCategory } from "./store/ProductSlice";

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

      const resposne = await Axios({
        ...SummeryApi.getCategory,
      });

      const { data: responseData } = resposne;

      if (responseData.success) {
        dispatch(setAllCategory(responseData.data));
        // setCategoryData(responseData.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchCategory();
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-[100vh] w-full bg-slate-100">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  );
};

export default App;
