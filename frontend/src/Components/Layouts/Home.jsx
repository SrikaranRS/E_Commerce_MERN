import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import img1 from '../../Images/products/1.jpg';
import img2 from '../../Images/products/2.jpg';
import img3 from '../../Images/products/3.jpg';
import img4 from '../../Images/products/4.jpg';
import img5 from '../../Images/products/5.jpg';
import MetaData from './MetaData';

const ProductPage = () => {
  const products = [
    { id: 1, title: 'Mobile', image: img1, rating: 4.5, price: '$29.99' },
    { id: 2, title: 'Watch', image: img2, rating: 3.5, price: '$19.99' },
    { id: 3, title: 'Laptop', image: img3, rating: 5.0, price: '$39.99' },
    { id: 4, title: 'Earphone', image: img4, rating: 4.0, price: '$24.99' },
    { id: 5, title: 'Shoes', image: img5, rating: 2.5, price: '$14.99' },
  ];

  return (
    
    <div className=" min-vh-100 py-4">
       <MetaData title="Main Page" />
      <div className="container">
        <h2 className="text-center">Latest Products</h2>
        <div className="row py-5">
          {products.map(product => (
            <div className="col-md-3 mb-4" key={product.id}>
              <div className="card shadow-lg rounded">
                <img src={product.image} className="card-img-top p-2" alt={product.title} style={{ height: '250px', width:'250px', objectFit: 'full' }} />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text fw-bold">{product.price}</p>
                  <div className="d-flex align-items-center">
                    <span className="text-warning" style={{ fontSize: '1.5rem' }}>
                      {'★'.repeat(Math.floor(product.rating))}
                      {'☆'.repeat(5 - Math.floor(product.rating))}
                    </span>
                    <span className="text-muted ms-2">({product.rating})</span>
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
