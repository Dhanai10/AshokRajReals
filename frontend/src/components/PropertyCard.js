import React from 'react';
import './PropertyCard.css';

function PropertyCard({ property, onViewDetails }) {
  const { property_type, city, sqft, description, image_url } = property;

  const fallbackImage = `https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80`;

  return (
    <div className="property-card">
      <div className="card-image-wrap">
        <img
          src={image_url || fallbackImage}
          alt={`${property_type} in ${city}`}
          className="card-image"
          onError={(e) => { e.target.src = fallbackImage; }}
        />
        <span className="card-badge">{property_type}</span>
        <div className="card-overlay" />
      </div>
      <div className="card-body">
        <div className="card-city">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          {city}
        </div>
        <div className="card-sqft">
          <span>{sqft?.toLocaleString()}</span> sqft
        </div>
        <p className="card-description">{description}</p>
        <div className="card-footer">
          <button className="card-btn" onClick={() => onViewDetails(property)}>View Details</button>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
