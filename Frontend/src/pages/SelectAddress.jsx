import React, { useState } from "react";
import { useGlobalContext } from "../provider/GlobalProvider";
import AddressModel from "../components/AddressModel";

const SelectAddress = () => {
  const { totalPrice, totalQty } = useGlobalContext();
  const [addressOpen, setAddressOpen] = useState(false);
  return (
    <section className="flex flex-col gap-8 lg:flex-row px-10">
      <div className="w-[60%]">
        <div
          onClick={() => setAddressOpen(true)}
          className="w-full border my-5 rounded border-green-500 flex justify-center items-center py-5 cursor-pointer"
        >
          <h1 className="text-green-500 font-semibold text-xl"> ADD ADDRESS</h1>
        </div>
      </div>

      <div className="w-[40%]">
        <div className="bg-white w-full rounded px-5 py-3 mt-5">
          <h1 className="text-lg font-semibold text-gray-700">Bill Details</h1>
          <div className="flex justify-between items-center px-3 mt-3">
            <h2 className="font-semibold text-gray-500">Items Total</h2>
            <p className="font-bold text-gray-600">₹ {totalPrice}</p>
          </div>

          <div className="flex justify-between items-center px-3 mt-3">
            <h2 className="font-semibold text-gray-500">Total Quantity</h2>
            <p className="font-bold text-gray-600">{totalQty}</p>
          </div>

          <div className="flex justify-between items-center px-3 mt-3">
            <h2 className="font-semibold text-gray-500">Delivery Charges</h2>
            <p className="font-bold text-green-600">Free</p>
          </div>

          <div className="flex justify-between items-center px-3 mt-3">
            <h2 className="font-semibold text-gray-500">Grand Total</h2>
            <p className="font-bold text-green-600">₹ {totalPrice}</p>
          </div>
        </div>
      </div>

      {addressOpen && <AddressModel close={() => setAddressOpen(false)} />}
    </section>
  );
};

export default SelectAddress;
