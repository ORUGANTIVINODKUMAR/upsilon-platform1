// ============================================================
// INDUSTRIES WE SUPPORT -- six premium icon cards
// ============================================================
import { motion } from "framer-motion";
import {
  LuLandmark,
  LuBuilding,
  LuCalculator,
  LuReceipt,
  LuScrollText,
  LuBriefcase,
} from "react-icons/lu";
import "./IndustriesSection.css";

const industries = [
  { icon: <LuLandmark />, label: "CPA Firms" },
  { icon: <LuBuilding />, label: "Public Accounting Firms" },
  { icon: <LuCalculator />, label: "Accounting Practices" },
  { icon: <LuReceipt />, label: "Tax Professionals" },
  { icon: <LuScrollText />, label: "Enrolled Agent Firms" },
  { icon: <LuBriefcase />, label: "Advisory & Client Accounting Service (CAS) Practices" },
];

function IndustriesSection() {
  return (
    <section className="industries-section">
      <div className="industries-container">
        <span className="industries-label">WHO WE SERVE</span>
        <h2>We Primarily Partner With</h2>

        <div className="industries-grid">
          {industries.map((item, index) => (
            <motion.div
              className="industries-card"
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
            >
              <div className="industries-icon">{item.icon}</div>
              <span>{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default IndustriesSection;
