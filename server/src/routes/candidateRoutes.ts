import { Router } from "express";
import passport from "passport";
import { requireCandidate } from "../middleware/roleMiddleware";
import { getUserProfile, updateUserProfile } from "../auth/authController";

const candidateRouter = Router();

// Apply authentication middleware to all candidate routes
candidateRouter.use(passport.authenticate('jwt', { session: false }));

// Apply candidate role middleware to all routes
candidateRouter.use(requireCandidate);

// Candidate-specific routes
candidateRouter.get("/profile", getUserProfile);
candidateRouter.put("/profile", updateUserProfile);

// Interview related routes (candidates only)
candidateRouter.get("/interviews", (req, res) => {
  // TODO: Implement get candidate interviews
  res.json({ message: "Get candidate interviews", success: true });
});

candidateRouter.post("/interviews", (req, res) => {
  // TODO: Implement create interview
  res.json({ message: "Create interview", success: true });
});

candidateRouter.get("/interviews/:id", (req, res) => {
  // TODO: Implement get specific interview
  res.json({ message: `Get interview ${req.params.id}`, success: true });
});

// Resume related routes
candidateRouter.post("/resume/upload", (req, res) => {
  // TODO: Implement resume upload
  res.json({ message: "Upload resume", success: true });
});

candidateRouter.get("/resume", (req, res) => {
  // TODO: Implement get resume
  res.json({ message: "Get resume", success: true });
});

export default candidateRouter;