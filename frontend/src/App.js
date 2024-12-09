import React, { useEffect, useState } from "react";
import Footer from "./Components/Layouts/Footer";
import Header from "./Components/Layouts/Header";
import ProductPage from "./Components/Layouts/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ProductDetail from "./Components/Product/ProductDetail";
import ProductSearch from "./Components/Product/ProductSearch";
import Login from "./Components/User/Login";
import Signup from "./Components/User/Signup";
import ForgotPassword from "./Components/User/ForgotPassword";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./actions/userActions";
import Cookies from 'js-cookie';
import EditProfile from "./Components/User/EditProfile";
import Profile from "./Components/User/Profile";
import ProtectedRoute from "./Components/route/ProtectedRoute";
import ChangePassword from "./Components/User/ChangePassword";
import ResetPassword from "./Components/User/ResetPassword";
import CartItems from "./Components/Cart/CartItems";
import ShippingInfoPage from "./Components/Cart/Shipping";
import ConfirmOrder from "./Components/Cart/ConfirmOrder";
import Payment from "./Components/Cart/Payment";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authState);
  const [stripeApiKey, setStripeApiKey] = useState(null);
  const [isStripeKeyLoaded, setIsStripeKeyLoaded] = useState(false); // Track if the Stripe key is loaded

  useEffect(() => {
    dispatch(loadUser()); 
    
    async function getApiStripe() {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token, 
        },
      };

      try {
        const response = await axios.get('http://localhost:5010/api/v1/payment/stripeapi', config);
        if (response.data.stripeApiKey) {
          setStripeApiKey(response.data.stripeApiKey);
          setIsStripeKeyLoaded(true); // Update state once the Stripe API key is loaded
        } else {
          console.error("Stripe API key not found in response");
        }
      } catch (error) {
        console.error("Error fetching Stripe API key:", error);
      }
    }

    getApiStripe();
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      Cookies.set('token', token, { expires: 7 });
      localStorage.setItem('token', token);
    } else {
      Cookies.remove('token');
      localStorage.removeItem('token');
    }
  }, [token]);

  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <main className="flex-fill">
          <HelmetProvider>
            <Header />
            <Routes>
              <Route path="/" element={<ProductPage />} />
              <Route path="/productDetails/:id" element={<ProductDetail />} />
              <Route path="/product/:keyword" element={<ProductSearch />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/password/reset/:token" element={<ResetPassword />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/profile/editprofile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
              <Route path="/profile/changepassword" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
              <Route path="/cart" element={<CartItems />} />
              <Route path="/shipping" element={<ProtectedRoute><ShippingInfoPage /></ProtectedRoute>} />
              <Route path="/order/confirm" element={<ProtectedRoute><ConfirmOrder /></ProtectedRoute>} />

              {/* Only render the payment route if the Stripe API key is loaded */}
              {isStripeKeyLoaded ? (
                <Route 
                  path='/order/payment' 
                  element={
                    <ProtectedRoute>
                      <Elements stripe={loadStripe(stripeApiKey)}>
                        <Payment />
                      </Elements>
                    </ProtectedRoute>
                  } 
                />
              ) : (
                <Route path='/order/payment' element={<div>Loading Stripe...</div>} />
              )}
            </Routes>
          </HelmetProvider>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
 