import { createBrowserRouter } from "react-router-dom";
import Login from "@/pages/LoginPage";
import AdminLayout from "@/pages/Admin";
import InterfaceInfo from "@/pages/Admin/InterfaceInfo";
import UserInfo from "@/pages/Admin/UserInfo";
import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/HomePage";
import AuthLayout from "@/layouts/AuthLayout";
import RegisterPage from "@/pages/RegisterPage";

// 后续可以根据需求在此添加子路由，例如 /market, /docs 等
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      }
    ]
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ]
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <InterfaceInfo />,
      },
      {
        path: "interface_info",
        element: <InterfaceInfo />,
      },
      {
        path: "user_info",
        element: <UserInfo />,
      },
    ],
  },
  {
    path: "/user",
  }
]);

export default router;
