import { LuAppWindow } from "react-icons/lu";
import "./SoftwareSection.css";

// ============================================================
// SOFTWARE COMPATIBILITY SECTION
// Infinite horizontal marquee of supported software/platforms.
//
// Real logo files only exist for Drake, QuickBooks, and Xero (see
// /public) -- these are already licensed assets you had on hand.
// The rest use a neutral placeholder icon + name until you add the
// official logo file. To upgrade any entry once you have the real
// artwork: add the file to /public and set `logo: "/yourfile.svg"`.
// Most vendors publish official brand/press-kit pages with usable
// SVG/PNG logos (e.g. Intuit's brand portal for QuickBooks, Xero's
// brand assets page, etc.) -- check each vendor's site directly.
// ============================================================

const softwareList = [
  { name: "Drake", logo: "/drake.jpg" },
  { name: "ProSeries", logo: "/proseries.png" },
  { name: "ProConnect",logo: "/proconnect.png" },
  { name: "QuickBooks", logo: "/quickbooks.png" },
  { name: "CCH Axcess", logo: "/cch.png" },
  { name: "UltraTax CS", logo: "/ultratax.jpeg" },
  { name: "Lacerte", logo: "/lacerte.png" },
  { name: "Xero", logo: "/xero.png" },
  { name: "Wave", logo: "/wave.png" },
  { name: "SurePrep", logo: "/sureprep.png" },

  { name: "Bloomberg Tax", logo: "/bloomberg.jpg" },
  { name: "GoSystem", logo: "/gosystem.png" },
  { name: "Canopy", logo: "/canopy.png" },
  { name: "Thomson Reuters", logo: "/thomson.png" },

];

// Duplicate the list so the track has two identical halves.
// This is what makes the loop seamless: the track animates from
// translateX(0) to translateX(-50%), and since the second half is
// an exact copy of the first, the reset is invisible to the eye.
const marqueeItems = [...softwareList, ...softwareList];

function SoftwareSection() {
  return (
    <section className="software-section">
      <div className="software-container">
        <h2 data-aos="fade-up">
          Software <span>We're Compatible With</span>
        </h2>

        <p className="software-subtitle" data-aos="fade-up">
          We work directly inside the tax, accounting, and payroll platforms
          your firm already relies on - no extra setup, no workflow changes.
        </p>

        <div className="software-marquee" data-aos="fade-up">
          <div className="software-fade software-fade-left"></div>
          <div className="software-fade software-fade-right"></div>

          <div className="software-marquee-track">
            {marqueeItems.map((item, index) => (
              <div className="software-card" key={`${item.name}-${index}`}>
                <div className="software-card-logo">
                  {item.logo ? (
                    <img src={item.logo} alt={item.name} loading="lazy" decoding="async" />
                  ) : (
                    <LuAppWindow className="software-card-placeholder" />
                  )}
                </div>
                <span className="software-card-name">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SoftwareSection;
