import { Router } from "express";
import passport from "passport";
import { requireOrganisation } from "../middleware/roleMiddleware";
import { getUserProfile, updateUserProfile } from "../auth/authController";
import {
  createJob,
  createInternship,
  getOrganizationJobs,
  getOrganizationInternships,
  getJobById,
  getInternshipById,
  updateJob,
  updateInternship,
  deleteJob,
  deleteInternship,
  getActiveJobsAndInternships
} from "../controllers/organizationController";

const organisationRouter = Router();

// Apply authentication middleware to all organisation routes
organisationRouter.use(passport.authenticate('jwt', { session: false }));

// Apply organisation role middleware to all routes
organisationRouter.use(requireOrganisation);

// Organisation-specific routes
organisationRouter.get("/profile", getUserProfile);
organisationRouter.put("/profile", updateUserProfile);

// Job posting routes
organisationRouter.get("/jobs", getOrganizationJobs);
organisationRouter.post("/jobs", createJob);
organisationRouter.get("/jobs/:id", getJobById);
organisationRouter.put("/jobs/:id", updateJob);
organisationRouter.delete("/jobs/:id", deleteJob);

// Internship posting routes
organisationRouter.get("/internships", getOrganizationInternships);
organisationRouter.post("/internships", createInternship);
organisationRouter.get("/internships/:id", getInternshipById);
organisationRouter.put("/internships/:id", updateInternship);
organisationRouter.delete("/internships/:id", deleteInternship);

// Combined active positions route (for ActiveJobs component)
organisationRouter.get("/active-positions", getActiveJobsAndInternships);

// Interview management routes
organisationRouter.get("/interviews", (req, res) => {
  // TODO: Implement get organisation interviews
  res.json({ message: "Get organisation interviews", success: true });
});

organisationRouter.get("/interviews/:id/results", (req, res) => {
  // TODO: Implement get interview results
  res.json({ message: `Get interview ${req.params.id} results`, success: true });
});

// Candidate management routes
organisationRouter.get("/candidates", (req, res) => {
  // TODO: Implement get candidates who applied
  res.json({ message: "Get candidates", success: true });
});

organisationRouter.get("/candidates/:id", (req, res) => {
  // TODO: Implement get specific candidate details
  res.json({ message: `Get candidate ${req.params.id}`, success: true });
});

export default organisationRouter;