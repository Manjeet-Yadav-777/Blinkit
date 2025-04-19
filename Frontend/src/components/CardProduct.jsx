import React, { useState } from "react";
import { validUrl } from "../utils/ValidUrl";
import { Link } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummeryApi from "../common/SummeryApi";
import toast from "react-hot-toast";
import { useGlobalContext } from "../provider/GlobalProvider";

const CardProduct = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const { fetchCartItems } = useGlobalContext();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setLoading(true);
      const response = await Axios({
        ...SummeryApi.addToCart,
        data: {
          productId: product?._id,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        if (fetchCartItems) {
          fetchCartItems();
        }
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Link
      to={`/product/${validUrl(product.name)}-${product._id}`}
      className="shadow my-2 border-gray-50 border flex flex-col justify-between object-scale-down w-48 p-2 px-3 rounded cursor-pointer bg-white"
    >
      <div>
        <img src={product?.image[0]} alt="" />
      </div>

      <div className=" flex flex-col">
        <p className="bg-gray-100 text-[10px] w-fit px-2 rounded-lg">30 MINS</p>
        <div className="text-sm font-semibold my-2 h-12">
          <p>{product.name}</p>
        </div>
      </div>

      <div className=" text-xs text-gray-500 font-semibold">
        <p>{product.unit}</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <p className="text-sm font-bold text-gray-700">₹{product.price}</p>

        <button
          onClick={handleAddToCart}
          className="text-sm border px-5 py-2 cursor-pointer border-green-600 text-green-600 rounded-lg bg-green-50 font-bold"
        >
          ADD
        </button>
      </div>
    </Link>
  );
};

export default CardProduct;
