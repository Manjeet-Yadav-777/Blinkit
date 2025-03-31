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
  const [showPrivious, setShowPrivious] = useState(false);

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

  const handlePrivious = async () => {
    console.log(page);

    if (page == 0) {
      setPage(1);
    } else {
      setPage(page - 1);
    }

    console.log(page);

    if (page == 1) {
      setShowPrivious(false);
    }
  };

  useEffect(() => {
    handlePrivious();
  }, []);

  return (
    <div>
      {productData.length == 0 ? (
        <div className="px-10">
          <div className=" h-[70vh] w-[69vw] flex justify-center items-center">
            <h1 className="text-3xl font font-semibold text-gray-500">
              {" "}
              No More Products !
            </h1>
          </div>

          {showPrivious && (
            <button
              onClick={handlePrivious}
              className="cursor-pointer rounded bg-red-500 text-white px-5 py-1 font-bold hover:bg-red-700"
            >
              Privious
            </button>
          )}
        </div>
      ) : (
        <div>
          <div className="bg-blue-50 min-h-[100vh] h-auto">
            <div className="lg:h-16 h-14 lg:w-[80vw] bg-white px-5 w-full shadow-md lg:pl-10 lg:pr-16 flex justify-between items-center">
              <h1 className="lg:text-2xl text-xl font-bold text-gray-500">
                All Products
              </h1>
            </div>

            {loading && <Loading />}

            <div className="flex gap-8 p-5 flex-wrap">
              {productData.map((d, index) => {
                return (
                  <ProductCardAdmin
                    key={index}
                    data={d}
                    refresh={fetchProductData}
                  />
                );
              })}
            </div>

            <div className="flex py-5 justify-between items-center w-[80vw] lg:w-[69vw] ml-5">
              <button
                onClick={handlePrivious}
                className="cursor-pointer rounded bg-red-500 text-white px-5 py-1 font-bold hover:bg-red-700"
              >
                Privious
              </button>

              {productData.length > 0 && (
                <button
                  onClick={() => {
                    console.log(page);

                    setPage(page + 1);
                    setShowPrivious(true);
                    window.scrollTo({ top: 0 });
                    console.log(page);
                  }}
                  className="cursor-pointer rounded bg-green-500 font-bold text-white px-5 py-1 hover:bg-green-700"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductAdmin;
