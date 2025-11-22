"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Users, Loader2, Briefcase } from "lucide-react"
import { activePositionsAPI } from "@/api/organizationService"

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
  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchActivePositions = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await activePositionsAPI.getActivePositions()
        
        if (response.success) {
          setJobs(response.data)
        }
      } catch (err: any) {
        console.error("Error fetching active positions:", err)
        setError(err.response?.data?.message || "Failed to load active positions")
      } finally {
        setIsLoading(false)
      }
    }

    fetchActivePositions()
  }, [])

  if (isLoading) {
    return (
      <div className="p-8 space-y-6 bg-[#F9F6EE] min-h-full">
        <div>
          <h2 className="text-3xl font-bold text-[#335441] mb-2">Active Jobs & Internships</h2>
          <p className="text-[#6B8F60]">Manage your posted positions and track applicants</p>
        </div>
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-[#335441]" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 space-y-6 bg-[#F9F6EE] min-h-full">
        <div>
          <h2 className="text-3xl font-bold text-[#335441] mb-2">Active Jobs & Internships</h2>
          <p className="text-[#6B8F60]">Manage your posted positions and track applicants</p>
        </div>
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">{error}</p>
          <Button 
            onClick={() => window.location.reload()}
            variant="outline"
            className="border-[#335441] text-[#335441] hover:bg-[#EFE7D4]"
          >
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-6 bg-[#F9F6EE] min-h-full">
      <div>
        <h2 className="text-3xl font-bold text-[#335441] mb-2">Active Jobs & Internships</h2>
        <p className="text-[#6B8F60]">Manage your posted positions and track applicants</p>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-[#6B8F60] text-lg mb-4">No active positions found</p>
          <p className="text-sm text-[#6B8F60]">Start by posting your first job or internship!</p>
        </div>
      ) : (
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
      )}
    </div>
  )
}