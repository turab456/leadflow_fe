// Mock Data for LeadFlow SaaS

export const mockIndustries = [
  "SaaS & Software",
  "E-commerce & Retail",
  "Healthcare & Biotech",
  "Real Estate & Construction",
  "Financial Services & Fintech",
  "Professional Services & Consulting",
  "Education & EdTech",
  "Manufacturing & Logistics"
];

export const mockLocations = [
  "New York, NY",
  "San Francisco, CA",
  "Austin, TX",
  "Chicago, IL",
  "Seattle, WA",
  "Boston, MA",
  "Los Angeles, CA",
  "Denver, CO",
  "London, UK",
  "Toronto, ON"
];

export const mockLeads = [
  {
    id: "lead_001",
    name: "Acme Analytics",
    industry: "SaaS & Software",
    website: "acmeanalytics.io",
    size: "51-200 employees",
    revenue: "$15M ARR",
    location: "San Francisco, CA",
    phone: "+1 (555) 234-5678",
    email: "contact@acmeanalytics.io",
    decisionMaker: {
      name: "Sarah Jenkins",
      role: "VP of Growth & Operations",
      email: "sarah.jenkins@acmeanalytics.io",
      linkedin: "linkedin.com/in/sarah-jenkins-growth"
    },
    leadScore: 92,
    status: "Saved",
    websiteStatus: "Needs Audit",
    tags: ["High Value", "Tech Stack Upgrade"],
    description: "Acme Analytics provides real-time event tracking and analytics for mid-market mobile apps. They are currently scaling their marketing operations.",
    auditSummary: {
      mobileResponsive: true,
      ssl: true,
      seoScore: 78,
      accessibility: 65,
      performanceScore: 58,
      loadSpeed: "4.2s",
      lastAudited: "2026-06-18",
      issues: [
        "Slow image compression on homepage (2.1MB)",
        "Missing meta keywords and open graph tags on blog posts",
        "Low contrast ratio on pricing call-to-actions",
        "Render-blocking JavaScript slowing down initial page render"
      ]
    },
    aiInsights: {
      opportunityScore: 95,
      painPoints: "Slow page load speeds are causing high dropoff rates on their trial signup page. Poor accessibility tags limit government procurement compliance.",
      suggestedHook: "Offer website performance and speed optimization to increase trial signup conversions by an estimated 18-22%.",
      valueProp: "Showcase our WebPerf Audits & Optimization package, focusing on their page-speed impact on Google search rankings.",
      recommendedServices: [
        "Core Web Vitals Optimization",
        "CTA Conversion Path Redesign",
        "Accessibility Compliance Review"
      ]
    },
    notes: [
      { id: "n_1", date: "2026-06-19", author: "Alex Rivera", text: "Spoke to Sarah via LinkedIn. She is interested in improving their SEO rankings before their Q3 marketing push." },
      { id: "n_2", date: "2026-06-15", author: "Alex Rivera", text: "Added to saved leads list. High priority target." }
    ],
    tasks: [
      { id: "t_1", title: "Generate custom performance report", status: "Pending", dueDate: "2026-06-22" },
      { id: "t_2", title: "Follow up email to Sarah", status: "Completed", dueDate: "2026-06-19" }
    ],
    activities: [
      { id: "a_1", type: "Note Added", date: "2026-06-19T14:30:00Z", description: "Alex Rivera added a new note about Q3 marketing push." },
      { id: "a_2", type: "Task Completed", date: "2026-06-19T11:15:00Z", description: "Follow up email to Sarah Jenkins completed." },
      { id: "a_3", type: "Audit Completed", date: "2026-06-18T16:45:00Z", description: "Initial website performance audit completed with score 58/100." },
      { id: "a_4", type: "Lead Discovered", date: "2026-06-15T09:00:00Z", description: "Lead discovered via Lead Search and saved to list." }
    ]
  },
  {
    id: "lead_002",
    name: "Nova Commerce",
    industry: "E-commerce & Retail",
    website: "novacommerce.com",
    size: "11-50 employees",
    revenue: "$5M ARR",
    location: "New York, NY",
    phone: "+1 (212) 987-6543",
    email: "info@novacommerce.com",
    decisionMaker: {
      name: "Marcus Chen",
      role: "E-commerce Director",
      email: "marcus.chen@novacommerce.com",
      linkedin: "linkedin.com/in/marcus-chen-ecom"
    },
    leadScore: 84,
    status: "Saved",
    websiteStatus: "Audited",
    tags: ["E-commerce", "Needs SSL Update"],
    description: "Nova Commerce sells premium leather goods direct-to-consumer. Experiencing cart abandonment issues and slow load times on checkout.",
    auditSummary: {
      mobileResponsive: true,
      ssl: false,
      seoScore: 82,
      accessibility: 72,
      performanceScore: 61,
      loadSpeed: "3.8s",
      lastAudited: "2026-06-12",
      issues: [
        "SSL certificate is missing or invalid on checkout subdomain",
        "Duplicate page title elements on product category lists",
        "Large unoptimized hero carousel images",
        "No structured schema markup for products"
      ]
    },
    aiInsights: {
      opportunityScore: 88,
      painPoints: "Lack of SSL certificate triggers browser security warnings, dramatically hurting buyer trust during payment. Checkout speed limits mobile buyers.",
      suggestedHook: "Fix SSL configuration and secure their payment page, followed by implementing structured schemas to win Google shopping snippets.",
      valueProp: "Security-first and performance optimization to capture 15% more mobile buyers and eliminate checkout security warnings.",
      recommendedServices: [
        "SSL Certificate Provisioning & Setup",
        "DTC Checkout Security Hardening",
        "Product Schema Implementation"
      ]
    },
    notes: [
      { id: "n_3", date: "2026-06-13", author: "Alex Rivera", text: "Did a quick test of their shop page. Security warnings are actively blocking Chrome visitors." }
    ],
    tasks: [
      { id: "t_3", title: "Schedule SSL Audit call", status: "Pending", dueDate: "2026-06-25" }
    ],
    activities: [
      { id: "a_5", type: "Audit Completed", date: "2026-06-12T10:30:00Z", description: "Automated audit detected missing SSL certificate." },
      { id: "a_6", type: "Lead Discovered", date: "2026-06-10T14:20:00Z", description: "Lead discovered via Lead Search." }
    ]
  },
  {
    id: "lead_003",
    name: "Apex Healthcare Services",
    industry: "Healthcare & Biotech",
    website: "apexhealth.org",
    size: "201-500 employees",
    revenue: "$45M ARR",
    location: "Austin, TX",
    phone: "+1 (512) 432-1098",
    email: "outpatient@apexhealth.org",
    decisionMaker: {
      name: "Dr. Amanda Ross",
      role: "Chief Medical Officer",
      email: "amanda.ross@apexhealth.org",
      linkedin: "linkedin.com/in/dr-amanda-ross"
    },
    leadScore: 78,
    status: "Saved",
    websiteStatus: "Needs Audit",
    tags: ["Enterprise", "Compliance Required"],
    description: "Apex operates 12 urgent care clinics across Central Texas. Looking to launch a telehealth portal for outpatient consultations.",
    auditSummary: {
      mobileResponsive: false,
      ssl: true,
      seoScore: 61,
      accessibility: 48,
      performanceScore: 45,
      loadSpeed: "5.7s",
      lastAudited: "2026-06-15",
      issues: [
        "Non-responsive layout on mobile screen sizes (critical viewport issues)",
        "Severe accessibility issues (poor screen-reader support, lack of keyboard focus indicators)",
        "Missing descriptive alt text on clinical services images",
        "Extremely slow server response time (TTFB over 2.5 seconds)"
      ]
    },
    aiInsights: {
      opportunityScore: 91,
      painPoints: "Failure to provide mobile-responsive schedules and basic HIPAA/ADA accessibility standards. Potential legal liability and lost patients.",
      suggestedHook: "Demonstrate layout breakages on mobile screens and pitch a HIPAA-compliant mobile portal redesign to secure senior traffic.",
      valueProp: "ADA-compliance and responsive web design built for patient accessibility.",
      recommendedServices: [
        "ADA Accessibility Remediation",
        "Mobile Responsive Redesign",
        "HIPAA Portal UI/UX Advisory"
      ]
    },
    notes: [
      { id: "n_4", date: "2026-06-16", author: "Alex Rivera", text: "Spoke to their marketing manager. They know their mobile booking page is broken but lack developer resources." }
    ],
    tasks: [
      { id: "t_4", title: "Prepare Mobile Layout Comparison slide deck", status: "Pending", dueDate: "2026-06-24" }
    ],
    activities: [
      { id: "a_7", type: "Note Added", date: "2026-06-16T15:20:00Z", description: "Alex Rivera added note regarding broken mobile booking page." },
      { id: "a_8", type: "Audit Completed", date: "2026-06-15T11:00:00Z", description: "Audit completed with low mobile accessibility score." }
    ]
  },
  {
    id: "lead_004",
    name: "Summit Real Estate",
    industry: "Real Estate & Construction",
    website: "summitproperties.com",
    size: "51-200 employees",
    revenue: "$12M ARR",
    location: "Denver, CO",
    phone: "+1 (303) 777-8899",
    email: "listings@summitproperties.com",
    decisionMaker: {
      name: "Gregory Vance",
      role: "Managing Partner",
      email: "g.vance@summitproperties.com",
      linkedin: "linkedin.com/in/gregory-vance-realestate"
    },
    leadScore: 65,
    status: "Saved",
    websiteStatus: "Audited",
    tags: ["Local SEO", "High Competition"],
    description: "Regional brokerage managing luxury listings and residential developments in the Colorado Front Range.",
    auditSummary: {
      mobileResponsive: true,
      ssl: true,
      seoScore: 90,
      accessibility: 85,
      performanceScore: 78,
      loadSpeed: "2.5s",
      lastAudited: "2026-06-08",
      issues: [
        "Missing local business schema markup",
        "Under-optimized images of property listings",
        "No map integration validation"
      ]
    },
    aiInsights: {
      opportunityScore: 70,
      painPoints: "Their site is fast, but missing Local Schema and structured listings. They rank below smaller agents in localized Google searches.",
      suggestedHook: "Offer a local SEO package adding geo-targeted schemas and listings synchronization to outrank competitors.",
      valueProp: "Boost search engine visibility in localized searches for luxury homes in Denver.",
      recommendedServices: [
        "Local SEO Schema Audit & Inject",
        "Listing Map Performance Optimization"
      ]
    },
    notes: [],
    tasks: [],
    activities: []
  },
  {
    id: "lead_005",
    name: "Zenith Capital",
    industry: "Financial Services & Fintech",
    website: "zenithcap.com",
    size: "1-10 employees",
    revenue: "$2.5M ARR",
    location: "New York, NY",
    phone: "+1 (212) 555-0199",
    email: "invest@zenithcap.com",
    decisionMaker: {
      name: "Brooke Sterling",
      role: "Founder & Chief Executive",
      email: "b.sterling@zenithcap.com",
      linkedin: "linkedin.com/in/brooke-sterling-zenith"
    },
    leadScore: 58,
    status: "Discovered",
    websiteStatus: "Needs Audit",
    tags: ["Startup", "Funding Search"],
    description: "A boutique investment firm focused on early-stage climate tech startups and sustainable forestry funds.",
    auditSummary: null,
    aiInsights: null,
    notes: [],
    tasks: [],
    activities: []
  },
  {
    id: "lead_006",
    name: "Turing EdTech",
    industry: "Education & EdTech",
    website: "turinged.com",
    size: "51-200 employees",
    revenue: "$10M ARR",
    location: "Seattle, WA",
    phone: "+1 (206) 444-2233",
    email: "hello@turinged.com",
    decisionMaker: {
      name: "Vikas Patel",
      role: "Head of Product",
      email: "vikas@turinged.com",
      linkedin: "linkedin.com/in/vikas-patel-edtech"
    },
    leadScore: 89,
    status: "Saved",
    websiteStatus: "Audited",
    tags: ["Fast Growth", "Accessibility Gaps"],
    description: "Interactive coding curriculum platform used by school districts. Highly sensitive to state compliance audits.",
    auditSummary: {
      mobileResponsive: true,
      ssl: true,
      seoScore: 85,
      accessibility: 52,
      performanceScore: 80,
      loadSpeed: "1.9s",
      lastAudited: "2026-06-19",
      issues: [
        "Aria-labels missing on key interactive coding widgets",
        "Color contrast failure on code editor themes (dark theme and high-contrast accessibility)",
        "Missing alt tags on math expression representations"
      ]
    },
    aiInsights: {
      opportunityScore: 94,
      painPoints: "They sell to public schools which require Section 508 / WCAG 2.1 AA accessibility compliance. Their platform fails automated accessibility scanners.",
      suggestedHook: "Pitch an immediate compliance remediation plan before the upcoming school board procurement cycle in August.",
      valueProp: "Assure state compliance to win government contracts worth millions.",
      recommendedServices: [
        "WCAG 2.1 Audit & Full Compliance Patching",
        "Screen-Reader Navigation Setup",
        "VPAT Document Creation"
      ]
    },
    notes: [],
    tasks: [],
    activities: []
  },
  {
    id: "lead_007",
    name: "Beacon HR Consulting",
    industry: "Professional Services & Consulting",
    website: "beaconhr.com",
    size: "11-50 employees",
    revenue: "$3.5M ARR",
    location: "Chicago, IL",
    phone: "+1 (312) 666-4444",
    email: "consulting@beaconhr.com",
    decisionMaker: {
      name: "Eleanor Vance",
      role: "Partner",
      email: "eleanor@beaconhr.com",
      linkedin: "linkedin.com/in/eleanor-vance-hr"
    },
    leadScore: 71,
    status: "Discovered",
    websiteStatus: "Needs Audit",
    tags: ["Local Business", "Lead Capture Issues"],
    description: "Executive recruiting firm placing C-suite candidates in healthcare and retail operations.",
    auditSummary: null,
    aiInsights: null,
    notes: [],
    tasks: [],
    activities: []
  },
  {
    id: "lead_008",
    name: "Stellar Logistics",
    industry: "Manufacturing & Logistics",
    website: "stellarlogistics.net",
    size: "500+ employees",
    revenue: "$110M ARR",
    location: "Los Angeles, CA",
    phone: "+1 (800) 555-1234",
    email: "quotes@stellarlogistics.net",
    decisionMaker: {
      name: "Jim Ryland",
      role: "VP of Supply Chain Partnerships",
      email: "j.ryland@stellarlogistics.net",
      linkedin: "linkedin.com/in/jim-ryland-logistics"
    },
    leadScore: 49,
    status: "Discovered",
    websiteStatus: "Needs Audit",
    tags: ["Enterprise", "Old Site"],
    description: "Global logistics provider and freight forwarding company with outdated legacy digital portal.",
    auditSummary: null,
    aiInsights: null,
    notes: [],
    tasks: [],
    activities: []
  }
];

