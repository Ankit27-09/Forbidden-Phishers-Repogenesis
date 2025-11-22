import { Router } from "express";
import { candidateSignup, organisationSignup, signin, verifyEmail, googleCallback, githubCallback, resetPassword, refreshToken, generateResetToken, verifyResetToken, getUserProfile, updateUserProfile } from "./authController";
import passport from "passport";


const authRouter = Router();

// Role-based signup routes
authRouter.post("/candidate/signup", candidateSignup);
authRouter.post("/organisation/signup", organisationSignup);

// Common auth routes
authRouter.post("/signin", signin);
authRouter.get("/verify-email/:token", verifyEmail);
authRouter.post("/reset-password", generateResetToken);
authRouter.post("/reset-password/:token", resetPassword);
authRouter.get("/verify-token/:token",verifyResetToken);

authRouter.post("/refresh", refreshToken);

// Protected routes
authRouter.get("/profile", passport.authenticate('jwt', { session: false }), getUserProfile);
authRouter.put("/profile", passport.authenticate('jwt', { session: false }), updateUserProfile);

// Social auth routes
authRouter.get("/google", passport.authenticate('google'));
authRouter.get("/google/callback", passport.authenticate('google', { session:false, failureRedirect: '/login'}), googleCallback);

authRouter.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

authRouter.get("/github", passport.authenticate('github'));
authRouter.get("/github/callback", passport.authenticate('github', { session:false, failureRedirect: '/login' }), githubCallback);

export default authRouter;