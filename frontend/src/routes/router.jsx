import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../error-page.jsx";
import Login from "../pages/Login/index.jsx";

import Home from "../components/Home/index.jsx";
import RoleList from "../pages/User/RoleList/index.jsx";
import Layout from "../pages/User/Layout/index.jsx";
import AdminLayout from "../pages/Admin/index.tsx";
import AdminInterfaceInfo from "../pages/Admin/InterfaceInfo/index.tsx";
import AdminUserInfo from "../pages/Admin/UserInfo";
import Welcome from "../pages/Home/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/layout",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/layout/role",
        element: <RoleList />,
      },
      {
        path: "/layout/apiAdmin",
        element: <RoleList />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <h1>Hello, Admin!</h1>,
      },
      {
        path: "/admin/interfaceinfo",
        element: <AdminInterfaceInfo />,
      },
      {
        path: "/admin/userInfo",
        element: <AdminUserInfo />
      }
    ],
  },
]);

export default router;
