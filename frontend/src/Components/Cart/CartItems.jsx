import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Layouts/Loader";
import MetaData from "../Layouts/MetaData";
import { useNavigate } from "react-router-dom";
import { decreaseQuantity, increaseQuantity, removefromCart } from "../../Slices/cartSlice";

const CartItems = () => {
  const { loading, items, error } = useSelector((state) => state.cartState);
  const {isAuthenticated}=useSelector((state)=>state.authState)
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
      const errorTimer = setTimeout(() => {
        setErrorMessage("");
      }, 4000);
      return () => clearTimeout(errorTimer);
    }
  }, [error]);

  const increaseQty = (item) => {
    const count = item.quantity;
    if (item.stock === 0 || count >= item.stock) {
      return;
    }
    dispatch(increaseQuantity(item.product));
  };

  const decreaseQty = (item) => {
    const count = item.quantity;

    if (count === 0) {
      return;
    }
    dispatch(decreaseQuantity(item.product));
  };

  const handleRemoveItem = (id) => {
    // Logic for removing an item (if needed)
    dispatch(removefromCart(id))
  };

  const handleView = (id) => {
    navigate(`/productDetails/${id}`);
  };

  const handleCheckout=()=>{

    if (!isAuthenticated) {
      // If not authenticated, redirect to login with a redirect query parameter
      navigate('/login?redirect=shipping');
    } else {
      // Otherwise, proceed to checkout
      navigate('/shipping');
    }

  }


  if (loading) return <Loader />;

  return (
    <div className="min-vh-100 py-4">
      <MetaData title="Cart Details" />
      <div className="container">
        <h2 className="text-center">Your Cart</h2>

        {errorMessage && (
          <div
            className="alert alert-danger text-center"
            style={{ width: "400px", margin: "0 auto" }}
            role="alert"
          >
            {errorMessage}
          </div>
        )}

        {items && items.length === 0 ? (
          <div className="alert alert-info text-center" role="alert">
            Your cart is empty. Please add some products to the cart.
          </div>
        ) : (
          <div className="row">
            {/* Left Section: Products */}
            <div className="col-md-9">
              <div className="row py-6">
                {items.map((item) => (
                  <div className="col-md-4 mb-4" key={item.product}>
                    <div className="card shadow-lg rounded h-100">
                      <img
                        src={item.image || "/images/default.jpg"}
                        className="card-img-top p-2"
                        alt={item.name}
                        style={{
                          objectFit: "contain",
                          height: "200px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleView(item.product)}
                      />
                      <div className="card-body">
                        <h6 className="card-title" style={{ height: "35px" }}>
                          {item.name}
                        </h6>
                        <p className="card-text fw-bold mt-1">₹ {item.price}</p>

                        <div className="d-flex align-items-center mb-3">
                          <button
                            className="btn border border-danger mr-3 me-2"
                            onClick={() => {
                              decreaseQty(item);
                            }}
                          >
                            -
                          </button>
                          <span className="quantity-display">
                            {item.quantity}
                          </span>
                          <button
                            className="btn border border-success ml-2 ms-1"
                            onClick={() => {
                              increaseQty(item);
                            }}
                          >
                            +
                          </button>
                        </div>

                        <div className="d-flex justify-content-between">
                          <p className="mb-0">Stock: {item.stock}</p>

                          <button
                            className="btn btn-primary mt-4"
                            onClick={() => handleRemoveItem(item.product)}
                          >
                          <FaTrashAlt/>
                          </button>
                        </div>

                        <div>
                        
                        </div>

                        {/*         <div className="position-absolute top-0 end-0 p-2">
                          <button
                            className="bg-transparent border-0"
                            aria-label="Add to cart"
                            data-bs-toggle="tooltip"
                            title="Add to cart"
                          >
                            <FaShoppingCart size={20} className="text-dark" />
                          </button> 
                        </div>*/}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Section: Cart Summary */}
            <div className="col-md-3">
              <div className="cart-summary shadow-sm p-4 bg-light rounded">
                <h4>Cart Summary</h4>
                <hr />
                <div className="d-flex justify-content-between">
                  <span>Total Items:</span>
                  <span>
                    {items.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Total Price:</span>
                  <span>
                    ₹{" "}
                    {items
                      .reduce(
                        (acc, item) => acc + item.price * item.quantity,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </div>
                <button className="btn btn-success w-100 mt-3" onClick={handleCheckout}>
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItems;
