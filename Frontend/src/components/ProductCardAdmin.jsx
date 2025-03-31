import React, { useState } from "react";
import ConfirmBox from "./ConfirmBox";
import SummeryApi from "../common/SummeryApi";
import Axios from "../utils/Axios";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";

const ProductCardAdmin = ({ data, refresh }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [deletPro, setDeletePro] = useState(null);

  const handleDelete = async () => {
    try {
      if (!deletPro) {
        return;
      }

      console.log("aaya h handle m");

      const response = await Axios({
        ...SummeryApi.deleteProduct,
        data: { id: deletPro },
      });

      console.log(response);

      if (response.data.success) {
        toast.success(response.data.message);
        setIsOpen(false);
        refresh();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div className="w-40 h-auto bg-white flex flex-col justify-between items-center px-3">
      <div>
        <img src={data.image[0]} className="h-40 object-cover" alt="" />
      </div>

      <p className="text-sm font-semibold my-1">{data.name}</p>

      <button
        onClick={() => {
          setDeletePro(data?._id);
          setIsOpen(true);
        }}
        className="bg-red-500 w-full text-white my-3 py-1 cursor-pointer"
      >
        Delete
      </button>

      {isOpen && (
        <ConfirmBox
          confirm={handleDelete}
          close={() => setIsOpen(false)}
          refresh={refresh}
        />
      )}
    </div>
  );
};

export default ProductCardAdmin;
