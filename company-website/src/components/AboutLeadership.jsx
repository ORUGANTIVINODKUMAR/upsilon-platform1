// ============================================================
// MEET OUR LEADERSHIP
//
// Reuses the real names/roles already in the site. Shows only
// photo, name, and title per profile.
// ============================================================
import { motion } from "framer-motion";
import "./AboutLeadership.css";

const leaders = [
  {
    photo: "/1.png",
    name: "Sai Teja Kukudala, EA",
    role: "Managing Partner & Operational Head",
  },
  {
    photo: "/2.jpg",
    name: "Koren S. Cranford, CPA",
    role: "Strategic Advisor",
  },
  {
    photo: "/3.png",
    name: "Michael Bradford, CPA",
    role: "Chief Growth Officer",
  },
  {
    photo: "/4.jpg",
    name: "Aditya Kalidindi",
    role: "Strategic Advisor & Board Member",
  },
];

function AboutLeadership() {
  return (
    <section className="leadership-section">
      <div className="leadership-container">
        <span className="leadership-label">OUR LEADERSHIP</span>
        <h2>Meet Our Leadership</h2>
        <p className="leadership-subtitle">
          Experienced professionals helping CPA firms scale through secure,
          reliable, and high-quality offshore accounting support.
        </p>

        <div className="leadership-grid">
          {leaders.map((leader, index) => (
            <motion.div
              className="leadership-card"
              key={leader.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <div className="leadership-photo">
                <img
                  src={leader.photo}
                  alt={leader.name}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h3>{leader.name}</h3>
              <span className="leadership-role">{leader.role}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutLeadership;
