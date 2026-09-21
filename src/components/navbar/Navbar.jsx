import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">

      {/* LEFT SIDE */}

      <div className="navbar-left">

        <a
          href="#home"
          className="navbar-logo-mobile"
          onClick={closeMenu}
        >
          OF
        </a>

        <nav className="navbar-links">

          <a href="#home">Home</a>

          <a href="#about">About</a>

          <a href="#work">Work</a>

          <a href="#blog">Blog</a>

        </nav>

      </div>


      {/* CENTER LOGO */}

      <a
        href="#home"
        className="navbar-logo"
      >
        <span className="logo-mark">
          OF
        </span>

        <span className="logo-text">
          ONEFOREDITS
        </span>
      </a>


      {/* RIGHT SIDE */}

      <div className="navbar-right">

        <span className="navbar-status">
          <span className="status-dot" />
          AVAILABLE
        </span>

        <a
          href="#contact"
          className="navbar-button"
        >
          Get Started
        </a>

        <button
          className={`menu-button ${
            menuOpen ? "active" : ""
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
        </button>

      </div>


      {/* MOBILE MENU */}

      <div
        className={`mobile-menu ${
          menuOpen ? "open" : ""
        }`}
      >

        <a href="#home" onClick={closeMenu}>
          Home
        </a>

        <a href="#about" onClick={closeMenu}>
          About
        </a>

        <a href="#work" onClick={closeMenu}>
          Work
        </a>

        <a href="#blog" onClick={closeMenu}>
          Blog
        </a>

        <a href="#contact" onClick={closeMenu}>
          Get Started
        </a>

      </div>

    </header>
  );
}

export default Navbar;
