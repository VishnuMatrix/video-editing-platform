import { Link } from "react-router-dom";
import "./Footer.css";

/*
  Replace this URL later with the designer's actual
  Calendly / Cal.com / booking link.
*/
const BOOKING_URL = "#";

function Footer() {
  const handleBooking = (event) => {
    if (BOOKING_URL === "#") {
      event.preventDefault();
      alert("Booking calendar will be available soon.");
    }
  };

  return (
    <footer className="site-footer">

      {/* =========================================
          TOP LABEL
      ========================================= */}

      <div className="footer-top">

        <div className="footer-index">
          <span>05</span>
          <span>CONTACT</span>
        </div>

        <div className="footer-top-line" />

        <span className="footer-top-label">
          ABNOXIOUS EDITS — CREATIVE VIDEO STUDIO
        </span>

      </div>


      {/* =========================================
          MAIN CTA
      ========================================= */}

      <section className="footer-hero">

        <div className="footer-hero-copy">

          <span className="footer-eyebrow">
            HAVE A STORY TO TELL?
          </span>

          <h2>
            LET'S
            <br />
            <span>MAKE</span>
            <br />
            <em>IT MOVE.</em>
          </h2>

          <p>
            Cinematic editing, motion design and visual
            storytelling crafted to make every frame matter.
          </p>

        </div>


        {/* =====================================
            BOOKING CARD
        ===================================== */}

        <div className="footer-booking">

          <div className="booking-number">
            01
          </div>

          <span className="booking-label">
            READY WHEN YOU ARE
          </span>

          <h3>
            Let's create
            <br />
            something worth
            <br />
            watching.
          </h3>

          <a
            href={BOOKING_URL}
            className="booking-button"
            target={
              BOOKING_URL !== "#"
                ? "_blank"
                : undefined
            }
            rel={
              BOOKING_URL !== "#"
                ? "noopener noreferrer"
                : undefined
            }
            onClick={handleBooking}
          >
            <span>BOOK NOW</span>
            <span className="booking-arrow">↗</span>
          </a>

        </div>

      </section>


      {/* =========================================
          NAVIGATION
      ========================================= */}

      <section className="footer-navigation">

        <div className="footer-brand-block">

          <div className="footer-logo">
            AE
          </div>

          <span className="footer-brand-name">
            ABNOXIOUS EDITS
          </span>

          <p>
            EDIT.
            <br />
            MOTION.
            <br />
            STORY.
          </p>

        </div>


        <div className="footer-links-block">

          <div className="footer-column">

            <span className="footer-column-title">
              EXPLORE
            </span>

            <Link to="/">
              Home
            </Link>

            <Link to="/about">
              About
            </Link>

            <Link to="/services">
              Services
            </Link>

            <Link to="/contact">
              Contact
            </Link>

          </div>


          <div className="footer-column">

            <span className="footer-column-title">
              SOCIAL
            </span>

            <a
              href="#"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>

            <a
              href="#"
              target="_blank"
              rel="noreferrer"
            >
              YouTube
            </a>

            <a
              href="#"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>

          </div>


          <div className="footer-column">

            <span className="footer-column-title">
              CONTACT
            </span>

            <a href="mailto:hello@oneforedits.com">
              hello@oneforedits.com
            </a>

            <span className="footer-muted">
              INDIA
            </span>

            <span className="footer-muted">
              AVAILABLE WORLDWIDE
            </span>

          </div>

        </div>

      </section>


      {/* =========================================
          LARGE BRAND
      ========================================= */}

      <div className="footer-marquee">

        <div className="footer-marquee-track">

          <span>ABNOXIOUS EDITS</span>
          <i>•</i>
          <span>ABNOXIOUS EDITS</span>
          <i>•</i>
          <span>ABNOXIOUS EDITS</span>
          <i>•</i>

        </div>

      </div>


      {/* =========================================
          BOTTOM
      ========================================= */}

      <div className="footer-bottom">

        <span>
          © {new Date().getFullYear()} ABNOXIOUS EDITS
        </span>

        <span className="footer-availability">
          <i />
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
