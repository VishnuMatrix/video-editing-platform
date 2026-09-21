import { motion } from "framer-motion";
import "./Timeline.css";

const steps = [
  {
    number: "01",
    title: "Brief",
    text: "We understand your idea, audience and the story you want to tell.",
  },
  {
    number: "02",
    title: "Edit",
    text: "Our editors turn your raw footage into engaging and polished content.",
  },
  {
    number: "03",
    title: "Review",
    text: "You review the edit and we refine every important detail.",
  },
  {
    number: "04",
    title: "Deliver",
    text: "Your final video is delivered ready for publishing.",
  },
];

function TimelineCard({ step, index }) {
  return (
    <motion.div
      className="timeline-card"
      animate={{
        y: [0, -12, 0, 10, 0],
        rotate: [
          index % 2 === 0 ? -3 : 3,
          index % 2 === 0 ? -1 : 1,
          index % 2 === 0 ? -3 : 3,
        ],
      }}
      transition={{
        duration: 6 + index,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <span className="timeline-number">
        {step.number}
      </span>

      <h3>{step.title}</h3>

      <p>{step.text}</p>

      <div className="timeline-small-line" />
    </motion.div>
  );
}

function Timeline() {
  return (
    <section className="timeline-section">

      {/* ======================================
          MOVING BACKGROUND TITLE
      ====================================== */}

      <div className="timeline-marquee">

        <motion.div
          className="timeline-marquee-track"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        >

          <div className="timeline-marquee-group">

            <span>HOW IT WORKS</span>
            <b>•</b>

            <span>HOW IT WORKS</span>
            <b>•</b>

            <span>HOW IT WORKS</span>
            <b>•</b>

            <span>HOW IT WORKS</span>
            <b>•</b>

          </div>

          <div className="timeline-marquee-group">

            <span>HOW IT WORKS</span>
            <b>•</b>

            <span>HOW IT WORKS</span>
            <b>•</b>

            <span>HOW IT WORKS</span>
            <b>•</b>

            <span>HOW IT WORKS</span>
            <b>•</b>

          </div>

        </motion.div>

      </div>


      {/* ======================================
          SMALL HEADING
      ====================================== */}

      <div className="timeline-intro">

        <p>HOW IT WORKS</p>

        <h2>
          Simple process.
          <span> Great results.</span>
        </h2>

      </div>


      {/* ======================================
          INFINITE MOVING TIMELINE
      ====================================== */}

      <div className="timeline-window">

        <motion.div
          className="timeline-track"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear",
          }}
        >

          {/* FIRST COPY */}

          <div className="timeline-group">

            {steps.map((step, index) => (
              <div
                className="timeline-item"
                key={`first-${index}`}
              >

                <TimelineCard
                  step={step}
                  index={index}
                />

              </div>
            ))}

          </div>


          {/* SECOND COPY
              Required for seamless loop */}

          <div className="timeline-group">

            {steps.map((step, index) => (
              <div
                className="timeline-item"
                key={`second-${index}`}
              >

                <TimelineCard
                  step={step}
                  index={index}
                />

              </div>
            ))}

          </div>

        </motion.div>

      </div>


      {/* ======================================
          MOVING LINE
      ====================================== */}

      <div className="timeline-line">

        <motion.div
          className="timeline-line-track"
          animate={{
            x: ["-20%", "120%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />

      </div>


      {/* ======================================
          BOTTOM TEXT
      ====================================== */}

      <div className="timeline-bottom">

        <p>READY WHEN YOU ARE</p>

        <h3>
          Let's create something
          <span> worth watching.</span>
        </h3>

        <button>
          Get Started
          <span>↗</span>
        </button>

      </div>

    </section>
  );
}

export default Timeline;
