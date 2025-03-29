import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Mail, Target, Zap, Star, Check } from "lucide-react"

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
                  className="bg-white text-black hover:bg-gray-100 rounded-full"
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

                        <Button variant="outline" size="sm" className="w-full text-xs bg-white text-black hover:bg-gray-100">
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

                        <Button variant="outline" className="w-full justify-start text-sm bg-white text-black hover:bg-gray-100">
                          <Mail className="mr-2 h-4 w-4" />
                          Analyze Email
                        </Button>

                        <Button variant="outline" className="w-full justify-start text-sm bg-white text-black hover:bg-gray-100">
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

        {/* Testimonials Section */}
        <section id="testimonials" className="container mx-auto px-4 py-20 bg-[#0a0a0a]">
          <div className="text-center mb-16">
            <div className="inline-block bg-[#1a1a1a] text-[#7c3aed] text-xs font-medium px-3 py-1 rounded-full mb-4">
              Testimonials
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Sales Professionals</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              See what our users are saying about how WhisperSales AI has transformed their cold email strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#111111] p-6 rounded-xl border border-gray-800 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Star className="h-4 w-4 text-[#f59e0b]" />
                <Star className="h-4 w-4 text-[#f59e0b]" />
                <Star className="h-4 w-4 text-[#f59e0b]" />
                <Star className="h-4 w-4 text-[#f59e0b]" />
                <Star className="h-4 w-4 text-[#f59e0b]" />
              </div>
              <p className="text-gray-300 mb-6">
                "WhisperSales AI has completely transformed our outreach strategy. Our response rates have increased by
                35% since we started using it to analyze our cold emails."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2dd4bf]/20 flex items-center justify-center text-[#2dd4bf]">
                  <span className="font-bold">JD</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Jessica Davis</p>
                  <p className="text-xs text-gray-400">Sales Director, TechCorp</p>
                </div>
              </div>
            </div>

            <div className="bg-[#111111] p-6 rounded-xl border border-gray-800 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Star className="h-4 w-4 text-[#f59e0b]" />
                <Star className="h-4 w-4 text-[#f59e0b]" />
                <Star className="h-4 w-4 text-[#f59e0b]" />
                <Star className="h-4 w-4 text-[#f59e0b]" />
                <Star className="h-4 w-4 text-[#f59e0b]" />
              </div>
              <p className="text-gray-300 mb-6">
                "The ICP builder is a game-changer. It helped us really understand our target audience and craft
                messages that speak directly to their pain points. Worth every penny."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#7c3aed]/20 flex items-center justify-center text-[#7c3aed]">
                  <span className="font-bold">MR</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Michael Rodriguez</p>
                  <p className="text-xs text-gray-400">Growth Lead, Startup Inc</p>
                </div>
              </div>
            </div>

            <div className="bg-[#111111] p-6 rounded-xl border border-gray-800 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Star className="h-4 w-4 text-[#f59e0b]" />
                <Star className="h-4 w-4 text-[#f59e0b]" />
                <Star className="h-4 w-4 text-[#f59e0b]" />
                <Star className="h-4 w-4 text-[#f59e0b]" />
                <Star className="h-4 w-4 text-[#f59e0b]" />
              </div>
              <p className="text-gray-300 mb-6">
                "As a sales coach, I recommend WhisperSales AI to all my clients. The detailed feedback it provides
                helps sales reps learn and improve with every email they write."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#f59e0b]/20 flex items-center justify-center text-[#f59e0b]">
                  <span className="font-bold">SL</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Sarah Lee</p>
                  <p className="text-xs text-gray-400">Sales Coach, SalesPro</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <div className="inline-block bg-[#1a1a1a] text-[#2dd4bf] text-xs font-medium px-3 py-1 rounded-full mb-4">
              Pricing
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Choose the plan that fits your needs. No hidden fees or long-term commitments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-[#111111] rounded-xl border border-gray-800 shadow-sm overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Free Plan</h3>
                <div className="flex items-end gap-1 mb-4">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-gray-400 mb-1">/month</span>
                </div>
                <p className="text-gray-300 mb-6">Perfect for individuals just getting started with cold emails.</p>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#2dd4bf] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">5 email analyses per month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#2dd4bf] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">3 ICPs maximum</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#2dd4bf] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Basic AI suggestions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#2dd4bf] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Email performance tracking</span>
                  </li>
                </ul>

                <Button className="w-full bg-[#2dd4bf] hover:bg-[#14b8a6] text-black rounded-full">Get Started</Button>
              </div>
            </div>

            <div className="bg-[#111111] rounded-xl border border-[#7c3aed] shadow-sm overflow-hidden relative">
              <div className="absolute top-0 right-0 bg-[#7c3aed] text-white text-xs px-3 py-1 rounded-bl-lg">
                Most Popular
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Pro Plan</h3>
                <div className="flex items-end gap-1 mb-4">
                  <span className="text-4xl font-bold">$29</span>
                  <span className="text-gray-400 mb-1">/month</span>
                </div>
                <p className="text-gray-300 mb-6">
                  For sales professionals who want to maximize their outreach effectiveness.
                </p>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#7c3aed] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">50 email analyses per month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#7c3aed] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Unlimited ICPs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#7c3aed] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Advanced AI suggestions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#7c3aed] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Detailed performance analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#7c3aed] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Email template library</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#7c3aed] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Priority support</span>
                  </li>
                </ul>

                <Button className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-full">Upgrade to Pro</Button>
              </div>
            </div>

            <div className="bg-[#111111] rounded-xl border border-gray-800 shadow-sm overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Enterprise Plan</h3>
                <div className="flex items-end gap-1 mb-4">
                  <span className="text-4xl font-bold">$99</span>
                  <span className="text-gray-400 mb-1">/month</span>
                </div>
                <p className="text-gray-300 mb-6">For teams and organizations with high-volume outreach needs.</p>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#f59e0b] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Unlimited email analyses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#f59e0b] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Unlimited ICPs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#f59e0b] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Premium AI suggestions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#f59e0b] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Advanced analytics dashboard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#f59e0b] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Custom email templates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#f59e0b] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Dedicated account manager</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#f59e0b] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">API access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#f59e0b] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Team collaboration features</span>
                  </li>
                </ul>

                <Button className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-black rounded-full">Contact Sales</Button>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-300 mb-4">Need a custom solution for your specific requirements?</p>
            <Button variant="outline" className="bg-white text-black hover:bg-gray-100 rounded-full">
              Schedule a Consultation
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

