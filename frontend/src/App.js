import "./App.css";
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Payment from "./component/Cart/Payment.js";
import axios from "axios";
import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UserList from "./component/Admin/UserList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
import NotFound from "./component/layout/Not Found/NotFound";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route
          path="/account"
          element={isAuthenticated ? <Profile /> : <LoginSignUp />}
        ></Route>
        <Route
          path="/me/update"
          element={isAuthenticated ? <UpdateProfile /> : <LoginSignUp />}
        ></Route>
        <Route
          path="/password/update"
          element={isAuthenticated ? <UpdatePassword /> : <LoginSignUp />}
        ></Route>
        <Route path="/password/forgot" element={<ForgotPassword />}></Route>
        <Route
          path="/password/reset/:token"
          element={<ResetPassword />}
        ></Route>
        <Route exact path="/cart" element={<Cart />} />
        <Route
          path="/shipping"
          element={isAuthenticated ? <Shipping /> : <LoginSignUp />}
        ></Route>
        <Route
          path="/order/confirm"
          element={isAuthenticated ? <ConfirmOrder /> : <LoginSignUp />}
        ></Route>
        <Route
          path="/process/payment"
          element={
            isAuthenticated ? (
              stripeApiKey && (
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              )
            ) : (
              <LoginSignUp />
            )
          }
        ></Route>
        <Route
          path="/success"
          element={isAuthenticated ? <OrderSuccess /> : <LoginSignUp />}
        ></Route>
        <Route
          path="/orders"
          element={isAuthenticated ? <MyOrders /> : <LoginSignUp />}
        ></Route>
        <Route
          path="/order/:id"
          element={isAuthenticated ? <OrderDetails /> : <LoginSignUp />}
        ></Route>
        <Route
          path="/admin/dashboard"
          element={
            isAuthenticated && user.role === "admin" ? (
              <Dashboard />
            ) : (
              <LoginSignUp />
            )
          }
        ></Route>
        <Route
          path="/admin/products"
          element={
            isAuthenticated && user.role === "admin" ? (
              <ProductList />
            ) : (
              <LoginSignUp />
            )
          }
        ></Route>
        <Route
          path="/admin/product"
          element={
            isAuthenticated && user.role === "admin" ? (
              <NewProduct />
            ) : (
              <LoginSignUp />
            )
          }
        ></Route>
        <Route
          path="/admin/product/:id"
          element={
            isAuthenticated && user.role === "admin" ? (
              <UpdateProduct />
            ) : (
              <LoginSignUp />
            )
          }
        ></Route>
        <Route
          path="/admin/orders"
          element={
            isAuthenticated && user.role === "admin" ? (
              <OrderList />
            ) : (
              <LoginSignUp />
            )
          }
        ></Route>
        <Route
          path="/admin/order/:id"
          element={
            isAuthenticated && user.role === "admin" ? (
              <ProcessOrder />
            ) : (
              <LoginSignUp />
            )
          }
        ></Route>
        <Route
          path="/admin/users"
          element={
            isAuthenticated && user.role === "admin" ? (
              <UserList />
            ) : (
              <LoginSignUp />
            )
          }
        ></Route>
        <Route
          path="/admin/user/:id"
          element={
            isAuthenticated && user.role === "admin" ? (
              <UpdateUser />
            ) : (
              <LoginSignUp />
            )
          }
        ></Route>
        <Route
          path="/admin/reviews"
          element={
            isAuthenticated && user.role === "admin" ? (
              <ProductReviews />
            ) : (
              <LoginSignUp />
            )
          }
        ></Route>
        <Route
          path="*"
          element={
            window.location.pathname === "/process/payment" ? null : (
              <NotFound />
            )
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
