import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummeryApi from "../common/SummeryApi";
import toast from "react-hot-toast";

const AddressModel = ({ close }) => {
  const [data, setData] = useState({
    address_line: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",
  });

  const onChangeHandler = async (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummeryApi.addAddress,
        data: data,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);

        setData({
          address_line: "",
          city: "",
          state: "",
          pincode: "",
          country: "",
          mobile: "",
        });

        close();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="fixed z-99 overflow-y-auto w-full top-0 bottom-0 left-0 right-0 bg-neutral-900/70 flex items-center justify-center">
      <div className="bg-white mt-20 max-w-4xl overflow-y-auto w-[90%] flex gap-5 flex-col p-4 lg:px-5 rounded">
        <div className="flex">
          <h1 className="text-xl font-bold text-gray-700">Add Address</h1>
          <button
            onClick={close}
            className="w-fit ml-auto block cursor-pointer"
          >
            <IoClose size={25} />
          </button>
        </div>

        <form action="" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 my-2">
            <label htmlFor="" className="text-xl text-gray-700 font-semibold">
              Address Line :
            </label>
            <input
              autoComplete="off"
              className="border border-gray-600 outline-none py-2 rounded px-3 text-gray-500"
              type="text"
              name="address_line"
              value={data.address_line}
              onChange={onChangeHandler}
              placeholder="Enter You Street Full Address"
            />
          </div>

          <div className="flex flex-col gap-2 my-2">
            <label htmlFor="" className="text-xl text-gray-700 font-semibold">
              City :
            </label>
            <input
              autoComplete="off"
              className="border border-gray-600 outline-none py-2 rounded px-3 text-gray-500"
              type="text"
              name="city"
              value={data.city}
              onChange={onChangeHandler}
              placeholder="Enter Your City"
            />
          </div>

          <div className="flex flex-col gap-2 my-2">
            <label htmlFor="" className="text-xl text-gray-700 font-semibold">
              State :
            </label>
            <input
              autoComplete="off"
              className="border border-gray-600 outline-none py-2 rounded px-3 text-gray-500"
              type="text"
              name="state"
              value={data.state}
              onChange={onChangeHandler}
              placeholder="Enter Your State"
            />
          </div>

          <div className="flex flex-col gap-2 my-2">
            <label htmlFor="" className="text-xl text-gray-700 font-semibold">
              Pin Code :
            </label>
            <input
              autoComplete="off"
              className="border border-gray-600 outline-none py-2 rounded px-3 text-gray-500"
              type="text"
              name="pincode"
              value={data.pincode}
              onChange={onChangeHandler}
              placeholder="Enter Your Pin Code"
            />
          </div>

          <div className="flex flex-col gap-2 my-2">
            <label htmlFor="" className="text-xl text-gray-700 font-semibold">
              Country :
            </label>
            <input
              autoComplete="off"
              className="border border-gray-600 outline-none py-2 rounded px-3 text-gray-500"
              type="text"
              name="country"
              value={data.country}
              onChange={onChangeHandler}
              placeholder="Enter Your Country"
            />
          </div>

          <div className="flex flex-col gap-2 my-2">
            <label htmlFor="" className="text-xl text-gray-700 font-semibold">
              Mobile :
            </label>
            <input
              autoComplete="off"
              className="border border-gray-600 outline-none py-2 rounded px-3 text-gray-500"
              type="text"
              name="mobile"
              value={data.mobile}
              onChange={onChangeHandler}
              placeholder="Enter Your Mobile"
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 rounded cursor-pointer mt-5 w-full py-2 font-bold text-white"
          >
            Add Address
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddressModel;
