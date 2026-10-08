import React, { useState } from "react";
import "./Services.css";

import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

import img1 from "../../assets/images/img1.png";
import img2 from "../../assets/images/img2.png";

const serviceCards = [
  {
    number: "01",
    title: "STORY",
    accent: "EDIT",
    description:
      "Long-form editing built around pacing, emotion and storytelling. From YouTube videos to documentaries, we turn hours of footage into something people actually want to watch.",
    tags: ["YOUTUBE", "DOCUMENTARY", "LONG FORM"],
    image: img1,
  },
  {
    number: "02",
    title: "SOCIAL",
    accent: "CUT",
    description:
      "Short-form content designed to stop the scroll. We transform existing footage into sharp, fast and platform-ready edits for modern audiences.",
    tags: ["REELS", "SHORTS", "SOCIAL"],
    image: img2,
  },
  {
    number: "03",
    title: "BRAND",
    accent: "FILMS",
    description:
      "Visual stories that give brands a stronger identity. From product launches to campaigns, we combine editing, sound and motion into polished brand films.",
    tags: ["COMMERCIAL", "PRODUCT", "CAMPAIGN"],
    image: img1,
  },
  {
    number: "04",
    title: "MOTION",
    accent: "LAB",
    description:
      "Graphics, titles, transitions and visual effects that give your footage another dimension without taking attention away from the story.",
    tags: ["MOTION", "VFX", "TITLES"],
    image: img2,
  },
  {
    number: "05",
    title: "FINAL",
    accent: "FINISH",
    description:
      "The details that make an edit feel complete. Color, sound design, subtitles and final mastering prepared for the platform where your content will live.",
    tags: ["COLOR", "SOUND", "SUBTITLES"],
    image: img1,
  },
];

const process = [
  {
    number: "01",
    title: "UNDERSTAND",
    text: "We start with your idea, audience and objective before touching the timeline.",
  },
  {
    number: "02",
    title: "BUILD",
    text: "Footage is structured into a clear visual story with the right rhythm and pacing.",
  },
  {
    number: "03",
    title: "REFINE",
    text: "Motion, sound, color and detail are layered into the edit to create a finished experience.",
  },
  {
    number: "04",
    title: "DELIVER",
    text: "The final video is exported and prepared for the platforms and formats you need.",
  },
];

const formats = [
  "YOUTUBE",
  "INSTAGRAM",
  "TIKTOK",
  "COMMERCIAL",
  "DOCUMENTARY",
  "PODCAST",
  "PRODUCT",
  "CAMPAIGN",
];

const faqs = [
  {
    question: "Can I combine multiple services?",
    answer:
      "Absolutely. Most projects use a combination of editing, motion, color and sound. We can build the workflow around what your project actually needs.",
  },
  {
    question: "Do you edit existing footage?",
    answer:
      "Yes. You can provide your existing footage, assets and references and we will build the edit around your creative direction.",
  },
  {
    question: "Can you create short-form content from long videos?",
    answer:
      "Yes. We can identify strong moments from long-form content and turn them into platform-ready short-form edits.",
  },
  {
    question: "Do you provide motion graphics and VFX?",
    answer:
      "Yes. Motion graphics, titles, transitions and selected visual effects can be integrated into the edit depending on the project's requirements.",
  },
  {
    question: "Do you handle color and sound?",
    answer:
      "Yes. Final finishing can include color treatment, audio cleanup, sound design, subtitles and delivery preparation.",
  },
];

