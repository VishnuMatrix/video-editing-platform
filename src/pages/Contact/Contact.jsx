
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./Contact.css";

const CALENDLY_URL =
  "https://calendly.com/adarshk17021947/30min?month=2026-10";

export default function Contact() {
  return (
    <div className="contact-page">
      <Navbar />

      <main className="contact-main">
        <div className="contact-topline">
          <span>04 / CONTACT</span>
          <span>ABNOXIOUS EDITS — CREATIVE STUDIO</span>
        </div>

        <section className="contact-hero">
          <div className="contact-hero-left">
            <div className="contact-eyebrow">
              <span className="contact-status-dot" />
              AVAILABLE FOR NEW PROJECTS
            </div>

            <h1>
              LET'S
              <br />
              <span>CREATE</span>
              <br />
              <em>TOGETHER.</em>
            </h1>

            <p>
              Have a story worth telling? From cinematic edits
              to motion-driven visuals, we're ready to bring
              your next idea to life.
            </p>

            <div className="contact-actions">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-primary-button"
              >
                <span>BOOK A FREE CALL</span>
                <span>↗</span>
              </a>

              <Link to="/" className="contact-secondary-button">
                EXPLORE OUR WORK ↗
              </Link>
            </div>
          </div>

          <div className="contact-hero-right">
            <div className="contact-info-card">
              <div className="contact-card-top">
                <span>01 / LET'S CONNECT</span>
                <span>↗</span>
              </div>

              <div className="contact-card-body">
                <span className="contact-card-label">
                  YOUR NEXT PROJECT STARTS HERE
                </span>

                <h2>
                  GOOD IDEAS
                  <br />
                  DESERVE
                  <br />
                  GREAT EDITS.
                </h2>

                <p>
                  Tell us about your vision. We'll help turn it
                  into something people remember.
                </p>
              </div>

              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card-button"
              >
                SCHEDULE A MEETING <span>↗</span>
              </a>
            </div>
          </div>
        </section>

        <section className="contact-details">
          <div className="contact-detail">
            <span>01 / EMAIL</span>
            <a href="mailto:hello@oneforedits.com">
              hello@oneforedits.com ↗
            </a>
          </div>

          <div className="contact-detail">
            <span>02 / LOCATION</span>
            <strong>INDIA — WORKING WORLDWIDE</strong>
          </div>

          <div className="contact-detail">
            <span>03 / AVAILABILITY</span>
            <strong>
              <span className="contact-status-dot" />
              OPEN FOR PROJECTS
            </strong>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

