import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AppLayout from "./AppLayout";
import Home from "./pages/Pleaflet";
import PRecharts from "./pages/PRecharts";

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Navigate to="/leaflet" replace />,
        },
        {
          path: "leaflet",
          element: <Home />,
        },
        {
          path: "recharts",
          element: <PRecharts />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
