
// App.js
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Header from "./componenets/Header";
import Footer from "./componenets/Footer";


import Search from "./componenets/Search";
import { HelmetProvider } from "react-helmet-async";
import Home from "./componenets/Home";
import ProductDetail from "./componenets/ProductDetail";
import ProductSearch from "./componenets/ProductSearch";
import Login from "./componenets/user/Login";
import Register from "./componenets/user/Register";
import { useEffect, useState } from "react";

import { loadUser } from "./actions/userActions";
import Profile from "./componenets/user/Profile";
import UpdateProfile from "./componenets/user/UpdateProfile";
import UpdatePassword from "./componenets/user/UpdatePassword";
import Cart from "./componenets/cart/Cart";
import Shipping from "./componenets/cart/Shipping";
import ConfirmOrder from "./componenets/cart/ConfirmOrder";

import axios from "axios";
import { Elements} from '@stripe/react-stripe-js'
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./componenets/cart/Payment";
import Paymenting from "./componenets/cart/Paymenting";
import OrderSuccess from "./componenets/cart/OrderSuccess";
import UserOrders from "./componenets/order/UserOrders";
import OvderDetail from "./componenets/order/OvderDetail";
import DashBoard from "./componenets/admin/Dashboard";
import ProductList from "./componenets/ProductList";
import NewProduct from "./componenets/admin/NewProduct";

import UpdatesProduct from "./componenets/admin/UpdatesProdocts";
import OrderList from "./componenets/admin/OrderList";
import UpdateOrder from "./componenets/admin/UpdateOrder";
import ReviewList from "./componenets/admin/ReviewList";


function App() {

  const [stripeApiKey, setStripeApikey] = useState("");
  useEffect(()=>{
     store.dispatch(loadUser)
     async function getStripeApikey(){
      const {data} = await axios.get("/api/v1/stripeapi")
      setStripeApikey(data.stripeApiKey);
     }
     getStripeApikey()
  },[])
  return (
    <div className="home">
      <Provider store={store}>
        <div>
          <Router>
            <HelmetProvider>
              <Header />
              <div>
                <ToastContainer />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/search/:keyword" element={<ProductSearch />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/myprofile" element={<Profile />} />
                  <Route path="/myprofile/update" element={<UpdateProfile />} />
                  <Route
                    path="/myprofile/update/password"
                    element={<UpdatePassword />}
                  />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/shipping" element={<Shipping />} />
                  <Route
                    path="/shipping/order/confirm"
                    element={<ConfirmOrder />}
                  />
                  {stripeApiKey && (
                    <Route
                      path="/paymenting"
                      element={
                        <Elements stripe={loadStripe(stripeApiKey)}>
                          <Paymenting />
                        </Elements>
                      }
                    />
                  )}
                  <Route path="/order/success" element={<OrderSuccess />} />
                  <Route path="/orders" element={<UserOrders />} />
                  <Route path="/order/:id" element={<OvderDetail />} />
                </Routes>
              </div>
              <Routes>
                <Route path="/admin/dashboard" element={<DashBoard />} />
                <Route path="/admin/products" element={<ProductList />} />
                <Route path="/admin/newproduct" element={<NewProduct />} />
                <Route
                  path="/admin/products/:id"
                  element={<UpdatesProduct />}
                />
                <Route path="/admin/orders" element={<OrderList />} />
                <Route path="/admin/order/:id" element={<UpdateOrder />} />
                <Route path="/admin/reviews" element={<ReviewList />} />
              </Routes>
              <Footer />
            </HelmetProvider>
          </Router>
        </div>
      </Provider>
    </div>
  );
}

export default App;
