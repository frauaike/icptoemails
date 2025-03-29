"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Trash2, Copy, Share2, Download, Star, StarOff } from "lucide-react"
import { toast } from "sonner"
import { z } from "zod"

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

const icpSchema = z.object({
  name: z.string()
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z0-9\s\-_]+$/, "Name can only contain letters, numbers, spaces, hyphens, and underscores"),
  industry: z.string()
    .min(1, "Please select an industry")
    .refine((val) => INDUSTRIES.includes(val), "Please select a valid industry"),
  companySize: z.string()
    .min(1, "Please select a company size")
    .refine((val) => COMPANY_SIZES.includes(val), "Please select a valid company size"),
  personaTitle: z.string()
    .min(3, "Job title must be at least 3 characters")
    .max(100, "Job title must be less than 100 characters")
    .regex(/^[a-zA-Z0-9\s\-_]+$/, "Job title can only contain letters, numbers, spaces, hyphens, and underscores"),
  personaResponsibilities: z.string()
    .min(10, "Please provide more details about responsibilities")
    .max(1000, "Responsibilities must be less than 1000 characters")
    .transform((val) => val.trim()),
  painPoints: z.string()
    .min(10, "Please provide more details about pain points")
    .max(1000, "Pain points must be less than 1000 characters")
    .transform((val) => val.trim()),
  goals: z.string()
    .min(10, "Please provide more details about goals")
    .max(1000, "Goals must be less than 1000 characters")
    .transform((val) => val.trim()),
  challenges: z.string()
    .min(10, "Please provide more details about challenges")
    .max(1000, "Challenges must be less than 1000 characters")
    .transform((val) => val.trim()),
})

interface ICP {
  id: number
  name: string
  industry: string
  companySize: string
  personaTitle: string
  personaResponsibilities: string
  painPoints: string
  goals: string
  challenges: string
  createdAt: string
  updatedAt: string | null
  isFavorite?: boolean
}

interface ICPDetailViewProps {
  icp: ICP
  onEdit: () => void
  onDelete: () => void
  onFavoriteToggle: () => void
}

