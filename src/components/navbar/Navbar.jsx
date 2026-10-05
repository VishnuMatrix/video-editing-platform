import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo-mobile" onClick={closeMenu}>
          OF
        </Link>

        <nav className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/portfolio">Portfolio</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>

      <Link to="/" className="navbar-logo">
        <span className="logo-mark">OF</span>
        <span className="logo-text">ONEFOREDITS</span>
      </Link>

      <div className="navbar-right">
        <span className="navbar-status">
          <span className="status-dot" />
          AVAILABLE
        </span>

        <Link to="/login" className="navbar-button" onClick={closeMenu}>
          Get Started
        </Link>

        <button
          className={`menu-button ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
        </button>
      </div>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/about" onClick={closeMenu}>About</Link>
        <Link to="/services" onClick={closeMenu}>Services</Link>
        <Link to="/portfolio" onClick={closeMenu}>Portfolio</Link>
        <Link to="/pricing" onClick={closeMenu}>Pricing</Link>
        <Link to="/contact" onClick={closeMenu}>Contact</Link>
        <Link to="/login" onClick={closeMenu}>Get Started</Link>
      </div>
    </header>
  );
}

export default Navbar;
