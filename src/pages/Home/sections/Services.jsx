import { motion } from "framer-motion";
import "./Services.css";

const servicesRowOne = [
  {
    title: "Short Videos",
    description: "Turn long narratives into engaging short-form videos.",
  },
  {
    title: "Instagram Reels",
    description: "Make Instagram Reels that pop and keep people watching.",
  },
  {
    title: "YouTube Shorts",
    description: "Edited for impact, retention and engagement.",
  },
  {
    title: "Product Commercials",
    description: "Snappy product ads designed to showcase your brand.",
  },
];

const servicesRowTwo = [
  {
    title: "Business Videos",
    description: "Professional videos with a tailored touch of success.",
  },
  {
    title: "Explainer Videos",
    description: "Complex ideas simplified through clean editing.",
  },
  {
    title: "Documentaries",
    description: "Stories brought to life with seamless edits.",
  },
  {
    title: "Social Media Content",
    description: "Content optimized for modern social platforms.",
  },
];

function ServiceCard({ service }) {
  return (
    <div className="service-card">
      <h3>{service.title}</h3>

      <p>{service.description}</p>

      <span className="service-line" />
    </div>
  );
}

function ServicesRow({ items, reverse = false }) {
  return (
    <div className="services-marquee">
      <motion.div
        className="services-track"
        animate={{
          x: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* FIRST COPY */}

        <div className="services-group">
          {items.map((service, index) => (
            <ServiceCard
              key={`first-${index}`}
              service={service}
            />
          ))}
        </div>

        {/* SECOND COPY */}

        <div className="services-group">
          {items.map((service, index) => (
            <ServiceCard
              key={`second-${index}`}
              service={service}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function Services() {
  return (
    <section className="services-section">

      {/* =====================================
          SUBTLE BACKGROUND
      ===================================== */}

      <div className="services-glow" />


      {/* =====================================
          SMALL HEADING
      ===================================== */}

      <div className="services-heading">
        <p>WHAT WE CREATE</p>

        <h2>
          Built for every
          <span> kind of story.</span>
        </h2>
      </div>


      {/* =====================================
          ROW ONE
      ===================================== */}

      <ServicesRow
        items={servicesRowOne}
      />


      {/* =====================================
          ROW TWO
      ===================================== */}

      <ServicesRow
        items={servicesRowTwo}
        reverse
      />


      {/* =====================================
          BOTTOM LABEL
      ===================================== */}

      <div className="services-bottom">
        <span>VIDEO EDITING</span>
        <b>•</b>
        <span>CONTENT CREATION</span>
        <b>•</b>
        <span>STORYTELLING</span>
      </div>

    </section>
  );
}

export default Services;
