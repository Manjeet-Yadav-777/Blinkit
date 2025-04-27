import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../provider/GlobalProvider";
import AddressModel from "../components/AddressModel";
import { useSelector } from "react-redux";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummeryApi from "../common/SummeryApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SelectAddress = () => {
  const addressList = useSelector((state) => state.addresses.addressList);
  const { totalPrice, totalQty } = useGlobalContext();
  const [addressOpen, setAddressOpen] = useState(false);
  const [selectAddress, setSelectAddress] = useState(0);

  const cartItemList = useSelector((state) => state.cartItem.cart);
  const navigate = useNavigate();
  const { fetchAddress, fetchCartItems } = useGlobalContext();

  const handleCashOnDelivery = async () => {
    try {
      const response = await Axios({
        ...SummeryApi.cashOnDelivery,

        data: {
          list_items: cartItemList,
          addressId: addressList[selectAddress]._id,
          totalAmt: totalPrice,
          subTotalAmt: totalPrice,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchCartItems();
        navigate("/cheakout");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  return (
    <section className="flex flex-col gap-8 lg:flex-row lg:px-10">
      <div className="lg:w-[60%]">
        <div className="bg-white p-2 mt-5 rounded">
          {addressList.map((address, index) => {
            return (
              <label htmlFor={"address" + index}>
                <div
                  key={index}
                  className="border rounded px-5 flex gap-10 py-2 my-5 border-gray-400 hover:bg-blue-50 cursor-pointer"
                >
                  <div>
                    <input
                      id={"address" + index}
                      type="radio"
                      onClick={(e) => setSelectAddress(e.target.value)}
                      name="address"
                      value={index}
                    />
                  </div>
                  <div>
                    <p>{address.address_line}</p>
                    <p>{address.city}</p>
                    <p>{address.state}</p>
                    <p>
                      {address.country} - {address.pincode}
                    </p>
                    <p>{address.mobile}</p>
                  </div>
                </div>
              </label>
            );
          })}
        </div>
        <div className="mx-3">
          <div
            onClick={() => setAddressOpen(true)}
            className="lg:w-full w-[100%] border my-5 rounded border-dashed border-green-500 flex justify-center items-center py-5 cursor-pointer"
          >
            <h1 className="text-green-500 font-semibold text-xl">
              {" "}
              ADD ADDRESS
            </h1>
          </div>
        </div>
      </div>

      <div className="lg:w-[40%] px-3">
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

          <div className="px-3 flex flex-col mt-8 justify-center items-center gap-5">
            <button
              onClick={handleCashOnDelivery}
              className="bg-green-500 rounded hover:bg-green-700 cursor-pointer w-full py-2 text-white font-semibold"
            >
              CASH ON DELIVERY
            </button>
            <button className="border w-full rounded py-2 text-green-500 font-semibold cursor-pointer hover:bg-green-500 hover:text-white">
              PAY ONLINE
            </button>
          </div>
        </div>
      </div>

      {addressOpen && <AddressModel close={() => setAddressOpen(false)} />}
    </section>
  );
};

export default SelectAddress;
