import React, { useState } from "react";
import "./propertylist.css";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export default function PropertyCard({ property, onToggleFavorite, isFavorited }) {
  const {
    id,
    primary_image,
    title,
    listing_type,
    location,
    price,
    bedrooms,
    bathrooms,
    area_size,
    description,
  } = property;

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite?.(id);
  };

  return (
    <div className="property-card">
      <div className="property-image">
        <img src={primary_image || "https://via.placeholder.com/400x300"} alt={title} />
        <span className={`property-badge ${listing_type}`}>{listing_type}</span>
        <button 
          className={`like-button ${isFavorited ? 'favorited' : ''}`}
          onClick={handleLike}
          title={isFavorited ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart size={20} fill={isFavorited ? "#ef4444" : "none"} color={isFavorited ? "#ef4444" : "#fff"} />
        </button>
      </div>

      <div className="property-content">
        <h3 className="property-title">{title}</h3>
        <p className="property-location">{location}</p>

        <div className="property-details">
          <span>🛏 {bedrooms || 0} Beds</span>
          <span>🛁 {bathrooms || 0} Baths</span>
          <span>📏 {area_size || 0} sqm</span>
        </div>

        <p className="property-price">KSh {Number(price).toLocaleString()}</p>

        <p className="property-description">{description}</p>

        <div className="actions">
          <Link to={`/user/property/${id}`} className="view-details-btn">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
