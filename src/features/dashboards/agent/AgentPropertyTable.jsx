import React from 'react';
import { Building, Eye, Edit, MoreVertical } from 'lucide-react';
import { StatusBadge } from '../../dashboard/components';

const PropertyRow = ({ property, onView, onEdit }) => {
  const {
    title = "Property Title",
    location = "Location",
    price = "₦0",
    status = "pending",
    views = 0,
    image,
  } = property || {};

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
            <p className="font-medium text-slate-900">{title}</p>
            <p className="text-sm text-slate-500">{location}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="font-semibold text-slate-900">{price}</span>
      </td>
      <td className="px-6 py-4">
        <StatusBadge status={status} />
      </td>
      <td className="px-6 py-4">
        <span className="text-slate-600">{views}</span>
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

const AgentPropertyTable = ({ properties = [], onViewProperty, onEditProperty, onAddProperty }) => {
  const sampleProperties = [
    {
      id: 1,
      title: "4 Bedroom Bungalow",
      location: "Karen, Nairobi",
      price: "₦25,000,000",
      status: "active",
      views: 234,
      image: "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?w=100"
    },
    {
      id: 2,
      title: "5 Bedroom Mansion",
      location: "Runda, Nairobi",
      price: "₦45,000,000",
      status: "active",
      views: 189,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=100"
    },
    {
      id: 3,
      title: "1 Bedroom Apartment",
      location: "Ngong Road, Nairobi",
      price: "₦4,800,000",
      status: "pending",
      views: 87,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=100"
    },
  ];

  const displayProperties = properties.length > 0 ? properties : sampleProperties;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <Building size={20} className="text-emerald-600" />
          Recent Properties
        </h2>
        {onAddProperty && (
          <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
            View All
          </button>
        )}
      </div>
      
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
            {displayProperties.map((property) => (
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
    </div>
  );
};

export default AgentPropertyTable;

