import React, { useEffect } from 'react';
import './PropertyModal.css';

function PropertyModal({ property, onClose }) {
  const fallbackImage = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80';

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!property) return null;

  const { property_type, city, sqft, description, image_url, created_at } = property;

  const features = property_type === 'House'
    ? ['Private Driveway', 'Modern Kitchen', 'Central A/C', 'Spacious Backyard', 'Open Floor Plan', 'Natural Lighting']
    : ['Clear Title Deed', 'Road Access', 'Utility-Ready', 'Survey Completed', 'Development Potential', 'Prime Location'];

  const formattedDate = created_at
    ? new Date(created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'Recently Listed';

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>

        {/* Close Button */}
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Hero Image */}
        <div className="modal-image-wrap">
          <img
            src={image_url || fallbackImage}
            alt={`${property_type} in ${city}`}
            className="modal-image"
            onError={(e) => { e.target.src = fallbackImage; }}
          />
          <div className="modal-image-overlay" />
          <div className="modal-image-info">
            <span className="modal-badge">{property_type}</span>
            <div className="modal-city-tag">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              {city}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="modal-content">

          {/* Header */}
          <div className="modal-header-section">
            <div>
              <h2 className="modal-title">{property_type} in {city}</h2>
              <p className="modal-listed">Listed: {formattedDate}</p>
            </div>
            <div className="modal-sqft-badge">
              <span className="sqft-number">{sqft?.toLocaleString()}</span>
              <span className="sqft-unit">sqft</span>
            </div>
          </div>

          <div className="modal-divider" />

          {/* Stats Row */}
          <div className="modal-stats">
            <div className="modal-stat">
              <div className="modal-stat-icon">◆</div>
              <div className="modal-stat-label">Type</div>
              <div className="modal-stat-value">{property_type}</div>
            </div>
            <div className="modal-stat">
              <div className="modal-stat-icon">◈</div>
              <div className="modal-stat-label">Location</div>
              <div className="modal-stat-value">{city}</div>
            </div>
            <div className="modal-stat">
              <div className="modal-stat-icon">◇</div>
              <div className="modal-stat-label">Area</div>
              <div className="modal-stat-value">{sqft?.toLocaleString()} sqft</div>
            </div>
            <div className="modal-stat">
              <div className="modal-stat-icon">○</div>
              <div className="modal-stat-label">Status</div>
              <div className="modal-stat-value available">Available</div>
            </div>
          </div>

          <div className="modal-divider" />

          {/* Description */}
          <div className="modal-section">
            <h3 className="modal-section-title">About This Property</h3>
            <p className="modal-description">{description}</p>
          </div>

          {/* Features */}
          <div className="modal-section">
            <h3 className="modal-section-title">Key Features</h3>
            <div className="modal-features">
              {features.map((f) => (
                <div key={f} className="modal-feature-item">
                  <span className="feature-check">✓</span>
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="modal-cta">
            <a
              href={`https://wa.me/9865828795?text=Hi! I'm interested in the ${property_type} in ${city} (${sqft?.toLocaleString()} sqft). Can you share more details?`}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-btn-whatsapp"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="18" height="18" fill="white">
                <path d="M16 0C7.164 0 0 7.163 0 16c0 2.833.738 5.493 2.027 7.8L0 32l8.418-2.004A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm7.27 22.455c-.398-.199-2.354-1.162-2.719-1.294-.364-.133-.63-.199-.895.199-.265.398-1.029 1.294-1.261 1.56-.232.265-.464.298-.862.1-.398-.2-1.681-.62-3.203-1.977-1.184-1.057-1.983-2.362-2.215-2.76-.232-.398-.025-.614.175-.812.18-.178.398-.464.597-.696.2-.232.265-.398.398-.664.133-.265.066-.497-.033-.696-.1-.199-.895-2.158-1.227-2.954-.323-.775-.65-.67-.895-.682l-.762-.013c-.265 0-.696.1-1.061.497-.364.398-1.393 1.362-1.393 3.32s1.427 3.851 1.626 4.116c.199.265 2.808 4.287 6.802 6.012.951.41 1.693.655 2.271.839.954.303 1.823.26 2.51.158.766-.114 2.354-.963 2.686-1.893.332-.93.332-1.727.232-1.893-.099-.165-.364-.265-.762-.464z"/>
              </svg>
              Enquire on WhatsApp
            </a>
            <a href="/contact" className="modal-btn-contact">
              Send a Message
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

export default PropertyModal;
