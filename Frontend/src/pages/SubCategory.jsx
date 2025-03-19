import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SubCategoryModel from "../components/SubCategoryModel";

const SubCategory = () => {
  const [openSubCategory, setOpenSubCategory] = useState(false);

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

      {openSubCategory && (
        <SubCategoryModel close={() => setOpenSubCategory(false)} />
      )}
    </>
  );
};

export default SubCategory;
