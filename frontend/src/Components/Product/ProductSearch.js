import React, { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import '../../Components/Layouts/component.css';
import MetaData from '../Layouts/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, getProducts } from '../../actions/productsAction';
import Loader from '../Layouts/Loader';
import RatingStar from '../Reusable/RatingStar';
import { useNavigate, useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';

const ProductSearch = () => {
  const { products, loading, error, totalCount, resPerPage } = useSelector(state => state.productsState);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { keyword } = useParams();

  console.log(keyword,'k')

  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo);
  };

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
      setTimeout(() => {
        setErrorMessage('');
      }, 4000);
    }
    dispatch(getProducts(keyword, currentPage));
  }, [currentPage, dispatch, error, keyword]);

  const handleView = (id) => {
    dispatch(getProduct(id));
    navigate(`/productDetails/${id}`);
  };

  if (loading) return <Loader />;

  const noProductsFound = products.length === 0;

  return (
    <div className="min-vh-100 py-4">
      <MetaData title={`Searched Products for "${keyword}"`} />
      <div className="container">
        <h2 className="text-center">Searched Products for "{keyword}"</h2>
        {errorMessage && (
          <div className="alert alert-danger text-center" style={{ width: '400px', margin: '0 auto' }} role="alert">
            {errorMessage}
          </div>
        )}
        {noProductsFound && !loading && (
          <div className="alert alert-info text-center" role="alert">
            No products found for "{keyword}".
          </div>
        )}
        <div className="row py-6">
          {!noProductsFound && products.map(product => (
            <div className="col-md-4 mb-4" key={product._id}>
              <div className="card shadow-lg rounded h-100" onClick={() => handleView(product._id)}>
                <img
                  src={product.images[0].image}
                  className="card-img-top p-2"
                  alt={product.name}
                  style={{ objectFit: 'contain', height: '250px', cursor: "pointer" }}
                />
                <div className="card-body">
                  <h6 className="card-title" style={{ height: "35px" }}>{product.name}</h6>
                  <p className="card-text fw-bold mt-1">₹ {product.price}</p>
                  <div className="d-flex align-items-center">
                    <span className="text-warning" style={{ fontSize: '1.5rem' }}>
                      <RatingStar rating={product.ratings} />
                    </span>
                    <span className="text-muted ms-2">({product.ratings})</span>
                  </div>
                  <button 
                    className="btn btn-primary mt-2 w-50" 
                    onClick={() => handleView(product._id)}
                    aria-label={`View details of ${product.name}`}
                  >
                    View Details
                  </button>
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
         {totalCount > 0 && totalCount > resPerPage? (
          <div className="pagination-container">
            <Pagination
              activePage={currentPage}
              onChange={setCurrentPageNo}
              totalItemsCount={totalCount}
              itemsCountPerPage={resPerPage}
              nextPageText={'Next'}
              firstPageText={'First'}
              lastPageText={'Last'}
              itemClass={'page-item'}
              linkClass={'page-link'}
            />
          </div>
        ):null} 
      </div>
    </div>
  );
};

export default ProductSearch;
