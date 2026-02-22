import React from 'react';
import { MapPin, Bed, Bath, Square, Edit, Trash2, Eye } from 'lucide-react';
import { StatusBadge } from '../../../features/dashboard/components';

const PropertyCard = ({ property, onView, onEdit, onDelete }) => {
  const formatPrice = (price, currency = 'Ksh') => {
    if (!price) return 'Price on request';
    return `${currency} ${new Intl.NumberFormat('en-KE').format(price)}`;
  };

  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-12 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
            {property.image ? (
              <img 
                src={property.image} 
                alt={property.title} 
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-slate-400" />
              </div>
            )}
          </div>
          <div>
            <p className="font-medium text-slate-900 line-clamp-1">{property.title}</p>
            <div className="flex items-center gap-1 text-sm text-slate-500">
              <MapPin size={12} />
              {property.location}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="font-semibold text-emerald-600">
          {formatPrice(property.price, property.currency)}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3 text-sm text-slate-600">
          {property.beds > 0 && (
            <span className="flex items-center gap-1">
              <Bed size={14} className="text-slate-400" />
              {property.beds}
            </span>
          )}
          {property.baths > 0 && (
            <span className="flex items-center gap-1">
              <Bath size={14} className="text-slate-400" />
              {property.baths}
            </span>
          )}
          {property.sqft > 0 && (
            <span className="flex items-center gap-1">
              <Square size={14} className="text-slate-400" />
              {property.sqft} {property.area_unit}
            </span>
          )}
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-slate-600 capitalize">{property.listing_type}</span>
      </td>
      <td className="px-6 py-4">
        <StatusBadge status={property.status} />
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-slate-600">{property.views || 0}</span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={() => onView(property)}
            className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
            title="View Details"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => onEdit(property)}
            className="p-2 hover:bg-amber-50 text-amber-600 rounded-lg transition-colors"
            title="Edit"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(property)}
            className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default PropertyCard;

