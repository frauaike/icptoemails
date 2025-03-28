"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ArrowLeft, Mail, Sparkles } from "lucide-react"
import { Label } from "@/components/ui/label"
import { mockICPs } from "@/lib/mock-data"

export default function AnalyzeEmailPage() {
  const router = useRouter()
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [formData, setFormData] = useState({
    icpId: "",
    emailContent: "",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleAnalyze = () => {
    setIsAnalyzing(true)

    // Simulate API call
    setTimeout(() => {
      setIsAnalyzing(false)
      router.push("/dashboard/analyze/results")
    }, 2000)
  }

  const isFormValid = formData.icpId && formData.emailContent.length > 50

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Analyze Cold Email"
        text="Test your cold email against an ICP to get actionable feedback."
      >
        <Button variant="outline" onClick={() => router.push("/dashboard")} className="border-gray-800">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </DashboardHeader>

      <div className="flex justify-center w-full">
        <Card className="w-full max-w-3xl bg-[#111111] rounded-xl border border-gray-800 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-[#7c3aed]/20 flex items-center justify-center text-[#7c3aed]">
                <Mail className="h-4 w-4" />
              </div>
              <CardTitle>Email Analysis</CardTitle>
            </div>
            <CardDescription>Paste your cold email and select an ICP to analyze against.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="icpId">Select ICP</Label>
              <Select value={formData.icpId} onValueChange={(value) => handleChange("icpId", value)}>
                <SelectTrigger id="icpId" className="bg-[#1a1a1a] border-gray-700">
                  <SelectValue placeholder="Choose an ICP to analyze against" />
                </SelectTrigger>
                <SelectContent>
                  {mockICPs.map((icp) => (
                    <SelectItem key={icp.id} value={icp.id}>
                      {icp.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="emailContent">Cold Email Content</Label>
              <Textarea
                id="emailContent"
                placeholder="Paste your cold email here..."
                value={formData.emailContent}
                onChange={(e) => handleChange("emailContent", e.target.value)}
                className="min-h-[250px] bg-[#1a1a1a] border-gray-700"
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button
              onClick={handleAnalyze}
              disabled={!isFormValid || isAnalyzing}
              className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white"
            >
              {isAnalyzing ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Analyze Email
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardShell>
  )
}

