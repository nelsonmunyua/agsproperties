import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { BedDouble, Bath, Ruler, ArrowLeft, Phone, Mail, User, Play, MessageSquare, Calendar } from "lucide-react";

import InquiryModal from "./InquiryModal";
import ScheduleVisitModal from "./ScheduleVisitModal";
import "./propertydetails.css";

export default function PropertyDetails() {
  const [property, setProperty] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    fetch(`${apiUrl}/user/properties/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProperty(data);
        setLoading(false);
        
        // Record property view
        const token = localStorage.getItem('access_token');
        if (token) {
          fetch(`${apiUrl}/user/record-view`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ property_id: parseInt(id) })
          }).catch(err => console.error('Error recording view:', err));
        }
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
                <button 
                  onClick={() => setShowScheduleModal(true)}
                  className="contact-item bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Calendar size={16} /> Schedule Visit
                </button>
                <button 
                  onClick={() => setShowInquiryModal(true)}
                  className="contact-item bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <MessageSquare size={16} /> Send Inquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Visit Modal */}
      {showScheduleModal && (
        <ScheduleVisitModal 
          property={property}
          agent={property.agent}
          onClose={() => setShowScheduleModal(false)}
        />
      )}

      {/* Inquiry Modal */}
      {showInquiryModal && (
        <InquiryModal 
          property={property}
          agent={property.agent}
          onClose={() => setShowInquiryModal(false)}
        />
      )}
    </div>
  );
}
