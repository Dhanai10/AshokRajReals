import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProperties, createProperty, deleteProperty } from '../services/api';
import './AdminDashboard.css';

function AdminDashboard() {
  const [properties, setProperties] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [alert, setAlert] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [form, setForm] = useState({
    propertyType: 'House',
    city: '',
    sqft: '',
    description: '',
    image: null,
  });
  const navigate = useNavigate();

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    setLoadingList(true);
    try {
      const res = await getProperties();
      setProperties(res.data.data || []);
    } catch {
      showAlert('error', 'Failed to load properties.');
    } finally {
      setLoadingList(false);
    }
  };

  const showAlert = (type, msg) => {
    setAlert({ type, msg });
    setTimeout(() => setAlert(null), 5000);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files[0]) {
      setForm((prev) => ({ ...prev, image: files[0] }));
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('propertyType', form.propertyType);
      fd.append('city', form.city);
      fd.append('sqft', form.sqft);
      fd.append('description', form.description);
      if (form.image) fd.append('image', form.image);

      await createProperty(fd);
      showAlert('success', 'Property uploaded successfully!');
      setForm({ propertyType: 'House', city: '', sqft: '', description: '', image: null });
      setImagePreview(null);
      fetchAll();
    } catch (err) {
      showAlert('error', err.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    setDeleteId(id);
    try {
      await deleteProperty(id);
      setProperties((prev) => prev.filter((p) => p.id !== id));
      showAlert('success', 'Property deleted.');
    } catch {
      showAlert('error', 'Failed to delete property.');
    } finally {
      setDeleteId(null);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    navigate('/');
  };

  return (
    <main className="admin-page">
      {/* Admin Header */}
      <div className="admin-header">
        <div className="admin-header-inner">
          <div>
            <span className="section-eyebrow">Admin Portal</span>
            <h1 className="admin-title">Property Dashboard</h1>
          </div>
          <div className="admin-header-actions">
            <span className="admin-badge">
              <span className="badge-dot" />
              {properties.length} Properties
            </span>
            <button className="btn-outline-gold" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>

      <div className="admin-body">
        {/* Alert */}
        {alert && (
          <div className={`admin-alert ${alert.type}`}>
            {alert.type === 'success' ? '✓' : '⚠'} {alert.msg}
          </div>
        )}

        <div className="admin-grid">
          {/* Upload Form */}
          <div className="upload-panel">
            <div className="panel-header">
              <h2 className="panel-title">Upload New Property</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Property Type</label>
                <select name="propertyType" value={form.propertyType} onChange={handleChange} className="form-select">
                  <option value="House">House</option>
                  <option value="Land">Land</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">City</label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g. Miami, Austin"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Square Feet (sqft)</label>
                <input
                  type="number"
                  name="sqft"
                  value={form.sqft}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g. 2500"
                  min="1"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="form-control"
                  rows="4"
                  placeholder="Describe the property..."
                  required
                />
              </div>
              <div className="mb-4">
                <label className="form-label">Property Image</label>
                <div className="image-upload-area" onClick={() => document.getElementById('imageInput').click()}>
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="image-preview" />
                  ) : (
                    <div className="upload-placeholder">
                      <div className="upload-icon">↑</div>
                      <p>Click to upload image</p>
                      <small>JPG, PNG, WEBP up to 10MB</small>
                    </div>
                  )}
                </div>
                <input
                  id="imageInput"
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  style={{ display: 'none' }}
                />
                {imagePreview && (
                  <button
                    type="button"
                    className="btn-remove-img"
                    onClick={() => { setImagePreview(null); setForm(f => ({ ...f, image: null })); }}
                  >
                    Remove image
                  </button>
                )}
              </div>
              <button type="submit" className="btn-gold w-100" disabled={submitting}>
                {submitting ? (
                  <span className="d-flex align-items-center justify-content-center gap-2">
                    <span className="spinner-border spinner-border-sm" />
                    Uploading...
                  </span>
                ) : 'Upload Property'}
              </button>
            </form>
          </div>

          {/* Properties List */}
          <div className="properties-panel">
            <div className="panel-header">
              <h2 className="panel-title">All Properties</h2>
            </div>

            {loadingList && (
              <div className="admin-loading">
                <div className="loading-spinner" />
                <p>Loading properties...</p>
              </div>
            )}

            {!loadingList && properties.length === 0 && (
              <div className="admin-empty">
                <div style={{ fontSize: '2rem', color: 'var(--gold)', marginBottom: '12px' }}>◈</div>
                <p>No properties yet. Upload your first property!</p>
              </div>
            )}

            {!loadingList && properties.length > 0 && (
              <div className="admin-properties-list">
                {properties.map((p) => (
                  <div key={p.id} className="admin-property-item">
                    <div className="admin-prop-img-wrap">
                      <img
                        src={p.image_url || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=200&q=70'}
                        alt={p.city}
                        className="admin-prop-img"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=200&q=70'; }}
                      />
                    </div>
                    <div className="admin-prop-info">
                      <div className="admin-prop-type">{p.property_type}</div>
                      <div className="admin-prop-city">{p.city}</div>
                      <div className="admin-prop-sqft">{p.sqft?.toLocaleString()} sqft</div>
                      <p className="admin-prop-desc">{p.description}</p>
                    </div>
                    <button
                      className="admin-delete-btn"
                      onClick={() => handleDelete(p.id)}
                      disabled={deleteId === p.id}
                      title="Delete property"
                    >
                      {deleteId === p.id ? '...' : '✕'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminDashboard;
