import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../error-page.jsx";
import Login from "../pages/Login/index.jsx";

import Home from "../components/Home/index.jsx";
import RoleList from "../pages/RoleList/index.jsx";
import Layout from "../pages/Layout/index.jsx";
import AdminLayout from "../pages/Admin/index.tsx";
import AdminInterfaceInfo from "../pages/Admin/InterfaceInfo/index.tsx";
import Welcome from "../pages/Index/index.tsx";

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
    children: [
      {
        index: true,
        element: <h1>Hello, Admin!</h1>,
      },
      {
        path: "/admin/interfaceinfo",
        element: <AdminInterfaceInfo />,
      },
    ],
  },
]);

export default router;
