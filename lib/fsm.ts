// FSM platform matrix — drives routing decisions and copy.

export const FSM_PLATFORMS = [
  "servicetitan",
  "jobber",
  "housecall_pro",
  "chiirp",
  "other_fsm",
  "none",
] as const;

export type FsmPlatformKey = (typeof FSM_PLATFORMS)[number];

export const FSM_ROUTING_NOTES: Record<FsmPlatformKey, string> = {
  servicetitan:
    "ServiceTitan: always integrate. Never replace. The Zapier bridge fires on ST job events.",
  jobber:
    "Jobber: migrate if small (1-4 techs) + light use. Integrate if 5+ techs or deep dependency.",
  housecall_pro:
    "HouseCall Pro: same logic as Jobber.",
  chiirp:
    "Chiirp: GHL replaces Chiirp cleanly. Automation-minded buyer = easy migration.",
  other_fsm:
    "Other FSM: integrate unless migration intent is explicit.",
  none:
    "No platform: Track A full build every time.",
};

// Which platforms support the Zapier bridge (the 'unfair advantage')
export const BRIDGE_PLATFORMS: FsmPlatformKey[] = [
  "servicetitan",
  "jobber",
  "housecall_pro",
];

// Platforms where we explicitly reinforce "no replacement" messaging
export const NO_REPLACE_PLATFORMS: FsmPlatformKey[] = ["servicetitan"];
