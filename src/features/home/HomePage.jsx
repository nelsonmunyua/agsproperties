import React, { useState, useEffect } from "react";
import "/src/css/homepage.css"
import FilterSearch from "./homefiltersearch";
import Navbar from "../../features/home/Navbar";
import Footer from "./Footer";
import Contact from "./Contact";

export default function HomePage() {
  const [properties, setProperties] = useState([]);
  const [query, setSearchQuery] = useState("");
  const [filterProperties, setFilteredProperties] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [filters, setFilters] = useState({
    propertyType: "",
    location: "",
    propertyCategory: "",
    bedrooms: "",
  });

  useEffect(() => {
    // const apiUrl = import.meta.env.VITE_API_URL;
    // fetch(`${apiUrl}/properties`)
       fetch("http://localhost:3000/properties")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        console.log("Fetched properties:", data);
      })
      .catch((error) => console.error("Error fetching properties:", error));
  }, []);

  // Apply both search and filters
  function applyFilters() {
    let filtered = [...properties];

    // Apply text search
    if (query.trim() !== "") {
      filtered = filtered.filter(
        (item) =>
          item.location?.toLowerCase().includes(query.toLowerCase()) ||
          item.type?.toLowerCase().includes(query.toLowerCase()) ||
          item.title?.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Apply property status filter
    if(filters.propertyType) {
        filtered = filtered.filter(item => item.type?.toLowerCase() === filters.propertyType.toLowerCase()
    );
    }

    // Apply location filter
    if(filters.location) {
        filtered = filtered.filter(item => item.location?.toLowerCase().includes(filters.location.toLowerCase()));
    }

    // Apply property type filter
    if(filters.propertyCategory) {
        filtered = filtered.filter(item => item.propertyCategory?.toLowerCase().includes(filters.propertyCategory.toLowerCase()));
    }

    // Apply bedrooms filter
    if (filters.bedrooms) {
        filtered = filtered.filter(item => item.bedrooms >= parseInt(filters.bedrooms))
    }

    setFilteredProperties(filtered);
    setShowSearchResults(true);
     console.log("Applied filters:", filters);
        console.log("Filtered properties:", filtered);

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

//   // Check if any filters are active
//     const areFiltersActive = filters.propertyStatus || filters.location || 
//                            filters.propertyType || filters.bedrooms;
    return (
        <div>
           <Navbar />

            <section className="property-search-filter">
                <h2>Find Your Perfect Property</h2>

                <div className="search-bar">
                    <input 
                        type="text" 
                        placeholder="Enter keywords, e.g. apartment, office, city..." 
                        value={query}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearchClick()}
                        className="search-input"
                    />
                    <button onClick={handleSearchClick} className="search-button">
                        Search
                    </button>
                    {showSearchResults && (
                        <button onClick={handleClearSearch} className="clear-search-button">
                            Clear Search
                        </button>
                    )}
                </div>

                <div className="filters-container">
                    <div className="filter-group">
                        <label htmlFor="property-status">Property Type</label>
                        <select 
                            id="property-status"
                            value={filters.propertyType}
                            onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                        >
                            <option value="">All</option>
                            <option value="rent">For Rent</option>
                            <option value="sale">For Sale</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label htmlFor="location">Location</label>
                        <select 
                            id="location"
                            value={filters.location}
                            onChange={(e) => handleFilterChange('location', e.target.value)}
                        >
                            <option value="">Any Location</option>
                            <option value="nairobi">Nairobi</option>
                            <option value="mombasa">Mombasa</option>
                            <option value="kisumu">Kisumu</option>
                            <option value="nakuru">Nakuru</option>
                            <option value="eldoret">Eldoret</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label htmlFor="property-type">Property Category</label>
                        <select 
                            id="property-type"
                            value={filters.propertyCategory}
                            onChange={(e) => handleFilterChange('propertyCategory', e.target.value)}
                        >
                            <option value="">Any Type</option>
                            <option value="apartment">Apartment</option>
                            <option value="house">House</option>
                            <option value="bung">Villa</option>
                            <option value="office">Office</option>
                            <option value="commercial">Commercial</option>
                            <option value="land">Land</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label htmlFor="bedrooms">Bedrooms</label>
                        <select 
                            id="bedrooms"
                            value={filters.bedrooms}
                            onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                        >
                            <option value="">Any</option>
                            <option value="1">1+</option>
                            <option value="2">2+</option>
                            <option value="3">3+</option>
                            <option value="4">4+</option>
                            <option value="5">5+</option>
                        </select>
                    </div>

                  

                    <div className="filter-buttons">
                        <button onClick={applyFilters} className="apply-filters-button">
                            Apply Filters
                        </button>
                        <button onClick={handleClearFilters} className="clear-filters-button">
                            Clear All
                        </button>
                    </div>

                    {/* {areFiltersActive && (
                        <div className="active-filters">
                            <span>Active filters:</span>
                            {filters.propertyType && (
                                <span className="filter-tag">Type: {filters.propertyType}</span>
                            )}
                            {filters.location && (
                                <span className="filter-tag">Location: {filters.location}</span>
                            )}
                            {filters.propertyType && (
                                <span className="filter-tag">Category: {filters.propertyCategory}</span>
                            )}
                            {filters.bedrooms && (
                                <span className="filter-tag">Bedrooms: {filters.bedrooms}+</span>
                            )}
                            {filters.maxPrice < 1000000 && (
                                <span className="filter-tag">Max Price: ${filters.maxPrice.toLocaleString()}</span>
                            )}
                        </div>
                    )} */}
                </div>
            </section>

            {showSearchResults && (
                <FilterSearch filterProperties={filterProperties} />
            )}

            {!showSearchResults && (
                <section className="how-it-works">
                    <div className="container">
                        <h2>How It Works</h2>
                        <p className="section-description">Finding your dream property or selling your home is easy with us. Follow these simple steps:</p>

                        <div className="steps-grid">
                            <div className="step-card">
                                <div className="step-icon">1</div>
                                <h3>Explore & Search</h3>
                                <p>Browse through thousands of listings or use our advanced filters to find properties that match your exact criteria.</p>
                            </div>

                            <div className="step-card">
                                <div className="step-icon">2</div>
                                <h3>Connect with Agents</h3>
                                <p>Once you find a property you love, connect directly with verified agents to arrange viewings and get expert advice.</p>
                            </div>

                            <div className="step-card">
                                <div className="step-icon">3</div>
                                <h3>Secure Your Property</h3>
                                <p>Work with our network of professionals to navigate the purchasing process smoothly, from offers to closing the deal.</p>
                            </div>
                        </div>

                        <div className="how-it-works-cta">
                            <a href="#" className="primary-cta-button">Start Your Property Search Now</a>
                        </div>
                    </div>
                </section>
            )}
            <Contact />
            <Footer />
        </div>
    )
}