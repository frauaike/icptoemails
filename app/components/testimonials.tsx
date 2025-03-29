import { Star } from "lucide-react"

const testimonials = [
  {
    quote: "WhisperSales has transformed how we approach cold emails. The AI-powered analysis is spot-on and has helped us increase our response rates by 40%.",
    author: "Sarah Chen",
    role: "VP of Sales at TechCorp",
    rating: 5,
    image: "/testimonials/sarah.jpg",
  },
  {
    quote: "The ICP creation process is incredibly intuitive. It's like having an expert sales consultant on demand.",
    author: "Michael Rodriguez",
    role: "Sales Director at GrowthLabs",
    rating: 5,
    image: "/testimonials/michael.jpg",
  },
  {
    quote: "The email templates and analysis have saved us countless hours. Our team's productivity has never been better.",
    author: "Emma Thompson",
    role: "Sales Manager at CloudScale",
    rating: 5,
    image: "/testimonials/emma.jpg",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-[#111111]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join thousands of sales professionals who have transformed their cold email strategy with WhisperSales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 hover:border-[#2dd4bf] transition-colors"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-[#2dd4bf] fill-[#2dd4bf]" />
                ))}
              </div>
              <blockquote className="text-gray-300 mb-6">"{testimonial.quote}"</blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#2dd4bf]/10 flex items-center justify-center">
                  <span className="text-[#2dd4bf] font-semibold">
                    {testimonial.author.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <div className="font-medium">{testimonial.author}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 