export function ICPDetailView({ icp, onEdit, onDelete, onFavoriteToggle }: ICPDetailViewProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(icp)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleSave = async () => {
    try {
      icpSchema.parse(formData)
      setIsEditing(false)
      // Call your API to save changes
      toast.success("Changes saved successfully")
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message
          }
        })
        setErrors(newErrors)
      }
      toast.error("Failed to save changes")
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(icp, null, 2))
    toast.success("ICP details copied to clipboard")
  }

  const handleShare = async () => {
    try {
      await navigator.share({
        title: icp.name,
        text: `Check out this ICP: ${icp.name}`,
        url: window.location.href,
      })
    } catch (error) {
      console.error("Error sharing:", error)
    }
  }

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(icp, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${icp.name.toLowerCase().replace(/\s+/g, "-")}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="grid gap-6">
      <Card className="bg-[#111111] border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle>{isEditing ? (
                <Input
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className={`bg-[#1a1a1a] border-gray-700 ${errors.name ? "border-red-500" : ""}`}
                />
              ) : (
                icp.name
              )}</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={onFavoriteToggle}
                className="text-yellow-500 hover:text-yellow-400"
              >
                {icp.isFavorite ? <Star className="h-5 w-5" /> : <StarOff className="h-5 w-5" />}
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={handleCopy} className="border-gray-800">
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleShare} className="border-gray-800">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleDownload} className="border-gray-800">
                <Download className="h-4 w-4" />
              </Button>
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(false)} className="border-gray-800">
                    Cancel
                  </Button>
                  <Button onClick={handleSave} className="bg-[#2dd4bf] hover:bg-[#14b8a6] text-black">
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" onClick={onEdit} className="border-gray-800">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={onDelete}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </>
              )}
            </div>
          </div>
          <CardDescription>Core details about your ideal customer profile</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-400">Industry</p>
              {isEditing ? (
                <Select value={formData.industry} onValueChange={(value) => handleChange("industry", value)}>
                  <SelectTrigger className={`bg-[#1a1a1a] border-gray-700 ${errors.industry ? "border-red-500" : ""}`}>
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
              ) : (
                <p className="text-white">{icp.industry}</p>
              )}
              {errors.industry && <p className="text-sm text-red-500">{errors.industry}</p>}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400">Company Size</p>
              {isEditing ? (
                <Select value={formData.companySize} onValueChange={(value) => handleChange("companySize", value)}>
                  <SelectTrigger className={`bg-[#1a1a1a] border-gray-700 ${errors.companySize ? "border-red-500" : ""}`}>
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent>
                    {COMPANY_SIZES.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size} employees
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-white">{icp.companySize}</p>
              )}
              {errors.companySize && <p className="text-sm text-red-500">{errors.companySize}</p>}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Target Role</p>
            {isEditing ? (
              <Input
                value={formData.personaTitle}
                onChange={(e) => handleChange("personaTitle", e.target.value)}
                className={`bg-[#1a1a1a] border-gray-700 ${errors.personaTitle ? "border-red-500" : ""}`}
              />
            ) : (
              <p className="text-white">{icp.personaTitle}</p>
            )}
            {errors.personaTitle && <p className="text-sm text-red-500">{errors.personaTitle}</p>}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#111111] border-gray-800">
        <CardHeader>
          <CardTitle>Target Persona</CardTitle>
          <CardDescription>Details about the decision maker and their role</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <p className="text-sm font-medium text-gray-400">Key Responsibilities</p>
            {isEditing ? (
              <Textarea
                value={formData.personaResponsibilities}
                onChange={(e) => handleChange("personaResponsibilities", e.target.value)}
                className={`min-h-[120px] bg-[#1a1a1a] border-gray-700 ${errors.personaResponsibilities ? "border-red-500" : ""}`}
              />
            ) : (
              <p className="text-white whitespace-pre-wrap">{icp.personaResponsibilities}</p>
            )}
            {errors.personaResponsibilities && <p className="text-sm text-red-500">{errors.personaResponsibilities}</p>}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#111111] border-gray-800">
        <CardHeader>
          <CardTitle>Pain Points & Goals</CardTitle>
          <CardDescription>Understanding their challenges and objectives</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-sm font-medium text-gray-400">Pain Points</p>
            {isEditing ? (
              <Textarea
                value={formData.painPoints}
                onChange={(e) => handleChange("painPoints", e.target.value)}
                className={`min-h-[120px] bg-[#1a1a1a] border-gray-700 ${errors.painPoints ? "border-red-500" : ""}`}
              />
            ) : (
              <p className="text-white whitespace-pre-wrap">{icp.painPoints}</p>
            )}
            {errors.painPoints && <p className="text-sm text-red-500">{errors.painPoints}</p>}
          </div>

          <div>
            <p className="text-sm font-medium text-gray-400">Goals & Motivations</p>
            {isEditing ? (
              <Textarea
                value={formData.goals}
                onChange={(e) => handleChange("goals", e.target.value)}
                className={`min-h-[120px] bg-[#1a1a1a] border-gray-700 ${errors.goals ? "border-red-500" : ""}`}
              />
            ) : (
              <p className="text-white whitespace-pre-wrap">{icp.goals}</p>
            )}
            {errors.goals && <p className="text-sm text-red-500">{errors.goals}</p>}
          </div>

          <div>
            <p className="text-sm font-medium text-gray-400">Challenges</p>
            {isEditing ? (
              <Textarea
                value={formData.challenges}
                onChange={(e) => handleChange("challenges", e.target.value)}
                className={`min-h-[120px] bg-[#1a1a1a] border-gray-700 ${errors.challenges ? "border-red-500" : ""}`}
              />
            ) : (
              <p className="text-white whitespace-pre-wrap">{icp.challenges}</p>
            )}
            {errors.challenges && <p className="text-sm text-red-500">{errors.challenges}</p>}
          </div>

          <div className="bg-[#2dd4bf]/10 p-4 rounded-lg border border-[#2dd4bf]/30">
            <h4 className="font-medium text-[#2dd4bf] mb-2">Persona Quote</h4>
            <p className="italic text-gray-300">
              "I need to {icp.goals.split(" ").slice(0, 8).join(" ")}... without wasting time on{" "}
              {icp.painPoints.split(" ").slice(0, 6).join(" ")}..."
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#111111] border-gray-800">
        <CardHeader>
          <CardTitle>Metadata</CardTitle>
          <CardDescription>Additional information about this ICP</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-400">Created</p>
              <p className="text-white">{new Date(icp.createdAt).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400">Last Updated</p>
              <p className="text-white">
                {icp.updatedAt ? new Date(icp.updatedAt).toLocaleString() : "Never"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 