// Single source of truth for site content.
// Every fact here comes from CV_Mohammad_Tauhid_Ibrahim_.pdf. Do not add metrics that are not on the CV.

// Month the content was last checked against the CV (YYYY-MM).
export const siteUpdated = "2026-11";

export const person = {
  name: "Mohammad Tauhid Ibrahim",
  role: "Senior Executive, Finance",
  company: "WeGro Technologies Limited",
  location: "Dhaka, Bangladesh",
  email: "mtibrahim2@outlook.com",
  phone: "+880 1516 156690",
  phoneHref: "tel:+8801516156690",
  linkedin: "https://www.linkedin.com/in/mohammad-tauhid-ibrahim-489477240/",
  cvPath: "/Mohammad-Tauhid-Ibrahim-CV.pdf",
  cvFileName: "Mohammad-Tauhid-Ibrahim-CV.pdf",
};

export const hero = {
  focus: "Financial reporting, investment analysis, business intelligence and financial operations.",
  headline: ["Making sense of numbers.", "Creating value beyond them."],
  intro:
    "I work in finance at WeGro Technologies, a fintech company in Dhaka. Since October 2024 I have built its MIS reporting framework, prepared board and investor reports, and helped structure a Shariah-compliant financing pilot. Right now I am preparing statements for the statutory audit and moving the crowd-investor backend onto a new system.",
};

export const about = {
  paragraphs: [
    "I studied Accounting & Information Systems at Bangladesh University of Professionals and finished with a CGPA of 3.71 and a Dean's Scholarship. I joined WeGro part-time while still studying, and have since moved through four finance roles there: associate, senior associate, management trainee and senior executive.",
    "Most of my work sits where accounting meets the systems that carry it: the MIS framework leadership reads each period, the reconciliations behind investor funding, and the reports I build in Akij iBOS Managerium for the input business. Outside work I follow business strategy, FMCG and consumer markets, data analytics and the startup ecosystem.",
  ],
  facts: [
    { label: "Based in", value: "Dhaka, Bangladesh" },
    { label: "Currently", value: "Senior Executive, Finance at WeGro Technologies" },
    { label: "Degree", value: "BBA in Accounting & Information Systems, BUP" },
    { label: "Languages", value: "Bangla (native), English (fluent), French (basic)" },
  ],
};

export type Role = {
  title: string;
  type?: string;
  start: string; // YYYY-MM
  end: string | null; // null = present
  period: string;
  summary: string;
  points: string[];
};

export const roles: Role[] = [
  {
    title: "Senior Executive, Finance",
    start: "2026-07",
    end: null,
    period: "Jul 2026 – present",
    summary: "Audit-ready statements, an investor backend migration, and the numbers behind the input business.",
    points: [
      "Migrating the recently launched crowd-investor backend and reworking the investor finance processes that run on it. This is still in progress.",
      "Preparing the financial statements for the statutory external audit, with the reconciliations and supporting schedules the auditors need.",
      "Building reports in Akij iBOS Managerium that show management how the input business is performing.",
      "Following up aged receivables for the input business to keep collections on time and cash flow healthy.",
      "Keeping dealer documentation complete and audit-ready with the input team, and working through field issues with Territory Sales Officers.",
    ],
  },
  {
    title: "Management Trainee Officer, Finance",
    start: "2025-08",
    end: "2026-06",
    period: "Aug 2025 – Jun 2026",
    summary: "Investor reconciliations, a Shariah-compliant financing pilot, and finance workflows rebuilt for accuracy.",
    points: [
      "Managed investor-related financial reconciliations and the funding documentation that goes with them, working with cross-functional teams.",
      "Contributed to product design, ROI structuring, tenure planning and documentation for a pilot Shariah-compliant financing project.",
      "Redesigned operational finance workflows to improve reporting accuracy, tighten internal controls and cut turnaround time.",
      "Worked with the Investor Relations team on funding documentation, reporting and stakeholder communication.",
      "Picked up Tally ERP during a company-wide system migration.",
    ],
  },
  {
    title: "Senior Associate, Finance & Accounts",
    type: "Part-time",
    start: "2025-02",
    end: "2025-07",
    period: "Feb 2025 – Jul 2025",
    summary: "Designed the company-wide MIS framework and cut report preparation time by 25%.",
    points: [
      "Designed, built and maintained the company-wide MIS reporting framework covering the Balance Sheet, Income Statement and financial schedules.",
      "Cut financial report preparation time by 25% through automation, standard templates and a redesigned workflow.",
      "Met 95% of internal reporting deadlines while managing ledgers, journal entries and multi-party financial records.",
      "Built error-detection workflows that reduced reporting discrepancies across departments.",
      "Delivered periodic financial reports to senior leadership.",
    ],
  },
  {
    title: "Associate, Finance & Accounts",
    type: "Part-time",
    start: "2024-10",
    end: "2025-01",
    period: "Oct 2024 – Jan 2025",
    summary: "Board packs, projections for investor reporting, and investor return analysis.",
    points: [
      "Prepared Q4 FY2024–25 board reporting packages, including variance analysis against projections and the prior period.",
      "Built forward-looking projections and extracted financial statements for Impact Investment Exchange (IIX) investor reporting.",
      "Analysed investor returns to report investment performance across the financial year.",
      "Supported the FY2024–25 audit with documentation and data reconciliation, and supplied historical data to the Grants & Communications team.",
    ],
  },
];

