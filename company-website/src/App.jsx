import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import StickyContactButton from "./components/StickyContactButton";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";

import Resources from "./pages/Resources";
import ArticlePage from "./pages/ArticlePage";
import FAQ from "./pages/FAQ";

import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import CareersAbout from "./pages/CareersAbout";

import CareersTheUpsilonWay from "./pages/CareersTheUpsilonWay";
import CareersFakeJobAlert from "./pages/CareersFakeJobAlert";
import CareersAdminLogin from "./pages/CareersAdminLogin";

import CareersAdminDashboard from "./pages/CareersAdminDashboard";
import CareersAdminRoute from "./components/CareersAdminRoute";
import PrivacyPolicy from "./pages/PrivacyPolicy";

import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import Tax from "./pages/service-details/Tax";

import Accounting from "./pages/service-details/Accounting";
import Auditing from "./pages/service-details/Auditing";
import AdminSupport from "./pages/service-details/AdminSupport";

function App() {
  const location = useLocation();

  // Initialize scroll animations when the application loads.
  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
    });
  }, []);

  // Refresh animations after every route change.
  useEffect(() => {
    const refreshTimer = setTimeout(() => {
      AOS.refresh();
    }, 300);

    return () => {
      clearTimeout(refreshTimer);
    };
  }, [location.pathname]);

  // Scroll to the top when the visitor opens another page, or to the
  // matching section when the URL includes a #hash (e.g. /careers#open-roles).
  useEffect(() => {
    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1));

      if (target) {
        target.scrollIntoView({ block: "start" });
        return;
      }
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [location.pathname, location.hash]);

  return (
    <>
      <Header />

      <main>
        <Routes>
          {/* Main pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />

          {/* Service detail pages */}
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

          {/* Resources and articles */}
          <Route path="/resources" element={<Resources />} />
          <Route path="/blog/:slug" element={<ArticlePage />} />

          {/* Additional pages */}
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/about" element={<CareersAbout />} />
          <Route
            path="/careers/the-upsilon-way"
            element={<CareersTheUpsilonWay />}
          />
          <Route
            path="/careers/fake-job-alert"
            element={<CareersFakeJobAlert />}
          />

          {/* Careers admin */}
          <Route
            path="/careers-admin/login"
            element={<CareersAdminLogin />}
          />
          <Route
            path="/careers-admin"
            element={
              <CareersAdminRoute>
                <CareersAdminDashboard />
              </CareersAdminRoute>
            }
          />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<Terms />} />

          {/* 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <StickyContactButton />
    </>
  );
}

export default App;