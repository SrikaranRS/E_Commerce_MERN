import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../Images/ARRo-removebg-preview.png";
import Search from "./Search";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();/* 
  const dispatch = useDispatch();
  const { isAuthenticated,user } = useSelector((state) => state.authState);

  console.log(user,'user')
  const handleLogout = () => {
    navigate("/login"); // Redirect to the login page after logging out
  };
 */
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
        <div className="col-12 col-sm-3 d-flex justify-content-end mt-2 mt-sm-0">
       {/*    {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="btn btn-warning"
            >
              Logout
            </button>
          ) : ( */}
            <>
              {location.pathname !== "/login" && location.pathname !== "/signup" && location.pathname !== "/forgotpassword" ? (
                <>
                  <a href="/login" className="btn btn-warning me-2">
                    Login
                  </a>
                  <a href="/signup" className="btn btn-light">
                    Sign Up
                  </a>
                </>
              ) : (
                <a href="/" className="btn btn-light">
                  Home
                </a>
              )}
            </>
          
        </div>
      </div>
    </header>
  );
};

export default Header;
