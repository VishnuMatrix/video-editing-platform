import React, { useRef, useEffect } from "react";
import "./Process.css";

/*
=========================================================
CONTENT — edit freely. Add/remove phases, change copy,
change the marquee word, change the sidebar stats.
=========================================================
*/
const MARQUEE_WORD = "PROCESS";
const MARQUEE_REPEAT = 8; // how many times the word repeats per loop

const SIDEBAR_STATS = {
  label: "TYPICAL TURNAROUND",
  bigNumber: "2-6",
  bigUnit: "WKS",
  description:
    "From first call to final master for a 60-90s brand film. Longer-form narrative scoped separately.",
  rows: [
    { label: "REVIEW ROUNDS", value: "3 INCLUDED" },
    { label: "FEEDBACK", value: "FRAME.IO TIMESTAMPED" },
    { label: "MASTERS", value: "PRORES 4444 / H.265" },
    { label: "ARCHIVE", value: "12 MONTHS" },
  ],
};

const PHASES = [
  {
    num: "01",
    title: "DISCOVER",
    tags: ["BRIEF", "REFERENCES", "INTENT"],
    body: "Every cut starts with a conversation, not a timeline. I dig into the why — audience, tone, and the single feeling the piece should leave behind.",
    deliverable: "CREATIVE BRIEF + TONAL DECK",
  },
  {
    num: "02",
    title: "SELECT",
    tags: ["INGEST", "SYNC", "STRING-OUT"],
    body: "Footage is logged, synced and pulled into selects reels. The best frames surface early; the story reveals itself in the string-out.",
    deliverable: "SELECTS REEL + STRING-OUT",
  },
  {
    num: "03",
    title: "CUT",
    tags: ["ASSEMBLY", "ROUGH", "FINE"],
    body: "Rhythm is built cut by cut. Pacing, structure and music are locked in iterative passes with clear checkpoints for feedback.",
    deliverable: "ROUGH CUT → FINE CUT (V1-V3)",
  },
  {
    num: "04",
    title: "DESIGN",
    tags: ["MOTION", "TYPE", "GRAPHICS"],
    body: "Titles, lower-thirds and kinetic typography are designed to the picture — never bolted on. Motion is a second edit layer.",
    deliverable: "MOTION PACKAGE + STYLE FRAMES",
  },
  {
    num: "05",
    title: "REFINE",
    tags: ["COLOR", "SOUND", "VFX"],
    body: "Grade for mood, mix for clarity, clean-up for polish. Every element is conformed at full resolution and reviewed on calibrated displays.",
    deliverable: "GRADED + MIXED PICTURE-LOCK",
  },
  {
    num: "06",
    title: "DELIVER",
    tags: ["MASTERS", "VERSIONS", "QC"],
    body: "ProRes masters, social crops, captions and archival project files — QC'd, named, and handed off ready to publish.",
    deliverable: "DELIVERY PACKAGE + ARCHIVE",
  },
];

