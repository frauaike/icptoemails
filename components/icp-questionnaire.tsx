"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/lib/auth"

const INDUSTRIES = [
  "Software",
  "Healthcare",
  "Finance",
  "Education",
  "Manufacturing",
  "Retail",
  "Other",
]

const COMPANY_SIZES = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "501-1000",
  "1000+",
]

export function ICPQuestionnaire() {
  const router = useRouter()
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    industry: "",
    companySize: "",
    personaTitle: "",
    painPoints: "",
    goals: "",
    challenges: "",
    budget: "",
    decisionProcess: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const token = localStorage.getItem("token")
      const response = await fetch("http://localhost:8000/api/v1/icp/icps", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to create ICP")
      }

      const data = await response.json()
      router.push(`/dashboard/icp/${data.id}`)
    } catch (error) {
      console.error("Error creating ICP:", error)
      // TODO: Add error notification
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="bg-[#111111] border-gray-800">
      <CardHeader>
        <CardTitle className="text-xl">Create New ICP</CardTitle>
        <CardDescription>
          Define your ideal customer profile to improve your cold emails
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">ICP Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Mid-Market SaaS Companies"
              className="bg-[#1a1a1a] border-gray-800"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your ideal customer profile..."
              className="bg-[#1a1a1a] border-gray-800"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select
                value={formData.industry}
                onValueChange={(value) => handleSelectChange("industry", value)}
              >
                <SelectTrigger className="bg-[#1a1a1a] border-gray-800">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {INDUSTRIES.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="companySize">Company Size</Label>
              <Select
                value={formData.companySize}
                onValueChange={(value) => handleSelectChange("companySize", value)}
              >
                <SelectTrigger className="bg-[#1a1a1a] border-gray-800">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {COMPANY_SIZES.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size} employees
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="personaTitle">Target Role/Title</Label>
            <Input
              id="personaTitle"
              name="personaTitle"
              value={formData.personaTitle}
              onChange={handleInputChange}
              placeholder="e.g., VP of Sales, CTO"
              className="bg-[#1a1a1a] border-gray-800"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="painPoints">Key Pain Points</Label>
            <Textarea
              id="painPoints"
              name="painPoints"
              value={formData.painPoints}
              onChange={handleInputChange}
              placeholder="What problems does your ideal customer face?"
              className="bg-[#1a1a1a] border-gray-800"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="goals">Goals</Label>
            <Textarea
              id="goals"
              name="goals"
              value={formData.goals}
              onChange={handleInputChange}
              placeholder="What are their main business goals?"
              className="bg-[#1a1a1a] border-gray-800"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="challenges">Challenges</Label>
            <Textarea
              id="challenges"
              name="challenges"
              value={formData.challenges}
              onChange={handleInputChange}
              placeholder="What challenges do they face in achieving their goals?"
              className="bg-[#1a1a1a] border-gray-800"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Budget Range</Label>
            <Input
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              placeholder="e.g., $10,000 - $50,000"
              className="bg-[#1a1a1a] border-gray-800"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="decisionProcess">Decision Process</Label>
            <Textarea
              id="decisionProcess"
              name="decisionProcess"
              value={formData.decisionProcess}
              onChange={handleInputChange}
              placeholder="How do they make purchasing decisions?"
              className="bg-[#1a1a1a] border-gray-800"
              required
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="border-gray-800 hover:bg-[#1a1a1a]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#2dd4bf] hover:bg-[#14b8a6] text-black"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create ICP"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
} 