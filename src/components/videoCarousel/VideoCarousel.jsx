import React, { useState, useRef, useEffect } from "react";
import "./VideoCarousel.css";

// Your existing video
import video1 from "../../animations/video1.mp4";

/*
=========================================================
IMPORTANT
=========================================================
A circular 3D carousel looks best with 8+ items — with too
few, the gaps between cards are so wide that whichever two
cards are nearest the camera fill the whole screen.

You currently have only ONE real video (video1.mp4), so the
same file is reused across 9 cards below. Replace `src` with
your real videos as you get them.
=========================================================
*/

const DEFAULT_ITEMS = [
  { id: 1, index: "01", title: "ALLY", subtitle: "NORTHLINE FILM", tag: "NARRATIVE", src: video1 },
  { id: 2, index: "02", title: "SIGNAL / NOISE", subtitle: "NORTHLINE FILM", tag: "COMMERCIAL", src: video1 },
  { id: 3, index: "03", title: "VELOUR", subtitle: "NORTHLINE FILM", tag: "VFX", src: video1 },
  { id: 4, index: "04", title: "NOCTURNE", subtitle: "NORTHLINE FILM", tag: "NARRATIVE", src: video1 },
  { id: 5, index: "05", title: "OVERHEAD", subtitle: "NORTHLINE FILM", tag: "AUTOMOTIVE", src: video1 },
  { id: 6, index: "06", title: "FRAME", subtitle: "NORTHLINE FILM", tag: "EDITORIAL", src: video1 },
  { id: 7, index: "07", title: "BLOOM", subtitle: "NORTHLINE FILM", tag: "TITLE SEQUENCE", src: video1 },
  { id: 8, index: "08", title: "MERIDIAN", subtitle: "NORTHLINE FILM", tag: "COMMERCIAL", src: video1 },
  { id: 9, index: "09", title: "GRID CITY", subtitle: "NORTHLINE FILM", tag: "BRAND FILM", src: video1 },
];

/*
=========================================================
CARD SIZE — must match --card-width in the CSS
=========================================================
*/
const CARD_WIDTH = 460;

// >1 pulls cards apart on the ring so you see a sliver of gap between
// them, without killing the tunnel effect. Keep this modest (1.1-1.25) —
// it's the perspective value below that creates the deep "gorge" look,
// not this.
const GAP_FACTOR = 1.15;

