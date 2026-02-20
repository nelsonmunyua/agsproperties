import { useState } from "react";
import "./filter.css";

const Filter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    propertyType: [],
    propertyCategory: [],
    priceRange: "",
    minPrice: 400000,
    maxPrice: 800000,
  });

  const propertyTypes = ["rent", "sale"];

  const propertyCategory = [
    "flat",
    "bungalow",
    "apartment",
    "mansion",
    "house",
    "commercial",
    "farm house",
  ];

  const priceRanges = [
    "Under ksh 200000",
    "Ksh 200000 - Ksh 500000",
    "Ksh 500000 - ksh 1M",
    "> Ksh 1M",
  ];

  const handlePropertyTypeChange = (type) => {
    const newTypes = filters.propertyType.includes(type)
      ? filters.propertyType.filter((t) => t !== type)
      : [...filters.propertyType, type];

    const newFilters = { ...filters, propertyType: newTypes };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handlePropertyCategoryChange = (category) => {
    const newCategory = filters.propertyCategory.includes(category)
      ? filters.propertyCategory.filter((c) => c !== category)
      : [...filters.propertyCategory, category];

    const newFilters = { ...filters, propertyCategory: newCategory };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handlePriceRangeChange = (range) => {
    const newFilters = { ...filters, priceRange: range };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handlePriceSliderChange = (type, value) => {
    const newValue = parseInt(value);
    const newFilters = { ...filters, [type]: newValue };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const formatPrice = (price) => {
    if (price >= 1000000) return `Ksh${(price / 1000000).toFixed(1)}M`;
    if (price >= 1000) return `Ksh${(price / 1000).toFixed(0)}K`;
    return `Ksh${price}`;
  };

  return (
    <div className="filter-container">
      <h3 className="filter-title">Filter by</h3>

      {/* Property Type */}
      <div className="filter-group">
        <h4 className="filter-subtitle">Type</h4>
        <div className="checkbox-group">
          {propertyTypes.map((type) => (
            <label key={type} className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.propertyType.includes(type)}
                onChange={() => handlePropertyTypeChange(type)}
                className="checkbox-input"
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      {/* Property Category */}
      <div className="filter-group">
        <h4 className="filter-subtitle">Category</h4>
        <div className="checkbox-group">
          {propertyCategory.map((category) => (
            <label key={category} className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.propertyCategory.includes(category)}
                onChange={() => handlePropertyCategoryChange(category)}
                className="checkbox-input"
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="filter-group">
        <h4 className="filter-subtitle">Price</h4>
        <div className="checkbox-group">
          {priceRanges.map((range) => (
            <label key={range} className="radio-label">
              <input
                type="radio"
                name="priceRange"
                checked={filters.priceRange === range}
                onChange={() => handlePriceRangeChange(range)}
                className="radio-input"
              />
              {range}
            </label>
          ))}
        </div>

        <div className="custom-price-range">
          <div className="price-slider-header">Custom Range</div>
          <div className="slider-values">
            <span>{formatPrice(filters.minPrice)}</span>
            <span>{formatPrice(filters.maxPrice)}</span>
          </div>
          <input
            type="range"
            min="200000"
            max="1000000"
            step="10000"
            value={filters.minPrice}
            onChange={(e) =>
              handlePriceSliderChange("minPrice", e.target.value)
            }
            className="slider"
          />
          <input
            type="range"
            min="200000"
            max="1000000"
            step="10000"
            value={filters.maxPrice}
            onChange={(e) =>
              handlePriceSliderChange("maxPrice", e.target.value)
            }
            className="slider"
          />
        </div>
      </div>

      <div className="filter-actions">
        <button
          className="reset-button"
          onClick={() => {
            const resetFilters = {
              propertyType: [],
              propertyCategory: [],
              priceRange: "",
              minPrice: 400000,
              maxPrice: 800000,
            };
            setFilters(resetFilters);
            onFilterChange?.(resetFilters);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Filter;

