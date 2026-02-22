import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, Eye, Edit } from 'lucide-react';
import { StatusBadge } from '../../dashboard/components';
import api from '../../../services/agent';

const PropertyRow = ({ property, onView, onEdit }) => {
  const { title, location, price, status, views, image } = property || {};

  const formatPrice = (price, currency = 'Ksh') => {
    if (!price) return 'Price on request';
    return `${currency} ${new Intl.NumberFormat('en-KE').format(price)}`;
  };

  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-12 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
            {image ? (
              <img src={image} alt={title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Building className="w-6 h-6 text-slate-400" />
              </div>
            )}
          </div>
          <div>
            <p className="font-medium text-slate-900">{title || 'Untitled Property'}</p>
            <p className="text-sm text-slate-500">{location || 'No location'}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="font-semibold text-slate-900">{formatPrice(price)}</span>
      </td>
      <td className="px-6 py-4">
        <StatusBadge status={status || 'onsale'} />
      </td>
      <td className="px-6 py-4">
        <span className="text-slate-600">{views || 0}</span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-1">
          <button
            onClick={() => onView?.(property)}
            className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
            title="View"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => onEdit?.(property)}
            className="p-2 hover:bg-amber-50 text-amber-600 rounded-lg transition-colors"
            title="Edit"
          >
            <Edit size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

const AgentPropertyTable = ({ 
  properties: propProperties, 
  onViewProperty, 
  onEditProperty, 
  onAddProperty,
  showViewAll = true 
}) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // If properties are passed via props, use them
    if (propProperties && propProperties.length > 0) {
      setProperties(propProperties);
      setLoading(false);
      return;
    }

    const fetchAgentProperties = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await api.getProperties(5);
        // Transform the data to include location field
        const transformed = (data.properties || []).map(p => ({
          ...p,
          location: 'Nairobi', // You can add location data if available
          status: p.listing_type // Map listing_type to status for StatusBadge
        }));
        setProperties(transformed);
      } catch (err) {
        console.error('Failed to fetch agent properties:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAgentProperties();
  }, [propProperties]);

  const handleViewAll = () => {
    if (onAddProperty) {
      onAddProperty();
    } else {
      navigate('/agent/properties');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <Building size={20} className="text-emerald-600" />
          Recent Properties
        </h2>
        {showViewAll && (
          <button 
            onClick={handleViewAll}
            className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
          >
            View All
          </button>
        )}
      </div>
      
      {loading ? (
        <div className="p-6 text-center text-slate-500">Loading properties...</div>
      ) : error ? (
        <div className="p-6 text-center text-red-500">{error}</div>
      ) : properties.length === 0 ? (
        <div className="p-6 text-center text-slate-500">No properties found</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {properties.map((property) => (
                <PropertyRow
                  key={property.id}
                  property={property}
                  onView={onViewProperty}
                  onEdit={onEditProperty}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AgentPropertyTable;

