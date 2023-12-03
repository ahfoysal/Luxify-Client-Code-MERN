import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import App from "../App";
import NotFound from "../pages/NotFound";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import PrivateRoute from "./PrivateRoute";
import AboutUs from "../pages/AboutUs";
import Checkout from "../pages/Checkout";
import AddProduct from "../pages/AddProduct";
import UpdateProduct from "../pages/UpdateProduct";
import ProductDetail from "../pages/ProductDetail";
import Products from "../pages/Products";
import Cart from "../pages/Cart";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        path: "/",
        element: <Home />,
        loader: () => fetch("/brands.json"),
      },
      {
        path: "/login",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/products",
        loader: () => fetch("/brands.json"),

        element: <Products />,
      },
      {
        path: "/add",
        loader: () => fetch("/brands.json"),

        element: (
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "/update/:id",
        loader: () => fetch("/brands.json"),

        element: (
          <PrivateRoute>
            <UpdateProduct />
          </PrivateRoute>
        ),
      },

      {
        path: "/product/:id",

        element: (
          <PrivateRoute>
            <ProductDetail />
          </PrivateRoute>
        ),
      },

      {
        path: "/cart/",

        element: (
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        ),
      },

      {
        path: "/checkout/",

        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default routes;
