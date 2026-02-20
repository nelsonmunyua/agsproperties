import React from "react";
import "./propertylist.css";
import PropertyCard from "./PropertyCard";

export default function PropertyList({ properties = [], favoriteIds = [], onToggleFavorite }) {
  return (
    <div className="property-list">
      {properties.length > 0 ? (
        properties.map((property) => (
          <PropertyCard 
            key={property.id} 
            property={property} 
            isFavorited={favoriteIds.includes(property.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))
      ) : (
        <p>No properties found matching your criteria.</p>
      )}
    </div>
  );
}
