import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileAvtarEdit from "../components/UserProfileAvtarEdit";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummeryApi from "../common/SummeryApi";
import toast from "react-hot-toast";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [openProfileAvtarEdit, setOpenProfileAvtarEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState({
    name: user.name,
    mobile: user.mobile,
  });

  const handleOnChange = async (e) => {
    const { name, value } = e.target;

    setUserData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    setUserData({
      name: user.name,
      mobile: user.mobile,
    });
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await Axios({
        ...SummeryApi.updateUser,
        data: userData,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-10 lg:py-5">
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

      <button
        onClick={() => setOpenProfileAvtarEdit(true)}
        className="text-sm border px-3 py-1 rounded-lg cursor-pointer text-gray-700 hover:bg-gray-800 transition-all hover:text-white mt-5 border-gray-400"
      >
        Change Picture
      </button>

      {openProfileAvtarEdit && (
        <UserProfileAvtarEdit close={() => setOpenProfileAvtarEdit(false)} />
      )}

      <form action="" onSubmit={handleSubmit} className="mt-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-xl font-semibold text-gray-600">
            Name
          </label>

          <input
            type="text"
            className="p-2 border w-full border-gray-600 bg-blue-50 text-gray-900 font-semibold"
            placeholder="Enter Name"
            value={userData.name}
            onChange={handleOnChange}
            name="name"
            required
          />
        </div>

        <div className="flex flex-col gap-2 mt-5">
          <label htmlFor="" className="text-xl font-semibold text-gray-600">
            Mobile
          </label>

          <input
            type="number"
            className="p-2 border w-full border-gray-600 bg-blue-50 text-gray-900 font-semibold"
            placeholder="Enter Mobile"
            value={userData.mobile}
            onChange={handleOnChange}
            name="mobile"
            required
          />
        </div>

        <button
          type="submit"
          className="border mt-8 bg-green-600 text-white font-semibold cursor-pointer px-10 py-3 hover:bg-green-800"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
