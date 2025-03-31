import React from "react";

const ProductCardAdmin = ({ data }) => {
  return (
    <div className="w-40 h-auto bg-white flex flex-col justify-between items-center px-3">
      <div>
        <img src={data.image[0]} className="h-40 object-cover" alt="" />
      </div>

      <p className="text-sm font-semibold my-1">{data.name}</p>

      <button className="bg-red-500 w-full text-white my-3 py-1 cursor-pointer">
        Delete
      </button>
    </div>
  );
};

export default ProductCardAdmin;
