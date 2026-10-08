import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import { useRef, useState, useEffect } from "react";

import FrameViewer from "../../../components/FrameViewer/FrameViewer.jsx";
import VideoCarousel from "../../../components/videoCarousel/VideoCarousel";
import Process from "../../../components/Process/Process";

import img1 from "../../../assets/images/img1.png";
import img2 from "../../../assets/images/img2.png";

import "./Showcase.css";

/* =========================================================
   CLIENTS
========================================================= */

const clients = [
  "BYTER",
  "MICROSOFT",
  "CMA CGM",
  "SOBHA",
  "RAZER",
  "CISCO",
];

/* =========================================================
   PROJECTS (VIDEO)
   Put your videos in /public/videos and change names below
========================================================= */

const projects = [
  {
    video: "/videos/video1.mp4",
    poster: img1,
    number: "01",
    category: "VIDEO EDITING",
    title: "Creative Storytelling",
  },
  {
    video: "/videos/video2.mp4",
    poster: img2,
    number: "02",
    category: "MOTION DESIGN",
    title: "Visual Identity",
  },
  {
    video: "/videos/video3.mp4",
    poster: img1,
    number: "03",
    category: "SHORT FORM",
    title: "Social Content",
  },
  {
    video: "/videos/video4.mp4",
    poster: img2,
    number: "04",
    category: "CINEMATIC EDIT",
    title: "Brand Film",
  },
  {
    video: "/videos/video5.mp4",
    poster: img1,
    number: "05",
    category: "REELS",
    title: "Product Launch",
  },
];

/* max tilt (degrees) at the screen edges */
const MAX_TILT = 14;

/* =========================================================
   REVIEWS
========================================================= */

const reviews = [
  {
    text:
      "Oneforedits is my go-to video editing agency. They are precise, patient and insightful. Perfect partners to bring my idea to life. I have been working with them for 1 year.",
    author: "Giacomovose",
    role: "Founder of Wishen, Italy",
  },
  {
    text:
      "Excellent communication from start to finish, very professional and skilled editing team. Thank you Aasil and Team. I will be back with more business for sure.",
    author: "Ismail",
    role: "Founder of Tech Ops, USA",
  },
  {
    text:
      "They went above and beyond our expectations. Aasil took the direction we gave him and ran with it. Editing is high quality, engaging, and super professional.",
    author: "Team, Creative Studio LA",
    role: "Creative Studio",
  },
  {
    text:
      "All I can say is Oneforedits did a fantastic job. They took our vision and delivered. Very responsive and got the edit I wanted on the first take. Highly recommend!",
    author: "Founder",
    role: "bajaboardroom.com",
  },
];

/* =========================================================
   CLIENT MARQUEE
========================================================= */

