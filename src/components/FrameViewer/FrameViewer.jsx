import React, { useState, useEffect, useCallback, useRef } from "react";
import "./FrameViewer.css";

// Your existing images. Adjust these paths to wherever they actually
// live relative to this file — e.g. if this component sits in
// src/components/, and the images are in src/assets/, this is right.
import img1 from "../../assets/images/img1.png";
import img2 from "../../assets/images/img2.png";


/*
=========================================================
IMPORTANT
=========================================================
You have TWO real images now (img1.png, img2.png), reused
across the 5 frames below just to show the layout working.
Swap in real images (and real camera/lens/grade info) as
you get them — just change `image` on each entry.
=========================================================
*/
const DEFAULT_FRAMES = [
  {
    id: 1,
    index: "01",
    category: "SIGNAL / NOISE",
    title: "FREQUENCY",
    subtitle: "NORTHLINE FILM",
    image: img1,
    timecode: "TC 00:00:12:04",
    camera: "BLACKMAGIC 12K",
    lens: "SIGMA CINE · 24MM",
    grade: "SPLIT-TONE · TEAL/AMBER",
  },
  {
    id: 2,
    index: "02",
    category: "NOCTURNE",
    title: "ALLEYWAY",
    subtitle: "ASTON ATELIER",
    image: img2,
    timecode: "TC 00:00:28:19",
    camera: "ARRI ALEXA MINI LF",
    lens: "LEITZ SUMMILUX · 29MM",
    grade: "CRUSHED BLACKS · GRAIN 500T",
  },
  {
    id: 3,
    index: "03",
    category: "OVERHEAD",
    title: "DRIFT",
    subtitle: "HALCYON MOTORS",
    image: img1,
    timecode: "TC 00:00:41:02",
    camera: "RED KOMODO 6K",
    lens: "ZEISS SUPREME · 35MM",
    grade: "DESATURATED · COOL SHADOWS",
  },
  {
    id: 4,
    index: "04",
    category: "SIGNAL / NOISE",
    title: "STATIC",
    subtitle: "NORTHLINE FILM",
    image: img2,
    timecode: "TC 00:00:49:15",
    camera: "BLACKMAGIC 12K",
    lens: "SIGMA CINE · 24MM",
    grade: "SPLIT-TONE · TEAL/AMBER",
  },
  {
    id: 5,
    index: "05",
    category: "NOCTURNE",
    title: "CORRIDOR RED",
    subtitle: "ASTON ATELIER",
    image: img1,
    timecode: "TC 00:00:52:11",
    camera: "ARRI ALEXA MINI LF",
    lens: "LEITZ SUMMILUX · 29MM",
    grade: "CRUSHED BLACKS · GRAIN 500T",
  },
];

// How often it auto-advances, in milliseconds. Set to 0 to disable autoplay.
const AUTOPLAY_INTERVAL = 4500;

export default function FrameViewer({ frames = DEFAULT_FRAMES }) {
  const [selected, setSelected] = useState(0);
  const [direction, setDirection] = useState("next"); // drives which way the slide animates
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef(null);

  const total = frames.length;
  const current = frames[selected];
  const prevFrame = frames[(selected - 1 + total) % total];
  const nextFrame = frames[(selected + 1) % total];

  const goPrev = useCallback(() => {
    setDirection("prev");
    setSelected((i) => (i - 1 + total) % total);
  }, [total]);

  const goNext = useCallback(() => {
    setDirection("next");
    setSelected((i) => (i + 1) % total);
  }, [total]);

  const goTo = useCallback(
    (targetIndex) => {
      setDirection(targetIndex > selected ? "next" : "prev");
      setSelected(targetIndex);
    },
    [selected]
  );

  /* =========================================================
     AUTOPLAY — advances automatically, pauses on hover.
  ========================================================= */
  useEffect(() => {
    if (!AUTOPLAY_INTERVAL || isHovering) return;

    intervalRef.current = setInterval(() => {
      setDirection("next");
      setSelected((i) => (i + 1) % total);
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(intervalRef.current);
  }, [isHovering, total]);

  // Left/right arrow key navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext]);

  return (
    <div className="fv-root">
      {/* ============ MAIN STAGE ============ */}
      <div
        className="fv-stage"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* blurred filmstrip bleeding off both edges */}
        <div className="fv-side fv-side-left">
          <img src={prevFrame.image} alt="" />
        </div>
        <div className="fv-side fv-side-right">
          <img src={nextFrame.image} alt="" />
        </div>

        {/* the main frame */}
        <div className="fv-frame">
          <div className="fv-frame-topbar" />

          <div className="fv-frame-body">
            <img
              key={current.id}
              className={`fv-frame-image fv-slide-${direction}`}
              src={current.image}
              alt={current.title}
            />
            <div className="fv-frame-gradient" />

            {/* corner brackets, like a viewfinder */}
            <span className="fv-corner fv-corner-tl" />
            <span className="fv-corner fv-corner-tr" />
            <span className="fv-corner fv-corner-bl" />
            <span className="fv-corner fv-corner-br" />

            <div
              className={`fv-frame-meta-top fv-slide-${direction}`}
              key={`top-${current.id}`}
            >
              <span className="fv-timecode">{current.timecode}</span>
              <span className="fv-count">
                {current.index} / {String(total).padStart(2, "0")}
              </span>
            </div>

            <div
              className={`fv-frame-meta-bottom fv-slide-${direction}`}
              key={`bottom-${current.id}`}
            >
              <span className="fv-category">{current.category}</span>
              <h2 className="fv-title">{current.title}</h2>
              <span className="fv-subtitle">{current.subtitle}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ============ CONTROL BAR ============ */}
      <div className="fv-controls">
        <div className="fv-nav">
          <button type="button" className="fv-arrow" onClick={goPrev} aria-label="Previous frame">
            ←
          </button>
          <button type="button" className="fv-arrow" onClick={goNext} aria-label="Next frame">
            →
          </button>
          <span className="fv-counter">
            {current.index} / {String(total).padStart(2, "0")}
          </span>
        </div>

        <div className="fv-specs">
          <div className="fv-spec">
            <span className="fv-spec-label">CAMERA</span>
            <span className="fv-spec-value">{current.camera}</span>
          </div>
          <div className="fv-spec">
            <span className="fv-spec-label">LENS</span>
            <span className="fv-spec-value">{current.lens}</span>
          </div>
          <div className="fv-spec">
            <span className="fv-spec-label">GRADE</span>
            <span className="fv-spec-value fv-spec-accent">{current.grade}</span>
          </div>
        </div>

        <div className="fv-thumbs">
          {frames.map((frame, i) => (
            <button
              key={frame.id}
              type="button"
              className={`fv-thumb ${i === selected ? "fv-thumb-active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Show ${frame.title}`}
            >
              <img src={frame.image} alt="" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
