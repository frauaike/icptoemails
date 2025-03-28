// Mock ICPs
export const mockICPs = [
  {
    id: "icp1",
    name: "Enterprise SaaS Decision Makers",
    industry: "SaaS / Software",
    companySize: "201-500 employees",
    personaTitle: "VP of Sales",
    personaResponsibilities:
      "Responsible for hitting revenue targets, managing sales teams, and implementing sales strategies and tools.",
    painPoints: "Struggling with long sales cycles, low conversion rates, and inefficient sales processes.",
    goals: "Increase sales efficiency, shorten sales cycles, and improve team performance metrics.",
  },
  {
    id: "icp2",
    name: "E-commerce Marketing Leaders",
    industry: "E-commerce / Retail",
    companySize: "51-200 employees",
    personaTitle: "Marketing Director",
    personaResponsibilities:
      "Oversees all marketing initiatives, customer acquisition strategies, and conversion optimization.",
    painPoints:
      "High customer acquisition costs, low retention rates, and difficulty standing out in a crowded market.",
    goals: "Reduce CAC, increase customer lifetime value, and improve marketing ROI.",
  },
  {
    id: "icp3",
    name: "Healthcare IT Decision Makers",
    industry: "Healthcare",
    companySize: "501-1000 employees",
    personaTitle: "CTO / CIO",
    personaResponsibilities:
      "Responsible for technology infrastructure, security compliance, and digital transformation initiatives.",
    painPoints:
      "Balancing security/compliance requirements with innovation, legacy system integration, and budget constraints.",
    goals:
      "Modernize infrastructure while maintaining compliance, improve patient data security, and reduce operational costs.",
  },
]

// Mock Analysis Results
export const mockAnalysisResults = [
  {
    id: "analysis1",
    icpId: "icp1",
    icpName: "Enterprise SaaS Decision Makers",
    originalEmail:
      "Subject: Boost Your Sales Team's Performance\n\nHi [Name],\n\nI noticed that [Company] has been growing rapidly, and I wanted to reach out about how our sales enablement platform could help your team hit their targets more consistently.\n\nOur clients typically see a 30% increase in close rates within the first 90 days. Would you be open to a quick 15-minute call this week to discuss how we might be able to help?\n\nBest,\n[Your Name]",
    score: 65,
    feedback: {
      strengths: [
        "Good focus on results (30% increase in close rates)",
        "Keeps the email concise and to the point",
        "Clear call to action with specific time commitment",
      ],
      weaknesses: [
        "Lacks personalization specific to the recipient's challenges",
        "Doesn't address the pain point of long sales cycles mentioned in the ICP",
        "Value proposition is generic and could apply to many sales tools",
      ],
    },
    suggestedRewrite:
      "Subject: Cutting [Company]'s Sales Cycles by 30%\n\nHi [Name],\n\nI was reading about [Company]'s recent expansion and noticed your team has grown by 40% this year - impressive growth that often comes with scaling challenges in the sales process.\n\nMany VPs of Sales we work with at companies like [Similar Company] found their sales cycles stretching longer as they scaled, with new reps taking months to reach full productivity.\n\nOur sales enablement platform has helped them reduce sales cycles by 30% and get new reps productive within weeks instead of months. [Reference Customer] specifically cut their enterprise sales cycle from 90 days to 62.\n\nWould you be open to a focused 15-minute call this Thursday to discuss how we might help address these specific challenges at [Company]?\n\nBest,\n[Your Name]",
  },
]

// Mock Analysis Result (single)
export const mockAnalysisResult = {
  id: "analysis1",
  icpId: "icp1",
  icpName: "Enterprise SaaS Decision Makers",
  originalEmail:
    "Subject: Boost Your Sales Team's Performance\n\nHi [Name],\n\nI noticed that [Company] has been growing rapidly, and I wanted to reach out about how our sales enablement platform could help your team hit their targets more consistently.\n\nOur clients typically see a 30% increase in close rates within the first 90 days. Would you be open to a quick 15-minute call this week to discuss how we might be able to help?\n\nBest,\n[Your Name]",
  score: 65,
  feedback: {
    strengths: [
      "Good focus on results (30% increase in close rates)",
      "Keeps the email concise and to the point",
      "Clear call to action with specific time commitment",
    ],
    weaknesses: [
      "Lacks personalization specific to the recipient's challenges",
      "Doesn't address the pain point of long sales cycles mentioned in the ICP",
      "Value proposition is generic and could apply to many sales tools",
    ],
  },
  suggestedRewrite:
    "Subject: Cutting [Company]'s Sales Cycles by 30%\n\nHi [Name],\n\nI was reading about [Company]'s recent expansion and noticed your team has grown by 40% this year - impressive growth that often comes with scaling challenges in the sales process.\n\nMany VPs of Sales we work with at companies like [Similar Company] found their sales cycles stretching longer as they scaled, with new reps taking months to reach full productivity.\n\nOur sales enablement platform has helped them reduce sales cycles by 30% and get new reps productive within weeks instead of months. [Reference Customer] specifically cut their enterprise sales cycle from 90 days to 62.\n\nWould you be open to a focused 15-minute call this Thursday to discuss how we might help address these specific challenges at [Company]?\n\nBest,\n[Your Name]",
}