function Services() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main className="services-page">
      <Navbar />

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="services-hero">
        <div className="services-hero-image">
          <img src={img2} alt="Abnoxious Edits creative work" />
        </div>

        <div className="services-hero-overlay" />
        <div className="services-grid" />

        <div className="services-hero-top">
          <span>01 / 005</span>
          <span>ABNOXIOUS EDITS / SERVICES</span>
        </div>

        <div className="services-hero-content">
          <div className="services-eyebrow">
            <span className="services-dot" />
            WHAT WE DO
          </div>

          <h1>
            EDIT.
            <br />
            <span>CREATE.</span>
            <br />
            <em>IMPACT.</em>
          </h1>

          <p>
            More than just editing.
            <br />
            We build stories people remember.
          </p>
        </div>

        <div className="services-hero-bottom">
          <div className="services-scroll">
            <span>SCROLL TO EXPLORE</span>

            <div className="services-scroll-line">
              <span />
            </div>
          </div>

          <div className="services-hero-meta">
            <span>EDITING</span>
            <span>MOTION</span>
            <span>FINISHING</span>
          </div>
        </div>
      </section>

      {/* =====================================================
          INTRO
      ====================================================== */}

      <section className="services-intro">
        <div className="services-intro-label">
          <span>02</span>
          OUR CREATIVE SYSTEM
        </div>

        <div className="services-intro-content">
          <h2>
            We don't just
            <br />
            <span>cut footage.</span>
          </h2>

          <div className="services-intro-copy">
            <p>
              Every project starts with a story. Our job is to find it,
              shape it and make it impossible to ignore.
            </p>

            <p>
              From the first rough cut to the final export, we bring
              together editing, motion, sound and visual detail into
              one cohesive experience.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          MARQUEE
      ====================================================== */}

      <section className="services-marquee-section">
        <div className="services-marquee">
          <div className="services-marquee-track">
            {[...formats, ...formats].map((format, index) => (
              <div className="services-marquee-item" key={index}>
                <span>{format}</span>
                <b>•</b>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          SERVICE CARDS
      ====================================================== */}

      <section className="services-work">
        <div className="services-work-heading">
          <div>
            <span>03 / WHAT WE MAKE</span>

            <h2>
              Five ways
              <br />
              <em>to make it move.</em>
            </h2>
          </div>

          <p>
            Choose a single service or combine several into one
            complete production workflow.
          </p>
        </div>

        <div className="service-list">
          {serviceCards.map((service) => (
            <article className="service-card" key={service.number}>
              <div className="service-card-top">
                <span>{service.number}</span>

                <div className="service-card-tags">
                  {service.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>

              <div className="service-card-main">
                <div className="service-card-title">
                  <h3>
                    {service.title}
                    <br />
                    <em>{service.accent}</em>
                  </h3>

                  <div className="service-card-arrow">↗</div>
                </div>

                <div className="service-card-media">
                  <img
                    src={service.image}
                    alt={`${service.title} ${service.accent}`}
                  />
                </div>

                <div className="service-card-description">
                  <p>{service.description}</p>

                  <span>EXPLORE SERVICE</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =====================================================
          PROCESS
      ====================================================== */}

      <section className="services-process">
        <div className="services-process-heading">
          <span>04 / OUR PROCESS</span>

          <h2>
            From raw footage
            <br />
            <em>to final frame.</em>
          </h2>
        </div>

        <div className="process-list">
          {process.map((item) => (
            <div className="process-row" key={item.number}>
              <span className="process-number">{item.number}</span>

              <h3>{item.title}</h3>

              <p>{item.text}</p>

              <span className="process-arrow">↗</span>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          FORMAT SECTION
      ====================================================== */}

      <section className="services-format">
        <div className="format-background">
          <div className="format-circle format-circle-one" />
          <div className="format-circle format-circle-two" />
          <div className="format-circle format-circle-three" />
        </div>

        <div className="format-content">
          <span>05 / BUILT FOR WHERE YOU PUBLISH</span>

          <h2>
            One edit.
            <br />
            <em>Every screen.</em>
          </h2>

          <p>
            Your content should work wherever your audience is.
            We prepare edits around the platform, format and viewing
            experience — not simply resize the same video everywhere.
          </p>

          <div className="format-grid">
            {formats.map((format, index) => (
              <div className="format-item" key={format}>
                <span>0{index + 1}</span>
                <strong>{format}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          FAQ
      ====================================================== */}

      <section className="services-faq">
        <div className="services-faq-heading">
          <span>06 / FAQ</span>

          <h2>
            Before we
            <br />
            <em>press export.</em>
          </h2>
        </div>

        <div className="services-faq-layout">
          <div className="services-faq-intro">
            <h3>
              Questions?
              <br />
              <span>We've got you.</span>
            </h3>

            <p>
              A few things clients usually want to know before
              starting a project with us.
            </p>

            <a href="/contact" className="services-faq-link">
              START A PROJECT
              <span>↗</span>
            </a>
          </div>

          <div className="services-faq-list">
            {faqs.map((faq, index) => (
              <div
                className={`services-faq-item ${
                  openFaq === index ? "faq-open" : ""
                }`}
                key={faq.question}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.question}</span>
                  <b>{openFaq === index ? "−" : "+"}</b>
                </button>

                <div className="services-faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="services-cta">
        <div className="services-cta-marquee">
          <div className="services-cta-track">
            {[
              ...[
                "EDIT",
                "CREATE",
                "MOTION",
                "STORY",
                "FINISH",
              ],
              ...[
                "EDIT",
                "CREATE",
                "MOTION",
                "STORY",
                "FINISH",
              ],
            ].map((item, index) => (
              <div key={index}>
                <span>{item}</span>
                <b>•</b>
              </div>
            ))}
          </div>
        </div>

        <div className="services-cta-card">
          <div>
            <span>07 / LET'S CREATE SOMETHING</span>

            <h2>
              Got footage?
              <br />
              <em>Let's make it matter.</em>
            </h2>

            <p>
              Tell us what you're working on and we'll figure out
              the best way to bring it to life.
            </p>
          </div>

          <a href="/contact" className="services-cta-button">
            <span>START A PROJECT</span>
            <b>↗</b>
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default Services;
