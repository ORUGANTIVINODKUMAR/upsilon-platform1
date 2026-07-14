// ============================================================
// Shared JSON-LD structured data builders.
// SITE_URL must match the deployed domain.
// ============================================================
const SITE_URL = "https://upsilon-iz78.onrender.com";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Upsilon Services",
  url: SITE_URL,
  logo: `${SITE_URL}/upsilonlogo.png`,
  description:
    "Outsourced accounting, tax, bookkeeping, and audit support for CPA firms across the United States.",
  sameAs: [
    "https://www.linkedin.com/company/upsilon-services/?viewAsMember=true",
  ],
};

export function buildServiceSchema({ name, description, url }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name,
    description,
    url: `${SITE_URL}${url}`,
    provider: {
      "@type": "Organization",
      name: "Upsilon Services",
      url: SITE_URL,
    },
    areaServed: "US",
  };
}

export function buildFaqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
