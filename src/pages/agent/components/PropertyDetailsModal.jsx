import React from 'react';
import { MapPin, Bed, Bath, Square, Calendar, Eye, DollarSign } from 'lucide-react';

const PropertyDetailsModal = ({ property, onClose, onEdit, onDelete }) => {
  if (!property) return null;

  const { property: prop, images, videos, location, views } = property;

  const formatPrice = (price, currency = 'Ksh') => {
    if (!price) return 'Price on request';
    return `${currency} ${new Intl.NumberFormat('en-KE').format(price)}`;
  };

  const allImages = images?.length > 0 ? images : [{ url: '/placeholder-property.jpg' }];
  const primaryImage = allImages[0]?.url;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">{prop?.title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <span className="text-slate-500 text-2xl">&times;</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Image Gallery */}
          <div className="mb-6">
            <div className="aspect-video rounded-xl overflow-hidden bg-slate-100 mb-4">
              {primaryImage ? (
                <img src={primaryImage} alt={prop?.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <MapPin className="w-16 h-16 text-slate-400" />
                </div>
              )}
            </div>
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {allImages.map((img, index) => (
                  <img
                    key={index}
                    src={img.url}
                    alt={`View ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Price & Status */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-3xl font-bold text-emerald-600">
                {formatPrice(prop?.price, prop?.currency)}
              </span>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              prop?.status === 'onsale' ? 'bg-blue-100 text-blue-700' :
              prop?.status === 'onrent' ? 'bg-green-100 text-green-700' :
              prop?.status === 'sold' ? 'bg-gray-100 text-gray-700' :
              'bg-purple-100 text-purple-700'
            }`}>
              {prop?.status === 'onsale' ? 'For Sale' :
               prop?.status === 'onrent' ? 'For Rent' :
               prop?.status === 'sold' ? 'Sold' : 'Leased'}
            </span>
          </div>

          {/* Description */}
          {prop?.description && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-slate-600">{prop.description}</p>
            </div>
          )}

          {/* Property Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {prop?.bedrooms > 0 && (
              <div className="bg-slate-50 rounded-lg p-4 text-center">
                <Bed className="w-6 h-6 mx-auto mb-2 text-slate-400" />
                <div className="font-semibold">{prop.bedrooms}</div>
                <div className="text-sm text-slate-500">Bedrooms</div>
              </div>
            )}
            {prop?.bathrooms > 0 && (
              <div className="bg-slate-50 rounded-lg p-4 text-center">
                <Bath className="w-6 h-6 mx-auto mb-2 text-slate-400" />
                <div className="font-semibold">{prop.bathrooms}</div>
                <div className="text-sm text-slate-500">Bathrooms</div>
              </div>
            )}
            {prop?.area_size > 0 && (
              <div className="bg-slate-50 rounded-lg p-4 text-center">
                <Square className="w-6 h-6 mx-auto mb-2 text-slate-400" />
                <div className="font-semibold">{prop.area_size} {prop?.area_unit}</div>
                <div className="text-sm text-slate-500">Area</div>
              </div>
            )}
            <div className="bg-slate-50 rounded-lg p-4 text-center">
              <Eye className="w-6 h-6 mx-auto mb-2 text-slate-400" />
              <div className="font-semibold">{views || 0}</div>
              <div className="text-sm text-slate-500">Views</div>
            </div>
          </div>

          {/* Location */}
          {location && (location.city || location.neighborhood) && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Location</h3>
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin size={18} className="text-slate-400" />
                {[location.city, location.neighborhood].filter(Boolean).join(', ')}
              </div>
            </div>
          )}

          {/* Listing Info */}
          <div className="border-t pt-4 mb-6">
            <div className="flex items-center justify-between text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                Listed: {prop?.listing_date ? new Date(prop.listing_date).toLocaleDateString() : 'N/A'}
              </div>
              <div className="capitalize">Type: {prop?.listing_type}</div>
            </div>
          </div>

          {/* Videos */}
          {videos?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Videos</h3>
              <div className="flex gap-2 overflow-x-auto">
                {videos.map((vid) => (
                  <div key={vid.id} className="w-32 h-24 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-slate-500">Video</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 p-6 border-t bg-slate-50">
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Delete Property
          </button>
          <button
            onClick={() => onEdit(property)}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Edit Property
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsModal;

