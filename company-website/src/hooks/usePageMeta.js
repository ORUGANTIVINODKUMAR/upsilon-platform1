import { useEffect } from "react";

const SITE_NAME = "Upsilon";

const DEFAULT_OG_IMAGE = "/upsilonlogo.png";
const SITE_URL = "https://upsilon-iz78.onrender.com";

function setMetaTag(attr, key, content) {
  if (!content) return;

  let el = document.head.querySelector(`meta[${attr}="${key}"]`);

  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }

  el.setAttribute("content", content);
}

export default function usePageMeta({
  title,
  description,
  path,
  image,
}) {
  useEffect(() => {
    // Always show only "Upsilon"
    const fullTitle = SITE_NAME;

    document.title = fullTitle;

    setMetaTag("name", "description", description);
    setMetaTag("property", "og:title", fullTitle);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:type", "website");
    setMetaTag("property", "og:site_name", SITE_NAME);
    setMetaTag("property", "og:image", image || DEFAULT_OG_IMAGE);
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", fullTitle);
    setMetaTag("name", "twitter:description", description);

    if (path) {
      const url = `${SITE_URL}${path}`;
      setMetaTag("property", "og:url", url);

      let canonical = document.head.querySelector('link[rel="canonical"]');

      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }

      canonical.setAttribute("href", url);
    }
  }, [title, description, path, image]);
}