import { createBrowserRouter, RouterProvider } from "react-router-dom"; // ✅ use react-router-dom
import Home from "../Home";
import Test from "../Test/Test";
import UserList from "../Test/UserList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/comments",
    element: <Test />,
  },
  {
    path: "/users",
    element: <UserList />,
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
