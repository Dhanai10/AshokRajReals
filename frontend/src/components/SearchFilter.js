import React, { useState } from 'react';
import './SearchFilter.css';

function SearchFilter({ onSearch, loading }) {
  const [filters, setFilters] = useState({
    city: '',
    propertyType: 'all',
    minSqft: '',
    maxSqft: '',
  });

  const handleChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleReset = () => {
    const reset = { city: '', propertyType: 'all', minSqft: '', maxSqft: '' };
    setFilters(reset);
    onSearch(reset);
  };

  return (
    <div className="search-filter-wrap">
      <div className="search-filter-inner">
        <div className="filter-header">
          <span className="section-eyebrow">Find Your Property</span>
          <h2 className="filter-title">Search & Filter</h2>
        </div>
        <form onSubmit={handleSubmit} className="filter-form">
          <div className="filter-grid">
            <div className="filter-field">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={filters.city}
                onChange={handleChange}
                placeholder="e.g. Miami, Austin..."
                className="form-control"
              />
            </div>
            <div className="filter-field">
              <label>Property Type</label>
              <select name="propertyType" value={filters.propertyType} onChange={handleChange} className="form-select">
                <option value="all">All Types</option>
                <option value="House">House</option>
                <option value="Land">Land</option>
              </select>
            </div>
            <div className="filter-field">
              <label>Min Sqft</label>
              <input
                type="number"
                name="minSqft"
                value={filters.minSqft}
                onChange={handleChange}
                placeholder="e.g. 1000"
                min="0"
                className="form-control"
              />
            </div>
            <div className="filter-field">
              <label>Max Sqft</label>
              <input
                type="number"
                name="maxSqft"
                value={filters.maxSqft}
                onChange={handleChange}
                placeholder="e.g. 5000"
                min="0"
                className="form-control"
              />
            </div>
          </div>
          <div className="filter-actions">
            <button type="submit" className="btn-gold" disabled={loading}>
              {loading ? (
                <span className="d-flex align-items-center gap-2">
                  <span className="spinner-border spinner-border-sm" />
                  Searching...
                </span>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  &nbsp; Search Properties
                </>
              )}
            </button>
            <button type="button" className="btn-reset" onClick={handleReset}>
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SearchFilter;
