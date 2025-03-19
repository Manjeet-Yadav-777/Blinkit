import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import FetchUserDetails from "../utils/FetchUserDetails";
import { setUserDetails } from "../store/userSlice";

const Home = () => {
  const dispatch = useDispatch();

  const fetchUser = async () => {
    const userData = await FetchUserDetails();
    dispatch(setUserDetails(userData.data));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="min-h-[100vh] bg-slate-100">
      <h1>Home</h1>
    </div>
  );
};

export default Home;
