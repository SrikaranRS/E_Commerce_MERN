import React, { useState } from 'react';
import logo from '../../Images/ARRo-removebg-preview.png';

const Login = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
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
          <a href="/forgotpassword" className="text-info">Forgot password?</a><br/><br/>
          <a href="/signup" className="text-info">Don't have an account? SignUp </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
