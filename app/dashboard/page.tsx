"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ICPList } from "@/components/icp-list"
import { EmailAnalyzer } from "@/components/email-analyzer"
import { UserProfileModal } from "@/components/user-profile-modal"
import { PlusCircle, Target, Mail, BarChart3, Settings } from "lucide-react"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("icps")

  return (
    <DashboardShell>
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
        <div className="hidden md:block">
          <div className="bg-[#111111] rounded-xl border border-gray-800 shadow-sm overflow-hidden">
            <div className="p-4">
              <UserProfileModal>
                <button className="flex items-center gap-2 mb-6 w-full text-left hover:opacity-80 transition-opacity">
                  <div className="w-8 h-8 rounded-full bg-[#7c3aed]/20 flex items-center justify-center text-[#7c3aed]">
                    <span className="font-bold">JS</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">John Smith</p>
                    <p className="text-xs text-gray-400">Pro Plan</p>
                  </div>
                </button>
              </UserProfileModal>

              <nav className="space-y-1">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#2dd4bf]/10 text-[#2dd4bf] font-medium text-sm"
                >
                  <BarChart3 className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/icps"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:bg-[#1a1a1a] font-medium text-sm"
                >
                  <Target className="h-4 w-4" />
                  My ICPs
                </Link>
                <Link
                  href="/dashboard/analyze"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:bg-[#1a1a1a] font-medium text-sm"
                >
                  <Mail className="h-4 w-4" />
                  Email Analysis
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:bg-[#1a1a1a] font-medium text-sm"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </nav>
            </div>

            <div className="border-t border-gray-800 p-4">
              <div className="bg-[#1a1a1a] rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs font-medium">Usage</p>
                  <p className="text-xs text-[#2dd4bf]">50%</p>
                </div>
                <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-[#2dd4bf] rounded-full" style={{ width: "50%" }}></div>
                </div>
                <p className="text-xs text-gray-400 mt-2">25/50 analyses used this month</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <DashboardHeader heading="Dashboard" text="Create ICPs and analyze your cold emails.">
            <Link href={activeTab === "icps" ? "/dashboard/icp/new" : "/dashboard/analyze/new"}>
              <Button className="bg-[#2dd4bf] hover:bg-[#14b8a6] text-black rounded-lg">
                <PlusCircle className="mr-2 h-4 w-4" />
                {activeTab === "icps" ? "New ICP" : "New Analysis"}
              </Button>
            </Link>
          </DashboardHeader>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#111111] rounded-xl border border-gray-800 shadow-sm p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2dd4bf]/20 flex items-center justify-center text-[#2dd4bf]">
                  <Target className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-gray-400">Total ICPs</p>
                </div>
              </div>
            </div>

            <div className="bg-[#111111] rounded-xl border border-gray-800 shadow-sm p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#7c3aed]/20 flex items-center justify-center text-[#7c3aed]">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-gray-400">Emails Analyzed</p>
                </div>
              </div>
            </div>

            <div className="bg-[#111111] rounded-xl border border-gray-800 shadow-sm p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#f59e0b]/20 flex items-center justify-center text-[#f59e0b]">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">65%</p>
                  <p className="text-sm text-gray-400">Avg. Resonance</p>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="icps" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-[#1a1a1a] p-1 rounded-lg">
              <TabsTrigger
                value="icps"
                className="rounded-md data-[state=active]:bg-[#111111] data-[state=active]:shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  My ICPs
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="analyze"
                className="rounded-md data-[state=active]:bg-[#111111] data-[state=active]:shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Analyze Email
                </div>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="icps" className="space-y-4 mt-0">
              <ICPList />
            </TabsContent>

            <TabsContent value="analyze" className="space-y-4 mt-0">
              <EmailAnalyzer />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardShell>
  )
}

