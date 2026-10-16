
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
      {/* LEFT: MOBILE BRAND AND DESKTOP NAVIGATION */}
      <div className="navbar-left">
        <Link
          to="/"
          className="navbar-logo-mobile navbar-mobile-full-brand"
          onClick={closeMenu}
          aria-label="Abnoxious Edits home"
        >
          ABNOXIOUS EDITS
        </Link>

        <nav className="navbar-links" aria-label="Main navigation">
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>

          <Link to="/about" onClick={closeMenu}>
            About
          </Link>

          <Link to="/services" onClick={closeMenu}>
            Services
          </Link>

          <Link to="/contact" onClick={closeMenu}>
            Contact
          </Link>
        </nav>
      </div>

      {/* CENTER: FULL BRAND NAME */}
      <Link
        to="/"
        className="navbar-logo"
        onClick={closeMenu}
        aria-label="Abnoxious Edits home"
      >
        <span className="logo-text navbar-full-brand">
          ABNOXIOUS EDITS
        </span>
      </Link>

      {/* RIGHT: STATUS AND GET STARTED */}
      <div className="navbar-right">
        <span className="navbar-status">
          <span className="status-dot" />
          AVAILABLE
        </span>

        <Link
          to="/login"
          className="navbar-button"
          onClick={closeMenu}
        >
          GET STARTED
        </Link>

        <button
          className={`menu-button ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="navbar-mobile-menu"
          type="button"
        >
          <span />
          <span />
        </button>
      </div>

      {/* MOBILE MENU */}
      <nav
        id="navbar-mobile-menu"
        className={`mobile-menu ${menuOpen ? "open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        <Link to="/" onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
          Home
        </Link>

        <Link to="/about" onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
          About
        </Link>

        <Link to="/services" onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
          Services
        </Link>

        <Link to="/contact" onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
          Contact
        </Link>

        <Link
          to="/login"
          className="mobile-get-started"
          onClick={closeMenu}
          tabIndex={menuOpen ? 0 : -1}
        >
          GET STARTED
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;

