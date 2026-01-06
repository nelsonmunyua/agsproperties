import React, { useState, useEffect } from "react";

export default function FilterSearch({ filterProperties, onPropertyClick }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Reset to page 1 when filterProperties changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filterProperties]);

  const handlePropertyClick = (property) => {
    if (onPropertyClick) {
      onPropertyClick(property);
    }
  };

  // Calculate pagination values
  const totalPages = Math.ceil(filterProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProperties = filterProperties.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPaginationButtons = () => {
    if (totalPages <= 1) return null;

    const buttons = [];
    const maxVisibleButtons = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    // Previous button
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-lg bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        Previous
      </button>
    );

    // First page and ellipsis if needed
    if (startPage > 1) {
      buttons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="px-3 py-2 rounded-lg bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors duration-200"
        >
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(
          <span key="ellipsis-start" className="px-2 py-2 text-gray-500">
            ...
          </span>
        );
      }
    }

    // Page number buttons
    for (let page = startPage; page <= endPage; page++) {
      buttons.push(
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-3 py-2 rounded-lg border transition-colors duration-200 ${
            currentPage === page
              ? "bg-indigo-600 border-indigo-600 text-white"
              : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
          }`}
        >
          {page}
        </button>
      );
    }

    // Last page and ellipsis if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="ellipsis-end" className="px-2 py-2 text-gray-500">
            ...
          </span>
        );
      }
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-3 py-2 rounded-lg bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors duration-200"
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-lg bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        Next
      </button>
    );

    return buttons;
  };

  return (
    <section className="bg-gray-200 py-6">
      <h2 className="text-center text-2xl font-semibold mb-6">Search Results</h2>

      {filterProperties.length === 0 ? (
        <p className="text-center text-gray-600">
          No properties found matching your search criteria.
        </p>
      ) : (
        <>
          {/* Results count */}
          <div className="max-w-[800px] mx-auto px-4 mb-4">
            <p className="text-gray-600 text-sm">
              Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filterProperties.length)} of{" "}
              {filterProperties.length} properties
            </p>
          </div>

          {/* Properties list */}
          <div className="max-w-[800px] mx-auto p-4 space-y-4">
            {currentProperties.map((property) => (
              <div
                key={property.id}
                onClick={() => handlePropertyClick(property)}
                className="flex bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transform transition-all duration-300 cursor-pointer"
              >
                {/* Image side - fixed unrealistic aspect ratio */}
                <div className="w-1/2 relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
                    }}
                  />
                  {/* Added property status badge */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium text-gray-700">
                    {property.status || 'For Sale'}
                  </div>
                </div>

                {/* Details side - enhanced with realistic information */}
                <div className="w-1/2 p-5 flex flex-col justify-center transition-colors duration-300 hover:bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
                    {property.title}
                  </h3>
                  <p className="text-gray-600 mb-1 text-sm line-clamp-1">
                    {property.location}
                  </p>
                  <p className="text-indigo-600 font-bold text-lg mb-2">
                    ${property.price.toLocaleString()}
                  </p>
                  
                  {/* Added basic property features */}
                  <div className="flex gap-4 text-xs text-gray-500">
                    {property.bedrooms && (
                      <span>{property.bedrooms} bed</span>
                    )}
                    {property.bathrooms && (
                      <span>{property.bathrooms} bath</span>
                    )}
                    {property.area && (
                      <span>{property.area} sq ft</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="max-w-[800px] mx-auto px-4 mt-8">
              <div className="flex justify-center items-center space-x-2">
                {renderPaginationButtons()}
              </div>
              
              {/* Mobile pagination info */}
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}