import React, { useState, useEffect } from "react";
import Search from "./Search";
import { Link, useNavigate } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import UserMenu from "./userMenu";

const Header = () => {
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const navigate = useNavigate();
  const cartItem = useSelector((state) => state.cartItem.cart);

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);

  const handleClose = async () => {
    setOpenUserMenu(false);
  };

  const user = useSelector((state) => state?.user);

  const handleMobile = async () => {
    if (!user._id) {
      navigate("/login");
      return;
    }

    navigate("/user");
  };

  useEffect(() => {
    const qty = cartItem.reduce((prev, curr) => {
      return prev + curr.quantity;
    }, 0);

    setTotalQty(qty);

    const tPrice = cartItem.reduce((prev, curr) => {
      return prev + curr.productId.price * curr.quantity;
    }, 0);

    setTotalPrice(tPrice);
  }, [cartItem]);

  return (
    <header className="lg:h-20 mx-4 lg:mx-0 lg:shadow-sm lg:sticky bg-white z-10 lg:top-0 flex lg:flex-row flex-col justify-between py-3 items-center">
      <div className="container flex justify-between items-center lg:mx-auto mx-4">
        <Link to={"/"} className="logo">
          <p className="text-4xl font-bold">
            <span className="text-yellow-400">blink</span>
            <span className="text-green-700">it</span>
          </p>
        </Link>

        <div className="lg:block desktop-search hidden search">
          <Search />
        </div>

        <div className="lg:block desktop-login-cart hidden">
          <div className="login flex justify-center items-center gap-10">
            {user?._id ? (
              <div>
                <div
                  onClick={() => setOpenUserMenu(!openUserMenu)}
                  className="text-xl font-semibold text-gray-600 cursor-pointer flex items-center gap-2"
                >
                  <p>Account</p>

                  {openUserMenu ? (
                    <GoTriangleUp size={25} />
                  ) : (
                    <GoTriangleDown size={25} />
                  )}
                </div>

                {openUserMenu && (
                  <div className="absolute right-40 top-14">
                    <div className="bg-white rounded p-4 min-w-52 lg:shadow-lg">
                      <UserMenu close={handleClose} />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to={"/login"}
                className="text-xl font-semibold text-gray-600 cursor-pointer"
              >
                Login
              </Link>
            )}

            <div className="flex justify-center items-center gap-3 bg-green-900 cursor-pointer px-5 py-3 rounded-md">
              <TiShoppingCart size={22} color="white" />
              {cartItem[0] ? (
                <p className="text-xs font-semibold text-white">
                  {totalQty} Items <br />₹ {totalPrice}
                </p>
              ) : (
                <p className="text-md font-semibold text-white">My Cart</p>
              )}
            </div>
          </div>
        </div>

        <div className="lg:hidden mobile-profile block cursor-pointer">
          <FaRegCircleUser onClick={handleMobile} size={32} />
        </div>
      </div>

      <div className="lg:hidden mobile-search block search mt-5 w-full">
        <Search />
      </div>
    </header>
  );
};

export default Header;
