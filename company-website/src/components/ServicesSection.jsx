// ============================================================
// SERVICES FOR ACCOUNTING & CPA FIRMS -- auto sliding tab section
// ============================================================

import { useEffect, useRef, useState } from "react";
import {
  LuCalculator,
  LuBookOpenCheck,
  LuClipboardList,
  LuFolderOpen,
  LuCheck,
} from "react-icons/lu";
import "./ServicesSection.css";

const services = [
  {
    title: "Tax Compliance",
    icon: <LuCalculator />,
    image: "/taxcompliance.png",
    description:
      "Reduce tax season pressure with experienced professionals supporting individual, business, partnership, and fiduciary returns.",
    bullets: [
      "1040, 1120, 1120S, 1065",
      "990 and 1041 support",
      "Extensions, estimates and amended returns",
      "Tax notice resolution and correspondence",
      "Research and technical support",
    ],
  },
  {
    title: "Accounting & Bookkeeping",
    icon: <LuBookOpenCheck />,
    image: "/accounting&bookkeeping.png",
    description:
      "Keep your clients' financial records accurate and up to date while your internal team focuses on advisory and client relationships.",
    bullets: [
      "Monthly bookkeeping",
      "Bank and credit card reconciliations",
      "AP, AR and GL maintenance",
      "Financial statement preparation",
    ],
  },
  {
    title: "Audit & Assurance",
    icon: <LuClipboardList />,
    image: "/audit&assurance.png",
    description:
      "Complete audit support services for CPA firms, from fieldwork documentation through final sign-off.",
    bullets: [
      "Trial balance tie-outs",
      "PBC list coordination",
      "Lead schedule preparation",
      "Internal control documentation",
    ],
  },
  {
    title: "Admin Support",
    icon: <LuFolderOpen />,
    image: "/adminsupport.png",
    description:
      "Administrative support that reduces non-billable work so your team can focus on client-facing engagements.",
    bullets: [
      "Engagement letters",
      "Billing and invoicing",
      "Client communication",
      "Workpaper compilation",
    ],
  },
];

function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);

  const activeService = services[activeIndex];

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startAutoSlide = () => {
    stopAutoSlide();

    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === services.length - 1 ? 0 : prevIndex + 1
      );
    }, 1800);
  };

  useEffect(() => {
    startAutoSlide();

    return () => stopAutoSlide();
  }, []);

  const handleTabClick = (index) => {
    setActiveIndex(index);
    startAutoSlide();
  };

  return (
    <section
      className="services-section"
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      <div className="services-container">


        <h2 data-aos="fade-up">Accounting & Tax Solutions Built Around Your Firm</h2>

        <p className="services-subtitle" data-aos="fade-up">
          Whether you need support during tax season or year-round assistance, Upsilon provides dedicated professionals who integrate
          with your team, software, and workflows. Our flexible delivery
          model helps CPA firms increase capacity, improve turnaround times,
          and maintain high-quality standards while reducing operating
          costs.
        </p>

        <div className="service-tabs" data-aos="fade-up">
          {services.map((service, index) => (
            <button
              key={service.title}
              type="button"
              onClick={() => handleTabClick(index)}
              className={activeIndex === index ? "active" : ""}
            >
              {service.title}
            </button>
          ))}
        </div>

        <div className="services-content" key={activeIndex}>
          <div className="services-left">
            <div className="service-icon">{activeService.icon}</div>

            <h3>{activeService.title}</h3>

            <p>{activeService.description}</p>

            <ul>
              {activeService.bullets.map((item) => (
                <li key={item}>
                  <LuCheck className="check-icon" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <a href="/services" className="know-btn">
              Know More
            </a>
          </div>

          <div className="services-right">
            <div className="service-image-card">
              <div className="service-image-stage">
                <img
                  src={activeService.image}
                  alt={activeService.title}
                  className="service-image"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;