"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ArrowLeft, ArrowRight, Check, Target } from "lucide-react"

const STEPS = [
  {
    id: "basics",
    title: "Basic Information",
    fields: ["industry", "companySize"],
  },
  {
    id: "persona",
    title: "Target Persona",
    fields: ["personaTitle", "personaResponsibilities"],
  },
  {
    id: "pain",
    title: "Pain Points",
    fields: ["painPoints", "goals"],
  },
  {
    id: "review",
    title: "Review & Save",
    fields: [],
  },
]

export default function NewICPPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    companySize: "",
    personaTitle: "",
    personaResponsibilities: "",
    painPoints: "",
    goals: "",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Save ICP and redirect
      console.log("Saving ICP:", formData)
      router.push("/dashboard")
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
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
        <Button variant="outline" onClick={() => router.push("/dashboard")} className="border-gray-800">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Cancel
        </Button>
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
                    className="bg-[#1a1a1a] border-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select value={formData.industry} onValueChange={(value) => handleChange("industry", value)}>
                    <SelectTrigger id="industry" className="bg-[#1a1a1a] border-gray-700">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="saas">SaaS / Software</SelectItem>
                      <SelectItem value="finance">Finance / Banking</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="ecommerce">E-commerce / Retail</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companySize">Company Size</Label>
                  <Select value={formData.companySize} onValueChange={(value) => handleChange("companySize", value)}>
                    <SelectTrigger id="companySize" className="bg-[#1a1a1a] border-gray-700">
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="501-1000">501-1000 employees</SelectItem>
                      <SelectItem value="1000+">1000+ employees</SelectItem>
                    </SelectContent>
                  </Select>
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
                    className="bg-[#1a1a1a] border-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="personaResponsibilities">Key Responsibilities</Label>
                  <Textarea
                    id="personaResponsibilities"
                    placeholder="What are their main responsibilities and priorities?"
                    value={formData.personaResponsibilities}
                    onChange={(e) => handleChange("personaResponsibilities", e.target.value)}
                    className="min-h-[120px] bg-[#1a1a1a] border-gray-700"
                  />
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
                    className="min-h-[120px] bg-[#1a1a1a] border-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goals">Goals & Motivations</Label>
                  <Textarea
                    id="goals"
                    placeholder="What are they trying to achieve? What motivates them?"
                    value={formData.goals}
                    onChange={(e) => handleChange("goals", e.target.value)}
                    className="min-h-[120px] bg-[#1a1a1a] border-gray-700"
                  />
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
              disabled={!isStepComplete()}
              className={`${currentStep === STEPS.length - 1 ? "bg-[#2dd4bf] hover:bg-[#14b8a6]" : "bg-[#2dd4bf] hover:bg-[#14b8a6]"} text-black`}
            >
              {currentStep === STEPS.length - 1 ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Save ICP
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

