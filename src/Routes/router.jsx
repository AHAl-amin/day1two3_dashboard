import { createBrowserRouter } from "react-router-dom";

import Main from "../Layout/Main";
import Login from "../Pages/Authentication/Login";
import DashboardLayout from "../Layout/DashboardLayout";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import ProductDetails from "../Pages/Dashboard/ProductDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Login />,
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
        element: <ProductDetails/>
      }
    ],
  },
]);

