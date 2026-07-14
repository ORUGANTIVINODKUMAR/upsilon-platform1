// ============================================================
// FULL-WIDTH CONTACT CTA BANNER -- reusable via props
// ============================================================
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./CTA.css";

function CTA({
  title = "Ready to Build Your Offshore Accounting Team?",
  description = "Let's discuss your firm's goals and build a secure, scalable delivery model tailored to your workflows.",
  primaryLabel = "Schedule a Consultation",
  primaryTo = "/contact",
  secondaryLabel,
  secondaryTo,
}) {
  return (
    <section className="cta-banner">
      <div className="cta-banner-glow"></div>

      <motion.div
        className="cta-banner-content"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="cta-banner-buttons">
          <Link to={primaryTo} className="cta-banner-btn">
            {primaryLabel}
          </Link>
          {secondaryLabel && secondaryTo && (
            <Link to={secondaryTo} className="cta-banner-btn-outline">
              {secondaryLabel}
            </Link>
          )}
        </div>
      </motion.div>
    </section>
  );
}

export default CTA;
