import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Axios from "../utils/Axios";
import SummeryApi from "../common/SummeryApi";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if (!location?.state?.data?.success) {
      navigate("/");
    }

    if (location?.state?.email) {
      setData((preve) => {
        return {
          ...preve,
          email: location?.state?.email,
        };
      });
    }
  }, []);

  const [data, setData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
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
        ...SummeryApi.reset_password,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);

        navigate("/login");

        setData({
          email: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center lg:min-h-[100vh] pb-[45vh] bg-slate-100">
      <p className="my-5 text-3xl  font-bold text-gray-500">Forgot Password</p>
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col lg:border lg:p-10 p-5 lg:gap-5 gap-7 rounded-md border-gray-400"
      >
        <div>
          <input
            value={data.newPassword}
            name="newPassword"
            onChange={onChangeHandeler}
            type="password"
            className="w-[400px] border h-14  border-gray-400 outline-none px-5"
            placeholder="New Password"
          />
        </div>

        <div>
          <input
            value={data.confirmPassword}
            name="confirmPassword"
            onChange={onChangeHandeler}
            type="password"
            className="w-[400px] border h-14  border-gray-400 outline-none px-5"
            placeholder="Confirm Password"
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-green-900 w-full mt-2 px-10 py-3 text-white font-bold rounded-md cursor-pointer"
          >
            Change Password
          </button>
        </div>
        <p className="text-gray-700">
          Already have an account ?{" "}
          <Link to={"/login"} className="underline text-blue-700">
            login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ResetPassword;
