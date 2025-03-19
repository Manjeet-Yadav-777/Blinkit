import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import Axios from "../utils/Axios";
import SummeryApi from "../common/SummeryApi";
import AxiosToastError from "../utils/AxiosToastError";

const Signup = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
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
        ...SummeryApi.register,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);

        setData({
          name: "",
          email: "",
          password: "",
        });

        navigate("/login");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center lg:min-h-[100vh] pb-[45vh] bg-slate-100">
      <p className="my-5 text-3xl font-bold text-gray-500">Sign Up</p>
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col lg:border p-5 lg:p-10 lg:gap-5 gap-7 rounded-md border-gray-400"
      >
        <div>
          <input
            type="name"
            name="name"
            value={data.name}
            required
            onChange={onChangeHandeler}
            className="w-[400px] border  h-12  border-gray-400 outline-none px-5"
            placeholder="Full Name"
          />
        </div>
        <div>
          <input
            type="email"
            required
            name="email"
            value={data.email}
            onChange={onChangeHandeler}
            className="w-[400px] border h-12  border-gray-400 outline-none px-5 "
            placeholder="Email"
          />
        </div>
        <div>
          <input
            type="password"
            required
            name="password"
            value={data.password}
            onChange={onChangeHandeler}
            className="w-[400px] border h-12  border-gray-400 outline-none px-5"
            placeholder="Password"
          />

        </div>
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-green-900 px-10 py-3 text-white font-bold rounded-md cursor-pointer"
          >
            Sign Up
          </button>
          <p className="text-md text-gray-600">
            already have an account ?{" "}
            <Link
              to={"/login"}
              className="text-blue-800 cursor-pointer underline"
            >
              login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
