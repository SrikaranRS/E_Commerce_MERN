import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"; // For prop validation
import "./cart.css"; // Import custom CSS

const Stepper = ({ currentStep }) => {
  // Helper function to determine the step's class
  const getStepClass = (step) => (currentStep >= step ? "active" : "");

  return (
    <div className="stepper-container mt-3 ms-4">
      <div className="stepper">
        {/* Step 1: Shipping Info */}
        <div className={`step ${getStepClass(1)}`}>
          <Link to="/shipping" className="step-link" aria-label="Go to Shipping Information">
            <div className={`step-icon ${getStepClass(1)} ms-3`}>
              {currentStep >= 1 ? (
                <i className="fas fa-check-circle"></i>
              ) : (
                <i className="fas fa-truck"></i>
              )}
            </div>
            <div className="step-label me-2">Shipping Info</div>
          </Link>
        </div>

        {/* Divider between Step 1 and Step 2 */}
        <div className={`step-divider ${getStepClass(2)}`}></div>

        {/* Step 2: Confirm Order */}
        <div className={`step ${getStepClass(2)} ms-3`}>
          <Link to="/order/confirm" className="step-link" aria-label="Go to Confirm Order">
            <div className={`step-icon ${getStepClass(2)} ms-3`}>
              {currentStep >= 2 ? (
                <i className="fas fa-check-circle"></i>
              ) : (
                <i className="fas fa-check"></i> // Checkmark for confirmation
              )}
            </div>
            <div className="step-label">Confirm Order</div>
          </Link>
        </div>

        {/* Divider between Step 2 and Step 3 */}
        <div className={`step-divider ${getStepClass(3)}`}></div>

        {/* Step 3: Payment Info */}
        <div className={`step ${getStepClass(3)}`}>
          <Link to="/order/payment" className="step-link" aria-label="Go to Payment Information">
            <div className={`step-icon ${getStepClass(3)} ms-3`}>
              {currentStep >= 3 ? (
                <i className="fas fa-check-circle"></i>
              ) : (
                <i className="fas fa-credit-card"></i>
              )}
            </div>
            <div className="step-label">Payment Info</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

Stepper.propTypes = {
  currentStep: PropTypes.number.isRequired, // Ensure currentStep is a number
};

export default Stepper;
