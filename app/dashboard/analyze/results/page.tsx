"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ArrowLeft, CheckCircle, Copy, Edit, Mail, XCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { mockAnalysisResult } from "@/lib/mock-data"

export default function AnalysisResultsPage() {
  const router = useRouter()
  const result = mockAnalysisResult

  return (
    <DashboardShell>
      <DashboardHeader heading="Analysis Results" text="Review the feedback for your cold email.">
        <Button variant="outline" onClick={() => router.push("/dashboard")} className="border-gray-800">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </DashboardHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="bg-[#111111] rounded-xl border border-gray-800 shadow-sm h-full">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#7c3aed]/20 flex items-center justify-center text-[#7c3aed]">
                  <Mail className="h-4 w-4" />
                </div>
                <CardTitle>Email Analysis</CardTitle>
              </div>
              <CardDescription>
                Analyzed against ICP: <span className="font-medium text-[#7c3aed]">{result.icpName}</span>
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Resonance Score</h3>
                  <span
                    className={`text-2xl font-bold ${result.score >= 70 ? "text-[#2dd4bf]" : result.score >= 50 ? "text-[#f59e0b]" : "text-red-500"}`}
                  >
                    {result.score}/100
                  </span>
                </div>
                <Progress
                  value={result.score}
                  className="h-2 bg-gray-800"
                  indicatorClassName={`${result.score >= 70 ? "bg-[#2dd4bf]" : result.score >= 50 ? "bg-[#f59e0b]" : "bg-red-500"}`}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Feedback</h3>

                <div className="space-y-3">
                  {result.feedback.strengths.map((item, index) => (
                    <div key={`strength-${index}`} className="flex gap-2 items-start">
                      <CheckCircle className="h-5 w-5 text-[#2dd4bf] mt-0.5 flex-shrink-0" />
                      <p className="text-gray-300">{item}</p>
                    </div>
                  ))}

                  {result.feedback.weaknesses.map((item, index) => (
                    <div key={`weakness-${index}`} className="flex gap-2 items-start">
                      <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-300">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="bg-gray-800" />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Suggested Improvements</h3>
                <div className="bg-[#7c3aed]/10 p-4 rounded-lg border border-[#7c3aed]/30">
                  <p className="text-gray-300 whitespace-pre-line">{result.suggestedRewrite}</p>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" className="border-gray-800">
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                  <Button size="sm" className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit & Reanalyze
                  </Button>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => router.push("/dashboard/analyze/new")}
                className="border-gray-800"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                New Analysis
              </Button>
              <Button onClick={() => router.push("/dashboard")} className="bg-[#2dd4bf] hover:bg-[#14b8a6] text-black">
                Save Results
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card className="bg-[#111111] rounded-xl border border-gray-800 shadow-sm h-full">
            <CardHeader>
              <CardTitle className="text-base">Original Email</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-700 text-gray-300 text-sm whitespace-pre-line">
                {result.originalEmail}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}

