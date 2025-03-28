import React, { useState } from "react";
import { Link } from "react-router-dom";

const Product = () => {
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

  return (
    <div>
      <div className="lg:h-16 h-14 lg:w-[80vw] px-5 w-full shadow-md lg:pl-10 lg:pr-16 flex justify-between items-center">
        <h1 className="lg:text-2xl text-xl font-bold text-gray-500">
          Products
        </h1>

        <Link className="border text-md h-fit w-fit lG:px-5 lg:py-1 px-3 py-1 transition-all border-green-600 text-green-700 hover:bg-green-700 hover:text-white font-semibold">
          Upload Product
        </Link>
      </div>{" "}
    </div>
  );
};

export default Product;
