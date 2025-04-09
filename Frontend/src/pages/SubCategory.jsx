import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SubCategoryModel from "../components/SubCategoryModel";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummeryApi from "../common/SummeryApi";
import { createColumnHelper } from "@tanstack/react-table";
import ConfirmBox from "../components/ConfirmBox";
import toast from "react-hot-toast";

const SubCategory = () => {
  const [openSubCategory, setOpenSubCategory] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [deleteSub, setDeleteSub] = useState(null);

  const [openConfirm, setOpenConfirm] = useState(false);

  const fetchSubCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummeryApi.getSubCategory,
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

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummeryApi.deleteSubCategory,
        data: { _id: deleteSub },
      });

      const { data: responseData } = response;


      if (responseData.success) {
        toast.success(responseData.message);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(true);
    }
  };

  useEffect(() => {
    fetchSubCategory();
  }, []);


  return (
    <>
      <div className="lg:h-16 h-14 lg:w-[80vw] px-5 w-full shadow-md lg:pl-10 lg:pr-16 flex justify-between items-center">
        <h1 className="lg:text-2xl text-xl font-bold text-gray-500">
          Sub Category
        </h1>

        <Link
          onClick={() => setOpenSubCategory(true)}
          className="border text-md h-fit w-fit lG:px-5 lg:py-1 px-3 py-1 transition-all border-green-600 text-green-700 hover:bg-green-700 hover:text-white font-semibold"
        >
          Add Sub Catgory
        </Link>
      </div>

      {data.length > 0 ? (
        <div className="w-full">
          <table width={"100%"} border={"1"} className="mt-5">
            <th className="flex justify-between gap-1 px-4 lg:pr-20">
              <td width={"30%"} className="bg-black text-white">
                <p className="text-sm lg:text-lg">Name</p>
              </td>
              <td width={"20%"} className="bg-black text-white">
                <p className="text-sm lg:text-lg">Image</p>
              </td>
              <td width={"45%"} className="bg-black text-white ">
                <p className="text-sm lg:text-lg">Category</p>{" "}
              </td>
              <td width={"10%"} className="bg-black text-white ">
                <p className="text-sm lg:text-lg">Delete</p>{" "}
              </td>
            </th>

            {data.map((item, index) => (
              <tr
                className="flex  justify-between gap-1 mx-4 lg:mr-20"
                key={index}
              >
                <td
                  className="flex justify-center items-center border font-semibold px-1"
                  width={"30%"}
                >
                  <p className="text-sm"> {item.name}</p>
                </td>
                <td
                  width={"20%"}
                  className="flex justify-center items-center border"
                >
                  <img src={item.image} alt={item.name} className="w-8 mt-2" />
                </td>
                <td
                  width={"45%"}
                  className="flex justify-center items-center border"
                >
                  {item?.category?.map((cat, index) => (
                    <p className="font-semibold" key={index}>
                      {cat?.name || "No Category"}
                    </p>
                  ))}
                </td>

                <td
                  width={"10%"}
                  className="flex justify-center items-center border"
                >
                  <button
                    onClick={() => {
                      setOpenConfirm(true);
                      setDeleteSub(item?._id);
                    }}
                    className="text-red-500 font-semibold hover:text-red-700 cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      ) : (
        <p className="flex justify-center items-center h-[50vh] text-2xl font-bold text-gray-500">
          No Sub Category Added!
        </p>
      )}

      {openSubCategory && (
        <SubCategoryModel
          close={() => setOpenSubCategory(false)}
          fetchSubCategory={() => fetchSubCategory()}
        />
      )}

      {openConfirm && (
        <ConfirmBox
          close={() => setOpenConfirm(false)}
          confirm={handleDelete}
          refresh={fetchSubCategory}
        />
      )}
    </>
  );
};

export default SubCategory;
