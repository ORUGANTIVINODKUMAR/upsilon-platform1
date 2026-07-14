// ============================================================
// OUR STORY
// Two-column: copy left, professional office image right.
// ============================================================
import { motion } from "framer-motion";
import "./OurStory.css";

function OurStory() {
  return (
    <section className="story-section">
      <div className="story-container">
        <motion.div
          className="story-copy"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="story-label">OUR STORY</span>
          <h2>Built Around the Needs of CPA Firms</h2>

          <p>
            Upsilon was founded with a clear purpose: to help CPA firms
            overcome growing staffing challenges without compromising
            quality or client service.
          </p>
          <p>
            As accounting firms face increasing workloads, tighter
            deadlines, and ongoing hiring difficulties, we recognized the
            need for a delivery partner that understands the realities of
            public accounting not just outsourcing.
          </p>
          <p>
            Today, Upsilon partners with CPA firms across the United States,
            providing dedicated professionals who integrate seamlessly with
            each firm's existing workflows, software, and review standards.
          </p>
          <p>
            Our goal is not simply to complete tasks, but to become a
            dependable extension of your team that supports long-term
            growth.
          </p>
        </motion.div>

        <motion.div
          className="story-media"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          
          <img
            src="/ourstory.png"
            alt="Business meeting around a conference table"
            loading="lazy"
            decoding="async"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default OurStory;
