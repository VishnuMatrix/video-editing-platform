import React, { useState } from "react";
import "./About.css";

import Navbar from "../../components/navbar/Navbar";

import img1 from "../../assets/images/img1.png";
import img2 from "../../assets/images/img2.png";

const values = [
  {
    number: "01",
    title: "Creativity",
    text: "We believe every story deserves its own visual language. We combine creative thinking, editing and motion to turn raw footage into something memorable.",
  },
  {
    number: "02",
    title: "Quality",
    text: "Every frame matters. From the first cut to the final export, we focus on precision, pacing, sound and visual consistency.",
  },
  {
    number: "03",
    title: "Collaboration",
    text: "The best work happens when ideas come together. We work closely with our clients to understand their vision and turn it into a finished story.",
  },
  {
    number: "04",
    title: "Integrity",
    text: "Clear communication, honest feedback and dependable delivery are at the heart of how we work with every client.",
  },
];

const faqs = [
  {
    question: "Which package is best for me?",
    answer:
      "It depends on your project, footage, turnaround requirements and the level of editing you need. Contact us and we can recommend the most suitable approach.",
  },
  {
    question: "Why should I choose Abnoxious Edits?",
    answer:
      "We combine cinematic editing, motion design and visual storytelling with a collaborative workflow focused on making your content stronger.",
  },
  {
    question: "How long does the video editing process take?",
    answer:
      "Turnaround depends on the length and complexity of the project. Once we understand your requirements, we can provide a realistic timeline.",
  },
  {
    question: "How can I send large files?",
    answer:
      "Large project files can be shared through a cloud storage or file-transfer service. We can guide you through the preferred method after your project is confirmed.",
  },
  {
    question: "What if I don't like the first version?",
    answer:
      "Feedback is part of the process. We review your notes, make the agreed revisions and continue refining the edit toward the desired result.",
  },
  {
    question: "Can you handle a complex project?",
    answer:
      "Yes. For larger projects, we first break the work into stages so the editing, motion, sound and review process stays organised.",
  },
];

const services = [
  "VIDEO EDITING",
  "MOTION DESIGN",
  "COLOR GRADING",
  "VFX",
  "SHORT FORM",
  "LONG FORM",
  "YOUTUBE",
  "COMMERCIALS",
];

