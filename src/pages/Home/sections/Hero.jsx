import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import { useRef } from "react";

import "./Hero.css";

import heroVideo from "../../../animations/video1.mp4";

function Hero() {
  const heroRef = useRef(null);

  /* =====================================================
     SCROLL PROGRESS

     0 = hero at normal position
     1 = hero has completely passed through viewport
  ===================================================== */

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  /* =====================================================
     BACKGROUND VIDEO

     Video slowly zooms and moves upward.
  ===================================================== */

  const videoScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1.18]
  );

  const videoY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "-8%"]
  );

  const videoOpacity = useTransform(
    scrollYProgress,
    [0, 0.75, 1],
    [1, 0.75, 0]
  );

  /* =====================================================
     DARK OVERLAY

     Gets slightly stronger during scroll.
  ===================================================== */

  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    [0.45, 0.65, 0.9]
  );

  /* =====================================================
     GRID

     Moves at a different speed from video.
  ===================================================== */

  const gridY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "18%"]
  );

  const gridScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1.08]
  );

  /* =====================================================
     MAIN HEADING

     Heading moves upward and slightly left.
  ===================================================== */

  const headingY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0px", "-180px"]
  );

  const headingX = useTransform(
    scrollYProgress,
    [0, 1],
    ["0px", "-70px"]
  );

  const headingScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 0.82]
  );

  const headingOpacity = useTransform(
    scrollYProgress,
    [0, 0.65, 1],
    [1, 0.8, 0]
  );

  /* =====================================================
     LABEL

     Small movement different from heading.
  ===================================================== */

  const labelY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0px", "-100px"]
  );

  const labelOpacity = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    [1, 0.5, 0]
  );

  /* =====================================================
     DESCRIPTION

     Moves down slightly.

     This opposite movement creates depth.
  ===================================================== */

  const descriptionY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0px", "100px"]
  );

  const descriptionOpacity = useTransform(
    scrollYProgress,
    [0, 0.65, 1],
    [1, 0.6, 0]
  );

  /* =====================================================
     META INFORMATION
  ===================================================== */

  const metaY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0px", "120px"]
  );

  const metaOpacity = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    [1, 0.4, 0]
  );

  /* =====================================================
     WATCH REEL BUTTON

     Moves toward the right while scrolling.
  ===================================================== */

  const reelX = useTransform(
    scrollYProgress,
    [0, 1],
    ["0px", "180px"]
  );

  const reelY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0px", "-80px"]
  );

  const reelScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 1.08, 0.7]
  );

  const reelOpacity = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    [1, 0.8, 0]
  );

  /* =====================================================
     FOOTER
  ===================================================== */

  const footerY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0px", "80px"]
  );

  const footerOpacity = useTransform(
    scrollYProgress,
    [0, 0.65, 1],
    [1, 0.5, 0]
  );

  return (
    <section
      ref={heroRef}
      className="hero-section"
    >

      {/* =================================================
          BACKGROUND VIDEO
      ================================================= */}

      <motion.div
        className="hero-video-wrapper"
        style={{
          scale: videoScale,
          y: videoY,
          opacity: videoOpacity,
        }}
      >
        <video
          className="hero-video"
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
        />
      </motion.div>

      {/* =================================================
          DARK OVERLAY
      ================================================= */}

      <motion.div
        className="hero-overlay"
        style={{
          opacity: overlayOpacity,
        }}
      />

      {/* =================================================
          MOVING GRID
      ================================================= */}

      <motion.div
        className="hero-grid"
        style={{
          y: gridY,
          scale: gridScale,
        }}
      />

      {/* =================================================
          TOP LEFT
      ================================================= */}

      <motion.div
        className="hero-corner hero-corner-top-left"
        style={{
          y: labelY,
          opacity: labelOpacity,
        }}
      >
        <span>OF / 001</span>
        <span>VIDEO EDITING</span>
      </motion.div>

      {/* =================================================
          TOP RIGHT
      ================================================= */}

      <motion.div
        className="hero-corner hero-corner-top-right"
        style={{
          y: labelY,
          opacity: labelOpacity,
        }}
      >
        <span>REC ●</span>
        <span>4K / 24 FPS</span>
      </motion.div>

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div className="hero-content">

        {/* LABEL */}

        <motion.div
          className="hero-label"
          style={{
            y: labelY,
            opacity: labelOpacity,
          }}
        >
          <span className="hero-dot" />

          CREATIVE VIDEO STUDIO
        </motion.div>

        {/* HEADING */}

        <motion.h1
          style={{
            x: headingX,
            y: headingY,
            scale: headingScale,
            opacity: headingOpacity,
          }}
        >
          YOUR
          <br />

          STORY
          <br />

          <span>DESERVES</span>
          <br />

          TO MOVE.
        </motion.h1>

        {/* =================================================
            BOTTOM CONTENT
        ================================================= */}

        <div className="hero-bottom-content">

          {/* DESCRIPTION */}

          <motion.div
            className="hero-description"
            style={{
              y: descriptionY,
              opacity: descriptionOpacity,
            }}
          >
            <p>
              Cinematic video editing, motion design
              and visual storytelling crafted to make
              every frame matter.
            </p>
          </motion.div>

          {/* META */}

          <motion.div
            className="hero-meta"
            style={{
              y: metaY,
              opacity: metaOpacity,
            }}
          >

            <div>
              <span>BASED IN</span>
              <strong>INDIA</strong>
            </div>

            <div>
              <span>FOCUS</span>
              <strong>EDIT / MOTION</strong>
            </div>

            <div>
              <span>PROJECTS</span>
              <strong>2026 — NOW</strong>
            </div>

          </motion.div>

        </div>
      </div>

      {/* =================================================
          WATCH REEL
      ================================================= */}

      <motion.button
        className="hero-reel"
        style={{
          x: reelX,
          y: reelY,
          scale: reelScale,
          opacity: reelOpacity,
        }}
      >
        <span className="reel-icon">
          ↗
        </span>

        <span>
          WATCH REEL
        </span>
      </motion.button>

      {/* =================================================
          FOOTER
      ================================================= */}

      <motion.div
        className="hero-footer"
        style={{
          y: footerY,
          opacity: footerOpacity,
        }}
      >

        <div className="hero-footer-left">
          <span>
            © ONEFOREDITS
          </span>
        </div>

        <div className="hero-scroll">

          <span>
            SCROLL
          </span>

          <div className="scroll-line">
            <div className="scroll-line-progress" />
          </div>

        </div>

        <div className="hero-footer-right">
          <span>
            01 / 04
          </span>
        </div>

      </motion.div>

    </section>
  );
}

export default Hero;
