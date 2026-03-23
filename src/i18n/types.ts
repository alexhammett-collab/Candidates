export type Language = "en" | "fr" | "de" | "it";

export interface Translations {
  nav: { platform: string; devin: string; team: string; viewRoles: string };
  hero: { title: string; subtitle: string; explorePlatform: string; joinTeam: string };
  whyCognition: {
    label: string;
    heading: string;
    steps: { num: string; title: string; highlight: string; description: string; stat: string; statLabel: string }[];
  };
  platform: {
    label: string; heading: string; description: string;
    nodes: { windsurf: string; cli: string; prReview: string; dana: string; deepwiki: string };
    nodeDescs: { windsurf: string; cli: string; prReview: string; dana: string; deepwiki: string };
    devinLead: string; devinLeadSub: string; devinLeadTooltip: string; engineeringPod: string;
    mobileDevinLeadAgent: string; mobileDevinDescription: string;
  };
  tech: {
    devin: { label: string; title: string; description: string; bullets: string[] };
    windsurf: { label: string; title: string; description: string; bullets: string[] };
    cli: { label: string; title: string; description: string; bullets: string[] };
    review: { label: string; title: string; description: string; bullets: string[] };
    dana: { label: string; title: string; description: string; bullets: string[] };
  };
  paradigm: {
    label: string; bigStatement: string; subStatement: string;
    bodyStart: string; cost: string; speed: string; risk: string; bodyEnd: string;
    fleetTitle: string; fleetBody: string;
    pillars: { label: string; description: string }[];
  };
  sdlc: {
    label: string; heading: string; description: string;
    dims: { lever: string; headline: string; points: string[] }[];
    pipelineLabel: string;
    stages: { phase: string; description: string }[];
  };
  traction: { label: string; heading: string; statLabels: string[] };
  founders: { label: string; heading: string; roles: string[]; descriptors: string[] };
  culture: {
    label: string; heading: string; description: string; quote: string;
    perks: { title: string; description: string }[];
    locations: { city: string; status: string }[];
  };
  media: {
    label: string; heading: string; description: string;
    channelDescs: string[];
    content: { title: string; description: string }[];
    video: string; article: string;
  };
  cta: { heading: string; description: string; viewRoles: string; learnMore: string };
  footer: { copyright: string };
}
