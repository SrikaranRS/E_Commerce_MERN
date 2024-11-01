import React, { useEffect, useState } from "react";
import logo from "../../Images/ARRo-removebg-preview.png";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Layouts/Loader";
import MetaData from "../Layouts/MetaData";
import { clearError, register } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";

const avatars = [
  { src: "/images/avatar/boy.png", label: "Boy" },
  { src: "/images/avatar/girl.png", label: "Girl" },
  { src: "/images/avatar/woman.png", label: "Woman" },
  { src: "/images/avatar/gamer.png", label: "Gamer" },
  { src: "/images/avatar/woman(2).png", label: "Woman" },
  { src: "/images/avatar/hacker.png", label: "Techie" },
  
];

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const { loading, error, isAuthenticated } = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    
    dispatch(clearError())
    if (isAuthenticated) {
        navigate("/login"); 
    
    }
    if (error) {
      setErrorMessage(error);
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
    }
  }, [error,isAuthenticated, navigate,dispatch]);


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password, avatar));
  };

  if (loading) return <Loader />;

  return (
    < >
    <div className="p-4">
      <MetaData title="Signup" />

      {errorMessage && (
        <div
          className="alert alert-danger text-center mt-4"
          style={{ width: "400px", margin: "0 auto" }}
          role="alert"
        >
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div
          className="alert alert-success text-center mt-4"
          style={{ width: "400px", margin: "0 auto" }}
          role="alert"
        >
          {successMessage}
        </div>
      )}

      <div className="container-fluid vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: "white" }}>
        <div className="card p-4" style={{ width: "25rem", backgroundColor: "#f0f9ff", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
          <img src={logo} alt="logo" className="img-fluid mx-auto" style={{ height: "60px", width: "100px" }} />
          <h4 className="text-center text-info mt-3">Sign Up</h4>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="avatar" className="form-label">Choose an Avatar</label>
              <div className="d-flex align-items-center">
                <select
                  className="form-select me-2"
                  id="avatar"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  required
                >
                  <option value="">Select an avatar</option>
                  {avatars.map((avatarOption, index) => (
                    <option key={index} value={avatarOption.src}>
                      {avatarOption.label}
                    </option>
                  ))}
                </select>
                {avatar && (
                  <img
                    src={avatar}
                    alt="Selected Avatar"
                    style={{ width: "60px", height: "50px", borderRadius: "50%" }}
                  />
                )}
              </div>
            </div>
            <button type="submit" className="btn btn-info w-100" style={{ color: "white" }}>
              Sign Up
            </button>
          </form>

          <div className="mt-3 text-center">
            <a href="/login" className="text-info">Already have an account? Login</a>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Signup;
