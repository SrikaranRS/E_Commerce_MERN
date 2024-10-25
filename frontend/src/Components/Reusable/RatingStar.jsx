import React from "react";
import { FaStar } from 'react-icons/fa'; // Importing the full star icon
import '../Layouts/component.css'; // Adjust the path as necessary

const RatingStar = ({ rating }) => {
  const fullStars = Math.floor(rating); // Calculate full stars
  const emptyStars = 5 - fullStars; // Calculate empty stars

  return (
    <div className="star-rating" style={{ display: "flex", alignItems: "center" }}>
      {/* Render full stars */}
      {Array(fullStars).fill().map((_, index) => (
        <FaStar key={index} className="text-warning small-star" />
      ))}
      {/* Render empty stars */}
      {Array(emptyStars).fill().map((_, index) => (
        <FaStar key={index + fullStars} className="text-muted small-star" style={{ opacity: 0.5 }} />
      ))}
    </div>
  );
};

export default RatingStar;