export const mockAudits = [
  {
    id: "aud_001",
    businessName: "Acme Analytics",
    website: "acmeanalytics.io",
    mobileResponsive: "Responsive",
    ssl: "Secure",
    seoScore: 78,
    accessibility: 65,
    performanceScore: 58,
    loadSpeed: "4.2s",
    status: "Completed",
    date: "2026-06-18"
  },
  {
    id: "aud_002",
    businessName: "Nova Commerce",
    website: "novacommerce.com",
    mobileResponsive: "Responsive",
    ssl: "Insecure",
    seoScore: 82,
    accessibility: 72,
    performanceScore: 61,
    loadSpeed: "3.8s",
    status: "Completed",
    date: "2026-06-12"
  },
  {
    id: "aud_003",
    businessName: "Apex Healthcare Services",
    website: "apexhealth.org",
    mobileResponsive: "Non-Responsive",
    ssl: "Secure",
    seoScore: 61,
    accessibility: 48,
    performanceScore: 45,
    loadSpeed: "5.7s",
    status: "Completed",
    date: "2026-06-15"
  },
  {
    id: "aud_004",
    businessName: "Turing EdTech",
    website: "turinged.com",
    mobileResponsive: "Responsive",
    ssl: "Secure",
    seoScore: 85,
    accessibility: 52,
    performanceScore: 80,
    loadSpeed: "1.9s",
    status: "Completed",
    date: "2026-06-19"
  },
  {
    id: "aud_005",
    businessName: "Summit Real Estate",
    website: "summitproperties.com",
    mobileResponsive: "Responsive",
    ssl: "Secure",
    seoScore: 90,
    accessibility: 85,
    performanceScore: 78,
    loadSpeed: "2.5s",
    status: "Completed",
    date: "2026-06-08"
  }
];

