import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import UploadImage from "../utils/UploadImage";
import Loading from "../components/Loading";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";

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
  });

  const [selectCategory, setSelectCategory] = useState("");
  const [selectSubCategory, setSelectSubCategory] = useState("");

  const [imageLoading, setImageLoading] = useState(false);
  const allCategory = useSelector((state) => state.product.allCategory);
  const allSubCategory = useSelector((state) => state.product.allSubCategory);

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

    setImageLoading(true);

    const response = await UploadImage(file);
    const { data: ImageResponse } = response;

    const imageUrl = ImageResponse.data.url;

    setData((prev) => {
      return {
        ...prev,
        image: [...prev.image, imageUrl],
      };
    });

    setImageLoading(false);

    console.log(file);
  };

  const handleDelete = async (index) => {
    data.image.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
      };
    });
  };

  const handleCateDelete = async (index) => {
    data.category.splice(index, 1);

    setData((prev) => {
      return {
        ...prev,
      };
    });
  };

  const handleSubCateDelete = async (index) => {
    data.subCategory.splice(index, 1);

    setData((prev) => {
      return {
        ...prev,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  console.log(data);

  return (
    <div>
      <div className="lg:h-16 h-14 lg:w-[80vw] px-5 w-full shadow-md lg:pl-10 lg:pr-16 flex justify-between items-center">
        <h1 className="lg:text-2xl text-xl font-bold text-gray-500">
          Upload Products
        </h1>
      </div>{" "}
      <form className="px-5 pr-20 mt-5" onSubmit={handleSubmit} action="">
        <div className="flex flex-col gap-2 mt-5">
          <label className="text-xl font-semibold text-gray-500" htmlFor="">
            Name :
          </label>
          <input
            id="name"
            name="name"
            value={data.name}
            onChange={handleChange}
            className="border  text-gray-900 font-semibold h-10 outline-nonebg-blue-50 bg-blue-50 rounded border-gray-500 px-5"
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
            className="border outline-none bg-blue-50  text-gray-900 font-semibold resize-none h-20 pt-2 rounded border-gray-500 px-5"
            placeholder="Enter Product Description"
            type="text"
            required
          />
        </div>

        <div className="mt-3 flex flex-col gap-2">
          <label className="text-xl font-semibold text-gray-500">Image</label>
          <div>
            <label
              htmlFor="productImage"
              className="bg-blue-50 h-24 border rounded flex justify-center items-center cursor-pointer"
            >
              <div className="flex justify-center items-center gap-1 flex-col">
                {imageLoading ? (
                  <Loading />
                ) : (
                  <>
                    <FaCloudUploadAlt size={35} />
                    <p className="text-sm text-gray-600">Upload Image</p>
                  </>
                )}
              </div>

              <input
                type="file"
                id="productImage"
                className="hidden"
                accept="image/*"
                onChange={handleUploadImage}
              />
            </label>
            <div className="my-3 flex gap-2">
              {data.image.map((img, index) => {
                return (
                  <div
                    key={index}
                    className="h-20 relative w-20 min-w-20 bg-blue-50 border border-gray-200 p-2"
                  >
                    <img
                      src={img}
                      className="w-20 h-20 object-contain"
                      alt="Product Image"
                    />

                    <div
                      onClick={() => handleDelete(index)}
                      className="absolute top-0 right-0 cursor-pointer rounded-full"
                    >
                      <IoClose className="text-red-500" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xl font-semibold text-gray-500" htmlFor="">
            Category
          </label>

          <div>
            <select
              value={selectCategory}
              className="p-2 border w-full border-neutral-400 rounded outline-none text-gray-900 font-semibold bg-blue-50"
              onChange={(e) => {
                const value = e.target.value;
                const category = allCategory.find((el) => el._id === value);

                if (
                  category &&
                  !data.category.some((c) => c._id === category._id)
                ) {
                  setData((prev) => ({
                    ...prev,
                    category: [...prev.category, category],
                  }));
                }
                setSelectCategory("");
                console.log("Updated Data:", data);
              }}
            >
              <option value="">Select Category</option>
              {allCategory.map((c, index) => {
                return (
                  <option key={index} value={c?._id}>
                    {c.name}
                  </option>
                );
              })}
            </select>

            <div className="flex gap-2 mt-2">
              {data.category.map((c, index) => {
                return (
                  <div
                    key={c + index}
                    className="shadow-lg px-2 py-1 flex justify-center gap-2 items-center"
                  >
                    <p>{c.name}</p>
                    <IoClose
                      className="cursor-pointer"
                      onClick={() => handleCateDelete(index)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-5">
          <label className="text-xl font-semibold text-gray-500" htmlFor="">
            Sub Category
          </label>

          <div>
            <select
              value={selectSubCategory}
              className="p-2 border w-full border-neutral-400 rounded outline-none text-gray-900 font-semibold bg-blue-50"
              onChange={(e) => {
                const value = e.target.value;
                const subCategory = allSubCategory.find(
                  (el) => el._id === value
                );

                if (
                  subCategory &&
                  !data.subCategory.some((c) => c._id === subCategory._id)
                ) {
                  setData((prev) => ({
                    ...prev,
                    subCategory: [...prev.subCategory, subCategory],
                  }));
                }
                setSelectSubCategory("");
                console.log("Updated Data:", data);
              }}
            >
              <option value="">Select Sub Category</option>
              {allSubCategory.map((c, index) => {
                return (
                  <option key={index} value={c?._id}>
                    {c.name}
                  </option>
                );
              })}
            </select>

            <div className="flex gap-2 mt-2">
              {data.subCategory.map((c, index) => {
                return (
                  <div
                    key={c + index}
                    className="shadow-lg px-2 py-1 flex justify-center gap-2 items-center"
                  >
                    <p>{c.name}</p>
                    <IoClose
                      className="cursor-pointer"
                      onClick={() => handleSubCateDelete(index)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-5">
          <label className="text-xl font-semibold text-gray-500" htmlFor="">
            Unit
          </label>
          <input
            id="unit"
            name="unit"
            value={data.unit}
            onChange={handleChange}
            className="border  text-gray-900 font-semibold h-10 outline-nonebg-blue-50 bg-blue-50 rounded border-gray-500 px-5"
            placeholder="Enter Product Unit"
            type="text"
            required
          />
        </div>

        <div className="flex flex-col gap-2 mt-5">
          <label className="text-xl font-semibold text-gray-500" htmlFor="">
            No of Stock :
          </label>
          <input
            id="stock"
            name="stock"
            value={data.stock}
            onChange={handleChange}
            className="border  text-gray-900 font-semibold h-10 outline-nonebg-blue-50 bg-blue-50 rounded border-gray-500 px-5"
            placeholder="Enter Product Stock"
            type="number"
            required
          />
        </div>

        <div className="flex flex-col gap-2 mt-5">
          <label className="text-xl font-semibold text-gray-500" htmlFor="">
            Price :
          </label>
          <input
            id="price"
            name="price"
            value={data.price}
            onChange={handleChange}
            className="border  text-gray-900 font-semibold h-10 outline-nonebg-blue-50 bg-blue-50 rounded border-gray-500 px-5"
            placeholder="Enter Product Price"
            type="number"
            required
          />
        </div>

        <div className="flex flex-col gap-2 mt-5">
          <label className="text-xl font-semibold text-gray-500" htmlFor="">
            Disscount :
          </label>
          <input
            id="disscount"
            name="disscount"
            value={data.disscount}
            onChange={handleChange}
            className="border  text-gray-900 font-semibold h-10 outline-nonebg-blue-50 bg-blue-50 rounded border-gray-500 px-5"
            placeholder="Enter Product Stock"
            type="number"
            required
          />
        </div>

        <button className="my-10 bg-green-600 hover:bg-green-700 w-full py-2 text-white font-bold cursor-pointer rounded ">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default UploadProduct;
