import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

/*
  Replace this URL later with the designer's actual
  Calendly / Cal.com / booking page.

  Example:
  https://cal.com/your-designer
  https://calendly.com/your-designer
*/
const BOOKING_URL = "#";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleBooking = (event) => {
    if (BOOKING_URL === "#") {
      event.preventDefault();
      alert("Booking calendar will be available soon.");
    }
  };

  return (
    <header className="navbar">

      {/* ================================
          LEFT
      ================================= */}

      <div className="navbar-left">

        <Link
          to="/"
          className="navbar-logo-mobile"
          onClick={closeMenu}
        >
          AE
        </Link>

        <nav className="navbar-links">

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


      {/* ================================
          CENTER LOGO
      ================================= */}

      <Link
        to="/"
        className="navbar-logo"
        onClick={closeMenu}
      >
        <span className="logo-mark">
          AE
        </span>

        <span className="logo-text">
          ABNOXIOUS EDITS
        </span>
      </Link>


      {/* ================================
          RIGHT
      ================================= */}

      <div className="navbar-right">

        <span className="navbar-status">
          <span className="status-dot" />
          AVAILABLE
        </span>

        <a
          href={BOOKING_URL}
          className="navbar-button"
          target={BOOKING_URL !== "#" ? "_blank" : undefined}
          rel={BOOKING_URL !== "#" ? "noopener noreferrer" : undefined}
          onClick={handleBooking}
        >
          BOOK NOW
        </a>

        <button
          className={`menu-button ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          type="button"
        >
          <span />
          <span />
        </button>

      </div>


      {/* ================================
          MOBILE MENU
      ================================= */}

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>

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

        <a
          href={BOOKING_URL}
          target={BOOKING_URL !== "#" ? "_blank" : undefined}
          rel={
            BOOKING_URL !== "#"
              ? "noopener noreferrer"
              : undefined
          }
          onClick={(event) => {
            handleBooking(event);
            closeMenu();
          }}
        >
          Book Now
        </a>

      </div>

    </header>
  );
}

export default Navbar;