function ClientMarquee() {
  return (
    <div className="showcase-client-marquee">
      <div className="showcase-client-track">
        {[...clients, ...clients].map((client, index) => (
          <div
            className="showcase-client"
            key={`${client}-${index}`}
          >
            <span className="showcase-client-symbol">
              ◆
            </span>

            <span>{client}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   VIDEO PROJECT CARD
   Tilt depends on where the card is on screen:
   left side = tilt left, centre = straight, right = tilt right
========================================================= */

function ProjectCard({ project, x }) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const rotate = useTransform(x, (latest) => {
    const el = cardRef.current;
    if (!el) return 0;

    const center = latest + el.offsetLeft + el.offsetWidth / 2;
    const half = window.innerWidth / 2;
    const t = Math.max(-1, Math.min(1, (center - half) / half));

    return t * MAX_TILT;
  });

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    const p = v.play();
    if (p && p.catch) p.catch(() => {});
    setPlaying(true);
  };

  const pause = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    setPlaying(false);
  };

  return (
    <motion.article
      ref={cardRef}
      className="showcase-card"
      style={{ rotate }}
      whileHover={{ y: -10, transition: { duration: 0.35 } }}
      onMouseEnter={play}
      onMouseLeave={pause}
      onClick={() => (playing ? pause() : play())}
    >
      <div className="showcase-card-media">
        <video
          ref={videoRef}
          src={project.video}
          poster={project.poster}
          muted
          loop
          playsInline
          preload="metadata"
        />

        <span
          className={`showcase-card-play ${
            playing ? "is-hidden" : ""
          }`}
        >
          <svg viewBox="0 0 24 24" width="26" height="26">
            <path d="M8 5v14l11-7z" fill="#fff" />
          </svg>
        </span>
      </div>

      <div className="showcase-card-info">
        <div>
          <span className="showcase-project-number">
            {project.number}
          </span>

          <span className="showcase-project-category">
            {project.category}
          </span>
        </div>

        <h3>{project.title}</h3>
      </div>
    </motion.article>
  );
}

/* =========================================================
   HORIZONTAL SCROLL GALLERY
   - stage is pinned (sticky)
   - starts empty, cards come in from the right
   - scrolling moves ONLY the cards
   - after the last card leaves, the page continues
========================================================= */

function ProjectGallery() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const [vw, setVw] = useState(1200);
  const [trackW, setTrackW] = useState(0);

  useEffect(() => {
    const measure = () => {
      setVw(window.innerWidth);

      if (trackRef.current) {
        setTrackW(trackRef.current.scrollWidth);
      }
    };

    measure();

    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);

    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* start: track fully off the right edge
     end:   track fully off the left edge */
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [vw, -trackW]
  );

  const travel = trackW + vw;

  return (
    <section
      ref={sectionRef}
      className="showcase-hscroll"
      style={{
        height: travel
          ? `calc(${travel}px + 100vh)`
          : "400vh",
      }}
    >
      <div className="showcase-hscroll-sticky">
        <motion.div
          ref={trackRef}
          className="showcase-hscroll-track"
          style={{ x }}
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.number}
              project={project}
              x={x}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* =========================================================
   REVIEW CARD
========================================================= */

function ReviewCard({ review, index }) {
  return (
    <motion.article
      className="showcase-review"
      initial={{
        opacity: 0,
        y: 60,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
      }}
    >
      <div className="showcase-review-top">
        <span className="showcase-quote">
          “
        </span>

        <div className="showcase-stars">
          ★★★★★
        </div>
      </div>

      <p className="showcase-review-text">
        {review.text}
      </p>

      <div className="showcase-review-author">
        <div className="showcase-avatar">
          {review.author.charAt(0)}
        </div>

        <div>
          <strong>{review.author}</strong>

          <span>{review.role}</span>
        </div>
      </div>
    </motion.article>
  );
}

/* =========================================================
   WORK SECTION
========================================================= */

function Work() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headingY = useTransform(
    scrollYProgress,
    [0, 0.05],
    [80, 0]
  );

  const headingOpacity = useTransform(
    scrollYProgress,
    [0, 0.03, 1],
    [0, 1, 1]
  );

  return (
    <section
      ref={sectionRef}
      id="work"
      className="showcase-work"
    >
      {/* CLIENTS */}

      <section className="showcase-clients">
        <div className="showcase-section-label">
          <span>01</span>
          <span>TRUSTED BY BRANDS & CREATORS</span>
        </div>

        <ClientMarquee />
      </section>

      {/* SELECTED WORK HEADING */}

      <section className="showcase-selected">
        <motion.div
          className="showcase-heading"
          style={{
            y: headingY,
            opacity: headingOpacity,
          }}
        >
          <div className="showcase-heading-meta">
            <span>02 / SELECTED WORK</span>

            <span>
              EDIT / MOTION / STORY
            </span>
          </div>

          <h2>
            WORK THAT
            <br />
            <span>MOVES.</span>
          </h2>

          <p>
            A selection of edits, visual stories and
            motion-driven work created to make brands
            impossible to ignore.
          </p>
        </motion.div>
      </section>

      {/* HORIZONTAL SCROLL VIDEO GALLERY */}

      <ProjectGallery />

      {/* REVIEWS */}

      <section className="showcase-reviews">
        <div className="showcase-reviews-heading">
          <div className="showcase-section-label">
            <span>03</span>
            <span>CLIENT WORDS</span>
          </div>

          <h2>
            GOOD WORK
            <br />
            <span>GETS REMEMBERED.</span>
          </h2>

          <p>
            Don't just take our word for it.
            Here's what some of the people we've
            worked with have to say.
          </p>
        </div>

        <div className="showcase-review-grid">
          {reviews.map((review, index) => (
            <ReviewCard
              key={index}
              review={review}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* BRAND MARQUEE */}

      <div className="showcase-work-marquee">
        <div className="showcase-work-marquee-track">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="showcase-work-marquee-item">
              <span>ABNOXIOUS EDITS</span>
              <b>•</b>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   MAIN SHOWCASE
========================================================= */

function Showcase() {
  return (
    <div className="showcase-wrapper">
      <Work />

      <FrameViewer />

      <VideoCarousel />

      <Process />
    </div>
  );
}

export default Showcase;
