import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { countries } from 'countries-list'; // Import the countries-list package
import MetaData from '../Layouts/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingInfo } from '../../Slices/cartSlice';
import Stepper from './Stepper';

const ShippingInfoPage = () => {
  const { shippingInfo = {} } = useSelector(state => state.cartState);
  const { isAuthenticated } = useSelector(state => state.authState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [address, setAddress] = useState(shippingInfo.address || '');
  const [city, setCity] = useState(shippingInfo.city || '');
  const [phone, setPhone] = useState(shippingInfo.phone || '');
  const [postalcode, setPostalCode] = useState(shippingInfo.postalcode || '');
  const [country, setCountry] = useState(shippingInfo.country || '');
  const [state, setState] = useState(shippingInfo.state || '');
  const [errorMessage, setErrorMessage] = useState('');

  const redirect = location.search;

  useEffect(() => {
    if (redirect) {
      setErrorMessage('Enter Shipping Details');
      setTimeout(() => {
        setErrorMessage('');
      }, 4000);
    }
  }, [redirect]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Extract country options
  const countryOptions = Object.values(countries).map((country) => ({
    name: country.name,
    code: country.code,
  }));

  // Validate Shipping Information
  const validateShipping = () => {
    if (
      !address ||
      !city ||
      !phone ||
      !postalcode ||
      !country ||
      !state
    ) {
      setErrorMessage('Please fill all the shipping information');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateShipping()) {
      dispatch(saveShippingInfo({ address, city, phone, postalcode, country, state }));
      navigate('/order/confirm');
    }
  };

  return (
    <div>
      <MetaData title="Shipping Information" />

      {/* Stepper */}
      <Stepper currentStep={1} />

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

      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{
          minHeight: '100vh',
          paddingTop: '60px', // Ensure space from header
          paddingBottom: '60px', // Ensure space from footer
        }}
      >
        <div
          className="card p-4"
          style={{
            width: '100%',
            maxWidth: '30rem', // Max width of the card
            backgroundColor: '#f0f9ff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden', // Hide overflow for the card
          }}
        >
          <h4 className="text-center text-info mt-3">Shipping Information</h4>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="address" className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="city" className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="postalcode" className="form-label">Postal Code</label>
              <input
                type="text"
                className="form-control"
                id="postalcode"
                value={postalcode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="country" className="form-label">Country</label>
              <select
                id="country"
                className="form-control"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                <option value="">Select a Country</option>
                {countryOptions.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            {country && (
              <div className="mb-4">
                <label htmlFor="state" className="form-label">State</label>
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                />
              </div>
            )}

            <button type="submit" className="btn btn-info w-100" style={{ color: 'white' }}>
              Save Shipping Info
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShippingInfoPage;
