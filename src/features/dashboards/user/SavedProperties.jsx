import React, { useEffect, useState } from 'react';
import { Bed, Bath, Square, MapPin, Eye, Trash2, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserPropertyCard = ({ property, onView, onRemove }) => {
  return (
    <div className="group bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={property?.image || "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?w=400"}
          alt={property?.title || "property"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-semibold rounded-full">
            {property?.listing_type || 'For Sale'}
          </span>
        </div>
        <button
          onClick={onRemove}
          className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-red-50 text-red-500 rounded-full transition-colors"
        >
          <Heart size={16} className="fill-current" />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="text-base font-semibold text-slate-900 mb-2 line-clamp-1">{property?.title}</h3>
        
        <div className="flex items-center gap-1 text-sm text-slate-500 mb-3">
          <MapPin size={14} />
          <span>{property?.location || 'Location'}</span>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
          <span className="flex items-center gap-1">
            <Bed size={16} />
            {property?.bedrooms || 0} beds
          </span>
          <span className="flex items-center gap-1">
            <Bath size={16} />
            {property?.bathrooms || 0} baths
          </span>
          <span className="flex items-center gap-1">
            <Square size={16} />
            {property?.area_size || 0} sqft
          </span>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <span className="text-lg font-bold text-emerald-600">{property?.currency}{property?.price}</span>
          <button
            onClick={onView}
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-600 rounded-lg text-sm font-medium transition-colors"
          >
            <Eye size={14} />
            {/* <Link to={`/user/property/${id}`} className="view-details-btn">
            View Details
          </Link> */}
          </button>
        </div>
      </div>
    </div>
  );
};

const SavedProperties = ({ onViewProperty, onRemoveProperty, limit = 0, onViewAll }) => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchSavedProperties = async () => {
        const token = localStorage.getItem('access_token');
        const apiUrl = import.meta.env.VITE_API_URL;
        
        // Build URL with limit parameter if provided
        let url = `${apiUrl}/user/saved-properties`;
        if (limit > 0) {
            url += `?limit=${limit}`;
        }

        try {
            const res = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.ok) {
                const data = await res.json();
                setProperties(data.properties || []);
            }
        } catch (error) {
            console.error('Falied to fetch saved properties:', error)
        }
    };

    fetchSavedProperties();
  }, [limit]);


  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-900">Your Saved Properties</h2>
        <button onClick={onViewAll} className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
          View All
        </button>
      </div>

      {properties.length === 0 ? (
        <p className='text-slate-500 text-center py-8'>No saved properties yet.</p>
      ):(
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {properties.map((property) => (
          <UserPropertyCard
            key={property.id}
            property={property}
            onView={() => onViewProperty?.(property)}
            onRemove={() => onRemoveProperty?.(property)}
          />
        ))}
      </div>
      )}
    </div>
  );
};

export default SavedProperties;