export const mockCampaigns = [
  {
    id: "camp_001",
    name: "Web Performance Pitch Q2",
    serviceType: "Core Web Vitals Optimization",
    tone: "Professional / Data-driven",
    audience: "Tech SaaS Founders & VPs of Engineering",
    status: "Running",
    leadsCount: 12,
    sentCount: 9,
    openedCount: 6,
    repliedCount: 2,
    createdDate: "2026-06-10",
    subject: "Improving website conversion rate on {{website}}",
    body: "Hi {{decisionMaker.name}},\n\nI was looking at {{name}} and noticed that your homepage takes {{auditSummary.loadSpeed}} to load. According to Google's Lighthouse data, this could be driving away up to 15-20% of your potential trials.\n\nOur team specializes in optimizing performance for {{industry}} businesses. We've helped platforms like yours improve load times by over 50% and lift core conversions.\n\nI've outlined three key issues on your website (including {{auditSummary.issues[0]}}). Do you have 10 minutes next Tuesday for a quick walkthrough of our performance analysis?\n\nBest regards,\n\n[Your Name]\nLeadFlow Operations",
    leads: ["lead_001", "lead_006"]
  },
  {
    id: "camp_002",
    name: "Accessibility Compliance Outreach",
    serviceType: "ADA Accessibility Remediation",
    tone: "Helpful / Informative",
    audience: "Healthcare & EdTech Companies",
    status: "Scheduled",
    leadsCount: 5,
    sentCount: 0,
    openedCount: 0,
    repliedCount: 0,
    createdDate: "2026-06-15",
    subject: "ADA Compliance & Section 508 Review for {{name}}",
    body: "Hello {{decisionMaker.name}},\n\nWith new state guidelines expanding digital accessibility mandates, we conducted a brief review of {{website}}.\n\nWe noticed a few compliance indicators, specifically: {{auditSummary.issues[0]}}.\n\nFailing WCAG 2.1 compliance criteria leaves businesses vulnerable to regulatory audits and blocks access to customers relying on screen readers.\n\nWe provide a zero-downtime remediation service that brings {{name}} into full compliance. Let me know if you'd be open to seeing our compliance mockups.",
    leads: ["lead_003", "lead_006"]
  },
  {
    id: "camp_003",
    name: "SSL & Security Warning Warnings",
    serviceType: "SSL Setup & Security Audit",
    tone: "Urgent / Technical",
    audience: "E-commerce & Local Retail",
    status: "Completed",
    leadsCount: 8,
    sentCount: 8,
    openedCount: 7,
    repliedCount: 4,
    createdDate: "2026-06-01",
    subject: "Critical Security Warning on {{website}}",
    body: "Hi {{decisionMaker.name}},\n\nI am writing to notify you that the checkout process on {{website}} is currently loading over an insecure connection (missing/invalid SSL certificate).\n\nModern browsers like Chrome actively warn shoppers with a full-screen warning that 'Your connection is not private', causing up to 80% cart abandonment.\n\nWe can resolve your certificate configuration and secure your domain within 2 hours. Are you available for a brief phone call today to get this fixed?\n\nSincerely,\n\n[Your Name]",
    leads: ["lead_002"]
  },
  {
    id: "camp_004",
    name: "Local Schema SEO Campaign",
    serviceType: "Local SEO Schema Audit & Inject",
    tone: "Friendly / Commercial",
    audience: "Real Estate & Local Agencies",
    status: "Draft",
    leadsCount: 3,
    sentCount: 0,
    openedCount: 0,
    repliedCount: 0,
    createdDate: "2026-06-18",
    subject: "Increasing local SEO rankings for {{name}}",
    body: "Hi {{decisionMaker.name}},\n\nI noticed that {{name}} is doing a great job listing local properties in {{location}}, but your website is missing structured Local Business schema markup.\n\nWithout schema markup, search engines struggle to rank you in the Google 'Local Pack' maps above your competitors.\n\nWe've created a localized schema bundle that takes less than an hour to deploy. Let me know if you want me to send over the schema preview.",
    leads: ["lead_004"]
  }
];

