import { useDispatch } from "react-redux";
import SummeryApi from "../common/SummeryApi";
import { handleAddCartItems } from "../store/cartProduct";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";

import { createContext, useContext, useEffect } from "react";

const GlobalContext = createContext(null);

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();

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

  useEffect(() => {
    fetchCartItems();
  }, []);
  return (
    <GlobalContext.Provider
      value={{
        fetchCartItems,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
