import React, { useState } from "react";
import { validUrl } from "../utils/ValidUrl";
import { Link } from "react-router-dom";
import AddToCartButton from "./AddToCartButton";

const CardProduct = ({ product }) => {

  return (
    <Link
      to={`/product/${validUrl(product.name)}-${product._id}`}
      className="shadow my-2 border-gray-50 border flex flex-col justify-between object-scale-down w-48 p-2 px-3 rounded cursor-pointer bg-white"
    >
      <div>
        <img src={product?.image[0]} alt="" />
      </div>

      <div className=" flex flex-col">
        <p className="bg-gray-100 text-[10px] w-fit px-2 rounded-lg">30 MINS</p>
        <div className="text-sm font-semibold my-2 h-12">
          <p>{product.name}</p>
        </div>
      </div>

      <div className=" text-xs text-gray-500 font-semibold">
        <p>{product.unit}</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <p className="text-sm font-bold text-gray-700">₹{product.price}</p>

        <AddToCartButton product={product} />
      </div>
    </Link>
  );
};

export default CardProduct;
