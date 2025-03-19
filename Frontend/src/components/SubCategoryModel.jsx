import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import UploadImage from "../utils/UploadImage";
import { useSelector } from "react-redux";

const SubCategoryModel = ({ close }) => {
  const allCategory = useSelector((state) => state.product.allCategory);

  const [data, setData] = useState({
    name: "",
    image: "",
    category: [],
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
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

  console.log("sub data", data);

  return (
    <div className="fixed z-99 w-full top-0 bottom-0 left-0 right-0 bg-neutral-900/70 flex items-center justify-center">
      <div className="bg-white max-w-4xl w-[90%] flex gap-5 flex-col p-4 lg:px-5 rounded">
        <div className="flex">
          <h1 className="text-xl font-bold text-gray-700">Sub Category</h1>
          <button
            onClick={close}
            className="w-fit ml-auto block cursor-pointer"
          >
            <IoClose size={25} />
          </button>
        </div>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xl font-semibold text-gray-600">Name</label>
            <input
              type="text"
              placeholder="Enter Sub Category Name"
              value={data.name}
              name="name"
              onChange={handleChange}
              className="p-2 border w-full border-neutral-400 rounded outline-none bg-blue-50 text-gray-900 font-semibold"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xl font-semibold text-gray-600">Image</p>
            <div className="flex lg:flex-row flex-col lg:items-center gap-10">
              <div className="bg-blue-50 h-36 w-36 border border-neutral-400 rounded flex justify-center items-center">
                {!data.image ? (
                  <p className="text-neutral-400">No Image</p>
                ) : (
                  <img
                    src={data.image}
                    alt="Sub Category"
                    className="h-full w-full object-scale-down rounded"
                  />
                )}
              </div>

              <label htmlFor="subcategory">
                <div className="hover:bg-green-600 w-fit px-10 py-2 hover:text-white font-bold border border-green-700 transition-colors text-green-800 cursor-pointer">
                  Upload Image
                </div>

                <input
                  type="file"
                  id="subcategory"
                  className="hidden"
                  onChange={handleSubImage}
                />
              </label>
            </div>
          </div>

          <div className="my-5">
            <select
              className="p-2 border w-full border-neutral-400 rounded outline-none text-gray-900 font-semibold"
              name="category"
              id=""
              onChange={(e) => {
                const value = e.target.value;

                const categoryIndex = allCategory.find((el) => el._id == value);

                setData((prev) => {
                  return {
                    ...prev,
                    category: [...prev.category, categoryIndex],
                  };
                });
              }}
            >
              <option disabled value="">
                Select Category
              </option>

              {allCategory.map((category, index) => {
                return (
                  <option
                    value={category?._id}
                    key={category._id + "subcategory"}
                  >
                    {category?.name}
                  </option>
                );
              })}
            </select>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubCategoryModel;
