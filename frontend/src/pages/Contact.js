import React, { useState } from 'react';
import { submitContact } from '../services/api';
import './Contact.css';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await submitContact(form);
      setStatus({ type: 'success', msg: 'Message sent successfully! We\'ll be in touch within 24 hours.' });
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      const msg = err.response?.data?.message || 'Something went wrong. Please try again.';
      setStatus({ type: 'error', msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="contact-page">
      {/* Hero */}
      <section className="contact-hero">
        <div className="contact-hero-bg" />
        <div className="contact-hero-overlay" />
        <div className="contact-hero-content fade-in-up">
          <span className="section-eyebrow" style={{ color: 'var(--gold-light)' }}>Reach Out</span>
          <h1 className="contact-hero-title">Get In Touch</h1>
        </div>
      </section>

      <section className="contact-section">
        <div className="container-xl">
          <div className="contact-grid">
            {/* Info Panel */}
            <div className="contact-info fade-in-up">
              <span className="section-eyebrow">Contact Details</span>
              <h2 className="section-title mt-2">Let's Talk</h2>
              <div className="gold-divider" />
              <p className="contact-intro">
                Whether you're looking to buy, sell, or invest, our expert team is here to guide you through every step of the process.
              </p>
              <div className="contact-details">
                {[
                  { icon: '📍', label: 'Office', value: '72C, Jaihindpuram, Main Road, Madurai-625 011' },
                  { icon: '📞', label: 'Phone', value: '+91 80725 35369' },
                  { icon: '💬', label: 'WhatsApp', value: '+91 98658 28795' },
                  { icon: '✉️', label: 'Email', value: 'sigaramsevatrust@gmail.com' },
                  { icon: '🕐', label: 'Hours', value: 'Mon–Sat: 9am – 6pm EST' },
                ].map((item) => (
                  <div key={item.label} className="contact-detail-item">
                    <span className="detail-icon">{item.icon}</span>
                    <div>
                      <div className="detail-label">{item.label}</div>
                      <div className="detail-value">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Panel */}
            <div className="contact-form-wrap fade-in-up">
              <div className="contact-form-card">
                <h3 className="form-card-title">Send a Message</h3>

                {status && (
                  <div className={`alert-custom ${status.type}`}>
                    {status.type === 'success' ? '✓' : '⚠'} {status.msg}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="John Smith"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      className="form-control"
                      rows="5"
                      placeholder="Tell us about your property needs..."
                      required
                    />
                  </div>
                  <button type="submit" className="btn-gold w-100" disabled={loading}>
                    {loading ? (
                      <span className="d-flex align-items-center justify-content-center gap-2">
                        <span className="spinner-border spinner-border-sm" />
                        Sending...
                      </span>
                    ) : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container-xl footer-inner">
          <div className="footer-brand">
            <span style={{ color: 'var(--gold)' }}>◆</span>
            <span style={{ fontFamily: 'Cormorant Garamond, serif', color: '#fff', fontSize: '1rem', letterSpacing: '0.1em' }}>
              ASHOK RAJ <span style={{ color: 'var(--gold)' }}>REALS</span>
            </span>
          </div>
          <p className="footer-copy">© {new Date().getFullYear()} Ashok Raj Reals. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}

export default Contact;
