import { Router } from "express";
import { 
  employerSignup, 
  employerSignin, 
  employerVerifyEmail, 
  employerGenerateResetToken, 
  employerResetPassword, 
  employerVerifyResetToken,
  employerRefreshToken 
} from "./employerAuthController";

const employerAuthRouter = Router();

employerAuthRouter.post("/signup", employerSignup);
employerAuthRouter.post("/signin", employerSignin);
employerAuthRouter.get("/verify-email/:token", employerVerifyEmail);
employerAuthRouter.post("/reset-password", employerGenerateResetToken);
employerAuthRouter.post("/reset-password/:token", employerResetPassword);
employerAuthRouter.get("/verify-token/:token", employerVerifyResetToken);
employerAuthRouter.post("/refresh", employerRefreshToken);

export default employerAuthRouter;
