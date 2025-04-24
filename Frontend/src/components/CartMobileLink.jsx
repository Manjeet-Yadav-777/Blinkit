import React from "react";
import { useGlobalContext } from "../provider/GlobalProvider";
import { TiShoppingCart } from "react-icons/ti";
import { GoTriangleRight } from "react-icons/go";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CartMobileLink = () => {
  const { totalPrice, totalQty } = useGlobalContext();
  const cartItem = useSelector((state) => state.cartItem.cart);
  return (
    <>
      {cartItem[0] && (
        <div className="w-full sticky bottom-2 p-2 lg:hidden md:block">
          <div className="bg-green-700 w-full p-2 rounded-xl text-neutral-100 flex justify-between px-3">
            <div className="flex items-center gap-5">
              <div className="bg-green-500 h-fit w-fit p-2 rounded-xl">
                <TiShoppingCart size={26} />
              </div>

              <div className="font-semibold">
                <p>{totalQty} Items</p>
                <p>₹ {totalPrice}</p>
              </div>
            </div>

            <Link
              to={"/cart"}
              className="flex items-center justify-center font-bold"
            >
              View Cart <GoTriangleRight />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CartMobileLink;
