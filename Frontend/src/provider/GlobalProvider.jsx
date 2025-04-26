import { useDispatch, useSelector } from "react-redux";
import SummeryApi from "../common/SummeryApi";
import { handleAddCartItems } from "../store/cartProduct";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";

import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { handleAddAddress } from "../store/addressSlice";

const GlobalContext = createContext(null);

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cartItem.cart);

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);

  const fetchCartItems = async () => {
    try {
      const response = await Axios({
        ...SummeryApi.getCart,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(handleAddCartItems(responseData.data));
        // console.log(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const updateCartItems = async (id, qty) => {
    try {
      const response = await Axios({
        ...SummeryApi.updateCart,
        data: {
          _id: id,
          qty: qty,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchCartItems();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const deleteCartItem = async (cartId) => {
    try {
      const response = await Axios({
        ...SummeryApi.deleteCartItem,
        data: {
          _id: cartId,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success("Item Removed");
        fetchCartItems();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const fetchAddress = async () => {
    try {
      const response = await Axios({
        ...SummeryApi.getAddresses,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(handleAddAddress(responseData.data));
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    fetchCartItems();
    fetchAddress();
  }, []);

  useEffect(() => {
    const qty = cartItem.reduce((prev, curr) => {
      return prev + curr.quantity;
    }, 0);

    setTotalQty(qty);

    const tPrice = cartItem.reduce((prev, curr) => {
      return prev + curr.productId.price * curr.quantity;
    }, 0);

    setTotalPrice(tPrice);
  }, [cartItem]);
  return (
    <GlobalContext.Provider
      value={{
        fetchCartItems,
        updateCartItems,
        deleteCartItem,
        totalPrice,
        totalQty,
        fetchAddress,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
