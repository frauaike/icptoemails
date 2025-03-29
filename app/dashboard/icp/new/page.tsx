"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { ArrowLeft, ArrowRight, Check, Target } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { toast } from "sonner"
import { z } from "zod"

const STEPS = [
  {
    title: "Basic Information",
    fields: ["name", "industry", "companySize"],
  },
  {
    title: "Target Persona",
    fields: ["personaTitle", "personaResponsibilities"],
  },
  {
    title: "Pain Points & Goals",
    fields: ["painPoints", "goals", "challenges"],
  },
  {
    title: "Review & Save",
    fields: [],
  },
]

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

export default function NewICPPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState(() => {
    // Try to load draft from localStorage
    if (typeof window !== 'undefined') {
      const draft = localStorage.getItem('icp_draft')
      if (draft) {
        return JSON.parse(draft)
      }
    }
    return {
      name: "",
      industry: "",
      companySize: "",
      personaTitle: "",
      personaResponsibilities: "",
      painPoints: "",
      goals: "",
      challenges: "",
      budget: "",
      decisionProcess: "",
    }
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  // Auto-save draft when form data changes
  useEffect(() => {
    const saveDraft = () => {
      localStorage.setItem('icp_draft', JSON.stringify(formData))
      setLastSaved(new Date())
    }
    
    const timeoutId = setTimeout(saveDraft, 1000) // Debounce for 1 second
    return () => clearTimeout(timeoutId)
  }, [formData])

  const handleChange = (field: string, value: string) => {
    setFormData((prev: typeof formData) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const clearDraft = () => {
    localStorage.removeItem('icp_draft')
    setLastSaved(null)
  }

  const validateStep = () => {
    const currentFields = STEPS[currentStep].fields
    const stepData = currentFields.reduce((acc, field) => {
      acc[field] = formData[field as keyof typeof formData]
      return acc
    }, {} as Record<string, string>)

    try {
      const pickFields = currentFields.reduce((acc, field) => {
        acc[field as keyof typeof icpSchema.shape] = true
        return acc
      }, {} as { [K in keyof typeof icpSchema.shape]?: true })
      
      icpSchema.pick(pickFields).parse(stepData)
      setErrors({})
      return true
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
      return false
    }
  }

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      if (validateStep()) {
        setCurrentStep(currentStep + 1)
      } else {
        toast.error("Please fix the errors before proceeding")
      }
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    if (!validateStep()) {
      toast.error("Please fix the errors before submitting")
      return
    }

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
        const error = await response.json()
        throw new Error(error.detail || "Failed to create ICP")
      }

      const data = await response.json()
      clearDraft() // Clear draft after successful submission
      toast.success("ICP created successfully!")
      router.push(`/dashboard/icp/${data.id}`)
    } catch (error) {
      console.error("Error creating ICP:", error)
      toast.error(error instanceof Error ? error.message : "Failed to create ICP")
    } finally {
      setIsSubmitting(false)
    }
  }

  const isStepComplete = () => {
    const currentFields = STEPS[currentStep].fields
    if (currentStep === 0 && !formData.name) return false
    if (currentStep === STEPS.length - 1) return true

    return currentFields.every((field) => formData[field as keyof typeof formData])
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Create New ICP" text="Define your ideal customer profile in a few simple steps.">
        <div className="flex items-center gap-4">
          {lastSaved && (
            <span className="text-sm text-gray-400">
              Last saved: {lastSaved.toLocaleTimeString()}
            </span>
          )}
          <Button variant="outline" onClick={() => router.push("/dashboard")} className="border-gray-800">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Cancel
          </Button>
        </div>
      </DashboardHeader>

      <div className="flex justify-center w-full">
        <Card className="w-full max-w-3xl bg-[#111111] rounded-xl border border-gray-800 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-[#2dd4bf]/20 flex items-center justify-center text-[#2dd4bf]">
                <Target className="h-4 w-4" />
              </div>
              <CardTitle>
                Step {currentStep + 1}: {STEPS[currentStep].title}
              </CardTitle>
            </div>
            <CardDescription>
              {currentStep === 0 && "Let's start with some basic information about your ideal customer."}
              {currentStep === 1 && "Who are you targeting within the organization?"}
              {currentStep === 2 && "What problems do they face that your solution addresses?"}
              {currentStep === 3 && "Review your ICP details before saving."}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {currentStep === 0 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">ICP Name</Label>
                  <Input
                    id="name"
                    placeholder="E.g., Enterprise SaaS Decision Makers"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className={`bg-[#1a1a1a] border-gray-700 ${errors.name ? "border-red-500" : ""}`}
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select value={formData.industry} onValueChange={(value) => handleChange("industry", value)}>
                    <SelectTrigger id="industry" className={`bg-[#1a1a1a] border-gray-700 ${errors.industry ? "border-red-500" : ""}`}>
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
                  {errors.industry && <p className="text-sm text-red-500">{errors.industry}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companySize">Company Size</Label>
                  <Select value={formData.companySize} onValueChange={(value) => handleChange("companySize", value)}>
                    <SelectTrigger id="companySize" className={`bg-[#1a1a1a] border-gray-700 ${errors.companySize ? "border-red-500" : ""}`}>
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
                  {errors.companySize && <p className="text-sm text-red-500">{errors.companySize}</p>}
                </div>
              </>
            )}

            {currentStep === 1 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="personaTitle">Job Title / Role</Label>
                  <Input
                    id="personaTitle"
                    placeholder="E.g., VP of Sales, Marketing Director"
                    value={formData.personaTitle}
                    onChange={(e) => handleChange("personaTitle", e.target.value)}
                    className={`bg-[#1a1a1a] border-gray-700 ${errors.personaTitle ? "border-red-500" : ""}`}
                  />
                  {errors.personaTitle && <p className="text-sm text-red-500">{errors.personaTitle}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="personaResponsibilities">Key Responsibilities</Label>
                  <Textarea
                    id="personaResponsibilities"
                    placeholder="What are their main responsibilities and priorities?"
                    value={formData.personaResponsibilities}
                    onChange={(e) => handleChange("personaResponsibilities", e.target.value)}
                    className={`min-h-[120px] bg-[#1a1a1a] border-gray-700 ${errors.personaResponsibilities ? "border-red-500" : ""}`}
                  />
                  {errors.personaResponsibilities && <p className="text-sm text-red-500">{errors.personaResponsibilities}</p>}
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="painPoints">Pain Points</Label>
                  <Textarea
                    id="painPoints"
                    placeholder="What challenges or problems do they face?"
                    value={formData.painPoints}
                    onChange={(e) => handleChange("painPoints", e.target.value)}
                    className={`min-h-[120px] bg-[#1a1a1a] border-gray-700 ${errors.painPoints ? "border-red-500" : ""}`}
                  />
                  {errors.painPoints && <p className="text-sm text-red-500">{errors.painPoints}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goals">Goals & Motivations</Label>
                  <Textarea
                    id="goals"
                    placeholder="What are they trying to achieve? What motivates them?"
                    value={formData.goals}
                    onChange={(e) => handleChange("goals", e.target.value)}
                    className={`min-h-[120px] bg-[#1a1a1a] border-gray-700 ${errors.goals ? "border-red-500" : ""}`}
                  />
                  {errors.goals && <p className="text-sm text-red-500">{errors.goals}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="challenges">Challenges</Label>
                  <Textarea
                    id="challenges"
                    placeholder="What challenges do they face in achieving their goals?"
                    value={formData.challenges}
                    onChange={(e) => handleChange("challenges", e.target.value)}
                    className={`min-h-[120px] bg-[#1a1a1a] border-gray-700 ${errors.challenges ? "border-red-500" : ""}`}
                  />
                  {errors.challenges && <p className="text-sm text-red-500">{errors.challenges}</p>}
                </div>
              </>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="bg-[#1a1a1a] p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">{formData.name}</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Industry</p>
                      <p className="text-white">{formData.industry}</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-400">Company Size</p>
                      <p className="text-white">{formData.companySize}</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-400">Target Role</p>
                      <p className="text-white">{formData.personaTitle}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-400">Responsibilities</p>
                    <p className="text-white">{formData.personaResponsibilities}</p>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-400">Pain Points</p>
                    <p className="text-white">{formData.painPoints}</p>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-400">Goals & Motivations</p>
                    <p className="text-white">{formData.goals}</p>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-400">Challenges</p>
                    <p className="text-white">{formData.challenges}</p>
                  </div>
                </div>

                <div className="bg-[#2dd4bf]/10 p-4 rounded-lg border border-[#2dd4bf]/30">
                  <h4 className="font-medium text-[#2dd4bf] mb-2">Persona Quote</h4>
                  <p className="italic text-gray-300">
                    "I need to {formData.goals.split(" ").slice(0, 8).join(" ")}... without wasting time on{" "}
                    {formData.painPoints.split(" ").slice(0, 6).join(" ")}..."
                  </p>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleBack} disabled={currentStep === 0} className="border-gray-800">
              Back
            </Button>

            <Button
              onClick={handleNext}
              disabled={!isStepComplete() || isSubmitting}
              className={`${
                currentStep === STEPS.length - 1 ? "bg-[#2dd4bf] hover:bg-[#14b8a6]" : "bg-[#2dd4bf] hover:bg-[#14b8a6]"
              } text-black`}
            >
              {currentStep === STEPS.length - 1 ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Saving..." : "Save ICP"}
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardShell>
  )
}

