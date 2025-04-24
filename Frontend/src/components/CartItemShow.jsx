import React from "react";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../provider/GlobalProvider";
import { useSelector } from "react-redux";
import { GoTriangleRight } from "react-icons/go";
import AddToCartButton from "./AddToCartButton";
import { TiShoppingCart } from "react-icons/ti";

const CartItemShow = ({ close }) => {
  const { totalPrice, totalQty } = useGlobalContext();
  const cartItem = useSelector((state) => state.cartItem.cart);

  return (
    <section className=" bg-neutral-900/70 fixed top-0 overflow-y-auto bottom-0 right-0 left-0">
      <div className="bg-white h-auto lg:w-full lg:overflow-y-auto lg:max-w-md lg:min-h-screen lg:max-h-screen min-h-[100vh] lg:ml-auto">
        <div className="shadow-lg sticky top-0 bg-white flex h-14 items-center justify-between px-5">
          <h2 className="font-semibold text-xl">Cart</h2>

          <Link
            to={"/"}
            className="lg:hidden block cursor-pointer font-semibold"
          >
            <IoClose size={20} />
          </Link>

          <Link
            onClick={close}
            className="cursor-pointer lg:block hidden font-semibold"
          >
            <IoClose size={20} />
          </Link>
        </div>

        {cartItem.length > 0 ? (
          <div>
            <div className="min-h-[calc(100vh-120px)] overflow-y-auto h-auto px-2 py-5 bg-sky-100">
              {cartItem[0] &&
                cartItem.map((item) => {
                  return (
                    <div className="rounded bg-white p-3 flex justify-between pr-10 items-center">
                      <div className="flex items-center justify-center">
                        <img
                          src={item?.productId?.image[0]}
                          alt=""
                          className="h-20 w-20"
                        />
                        <div className="text-sm flex flex-col justify-center gap-1">
                          <p className="text-neutral-900 font-semibold">
                            {item?.productId?.name?.length > 20
                              ? item.productId.name.slice(0, 20) + "..."
                              : item?.productId?.name}
                          </p>
                          <p className="text-gray-400 font-semibold">
                            {item?.productId?.unit}
                          </p>
                          <p className="text-gray-600 font-bold">
                            ₹ {item?.productId?.price}
                          </p>
                        </div>
                      </div>

                      <div>
                        <AddToCartButton product={item?.productId} />
                      </div>
                    </div>
                  );
                })}

              <div className="bg-white w-full rounded px-5 py-3 mt-5">
                <h1 className="text-lg font-semibold text-gray-700">
                  Bill Details
                </h1>
                <div className="flex justify-between items-center px-3 mt-3">
                  <h2 className="font-semibold text-gray-500">Items Total</h2>
                  <p className="font-bold text-gray-600">₹ {totalPrice}</p>
                </div>

                <div className="flex justify-between items-center px-3 mt-3">
                  <h2 className="font-semibold text-gray-500">
                    Total Quantity
                  </h2>
                  <p className="font-bold text-gray-600">{totalQty}</p>
                </div>

                <div className="flex justify-between items-center px-3 mt-3">
                  <h2 className="font-semibold text-gray-500">
                    Delivery Charges
                  </h2>
                  <p className="font-bold text-green-600">Free</p>
                </div>

                <div className="flex justify-between items-center px-3 mt-3">
                  <h2 className="font-semibold text-gray-500">Grand Total</h2>
                  <p className="font-bold text-green-600">{totalPrice}</p>
                </div>
              </div>

              <div className="bg-white w-full rounded px-5 py-3 mt-3">
                <h1 className="text-lg font-bold text-gray-700">
                  Cancellation Policy
                </h1>
                <div className="flex justify-between items-center mt-3">
                  <p className="font-semibold text-sm text-gray-400">
                    Orders cannot be cancelled once packed for delivery. In case
                    of unexpected delays, a refund will be provided, if
                    applicable.
                  </p>
                </div>
              </div>
            </div>

            <div className="sticky bottom-2 w-full px-2">
              <div className="bg-green-700 rounded flex justify-between items-center px-5 py-4 text-neutral-50">
                <div className="font-bold">₹ {totalPrice}</div>

                <button className="font-semibold flex justify-center items-center gap-1 cursor-pointer">
                  PROCEED <GoTriangleRight size={18} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="min-h-[calc(100vh-120px)] w-full flex flex-col justify-center items-center">
            <TiShoppingCart size={88} />
            <Link
              to={"/"}
              className="lg:hidden block cursor-pointer font-semibold px-8 py-2 text-white mt-3 rounded bg-green-600"
            >
              SHOP NOW
            </Link>

            <Link
              onClick={close}
              className="cursor-pointer lg:block hidden font-semibold px-8 py-2 text-white mt-3 rounded bg-green-600"
            >
              SHOP NOW
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartItemShow;
