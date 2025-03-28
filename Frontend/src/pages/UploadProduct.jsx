import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import UploadImage from "../utils/UploadImage";

const UploadProduct = () => {
  const [data, setData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: [],
    stock: "",
    price: "",
    disscount: "",
    description: "",
    more_details: {},
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

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const response = await UploadImage(file);
    const { data: ImageResponse } = response;

    const imageUrl = ImageResponse.data.url;

    setData((prev) => {
      return {
        ...prev,
        image: [...prev.image, imageUrl],
      };
    });

    console.log(file);
  };
  return (
    <div>
      <div className="lg:h-16 h-14 lg:w-[80vw] px-5 w-full shadow-md lg:pl-10 lg:pr-16 flex justify-between items-center">
        <h1 className="lg:text-2xl text-xl font-bold text-gray-500">
          Upload Products
        </h1>
      </div>{" "}
      <form className="px-5 pr-20 mt-5" action="">
        <div className="flex flex-col gap-2 mt-5">
          <label className="text-xl font-semibold text-gray-500" htmlFor="">
            Name :
          </label>
          <input
            id="name"
            name="name"
            value={data.name}
            onChange={handleChange}
            className="border h-10 outline-nonebg-blue-50 bg-blue-50 rounded border-gray-500 px-5"
            placeholder="Enter Product Name"
            type="text"
            required
          />
        </div>

        <div className="flex flex-col gap-2 mt-3">
          <label className="text-xl font-semibold text-gray-500" htmlFor="">
            Description :
          </label>
          <textarea
            id="description"
            name="description"
            value={data.description}
            onChange={handleChange}
            className="border outline-none bg-blue-50 resize-none h-20 pt-2 rounded border-gray-500 px-5"
            placeholder="Enter Product Name"
            type="text"
            required
          />
        </div>

        <div className="mt-3 flex flex-col gap-2">
          <p>Image</p>
          <div>
            <label
              htmlFor="productImage"
              className="bg-blue-50 h-24 border rounded flex justify-center items-center cursor-pointer"
            >
              <div className="flex justify-center items-center gap-1 flex-col">
                <FaCloudUploadAlt size={35} />
                <p className="text-sm text-gray-600">Upload Image</p>
              </div>

              <input
                type="file"
                id="productImage"
                className="hidden"
                accept="image/*"
                onChange={handleUploadImage}
              />
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UploadProduct;
