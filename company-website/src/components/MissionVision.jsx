// ============================================================
// MISSION & VISION -- two premium cards, equal height
// ============================================================
import { motion } from "framer-motion";
import { LuTarget, LuTelescope } from "react-icons/lu";
import "./MissionVision.css";

function MissionVision() {
  return (
    <section className="mv-section">
      <div className="mv-container">
        <motion.div
          className="mv-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45 }}
        >
          <div className="mv-icon">
            <LuTarget />
          </div>
          <h3>Our Mission</h3>
          <p>
            To empower CPA and accounting firms with secure, reliable, and
            scalable offshore accounting solutions that increase capacity,
            improve efficiency, and enable sustainable growth.
          </p>
        </motion.div>

        <motion.div
          className="mv-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          <div className="mv-icon">
            <LuTelescope />
          </div>
          <h3>Our Vision</h3>
          <p>
            To become the preferred offshore delivery partner for CPA firms
            by building long-term relationships founded on trust, quality,
            security, and exceptional client service.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default MissionVision;