// Analytics Mock Data
export const mockKPIs = {
  totalLeads: 486,
  savedLeads: 124,
  auditsCompleted: 98,
  campaignsSent: 34,
  responseRate: 24.8 // in percent
};

export const mockLeadGrowth = [
  { month: "Jan", leads: 120, audits: 45 },
  { month: "Feb", leads: 150, audits: 55 },
  { month: "Mar", leads: 190, audits: 62 },
  { month: "Apr", leads: 260, audits: 78 },
  { month: "May", leads: 380, audits: 85 },
  { month: "Jun", leads: 486, audits: 98 }
];

export const mockCampaignPerformance = [
  { name: "SSL Security", sent: 120, opened: 96, replied: 38 },
  { name: "Web Perf Pitch", sent: 180, opened: 110, replied: 22 },
  { name: "Accessibility Audit", sent: 90, opened: 48, replied: 14 },
  { name: "Local Schema SEO", sent: 50, opened: 30, replied: 8 }
];

export const mockLeadSourceDistribution = [
  { name: "Google Maps Search", value: 45 },
  { name: "LinkedIn Sales Nav", value: 30 },
  { name: "Organic Web Crawl", value: 15 },
  { name: "Direct Upload / Import", value: 10 }
];

export const mockConversionFunnel = [
  { stage: "Total Discovered", count: 486 },
  { stage: "Leads Saved / Qualified", count: 124 },
  { stage: "Website Audits Done", count: 98 },
  { stage: "Outreach Contacted", count: 68 },
  { stage: "Positive Response", count: 17 }
];

