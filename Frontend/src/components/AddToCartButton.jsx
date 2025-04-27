import React, { useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummeryApi from "../common/SummeryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { useGlobalContext } from "../provider/GlobalProvider";
import Loading from "./Loading";
import { useSelector } from "react-redux";
import { IoMdAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";

const AddToCartButton = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const { fetchCartItems, updateCartItems, deleteCartItem } =
    useGlobalContext();
  const cartItem = useSelector((state) => state.cartItem.cart);
  const [isAvailable, setIsAvailable] = useState(false);
  const [qty, setQty] = useState(0);
  const [cartDetails, setCartDetails] = useState();

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

  useEffect(() => {
    const cheakingItem = cartItem.some(
      (item) => item.productId._id === product._id
    );

    setIsAvailable(cheakingItem);

    const cheakQty = cartItem.find(
      (item) => item.productId._id === product._id
    );
    setQty(cheakQty?.quantity);
    setCartDetails(cheakQty);
  }, [product, cartItem]);

  const increaseQty = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    updateCartItems(cartDetails._id, qty + 1);
  };

  const decreaseQty = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (qty == 1) {
      deleteCartItem(cartDetails._id);
    } else {
      updateCartItems(cartDetails._id, qty - 1);
    }
  };

  return isAvailable ? (
    <div className="flex bg-green-700 text-white px-2 gap-2 rounded py-2 items-center">
      <button onClick={increaseQty} className="cursor-pointer">
        <IoMdAdd />
      </button>
      <p className="text-sm">{qty}</p>
      <button onClick={decreaseQty} className="cursor-pointer">
        <RiSubtractFill />
      </button>
    </div>
  ) : (
    <button
      onClick={handleAddToCart}
      className="text-sm border px-5 py-2 cursor-pointer border-green-600 text-green-600 rounded-lg bg-green-50 font-bold"
    >
      {loading ? <Loading /> : "ADD"}
    </button>
  );
};

export default AddToCartButton;
