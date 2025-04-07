import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../components/SearchPage";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ForgotPassword from "../pages/ForgotPassword";
import OtpVerify from "../pages/OtpVerify";
import ResetPassword from "../pages/ResetPassword";
import UserMobileMenu from "../pages/UserMobileMenu";
import DashBord from "../layouts/DashBord";
import Profile from "../pages/Profile";
import MyOrders from "../pages/MyOrders";
import Address from "../pages/Address";
import Category from "../pages/Category";
import SubCategory from "../pages/SubCategory";
import UploadProduct from "../pages/UploadProduct";
import AdminPermission from "../layouts/AdminPermission";
import ProductAdmin from "../pages/ProductAdmin";
import ProductListPage from "../pages/ProductListPage";
import ProductDisplayPage from "../pages/ProductDisplayPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },

      {
        path: "login",
        element: <Login />,
      },

      {
        path: "register",
        element: <Signup />,
      },

      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },

      {
        path: "otp-verify",
        element: <OtpVerify />,
      },

      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "user",
        element: <UserMobileMenu />,
      },
      {
        path: "dashboard",
        element: <DashBord />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },

          {
            path: "myorders",
            element: <MyOrders />,
          },

          {
            path: "address",
            element: <Address />,
          },

          {
            path: "category",
            element: (
              <AdminPermission>
                <Category />
              </AdminPermission>
            ),
          },

          {
            path: "subcategory",
            element: (
              <AdminPermission>
                <SubCategory />
              </AdminPermission>
            ),
          },

          {
            path: "upload-product",
            element: (
              <AdminPermission>
                <UploadProduct />
              </AdminPermission>
            ),
          },

          {
            path: "product-admin",
            element: (
              <AdminPermission>
                <ProductAdmin />
              </AdminPermission>
            ),
          },
        ],
      },

      {
        path: ":category",
        children: [
          {
            path: ":subCategory",
            element: <ProductListPage />,
          },
        ],
      },

      {
        path: "product/:product",
        element: <ProductDisplayPage />,
      },
    ],
  },
]);

export default router;
