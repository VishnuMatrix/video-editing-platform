import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import { useRef } from "react";
import VideoCarousel from "../../../components/videoCarousel/VideoCarousel";
import FrameViewer from "../../../components/FrameViewer/FrameViewer.jsx";
import Process from "../../../components/Process/Process";
import "./Showcase.css";


/* =========================================================
   SHARED: FLOATING CARD WRAPPER
========================================================= */

function FloatingWrapper({
  children,
  className,
  scrollX,
  scrollY,
  baseRotate = 0,
  z = 1,
  index = 0,
}) {
  const floatDuration = 5 + (index % 4);
  const floatDelay = index * 0.3;
  const floatRange =
    8 + (index % 3) * 4;

  const wiggle = 2;

  return (
    <motion.div
      className={className}
      style={{
        x: scrollX,
        y: scrollY,
        rotate: baseRotate,
        zIndex: z,
      }}
    >
      <motion.div
        animate={{
          y: [
            0,
            -floatRange,
            0,
            floatRange,
            0,
          ],

          rotate: [
            0,
            wiggle,
            0,
            -wiggle,
            0,
          ],
        }}
        transition={{
          duration: floatDuration,
          delay: floatDelay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}


/* =========================================================
   SHARED: MARQUEE
========================================================= */

function Marquee({
  trackClassName,
  groupClassName,
  items,
  renderItem,
}) {
  return (
    <div className={trackClassName}>

      {[0, 1].map((copy) => (
        <div
          className={groupClassName}
          key={copy}
        >
          {items.map((item, index) =>
            renderItem(
              item,
              index,
              copy
            )
          )}
        </div>
      ))}

    </div>
  );
}


/* =========================================================
   SHARED: CARD SCROLL TRANSFORMS
========================================================= */

function useCardTransforms(
  scrollYProgress,
  yRanges,
  xRanges
) {
  const y = yRanges.map((range) =>
    useTransform(
      scrollYProgress,
      [0, 1],
      range
    )
  );

  const x = xRanges.map((range) =>
    useTransform(
      scrollYProgress,
      [0, 1],
      range
    )
  );

  return {
    y,
    x,
  };
}


/* =========================================================
   WORK DATA
========================================================= */

const clients = [
  {
    name: "Cisco",
    logo: "/images/logos/cisco.svg",
  },

  {
    name: "Byter",
    logo: "/images/logos/byter.svg",
  },

  {
    name: "Microsoft",
    logo: "/images/logos/microsoft.svg",
  },

  {
    name: "CMA CGM",
    logo: "/images/logos/cmacgm.svg",
  },

  {
    name: "SOBHA",
    logo: "/images/logos/sobha.svg",
  },

  {
    name: "Razer",
    logo: "/images/logos/razer.svg",
  },
];


const projects = [
  {
    type: "video",

    image: "/images/work-1.jpg",

    className: "card-one",

    baseRotate: -8,

    z: 1,
  },

  {
    type: "testimonial",

    text:
      "Oneforeditis is my go-to video editing agency. They are precise, patient and insightful. Perfect partners to bring my idea to life. I have been working with them for 1 year.",

    author: "Giacomovose",

    role: "Founder of Wishen, Italy",

    className: "card-two",

    baseRotate: 4,

    z: 2,
  },

  {
    type: "video",

    image: "/images/work-2.jpg",

    className: "card-three",

    baseRotate: -6,

    z: 1,
  },

  {
    type: "testimonial",

    text:
      "Excellent communication from start to finish, very professional and skilled editing team. Thank you Aasil and Team. I will be back with more business for sure.",

    author: "Ismail",

    role: "Founder of Tech Ops, USA",

    className: "card-four",

    baseRotate: 5,

    z: 2,
  },

  {
    type: "video",

    image: "/images/work-3.jpg",

    className: "card-five",

    baseRotate: 3,

    z: 1,
  },

  {
    type: "testimonial",

    text:
      "They went above and beyond our expectations. Aasil took the direction we gave him and ran with it. Editing is high quality, engaging, and super professional. We will use their services again and cannot recommend them enough.",

    author: "Team, Creative Studio LA",

    role: "",

    className: "card-six",

    baseRotate: 6,

    z: 2,
  },

  {
    type: "video",

    image: "/images/work-4.jpg",

    className: "card-seven",

    baseRotate: -4,

    z: 1,
  },

  {
    type: "testimonial",

    text:
      "All I can say is Oneforedits did a fantastic job. They took our vision and delivered. Very responsive and got the edit I wanted on the first take. Highly recommend!",

    author: "founder of bajaboardroom.com",

    role: "",

    className: "card-eight",

    baseRotate: -5,

    z: 2,
  },
];


/* =========================================================
   PROJECT CARD
========================================================= */

function ProjectCard({ project }) {

  if (project.type === "video") {

    return (
      <div className="work-card video-card">

        <img
          src={project.image}
          alt="Video project"
        />

        <div className="project-play">
          <span>▶</span>
        </div>

      </div>
    );
  }


  return (
    <div className="work-card testimonial-card">

      <p className="testimonial-text">
        “{project.text}”
      </p>

      <div className="testimonial-footer">

        <div className="avatar">
          {project.author.charAt(0)}
        </div>

        <div className="testimonial-info">

          <p className="author-name">
            {project.author}
          </p>

          {project.role && (
            <p className="author-role">
              {project.role}
            </p>
          )}

          <div className="stars">
            ★★★★★
          </div>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   WORK SECTION
========================================================= */

export function Work() {

  const sectionRef = useRef(null);


  const {
    scrollYProgress,
  } = useScroll({
    target: sectionRef,

    offset: [
      "start end",
      "end start",
    ],
  });


  /* =====================================================
     FLOATING WORK CARDS
  ===================================================== */

  const {
    y: cardY,
    x: cardX,
  } = useCardTransforms(

    scrollYProgress,

    [
      [60, -70],
      [-30, 80],
      [80, -80],
      [-60, 90],
      [70, -60],
      [-50, 70],
      [60, -60],
      [-70, 50],
    ],

    [
      [-15, 20],
      [20, -20],
      [-20, 25],
      [15, -25],
      [-20, 15],
      [20, -15],
      [-15, 15],
      [15, -15],
    ]

  );


  /* =====================================================
     WORK SECTION SLIDE ANIMATION
  ===================================================== */

  const workY = useTransform(
    scrollYProgress,

    [0, 0.35],

    [100, 0]
  );


  const workScale = useTransform(
    scrollYProgress,

    [0, 0.35],

    [0.94, 1]
  );


  const workOpacity = useTransform(
    scrollYProgress,

    [0, 0.25, 0.4],

    [0, 0.7, 1]
  );


  return (
    <section
      ref={sectionRef}
      id="work"
      className="work-section"
    >

      <motion.div
        className="work-slide-wrapper"

        style={{
          y: workY,

          scale: workScale,

          opacity: workOpacity,
        }}
      >


        {/* =============================================
            CLIENTS
        ============================================= */}

        <div className="clients-section">

          <p className="clients-label">
            TRUSTED BY BRANDS &amp; CREATORS
          </p>


          <div className="clients-marquee">

            <Marquee
              trackClassName="clients-track"

              groupClassName="clients-group"

              items={clients}

              renderItem={(
                client,
                index,
                copy
              ) => (

                <div
                  className="client-item"

                  key={`client-${copy}-${index}`}
                >

                  <img
                    src={client.logo}

                    alt={client.name}

                    className="client-logo"
                  />

                </div>

              )}
            />

          </div>

        </div>


        {/* =============================================
            WORK SHOWCASE
        ============================================= */}

        <div className="work-showcase">

          <div className="work-canvas">

            {projects.map(
              (project, index) => (

                <FloatingWrapper
                  key={index}

                  className={`floating-card ${project.className}`}

                  scrollX={cardX[index]}

                  scrollY={cardY[index]}

                  baseRotate={
                    project.baseRotate
                  }

                  z={project.z}

                  index={index}
                >

                  <ProjectCard
                    project={project}
                  />

                </FloatingWrapper>

              )
            )}

          </div>


          {/* =========================================
              WORK MARQUEE
          ========================================= */}

          <div className="work-marquee">

            <Marquee
              trackClassName="work-track"

              groupClassName="work-group"

              items={Array.from({
                length: 5,
              })}

              renderItem={(
                _,
                index,
                copy
              ) => (

                <span
                  key={`${copy}-${index}`}
                >
                  Work
                  <b>•</b>
                </span>

              )}
            />

          </div>

        </div>

      </motion.div>

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
