"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function PostInternship() {
  const [formData, setFormData] = useState({
    title: "",
    jobType: "hybrid",
    location: "",
    skills: "",
    description: "",
    stipend: "",
    duration: "3-months",
    openings: "1",
  })

  const [showPreview, setShowPreview] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowPreview(true)
  }

  const handlePostInternship = () => {
    console.log("Posting internship:", formData)
    alert("Internship posted successfully!")
    setFormData({
      title: "",
      jobType: "hybrid",
      location: "",
      skills: "",
      description: "",
      stipend: "",
      duration: "3-months",
      openings: "1",
    })
    setShowPreview(false)
  }

  return (
    <div className="p-8 space-y-6 max-w-4xl bg-[#F9F6EE] min-h-full">
      <div>
        <h2 className="text-3xl font-bold text-[#335441] mb-2">Post a New Internship</h2>
        <p className="text-[#6B8F60]">Create and publish an internship posting</p>
      </div>

      {!showPreview ? (
        <Card className="border-[#E4D7B4] bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#335441]">Internship Details</CardTitle>
            <CardDescription className="text-[#6B8F60]">Fill in the details for your internship posting</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <Label htmlFor="title" className="text-[#335441] font-semibold">
                  Internship Profile / Job Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Frontend Development Intern"
                  required
                  className="mt-2 border-[#E4D7B4] focus:border-[#335441]"
                />
              </div>

              {/* Job Type */}
              <div>
                <Label htmlFor="jobType" className="text-[#335441] font-semibold">
                  Job Type
                </Label>
                <select
                  id="jobType"
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleInputChange}
                  className="w-full mt-2 px-3 py-2 border border-[#E4D7B4] rounded-lg bg-white text-[#335441] focus:border-[#335441] focus:outline-none"
                >
                  <option value="in-office">In-Office</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <Label htmlFor="location" className="text-[#335441] font-semibold">
                  Location
                </Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., San Francisco, CA"
                  required
                  className="mt-2 border-[#E4D7B4] focus:border-[#335441]"
                />
              </div>

              {/* Duration */}
              <div>
                <Label htmlFor="duration" className="text-[#335441] font-semibold">
                  Duration
                </Label>
                <select
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="w-full mt-2 px-3 py-2 border border-[#E4D7B4] rounded-lg bg-white text-[#335441] focus:border-[#335441] focus:outline-none"
                >
                  <option value="1-month">1 Month</option>
                  <option value="2-months">2 Months</option>
                  <option value="3-months">3 Months</option>
                  <option value="6-months">6 Months</option>
                </select>
              </div>

              {/* Stipend */}
              <div>
                <Label htmlFor="stipend" className="text-[#335441] font-semibold">
                  Stipend (Monthly)
                </Label>
                <Input
                  id="stipend"
                  name="stipend"
                  value={formData.stipend}
                  onChange={handleInputChange}
                  placeholder="e.g., $2,000 - $3,000"
                  required
                  className="mt-2 border-[#E4D7B4] focus:border-[#335441]"
                />
              </div>

              {/* Skills */}
              <div>
                <Label htmlFor="skills" className="text-[#335441] font-semibold">
                  Required Skills
                </Label>
                <Input
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  placeholder="e.g., React, HTML, CSS"
                  required
                  className="mt-2 border-[#E4D7B4] focus:border-[#335441]"
                />
              </div>

              {/* Openings */}
              <div>
                <Label htmlFor="openings" className="text-[#335441] font-semibold">
                  Number of Openings
                </Label>
                <Input
                  id="openings"
                  name="openings"
                  type="number"
                  value={formData.openings}
                  onChange={handleInputChange}
                  min="1"
                  required
                  className="mt-2 border-[#E4D7B4] focus:border-[#335441]"
                />
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description" className="text-[#335441] font-semibold">
                  Internship Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe the internship, responsibilities, and learning opportunities..."
                  required
                  rows={8}
                  maxLength={2500}
                  className="mt-2 border-[#E4D7B4] focus:border-[#335441]"
                />
                <p className="text-sm text-[#6B8F60] mt-2">{formData.description.length} / 2500 characters</p>
              </div>

              {/* Submit */}
              <div className="flex gap-4">
                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-[#335441] to-[#46704A] hover:from-[#46704A] hover:to-[#6B8F60] text-white shadow-lg transition-all duration-200"
                >
                  Preview Internship Post
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-[#E4D7B4] bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#335441]">Preview Your Internship Post</CardTitle>
            <CardDescription className="text-[#6B8F60]">Review before publishing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border border-[#E4D7B4] rounded-lg p-6 space-y-4 bg-[#F9F6EE]">
              <h3 className="text-2xl font-bold text-[#335441]">{formData.title}</h3>
              <div className="space-y-3 text-sm">
                <p>
                  <span className="font-semibold text-[#335441]">Job Type:</span>{" "}
                  <span className="text-[#6B8F60] capitalize">{formData.jobType}</span>
                </p>
                <p>
                  <span className="font-semibold text-[#335441]">Location:</span>{" "}
                  <span className="text-[#6B8F60]">{formData.location}</span>
                </p>
                <p>
                  <span className="font-semibold text-[#335441]">Duration:</span>{" "}
                  <span className="text-[#6B8F60] capitalize">{formData.duration.replace("-", " ")}</span>
                </p>
                <p>
                  <span className="font-semibold text-[#335441]">Stipend:</span>{" "}
                  <span className="text-[#6B8F60]">{formData.stipend}</span>
                </p>
                <p>
                  <span className="font-semibold text-[#335441]">Openings:</span>{" "}
                  <span className="text-[#6B8F60]">{formData.openings}</span>
                </p>
                <p>
                  <span className="font-semibold text-[#335441]">Required Skills:</span>{" "}
                  <span className="text-[#6B8F60]">{formData.skills}</span>
                </p>
                <div>
                  <span className="font-semibold text-[#335441] block mb-2">Description:</span>
                  <p className="text-[#6B8F60] whitespace-pre-wrap">{formData.description}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={handlePostInternship} 
                className="bg-gradient-to-r from-[#335441] to-[#46704A] hover:from-[#46704A] hover:to-[#6B8F60] text-white shadow-lg transition-all duration-200"
              >
                Publish Internship Post
              </Button>
              <Button 
                onClick={() => setShowPreview(false)} 
                variant="outline"
                className="border-[#335441] text-[#335441] hover:bg-[#EFE7D4]"
              >
                Back to Editing
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}