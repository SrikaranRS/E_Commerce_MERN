import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../Images/ARRo-removebg-preview.png";
import Search from "./Search";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loading } = useSelector((state) => state.loginState);

  return (
    <header className="bg-info-subtle py-3 shadow">
      <div className="container d-flex flex-wrap align-items-center">
        <div className="logo col-4 col-sm-3 pe-3">
          <img
            src={logo}
            alt="logo"
            onClick={() => {
              navigate("/");
            }}
            className="img-fluid"
            style={{ maxHeight: "80px", cursor: "pointer" }}
          />
        </div>
        <div className="nav col-12 col-sm-6 d-flex justify-content-between align-items-center">
          <Search />
        </div>
        {location.pathname !== "/login" && location.pathname !== "/signup" && location.pathname !== "/forgotpassword" ? (
          <div className="col-12 col-sm-3 d-flex justify-content-end mt-2 mt-sm-0">
            <a href="/login" className="btn btn-warning me-2">
              Login
            </a>
            <a href="/signup" className="btn btn-light">
              Sign Up
            </a>
          </div>
        ):
        (
          <div className="col-12 col-sm-3 d-flex justify-content-end mt-2 mt-sm-0">
          <a href="/" className="btn btn-light">
            Home
          </a>
        </div>
          
        )}
      
      </div>
    </header>
  );
};

export default Header;
