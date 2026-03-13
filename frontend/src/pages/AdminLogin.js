import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import './AdminLogin.css';

function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await login(form);
      if (res.data.success) {
        sessionStorage.setItem('adminAuth', 'true');
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login-page">
      <div className="login-bg" />
      <div className="login-overlay" />
      <div className="login-container fade-in-up">
        <div className="login-card">
          <div className="login-logo">
            <span className="login-logo-icon">◆</span>
            <span className="login-logo-text">PRESTIGE<span>ESTATES</span></span>
          </div>
          <div className="login-divider" />
          <h2 className="login-title">Admin Portal</h2>
          <p className="login-sub">Sign in to manage your properties</p>

          {error && (
            <div className="login-error">
              <span>⚠</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label">Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                className="form-control"
                placeholder="admin"
                required
                autoComplete="username"
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="form-control"
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>
            <button type="submit" className="btn-gold w-100" disabled={loading}>
              {loading ? (
                <span className="d-flex align-items-center justify-content-center gap-2">
                  <span className="spinner-border spinner-border-sm" />
                  Signing in...
                </span>
              ) : 'Sign In'}
            </button>
          </form>

          <div className="login-hint">
            <small>Demo credentials: <strong>admin</strong> / <strong>admin</strong></small>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminLogin;
