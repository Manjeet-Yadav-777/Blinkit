import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../utils/Axios";
import SummeryApi from "../common/SummeryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { updateAvtar } from "../store/userSlice";
import { IoClose } from "react-icons/io5";

const UserProfileAvtarEdit = ({ close }) => {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmitProfile = (e) => {
    e.preventDefault();
  };

  const handleUploadAvtar = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("avtar", file);

    try {
      setLoading(true);

      const response = await Axios({
        ...SummeryApi.uplaodAvtar,
        data: formData,
      });

      console.log(response);

      const { data: responseData } = response;
      dispatch(updateAvtar(responseData.data.avtar));
      console.log("API Response:", response);
      console.log("Avatar Path:", response?.data?.data?.avtar);
    } catch (error) {
      AxiosToastError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-900/70  flex justify-center items-center">
      <div className="bg-white openr w-full max-w-sm rounded p-4 flex flex-col justify-center items-center">
        <button onClick={close} className="ml-auto cursor-pointer">
          <IoClose size={24} />
        </button>
        <div className="w-24 h-24 bg-red-600 flex justify-center items-center rounded-full drop-shadow-sm overflow-hidden">
          {user.avtar ? (
            <img
              src={user.avtar}
              alt={user.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <FaRegUserCircle size={70} />
          )}
        </div>

        <form action="" onSubmit={handleSubmitProfile}>
          <label htmlFor="uploadProfile">
            <div className="border border-gray-600 px-6 cursor-pointer py-1 mt-5">
              {loading ? "Updating..." : "Upload"}
            </div>{" "}
          </label>
          <input
            onChange={handleUploadAvtar}
            type="file"
            id="uploadProfile"
            className="hidden"
          />
        </form>
      </div>
    </section>
  );
};

export default UserProfileAvtarEdit;
