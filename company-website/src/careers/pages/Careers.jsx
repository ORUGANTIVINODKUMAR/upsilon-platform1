import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  LuGraduationCap,
  LuUsers,
  LuTrendingUp,
  LuShieldCheck,
  LuMapPin,
  LuBriefcaseBusiness,
  LuClock,
  LuSearch,
} from "react-icons/lu";

import "./Careers.css";

const benefits = [
  {
    id: 1,
    icon: LuGraduationCap,
    title: "Growth & Learning",
    description:
      "Build hands-on expertise across accounting, tax and audit engagements for U.S. CPA firms.",
  },
  {
    id: 2,
    icon: LuUsers,
    title: "Collaborative Culture",
    description:
      "Work alongside experienced professionals in a supportive and team-oriented environment.",
  },
  {
    id: 3,
    icon: LuTrendingUp,
    title: "Real Career Growth",
    description:
      "Take on greater responsibility as you develop, with a clear path to advance within the company.",
  },
  {
    id: 4,
    icon: LuShieldCheck,
    title: "Security & Confidentiality",
    description:
      "Work within a structured, NDA-backed environment built around client trust and data security.",
  },
];

function Careers() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] =
    useState("");
  const [locationFilter, setLocationFilter] =
    useState("");
  const [employmentFilter, setEmploymentFilter] =
    useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const response = await fetch("/api/jobs");

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Unable to fetch job openings."
          );
        }

        setJobs(data.jobs || []);
      } catch (error) {
        console.error(
          "Fetch Careers jobs error:",
          error
        );

        setErrorMessage(
          error.message ||
            "Unable to load job openings."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const departments = useMemo(() => {
    return [
      ...new Set(
        jobs
          .map((job) => job.department)
          .filter(Boolean)
      ),
    ];
  }, [jobs]);

  const locations = useMemo(() => {
    return [
      ...new Set(
        jobs
          .map((job) => job.location)
          .filter(Boolean)
      ),
    ];
  }, [jobs]);

  const employmentTypes = useMemo(() => {
    return [
      ...new Set(
        jobs
          .map((job) => job.employmentType)
          .filter(Boolean)
      ),
    ];
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    const searchValue = searchTerm
      .trim()
      .toLowerCase();

    return jobs.filter((job) => {
      const searchableText = [
        job.jobTitle,
        job.department,
        job.location,
        job.shortDescription,
        job.employmentType,
        job.workMode,
        job.experience,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !searchValue ||
        searchableText.includes(searchValue);

      const matchesDepartment =
        !departmentFilter ||
        job.department === departmentFilter;

      const matchesLocation =
        !locationFilter ||
        job.location === locationFilter;

      const matchesEmployment =
        !employmentFilter ||
        job.employmentType === employmentFilter;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesLocation &&
        matchesEmployment
      );
    });
  }, [
    jobs,
    searchTerm,
    departmentFilter,
    locationFilter,
    employmentFilter,
  ]);

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "Recently posted";
    }

    return new Date(dateValue).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
      }
    );
  };

  const scrollToJobs = () => {
    const jobsSection =
      document.getElementById("open-positions");

    if (jobsSection) {
      jobsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setDepartmentFilter("");
    setLocationFilter("");
    setEmploymentFilter("");
  };

  return (
    <div className="career-module-page">
      <section className="career-module-hero">
        <div className="career-module-container career-module-hero-layout">
          <div className="career-module-hero-content">
            <p className="career-module-eyebrow">
              CAREERS AT UPSILON
            </p>

            <h1>Join Our Team</h1>

            <p className="career-module-hero-description">
              Every career at Upsilon is built on
              learning, innovation and collaboration.
              Discover meaningful opportunities and grow
              your career with our professional services
              organization.
            </p>

            <button
              type="button"
              className="career-module-primary-button"
              onClick={scrollToJobs}
            >
              View Job Listings
              <span aria-hidden="true">→</span>
            </button>
          </div>

          <div className="career-module-hero-image-wrapper">
            <img
              src="/carrersbg.png"
              alt="Careers at Upsilon"
              className="career-module-hero-image"
            />
          </div>
        </div>
      </section>

      <section className="career-module-benefits">
        <div className="career-module-container">
          <div className="career-module-section-heading">
            <p className="career-module-eyebrow">
              WHY JOIN US
            </p>

            <h2>Your Path to a Better Career</h2>

            <p>
              Upsilon combines real client work,
              experienced teammates and structured
              learning so your career continues moving
              forward.
            </p>
          </div>

          <div className="career-module-benefits-grid">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <article
                  key={benefit.id}
                  className="career-module-benefit-card"
                >
                  <div className="career-module-benefit-top">
                    <div className="career-module-benefit-icon">
                      <Icon
                        size={24}
                        aria-hidden="true"
                      />
                    </div>

                    <span>
                      {String(benefit.id).padStart(
                        2,
                        "0"
                      )}
                    </span>
                  </div>

                  <h3>{benefit.title}</h3>

                  <p>{benefit.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="open-positions"
        className="career-module-jobs-section"
      >
        <div className="career-module-container">
          <div className="career-module-jobs-heading">
            <div>
              <p className="career-module-eyebrow">
                OPEN POSITIONS
              </p>

              <h2>Find the Right Opportunity</h2>
            </div>

            <p className="career-module-job-count">
              {filteredJobs.length} job
              {filteredJobs.length === 1 ? "" : "s"}{" "}
              available
            </p>
          </div>

          <div className="career-module-filters">
            <div className="career-module-search">
              <LuSearch
                size={19}
                aria-hidden="true"
              />

              <input
                type="search"
                placeholder="Search jobs"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
                aria-label="Search jobs"
              />
            </div>

            <select
              value={departmentFilter}
              onChange={(event) =>
                setDepartmentFilter(
                  event.target.value
                )
              }
              aria-label="Filter by department"
            >
              <option value="">
                All Departments
              </option>

              {departments.map((department) => (
                <option
                  key={department}
                  value={department}
                >
                  {department}
                </option>
              ))}
            </select>

            <select
              value={locationFilter}
              onChange={(event) =>
                setLocationFilter(event.target.value)
              }
              aria-label="Filter by location"
            >
              <option value="">
                All Locations
              </option>

              {locations.map((location) => (
                <option
                  key={location}
                  value={location}
                >
                  {location}
                </option>
              ))}
            </select>

            <select
              value={employmentFilter}
              onChange={(event) =>
                setEmploymentFilter(
                  event.target.value
                )
              }
              aria-label="Filter by employment type"
            >
              <option value="">
                All Employment Types
              </option>

              {employmentTypes.map(
                (employmentType) => (
                  <option
                    key={employmentType}
                    value={employmentType}
                  >
                    {employmentType}
                  </option>
                )
              )}
            </select>
          </div>

          {loading && (
            <div className="career-module-message">
              Loading job openings...
            </div>
          )}

          {!loading && errorMessage && (
            <div className="career-module-message career-module-error">
              <h3>Unable to load job openings</h3>
              <p>{errorMessage}</p>
            </div>
          )}

          {!loading &&
            !errorMessage &&
            filteredJobs.length === 0 && (
              <div className="career-module-message">
                <h3>No open positions found</h3>

                <p>
                  Try changing your search or filters,
                  or check again later.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>
              </div>
            )}

          {!loading &&
            !errorMessage &&
            filteredJobs.length > 0 && (
              <div className="career-module-jobs-grid">
                {filteredJobs.map((job) => (
                  <article
                    key={job._id}
                    className="career-module-job-card"
                  >
                    <div className="career-module-job-card-top">
                      <p>{job.department}</p>

                      <span>{job.jobStatus}</span>
                    </div>

                    <h3>{job.jobTitle}</h3>

                    <div className="career-module-job-meta">
                      <span>
                        <LuMapPin
                          size={17}
                          aria-hidden="true"
                        />
                        {job.location}
                      </span>

                      <span>
                        <LuBriefcaseBusiness
                          size={17}
                          aria-hidden="true"
                        />
                        {job.employmentType}
                      </span>

                      <span>
                        <LuClock
                          size={17}
                          aria-hidden="true"
                        />
                        {job.experience}
                      </span>
                    </div>

                    <p className="career-module-job-description">
                      {job.shortDescription}
                    </p>

                    <div className="career-module-job-footer">
                      <small>
                        Posted{" "}
                        {formatDate(
                          job.postedDate ||
                            job.createdAt
                        )}
                      </small>

                      <div className="career-module-job-actions">
                        <button
                          type="button"
                          className="career-module-secondary-button"
                          onClick={() =>
                            navigate(
                              `/careers/job/${job._id}`
                            )
                          }
                        >
                          View Details
                        </button>

                        <button
                          type="button"
                          className="career-module-card-primary"
                          onClick={() =>
                            navigate(
                              `/careers/job/${job._id}/apply`
                            )
                          }
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
        </div>
      </section>

      
    </div>
  );
}

export default Careers;