export const mockIndustryPerformance = [
  { industry: "SaaS & Software", count: 142, response: "28%" },
  { industry: "E-commerce & Retail", count: 98, response: "32%" },
  { industry: "Healthcare & Biotech", count: 76, response: "18%" },
  { industry: "Real Estate & Construction", count: 62, response: "15%" },
  { industry: "Financial Services", count: 48, response: "20%" },
  { industry: "Professional Services", count: 38, response: "22%" }
];

export const mockLeadScoreDistribution = [
  { scoreRange: "90-100", count: 24 },
  { scoreRange: "80-89", count: 45 },
  { scoreRange: "70-79", count: 86 },
  { scoreRange: "60-69", count: 120 },
  { scoreRange: "50-59", count: 112 },
  { scoreRange: "Below 50", count: 99 }
];

export const mockRecentActivities = [
  { id: 1, type: "outreach", text: "Sent email to Marcus Chen (Nova Commerce) under SSL & Security Warning Campaign.", time: "10 minutes ago" },
  { id: 2, type: "audit", text: "Completed automated audit on beaconhr.com. Accessibility score is 68/100.", time: "1 hour ago" },
  { id: 3, type: "lead", text: "Added Apex Healthcare Services to saved list.", time: "3 hours ago" },
  { id: 4, type: "task", text: "Vikas Patel (Turing EdTech) task 'Deliver accessibility remediation estimate' was completed.", time: "Yesterday" },
  { id: 5, type: "campaign", text: "Campaign 'Local Schema SEO Campaign' was created as a Draft.", time: "2 days ago" }
];
