"use client"

import { Briefcase, Users, Plus, FileText, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

type PageView = "home" | "active-jobs" | "post-job" | "post-internship" | "applicants"

interface SidebarProps {
  currentPage: PageView
  onNavigate: (page: PageView) => void
  companyName: string
}

export default function Sidebar({ currentPage, onNavigate, companyName }: SidebarProps) {
  const navItems = [
    { id: "home", label: "Dashboard", icon: Home },
    { id: "active-jobs", label: "Active Jobs", icon: Briefcase },
    { id: "applicants", label: "Applicants (ATS)", icon: Users },
    { id: "post-job", label: "Post Job", icon: Plus },
    { id: "post-internship", label: "Post Internship", icon: FileText },
  ]

  return (
    <aside className="w-64 bg-white border-r border-[#E4D7B4] flex flex-col shadow-lg">
      {/* Logo Area */}
      <div className="p-6 border-b border-[#E4D7B4]">
        <h2 className="text-xl font-bold text-[#335441] truncate">Employer Hub</h2>
        <p className="text-sm text-[#6B8F60] mt-1 truncate">{companyName}</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPage === item.id
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as PageView)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-gradient-to-r from-[#335441] to-[#46704A] text-white shadow-md"
                  : "text-[#335441] hover:bg-[#EFE7D4] hover:text-[#46704A]"
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Quick Actions */}
      <div className="p-4 border-t border-[#E4D7B4] space-y-2">
        <Button
          onClick={() => onNavigate("post-job")}
          className="w-full bg-gradient-to-r from-[#335441] to-[#46704A] hover:from-[#46704A] hover:to-[#6B8F60] text-white shadow-lg transition-all duration-200"
        >
          Create Job
        </Button>
        <Button 
          onClick={() => onNavigate("post-internship")} 
          variant="outline" 
          className="w-full border-[#335441] text-[#335441] hover:bg-[#EFE7D4]"
        >
          Create Internship
        </Button>
      </div>
    </aside>
  )
}