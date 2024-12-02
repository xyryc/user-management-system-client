import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AllData from "../pages/AllData";
import AddUser from "../pages/AddUser";
import UpdateUser from "../pages/UpdateUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <AllData />,
        loader: () =>
          fetch("https://user-management-system-server-nine.vercel.app/users"),
      },
      {
        path: "/adduser",
        element: <AddUser />,
      },
      {
        path: "/updateuser/:id",
        element: <UpdateUser />,
        loader: ({ params }) =>
          fetch(
            `https://user-management-system-server-nine.vercel.app/users/${params.id}`
          ),
      },
    ],
  },
]);

export default router;
