import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkIcon, Users, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const SignUpForm: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-[#F9F6EE] via-[#EFE7D4] to-[#E4D7B4]">
      <div
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: "100px 100px",
        }}
      />

      <div className="w-full max-w-4xl z-10 flex items-center justify-center">
        <Card className="w-full backdrop-blur-sm bg-white shadow-xl border-2 border-[#E4D7B4]">
          <CardHeader className="space-y-1 flex flex-col items-center pt-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-tr from-[#335441] to-[#46704A] rounded-xl flex items-center justify-center shadow-lg">
                <LinkIcon className="text-white w-6 h-6" />
              </div>
              <CardTitle className="text-3xl font-bold text-[#335441]">
                PrepX
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-8 px-8 py-6">
            <div className="space-y-2 text-center">
              <h2 className="text-4xl font-semibold tracking-tight text-[#335441]">
                Join PrepX
              </h2>
              <p className="text-lg text-[#6B8F60]">
                Choose how you'd like to get started with PrepX
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Candidate Card */}
              <Card className="group hover:shadow-lg transition-all duration-300 border-2 border-[#E4D7B4] hover:border-[#335441]">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-tr from-[#335441] to-[#46704A] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Users className="text-white w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-semibold text-[#335441]">
                      I'm a Candidate
                    </h3>
                    <p className="text-[#6B8F60]">
                      Looking to prepare for interviews and enhance my skills
                    </p>
                  </div>
                  <div className="space-y-3">
                    <ul className="text-sm text-[#6B8F60] space-y-1">
                      <li>• Access interview questions</li>
                      <li>• Practice coding challenges</li>
                      <li>• Get preparation resources</li>
                      <li>• Track your progress</li>
                    </ul>
                    <Link to="/candidate/signup" className="block">
                      <Button className="w-full bg-gradient-to-r from-[#335441] to-[#46704A] hover:from-[#46704A] hover:to-[#6B8F60] text-white shadow-lg transition-all duration-200 hover:shadow-xl">
                        Sign Up as Candidate
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Organization Card */}
              <Card className="group hover:shadow-lg transition-all duration-300 border-2 border-[#E4D7B4] hover:border-[#335441]">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-tr from-[#335441] to-[#46704A] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Building2 className="text-white w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-semibold text-[#335441]">
                      I'm an Organization
                    </h3>
                    <p className="text-[#6B8F60]">
                      Looking to post jobs and find talented candidates
                    </p>
                  </div>
                  <div className="space-y-3">
                    <ul className="text-sm text-[#6B8F60] space-y-1">
                      <li>• Post job openings</li>
                      <li>• Create custom assessments</li>
                      <li>• Find qualified candidates</li>
                      <li>• Manage hiring process</li>
                    </ul>
                    <Link to="/organization/signup" className="block">
                      <Button className="w-full bg-gradient-to-r from-[#335441] to-[#46704A] hover:from-[#46704A] hover:to-[#6B8F60] text-white shadow-lg transition-all duration-200 hover:shadow-xl">
                        Sign Up as Organization
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center text-sm text-[#6B8F60]">
              Already have an account?{" "}
              <Link
                to="/Login"
                className="font-medium text-[#335441] hover:text-[#46704A] hover:underline"
              >
                Log In
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUpForm;
