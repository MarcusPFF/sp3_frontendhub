import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import Ingredients from "./pages/Ingredients";
import About from "./pages/About";
import Login from "./pages/Login";
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
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

