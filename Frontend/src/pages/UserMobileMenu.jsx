import React from "react";
import UserMenu from "../components/UserMenu";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const UserMobileMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-4">
      <button
        onClick={() => navigate("/")}
        className="lg:hidden block ml-auto cursor-pointer"
      >
        <IoClose size={24} />
      </button>
      <UserMenu />
    </div>
  );
};

export default UserMobileMenu;
