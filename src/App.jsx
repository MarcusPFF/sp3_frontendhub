import { createBrowserRouter, RouterProvider } from "react-router";
import { Auth } from "./security/Auth";
import RequireAuth from "./security/RequireAuth";
import RequireAdmin from "./security/RequireAdmin";
import Layout from "./components/header/Layout";
import Home from "./components/pages/Home/Home";
import Recipes from "./components/pages/Recipes/Recipes";
import Ingredients from "./components/pages/Ingredients/Ingredients";
import Admin from "./components/pages/Admin/Admin";
import About from "./components/pages/About/About";
import Login from "./components/pages/Login/Login";
import Error404 from "./components/pages/Error404/Error404";

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
