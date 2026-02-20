import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { BedDouble, Bath, Ruler, ArrowLeft, Phone, Mail, User, Play } from "lucide-react";

import "./propertydetails.css";

export default function PropertyDetails() {
  const [property, setProperty] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    fetch(`${apiUrl}/user/properties/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProperty(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Property Details", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="property-details-container">
        <p>Loading...</p>
        <Link to="/user/properties" className="back-btn">
          ← Back to Listings
        </Link>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="property-details-container">
        <p>Property not found</p>
        <Link to="/user/properties" className="back-btn">
          ← Back to Listings
        </Link>
      </div>
    );
  }

  // Handle location being an object or string
  const locationDisplay = typeof property.location === 'object' 
    ? `${property.location?.neighborhood || ''}, ${property.location?.city || ''}, ${property.location?.state || ''}`
    : property.location;

  // Get all images (use primary as first if available)
  const allImages = property.images && property.images.length > 0 
    ? property.images 
    : property.primary_image 
      ? [property.primary_image] 
      : [];

  return (
    <div className="property-details-container">
      {/* Back button */}
      <Link to="/user/properties" className="back-btn">
        <ArrowLeft size={18} /> Back to Listings
      </Link>

      <div className="property-details-card">
        {/* IMAGE SECTION */}
        <div className="details-image-section">
          {allImages.length > 0 ? (
            <>
              <img
                src={allImages[selectedImage]}
                alt={property.title}
                className="details-main-image"
              />
              {/* Image Gallery Thumbnails */}
              {allImages.length > 1 && (
                <div className="image-gallery">
                  {allImages.map((img, index) => (
                    <div 
                      key={index}
                      className={`gallery-thumb ${index === selectedImage ? 'active' : ''}`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img src={img} alt={`${property.title} - ${index + 1}`} />
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <img
              src="https://via.placeholder.com/800x600"
              alt={property.title}
              className="details-main-image"
            />
          )}
          <span className={`property-badge ${property.listing_type}`}>
            {property.listing_type}
          </span>
        </div>

        {/* INFO SECTION */}
        <div className="details-info-section">
          <h1 className="details-title">{property.title}</h1>
          <p className="details-location">{locationDisplay}</p>
          
          {/* Property Type */}
          {property.property_type && (
            <p className="details-property-type">Type: {property.property_type}</p>
          )}

          <div className="details-icons">
            <div>
              <BedDouble size={18} /> {property.bedrooms || 0} Beds
            </div>
            <div>
              <Bath size={18} /> {property.bathrooms || 0} Baths
            </div>
            <div>
              <Ruler size={18} /> {property.area_size || 0} {property.area_unit || 'sqm'}
            </div>
          </div>

          <h2 className="details-price">
            {property.currency} {Number(property.price).toLocaleString()}
          </h2>

          <p className="details-description">{property.description}</p>
        </div>
      </div>

      {/* VIDEO SECTION */}
      {property.videos && property.videos.length > 0 && (
        <div className="video-section">
          <h3>Property Videos</h3>
          <div className="video-grid">
            {property.videos.map((video, index) => (
              <div key={index} className="video-item">
                <video controls>
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AGENT INFO SECTION */}
      {property.agent && (
        <div className="agent-info-section">
          <h3>Listed By Agent</h3>
          <div className="agent-card">
            <div className="agent-avatar">
              <User size={40} />
            </div>
            <div className="agent-details">
              <h4>{property.agent.name}</h4>
              {property.agent.rating && (
                <p className="agent-rating">⭐ {property.agent.rating}/5</p>
              )}
              {property.agent.bio && (
                <p className="agent-bio">{property.agent.bio}</p>
              )}
              <div className="agent-contact">
                <a href={`tel:${property.agent.phone}`} className="contact-item">
                  <Phone size={16} /> {property.agent.phone}
                </a>
                <a href={`mailto:${property.agent.email}`} className="contact-item">
                  <Mail size={16} /> {property.agent.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MAP SECTION */}
      <div className="map-section">
        <h3>Location Map</h3>
        <img
          src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=800&q=80"
          alt="Map"
          className="map-image"
        />
      </div>
    </div>
  );
}