/* =========================================================
   MARQUEE — infinite horizontal loop, like the "Work · Work"
   reference. Purely decorative, sits above the process section.
========================================================= */
function Marquee({ word = MARQUEE_WORD, repeat = MARQUEE_REPEAT }) {
  const items = Array.from({ length: repeat });

  const renderGroup = (copy) => (
    <div className="ps-marquee-group" key={copy}>
      {items.map((_, i) => (
        <React.Fragment key={`${copy}-${i}`}>
          <span className="ps-marquee-word">{word}</span>
          <span className="ps-marquee-dot">·</span>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="ps-marquee">
      <div className="ps-marquee-track">
        {/* Two copies side-by-side in ONE row, not two stacked rows —
            the track animates -50% so the second copy seamlessly
            takes the first one's place, reading as one endless line. */}
        {renderGroup("a")}
        {renderGroup("b")}
      </div>
    </div>
  );
}

/* =========================================================
   PROCESS TIMELINE
========================================================= */
export default function ProcessSection({
  sectionNumber = "04",
  eyebrow = "THE PROCESS · SIX PHASES",
  titleStart = "THE",
  titleEnd = "PROCESS",
  intro = "A repeatable structure that protects the creative. Every phase has a checkpoint, a deliverable and room for the unexpected.",
  phases = PHASES,
  stats = SIDEBAR_STATS,
}) {
  const timelineRef = useRef(null);
  const lineFillRef = useRef(null);
  const rafRef = useRef(null);

  /* =========================================================
     SCROLL-LINKED LINE — fills as you scroll down through the
     timeline, retracts as you scroll back up. Uses the
     timeline container's position in the viewport to compute
     a 0-1 progress value every frame while scrolling.
  ========================================================= */
  useEffect(() => {
    const updateProgress = () => {
      const el = timelineRef.current;
      const fill = lineFillRef.current;
      if (!el || !fill) return;

      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // 0 when the timeline's top has just entered the bottom of the
      // viewport, 1 when its bottom has scrolled past the top.
      const raw = (viewportHeight - rect.top) / (rect.height + viewportHeight);
      const progress = Math.min(Math.max(raw, 0), 1);

      fill.style.transform = `scaleY(${progress})`;
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        updateProgress();
        rafRef.current = null;
      });
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="ps-root">
      <Marquee />

      <div className="ps-inner">
        {/* ============ HEADER ============ */}
        <div className="ps-header">
          <span className="ps-section-number">{sectionNumber}</span>
          <div className="ps-header-rule" />
          <span className="ps-eyebrow">{eyebrow}</span>
        </div>

        <div className="ps-heading-row">
          <h2 className="ps-title">
            {titleStart} <span className="ps-title-outline">{titleEnd}</span>
          </h2>
          <p className="ps-intro">{intro}</p>
        </div>

        {/* ============ TIMELINE ============ */}
        <div className="ps-timeline" ref={timelineRef}>
          {/* base (dim) line + animated fill, both full height of the timeline */}
          <div className="ps-line-track">
            <div className="ps-line-fill" ref={lineFillRef} />
          </div>

          {/* first row: sidebar stats + phase 01, side by side */}
          <div className="ps-row">
            <div className="ps-sidebar">
              <span className="ps-sidebar-label">{stats.label}</span>
              <div className="ps-sidebar-big">
                {stats.bigNumber} <span className="ps-accent">{stats.bigUnit}</span>
              </div>
              <p className="ps-sidebar-desc">{stats.description}</p>

              <div className="ps-sidebar-rows">
                {stats.rows.map((row) => (
                  <div className="ps-sidebar-row" key={row.label}>
                    <span>{row.label}</span>
                    <span className="ps-sidebar-value">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <span className="ps-node">{phases[0].num}</span>

            <PhaseCard phase={phases[0]} total={phases.length} />
          </div>

          {/* remaining rows: just the node + phase card (no sidebar) */}
          {phases.slice(1).map((phase) => (
            <div className="ps-row ps-row-compact" key={phase.num}>
              <div className="ps-row-spacer" aria-hidden="true" />
              <span className="ps-node">{phase.num}</span>
              <PhaseCard phase={phase} total={phases.length} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PhaseCard({ phase, total }) {
  return (
    <article className="ps-card">
      <div className="ps-card-top">
        <h3 className="ps-card-title">
          <span className="ps-card-num">{phase.num}</span> {phase.title}
        </h3>
        <span className="ps-card-phase">
          PHASE {parseInt(phase.num, 10)} / {total}
        </span>
      </div>

      <div className="ps-card-tags">{phase.tags.join(" · ")}</div>

      <p className="ps-card-body">{phase.body}</p>

      <div className="ps-card-deliverable">
        <span>DELIVERABLE</span>
        <span className="ps-card-deliverable-line" />
        <span className="ps-card-deliverable-value">{phase.deliverable}</span>
      </div>
    </article>
  );
}
