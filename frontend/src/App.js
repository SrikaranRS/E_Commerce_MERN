import "./App.css";
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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./actions/userActions";
import Cookies from 'js-cookie';
import EditProfile from "./Components/User/EditProfile";
import Profile from "./Components/User/Profile"
import ProtectedRoute from "./Components/route/ProtectedRoute"
import ChangePassword from "./Components/User/ChangePassword";
import ResetPassword from "./Components/User/ResetPassword";
import CartItems from "./Components/Cart/CartItems";
function App() {
  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.authState);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    console.log(token,'toke')
    if (token) {
      Cookies.set('token', token, { expires: 7 });
      localStorage.setItem('token', token);
    } else {
      Cookies.remove('token');
      localStorage.removeItem('token');
    }
    // eslint-disable-next-line
  }, []);



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
              <Route path="/password/reset/:token" element={<ResetPassword/>}/>
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>   
              <Route path="/profile/editprofile" element={<ProtectedRoute><EditProfile/></ProtectedRoute>}/>
              <Route path="/profile/changepassword" element={<ProtectedRoute><ChangePassword/></ProtectedRoute>}/>
              <Route path="/cart" element={<CartItems/>}/>
            </Routes>
          </HelmetProvider>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
