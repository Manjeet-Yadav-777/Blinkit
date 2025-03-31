import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../utils/Axios";
import SummeryApi from "../common/SummeryApi";
import { logout } from "../store/userSlice";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { HiOutlineExternalLink } from "react-icons/hi";
import isAdmin from "../utils/isAdmin";

const UserMenu = ({ close }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummeryApi.logout,
      });

      if (response.data.success) {
        if (close) {
          close();
        }
        dispatch(logout());
        localStorage.clear();

        toast.success(response.data.message);

        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleDash = () => {
    navigate("/dashboard/profile");

    if (close) {
      close();
    }
  };

  const handleRef = () => {
    if (close) {
      close();
    }
  };

  return (
    <div className="py-2 px-1">
      <div className="font-semibold text-lg text-black">My Account</div>

      <div className="text-md text-gray-700 font-semibold mt-1 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          {user.name || user.mobile}{" "}
          <div
            onClick={handleDash}
            className="cursor-pointer hover:text-blue-700"
          >
            <HiOutlineExternalLink size={18} />
          </div>
        </div>
        <div>{user.role == "ADMIN" ? "(ADMIN)" : ""}</div>
      </div>

      <hr className="border-gray-300 mt-2 mb-1" />

      <div className="flex flex-col  font-medium text-gray-700 gap-1">
        {isAdmin(user.role) && (
          <Link
            onClick={() => handleRef()}
            to={"/dashboard/category"}
            className="px-2 py-1 hover:text-white hover:bg-green-600"
          >
            Category
          </Link>
        )}

        {isAdmin(user.role) && (
          <Link
            to={"/dashboard/subcategory"}
            className="px-2 py-1 hover:text-white hover:bg-green-600"
          >
            Sub Category
          </Link>
        )}

        {isAdmin(user.role) && (
          <Link
            to={"/dashboard/upload-product"}
            className="px-2 py-1 hover:text-white hover:bg-green-600"
          >
            Upload Product
          </Link>
        )}

        {isAdmin(user.role) && (
          <Link
            to={"/dashboard/product-admin"}
            className="px-2 py-1 hover:text-white hover:bg-green-600"
          >
            Product
          </Link>
        )}

        <Link
          to={"/dashboard/myorders"}
          className="px-2 py-1 hover:text-white hover:bg-green-600"
        >
          My Orders
        </Link>

        <Link
          to={"/dashboard/address"}
          className="px-2 py-1 hover:text-white hover:bg-green-600"
        >
          Save Address
        </Link>

        <button
          onClick={handleLogout}
          className="text-start cursor-pointer px-2 py-1 hover:text-white hover:bg-red-600"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
