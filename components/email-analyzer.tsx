"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Mail, Sparkles } from "lucide-react"
import { mockAnalysisResults } from "@/lib/mock-data"

export function EmailAnalyzer() {
  return (
    <div className="space-y-8">
      <Card className="bg-[#111111] rounded-xl border border-gray-800 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#7c3aed]/20 flex items-center justify-center text-[#7c3aed]">
              <Sparkles className="h-4 w-4" />
            </div>
            <CardTitle>Analyze a New Email</CardTitle>
          </div>
          <CardDescription>Test your cold email against one of your ICPs to get actionable feedback.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300">
            Paste your cold email and select an ICP to analyze it against. Our AI will provide a resonance score and
            suggestions to improve your messaging.
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white">
            <Link href="/dashboard/analyze/new">
              New Analysis
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>

      {mockAnalysisResults.length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Recent Analyses</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockAnalysisResults.map((analysis) => (
              <Card key={analysis.id} className="bg-[#111111] rounded-xl border border-gray-800 shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#7c3aed]/20 flex items-center justify-center text-[#7c3aed]">
                        <Mail className="h-4 w-4" />
                      </div>
                      <CardTitle className="text-lg">Email Analysis</CardTitle>
                    </div>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        analysis.score >= 70
                          ? "bg-[#2dd4bf]/20 text-[#2dd4bf]"
                          : analysis.score >= 50
                            ? "bg-[#f59e0b]/20 text-[#f59e0b]"
                            : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      Score: {analysis.score}/100
                    </div>
                  </div>
                  <CardDescription>Analyzed against: {analysis.icpName}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs font-medium text-gray-400">Email Preview</p>
                      <p className="text-sm text-gray-300 line-clamp-2">{analysis.originalEmail}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-400">Key Feedback</p>
                      <p className="text-sm text-gray-300 line-clamp-2">{analysis.feedback.weaknesses[0]}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button variant="outline" size="sm" className="w-full border-gray-800 hover:bg-[#1a1a1a]">
                    <Link href={`/dashboard/analyze/results`} className="w-full">
                      View Results
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}

