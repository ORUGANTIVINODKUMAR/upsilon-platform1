import AboutHero from "../components/AboutHero";
import OurStory from "../components/OurStory";
import MissionVision from "../components/MissionVision";
import WhyDifferent from "../components/WhyDifferent";
import OurApproach from "../components/OurApproach";
import WhyPartner from "../components/WhyPartner";
import IndustriesSection from "../components/IndustriesSection";
import AboutLeadership from "../components/AboutLeadership";
import AboutStats from "../components/AboutStats";
import usePageMeta from "../hooks/usePageMeta";
import CountUpNumber from "../components/CountUpNumber";
function About() {
  usePageMeta({
    title: "About Us",
    description:
      "Upsilon Services builds long-term partnerships with US CPA firms through secure, reliable, and scalable offshore accounting support.",
    path: "/about",
  });

  return (
    <>
      <AboutHero />
      <OurStory />
      <MissionVision />
      <WhyDifferent />
      <OurApproach />
      <WhyPartner />
      <IndustriesSection />
      <AboutLeadership />
      <AboutStats />
    </>
  );
}

export default About;
