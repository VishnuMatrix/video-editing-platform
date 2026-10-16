
import { Link } from "react-router-dom";
import "./Footer.css";

const BOOKING_URL =
  "https://calendly.com/adarshk17021947/30min?month=2026-10";

function Footer() {
  return (
    <footer className="site-footer">
      {/* TOP LABEL */}
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

      {/* MAIN CTA */}
      <section className="footer-hero">
        <div className="footer-hero-copy">
          <span className="footer-eyebrow">
            HAVE A STORY TO TELL?
          </span>

          <h2>
            LET&apos;S
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

        {/* BOOKING CARD */}
        <div className="footer-booking">
          <div className="booking-number">01</div>

          <span className="booking-label">
            READY WHEN YOU ARE
          </span>

          <h3>
            Let&apos;s create
            <br />
            something worth
            <br />
            watching.
          </h3>

          <a
            href={BOOKING_URL}
            className="booking-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>BOOK NOW</span>
            <span className="booking-arrow">↗</span>
          </a>
        </div>
      </section>

      {/* FOOTER NAVIGATION */}
      <section className="footer-navigation">
        <div className="footer-brand-block">
          <Link
            to="/"
            className="footer-logo footer-full-brand"
            aria-label="Abnoxious Edits home"
          >
            ABNOXIOUS EDITS
          </Link>

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
          {/* EXPLORE */}
          <div className="footer-column">
            <span className="footer-column-title">
              EXPLORE
            </span>

            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/services">Services</Link>
            <Link to="/contact">Contact</Link>
          </div>

          {/* SOCIAL */}
          <div className="footer-column">
            <span className="footer-column-title">
              SOCIAL
            </span>

            <a
              href="https://www.instagram.com/adarshk.05"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>

            <a
              href="https://www.youtube.com/@Abnoxiousedit"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube
            </a>

            <a
              href="https://www.linkedin.com/in/adarshk05"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>

          {/* CONTACT */}
          <div className="footer-column">
            <span className="footer-column-title">
              CONTACT
            </span>

            <a href="mailto:adarshk17021947@gmail.com">
              adarshk17021947@gmail.com
            </a>

            <span className="footer-muted">INDIA</span>

            <span className="footer-muted">
              AVAILABLE WORLDWIDE
            </span>
          </div>
        </div>
      </section>

      {/* BRAND MARQUEE */}
      <div
        className="footer-marquee"
        aria-label="Abnoxious Edits"
      >
        <div className="footer-marquee-track">
          <span>ABNOXIOUS EDITS</span>
          <i>•</i>
          <span>ABNOXIOUS EDITS</span>
          <i>•</i>
          <span>ABNOXIOUS EDITS</span>
          <i>•</i>
        </div>
      </div>

      {/* FOOTER BOTTOM */}
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} ABNOXIOUS EDITS
        </span>

        <span className="footer-availability">
          <i />
          AVAILABLE FOR PROJECTS
        </span>

        <a
          href="#top"
          onClick={(event) => {
            event.preventDefault();
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          BACK TO TOP ↑
        </a>
      </div>
    </footer>
  );
}

export default Footer;

