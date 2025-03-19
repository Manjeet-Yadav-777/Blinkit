import React from "react";
import isAdmin from "../utils/isAdmin";
import { useSelector } from "react-redux";

const AdminPermission = ({ children }) => {
  const user = useSelector((state) => state.user);

  return (
    <>
      {isAdmin(user.role) ? (
        children
      ) : (
        <p className="text-red-600 bg-red-100 p-4 w-[100vw] font-semibold">
          Do not have Permission !
        </p>
      )}
    </>
  );
};

export default AdminPermission;
