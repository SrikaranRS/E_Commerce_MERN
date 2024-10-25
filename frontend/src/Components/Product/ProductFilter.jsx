import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Arrow icons for dropdown
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";

const ProductSearchFilters = ({ price, setPrice, category, setCategory }) => {
  

  const categories = [
    'Electronics',
    'Mobile Phones',
    'Laptops',
    'Accessories',
    'Headphones',
    'Food',
    'Books',
    'Clothes/Shoes',
    'Beauty/Health',
    'Sports',
    'Outdoor',
    'Home'
  ];

  const handleRender = (renderProps) => (
    <Tooltip overlay={`₹${renderProps.props["aria-valuenow"]}`} >
      <div {...renderProps.props} />
    </Tooltip>
  );

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div >
      {/* Filter by Price */}
      <div>
        <h4>
          Filter by Price 
        </h4>
       
          <div className="w-75">
            <Slider
              className="mt-2"
              range
              marks={{ 1: "1", 1000: "1000" }}
              min={1}
              max={1000}
              defaultValue={price}
              onAfterChange={(value) => setPrice(value)}
              handleRender={handleRender}
              railStyle={{ backgroundColor: "#ddd" }}
              handleStyle={[{ backgroundColor: "#007bff" }, { backgroundColor: "#007bff" }]}
              trackStyle={[{ backgroundColor: "#007bff" }]}
            />
          </div>
        
      </div>

      {/* Filter by Category */}
      <div className="mt-4">
        <h4 >
          Filter by Category 
        </h4>
       
          <div>
            <ul style={{ listStyle: "none", paddingLeft: 0 }}>
              {categories.map((cate, key) => (
                <li key={key}>
                  <input
                    type="radio"
                    value={cate}
                    onChange={handleCategoryChange}
                    checked={category === cate} 
                    className="me-2"
                  />
                  <span style={{ 
                  fontWeight: category === cate ? 'bold' : 'normal', // Bold if selected
                  color: category === cate ? '#007bff' : '#000' // Change color if selected
                }}>
                  {cate}
                </span>
                </li>
              ))}
            </ul>
          </div>
      
      </div>
    </div>
  );
};

export default ProductSearchFilters;
