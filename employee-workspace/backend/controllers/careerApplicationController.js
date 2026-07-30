import fs from "fs";
import CareerApplication from "../models/CareerApplication.js";
import CareerJob from "../models/CareerJob.js";

const removeUploadedFile = (filePath) => {
  if (!filePath) {
    return;
  }

  fs.unlink(filePath, (error) => {
    if (error && error.code !== "ENOENT") {
      console.error("Resume cleanup error:", error);
    }
  });
};

// Public: submit a job application
export const createCareerApplication = async (req, res) => {
  try {
    const {
      jobId,
      fullName,
      email,
      phone,
      currentLocation,
      totalExperience,
      relevantExperience,
      currentCompany,
      currentSalary,
      expectedSalary,
      noticePeriod,
      linkedinUrl,
      portfolioUrl,
      coverLetter,
      additionalNotes,
    } = req.body;

    if (
      !jobId ||
      !fullName ||
      !email ||
      !phone ||
      !currentLocation ||
      !totalExperience ||
      !noticePeriod
    ) {
      removeUploadedFile(req.file?.path);

      return res.status(400).json({
        success: false,
        message: "Please complete all required fields.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume is required.",
      });
    }

    const job = await CareerJob.findById(jobId);

    if (!job) {
      removeUploadedFile(req.file.path);

      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    if (job.jobStatus !== "Active") {
      removeUploadedFile(req.file.path);

      return res.status(400).json({
        success: false,
        message: "This job is no longer accepting applications.",
      });
    }

    const currentDate = new Date();
    const deadline = new Date(job.applicationDeadline);

    if (deadline < currentDate) {
      removeUploadedFile(req.file.path);

      return res.status(400).json({
        success: false,
        message: "The application deadline has passed.",
      });
    }

    const application = await CareerApplication.create({
      jobId,
      fullName,
      email,
      phone,
      currentLocation,
      totalExperience,
      relevantExperience: relevantExperience || "",
      currentCompany: currentCompany || "",
      currentSalary: currentSalary || "",
      expectedSalary: expectedSalary || "",
      noticePeriod,
      linkedinUrl: linkedinUrl || "",
      portfolioUrl: portfolioUrl || "",
      coverLetter: coverLetter || "",
      additionalNotes: additionalNotes || "",
      resumeFileName: req.file.originalname,
      resumePath: req.file.filename,
    });

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully.",
      application,
    });
  } catch (error) {
    console.error("Create Career application error:", error);

    removeUploadedFile(req.file?.path);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(
        (validationError) => validationError.message
      );

      return res.status(400).json({
        success: false,
        message: messages.join(" "),
      });
    }

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to submit the application.",
    });
  }
};

// Admin: get all applications
export const getAllCareerApplications = async (req, res) => {
  try {
    const applications = await CareerApplication.find()
      .populate(
        "jobId",
        "jobTitle department location employmentType experience workMode"
      )
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error("Get Career applications error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch applications.",
    });
  }
};

// Admin: get one application
export const getCareerApplicationById = async (req, res) => {
  try {
    const application = await CareerApplication.findById(
      req.params.id
    ).populate(
      "jobId",
      "jobTitle department location employmentType experience workMode salaryRange"
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found.",
      });
    }

    return res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    console.error("Get Career application error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to fetch the application.",
    });
  }
};

// Admin: update application status
export const updateCareerApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "New",
      "Shortlisted",
      "Interview Scheduled",
      "Selected",
      "Rejected",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application status.",
      });
    }

    const application = await CareerApplication.findByIdAndUpdate(
      req.params.id,
      {
        status,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Application status updated successfully.",
      application,
    });
  } catch (error) {
    console.error("Update Career application status error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to update the application status.",
    });
  }
};