export default function VideoCarousel({ items = DEFAULT_ITEMS, autoRotateSpeed = 0.12 }) {
  const [rotation, setRotation] = useState(0);
  const [activeItem, setActiveItem] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const dragState = useRef({ startX: 0, startRotation: 0, moved: 0 });
  const rafRef = useRef(null);

  const angleStep = 360 / items.length;

  const radius =
    items.length > 1
      ? Math.round((CARD_WIDTH / 2 / Math.tan(Math.PI / items.length)) * GAP_FACTOR)
      : 0;

  /* =========================================================
     AUTO ROTATION
  ========================================================= */
  useEffect(() => {
    if (isDragging || isPaused || activeItem) return;

    const tick = () => {
      setRotation((current) => current + autoRotateSpeed);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isDragging, isPaused, activeItem, autoRotateSpeed]);

  /* =========================================================
     DRAG HANDLING
     NOTE: this deliberately does NOT use setPointerCapture.
     Capturing the pointer on the stage reroutes the resulting
     "click" event to the stage itself instead of the card you
     tapped — which is exactly why cards were unclickable
     before. Instead we track the drag with window-level
     listeners, which leaves normal click bubbling on each
     card untouched.
  ========================================================= */
  const handlePointerDown = (e) => {
    dragState.current.startX = e.clientX;
    dragState.current.startRotation = rotation;
    dragState.current.moved = 0;
    setIsDragging(true);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (e) => {
      const delta = e.clientX - dragState.current.startX;
      dragState.current.moved = Math.abs(delta);
      setRotation(dragState.current.startRotation + delta * 0.25);
    };

    const handleUp = () => setIsDragging(false);

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    window.addEventListener("pointercancel", handleUp);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
      window.removeEventListener("pointercancel", handleUp);
    };
  }, [isDragging]);

  const handleCardClick = (item) => {
    // Don't open the modal if this tap was actually a drag.
    if (dragState.current.moved > 6) return;
    setActiveItem(item);
  };

  const handleReset = () => setRotation(0);

  return (
    <section className="vc-root">
      {/* ============ HEADER ============ */}
      <div className="vc-header">
        <div className="vc-header-left">
          <div className="vc-eyebrow">SELECTED WORK / {String(items.length).padStart(2, "0")}</div>
          <h1 className="vc-title">
            THE <span className="vc-title-outline">ARCHIVE</span>
          </h1>
        </div>
        <p className="vc-desc">
          Drag to explore the archive.
          <br />
          Select a frame to view the project.
        </p>
      </div>

      {/* ============ 3D CAROUSEL ============ */}
      <div
        className={`vc-stage ${isDragging ? "vc-is-dragging" : ""}`}
        onPointerDown={handlePointerDown}
      >
        <div
          className="vc-ring"
          style={{ transform: `translateZ(-${radius}px) rotateY(${-rotation}deg)` }}
        >
          {items.map((item, i) => {
            const theta = angleStep * i;

            let diff = ((theta - rotation) % 360 + 360) % 360;
            if (diff > 180) diff -= 360;
            const absDiff = Math.abs(diff);
            const depthT = Math.min(absDiff / 180, 1); // 0 (front) -> 1 (back)
            const isFront = absDiff < angleStep / 2;

            const scale = 1 - depthT * 0.4;
            const opacity = 1 - depthT * 0.65;
            const brightness = 1 - depthT * 0.45;

            return (
              <article
                key={item.id}
                className={`vc-card ${isFront ? "vc-card-active" : ""}`}
                style={{
                  transform: `rotateY(${theta}deg) translateZ(${radius}px) scale(${scale})`,
                  opacity,
                  filter: `brightness(${brightness})`,
                  zIndex: Math.round((1 - depthT) * 100),
                }}
                onClick={() => handleCardClick(item)}
              >
                <video
                  className="vc-card-video"
                  src={item.src}
                  muted
                  loop
                  playsInline
                  autoPlay
                  preload="metadata"
                />
                <div className="vc-card-overlay" />
                <span className="vc-card-index">{item.index}</span>
                {item.tag && <span className="vc-card-tag">{item.tag}</span>}
                <div className="vc-card-info">
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* ============ CONTROLS ============ */}
      <div className="vc-controls">
        <button
          type="button"
          className="vc-btn vc-btn-accent"
          onClick={() => setIsPaused((current) => !current)}
        >
          {isPaused ? "▶" : "❚❚"}
        </button>
        <button type="button" className="vc-btn" onClick={handleReset}>
          ↺
        </button>
        <span className="vc-hint">DRAG TO SPIN</span>
      </div>

      {/* ============ VIDEO MODAL ============ */}
      {activeItem && <VideoModal item={activeItem} onClose={() => setActiveItem(null)} />}
    </section>
  );
}

/* =========================================================
   VIDEO MODAL — plays the clicked video full-screen, with a
   blurred looping copy of the same video behind it.
========================================================= */
function VideoModal({ item, onClose }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay with sound was blocked — the visible controls
        // let the user press play themselves.
      });
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div className="vc-modal" onClick={onClose}>
      <video className="vc-modal-bg" src={item.src} autoPlay muted loop playsInline />
      <div className="vc-modal-scrim" />

      <div className="vc-modal-content" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="vc-modal-close" onClick={onClose}>
          ✕
        </button>

        <video ref={videoRef} className="vc-modal-video" src={item.src} controls playsInline />

        <div className="vc-modal-meta">
          <span>{item.index}</span>
          <div>
            <h2>{item.title}</h2>
            <p>
              {item.subtitle} · {item.tag}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
