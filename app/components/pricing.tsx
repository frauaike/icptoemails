import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started with cold email optimization.",
    features: [
      "Up to 5 ICPs",
      "10 email analyses per month",
      "Basic email templates",
      "Email performance tracking",
    ],
    cta: "Get Started",
    href: "/signup",
    popular: false,
  },
  {
    name: "Pro",
    price: "$49",
    description: "For sales teams and professionals who need more power.",
    features: [
      "Unlimited ICPs",
      "100 email analyses per month",
      "Advanced email templates",
      "Detailed performance analytics",
      "Team collaboration",
      "Priority support",
    ],
    cta: "Start Free Trial",
    href: "/signup",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations with custom requirements.",
    features: [
      "Everything in Pro",
      "Custom ICP templates",
      "API access",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    href: "/contact",
    popular: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose the plan that best fits your needs. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-[#1a1a1a] p-8 rounded-xl border ${
                plan.popular ? "border-[#2dd4bf]" : "border-gray-800"
              } relative`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-[#2dd4bf] text-black text-sm px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold mb-4">{plan.price}</div>
                <p className="text-gray-400">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-[#2dd4bf]" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-[#2dd4bf] hover:bg-[#14b8a6] text-black"
                    : "bg-transparent border border-gray-700 hover:bg-gray-800"
                }`}
                asChild
              >
                <a href={plan.href}>{plan.cta}</a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 