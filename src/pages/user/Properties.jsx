import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import PropertyList from '../../features/dashboards/user/PropertyList';
import Filter from '../../features/dashboards/user/Filter';
import { UserHeader } from '../../features/dashboards/user/index';

const Properties = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [userData, setUserData] = useState({});

  // Get user data from localStorage
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setUserData(JSON.parse(user));
    }
  }, []);

  // Fetch all properties on mount
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    fetch(`${apiUrl}/user/properties`)
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setFilteredProperties(data);
      })
      .catch((error) => console.error("Error fetching properties:", error));
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    navigate('/signin');
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase();
    
    if (!query) {
      setFilteredProperties(properties);
      return;
    }

    const filtered = properties.filter(property => 
      property.title?.toLowerCase().includes(query) ||
      property.location?.toLowerCase().includes(query) ||
      property.description?.toLowerCase().includes(query)
    );
    
    setFilteredProperties(filtered);
    setSearchResults(filtered);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
    setFilteredProperties(properties);
    setSearchResults([]);
  };

  // Handle filters from Filter component
  const handleFilterChange = (filters) => {
    let results = [...(searchResults.length ? searchResults : properties)];

    // Property Type Filter
    if (filters.propertyType.length > 0) {
      results = results.filter((p) => filters.propertyType.includes(p.listing_type));
    }

    // Property Category Filter (property_type from backend)
    if (filters.propertyCategory.length > 0) {
      results = results.filter((p) => 
        filters.propertyCategory.some(cat => 
          p.property_type?.toLowerCase() === cat.toLowerCase()
        )
      );
    }

    // Price Range Filter (preset ranges)
    if (filters.priceRange) {
      results = results.filter((p) => {
        const price = p.price || 0;
        switch (filters.priceRange) {
          case "Under ksh 200000":
            return price < 200000;
          case "Ksh 200000 - Ksh 500000":
            return price >= 200000 && price <= 500000;
          case "Ksh 500000 - ksh 1M":
            return price >= 500000 && price <= 1000000;
          case "> Ksh 1M":
            return price > 1000000;
          default:
            return true;
        }
      });
    }

    // Custom Price Range Filter (slider values)
    if (filters.minPrice > 400000 || filters.maxPrice < 800000) {
      results = results.filter((p) => {
        const price = p.price || 0;
        return price >= filters.minPrice && price <= filters.maxPrice;
      });
    }

    setFilteredProperties(results);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <UserHeader userData={userData} onLogout={handleLogout} />
      
      {/* Search Bar Section */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search properties by title, location, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
              />
              <svg 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              {searchQuery && (
                <button 
                  type="button" 
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
            <button 
              type="submit" 
              className="px-5 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors text-sm"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Filter Sidebar - Fixed/Sticky */}
          <aside className="w-48 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sticky top-20">
              <Filter properties={properties} onFilterChange={handleFilterChange} />
            </div>
          </aside>

          {/* Properties List */}
          <div className="flex-1">
            <div className="mb-4">
              <h1 className="text-xl font-bold text-slate-900">Available Properties</h1>
              <p className="text-sm text-slate-600 mt-0.5">{filteredProperties.length} properties found</p>
            </div>
            
            {filteredProperties.length > 0 ? (
              <PropertyList properties={filteredProperties} />
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 text-center">
                <p className="text-slate-500 text-sm mb-3">No properties match your search criteria.</p>
                <button 
                  onClick={clearSearch} 
                  className="px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors text-sm"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Properties;

