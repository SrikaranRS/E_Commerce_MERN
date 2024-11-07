import React, { useState, useEffect } from "react";
import logo from "../../Images/ARRo-removebg-preview.png";
import MetaData from "../Layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Layouts/Loader";
import {updatePassword} from "../../actions/userActions";
//import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { loading,error, message } = useSelector(
    (state) => state.authState
  );
 // const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      setSuccessMessage("");
      setErrorMessage(error);
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
    }

    if (message) {
      setSuccessMessage(message);
      setTimeout(() => {
        setSuccessMessage("");
      }, 4000);
    }
  }, [error, message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMessage("New passwords do not match");
      return;
    }
    dispatch(updatePassword(oldPassword, newPassword));
    /*   setSuccessMessage(message) */
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  /* 
  useEffect(() => {
    if (isUpdated) {
      dispatch(loadUser()); // Optionally load user data on success
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
    if (error) {
      setErrorMessage(error);
      dispatch(clearError());
      // Optionally check for specific error codes to handle navigation
      // Uncomment if you want to navigate on specific errors
      // if (error === 'Unauthorized') {
      //   navigate('/login');
      // }
    }
  }, [isUpdated, error, dispatch, navigate]);
 */
  if (loading) return <Loader />;

  return (
    <div>
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
      <div
        className="container-fluid vh-100 d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "white", flexDirection: "" }}
      >
        <MetaData title="Change Password" />

        <div
          className="card p-4"
          style={{
            width: "25rem",
            backgroundColor: "#f0f9ff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <img
            src={logo}
            alt="logo"
            className="img-fluid mx-auto"
            style={{ height: "60px", width: "100px" }}
          />

          <h4 className="text-center text-info mt-3">Change Password</h4>

          <form onSubmit={handleSubmit} className="mt-3">
            <div className="mb-4">
              <label htmlFor="old-password" className="form-label text-center">
                Old Password
              </label>
              <input
                type="password"
                className="form-control"
                id="old-password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="new-password" className="form-label text-center">
                New Password
              </label>
              <input
                type="password"
                className="form-control"
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="confirm-password"
                className="form-label text-center"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-info w-100"
              style={{ color: "white" }}
            >
              Change Password
            </button>
          </form>

          <div className="mt-3 text-center">
            <a href="/profile" className="text-info">
              Back to Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
