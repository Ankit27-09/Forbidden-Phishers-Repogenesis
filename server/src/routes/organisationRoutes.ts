import { Router } from "express";
import passport from "passport";
import { requireOrganisation } from "../middleware/roleMiddleware";
import { getUserProfile, updateUserProfile } from "../auth/authController";

const organisationRouter = Router();

// Apply authentication middleware to all organisation routes
organisationRouter.use(passport.authenticate('jwt', { session: false }));

// Apply organisation role middleware to all routes
organisationRouter.use(requireOrganisation);

// Organisation-specific routes
organisationRouter.get("/profile", getUserProfile);
organisationRouter.put("/profile", updateUserProfile);

// Job posting related routes (organisations only)
organisationRouter.get("/jobs", (req, res) => {
  // TODO: Implement get organisation jobs
  res.json({ message: "Get organisation jobs", success: true });
});

organisationRouter.post("/jobs", (req, res) => {
  // TODO: Implement create job posting
  res.json({ message: "Create job posting", success: true });
});

organisationRouter.get("/jobs/:id", (req, res) => {
  // TODO: Implement get specific job
  res.json({ message: `Get job ${req.params.id}`, success: true });
});

organisationRouter.put("/jobs/:id", (req, res) => {
  // TODO: Implement update job posting
  res.json({ message: `Update job ${req.params.id}`, success: true });
});

organisationRouter.delete("/jobs/:id", (req, res) => {
  // TODO: Implement delete job posting
  res.json({ message: `Delete job ${req.params.id}`, success: true });
});

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