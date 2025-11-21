import { useState } from "react";
import { Mail, Lock, Phone, Building2, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { employerSignupSchema, type employerSignupUser } from "@/validation/userSchema";
import { employerSignUp } from "@/api/authService";
import { AxiosError } from "axios";
import type { ErrorResponse } from "@/types/auth";

type employerSignupFields = employerSignupUser;

export default function EmployerSignup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<employerSignupFields>({ resolver: zodResolver(employerSignupSchema) });

  const onSubmit: SubmitHandler<employerSignupFields> = async (data) => {
    try {
      const response = await employerSignUp(data);

      if (response.data.success && !response.data.isVerified) {
        navigate(`/employer/verifymail?email=${data.email}`);
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError.response && axiosError.response.data) {
        const backendError = axiosError.response.data.message;
        console.error("Error:", backendError);
        setError("root", { message: backendError });
      }
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#F9F6EE] via-[#EFE7D4] to-[#E4D7B4]">
      {/* Header */}
      <header className="border-b-2 border-[#E4D7B4] bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex items-center space-x-2">
              <img src="/logo.png" alt="PrepX" className="w-25 h-25" />
              <span className="text-xl font-bold text-[#335441]">PrepX</span>
            </div>
          </Link>
          <div className="text-sm text-[#6B8F60]">
            Already have an account?{" "}
            <Link to="/employer-login" className="text-[#335441] font-semibold hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </header>

      {/* Hero & Form Split */}
      <div className="grid lg:grid-cols-2 gap-0 min-h-[calc(100vh-64px)]">
        {/* Hero Section */}
        <div className="hidden lg:flex flex-col justify-center px-12 py-12">
          <div className="max-w-lg">
            <div className="inline-block mb-6 px-4 py-2 bg-white/80 rounded-full border-2 border-[#A9B782]">
              <span className="text-sm font-semibold text-[#335441]">Recruiter Dashboard • AI Powered</span>
            </div>
            <h1 className="text-5xl font-bold text-[#335441] mb-6 leading-tight text-balance">
              Hire Smarter with AI-Driven Assessments
            </h1>
            <p className="text-lg text-[#3C6040] mb-8 leading-relaxed text-pretty">
              Evaluate candidates accurately with PrepX's AI-powered tools, skill benchmarks, automated tests, and smart
              screening.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                "Real-time candidate evaluation",
                "Automated technical assessments",
                "AI-powered insights & analytics",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-[#335441]">
                  <div className="w-2 h-2 rounded-full bg-[#46704A]"></div>
                  {item}
                </li>
              ))}
            </ul>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#335441] text-white rounded-lg font-semibold hover:shadow-lg transition-all hover:bg-[#46704A]">
              Watch Demo
              <span className="text-lg">→</span>
            </button>
          </div>
        </div>

        {/* Form Section */}
        <div className="flex items-center justify-center p-6 sm:p-8 lg:p-12">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-lg border-2 border-[#E4D7B4] p-8 sm:p-10">
              {/* Header */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-[#335441] mb-2 text-balance">Employer Sign Up</h2>
                <p className="text-[#6B8F60]">Create an account to start hiring top talent</p>
                {errors.root && (
                  <div className="flex items-center bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mt-4">
                    <AlertCircle className="w-5 h-5 mr-3" />
                    <span>{errors.root.message}</span>
                  </div>
                )}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#335441] block">Official Email ID</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 w-5 h-5 text-[#6B8F60]" />
                    <input
                      type="email"
                      {...register("email")}
                      placeholder="your@company.com"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-[#E4D7B4] bg-white text-[#335441] placeholder:text-[#A9B782] focus:outline-none focus:ring-2 focus:ring-[#46704A] focus:border-transparent transition-all"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                  )}
                </div>

                {/* Name Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#335441] block">First Name</label>
                    <input
                      type="text"
                      {...register("firstName")}
                      placeholder="John"
                      className="w-full px-4 py-3 rounded-lg border-2 border-[#E4D7B4] bg-white text-[#335441] placeholder:text-[#A9B782] focus:outline-none focus:ring-2 focus:ring-[#46704A] focus:border-transparent transition-all"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#335441] block">Last Name</label>
                    <input
                      type="text"
                      {...register("lastName")}
                      placeholder="Doe"
                      className="w-full px-4 py-3 rounded-lg border-2 border-[#E4D7B4] bg-white text-[#335441] placeholder:text-[#A9B782] focus:outline-none focus:ring-2 focus:ring-[#46704A] focus:border-transparent transition-all"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#335441] block">Mobile Number (Optional)</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 w-5 h-5 text-[#6B8F60]" />
                    <input
                      type="tel"
                      {...register("phone")}
                      placeholder="+1 (555) 123-4567"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-[#E4D7B4] bg-white text-[#335441] placeholder:text-[#A9B782] focus:outline-none focus:ring-2 focus:ring-[#46704A] focus:border-transparent transition-all"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-sm">{errors.phone.message}</p>
                  )}
                </div>

                {/* Organization */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#335441] block">Organization Name</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3.5 w-5 h-5 text-[#6B8F60]" />
                    <input
                      type="text"
                      {...register("organization")}
                      placeholder="Your Company"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-[#E4D7B4] bg-white text-[#335441] placeholder:text-[#A9B782] focus:outline-none focus:ring-2 focus:ring-[#46704A] focus:border-transparent transition-all"
                    />
                  </div>
                  {errors.organization && (
                    <p className="text-red-500 text-sm">{errors.organization.message}</p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#335441] block">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 w-5 h-5 text-[#6B8F60]" />
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-3 rounded-lg border-2 border-[#E4D7B4] bg-white text-[#335441] placeholder:text-[#A9B782] focus:outline-none focus:ring-2 focus:ring-[#46704A] focus:border-transparent transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 text-[#6B8F60] hover:text-[#335441] transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-[#335441] text-white rounded-lg font-semibold hover:bg-[#46704A] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-8 shadow-lg hover:shadow-xl"
                >
                  {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
                  Sign Up as Employer
                </button>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t-2 border-[#E4D7B4]"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-[#6B8F60]">OR CONTINUE WITH</span>
                  </div>
                </div>

                {/* Social Buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    className="py-3 px-4 border-2 border-[#E4D7B4] rounded-lg font-medium text-[#335441] hover:bg-[#F9F6EE] transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Google
                  </button>
                  <button
                    type="button"
                    className="py-3 px-4 border-2 border-[#E4D7B4] rounded-lg font-medium text-[#335441] hover:bg-[#F9F6EE] transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub
                  </button>
                </div>

                {/* Footer */}
                <p className="text-center text-sm text-[#6B8F60] mt-8">
                  Already have an account?{" "}
                  <Link to="/employer-login" className="text-[#335441] font-semibold hover:underline">
                    Sign in
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
