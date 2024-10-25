import React, { useEffect, useState } from "react";
import "./product.css"; // Import your CSS for additional styling
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../actions/productsAction";
import { useParams } from "react-router-dom";
import Loader from "../Layouts/Loader";
import RatingStar from "../Reusable/RatingStar";
import MetaData from "../Layouts/MetaData";

const ProductDetail = () => {
  const { loading, product, error } = useSelector(
    (state) => state.productState
  );
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loadingDelayed, setLoadingDelayed] = useState(true);
  const params = useParams();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingDelayed(false);
      dispatch(getProduct(params.id));
    }, 1500);
 

    return () => clearTimeout(timer);
  }, [dispatch, params.id]);

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
      const errorTimer = setTimeout(() => {
        setErrorMessage("");
      }, 4000);
      return () => clearTimeout(errorTimer);
    }
    
  }, [error]);

  const handleAddToCart = () => {
    alert("Product added to cart!");
  };

  if (loading || loadingDelayed) return <Loader />;

  return (
    <div className="container mt-4">
    
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      {product && (
        
        <div className="row product-detail align-items-start">
            <MetaData title={product.name}/>
          <div className="col-md-6 product-image">
            {product.images && product.images.length > 0 && (
              <img
                src={product.images[0].image}
                alt={product.name}
                className="img-fluid rounded product-img"
              />
            )}
          </div>

          <div className="col-md-6 product-info">
            <h1 className="h4">{product.name}</h1>
            <div className="rating-section">
              <RatingStar rating={parseFloat(product.ratings) || 0} />
              <span className="ml-2">({product.numOfReviews} reviews)</span>
            </div>
            <h5 className="text-danger mt-4 mb-4">₹ {product.price}</h5>
            <hr />

           

            <div className="d-flex align-items-center mb-3">
              <button
                className="btn btn-danger quantity-button mr-3 me-2"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="quantity-display">{quantity}</span>
              <button
                className="btn btn-success quantity-button ml-2 ms-1"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <button
              className="btn btn-warning add-to-cart-button mt-3"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <hr />
            <p className="mt-3">
              <strong>Status:</strong>{" "}
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </p>
            <p>
              <strong>Sold by:</strong> {product.seller}
            </p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <hr />
            <h3 className="mt-4">Description</h3>
            <p className="description">{product.description}</p>
          </div><hr/>
           {/* Product Features Section */}
           <div className="product-features mb-3">
              <h4>Key Features</h4>
              <ul>
              {product.features?.map((feature, id) => (
  <li key={id}>{feature}</li>
))}
              </ul>
            </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
