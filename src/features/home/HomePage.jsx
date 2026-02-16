import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Home, Users, Building, ArrowRight, Bed, Bath, Square, CheckCircle, Star } from "lucide-react";
import FilterSearch from "./homefiltersearch";
import Navbar from "../../features/home/Navbar";
import Footer from "./Footer";
import Contact from "./Contact";
import PropertyModal from "./PropertyModal";

// Mock featured properties for demo
const featuredProperties = [
  {
    id: 1,
    title: "Modern Luxury Villa",
    location: "Nairobi, Kenya",
    price: "KSh 45,000,000",
    type: "Villa",
    bedrooms: 5,
    bathrooms: 4,
    sqft: 4500,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Downtown Apartment",
    location: "Nairobi, Kenya",
    price: "KSh 12,500,000",
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Beachfront Resort",
    location: "Mombasa, Kenya",
    price: "KSh 85,000,000",
    type: "Villa",
    bedrooms: 6,
    bathrooms: 5,
    sqft: 6200,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

export default function HomePage() {
  const [properties, setProperties] = useState([]);
  const [query, setSearchQuery] = useState("");
  const [filterProperties, setFilteredProperties] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [filters, setFilters] = useState({
    propertyType: "",
    location: "",
    propertyCategory: "",
    bedrooms: "",
  });

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    fetch(`${apiUrl}/properties`)
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
      })
      .catch((error) => console.error("Error fetching properties:", error));
  }, []);

  function handlePropertyClick(property) {
    setSelectedProperty(property);
  }

  function handleCloseModal() {
    setSelectedProperty(null);
  }

  function applyFilters() {
    let filtered = [...properties];

    if (query.trim() !== "") {
      filtered = filtered.filter(
        (item) =>
          item.location?.toLowerCase().includes(query.toLowerCase()) ||
          item.type?.toLowerCase().includes(query.toLowerCase()) ||
          item.title?.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (filters.propertyType) {
      filtered = filtered.filter(item => item.type?.toLowerCase() === filters.propertyType.toLowerCase());
    }

    if (filters.location) {
      filtered = filtered.filter(item => item.location?.toLowerCase().includes(filters.location.toLowerCase()));
    }

    if (filters.propertyCategory) {
      filtered = filtered.filter(item => item.propertyCategory?.toLowerCase().includes(filters.propertyCategory.toLowerCase()));
    }

    if (filters.bedrooms) {
      filtered = filtered.filter(item => item.bedrooms >= parseInt(filters.bedrooms));
    }

    setFilteredProperties(filtered);
    setShowSearchResults(true);
  }

  function handleSearchClick() {
    applyFilters();
  }

  function handleFilterChange(filterName, value) {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  }

  function handleClearFilters() {
    setFilters({
      propertyType: '',
      location: '',
      propertyCategory: '',
      bedrooms: '',
    });
    setSearchQuery("");
    setFilteredProperties([]);
    setShowSearchResults(false);
  }

  function handleClearSearch() {
    setSearchQuery("");
    setShowSearchResults(false);
    setFilteredProperties([]);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80')`,
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-slate-800/70 to-slate-900/80" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center pt-20">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-white text-sm font-medium">Kenya's #1 Real Estate Platform</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Find Your Perfect<br />
            <span className="text-emerald-400">Dream Home</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Discover thousands of properties across Kenya. From luxury villas to affordable apartments, find exactly what you're looking for.
          </p>

          {/* Search Box */}
          <div className="bg-white rounded-2xl p-4 max-w-4xl mx-auto shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Location"
                  value={query}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                />
              </div>
              <div className="relative">
                <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <select
                  value={filters.propertyCategory}
                  onChange={(e) => handleFilterChange('propertyCategory', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all appearance-none bg-white"
                >
                  <option value="">Property Type</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="villa">Villa</option>
                  <option value="office">Office</option>
                  <option value="land">Land</option>
                </select>
              </div>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <select
                  value={filters.propertyType}
                  onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all appearance-none bg-white"
                >
                  <option value="">Status</option>
                  <option value="sale">For Sale</option>
                  <option value="rent">For Rent</option>
                </select>
              </div>
              <button
                onClick={handleSearchClick}
                className="bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Search size={20} />
                Search
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { value: "2,000+", label: "Properties" },
              { value: "500+", label: "Agents" },
              { value: "10,000+", label: "Happy Clients" },
              { value: "50+", label: "Cities" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white">{stat.value}</p>
                <p className="text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Featured Properties</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Explore our hand-picked selection of premium properties across Kenya
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <div key={property.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                {/* Property Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-emerald-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                      {property.type}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                      <Star className="w-5 h-5 text-slate-400 hover:text-yellow-400" />
                    </button>
                  </div>
                </div>

                {/* Property Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
                    <MapPin size={16} />
                    {property.location}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{property.title}</h3>
                  <p className="text-2xl font-bold text-emerald-600 mb-4">{property.price}</p>
                  
                  <div className="flex items-center justify-between text-slate-600 py-4 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <Bed size={18} />
                      <span>{property.bedrooms} Beds</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bath size={18} />
                      <span>{property.bathrooms} Baths</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Square size={18} />
                      <span>{property.sqft.toLocaleString()} sqft</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => handlePropertyClick(property)}
                    className="w-full mt-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    View Details
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/signup"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200"
            >
              View All Properties
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Finding your dream property is easy with our simple process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Search className="w-8 h-8" />,
                title: "Search Properties",
                description: "Browse through thousands of listings using our powerful search and filters to find your perfect match."
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Connect with Agents",
                description: "Get in touch with verified agents who will guide you through the property and answer all your questions."
              },
              {
                icon: <Home className="w-8 h-8" />,
                title: "Move Into Your Home",
                description: "Complete the documentation and move into your dream home with our full support."
              }
            ].map((step, index) => (
              <div key={index} className="text-center p-8">
                <div className="w-20 h-20 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-emerald-400">
                  {step.icon}
                </div>
                <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-slate-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Find Your Dream Home?
              </h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Join thousands of happy homeowners who found their perfect property through AgsProperties.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/signup"
                  className="bg-white text-emerald-600 font-semibold py-3 px-8 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Get Started Free
                </Link>
                <Link 
                  to="/signin"
                  className="bg-white/20 backdrop-blur-sm text-white font-semibold py-3 px-8 rounded-xl hover:bg-white/30 transition-colors"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Results or Empty State */}
      {showSearchResults && (
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-900">
                Search Results ({filterProperties.length})
              </h2>
              <button 
                onClick={handleClearSearch}
                className="text-slate-600 hover:text-slate-900"
              >
                Clear Search
              </button>
            </div>
            <FilterSearch filterProperties={filterProperties} onPropertyClick={handlePropertyClick} />
          </div>
        </section>
      )}

      <Contact />
      <Footer />
      
      {/* Property Modal */}
      {selectedProperty && (
        <PropertyModal property={selectedProperty} onClose={handleCloseModal} />
      )}
    </div>
  );
}

