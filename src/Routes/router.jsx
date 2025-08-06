import { createBrowserRouter } from "react-router-dom";

import Main from "../Layout/Main";
import Login from "../Pages/Authentication/Login";
import DashboardLayout from "../Layout/DashboardLayout";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import ProductDetails from "../Pages/Dashboard/ProductDetails";
import SelectMethod from "../Pages/Authentication/SelectMethod";
import Verification from "../Pages/Authentication/Verification";

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
        path: "/verification",
        element: <Verification />,
      },
    ],
  },
  {
    path: "/dashboard",
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
    ],
  },
]);
