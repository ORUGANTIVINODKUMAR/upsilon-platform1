import { useState } from "react";
import { Link } from "react-router-dom";
import { LuPlus } from "react-icons/lu";
import { faqs } from "../data/faqs";
import "./FAQSection.css";

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(-1);

  const homeFaqs = faqs.slice(0, 2);

  return (
    <section className="faq-section">
      <div className="faq-container">
        <div className="faq-heading">
          <span>FAQ</span>
          <h2>
            Questions CPA firms ask <em>every day.</em>
          </h2>
        </div>

        <div className="faq-list">
          {homeFaqs.map((faq, index) => (
            <div
              key={faq.question}
              className={`faq-item ${openIndex === index ? "active" : ""}`}
            >
              <button
                type="button"
                className="faq-question"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span>{faq.question}</span>
                <LuPlus className="faq-icon" />
              </button>

              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="faq-more-wrap">
          <Link to="/faq" className="faq-more-btn">
            View More FAQs
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
