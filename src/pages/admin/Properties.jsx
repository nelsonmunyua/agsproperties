import React, { useEffect, useState } from 'react';
import { Plus, Search, Filter, MoreVertical, MapPin, Bed, Bath, Square, Edit, Trash2, Eye } from 'lucide-react';
import { PageHeader, SearchBar, StatusBadge, Card, EmptyState } from '../../features/dashboard/components';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch properties data
  useEffect(() => {
    // Simulated API call
    setTimeout(() => {
      setProperties([
        {
          id: 1,
          title: "4 Bedroom Bungalow in Karen",
          location: "Karen, Nairobi",
          price: 25000000,
          beds: 4,
          baths: 3,
          sqft: 2500,
          type: "House",
          status: "available",
          agent: "James Wilson",
          views: 234,
          image: "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?w=100"
        },
        {
          id: 2,
          title: "5 Bedroom Mansion in Runda",
          location: "Runda, Nairobi",
          price: 45000000,
          beds: 5,
          baths: 4,
          sqft: 4500,
          type: "Villa",
          status: "available",
          agent: "Emily Davis",
          views: 189,
          image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=100"
        },
        {
          id: 3,
          title: "1 Bedroom Apartment Ngong Road",
          location: "Ngong Road, Nairobi",
          price: 4800000,
          beds: 1,
          baths: 1,
          sqft: 600,
          type: "Apartment",
          status: "sold",
          agent: "Robert Chen",
          views: 87,
          image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=100"
        },
        {
          id: 4,
          title: "3 Bedroom Townhouse Kileleshwa",
          location: "Kileleshwa, Nairobi",
          price: 18000000,
          beds: 3,
          baths: 2,
          sqft: 1800,
          type: "Townhouse",
          status: "available",
          agent: "Sarah Johnson",
          views: 156,
          image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=100"
        },
        {
          id: 5,
          title: "Plot of Land in Syokimau",
          location: "Syokimau, Nairobi",
          price: 3500000,
          beds: 0,
          baths: 0,
          sqft: 5000,
          type: "Land",
          status: "available",
          agent: "Michael Brown",
          views: 45,
          image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=100"
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const filteredProperties = properties.filter(
    (property) =>
      property.title.toLowerCase().includes(search.toLowerCase()) ||
      property.location.toLowerCase().includes(search.toLowerCase())
  );

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price).replace('KES', '₦');
  };

  const handleView = (property) => console.log('View property:', property);
  const handleEdit = (property) => console.log('Edit property:', property);
  const handleDelete = (property) => console.log('Delete property:', property);

  return (
    <div>
      <PageHeader
        title="Properties"
        subtitle="Manage all property listings on the platform"
        actionLabel="Add Property"
        onAction={() => console.log('Add property clicked')}
      />

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search properties..."
              className="max-w-md"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
              <Filter size={16} />
              Filter
            </button>
          </div>
        </div>
      </Card>

      {/* Properties Table */}
      <Card padding={false}>
        {loading ? (
          <div className="p-12 text-center text-slate-500">Loading properties...</div>
        ) : filteredProperties.length === 0 ? (
          <EmptyState
            title="No properties found"
            description="There are no properties matching your search criteria."
          />
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
                    Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Agent
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProperties.map((property) => (
                  <tr key={property.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-12 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                          {property.image ? (
                            <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
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
                      <span className="font-semibold text-emerald-600">{formatPrice(property.price)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <span className="flex items-center gap-1">
                          <Bed size={14} className="text-slate-400" />
                          {property.beds}
                        </span>
                        <span className="flex items-center gap-1">
                          <Bath size={14} className="text-slate-400" />
                          {property.baths}
                        </span>
                        <span className="flex items-center gap-1">
                          <Square size={14} className="text-slate-400" />
                          {property.sqft}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600">{property.type}</span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={property.status} />
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600">{property.agent}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleView(property)}
                          className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleEdit(property)}
                          className="p-2 hover:bg-amber-50 text-amber-600 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(property)}
                          className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Properties;

