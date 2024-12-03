import React, { useEffect } from 'react';
import Stepper from './Stepper';
import './cart.css'; // Ensure you have proper styles for the new layout
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ConfirmOrder = () => {
  const { shippingInfo, items: order } = useSelector((state) => state.cartState);
  const { user, isAuthenticated } = useSelector((state) => state.authState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (!shippingInfo || Object.keys(shippingInfo).length === 0) {
      navigate('/shipping?redirect=confirm');
    }
  }, [shippingInfo, navigate]);

  const calculateSubtotal = () => {
    return order.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const calculateShipping = () => {
  if(subtotal>1200)
    return 5.00; 

  return 0.00;

  };

  const calculateTax = (subtotal) => {
    const taxRate = 0.10;
    return subtotal * taxRate;
  };

  const calculateTotal = (subtotal, shipping, tax) => {
    return subtotal + shipping + tax;
  };

  // Calculate the values
  const subtotal = calculateSubtotal();
  const shipping = calculateShipping();
  const tax = calculateTax(subtotal);
  const total = calculateTotal(subtotal, shipping, tax);

  const handleConfirmOrder = () => {
    const data={subtotal,shipping,tax,total}
   
   sessionStorage.setItem('orderInfo',JSON.stringify(data))
   //alert('Order confirmed! Thank you for your purchase.');
   navigate('/order/payment')
  };

  return (
    <div className="order-confirmation">
      <Stepper currentStep={2} />

      <div className="shipping-info mb-5 border p-4">
        <h2>Shipping Information</h2>
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Address:</strong> {shippingInfo?.address}</p>
        <p><strong>Phone:</strong> {shippingInfo?.phone}</p>
        <p><strong>Email:</strong> {user?.email}</p>
      </div>

      {/* Order Summary Section */}
      <div className="order-details mb-5">
        <h2>Cart Items</h2>
        <ul className="list-group mb-4">
          {order.map((item) => (
            <li key={item.id} className="list-group-item d-flex align-items-center justify-content-between border">
              {/* Left Section: Product Details */}
              <div className="product-info flex-grow-1 me-3">
                <p><strong>{item.name}</strong></p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price} each</p>
                <p><strong>Total: ${item.price * item.quantity}</strong></p>
              </div>

              {/* Right Section: Product Image */}
              <div className="product-image ms-3">
                <img
                  src={item.image || '/path/to/default-image.jpg'}
                  alt={item.name}
                  className="img-fluid"
                  style={{
                    maxWidth: '100px', // Set a fixed width for the image
                    height: 'auto',
                    objectFit: 'contain', // Ensure image aspect ratio is maintained
                  }}
                />
              </div>
            </li>
          ))}
        </ul>

        {/* Order Summary (Subtotal, Shipping, Tax, Total) */}
        <div className="order-summary border p-4">
          <h3>Order Summary</h3>
          <div className="row">
            <div className="col-6">
              <p>Subtotal:</p>
              <p>Shipping:</p>
              <p>Tax:</p>
            </div>
            <div className="col-6 text-end">
              <p><strong>${subtotal.toFixed(2)}</strong></p>
              <p><strong>${shipping.toFixed(2)}</strong></p>
              <p><strong>${tax.toFixed(2)}</strong></p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-6">
              <p><strong>Total:</strong></p>
            </div>
            <div className="col-6 text-end">
              <p><strong>${total.toFixed(2)}</strong></p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Order Button */}
      <div className="order-actions text-center">
        <button onClick={handleConfirmOrder} className="btn btn-success w-100 py-2">
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default ConfirmOrder;
