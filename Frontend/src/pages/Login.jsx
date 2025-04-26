import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SummeryApi from "../common/SummeryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import GlobalProvider, { useGlobalContext } from "../provider/GlobalProvider";

const Login = () => {
  const navigate = useNavigate();
  const { fetchCartItems } = useGlobalContext();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onChangeHandeler = async (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummeryApi.login,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);

        localStorage.setItem("accesstoken", response.data.data.accessToken);
        localStorage.setItem("refreshtoken", response.data.data.refreshToken);

        setData({
          email: "",
          password: "",
        });

        navigate("/");
        fetchCartItems();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center lg:min-h-[100vh] pb-[45vh] bg-slate-100">
      <p className="my-5 text-3xl  font-bold text-gray-500">Login</p>
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col lg:border lg:p-10 p-5 lg:gap-5 gap-7 rounded-md border-gray-400"
      >
        <div>
          <input
            value={data.email}
            name="email"
            onChange={onChangeHandeler}
            type="email"
            className="w-[400px] border h-12  border-gray-400 outline-none px-5"
            placeholder="Email"
          />
        </div>
        <div>
          <input
            value={data.password}
            name="password"
            onChange={onChangeHandeler}
            type="password"
            className="w-[400px] border h-12  border-gray-400 outline-none px-5"
            placeholder="Password"
          />
          <p
            onClick={() => navigate("/forgot-password")}
            className="w-full cursor-pointer text-blue-700 hover:text-red-700 underline text-end my-1"
          >
            Forget Password ?
          </p>
        </div>
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-green-900 px-10 py-3 text-white font-bold rounded-md cursor-pointer"
          >
            Login
          </button>
          <p className="text-md text-gray-600">
            don't have an account ?{" "}
            <Link
              to={"/register"}
              className="text-blue-800 cursor-pointer underline"
            >
              signup
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
