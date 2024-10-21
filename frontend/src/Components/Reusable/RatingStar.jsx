import React from "react";
import { FaStar, FaStarHalfAlt } from 'react-icons/fa'; // Importing the half star icon
import '../Layouts/component.css'; // Adjust the path as necessary

const RatingStar = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <div className="star-rating" style={{ display: "flex", alignItems: "center" }}>
      {Array(fullStars).fill(<FaStar className="text-warning small-star" />)}
      {halfStar ? <FaStarHalfAlt className="text-warning small-star" /> : null}
      
    </div>
  );
};

export default RatingStar;
