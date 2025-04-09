import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummeryApi from "../common/SummeryApi";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";
import { validUrl } from "../utils/ValidUrl";
const ProductListPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [displaySubCategory, setDisplaySubCategory] = useState([]);

  const allSubCategory = useSelector((state) => state.product.allSubCategory);

  const params = useParams();

  const subCategoryHelp = params.subCategory.split("-");
  const subCategoryName = subCategoryHelp
    .slice(0, subCategoryHelp.length - 1)
    .join(" ");

  const categoryId = params.category.split("-").slice(-1)[0];
  const subCategoryId = params.subCategory.split("-").slice(-1)[0];

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummeryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId: categoryId,
          subCategoryId: subCategoryId,
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
    const sub = allSubCategory.filter((s) => {
      const filterData = s.category.some((el) => {
        return el._id === categoryId;
      });

      return filterData ? filterData : null;
    });

    setDisplaySubCategory(sub);
  }, [params, allSubCategory]);

  useEffect(() => {
    fetchProductData();
  }, [params]);

  return (
    <section className="sticky top-24 lg:top-20">
      <div className="container lg:mx-auto sticky top-24 flex w-[100vw]">
        <div className="bg-white w-[25vw] lg:w-[20vw] min-h-[79vh] lg:p-5">
          <ul className="flex flex-col lg:gap-5 gap-2">
            {displaySubCategory.map((item, index) => {
              const url = `/${validUrl(item?.category[0]?.name)}-${
                item?.category[0]._id
              }/${validUrl(item.name)}-${item?._id}`;
              return (
                <Link
                  to={url}
                  className={` w-full lg:px-5 p-2 mx-0 justify-center lg:justify-start lg:py-2 cursor-pointer shadow lg:gap-2 flex lg:flex-row flex-col items-center border-b-1 border-gray-500 hover:bg-green-300 ${
                    subCategoryId == item._id ? "bg-green-100" : "bg-white"
                  }`}
                  key={index}
                >
                  <img src={item?.image} className="lg:w-10 w-10" alt="" />
                  <p className="lg:text-[14px] text-[10px] font-semibold">
                    {" "}
                    {item?.name}
                  </p>
                </Link>
              );
            })}
          </ul>
        </div>

        <div className="lg:w-[80vw] w-[75vw]">
          <div className="bg-white shadow-md p-4">
            <h3 className="font-semibold">{subCategoryName}</h3>
          </div>

          <div className="lg:px-5 px-2 py-5 flex flex-wrap gap-3">
            {data.map((product, index) => {
              const discount = (product.price * product.discount) / 100;
              product.price = product.price - discount;
              return (
                <Link
                  to={`/product/${validUrl(product.name)}-${product._id}`}
                  key={index}
                  className="shadow my-2 bg-white border-gray-50 border flex flex-col justify-between object-scale-down lg:w-48 w-40 p-2 px-3 rounded cursor-pointer"
                >
                  <div>
                    <img src={product?.image[0]} alt="" />
                  </div>

                  <div className=" flex flex-col">
                    <p className="bg-gray-100  lg:text-[10px] text-xs w-fit px-2 rounded-lg">
                      30 MINS
                    </p>
                    <div className="lg:text-sm text-xs font-semibold my-2 h-12">
                      <p>{product.name}</p>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 font-semibold">
                    <p>{product.unit}</p>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <p className="lg:text-sm text-xs font-bold text-gray-700">
                      ₹{product.price}
                    </p>

                    <button className="text-sm border px-3 py-1 lg:px-5 lg:py-2 cursor-pointer border-green-600 text-green-600 rounded-lg bg-green-50 font-bold">
                      ADD
                    </button>
                  </div>
                </Link>
              );
            })}
          </div>

          <div>{loading && <Loading />}</div>
        </div>
      </div>
    </section>
  );
};

export default ProductListPage;
