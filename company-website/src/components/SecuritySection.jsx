// ============================================================
// SECURITY & COMPLIANCE SECTION
// Left: heading + four premium certification/security cards.
// Right: bold, short-paragraph copy.
// ============================================================
import { motion } from "framer-motion";
import { LuShieldCheck } from "react-icons/lu";
import "./SecuritySection.css";

const cards = [
  {
    type: "image",
    src: "/iso.png",
    label: "ISO 27001",
    subtitle: "Information Security Management",
  },
  {
    type: "image",
    src: "/cmmi.png",
    label: "CMMI Level 3",
    subtitle: "Process Quality Assurance",
  },
  {
    type: "image",
    src: "/nda.png",
    label: "NDA Agreement",
    subtitle: "Every engagement is backed by NDA",
  },
  {
    type: "icon",
    icon: <LuShieldCheck />,
    label: "Controlled Access",
    subtitle: "Role-based access with least-privilege principle",
  },
];

function SecuritySection() {
  return (
    <section className="security-section">
      <div className="security-container">
        <div className="security-left" data-aos="fade-right">
          <span className="security-tag">SECURITY & COMPLIANCE</span>

          <h1>
            Security isn't an Add-on it's at our core.
          </h1>

          <div className="cert-grid">
            {cards.map((card, index) => (
              <motion.div
                className="cert-card"
                key={card.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                {card.type === "image" ? (
                  <div className="cert-card-media">
                    <img src={card.src} alt={card.label} loading="lazy" decoding="async" />
                  </div>
                ) : (
                  <div className="cert-card-media cert-card-icon">
                    {card.icon}
                  </div>
                )}
                <div className="cert-card-text">
                  <span className="cert-card-title">{card.label}</span>
                  <span className="cert-card-subtitle">{card.subtitle}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="security-right" data-aos="fade-left">
          <p>
            At <strong>Upsilon</strong>, security is integral to
            everything we do.
          </p>

          <p>
            Protecting client information, maintaining confidentiality, and
            ensuring operational integrity are at the core of every
            engagement.
          </p>

          <p>
            Our security framework is supported by internationally
            recognized standards including <strong>ISO 27001</strong> and{" "}
            <strong>CMMI Level 3</strong>.
          </p>

          <p>
            Every engagement is backed by a signed <strong>NDA</strong> and
            strict <strong>confidentiality</strong> controls, reflecting our
            commitment to secure data handling and process excellence.
          </p>

          <p>
            Through secure infrastructure, controlled access, and encrypted
            workflows, we deliver dependable offshore accounting and tax
            support that CPA firms can trust.
          </p>
        </div>
      </div>
    </section>
  );
}

export default SecuritySection;
