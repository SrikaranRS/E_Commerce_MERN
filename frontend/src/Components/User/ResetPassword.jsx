import React, { useState } from 'react';
import logo from '../../Images/ARRo-removebg-preview.png';

const Signup = () => { // Renaming to Signup if that's the intention
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add logic here to check if passwords match and to handle signup
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // Proceed with signup logic
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'white' }}>
      <div className="card p-4" style={{ width: '25rem', backgroundColor: '#f0f9ff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <img src={logo} alt="logo" className="img-fluid mx-auto" style={{ height: '60px', width: '100px' }} />
        
        <h4 className="text-center text-info mt-3">Sign Up</h4>
        
        <form onSubmit={handleSubmit}>
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
          
          <div className="mb-4">
            <label htmlFor="confirm-password" className="form-label text-center">Confirm Password</label>
            <input 
              type="password" 
              className="form-control" 
              id="confirm-password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
            />
          </div>
          
          <button type="submit" className="btn btn-info w-100" style={{ color: "white" }}>Sign Up</button>
        </form>
        
        <div className="mt-3 text-center">
          <a href="/login" className="text-info">Already have an account? Login</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
