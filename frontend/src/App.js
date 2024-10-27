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


function App() {
  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">   
        
        <main className="flex-fill">
          <HelmetProvider>
          <Header />
            <Routes>
              <Route path="/" element={<ProductPage />} />
              <Route path="/productDetails/:id" element={<ProductDetail/>}/>
              <Route path="/product/:keyword" element={<ProductSearch/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/forgotpassword" element={<ForgotPassword/>}/>
            </Routes>
          </HelmetProvider>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
