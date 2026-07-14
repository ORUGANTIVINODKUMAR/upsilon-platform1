// Reusable banner used at the top of inner pages
import "./PageHeader.css";

function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <section className="page-header">
      <div className="page-header-container">
        {eyebrow && <span className="page-header-eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </section>
  );
}

export default PageHeader;