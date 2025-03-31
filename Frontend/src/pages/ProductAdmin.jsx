import React, { useEffect, useState } from "react";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummeryApi from "../common/SummeryApi";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import ProductCardAdmin from "../components/ProductCardAdmin";

const ProductAdmin = () => {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummeryApi.getProduct,
        data: {
          page: page,
        },
      });

      const { data: responseData } = response;

      console.log(responseData);

      if (responseData.success) {
        setProductData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [page]);

  return (
    <div className="bg-blue-50 min-h-[100vh] h-auto">
      <div className="lg:h-16 h-14 lg:w-[80vw] bg-white px-5 w-full shadow-md lg:pl-10 lg:pr-16 flex justify-between items-center">
        <h1 className="lg:text-2xl text-xl font-bold text-gray-500">
          All Produts
        </h1>
      </div>

      {loading && <Loading />}

      <div className="flex gap-8 p-5 flex-wrap">
        {productData.map((d, index) => {
          return <ProductCardAdmin data={d} />;
        })}
      </div>

      <div className="flex py-5 justify-between items-center w-[69vw] ml-5">
        <button
          onClick={() => setPage(page - 1)}
          className="cursor-pointer bg-red-500 text-white px-5 py-1 font-bold hover:bg-red-700"
        >
          Privious
        </button>
        <button
          onClick={() => setPage(page + 1)}
          className="cursor-pointer bg-green-500 font-bold text-white px-5 py-1 hover:bg-green-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductAdmin;
