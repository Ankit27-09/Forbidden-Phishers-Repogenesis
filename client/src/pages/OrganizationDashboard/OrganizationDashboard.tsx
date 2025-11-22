import React, { useState } from 'react';
import Sidebar from '@/components/OrganizationDashboard/Sidebar';
import DashboardHome from '@/components/OrganizationDashboard/DashboardHome';
import ActiveJobs from '@/components/OrganizationDashboard/ActiveJobs';
import PostJob from '@/components/OrganizationDashboard/PostJob';
import PostInternship from '@/components/OrganizationDashboard/PostInternship';
import ApplicantTracker from '@/components/OrganizationDashboard/ApplicantTracker';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

type PageView = "home" | "active-jobs" | "post-job" | "post-internship" | "applicants";

const OrganizationDashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageView>("home");
  const user = useSelector((state: RootState) => state.auth.user);
  
  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return <DashboardHome onNavigate={handleNavigate} />;
      case "active-jobs":
        return <ActiveJobs />;
      case "post-job":
        return <PostJob />;
      case "post-internship":
        return <PostInternship />;
      case "applicants":
        return <ApplicantTracker />;
      default:
        return <DashboardHome onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F9F6EE]">
      <Sidebar 
        currentPage={currentPage} 
        onNavigate={handleNavigate} 
        companyName={user?.organization || "Your Company"} 
      />
      <main className="flex-1 overflow-auto bg-[#F9F6EE]">
        {renderCurrentPage()}
      </main>
    </div>
  );
};

export default OrganizationDashboard;