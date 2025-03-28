import React from "react";
import { IoClose } from "react-icons/io5";

const ConfirmBox = ({ close, refresh, confirm }) => {
  return (
    <div className="fixed bg-neutral-800/70 top-0 right-0 left-0 bottom-0 flex justify-center items-center">
      <div className="bg-white w-full max-w-md p-4 rounded">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold">Permanent Delete</h1>
          <IoClose
            onClick={() => close()}
            size={25}
            className="cursor-pointer"
          />
        </div>

        <div className="mt-5 font-semibold text-gray-700">
          <p>Are You Sure to Delete ?</p>
        </div>

        <div className="flex justify-end mt-5 gap-5">
          <button
            onClick={() => close()}
            className="border px-5 py-1 rounded border-green-500 hover:bg-green-500 hover:text-white text-green-500 font-semibold cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              confirm();
              refresh();
              close();
            }}
            className="border px-5 py-1 rounded border-red-500 hover:bg-red-500 hover:text-white text-red-500 font-semibold cursor-pointer"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBox;
