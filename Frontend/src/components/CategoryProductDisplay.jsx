import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummeryApi from "../common/SummeryApi";
import CardLoading from "./CardLoading";
import { validUrl } from "../utils/ValidUrl";
import { useSelector } from "react-redux";
import CardProduct from "./CardProduct";

const CategoryProductDisplay = ({ id, name }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const allCategory = useSelector((state) => state.product.allCategory);
  const allSubCategory = useSelector((state) => state.product.allSubCategory);

  const navigate = useNavigate();

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

  const handleToRedirectProductListPage = async (id, cat) => {
    console.log(id, cat);

    const subCategory = allSubCategory.find((sub) => {
      const filterData = sub.category.some((c) => {
        return c?._id == id;
      });

      return filterData ? true : null;
    });

    const url = `/${validUrl(cat)}-${id}/${validUrl(subCategory?.name)}-${
      subCategory?._id
    }`;

    console.log(url);

    navigate(url);
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
          onClick={() => handleToRedirectProductListPage(id, name)}
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
            {data.map((product, index) => {
              return <CardProduct product={product} key={index} />;
            })}
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
