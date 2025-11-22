import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

interface OrganizationProtectedRouteProps {
  children: React.ReactNode;
}

const OrganizationProtectedRoute: React.FC<OrganizationProtectedRouteProps> = ({ children }) => {
  const { isLoggedIn, user, loading } = useSelector((state: RootState) => state.auth);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F6EE]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#335441] mx-auto"></div>
          <p className="mt-4 text-[#6B8F60]">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isLoggedIn || !user) {
    return <Navigate to="/Login" replace />;
  }

  // Redirect to home if not an organization
  if (user.role !== "ORGANISATION") {
    return <Navigate to="/" replace />;
  }

  // If user is an authenticated organization, render the protected content
  return <>{children}</>;
};

export default OrganizationProtectedRoute;