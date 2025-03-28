"use client"

import type React from "react"
import { UserProfileModal } from "@/components/user-profile-modal"
import { User2 } from "lucide-react"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0a]">
      <header className="sticky top-0 z-10 border-b border-gray-800 bg-[#0a0a0a]/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <a href="/dashboard" className="flex items-center gap-2">
              <span className="text-xl font-bold text-[#2dd4bf]">WhisperSales</span>
            </a>
          </div>
          <nav className="flex items-center gap-6">
            <a href="/dashboard" className="text-sm font-medium text-gray-300 hover:text-[#2dd4bf]">
              Dashboard
            </a>
            <a href="/settings" className="text-sm font-medium text-gray-300 hover:text-[#2dd4bf]">
              Settings
            </a>
            <div className="hidden md:block">
              <UserProfileModal>
                <button className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-[#2dd4bf]">
                  <User2 className="h-4 w-4" />
                  Profile
                </button>
              </UserProfileModal>
            </div>
            <a href="/" className="text-sm font-medium text-gray-300 hover:text-[#2dd4bf]">
              Logout
            </a>
          </nav>
        </div>
      </header>
      <main className="flex-1 bg-[#0a0a0a]">
        <div className="container py-8">{children}</div>
      </main>
    </div>
  )
}

