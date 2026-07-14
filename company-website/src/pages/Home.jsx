import Hero from "../components/Hero";
import WhyUpsilon from "../components/WhyUpsilon";
import SecuritySection from "../components/SecuritySection";
import ServicesSection from "../components/ServicesSection";
import SoftwareSection from "../components/SoftwareSection";
import FAQSection from "../components/FAQSection";
import usePageMeta from "../hooks/usePageMeta";

function Home() {
  usePageMeta({
    title: "Outsourced Accounting & Tax Support for CPA Firms",
    description:
      "Upsilon Services helps CPA firms expand capacity with trusted outsourced tax, accounting, bookkeeping, and audit support -- 35-55% cost savings, ISO 27001 & CMMI Level 3 secured.",
    path: "/",
  });

  return (
    <>
      <Hero />
      <WhyUpsilon />
      <SecuritySection />
      <ServicesSection />
      <SoftwareSection />
      <FAQSection />
    </>
  );
}

export default Home;
