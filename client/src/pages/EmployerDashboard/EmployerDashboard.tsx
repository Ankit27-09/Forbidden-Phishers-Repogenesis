import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";

const EmployerDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#F9F6EE] via-[#EFE7D4] to-[#E4D7B4] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-16 h-16 bg-linear-to-tr from-[#335441] to-[#46704A] rounded-xl flex items-center justify-center shadow-lg">
            <Building2 className="text-white w-8 h-8" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-[#335441]">Employer Dashboard</h1>
            <p className="text-[#6B8F60]">Welcome to your employer portal</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-2 border-[#E4D7B4] shadow-lg">
            <CardHeader>
              <CardTitle className="text-[#335441]">Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#6B8F60]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#E4D7B4] shadow-lg">
            <CardHeader>
              <CardTitle className="text-[#335441]">Active Postings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#6B8F60]">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#E4D7B4] shadow-lg">
            <CardHeader>
              <CardTitle className="text-[#335441]">Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#6B8F60]">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#E4D7B4] shadow-lg">
            <CardHeader>
              <CardTitle className="text-[#335441]">Candidates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#6B8F60]">
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                aut fugit, sed quia consequuntur magni dolores eos qui ratione
                voluptatem sequi nesciunt. Neque porro quisquam est.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#E4D7B4] shadow-lg">
            <CardHeader>
              <CardTitle className="text-[#335441]">Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#6B8F60]">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#E4D7B4] shadow-lg">
            <CardHeader>
              <CardTitle className="text-[#335441]">Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#6B8F60]">
                Temporibus autem quibusdam et aut officiis debitis aut rerum
                necessitatibus saepe eveniet ut et voluptates repudiandae sint et
                molestiae non recusandae. Itaque earum rerum hic tenetur.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
