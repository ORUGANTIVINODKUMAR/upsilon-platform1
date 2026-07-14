// ============================================================
// WHAT MAKES UPSILON DIFFERENT -- six premium value cards
// ============================================================
import { motion } from "framer-motion";
import {
  LuBuilding2,
  LuUserCheck,
  LuShieldCheck,
  LuLayers,
  LuBadgeCheck,
  LuPlug,
} from "react-icons/lu";
import "./WhyDifferent.css";

const cards = [
  {
    icon: <LuBuilding2 />,
    title: "Built for CPA Firms",
    text: "Our services are designed specifically for the workflows, expectations, and standards of US CPA and accounting firms.",
  },
  {
    icon: <LuUserCheck />,
    title: "Dedicated Professionals",
    text: "Your team works with dedicated accounting professionals who become familiar with your firm's processes and expectations.",
  },
  {
    icon: <LuShieldCheck />,
    title: "Security First",
    text: "Confidentiality is central to every engagement through NDAs, controlled access, and secure operational practices.",
  },
  {
    icon: <LuLayers />,
    title: "Flexible Delivery",
    text: "Scale support during tax season or maintain year-round capacity based on your firm's changing needs.",
  },
  {
    icon: <LuBadgeCheck />,
    title: "Reviewer-Ready Quality",
    text: "Our structured workflows and quality review processes help deliver organized, consistent work that supports efficient partner review.",
  },
  {
    icon: <LuPlug />,
    title: "Technology Compatibility",
    text: "We work within your existing accounting and tax software, making onboarding smooth and minimizing disruption.",
  },
];

function WhyDifferent() {
  return (
    <section className="why-different-section">
      <div className="why-different-container">
       
        <h2>What Makes Upsilon Different</h2>
        <p className="why-different-subtitle">
          Purpose-built offshore accounting support designed exclusively for
          CPA firms.
        </p>

        <div className="why-different-grid">
          {cards.map((card, index) => (
            <motion.div
              className="why-different-card"
              key={card.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
            >
              <div className="why-different-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyDifferent;
