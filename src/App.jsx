import { createBrowserRouter, RouterProvider } from "react-router";
import { Auth } from "./security/Auth";
import RequireAuth from "./security/RequireAuth";
import RequireAdmin from "./security/RequireAdmin";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import Ingredients from "./pages/Ingredients";
import Admin from "./pages/Admin";
import About from "./pages/About";
import Login from "./pages/Login";
import Error404 from "./pages/Error404";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "recipes", element: <Recipes /> },
      { path: "ingredients", element: <Ingredients /> },
      { path: "about", element: <About /> },
      { path: "login", element: <Login /> },
      {
        path: "admin",
        element: <RequireAdmin element={<Admin />} />,
      },
      { path: "*", element: <Error404 /> },
    ],
  },
]);

export default function App() {
  return (
    <Auth>
      <RouterProvider router={router} />
    </Auth>
  );
}
