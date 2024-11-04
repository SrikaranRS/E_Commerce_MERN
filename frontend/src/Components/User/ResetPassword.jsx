import React, { useEffect, useState } from 'react';
import logo from '../../Images/ARRo-removebg-preview.png';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Layouts/Loader';
import { resetPassword } from '../../actions/userActions';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => { 
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { loading, user, error, isAuthenticated } = useSelector(state => state.authState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    dispatch(resetPassword(password, confirmPassword, token));
  };

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
    }

    if (isAuthenticated) {
      setSuccessMessage("Password has been reset successfully!");
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  }, [error, navigate, isAuthenticated]);

  if (loading) return <Loader />;

  return (
    <>
      {errorMessage && (
        <div className="alert alert-danger text-center mt-3 w-50" style={{ width: "100%", margin: "0 auto" }} role="alert">
          {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className="alert alert-success text-center mt-3 w-50" style={{ width: "100%", margin: "0 auto" }} role="alert">
          {successMessage}
        </div>
      )}

      <div className="container-fluid vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'white' }}>
        <div className="card p-4" style={{ width: '25rem', backgroundColor: '#f0f9ff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <img src={logo} alt="logo" className="img-fluid mx-auto" style={{ height: '60px', width: '100px' }} />
          <h4 className="text-center text-info mt-3">Reset Password</h4>
          
          <form onSubmit={handleSubmit}>
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
              <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
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
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
