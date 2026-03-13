import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = sessionStorage.getItem('adminAuth') === 'true';
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    navigate('/');
  };

  return (
    <nav className={`site-navbar ${scrolled || !isHome ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          <span className="brand-icon">◆</span>
          <span className="brand-text">ASHOK RAJ <span className="brand-accent">REALS</span></span>
        </Link>

        <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><a href="/#properties" onClick={() => setMenuOpen(false)}>Properties</a></li>
          <li><Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''} onClick={() => setMenuOpen(false)}>Contact</Link></li>
          {isAdmin ? (
            <>
              <li><Link to="/admin/dashboard" className={location.pathname.includes('dashboard') ? 'active' : ''} onClick={() => setMenuOpen(false)}>Dashboard</Link></li>
              <li><button className="nav-btn" onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <li><Link to="/admin/login" className="nav-btn" onClick={() => setMenuOpen(false)}>Admin Login</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
