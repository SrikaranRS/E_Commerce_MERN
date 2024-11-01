import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../Images/ARRo-removebg-preview.png";
import Search from "./Search";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../Slices/authSlice";
import { FaSignOutAlt } from "react-icons/fa"; // Import the logout icon
import "./component.css"; // Import your custom CSS file for styling
import { logoutUsers } from "../../actions/userActions";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUsers());
    
  };

  return (
    <header className="bg-info-subtle py-3 shadow">
      <div className="container d-flex flex-wrap align-items-center">
        <div className="logo col-4 col-sm-3 pe-3">
          <img
            src={logo}
            alt="Company Logo"
            onClick={() => navigate("/")}
            className="img-fluid"
            style={{ maxHeight: "80px", cursor: "pointer" }}
          />
        </div>
        <div className="nav col-12 col-sm-6 d-flex justify-content-between align-items-center">
          <Search />
        </div>
        <div className="col-12 col-sm-3 d-flex justify-content-end mt-2 mt-sm-0">
          {isAuthenticated && location.pathname !== "/login" && location.pathname !== "/forgotpassword" ? (
            <div className="dropdown">
              <div
                className=" d-flex align-items-center"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={user.avatar || "/path/to/default/avatar.png"}
                  alt={user.name}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                />
                <span className="text-dark">{user.name}</span>
              </div>
              <ul className="dropdown-menu mt-2 m" aria-labelledby="dropdownMenuButton" >
                <li>
                  <div onClick={handleLogout}className="ms-4" style={{cursor:"pointer"}}>
                    Logout
                    
                <FaSignOutAlt className="ms-4" />
                  </div>
                </li>
           
              </ul>
            </div>
          ) : (
            <>
              {location.pathname !== "/login" && location.pathname !== "/signup" && location.pathname !== "/forgotpassword" ? (
                <>
                  <Link to="/login" className="btn btn-warning me-2" style={{ minWidth: "100px" }} aria-label="Login">
                    Login
                  </Link>
                  <Link to="/signup" className="btn btn-light" style={{ minWidth: "100px" }} aria-label="Sign Up">
                    Sign Up
                  </Link>
                </>
              ) : (
                <Link to="/" className="btn btn-light" style={{ minWidth: "100px" }} aria-label="Home">
                  Home
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
