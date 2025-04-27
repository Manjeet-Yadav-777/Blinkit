import React from "react";
import UserMenu from "../components/UserMenu";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const DashBord = () => {
  const user = useSelector((state) => state.user);

  return (
    <section className="bg-white min-h-[100vh] overflow-x-hidden">
      <div className="container w-full mx-auto lg:p-3 lg:flex gap-4">
        {/* Sidebar Menu */}
        <div className="lg:w-[20%] hidden lg:block py-4 h-[calc(100vh-6rem)] fixed top-24 pr-20 overflow-y-auto">
          <UserMenu />
        </div>

        {/* Content Area */}
        <div className="lg:w-full w-full min-h-[100vh] lg:border-l-1 lg:border-gray-300 bg-white lg:mx-60">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default DashBord;
