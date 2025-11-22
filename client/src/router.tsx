import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home/Home";
import NotFound from "@/pages/NotFound/NotFound";
import RootWrapper from "@/layout/RootWrapper";
import MainLayout from "@/layout/Mainlayout";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import LoginForm from "@/pages/Login/Login";
import SignUpForm from "@/pages/SignUp/SignUp";
import CandidateSignUpForm from "@/pages/SignUp/CandidateSignUp";
import OrganizationSignUpForm from "@/pages/SignUp/OrganizationSignUp";
import VerificationEmailSent from "@/pages/EmailVerification/VerificationEmailSent";
import VerificationStatus from "@/pages/EmailVerification/VerificationStatus";
import ForgotPassword from "@/pages/ForgotPassword/ForgotPassword";
import PasswordResetForm from "@/pages/ForgotPassword/PasswordResetForm";
import InterviewResourcesPage from "@/pages/InterviewResources/InterviewResourcesPage";
import InterviewQuestions from "@/pages/InterviewQuestions/InterviewQuestions";
import OrganizationDashboard from "@/pages/OrganizationDashboard/OrganizationDashboard";
import OrganizationProtectedRoute from "@/components/ProtectedRoute/OrganizationProtectedRoute";

const mainLayoutRoutes = [
  {
    path: "/",
    index: true,
    element: <Home />,
  },
  {
    path: "/interview-resources",
    element: <InterviewResourcesPage />,
  },
  {
    path: "/interview-questions",
    element: <InterviewQuestions />,
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootWrapper />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute />,
      },
      {
        path: "/",
        element: <MainLayout />,
        children: mainLayoutRoutes,
      },
      {
        path: "/Login",
        element: <LoginForm />,
      },
      {
        path: "/SignUp",
        element: <SignUpForm />,
      },
      {
        path: "/candidate/signup",
        element: <CandidateSignUpForm />,
      },
      {
        path: "/organization/signup",
        element: <OrganizationSignUpForm />,
      },
      {
        path: "/organization/dashboard",
        element: (
          <OrganizationProtectedRoute>
            <OrganizationDashboard />
          </OrganizationProtectedRoute>
        ),
      },
      {
        path: "/verifymail",
        element: <VerificationEmailSent />,
      },
      {
        path: "/verifymail/:verificationToken",
        element: <VerificationStatus />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password/:resetToken",
        element: <PasswordResetForm />,
      },

      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
