import { useState } from "react";
import { FaFilePdf, FaFilePowerpoint, FaDownload } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import DownloadModal from "../components/DownloadModal";
import usePageMeta from "../hooks/usePageMeta";
import "./Resources.css";

const resources = [
  {
    key: "offshoring-guide",
    title: "Choose If Offshoring Fits Your Firm",
    description:
      "A practical decision guide to help CPA firm owners evaluate whether offshore accounting support is the right next capacity move.",
    file: "/resources/choose-if-offshoring-fits-your-firm.pdf",
    type: "pdf",
  },
  {
    key: "pilot-playbook",
    title: "Offshore Accounting Pilot Playbook",
    description:
      "A step-by-step framework for running a low-risk offshore accounting pilot before expanding firm-wide.",
    file: "/resources/offshore-accounting-pilot-playbook.pdf",
    type: "pdf",
  },
];

function Resources() {
  usePageMeta({
    title: "Resources",
    description:
      "Download Upsilon resources for CPA firms, including our offshoring fit guide and offshore accounting pilot playbook.",
    path: "/resources",
  });

  const [activeResource, setActiveResource] = useState(null);

  return (
    <>
      <PageHeader
        eyebrow="RESOURCES"
        title="Guides & Insights for Accounting Firms"
        subtitle="Practical resources for CPA firm owners and managers exploring offshore accounting support."
      />

      <section className="resources-section">
        <div className="resources-container">
          <div className="resources-grid">
            {resources.map((resource) => (
              <div className="pdf-card" key={resource.key}>
                <div className="pdf-card-icon">
                  {resource.type === "ppt" ? (
                    <FaFilePowerpoint />
                  ) : (
                    <FaFilePdf />
                  )}
                </div>

                <h3>{resource.title}</h3>
                <p>{resource.description}</p>

                <button
                  type="button"
                  className="pdf-download-btn"
                  onClick={() => setActiveResource(resource)}
                >
                  <FaDownload /> Get Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {activeResource && (
        <DownloadModal
          resource={activeResource}
          onClose={() => setActiveResource(null)}
        />
      )}
    </>
  );
}

export default Resources;