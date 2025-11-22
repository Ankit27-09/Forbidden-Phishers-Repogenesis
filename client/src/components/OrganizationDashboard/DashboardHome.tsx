"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type PageView = "home" | "active-jobs" | "post-job" | "post-internship" | "applicants"

interface DashboardHomeProps {
  onNavigate: (page: PageView) => void
}

export default function DashboardHome({ onNavigate }: DashboardHomeProps) {
  const [stats] = useState({
    totalJobs: 12,
    totalInternships: 5,
    totalApplicants: 342,
    shortlisted: 48,
    hired: 8,
    rejected: 52,
  })

  const chartData = [
    { name: "Applied", value: 342 },
    { name: "Shortlisted", value: 48 },
    { name: "Hired", value: 8 },
    { name: "Rejected", value: 52 },
  ]

  return (
    <div className="p-8 space-y-8 bg-[#F9F6EE] min-h-full">
      {/* Overview Stats */}
      <section>
        <h2 className="text-3xl font-bold text-[#335441] mb-6">Dashboard Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-[#E4D7B4] shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-[#6B8F60]">Active Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-[#335441]">{stats.totalJobs}</div>
              <p className="text-sm text-[#6B8F60] mt-2">Currently open positions</p>
            </CardContent>
          </Card>

          <Card className="border-[#E4D7B4] shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-[#6B8F60]">Active Internships</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-[#46704A]">{stats.totalInternships}</div>
              <p className="text-sm text-[#6B8F60] mt-2">Currently open positions</p>
            </CardContent>
          </Card>

          <Card className="border-[#E4D7B4] shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-[#6B8F60]">Total Applicants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-[#335441]">{stats.totalApplicants}</div>
              <p className="text-sm text-[#6B8F60] mt-2">Across all positions</p>
            </CardContent>
          </Card>

          <Card className="border-[#E4D7B4] shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-[#6B8F60]">Shortlisted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-[#2563eb]">{stats.shortlisted}</div>
              <p className="text-sm text-[#6B8F60] mt-2">Ready for interview</p>
            </CardContent>
          </Card>

          <Card className="border-[#E4D7B4] shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-[#6B8F60]">Hired</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-[#16a34a]">{stats.hired}</div>
              <p className="text-sm text-[#6B8F60] mt-2">Successfully onboarded</p>
            </CardContent>
          </Card>

          <Card className="border-[#E4D7B4] shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-[#6B8F60]">Rejected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-[#dc2626]">{stats.rejected}</div>
              <p className="text-sm text-[#6B8F60] mt-2">Not selected</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Statistics Overview */}
      <section>
        <Card className="border-[#E4D7B4] shadow-md">
          <CardHeader>
            <CardTitle className="text-[#335441]">Application Statistics</CardTitle>
            <CardDescription className="text-[#6B8F60]">Overview of applicant status distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {chartData.map((item) => (
                <div key={item.name} className="p-4 bg-[#F9F6EE] rounded-lg">
                  <div className="text-2xl font-bold text-[#335441]">{item.value}</div>
                  <div className="text-sm text-[#6B8F60]">{item.name}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Quick Actions */}
      <section>
        <h3 className="text-xl font-bold text-[#335441] mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <Button
            onClick={() => onNavigate("post-job")}
            size="lg"
            className="bg-gradient-to-r from-[#335441] to-[#46704A] hover:from-[#46704A] hover:to-[#6B8F60] text-white shadow-lg transition-all duration-200"
          >
            Create New Job
          </Button>
          <Button
            onClick={() => onNavigate("post-internship")}
            size="lg"
            className="bg-gradient-to-r from-[#46704A] to-[#6B8F60] hover:from-[#6B8F60] hover:to-[#335441] text-white shadow-lg transition-all duration-200"
          >
            Create New Internship
          </Button>
          <Button 
            onClick={() => onNavigate("applicants")} 
            size="lg" 
            variant="outline"
            className="border-[#335441] text-[#335441] hover:bg-[#EFE7D4] shadow-lg"
          >
            View All Applicants
          </Button>
        </div>
      </section>
    </div>
  )
}