export type CaseStudy = {
  id: string;
  title: string;
  when: string;
  need: string;
  approach: string;
  methods: string[];
  result: string;
  status?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "mis-framework",
    title: "A company-wide MIS reporting framework",
    when: "Senior Associate, 2025",
    need: "Leadership needed the same statements in the same shape every period, delivered on time.",
    approach:
      "I designed a reporting framework covering the Balance Sheet, Income Statement and supporting schedules, standardised the templates, automated the repeat steps and added error-detection checks before anything went to leadership.",
    methods: ["MIS design", "Workflow redesign", "Automation", "Error-detection checks"],
    result: "Report preparation time fell by 25%, and 95% of internal reporting deadlines were met.",
  },
  {
    id: "board-investor-reporting",
    title: "Board packs and IIX investor reporting",
    when: "Associate, 2024–25",
    need: "The board and an impact investor, Impact Investment Exchange (IIX), needed a clear view of performance against plan.",
    approach:
      "I prepared the Q4 FY2024–25 board packages with variance analysis against projections and the prior period, built forward-looking projections, extracted financial statements for IIX, and analysed investor returns across the year.",
    methods: ["Variance analysis", "Financial projections", "Investor return analysis"],
    result: "Board and investor reports for the financial year, backed by a return analysis.",
  },
  {
    id: "shariah-pilot",
    title: "A Shariah-compliant financing pilot",
    when: "Management Trainee, 2025–26",
    need: "A new financing product had to follow Shariah principles, with a clear return structure and term.",
    approach:
      "I contributed to the product design, structured the ROI, planned the tenure options and wrote the documentation for the pilot.",
    methods: ["Product design", "ROI structuring", "Tenure planning", "Documentation"],
    result: "Run as a pilot project.",
    status: "Pilot",
  },
  {
    id: "investor-finance",
    title: "Investor reconciliations and the crowd-investor backend",
    when: "2025 – present",
    need: "Investor money has to reconcile exactly, and the paperwork behind each investment has to hold up.",
    approach:
      "I managed the investor reconciliations and funding documentation with Investor Relations. I am now migrating the recently launched crowd-investor backend and reworking the finance processes that run on it.",
    methods: ["Reconciliation", "Funding documentation", "System migration"],
    result: "Reconciliations and documentation delivered. The backend migration is in progress.",
    status: "In progress",
  },
  {
    id: "workflow-controls",
    title: "Finance workflows rebuilt around controls",
    when: "Management Trainee, 2025–26",
    need: "Operational finance work needed to be more accurate, better controlled and faster.",
    approach:
      "I redesigned the operational finance workflows with accuracy and internal controls built into each step, and adapted them when the company moved to Tally ERP.",
    methods: ["Process redesign", "Internal controls", "Tally ERP"],
    result: "More accurate reporting, stronger internal controls and shorter turnaround times.",
  },
  {
    id: "input-business",
    title: "Reporting and receivables for the input business",
    when: "Senior Executive, 2026 – present",
    need: "Management needed to see how the input business was performing, and old receivables needed chasing.",
    approach:
      "I build and manage reports in Akij iBOS Managerium, follow up aged receivables, keep dealer documentation audit-ready, and work through field issues with Territory Sales Officers.",
    methods: ["Akij iBOS Managerium", "Receivables management", "Dealer compliance"],
    result: "Management has regular reports on input business performance. Ongoing.",
    status: "Ongoing",
  },
];

