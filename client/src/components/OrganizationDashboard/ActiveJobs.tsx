"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Briefcase, Users } from "lucide-react"

interface Job {
  id: string
  title: string
  type: "Job" | "Internship"
  location: string
  applicants: number
  shortlisted: number
  postedDate: string
}

export default function ActiveJobs() {
  const [jobs] = useState<Job[]>([
    {
      id: "1",
      title: "Senior Frontend Engineer",
      type: "Job",
      location: "San Francisco, CA",
      applicants: 45,
      shortlisted: 8,
      postedDate: "2 weeks ago",
    },
    {
      id: "2",
      title: "React Developer Internship",
      type: "Internship",
      location: "Remote",
      applicants: 120,
      shortlisted: 12,
      postedDate: "1 week ago",
    },
    {
      id: "3",
      title: "Full Stack Engineer",
      type: "Job",
      location: "New York, NY",
      applicants: 78,
      shortlisted: 15,
      postedDate: "3 days ago",
    },
  ])

  return (
    <div className="p-8 space-y-6 bg-[#F9F6EE] min-h-full">
      <div>
        <h2 className="text-3xl font-bold text-[#335441] mb-2">Active Jobs & Internships</h2>
        <p className="text-[#6B8F60]">Manage your posted positions and track applicants</p>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <Card key={job.id} className="hover:shadow-md transition-shadow border-[#E4D7B4] bg-white">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold text-[#335441]">{job.title}</h3>
                    <Badge 
                      variant={job.type === "Job" ? "default" : "secondary"}
                      className={job.type === "Job" 
                        ? "bg-gradient-to-r from-[#335441] to-[#46704A] text-white" 
                        : "bg-[#EFE7D4] text-[#335441]"
                      }
                    >
                      {job.type}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-[#6B8F60]">
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      {job.location}
                    </div>
                    <div>Posted {job.postedDate}</div>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-[#335441] text-[#335441] hover:bg-[#EFE7D4]"
                >
                  View Details
                </Button>
              </div>

              <div className="flex gap-4 mt-6 pt-6 border-t border-[#E4D7B4]">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-[#335441]" />
                  <div>
                    <p className="text-sm text-[#6B8F60]">Applicants</p>
                    <p className="text-lg font-bold text-[#335441]">{job.applicants}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase size={16} className="text-[#46704A]" />
                  <div>
                    <p className="text-sm text-[#6B8F60]">Shortlisted</p>
                    <p className="text-lg font-bold text-[#335441]">{job.shortlisted}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}