import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddressModel from "../components/AddressModel";
import { MdDelete } from "react-icons/md";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummeryApi from "../common/SummeryApi";
import GlobalProvider, { useGlobalContext } from "../provider/GlobalProvider";
import toast from "react-hot-toast";
import ConfirmBox from "../components/ConfirmBox";

const Address = () => {
  const addressList = useSelector((state) => state.addresses.addressList);
  const [addressOpen, setAddressOpen] = useState(false);
  const [selectAddress, setSelectAddress] = useState(0);
  const [deleteId, setDeleteId] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const { fetchAddress } = useGlobalContext();

  const deleteAddress = async () => {
    try {
      const response = await Axios({
        ...SummeryApi.deleteAddress,
        data: { _id: deleteId },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  return (
    <div className="">
      <div className="flex justify-center my-3">
        <h1 className="text-xl text-gray-600 font-semibold">Addresses</h1>
      </div>
      <div className="lg:w-[79vw] py-2 lg:px-10 px-3 mt-5 rounded bg-white">
        {addressList.map((address, index) => {
          return (
            <div
              key={index}
              className="border rounded w-full px-5 flex justify-between gap-10 py-2 my-5 border-gray-400"
            >
              <div>
                <p>{address.address_line}</p>
                <p>{address.city}</p>
                <p>{address.state}</p>
                <p>
                  {address.country} - {address.pincode}
                </p>
                <p>{address.mobile}</p>
              </div>

              <button
                onClick={() => {
                  setDeleteId(address?._id);
                  setOpenConfirm(true);
                }}
                className="cursor-pointer h-fit bg-red-300 p-2 rounded"
              >
                <MdDelete size={24} color="black" />
              </button>
            </div>
          );
        })}
      </div>
      <div
        onClick={() => setAddressOpen(true)}
        className="lg:w-[73vw] lgmx-10 mx-3 border my-5 rounded border-dashed border-green-500 flex justify-center items-center py-5 cursor-pointer"
      >
        <h1 className="text-green-500 font-semibold text-xl"> ADD ADDRESS</h1>
      </div>

      {addressOpen && <AddressModel close={() => setAddressOpen(false)} />}

      {openConfirm && (
        <ConfirmBox
          close={() => setOpenConfirm(false)}
          refresh={fetchAddress}
          confirm={deleteAddress}
        />
      )}
    </div>
  );
};

export default Address;
