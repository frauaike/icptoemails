"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Camera, CreditCard, LogOut, User, Bell, Shield } from "lucide-react"

interface UserProfileModalProps {
  children: React.ReactNode
}

export function UserProfileModal({ children }: UserProfileModalProps) {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [avatarSrc, setAvatarSrc] = useState("")
  const [formData, setFormData] = useState({
    name: "John Smith",
    email: "john.smith@example.com",
    company: "Acme Inc",
    jobTitle: "Sales Director",
  })
  const [notifications, setNotifications] = useState({
    emailAnalysis: true,
    newFeatures: true,
    tips: false,
    marketing: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatarSrc(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-[#111111] border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl">User Profile</DialogTitle>
          <DialogDescription className="text-gray-400">Manage your account settings and preferences</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6 bg-[#1a1a1a] p-1 rounded-lg">
            <TabsTrigger
              value="profile"
              className="rounded-md data-[state=active]:bg-[#0a0a0a] data-[state=active]:shadow-sm"
            >
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Profile</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="rounded-md data-[state=active]:bg-[#0a0a0a] data-[state=active]:shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notifications</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="rounded-md data-[state=active]:bg-[#0a0a0a] data-[state=active]:shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Security</span>
              </div>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
              <div className="relative">
                <Avatar className="h-20 w-20 border-2 border-[#7c3aed]">
                  <AvatarImage src={avatarSrc} />
                  <AvatarFallback className="bg-[#7c3aed]/20 text-[#7c3aed] text-xl">JS</AvatarFallback>
                </Avatar>
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 bg-[#7c3aed] text-white p-1 rounded-full cursor-pointer"
                >
                  <Camera className="h-4 w-4" />
                  <span className="sr-only">Upload avatar</span>
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>

              <div className="flex-1 space-y-4 w-full">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-[#1a1a1a] border-gray-800 focus-visible:ring-[#7c3aed]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-[#1a1a1a] border-gray-800 focus-visible:ring-[#7c3aed]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-gray-800" />

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-gray-300">
                    Company
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="bg-[#1a1a1a] border-gray-800 focus-visible:ring-[#7c3aed]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jobTitle" className="text-gray-300">
                    Job Title
                  </Label>
                  <Input
                    id="jobTitle"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    className="bg-[#1a1a1a] border-gray-800 focus-visible:ring-[#7c3aed]"
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#2dd4bf]/20 flex items-center justify-center text-[#2dd4bf]">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Pro Plan</p>
                    <p className="text-sm text-gray-400">50 analyses per month</p>
                  </div>
                </div>
                <Button className="bg-[#2dd4bf] hover:bg-[#14b8a6] text-black">Manage</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-300">Email Notifications</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Email Analysis Results</Label>
                    <p className="text-sm text-gray-400">Receive notifications when your email analysis is complete</p>
                  </div>
                  <Switch
                    checked={notifications.emailAnalysis}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, emailAnalysis: checked }))}
                    className="data-[state=checked]:bg-[#7c3aed]"
                  />
                </div>

                <Separator className="bg-gray-800" />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">New Features</Label>
                    <p className="text-sm text-gray-400">Get notified about new features and improvements</p>
                  </div>
                  <Switch
                    checked={notifications.newFeatures}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, newFeatures: checked }))}
                    className="data-[state=checked]:bg-[#7c3aed]"
                  />
                </div>

                <Separator className="bg-gray-800" />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Tips & Tricks</Label>
                    <p className="text-sm text-gray-400">Receive helpful tips to improve your cold emails</p>
                  </div>
                  <Switch
                    checked={notifications.tips}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, tips: checked }))}
                    className="data-[state=checked]:bg-[#7c3aed]"
                  />
                </div>

                <Separator className="bg-gray-800" />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Marketing</Label>
                    <p className="text-sm text-gray-400">Receive marketing emails and special offers</p>
                  </div>
                  <Switch
                    checked={notifications.marketing}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, marketing: checked }))}
                    className="data-[state=checked]:bg-[#7c3aed]"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-300">Password</h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password" className="text-gray-300">
                    Current Password
                  </Label>
                  <Input
                    id="current-password"
                    type="password"
                    className="bg-[#1a1a1a] border-gray-800 focus-visible:ring-[#7c3aed]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password" className="text-gray-300">
                    New Password
                  </Label>
                  <Input
                    id="new-password"
                    type="password"
                    className="bg-[#1a1a1a] border-gray-800 focus-visible:ring-[#7c3aed]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-gray-300">
                    Confirm New Password
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    className="bg-[#1a1a1a] border-gray-800 focus-visible:ring-[#7c3aed]"
                  />
                </div>

                <Button className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white w-full">Update Password</Button>
              </div>

              <Separator className="bg-gray-800 my-6" />

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-300">Account</h3>

                <Button
                  variant="destructive"
                  className="w-full bg-red-900/20 hover:bg-red-900/30 text-red-400 border border-red-900/50"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="border-gray-800 hover:bg-[#1a1a1a] text-gray-300"
          >
            Cancel
          </Button>
          <Button className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white">Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