export const expertise = [
  {
    name: "Financial reporting & MIS",
    detail: "Built the company-wide MIS framework. Board packs and periodic reports for senior leadership.",
  },
  {
    name: "Financial analysis & planning",
    detail: "Variance analysis against projections and prior periods. Forward-looking projections. Budgeting.",
  },
  {
    name: "Accounting & financial operations",
    detail: "Ledgers, journal entries and multi-party records. Statements for the statutory external audit.",
  },
  {
    name: "Investment & ROI analysis",
    detail: "Investor return analysis for IIX reporting. ROI structuring and tenure planning for a Shariah-compliant pilot.",
  },
  {
    name: "Business intelligence",
    detail: "Management reports in Akij iBOS Managerium. Financial dashboards in Excel.",
  },
  {
    name: "Process improvement",
    detail: "Report preparation time cut by 25%. Operational finance workflows redesigned for accuracy and speed.",
  },
  {
    name: "Internal controls & reconciliation",
    detail: "Investor reconciliations, error-detection workflows, dealer compliance and audit support.",
  },
  {
    name: "Finance systems & automation",
    detail: "Reporting automation, the move to Tally ERP, and the crowd-investor backend migration.",
  },
];

export type Metric = { value: number; suffix: string; decimals: number; label: string; text?: string };

// `text` shows a word instead of a counted number, for achievements the CV states without a figure.
export const metrics: Metric[] = [
  { value: 25, suffix: "%", decimals: 0, label: "less time to prepare financial reports, after redesigning the MIS workflow" },
  { value: 95, suffix: "%", decimals: 0, label: "of internal reporting deadlines met as Senior Associate" },
  { value: 4, suffix: "", decimals: 0, label: "finance roles at WeGro Technologies since October 2024" },
  { value: 3.71, suffix: "", decimals: 2, label: "CGPA, BBA in Accounting & Information Systems" },
  { value: 5000, suffix: "+", decimals: 0, label: "participants at Josephite Math Mania 2019, which I co-organised" },
  {
    value: 0,
    suffix: "",
    decimals: 0,
    text: "TEDxBUP",
    label: "co-organised in 2024: speakers, venue, sponsors, volunteers and the day itself",
  },
];

export const tools = [
  { group: "Accounting & ERP", items: ["QuickBooks Online", "Tally ERP", "Akij iBOS Managerium"] },
  {
    group: "Analysis & reporting",
    items: ["Microsoft Excel (advanced)", "Pivot tables", "XLOOKUP and INDEX-MATCH", "Financial dashboards"],
  },
  { group: "Office", items: ["PowerPoint", "Word"] },
];

export const education = [
  {
    title: "BBA in Accounting & Information Systems",
    school: "Bangladesh University of Professionals",
    period: "Oct 2021 – Nov 2025",
    result: "CGPA 3.71",
    note: "Dean's Scholarship recipient",
    courses: [
      "Corporate Finance",
      "Business Analytics",
      "Taxation",
      "Operations & Supply Chain Management",
      "Financial Accounting",
      "Business Research Methodology",
    ],
  },
  {
    title: "Higher Secondary Certificate (Science)",
    school: "St. Joseph Higher Secondary School",
    period: "Aug 2018 – Apr 2020",
    result: "GPA 5.00",
  },
  {
    title: "Secondary School Certificate (Science)",
    school: "Udayan Uchcha Madhyamik Bidyalaya",
    period: "Jan 2008 – Apr 2018",
    result: "GPA 5.00",
  },
];

export const leadership = [
  {
    title: "General Secretary, BUP Accounting Forum",
    period: "Apr 2024 – Nov 2025",
    detail:
      "Ran the forum's activities, including seminars and networking events with ACCA Bangladesh and BRAC EPL, and handled planning, budgets and logistics for large academic events.",
  },
  {
    title: "Organizer, TEDxBUP 2024",
    period: "",
    detail: "Co-organised the event end to end: speakers, venue, sponsors, volunteers and the day itself.",
  },
  {
    title: "Joint Secretary, Josephite Math Club",
    period: "Oct 2019 – Dec 2020",
    detail:
      "Co-organised Josephite Math Mania 2019, a national competition with more than 5,000 participants across 10 segments, including registration and the registration fund.",
  },
];

export const philosophy = {
  statement:
    "A ledger records what happened. My job is to explain why it happened, show what is likely to come next, and put that in front of the person making the decision.",
  support:
    "Board packs and MIS reports are only useful when the reconciliations underneath them hold, so I spend a lot of my time on that layer.",
};

export const nav = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "expertise", label: "Expertise" },
  { id: "numbers", label: "Numbers" },
  { id: "contact", label: "Contact" },
];
