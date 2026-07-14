import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>

      <div className="hero-content" data-aos="fade-up">
        <div className="hero-label">
          "Your Partner for People, Process & Technology"
        </div>

        <h1>
          Expand Your Firm&rsquo;s <br />
          Capabilities with <br />
          Trusted Global Talent
        </h1>

        <p>
          Upsilon helps CPA firms expand capacity with dedicated offshore professionals who become an extension of your team. From bookkeeping and tax preparation to audit support and back-office operations, we deliver reviewer-ready work through secure workflows, signed NDAs, controlled access, and transparent communication.
 
        </p>

        <div className="hero-buttons">
          <Link to="/contact" className="hero-btn">
            Talk to Our Experts
          </Link>

          <Link to="/services" className="hero-btn-outline">
            Explore Services
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
