import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "../Home";

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRoutes;
