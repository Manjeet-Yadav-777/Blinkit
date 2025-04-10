import React, { useEffect, useState } from "react";
import CardLoading from "./CardLoading";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummeryApi from "../common/SummeryApi";
import CategoryProductDisplay from "./CategoryProductDisplay";
import { validUrl } from "../utils/ValidUrl";
import { Link, useLocation } from "react-router-dom";
import CardProduct from "./CardProduct";

const SearchPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingArray = new Array(10).fill(null);

  const params = useLocation();
  const searchText = params?.search?.slice(3);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummeryApi.searchProduct,
        data: {
          search: searchText,
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
    fetchData();
  }, [searchText]);

  return (
    <section>
      <div className="mx-auto p-4">
        <p className="font-semibold">Search Result : {data.length}</p>

        <div className="flex flex-wrap gap-8 mx-auto lg:px-10 py-8">
          {data.map((product, index) => {
            return <CardProduct product={product} index={index} />;
          })}

          {!data[0] && !loading && (
            <div className="flex justify-center items-center h-[60vh] w-[100vw]">
              <h3 className="font-semibold text-2xl lg:text-4xl">
                No Products Found !
              </h3>
            </div>
          )}

          {loading &&
            loadingArray.map((_, index) => {
              return <CardLoading key={index} />;
            })}
        </div>
      </div>
    </section>
  );
};

export default SearchPage;
