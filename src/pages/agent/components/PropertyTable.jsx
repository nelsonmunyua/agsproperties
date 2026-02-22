import React from 'react';
import { MapPin } from 'lucide-react';
import { StatusBadge, EmptyState } from '../../../features/dashboard/components';
import PropertyCard from './PropertyCard';

const PropertyTable = ({ 
  properties, 
  loading, 
  error, 
  onView, 
  onEdit, 
  onDelete 
}) => {
  if (loading) {
    return (
      <div className="p-12 text-center text-slate-500">
        <div className="animate-spin w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        Loading properties...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-12 text-center">
        <div className="text-red-500 mb-2">Error: {error}</div>
        <button 
          onClick={() => window.location.reload()}
          className="text-emerald-600 hover:text-emerald-700 font-medium"
        >
          Try again
        </button>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <EmptyState
        title="No properties found"
        description="You haven't added any properties yet. Click 'Add Property' to get started."
      />
    );
  }

  return (
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
              Details
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Type
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
            <PropertyCard
              key={property.id}
              property={property}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropertyTable;

