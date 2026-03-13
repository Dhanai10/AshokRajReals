import React, { useState, useEffect } from 'react';
import PropertyCard from '../components/PropertyCard';
import SearchFilter from '../components/SearchFilter';
import PropertyModal from '../components/PropertyModal';
import { getProperties } from '../services/api';
import './Home.css';

function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeFilters, setActiveFilters] = useState({});
  const [searched, setSearched] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    fetchProperties({});
  }, []);

  const fetchProperties = async (filters) => {
    setLoading(true);
    setError('');
    setSearched(true);
    try {
      const res = await getProperties(filters);
      setProperties(res.data.data || []);
    } catch {
      setError('Unable to load properties. Please check that the backend server is running.');
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (filters) => {
    setActiveFilters(filters);
    fetchProperties(filters);
    document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="home-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-content fade-in-up">
          <span className="section-eyebrow hero-eyebrow">Luxury Real Estate</span>
          <h1 className="hero-title">
            Discover Your<br />
            <span className="hero-gold">Perfect Estate</span>
          </h1>
          <p className="hero-sub">
            Curated premium properties across the most sought-after<br />
            locations. Where luxury meets lifestyle.
          </p>
          <div className="hero-stats">
            <div className="stat"><span className="stat-num">500+</span><span className="stat-label">Properties</span></div>
            <div className="stat-divider" />
            <div className="stat"><span className="stat-num">48</span><span className="stat-label">Cities</span></div>
            <div className="stat-divider" />
            <div className="stat"><span className="stat-num">12yr</span><span className="stat-label">Experience</span></div>
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* Search Filter */}
      <section className="filter-section">
        <div className="container-xl">
          <SearchFilter onSearch={handleSearch} loading={loading} />
        </div>
      </section>

      {/* Properties Section */}
      <section id="properties" className="properties-section">
        <div className="container-xl">
          <div className="section-header">
            <div>
              <span className="section-eyebrow">Our Portfolio</span>
              <h2 className="section-title">Featured Properties</h2>
              <div className="gold-divider" />
            </div>
            {searched && (
              <p className="results-count">
                {properties.length} {properties.length === 1 ? 'property' : 'properties'} found
              </p>
            )}
          </div>

          {loading && (
            <div className="loading-state">
              <div className="loading-spinner" />
              <p>Searching properties...</p>
            </div>
          )}

          {error && (
            <div className="error-state">
              <div className="error-icon">⚠</div>
              <h3>Connection Error</h3>
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && properties.length === 0 && searched && (
            <div className="empty-state">
              <div className="empty-icon">◈</div>
              <h3>No Properties Found</h3>
              <p>Try adjusting your search filters to discover more properties.</p>
            </div>
          )}

          {!loading && !error && properties.length > 0 && (
            <div className="properties-grid stagger">
              {properties.map((property) => (
                <div key={property.id} className="property-col">
                  <PropertyCard
                    property={property}
                    onViewDetails={(p) => setSelectedProperty(p)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}

      {/* Why Choose Us */}
      <section className="features-section">
        <div className="container-xl">
          <div className="text-center mb-5">
            <span className="section-eyebrow">Why Prestige Estates</span>
            <h2 className="section-title mt-2">The Standard of Excellence</h2>
            <div className="gold-divider mx-auto" />
          </div>
          <div className="features-grid stagger">
            {[
              { icon: '◆', title: 'Curated Listings', desc: 'Every property is hand-selected and verified by our team of expert agents.' },
              { icon: '◈', title: 'Prime Locations', desc: 'Access to exclusive properties in the most desirable neighborhoods.' },
              { icon: '◇', title: 'Expert Guidance', desc: 'Personalized support from search to closing with seasoned professionals.' },
              { icon: '○', title: 'Trusted Since 2012', desc: 'Over a decade of excellence in luxury real estate across 48 cities.' },
            ].map((f) => (
              <div key={f.title} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h4 className="feature-title">{f.title}</h4>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-bg" />
        <div className="container-xl cta-content">
          <span className="section-eyebrow" style={{ color: 'var(--gold-light)' }}>Get In Touch</span>
          <h2 className="cta-title">Ready to Find Your Dream Property?</h2>
          <p className="cta-sub">Our expert team is ready to guide you through every step of the journey.</p>
          <a href="/contact" className="btn-gold">Contact Us Today</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container-xl footer-inner">
          <div className="footer-brand">
            <span className="brand-icon">◆</span>
            <span className="footer-brand-text">PRESTIGE<span style={{ color: 'var(--gold)' }}>ESTATES</span></span>
          </div>
          <p className="footer-copy">© {new Date().getFullYear()} Prestige Estates. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}

export default Home;