function About() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main className="about-page">
      <Navbar />

      {/* HERO */}
      <section className="about-hero">
        <div className="about-hero-image">
          <img src={img2} alt="Abnoxious Edits creative work" />
        </div>

        <div className="about-hero-overlay" />
        <div className="about-grid" />

        <div className="about-hero-top">
          <span>01 / 006</span>
          <span>ABOUT ABNOXIOUS EDITS</span>
        </div>

        <div className="about-hero-content">
          <div className="about-eyebrow">
            <span className="about-dot" />
            CREATIVE VIDEO STUDIO
          </div>

          <h1>
            ABOUT
            <br />
            <span>US.</span>
          </h1>

          <p>
            Crafting compelling stories,
            <br />
            one frame at a time.
          </p>
        </div>

        <div className="about-scroll">
          <span>SCROLL</span>

          <div className="about-scroll-line">
            <span />
          </div>
        </div>

        <div className="about-hero-meta">
          <div>
            <span>BASED IN</span>
            <strong>INDIA</strong>
          </div>

          <div>
            <span>FOCUS</span>
            <strong>EDIT / MOTION</strong>
          </div>

          <div>
            <span>STATUS</span>
            <strong>AVAILABLE</strong>
          </div>
        </div>
      </section>

      {/* ABOUT AGENCY */}
      <section className="about-agency">
        <div className="agency-orbit agency-orbit-1" />
        <div className="agency-orbit agency-orbit-2" />
        <div className="agency-orbit agency-orbit-3" />
        <div className="agency-orbit agency-orbit-4" />

        <div className="agency-content">
          <div className="agency-label">
            <span>02</span>
            ABOUT OUR AGENCY
          </div>

          <div className="agency-main">
            <div className="agency-brand">
              <div className="agency-logo-mark">AE</div>

              <span>ABNOXIOUS EDITS</span>

              <h2>
                About
                <br />
                Our Agency
              </h2>
            </div>

            <div className="agency-description">
              <p>
                Abnoxious Edits is a creative video editing agency focused on
                transforming ideas, footage and stories into compelling
                visual experiences.
              </p>

              <p>
                From social media content and YouTube videos to commercials,
                cinematic edits and motion graphics, we approach every
                project with the same goal — making every frame matter.
              </p>

              <a href="/contact" className="agency-link">
                <span>START A PROJECT</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          <div className="agency-stats">
            <div className="agency-stat">
              <strong>05+</strong>
              <span>
                YEARS OF
                <br />
                EXPERIENCE
              </span>
            </div>

            <div className="agency-stat">
              <strong>2000+</strong>
              <span>
                COMPLETED
                <br />
                PROJECTS
              </span>
            </div>

            <div className="agency-stat">
              <strong>50+</strong>
              <span>
                COUNTRIES
                <br />
                REACHED
              </span>
            </div>

            <div className="agency-stat">
              <strong>1000+</strong>
              <span>
                HAPPY
                <br />
                CLIENTS
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="about-values">
        <div className="values-heading">
          <span>03 / OUR VALUES</span>

          <h2>
            Our Values:
            <br />
            <em>The Secret Sauce</em>
            <br />
            In Every Story.
          </h2>
        </div>

        <div className="values-list">
          {values.map((value) => (
            <article className="value-item" key={value.number}>
              <div className="value-number">{value.number}</div>

              <div className="value-content">
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </div>

              <div className="value-arrow">↗</div>
            </article>
          ))}
        </div>
      </section>

      {/* CREATIVE PLAYGROUND */}
      <section className="creative-playground">
        <div className="playground-heading">
          <span>04 / CLIENTS</span>

          <h2>
            Our Creative Playground:
            <br />
            <em>Where Brands Shine.</em>
          </h2>
        </div>

        <div className="client-marquee">
          <div className="client-track">
            {[...services, ...services].map((service, index) => (
              <div className="client-item" key={index}>
                <span>{service}</span>
                <b>•</b>
              </div>
            ))}
          </div>
        </div>

        <div className="client-showcase">
          <div className="client-box">
            <span>01</span>
            <strong>CREATIVE</strong>
            <small>EDITING</small>
          </div>

          <div className="client-box client-box-featured">
            <img src={img1} alt="Abnoxious Edits project" />

            <div className="client-box-overlay">
              <span>SELECTED WORK</span>

              <strong>
                ABNOXIOUS <span>EDITS</span>
              </strong>
            </div>
          </div>

          <div className="client-box">
            <span>02</span>
            <strong>MOTION</strong>
            <small>DESIGN</small>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="about-faq">
        <div className="faq-header">
          <span>05 / FAQ</span>

          <h2>
            You have questions.
            <br />
            <em>We have answers.</em>
          </h2>
        </div>

        <div className="faq-layout">
          <div className="faq-intro">
            <h3>
              Frequently
              <br />
              asked <span>questions.</span>
            </h3>

            <p>
              Find answers to common questions about Abnoxious Edits,
              our services and how we work with clients.
            </p>

            <div className="faq-contact">
              <span>HAVE A PROJECT IN MIND?</span>

              <a href="mailto:hello@abnoxiouedits.com">
                hello@abnoxiouedits.com
              </a>

              <small>WE WOULD LOVE TO HEAR FROM YOU.</small>
            </div>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div
                className={`faq-item ${
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

                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="cta-marquee">
          <div className="cta-track">
            {[...services, ...services].map((service, index) => (
              <div key={index}>
                <span>{service}</span>
                <b>•</b>
              </div>
            ))}
          </div>
        </div>

        <div className="cta-card">
          <div className="cta-copy">
            <span>06 / LET'S WORK TOGETHER</span>

            <h2>
              More Than Just Videos:
              <br />
              <em>We're Your Creative Partners.</em>
            </h2>

            <p>
              Have a project, an idea or simply a story you want
              to tell? Let's make something worth watching.
            </p>
          </div>

          <a href="/contact" className="cta-button">
            <span>START A PROJECT</span>
            <b>↗</b>
          </a>
        </div>
      </section>
    </main>
  );
}

export default About;
