import React, { useState, useEffect } from "react";
import logo from "../../Images/ARRo-removebg-preview.png";
import MetaData from "../Layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearError } from "../../actions/userActions";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { error, message } = useSelector((state) => state.authState);

  useEffect(() => {
    if (error) {
      setSuccessMessage("");
      setErrorMessage(error);
      setTimeout(() => {
        setErrorMessage("");
        dispatch(clearError()); // Clear error from Redux store
      }, 4000);
    }

    if (message) {
      setSuccessMessage(message);
      setTimeout(() => {
        setSuccessMessage("");
      }, 4000);
    }
  }, [error, message, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  return (
    <>
      {errorMessage && (
        <div
          className="alert alert-danger text-center mt-3 w-50"
          style={{ width: "100%", margin: "0 auto" }}
          role="alert"
        >
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div
          className="alert alert-success text-center mt-3 w-50"
          style={{ width: "100%", margin: "0 auto" }}
          role="alert"
        >
          {successMessage}
        </div>
      )}
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: "white" }}>
      <MetaData title="Forgot Password" />
      <div className="card p-4" style={{ width: "25rem", backgroundColor: "#f0f9ff", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <img src={logo} alt="logo" className="img-fluid mx-auto" style={{ height: "60px", width: "100px" }} />
        
        <h4 className="text-center text-info mt-3">Forgot Password</h4>


        <form onSubmit={handleSubmit}>
          <div className="mb-4"> 
            <label htmlFor="email" className="form-label text-center">Email address</label>
            <input 
              type="email" 
              className="form-control" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
       
          <button type="submit" className="btn btn-info w-100" style={{ color: "white" }}>Send Mail</button>
        </form>
      </div>
    </div></>
  );
};

export default ForgotPassword;
