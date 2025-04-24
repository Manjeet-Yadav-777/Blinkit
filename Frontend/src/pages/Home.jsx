import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FetchUserDetails from "../utils/FetchUserDetails";
import { setUserDetails } from "../store/userSlice";
import Banner from "../assets/banner.jpg";
import MobileBanner from "../assets/banner-mobile.jpg";
import { validUrl } from "../utils/ValidUrl";
import { Link, useNavigate } from "react-router-dom";
import CategoryProductDisplay from "../components/CategoryProductDisplay";
import CartMobileLink from "../components/CartMobileLink";

const Home = () => {
  const dispatch = useDispatch();
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const allCategory = useSelector((state) => state.product.allCategory);
  const allSubCategory = useSelector((state) => state.product.allSubCategory);

  const navigate = useNavigate();

  const fetchUser = async () => {
    const userData = await FetchUserDetails();
    dispatch(setUserDetails(userData.data));
  };

  const handleToRedirectProductListPage = async (id, cat) => {
    const subCategory = allSubCategory.find((sub) => {
      const filterData = sub.category.some((c) => {
        return c?._id == id;
      });

      return filterData ? true : null;
    });

    const url = `/${validUrl(cat)}-${id}/${validUrl(subCategory?.name)}-${
      subCategory?._id
    }`;

    navigate(url);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <section className="min-h-[100vh] bg-white py-5">
      <div className="min-h-48 bg-slate-200 container mx-auto rounded">
        <img src={Banner} className="lg:block hidden" alt="" />
        <img src={MobileBanner} className="block lg:hidden" alt="" />
      </div>

      <div className="container mx-auto px-4 my-2 grid grid-cols-4 md:grid-cols-4 lg:grid-cols-10 gap-5">
        {loadingCategory
          ? new Array(20).fill(null).map((c, index) => {
              return (
                <div
                  key={index}
                  className="min-h-36 p-4 bg-white min-w-30 rounded grid gap-2 shadow animate-pulse"
                >
                  <div className="bg-blue-100 min-h-20"></div>
                  <div className="bg-blue-100 h-8"></div>
                </div>
              );
            })
          : allCategory.map((c, index) => {
              return (
                <div
                  key={index}
                  className="cursor-pointer"
                  onClick={() =>
                    handleToRedirectProductListPage(c?._id, c?.name)
                  }
                >
                  <img
                    src={c?.image}
                    className="shadow object-scale-down"
                    alt=""
                  />
                </div>
              );
            })}
      </div>

      {/* display Category Products */}

      {allCategory.map((c, index) => {
        return (
          <CategoryProductDisplay key={index} id={c?._id} name={c?.name} />
        );
      })}

      <CartMobileLink />
    </section>
  );
};

export default Home;
