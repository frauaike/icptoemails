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
import { useAuth } from "@/lib/auth"

interface UserProfileModalProps {
  children: React.ReactNode
}

export function UserProfileModal({ children }: UserProfileModalProps) {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [avatarSrc, setAvatarSrc] = useState("")
  const { user, logout } = useAuth()
  const [formData, setFormData] = useState({
    name: user?.full_name || "",
    email: user?.email || "",
    company: user?.company || "",
    jobTitle: user?.job_title || "",
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
      reader.onloadend = () => {
        setAvatarSrc(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleLogout = () => {
    logout()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#1a1a1a] border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-white">Profile Settings</DialogTitle>
          <DialogDescription className="text-gray-400">
            Manage your account settings and preferences
          </DialogDescription>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-[#2a2a2a]">
            <TabsTrigger value="profile" className="text-gray-400 data-[state=active]:text-white">Profile</TabsTrigger>
            <TabsTrigger value="billing" className="text-gray-400 data-[state=active]:text-white">Billing</TabsTrigger>
            <TabsTrigger value="notifications" className="text-gray-400 data-[state=active]:text-white">Notifications</TabsTrigger>
            <TabsTrigger value="security" className="text-gray-400 data-[state=active]:text-white">Security</TabsTrigger>
          </TabsList>
          <TabsContent value="profile" className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={avatarSrc} />
                <AvatarFallback className="bg-[#2dd4bf]/20 text-[#2dd4bf]">
                  {user?.full_name?.split(" ").map((n: string) => n[0]).join("") || "U"}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" className="bg-[#2a2a2a] border-gray-700 text-white">
                <Camera className="h-4 w-4 mr-2" />
                Change Avatar
              </Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="bg-[#2a2a2a] border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="bg-[#2a2a2a] border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company" className="text-white">Company</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="bg-[#2a2a2a] border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobTitle" className="text-white">Job Title</Label>
              <Input
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                className="bg-[#2a2a2a] border-gray-700 text-white"
              />
            </div>
          </TabsContent>
          <TabsContent value="billing" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">Pro Plan</h4>
                <p className="text-sm text-gray-400">$29/month</p>
              </div>
              <Button className="bg-[#2dd4bf] hover:bg-[#14b8a6] text-black">
                Manage Subscription
              </Button>
            </div>
            <Separator className="bg-gray-800" />
            <div className="space-y-2">
              <Label htmlFor="card" className="text-white">Payment Method</Label>
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400">•••• 4242</span>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="notifications" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Email Analysis</Label>
                  <p className="text-sm text-gray-400">Get notified when your emails are analyzed</p>
                </div>
                <Switch
                  checked={notifications.emailAnalysis}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({ ...prev, emailAnalysis: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">New Features</Label>
                  <p className="text-sm text-gray-400">Stay updated with new features and improvements</p>
                </div>
                <Switch
                  checked={notifications.newFeatures}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({ ...prev, newFeatures: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Tips & Tricks</Label>
                  <p className="text-sm text-gray-400">Receive helpful tips for better email writing</p>
                </div>
                <Switch
                  checked={notifications.tips}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({ ...prev, tips: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Marketing Emails</Label>
                  <p className="text-sm text-gray-400">Receive updates about our products and services</p>
                </div>
                <Switch
                  checked={notifications.marketing}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({ ...prev, marketing: checked }))
                  }
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="security" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="text-white">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                className="bg-[#2a2a2a] border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-white">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                className="bg-[#2a2a2a] border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                className="bg-[#2a2a2a] border-gray-700 text-white"
              />
            </div>
          </TabsContent>
        </Tabs>
        <DialogFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleLogout}
            className="bg-[#2a2a2a] border-gray-700 text-white hover:bg-[#3a3a3a]"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
          <Button className="bg-[#2dd4bf] hover:bg-[#14b8a6] text-black">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

