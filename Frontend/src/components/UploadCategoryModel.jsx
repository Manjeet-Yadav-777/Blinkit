import React, { useState, useRef } from "react";
import { IoClose } from "react-icons/io5";
import UploadImage from "../utils/UploadImage";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummeryApi from "../common/SummeryApi";
import toast from "react-hot-toast";

const UploadCategoryModel = ({ close, refresh }) => {
  const [data, setData] = useState({ name: "", image: "" });
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const [load, setLoad] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    if (file) {
      setImage(URL.createObjectURL(file));
    }

    const response = await UploadImage(file);
    const { data: ImageResponse } = response;

    setData((prev) => {
      return {
        ...prev,
        image: ImageResponse.data.url,
      };
    });
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoad(true);

      const response = await Axios({
        ...SummeryApi.addCategory,
        data: data,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        close();
        refresh();
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className="fixed z-99 w-full top-0 bottom-0 left-0 right-0 bg-neutral-900/70 flex items-center justify-center">
      <div className="bg-white max-w-4xl w-[90%] flex gap-5 flex-col p-4 lg:px-5 rounded">
        <div className="flex">
          <h1 className="text-xl font-bold text-gray-700">Category</h1>
          <button
            onClick={close}
            className="w-fit ml-auto block cursor-pointer"
          >
            <IoClose size={25} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xl font-semibold text-gray-600">Name</label>
            <input
              type="text"
              placeholder="Enter Category Name"
              value={data.name}
              name="name"
              onChange={handleOnChange}
              className="p-2 border w-full border-neutral-400 rounded outline-none bg-blue-50 text-gray-900 font-semibold"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xl font-semibold text-gray-600">Image</p>

            <div className="flex lg:flex-row flex-col lg:items-center gap-10">
              <div className="bg-blue-50 h-36 w-36 border border-neutral-400 rounded flex justify-center items-center">
                {image ? (
                  <img
                    src={image}
                    alt="Category"
                    className="h-full w-full object-cover rounded"
                  />
                ) : (
                  <p className="text-sm font-bold text-gray-500">No Image</p>
                )}
              </div>

              <button
                type="button"
                onClick={handleUploadClick}
                className="hover:bg-green-600 w-fit px-10 py-2 hover:text-white font-bold border border-green-700 transition-colors text-green-800 cursor-pointer"
              >
                Upload Image
              </button>

              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleImageChange}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-green-700 text-white py-2 font-bold cursor-pointer hover:bg-green-800"
          >
            ADD CATEGORY
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadCategoryModel;
