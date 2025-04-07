import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummeryApi from "../common/SummeryApi";
import CardLoading from "./CardLoading";
import { validUrl } from "../utils/ValidUrl";

const CategoryProductDisplay = ({ id, name }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategoryWiseProducts = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummeryApi.getProductByCategory,
        data: {
          id: id,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryWiseProducts();
  }, []);

  const loadingCardNumber = new Array(6).fill(null);

  return (
    <div>
      <div className="flex justify-between items-center mx-auto px-5 lg:px-10 my-4 md:my-10">
        <h3 className="font-semibold text-lg md:text-xl">{name}</h3>
        <Link
          to={""}
          className="text-green-700 text-sm md:text-lg hover:text-green-500 font-semibold"
        >
          See All
        </Link>
      </div>

      <div className="lg:px-5 px-0 flex gap-5 overflow-x-auto scroll-smooth scrollbar-hide">
        {loading ? (
          loadingCardNumber.map((_, index) => <CardLoading key={index} />)
        ) : (
          <div className="lg:px-10 px-5 flex gap-5">
            {data.map((product, index) => (
              <Link
                to={`/product/${validUrl(product.name)}-${product._id}`}
                key={index}
                className="shadow my-2 border-gray-50 border flex flex-col justify-between object-scale-down w-48 p-2 px-3 rounded cursor-pointer"
              >
                <div>
                  <img src={product?.image[0]} alt="" />
                </div>

                <div className=" flex flex-col">
                  <p className="bg-gray-100 text-[10px] w-fit px-2 rounded-lg">
                    30 MINS
                  </p>
                  <div className="text-sm font-semibold my-2 h-12">
                    <p>{product.name}</p>
                  </div>
                </div>

                <div className=" text-xs text-gray-500 font-semibold">
                  <p>{product.unit}</p>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <p className="text-sm font-bold text-gray-700">
                    ₹{product.price}
                  </p>

                  <button className="text-sm border px-5 py-2 cursor-pointer border-green-600 text-green-600 rounded-lg bg-green-50 font-bold">
                    ADD
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="px-10 text-gray-300 mt-10">
        <hr />
      </div>
    </div>
  );
};

export default CategoryProductDisplay;
