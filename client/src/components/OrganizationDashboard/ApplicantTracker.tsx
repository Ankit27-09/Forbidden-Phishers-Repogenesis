"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Star, X, Eye } from "lucide-react"

interface Applicant {
  id: string
  name: string
  email: string
  position: string
  skills: string[]
  experience: string
  status: "applied" | "shortlisted" | "hired" | "rejected"
  score: number
  appliedDate: string
}

export default function ApplicantTracker() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState<"all" | "applied" | "shortlisted" | "hired" | "rejected">("all")
  const [filterSkills, setFilterSkills] = useState("")
  const [filterExperience, setFilterExperience] = useState("")
  const [filterLocation, setFilterLocation] = useState("")

  const [applicants] = useState<Applicant[]>([
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice@example.com",
      position: "Senior Frontend Engineer",
      skills: ["React", "TypeScript", "CSS"],
      experience: "5 years",
      status: "shortlisted",
      score: 92,
      appliedDate: "3 days ago",
    },
    {
      id: "2",
      name: "Bob Smith",
      email: "bob@example.com",
      position: "React Developer Internship",
      skills: ["React", "JavaScript", "HTML"],
      experience: "1 year",
      status: "applied",
      score: 78,
      appliedDate: "1 day ago",
    },
    {
      id: "3",
      name: "Carol Davis",
      email: "carol@example.com",
      position: "Senior Frontend Engineer",
      skills: ["Vue", "JavaScript", "Node.js"],
      experience: "3 years",
      status: "rejected",
      score: 45,
      appliedDate: "5 days ago",
    },
    {
      id: "4",
      name: "David Wilson",
      email: "david@example.com",
      position: "Full Stack Engineer",
      skills: ["React", "Node.js", "PostgreSQL"],
      experience: "6 years",
      status: "hired",
      score: 95,
      appliedDate: "1 week ago",
    },
  ])

  const filteredApplicants = applicants
    .filter((app) => {
      const matchesTab = activeTab === "all" || app.status === activeTab
      const matchesSearch =
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesTab && matchesSearch
    })
    .sort((a, b) => b.score - a.score)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "applied":
        return "bg-blue-100 text-blue-800"
      case "shortlisted":
        return "bg-green-100 text-green-800"
      case "hired":
        return "bg-emerald-100 text-emerald-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const tabs = [
    { id: "all", label: "All Applications", count: applicants.length },
    {
      id: "applied",
      label: "Applied",
      count: applicants.filter((a) => a.status === "applied").length,
    },
    {
      id: "shortlisted",
      label: "Shortlisted",
      count: applicants.filter((a) => a.status === "shortlisted").length,
    },
    {
      id: "hired",
      label: "Hired",
      count: applicants.filter((a) => a.status === "hired").length,
    },
    {
      id: "rejected",
      label: "Rejected",
      count: applicants.filter((a) => a.status === "rejected").length,
    },
  ]

  return (
    <div className="p-8 space-y-6 bg-[#F9F6EE] min-h-full">
      <div>
        <h2 className="text-3xl font-bold text-[#335441] mb-2">Applicant Tracking System</h2>
        <p className="text-[#6B8F60]">Review and manage your applicants</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#E4D7B4] pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 font-medium transition-colors rounded-t-lg ${
              activeTab === tab.id
                ? "text-[#335441] border-b-2 border-[#335441] bg-white"
                : "text-[#6B8F60] hover:text-[#335441] hover:bg-[#EFE7D4]"
            }`}
          >
            {tab.label}
            <span className="ml-2 text-sm text-[#6B8F60]">({tab.count})</span>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="text-sm font-medium text-[#335441]">Search</label>
          <Input
            placeholder="Name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-2 border-[#E4D7B4] focus:border-[#335441]"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-[#335441]">Skills</label>
          <Input
            placeholder="Filter by skills..."
            value={filterSkills}
            onChange={(e) => setFilterSkills(e.target.value)}
            className="mt-2 border-[#E4D7B4] focus:border-[#335441]"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-[#335441]">Experience</label>
          <Input
            placeholder="Filter by experience..."
            value={filterExperience}
            onChange={(e) => setFilterExperience(e.target.value)}
            className="mt-2 border-[#E4D7B4] focus:border-[#335441]"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-[#335441]">Location</label>
          <Input
            placeholder="Filter by location..."
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
            className="mt-2 border-[#E4D7B4] focus:border-[#335441]"
          />
        </div>
      </div>

      {/* Applicants List */}
      <div className="space-y-4">
        {filteredApplicants.length > 0 ? (
          filteredApplicants.map((applicant) => (
            <Card key={applicant.id} className="hover:shadow-md transition-shadow border-[#E4D7B4] bg-white">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-bold text-[#335441]">{applicant.name}</h3>
                      <Badge variant="outline" className={getStatusColor(applicant.status)}>
                        {applicant.status}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm text-[#6B8F60]">
                      <p>{applicant.email}</p>
                      <p>
                        <span className="font-semibold text-[#335441]">Position:</span> {applicant.position}
                      </p>
                      <p>
                        <span className="font-semibold text-[#335441]">Experience:</span> {applicant.experience}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {applicant.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="bg-[#EFE7D4] text-[#335441]">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[#335441]">{applicant.score}</p>
                      <p className="text-xs text-[#6B8F60]">Score</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        title="View Resume"
                        className="border-[#335441] text-[#335441] hover:bg-[#EFE7D4]"
                      >
                        <Eye size={16} />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        title="Shortlist"
                        className="border-[#335441] text-[#335441] hover:bg-[#EFE7D4]"
                      >
                        <Star size={16} />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        title="Reject"
                        className="border-red-500 text-red-500 hover:bg-red-50"
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="border-[#E4D7B4] bg-white">
            <CardContent className="pt-12 text-center pb-12">
              <p className="text-[#6B8F60]">No applicants found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}