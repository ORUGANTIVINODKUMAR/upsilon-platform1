import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import StickyContactButton from "./components/StickyContactButton";
import FAQ from "./pages/FAQ";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";

import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import useStructuredData from "./hooks/useStructuredData";
import { organizationSchema } from "./data/schema";

import Tax from "./pages/service-details/Tax";
import Accounting from "./pages/service-details/Accounting";

import Auditing from "./pages/service-details/Auditing";
import AdminSupport from "./pages/service-details/AdminSupport";

function App() {
  const location = useLocation();

  // Site-wide Organization schema, present on every page.
  useStructuredData(organizationSchema, "organization-schema");

  // Initialize AOS (scroll-reveal animations) once, on mount.
  // Duration kept in the 300-500ms range requested; easing kept subtle.
  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
    });
  }, []);

  // Re-check element positions on every route change so scroll-reveal
  // still fires correctly when navigating between pages in the SPA.
  useEffect(() => {
    setTimeout(() => {
      AOS.refresh();
    }, 300);
  }, [location.pathname]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [location.pathname]);
  return (
    <>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/tax" element={<Tax />} />
          <Route
            path="/services/accounting-bookkeeping"
            element={<Accounting />}
          />

          <Route
            path="/services/auditing-assurance"
            element={<Auditing />}
          />
          <Route
            path="/services/admin-support"
            element={<AdminSupport />}
          />
          <Route path="/faq" element={<FAQ />} />

          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<Terms />} />
        </Routes>
      </main>

      <Footer />
      <StickyContactButton />
    </>
  );
}

export default App;
