import { createBrowserRouter } from "react-router-dom";

import Main from "../Layout/Main";
import Login from "../Pages/Authentication/Login";
import DashboardLayout from "../Layout/DashboardLayout";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import ProductDetails from "../Pages/Dashboard/ProductDetails";
import SelectMethod from "../Pages/Authentication/SelectMethod";
import Verification from "../Pages/Authentication/Verification";
import OTPVerification from "../Pages/Authentication/OTPVerification";
import Projects from "../Pages/Dashboard/Projects/Projects";
import Reports from "../Pages/Dashboard/Reports";
import Request from "../Pages/Dashboard/Request";
import Settings from "../Pages/Dashboard/Settings/Settings";
import TearmAndConditions from "../Pages/Dashboard/Settings/TearmAndConditions";
import ChangePassword from "../Pages/Dashboard/Settings/ChangePassword";
import ResetPassword from "../Pages/Authentication/ResetPassword";
import Unauthorized from "../Pages/Unauthorized/Unauthorized";
import PrivetRoute from "../Pages/PrivetRoute/PrivetRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/select_method",
        element: <SelectMethod />,
      },
      {
        path: "/verification/:method",
        element: <Verification />,
      },
      {
        path: "/otp_validation/:method",
        element: <OTPVerification />,
      },
      {
        path: "/reset_password/",
        element: <ResetPassword />,
      },
      {
        path: "/unauthorized/",
        element: <Unauthorized />,
      },
    ],
  },

  {
    path: "/dashboard",

    element: <PrivetRoute />,
    children: [{
      element: <DashboardLayout />,
      children: [
        {
          index: true,
          element: <DashboardHome />,
        },
        {
          path: "product_details/:id",
          element: <ProductDetails />,
        },
        {
          path: "projects",
          element: <Projects />,
        },
        {
          path: "reports",
          element: <Reports />,
        },
        {
          path: "request",
          element: <Request />,
        },
        {
          path: "settings",
          element: <Settings />,
        },

        {
          path: "terms",
          element: <TearmAndConditions />,
        },

        {
          path: "change_password",
          element: <ChangePassword />,
        },

      ],
    }]
  },
]);
