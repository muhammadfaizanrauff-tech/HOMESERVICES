export type Module = {
  n: number;
  tier: "CORE" | "GROWTH" | "PREMIUM";
  title: string;
  desc: string;
};

export const modules: Module[] = [
  { n: 1,  tier: "CORE",    title: "Speed-to-Lead",              desc: "Respond to every new lead within 60 seconds via SMS + AI call." },
  { n: 2,  tier: "CORE",    title: "Missed Call Text-Back",      desc: "Auto-text back within 30 seconds of every missed inbound call." },
  { n: 3,  tier: "CORE",    title: "AI Voice Agent (24/7)",      desc: "Answer every inbound call, handle FAQs, and book jobs around the clock." },
  { n: 4,  tier: "CORE",    title: "Appointment Confirmations",  desc: "4-touch confirm + reminder sequence with automatic no-show recovery." },
  { n: 5,  tier: "GROWTH",  title: "Estimate Follow-Up",         desc: "Multi-touch follow-up on every sent estimate until won, lost, or expired." },
  { n: 6,  tier: "GROWTH",  title: "Rehash & Win-Back",          desc: "Re-engage cold and lost estimates with fresh outreach and updated offers." },
  { n: 7,  tier: "GROWTH",  title: "Reviews & Referrals",        desc: "Post-job review request with smart 1-star routing + referral incentive." },
  { n: 8,  tier: "GROWTH",  title: "After-Hours Coverage",       desc: "AI captures and qualifies every lead that calls outside business hours." },
  { n: 9,  tier: "PREMIUM", title: "Membership Renewals",        desc: "Enrollment, renewal reminders, and lapsed member win-back automation." },
  { n: 10, tier: "PREMIUM", title: "Outbound Fill-In",           desc: "AI calls warm lists to fill slow days and keep the calendar full." },
  { n: 11, tier: "PREMIUM", title: "Past Customer Re-Engagement",desc: "Seasonal outreach to past customers based on service type and cycle." },
  { n: 12, tier: "PREMIUM", title: "Smart Lead Qualification",   desc: "Pre-qualify by location, property type, and urgency before routing." },
];
