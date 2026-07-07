export type CaseStudy = {
  slug: string;
  trade: string;
  companyLabel: string;
  city: string;
  problem: string;
  deployed: string[];
  stats: { label: string; before: string; after: string }[];
  quote: { text: string; author: string };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "hvac-texas",
    trade: "hvac",
    companyLabel: "Texas HVAC company, 12 trucks",
    city: "Fort Worth, TX",
    problem:
      "Dispatch was fielding 40+ calls a day on ServiceTitan and after-hours calls went straight to voicemail. Estimates sent through the system rarely got a second touch.",
    deployed: [
      "Missed-call text-back wired into ServiceTitan job events",
      "24/7 AI voice agent for after-hours and overflow calls",
      "Estimate follow-up sequence (6-touch) on every quote sent",
    ],
    stats: [
      { label: "Booking rate", before: "55%", after: "90%" },
      { label: "Booked calls / week", before: "5", after: "43" },
      { label: "After-hours jobs captured", before: "0", after: "12/mo" },
    ],
    quote: {
      text: "We used to lose the after-hours calls completely. Now the AI books the job before I even see the notification.",
      author: "Owner, 12-truck HVAC company",
    },
  },
  {
    slug: "plumbing-arizona",
    trade: "plumbing",
    companyLabel: "Arizona plumbing company, 6 trucks",
    city: "Mesa, AZ",
    problem:
      "Emergency calls after 6pm went to voicemail and were lost to competitors. No systematic review request existed after jobs closed.",
    deployed: [
      "Speed-to-lead SMS + AI call on every new inbound lead",
      "After-hours AI coverage for emergency dispatch triage",
      "Post-job review generation with 1-star routing",
    ],
    stats: [
      { label: "Emergency calls captured after hours", before: "~20%", after: "95%" },
      { label: "Google reviews / month", before: "2", after: "18" },
      { label: "Booking rate", before: "48%", after: "82%" },
    ],
    quote: {
      text: "The after-hours AI alone paid for the whole system in the first two weeks.",
      author: "Owner, 6-truck plumbing company",
    },
  },
  {
    slug: "roofing-oklahoma",
    trade: "roofing",
    companyLabel: "Oklahoma roofing company, storm-chase crew",
    city: "Tulsa, OK",
    problem:
      "Storm-season leads from SalesRabbit canvassing and JobNimbus went cold within days. No consistent estimate follow-up existed once a rep moved to the next neighborhood.",
    deployed: [
      "SalesRabbit → GHL speed-to-lead bridge on every new door knock",
      "JobNimbus job-won trigger → onboarding + review sequence",
      "Multi-touch estimate follow-up until won, lost, or expired",
    ],
    stats: [
      { label: "Estimate-to-close rate", before: "31%", after: "58%" },
      { label: "Leads followed up within 1 hour", before: "40%", after: "100%" },
      { label: "YoY revenue growth", before: "—", after: "+20%" },
    ],
    quote: {
      text: "Reps used to lose track of leads the second they left the neighborhood. Now every quote gets chased automatically.",
      author: "Sales Manager, storm-chase roofing crew",
    },
  },
  {
    slug: "electrical-georgia",
    trade: "electrical",
    companyLabel: "Georgia electrical contractor, 8 techs",
    city: "Marietta, GA",
    problem:
      "Quotes went cold after the initial visit with no follow-up cadence, and past customers were never re-engaged for panel upgrades or seasonal work.",
    deployed: [
      "Estimate follow-up sequence on every sent quote",
      "Past customer re-engagement campaigns by service type",
      "Missed-call text-back for after-hours emergency requests",
    ],
    stats: [
      { label: "Quote follow-up touches", before: "1", after: "6" },
      { label: "Re-engaged past customers / month", before: "0", after: "22" },
      { label: "Booking rate", before: "52%", after: "85%" },
    ],
    quote: {
      text: "We were sitting on years of past customers doing nothing. The reactivation flow alone booked us a full week of work in month one.",
      author: "Owner, 8-tech electrical contractor",
    },
  },
  {
    slug: "landscaping-carolina",
    trade: "landscaping",
    companyLabel: "North Carolina landscaping company, seasonal crew",
    city: "Charlotte, NC",
    problem:
      "One-time clients rarely rebooked for next season, and there was no membership or maintenance-plan upsell path in place.",
    deployed: [
      "Seasonal reactivation campaigns tied to service history",
      "Membership/maintenance-plan enrollment automation",
      "Review generation after every completed job",
    ],
    stats: [
      { label: "Season-over-season rebook rate", before: "22%", after: "61%" },
      { label: "Maintenance-plan enrollments", before: "0", after: "34" },
      { label: "Google reviews", before: "9", after: "71" },
    ],
    quote: {
      text: "We finally have a system that reminds clients we exist before the weeds do.",
      author: "Owner, seasonal landscaping company",
    },
  },
  {
    slug: "pest-control-florida",
    trade: "pest_control",
    companyLabel: "Florida pest control company, GorillaDesk",
    city: "Tampa, FL",
    problem:
      "Annual contract customers lapsed with no renewal reminder system, and review requests were inconsistent after service visits.",
    deployed: [
      "GorillaDesk service-completed trigger → renewal reminder flow",
      "Lapsed-member win-back campaign",
      "Automated review request after every service",
    ],
    stats: [
      { label: "Contract renewal rate", before: "64%", after: "89%" },
      { label: "Lapsed members won back / month", before: "2", after: "15" },
      { label: "Reviews / month", before: "3", after: "27" },
    ],
    quote: {
      text: "Renewals used to be a manual chase every quarter. Now it just happens.",
      author: "Owner, pest control company",
    },
  },
  {
    slug: "solar-nevada",
    trade: "solar",
    companyLabel: "Nevada solar installer, canvassing-driven",
    city: "Las Vegas, NV",
    problem:
      "Door-to-door leads from canvassing reps sat untouched for days before a sales call happened, and consultations booked from ads had a high no-show rate.",
    deployed: [
      "SalesRabbit new-lead trigger → instant speed-to-lead SMS + call",
      "Appointment confirmation + reminder sequence for consultations",
      "AI voice agent for after-hours ad-driven inquiries",
    ],
    stats: [
      { label: "Lead response time", before: "18 hrs", after: "under 2 min" },
      { label: "Consultation no-show rate", before: "34%", after: "11%" },
      { label: "Booked consultations / month", before: "19", after: "52" },
    ],
    quote: {
      text: "Speed is everything in solar. Cutting response time to minutes changed our close rate overnight.",
      author: "Sales Director, solar installer",
    },
  },
  {
    slug: "garage-doors-ohio",
    trade: "garage_doors",
    companyLabel: "Ohio garage door company, 4 trucks",
    city: "Columbus, OH",
    problem:
      "Same-day repair requests were often missed calls during busy install jobs, and there was no follow-up on spring-and-cable repair estimates.",
    deployed: [
      "Missed-call text-back for every unanswered inbound call",
      "Estimate follow-up sequence on repair quotes",
      "Post-job review request with referral incentive",
    ],
    stats: [
      { label: "Missed calls converted to booked jobs", before: "~10%", after: "68%" },
      { label: "Reviews / month", before: "4", after: "24" },
      { label: "Booking rate", before: "58%", after: "88%" },
    ],
    quote: {
      text: "Every missed call used to just be a missed job. Now most of them text back and book themselves.",
      author: "Owner, garage door repair company",
    },
  },
  {
    slug: "junk-removal-tennessee",
    trade: "junk_removal",
    companyLabel: "Tennessee junk removal company, 3 crews",
    city: "Nashville, TN",
    problem:
      "Same-day quote requests from Workiz went unanswered on weekends, and repeat customers (movers, realtors) were never re-engaged.",
    deployed: [
      "Workiz job-booked trigger → confirmation + reminder sequence",
      "Weekend after-hours AI coverage for same-day requests",
      "Realtor/repeat-customer reactivation campaign",
    ],
    stats: [
      { label: "Weekend leads captured", before: "~30%", after: "94%" },
      { label: "Repeat customer bookings / month", before: "6", after: "29" },
      { label: "Booking rate", before: "50%", after: "86%" },
    ],
    quote: {
      text: "Weekends used to be a black hole for leads. Now the AI books them before Monday.",
      author: "Owner, junk removal company",
    },
  },
];

export function getCaseStudyByTrade(trade: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.trade === trade);
}
