import React from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import '../Layouts/component.css'



import RatingStar from '../Reusable/RatingStar';

const ProductDetails = ({product}) => {
  return (
    <div>
         <div className="col-md-4 mb-4" key={product.id}>
              <div className="card shadow-lg rounded h-100">
                <img
                  src={product.images[0].image}
                  className="card-img-top p-2"
                  alt={product.name}
                  style={{ objectFit: 'contain', height: '250px' }}
                />
                <div className="card-body">
                  <h6 className="card-title h-25">{product.name}</h6>
                  <p className="card-text fw-bold mt-3">₹ {product.price}</p>
                  <div className="d-flex align-items-center">
                    <span className="text-warning" style={{ fontSize: '1.5rem' }}>
              
                 <RatingStar rating={product.ratings}/>
                 
                    </span>
                    <span className="text-muted ms-2">({product.ratings})</span>
                  </div>
                  <a href="/product-details" className="btn btn-primary mt-2 w-50">View Details</a>
                  <div className="position-absolute top-0 end-0 p-2">
                    <button
                      className="bg-transparent border-0"
                      aria-label="Add to cart"
                      data-bs-toggle="tooltip"
                      title="Add to cart"
                    >
                      <FaShoppingCart size={20} className="text-dark" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
    </div>
  )
}

export default ProductDetails
