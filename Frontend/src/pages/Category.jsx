import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UploadCategoryModel from "../components/UploadCategoryModel";
import Loading from "../components/Loading";
import Axios from "../utils/Axios";
import SummeryApi from "../common/SummeryApi";
import ConfirmBox from "../components/ConfirmBox";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { useSelector } from "react-redux";

const Category = () => {
  const [openModel, setOpenModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [deleteCat, setDeleteCat] = useState(null);

  const allCategory = useSelector((state) => state.product.allCategory);

  const handleDelete = async () => {
    try {
      if (!deleteCat) return;
      const response = await Axios({
        ...SummeryApi.deleteCategory,
        data: { _id: deleteCat },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setOpenConfirm(false);
        fetchCategory();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummeryApi.getCategory,
      });

      const { data: responseData } = response;
      if (responseData.success) {
        setCategoryData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    setCategoryData(allCategory);
  }, [allCategory]);

  return (
    <>
      <div className="lg:h-16 h-14 lg:w-[80vw] px-5 w-full shadow-md lg:pl-10 lg:pr-16 flex justify-between items-center">
        <h1 className="lg:text-2xl text-xl font-bold text-gray-500">
          Category
        </h1>

        <Link
          onClick={() => setOpenModel(true)}
          className="border text-md h-fit w-fit lg:px-5 lg:py-1 px-3 py-1 transition-all border-green-600 text-green-700 hover:bg-green-700 hover:text-white font-semibold"
        >
          Add Category
        </Link>
      </div>

      {!categoryData.length && !loading && (
        <p className="flex justify-center items-center h-[50vh] text-2xl font-bold text-gray-500">
          No Category Added!
        </p>
      )}

      <div className="lg:p-4 p-2 flex-wrap flex lg:gap-10 gap-4">
        {categoryData.map((cate) => (
          <div
            key={cate._id}
            className="w-52 flex-col shadow-lg p-5 flex justify-center items-center h-auto text-wrap"
          >
            <img
              src={cate.image}
              alt={cate.name}
              className="w-52 h-52 object-cover rounded-md"
            />

            <div className="flex pt-2 justify-between items-center w-full">
              <button
                onClick={() => {
                  setDeleteCat(cate._id);
                  setOpenConfirm(true);
                }}
                className="bg-red-500 rounded-sm w-full py-1 text-white font-semibold cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {loading && <Loading />}

      {openModel && (
        <UploadCategoryModel
          close={() => setOpenModel(false)}
          refresh={fetchCategory}
        />
      )}

      {openConfirm && (
        <ConfirmBox
          close={() => setOpenConfirm(false)}
          refresh={fetchCategory}
          confirm={handleDelete}
        />
      )}
    </>
  );
};

export default Category;
