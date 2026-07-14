// ============================================================
// ABOUT PAGE HERO
// Full-width background image with a dark gradient overlay so the
// heading/copy stay readable, matching the premium treatment used
// on the homepage hero.
// ============================================================

import { motion } from "framer-motion";
import "./AboutHero.css";

function AboutHero() {
  return (
    <section
      className="about-hero-section"
      style={{
        backgroundImage: "url(/aboutupsilon.png)",
      }}
    >
      <div className="about-hero-overlay"></div>

      <div className="about-hero-container">
        <motion.div
          className="about-hero-copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="about-hero-label">ABOUT UPSILON</span>
          <h1>Building Long-Term Partnerships with CPA Firms</h1>
          <p>
            We help US CPA and accounting firms strengthen their delivery
            capacity through secure, reliable, and scalable offshore
            accounting support.
          </p>
          <p>
            Our mission is simple to become a trusted extension of every
            firm's team while maintaining the quality, confidentiality, and
            responsiveness their clients expect.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutHero;
