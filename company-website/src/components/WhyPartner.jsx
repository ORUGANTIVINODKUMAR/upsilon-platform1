// ============================================================
// WHY FIRMS PARTNER WITH UPSILON -- six checkmark value cards
// ============================================================
import { motion } from "framer-motion";
import { LuCheck } from "react-icons/lu";
import "./WhyPartner.css";

const points = [
  "Increase delivery capacity without immediate hiring",
  "Reduce operating costs through efficient offshore support",
  "Protect confidential client information with secure workflows",
  "Improve turnaround times during peak workloads",
  "Work with dedicated professionals familiar with your processes",
  "Scale resources as your firm grows",
];

function WhyPartner() {
  return (
    <section className="partner-section">
      <div className="partner-container">
        <span className="partner-label">THE VALUE</span>
        <h2>Why Firms Partner With Upsilon</h2>

        <div className="partner-grid">
          {points.map((point, index) => (
            <motion.div
              className="partner-card"
              key={point}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <span className="partner-check">
                <LuCheck />
              </span>
              <p>{point}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyPartner;
