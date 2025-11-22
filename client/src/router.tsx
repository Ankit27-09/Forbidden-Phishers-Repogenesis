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
import CoursesPage from "@/pages/Courses/CoursesPage";
import CourseDetailPage from "@/pages/Courses/CourseDetailPage";
import CreateCoursePage from "@/pages/Courses/CreateCoursePage";
import CourseTestPage from "@/pages/Courses/CourseTestPage";
import TestResultsPage from "@/pages/Courses/TestResultsPage";
import CertificateVerificationPage from "@/pages/Courses/CertificateVerificationPage";
import IndustryInsightsComponent from "./pages/IndustryInsights/IndustryInsights";
import PodcastPage from "@/pages/Podcast/PodcastPage";
import PodcastPlayerPage from "@/pages/Podcast/PodcastPlayerPage";
import InterviewHelp from "./pages/InterviewHelp/InterviewHelp";
import YourInterviews from "./pages/YourInterviews/YourInterviews";
import Results from "./pages/Results/Results";
import Interview from "./pages/AI_Interview/Interview";

const mainLayoutRoutes = [
  {
    path: "/",
    index: true,
    element: <Home />,
  },
  {
    path: "/industry-insights",
    element: <IndustryInsightsComponent />,
  },
  {
    path: "/interview-resources",
    element: <InterviewResourcesPage />,
  },
  {
    path: "/interview-questions",
    element: <InterviewQuestions />,
  },
  {
    path: "/courses",
    element: <CoursesPage />,
  },
  {
    path: "/courses/create",
    element: <CreateCoursePage />,
  },
  {
    path: "/courses/:id",
    element: <CourseDetailPage />,
  },
  {
    path: "/courses/:id/test/:testId",
    element: <CourseTestPage />,
  },
  {
    path: "/courses/:id/test/:testId/results",
    element: <TestResultsPage />,
  },
  {
    path: "/verify-certificate",
    element: <CertificateVerificationPage />,
  },
   {
    path: "/podcasts",
    element: <PodcastPage />,
  },
  {
    path: "/podcasts/:id",
    element: <PodcastPlayerPage />,
  },
  {
    path: "/industry-insights",
    element: <IndustryInsightsComponent />,
  },
  {
    path: "/interview-questions",
    element: <InterviewQuestions />,
  },
  {
    path: "/interview",
    element: <InterviewHelp />,
  },
  {
    path: "/your-interviews",
    element: <YourInterviews />,
  },
  {
    path: "/interview/results/:interviewId",
    element: <Results />,
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
      },{
        path: "/interview/:interviewId",
        element: <Interview />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
