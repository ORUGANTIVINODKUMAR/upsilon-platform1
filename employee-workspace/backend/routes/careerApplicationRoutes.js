import express from "express";

import {
  createCareerApplication,
  getAllCareerApplications,
  getCareerApplicationById,
  updateCareerApplicationStatus,
} from "../controllers/careerApplicationController.js";

import {
  protectCareersAdmin,
} from "../middleware/careersAuthMiddleware.js";

import careerResumeUpload from "../middleware/careerResumeUpload.js";

const router = express.Router();

// Public: candidate submits an application
router.post(
  "/",
  careerResumeUpload.single("resume"),
  createCareerApplication
);

// Admin: get all applications
router.get(
  "/",
  protectCareersAdmin,
  getAllCareerApplications
);

// Admin: get one application
router.get(
  "/:id",
  protectCareersAdmin,
  getCareerApplicationById
);

// Admin: update application status
router.put(
  "/:id/status",
  protectCareersAdmin,
  updateCareerApplicationStatus
);

export default router;