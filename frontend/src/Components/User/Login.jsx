import React, { useEffect, useState } from 'react';
import logo from '../../Images/ARRo-removebg-preview.png';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, login } from '../../actions/userActions';
import Loader from '../Layouts/Loader';
import MetaData from '../Layouts/MetaData';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error, isAuthenticated } = useSelector((state) => state.authState);
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearError())
    if (error) {
      setErrorMessage(error);
      setTimeout(() => {
        setErrorMessage('');
      }, 4000);
    }
  }, [error,dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (loading) return <Loader />;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  
  };

  
/* 
  useEffect(() => {
    if (token) {
      // Store token in both cookies and local storage
      Cookies.set('token', token, { expires: 7 });
      localStorage.setItem('token', token);
    } else {
      // Remove token from cookies and local storage if it doesn't exist
      Cookies.remove('token');
      localStorage.removeItem('token');
    }
  }, []); */

  return (
    <div>
      <MetaData title="Login" />

      {errorMessage && (
        <div
          className="alert alert-danger text-center mt-4"
          style={{ width: '400px', margin: '0 auto' }}
          role="alert"
          aria-live="assertive"
        >
          {errorMessage}
        </div>
      )}

      <div className="container-fluid vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'white' }}>
        <div className="card p-4" style={{ width: '25rem', backgroundColor: '#f0f9ff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <img src={logo} alt="logo" className="img-fluid mx-auto" style={{ height: '60px', width: '100px' }} />
          
          <h4 className="text-center text-info mt-3">Login</h4>

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
            <div className="mb-4">
              <label htmlFor="password" className="form-label text-center">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-info w-100" style={{ color: "white" }}>Login</button>
          </form>

          <div className="mt-3 text-center">
            <Link to="/forgotpassword" className="text-info">Forgot password?</Link><br/><br/>
            <Link to="/signup" className="text-info">Don't have an account? Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
