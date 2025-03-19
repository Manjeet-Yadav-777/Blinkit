import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SummeryApi from "../common/SummeryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";

const OtpVerify = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location?.state?.email) {
      navigate("/forgot-password");
    }
  }, []);

  const [data, setData] = useState(["", "", "", "", "", ""]);

  const inputRef = useRef([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummeryApi.forgot_password_otp_verify,
        data: {
          otp: data.join(""),
          email: location?.state?.email,
        },
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);

        setData(["", "", "", "", "", ""]);

        navigate("/reset-password", {
          state: {
            data: response.data,
            email: location?.state?.email,
          },
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center lg:min-h-[100vh] pb-[45vh] bg-slate-100">
      <p className="my-5 text-3xl  font-bold text-gray-500">OTP Verification</p>
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col lg:border lg:p-10 p-5 lg:gap-5 gap-7 rounded-md border-gray-400"
      >
        <p className="text-2xl font-bold text-gray-500">Enter OTP :</p>

        <div className="flex items-center gap-2 justify-between">
          {data.map((element, index) => {
            return (
              <input
                key={"otp" + index}
                name="otp"
                ref={(ref) => {
                  inputRef.current[index] = ref;
                  return ref;
                }}
                type="text"
                maxLength={1}
                value={data[index]}
                onChange={(e) => {
                  const value = e.target.value;
                  const newData = [...data];
                  newData[index] = value;
                  setData(newData);

                  if (value && index < 5) {
                    inputRef.current[index + 1].focus();
                  }
                }}
                className="lg:w-14 border w-12 h-12 lg:h-14  border-gray-400 outline-none font-bold text-xl text-center"
              />
            );
          })}
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-green-900 w-full mt-2 px-10 py-3 text-white font-bold rounded-md cursor-pointer"
          >
            Verify OTP
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

export default OtpVerify;
