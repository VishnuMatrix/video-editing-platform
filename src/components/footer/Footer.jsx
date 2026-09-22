import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      {/* Top line */}
      <div className="footer-top-line">
        <span className="footer-section-number">05</span>

        <span className="footer-line"></span>

        <span className="footer-label">
          ONEFOREDIT — VIDEO EDITING STUDIO
        </span>
      </div>

      {/* Main footer */}
      <div className="footer-main">
        <div className="footer-left">
          <p className="footer-eyebrow">
            HAVE A STORY TO TELL?
          </p>

          <h2 className="footer-title">
            LET'S MAKE
            <br />
            <span>IT MOVE.</span>
          </h2>

          <p className="footer-description">
            Cinematic editing, motion design and visual storytelling
            crafted to make every frame matter.
          </p>

          <a
            href="mailto:hello@oneforedits.com"
            className="footer-contact"
          >
            <span>START A PROJECT</span>
            <span className="footer-arrow">↗</span>
          </a>
        </div>

        <div className="footer-right">
          <div className="footer-column">
            <span className="footer-column-title">NAVIGATE</span>

            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#work">Work</a>
            <a href="#process">Process</a>
          </div>

          <div className="footer-column">
            <span className="footer-column-title">SOCIAL</span>

            <a href="#" target="_blank" rel="noreferrer">
              Instagram
            </a>

            <a href="#" target="_blank" rel="noreferrer">
              YouTube
            </a>

            <a href="#" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>

          <div className="footer-column">
            <span className="footer-column-title">CONTACT</span>

            <a href="mailto:hello@oneforedits.com">
              hello@oneforedits.com
            </a>

            <span className="footer-location">
              INDIA
            </span>
          </div>
        </div>
      </div>

      {/* Large branding */}
      <div className="footer-brand">
        ONEFORE<span>DITS</span>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} ONEFOREDIT
        </span>

        <span className="footer-status">
          <i></i>
          AVAILABLE FOR PROJECTS
        </span>

        <span>
          BUILT WITH INTENTION
        </span>
      </div>
    </footer>
  );
}

export default Footer;
