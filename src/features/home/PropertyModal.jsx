import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PropertyModal({ property, onClose }) {
  const navigate = useNavigate();

  if (!property) return null;

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const handleSignInClick = () => {
    navigate('/signin');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Property Image */}
        <div className="relative h-64 sm:h-80">
          <img 
            src={property.image || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {property.status === 'onrent' ? 'For Rent' : 'For Sale'}
          </div>
        </div>

        {/* Property Details */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {property.title}
          </h2>
          
          <p className="text-gray-600 mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {property.location || 'Location not specified'}
          </p>

          <p className="text-3xl font-bold text-indigo-600 mb-6">
            {property.currency === 'KES' ? 'KES ' : '$'}{property.price?.toLocaleString()}
            {property.listing_type === 'rent' && <span className="text-lg text-gray-500 font-normal">/month</span>}
          </p>

          {/* Property Features */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {property.bedrooms > 0 && (
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-gray-800">{property.bedrooms}</p>
                <p className="text-sm text-gray-500">Bedrooms</p>
              </div>
            )}
            {property.bathrooms > 0 && (
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-gray-800">{property.bathrooms}</p>
                <p className="text-sm text-gray-500">Bathrooms</p>
              </div>
            )}
            {property.area && (
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-gray-800">{property.area}</p>
                <p className="text-sm text-gray-500">Sq Ft</p>
              </div>
            )}
          </div>

          {/* Description Preview */}
          {property.description && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
              <p className="text-gray-600 text-sm line-clamp-3">
                {property.description}
              </p>
            </div>
          )}

          {/* Sign Up Prompt */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 text-center border border-indigo-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Interested in this property?
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Sign up to contact the agent, save properties, and schedule viewings
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button 
                onClick={handleSignUpClick}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors"
              >
                Sign Up Free
              </button>
              <button 
                onClick={handleSignInClick}
                className="bg-white hover:bg-gray-50 text-indigo-600 font-medium py-2.5 px-6 rounded-lg border border-indigo-200 transition-colors"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

