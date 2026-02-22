import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { PageHeader, Card } from '../../features/dashboard/components';
import { 
  PropertyTable, 
  useProperties 
} from './components';
import AgentLayout from './AgentLayout';

const Properties = () => {
  const navigate = useNavigate();
  const { properties, loading, error, fetchProperties, deleteProperty, getProperty } = useProperties();
  
  const [search, setSearch] = useState('');

  // Filter properties based on search
  const filteredProperties = useMemo(() => {
    return properties.filter(
      (property) =>
        property.title?.toLowerCase().includes(search.toLowerCase()) ||
        property.location?.toLowerCase().includes(search.toLowerCase())
    );
  }, [properties, search]);

  // Handle View - navigate to property details page
  const handleView = (property) => {
    navigate(`/agent/properties/${property.id}`);
  };

  // Handle Edit - navigate to edit page
  const handleEdit = (property) => {
    navigate(`/agent/properties/${property.id}/edit`);
  };

  // Handle Delete with confirmation
  const handleDelete = async (property) => {
    if (!window.confirm(`Are you sure you want to delete "${property.title}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await deleteProperty(property.id);
    } catch (err) {
      console.error('Failed to delete property:', err);
      alert('Failed to delete property. Please try again.');
    }
  };

  // Handle Create - navigate to new property page
  const handleCreate = () => {
    navigate('/agent/properties/new');
  };

  return (
    <AgentLayout activeTab="properties">
      <PageHeader
        title="My Properties"
        subtitle="Manage all your property listings"
        actionLabel="Add Property"
        onAction={handleCreate}
      />

      {/* Search Filters */}
      <Card className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search properties by title or location..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
      </Card>

      {/* Properties Table */}
      <Card padding={false}>
        <PropertyTable
          properties={filteredProperties}
          loading={loading}
          error={error}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Card>
    </AgentLayout>
  );
};

export default Properties;

