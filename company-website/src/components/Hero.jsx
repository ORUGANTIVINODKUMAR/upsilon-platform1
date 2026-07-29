import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LuArrowRight, LuShieldCheck, LuUsers, LuTrendingUp } from "react-icons/lu";
import "./Hero.css";

const highlights = [
  { icon: <LuUsers aria-hidden="true" />, label: "CPA-Focused Support" },
  { icon: <LuShieldCheck aria-hidden="true" />, label: "Secure Workflows" },
  { icon: <LuTrendingUp aria-hidden="true" />, label: "Scalable Teams" },
];

// Parent controls the timing; children just declare their start/end state.
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

function Hero() {
  return (
    <section className="hero-section" aria-labelledby="hero-heading">
      <div className="hero-overlay" aria-hidden="true"></div>

      {/* Decorative animated background orbs */}
      <div className="hero-orbs" aria-hidden="true">
        <span className="hero-orb hero-orb-1" />
        <span className="hero-orb hero-orb-2" />
        <span className="hero-orb hero-orb-3" />
      </div>

      <div className="hero-container">
        <motion.div
          className="hero-content"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.p className="hero-label" variants={item}>
            Your Partner for People, Process &amp; Technology
          </motion.p>

          <motion.h1 id="hero-heading" variants={item}>
            CPA Outsourcing Services for Accounting, Tax &amp; Audit Support
          </motion.h1>

          <motion.p className="hero-description" variants={item}>
            Upsilon Services helps CPA firms expand capacity with dedicated
            accounting professionals. We provide bookkeeping, tax preparation,
            audit support, payroll, and back-office outsourcing through secure
            workflows, signed NDAs, controlled access, and transparent
            communication.
          </motion.p>

          <motion.div
            className="hero-highlights"
            aria-label="Key service benefits"
            variants={item}
          >
            {highlights.map((highlight) => (
              <span className="hero-highlight" key={highlight.label}>
                <span className="hero-highlight-icon">{highlight.icon}</span>
                {highlight.label}
              </span>
            ))}
          </motion.div>

          <motion.div className="hero-buttons" variants={item}>
            <Link to="/contact" className="hero-btn hero-btn-primary">
              Talk to Our Experts
              <LuArrowRight aria-hidden="true" />
            </Link>

            <Link to="/services" className="hero-btn hero-btn-secondary">
              Explore Services
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
