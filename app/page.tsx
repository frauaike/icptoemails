import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Mail, Target, Zap } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen text-white">
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-[#2dd4bf]" />
          <span className="text-xl font-bold">WhisperSales</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium text-gray-300 hover:text-[#2dd4bf]">
            Features
          </Link>
          <Link href="#pricing" className="text-sm font-medium text-gray-300 hover:text-[#2dd4bf]">
            Pricing
          </Link>
          <Link href="#testimonials" className="text-sm font-medium text-gray-300 hover:text-[#2dd4bf]">
            Testimonials
          </Link>
        </nav>
        <div className="flex gap-4">
          <Link href="/login">
            <Button variant="ghost" className="text-gray-300 hover:text-[#2dd4bf]">
              Log In
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-[#2dd4bf] hover:bg-[#14b8a6] text-black rounded-full">Sign Up</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 py-20 relative">
          <div className="absolute top-10 left-10">
            <div className="bg-[#7c3aed] text-white text-xs px-4 py-2 rounded-full">AI-Powered</div>
          </div>

          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              <div className="inline-block relative">
                <div className="absolute inset-0 bg-[#7c3aed] rounded-[2rem] rounded-l-lg"></div>
                <span className="relative px-6 py-1 text-white">Take Control</span>
              </div>
              <span> of Your Cold Emails </span>
              <span>with WhisperSales</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
              Build your ideal customer profile and test your messaging before sending. Get actionable feedback in
              seconds.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/signup">
                <Button size="lg" className="bg-[#2dd4bf] hover:bg-[#14b8a6] text-black px-8 rounded-full">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-gray-300 border-gray-700 hover:bg-gray-800 rounded-full"
                >
                  See Demo
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-10 -left-10 w-20 h-20 bg-[#2dd4bf]/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-[#7c3aed]/10 rounded-full blur-xl"></div>

            <div className="relative bg-[#111111] rounded-2xl shadow-xl overflow-hidden border border-gray-800">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2dd4bf] via-[#7c3aed] to-[#f59e0b]"></div>
              <div className="p-1">
                <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-800">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs text-gray-400 mx-auto pr-6">WhisperSales Dashboard</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
                  <div className="md:col-span-2 space-y-4">
                    <div className="bg-[#1a1a1a] p-4 rounded-xl">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium">Recent ICPs</h3>
                        <Button variant="ghost" size="sm" className="h-8 text-xs text-[#2dd4bf] hover:text-[#14b8a6]">
                          View All
                        </Button>
                      </div>

                      <div className="space-y-3">
                        <div className="bg-[#111111] p-3 rounded-lg border border-gray-800 flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#2dd4bf]/20 flex items-center justify-center text-[#2dd4bf]">
                              <Target className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">Enterprise SaaS Decision Makers</p>
                              <p className="text-xs text-gray-400">VP of Sales · 201-500 employees</p>
                            </div>
                          </div>
                          <div className="bg-[#2dd4bf] text-black text-xs px-2 py-1 rounded-full">Active</div>
                        </div>

                        <div className="bg-[#111111] p-3 rounded-lg border border-gray-800 flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#7c3aed]/20 flex items-center justify-center text-[#7c3aed]">
                              <Target className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">E-commerce Marketing Leaders</p>
                              <p className="text-xs text-gray-400">Marketing Director · 51-200 employees</p>
                            </div>
                          </div>
                          <div className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">Draft</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#1a1a1a] p-4 rounded-xl">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium">Email Analysis</h3>
                        <div className="bg-[#2dd4bf] text-black text-xs px-2 py-1 rounded-full">3 Credits Left</div>
                      </div>

                      <div className="bg-[#111111] p-4 rounded-lg border border-gray-800">
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-[#2dd4bf]" />
                            <p className="font-medium text-sm">Latest Analysis</p>
                          </div>
                          <div className="text-xs text-gray-400">2 hours ago</div>
                        </div>

                        <div className="mb-3">
                          <div className="flex justify-between items-center mb-1">
                            <p className="text-xs text-gray-400">Resonance Score</p>
                            <p className="text-xs font-medium">65/100</p>
                          </div>
                          <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-[#f59e0b] rounded-full" style={{ width: "65%" }}></div>
                          </div>
                        </div>

                        <p className="text-xs text-gray-300 line-clamp-2 mb-3">
                          "I noticed that [Company] has been growing rapidly, and I wanted to reach out about how our
                          sales enablement platform could help your team hit their targets more consistently..."
                        </p>

                        <Button variant="outline" size="sm" className="w-full text-xs border-gray-700">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-[#1a1a1a] p-4 rounded-xl">
                      <h3 className="font-medium mb-4">Quick Actions</h3>

                      <div className="space-y-2">
                        <Button className="w-full justify-start text-sm bg-[#2dd4bf] hover:bg-[#14b8a6] text-black">
                          <Target className="mr-2 h-4 w-4" />
                          Create New ICP
                        </Button>

                        <Button variant="outline" className="w-full justify-start text-sm border-gray-700">
                          <Mail className="mr-2 h-4 w-4" />
                          Analyze Email
                        </Button>

                        <Button variant="outline" className="w-full justify-start text-sm border-gray-700">
                          <Zap className="mr-2 h-4 w-4" />
                          View Templates
                        </Button>
                      </div>
                    </div>

                    <div className="bg-[#1a1a1a] p-4 rounded-xl">
                      <h3 className="font-medium mb-3">Performance</h3>

                      <div className="aspect-square bg-[#111111] rounded-lg border border-gray-800 p-4 flex items-center justify-center">
                        <div className="relative w-32 h-32">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <p className="text-3xl font-bold text-[#2dd4bf]">42%</p>
                              <p className="text-xs text-gray-400">Avg. Response Rate</p>
                            </div>
                          </div>
                          <svg className="w-full h-full" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="40" fill="none" stroke="#333333" strokeWidth="10" />
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              fill="none"
                              stroke="#2dd4bf"
                              strokeWidth="10"
                              strokeDasharray="251.2"
                              strokeDashoffset="145.7"
                              transform="rotate(-90 50 50)"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 transform rotate-6">
              <div className="bg-[#111111] rounded-xl shadow-lg p-4 border border-gray-800 w-48">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#2dd4bf]"></div>
                  <p className="text-xs font-medium">AI Suggestion</p>
                </div>
                <p className="text-xs text-gray-300">
                  Try personalizing your opening line with a specific company achievement.
                </p>
              </div>
            </div>

            <div className="absolute -top-6 -left-6 transform -rotate-3">
              <div className="bg-[#111111] rounded-xl shadow-lg p-4 border border-gray-800 w-48">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#7c3aed]"></div>
                  <p className="text-xs font-medium">ICP Insight</p>
                </div>
                <p className="text-xs text-gray-300">VPs of Sales prioritize reducing sales cycles by 30%.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <div className="inline-block bg-[#1a1a1a] text-[#2dd4bf] text-xs font-medium px-3 py-1 rounded-full mb-4">
              Features
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your Workflow,
              <br />
              Reimagined with AI
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              WhisperSales AI helps you craft cold emails that resonate with your ideal customers, increasing your
              chances of getting a response.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#111111] p-6 rounded-xl border border-gray-800 shadow-sm">
              <div className="bg-[#2dd4bf]/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-[#2dd4bf]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">ICP Builder</h3>
              <p className="text-gray-300 mb-4">
                Create detailed ideal customer profiles through a simple questionnaire. Understand who you're targeting.
              </p>
              <p className="text-sm text-[#2dd4bf] font-medium">Boost targeting accuracy up to 85%</p>
            </div>

            <div className="bg-[#111111] p-6 rounded-xl border border-gray-800 shadow-sm">
              <div className="bg-[#7c3aed]/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-[#7c3aed]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email Analyzer</h3>
              <p className="text-gray-300 mb-4">
                Test your cold emails against your ICPs before sending them. Get a resonance score and actionable
                feedback.
              </p>
              <p className="text-sm text-[#7c3aed] font-medium">Achieve a balanced tone/value mix</p>
            </div>

            <div className="bg-[#111111] p-6 rounded-xl border border-gray-800 shadow-sm">
              <div className="bg-[#f59e0b]/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-[#f59e0b]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Suggestions</h3>
              <p className="text-gray-300 mb-4">
                Receive AI-powered suggestions to improve your messaging and increase your chances of getting a
                response.
              </p>
              <p className="text-sm text-[#f59e0b] font-medium">Reduce procrastination by 50%</p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20">
          <div className="bg-gradient-to-r from-[#2dd4bf] to-[#7c3aed] rounded-3xl p-10 text-black text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Streamline Your
              <br />
              Cold Email Workflow?
            </h2>
            <p className="text-black/80 max-w-2xl mx-auto mb-8">
              Join thousands of sales professionals who are using WhisperSales AI to improve their cold email
              performance.
            </p>
            <Button size="lg" className="bg-black text-white hover:bg-gray-900 rounded-full px-8">
              Get Started Today
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-medium mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-gray-400 hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-400 hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-400 hover:text-white">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-gray-400 hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-400 hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-400 hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-gray-400 hover:text-white">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-400 hover:text-white">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-gray-400 hover:text-white">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-400 hover:text-white">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Zap className="h-6 w-6 text-[#2dd4bf]" />
              <span className="text-xl font-bold">WhisperSales</span>
            </div>
            <p className="text-sm text-gray-400">© {new Date().getFullYear()} WhisperSales AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

