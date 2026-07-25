// Single source of truth for all page content.
// Populated from cv.md / config/profile.yml in the career-ops repo.

export const profile = {
  name: "Abdul Aziz",
  fullLegalName: "Md Abdul Aziz",
  initials: "AA",
  avatar: "/avatar.png",
  roleArticle: "an",
  roleTop: "Aspiring",
  roleMain: "Fullstack AI Engineer",
  email: "abdulazizbd17@gmail.com",
  website: "https://azizcode.dev",
  github: "https://github.com/abdulaziz-bd",
  linkedin: "https://linkedin.com/in/abdulazizfahad",
  openToWork: true,
  blurb:
    "Feel free to explore my portfolio and reach out — I'd love to connect!",
  location: {
    city: "Potsdam",
    country: "Germany",
    lat: 52.3906,
    lon: 13.0645,
    coords: "52.3906° N, 13.0645° E",
    workModes: ["On-site", "Hybrid", "Remote"],
  },
};

export type Publication = {
  shortTitle: string;
  fullTitle: string;
  venue: string;
  year: string;
  url?: string;
};

export const publications: Publication[] = [
  {
    shortTitle: "Contextualized Learning Assistant",
    fullTitle:
      "Contextualized Learning Assistant: A Middleware Architecture for LMS Integration",
    venue: "SETE / ICWL",
    year: "2026",
    url: "https://doi.org/10.1007/978-981-92-0042-9_21",
  },
  {
    shortTitle: "LLM-Assisted Course Search",
    fullTitle:
      "Large Language Model-Assisted Course Search: Parsing Structured Parameters from Natural Language Queries",
    venue: "Engineering Proceedings",
    year: "2025",
    url: "https://doi.org/10.3390/engproc2025103018",
  },
  {
    shortTitle: "Sign Language Gesture Recognition",
    fullTitle:
      "Sign Language Gesture Recognition using Bayesian Optimization and Transfer Learning",
    venue: "ResearchGate",
    year: "2022",
    url: "http://dx.doi.org/10.13140/RG.2.2.32482.40643",
  },
  {
    shortTitle: "Automated Fruit Disease Recognition",
    fullTitle:
      "An In-Depth Analysis of Segmentation Techniques in Automated Local Fruit Disease Recognition",
    venue: "Springer",
    year: "2020",
    url: "https://doi.org/10.1007/978-981-33-6424-0_9",
  },
];

export const cefrLevels = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;

export type SpokenLanguage = {
  name: string;
  level: string;
  cefr?: (typeof cefrLevels)[number]; // highest reached level on the CEFR strip
};

export const spokenLanguages: SpokenLanguage[] = [
  { name: "English", level: "Professional" },
  { name: "German", level: "B1 (exam candidate)", cefr: "B1" },
];

export const languagesFootnote =
  "Off the record: native in Python, fluent in TypeScript.";

export type TimelineItem = {
  title: string;
  meta: string;
  faded?: boolean;
};

export const timeline: TimelineItem[] = [
  {
    title: "M.Sc. Data Science — Uni Potsdam",
    meta: "2022 – 2026 · Thesis in progress",
    faded: true,
  },
  {
    title: "Research Assistant at Fraunhofer FOKUS",
    meta: "2022 – Present · Berlin · Full time",
  },
  {
    title: "Student Assistant at HPI Potsdam",
    meta: "2022 – 2024 · Potsdam · Part time",
  },
  {
    title: "Web Developer at BD IT Lab",
    meta: "2020 – 2021 · Dhaka · Full time",
  },
];

export type Project = {
  name: string;
  tagline: string;
  url?: string;
  gradient: string;
  emblem: string;
};

export const projects: Project[] = [
  {
    name: "TarjumaAI",
    tagline: "Real-time AI voice translator · 10+ languages",
    url: "https://github.com/abdulaziz-bd/TarjumaAI",
    gradient: "from-orange-500 via-rose-500 to-purple-600",
    emblem: "TA",
  },
  {
    name: "LRS Analytics Dashboard",
    tagline: "xAPI learning analytics for learners, tutors & admins",
    url: "https://github.com/abdulaziz-bd/lrs-analytics-dashboard",
    gradient: "from-sky-500 via-indigo-500 to-slate-800",
    emblem: "LRS",
  },
  {
    name: "Doc Generator",
    tagline: "LLM-based GitHub docs · –50% manual effort",
    url: "https://github.com/abdulaziz-bd/doc-generator",
    gradient: "from-emerald-500 via-teal-600 to-slate-900",
    emblem: "{ }",
  },
];

export type TechGroup = {
  label: string;
  items: string[];
};

export const techStack: TechGroup[] = [
  {
    label: "Core",
    items: ["Python", "TypeScript", "Next.js", "FastAPI", "Node.js", "SQL"],
  },
  {
    label: "AI / ML",
    items: [
      "RAG",
      "pgvector",
      "LangChain",
      "vLLM",
      "PyTorch",
      "LoRA",
      "MCP · Agentic AI",
      "Whisper",
    ],
  },
  {
    label: "Infra",
    items: ["PostgreSQL", "Kafka", "Docker", "Kubernetes", "Azure", "CI/CD"],
  },
];

export type ExperienceTab = {
  id: string;
  step: string;
  label: string;
  heading: string;
  period: string;
  summary: string;
  highlights: string[];
  tech: string[];
};

export const experienceTabs: ExperienceTab[] = [
  {
    id: "fokus",
    step: "01",
    label: "Fraunhofer FOKUS",
    heading: "Research Assistant — FAME Business Unit",
    period: "Sep 2022 – Present · Berlin",
    summary:
      "Shipping production LLM/RAG systems and agentic AI tooling for EdTech platforms used by thousands of learners.",
    highlights: [
      "Institutional RAG chatbot: two-stage BM25 + vector retrieval (pgvector), improving relevance and speed by 40%, with a source-page reference previewer.",
      "AILA — AI Learning Assistant: agentic chatbot with MCP-based analytics tooling, KPI micro-visualizations, and a from-scratch multilingual voice mode.",
      "Kafka-based queue manager and microservice backbone for an EdTech test platform — Docker, Helm, CI/CD on Azure GPU servers, cutting deployment time by 50%.",
      "Operate production AI workloads on on-premise NVIDIA H100 / A6000 GPU infrastructure.",
    ],
    tech: ["React", "FastAPI", "PostgreSQL", "Kafka", "Kubernetes", "Azure"],
  },
  {
    id: "hpi",
    step: "02",
    label: "HPI Potsdam",
    heading: "Student Assistant — Hasso Plattner Institute",
    period: "Jul 2022 – Sep 2024 · Potsdam",
    summary:
      "Supported open online learning at one of Germany's leading computer science institutes.",
    highlights: [
      "Created and curated LMS course materials and YouTube content supporting 1,000+ learners, with xAPI-compliant data tracking.",
      "Managed the internal authentication server and administered team tooling (Nextcloud, Slack, Zoom, Miro, Trello).",
    ],
    tech: ["LMS", "xAPI", "Nextcloud", "Linux"],
  },
  {
    id: "bditlab",
    step: "03",
    label: "BD IT Lab",
    heading: "Web Developer",
    period: "May 2020 – Dec 2021 · Dhaka",
    summary:
      "Modernized legacy web projects into maintainable, high-performance stacks.",
    highlights: [
      "Migrated outdated projects to Django + React, boosting performance by 40%.",
      "Applied responsive design strategies, lifting mobile user satisfaction by 50%.",
    ],
    tech: ["Django", "React", "PostgreSQL"],
  },
  {
    id: "education",
    step: "04",
    label: "Education",
    heading: "M.Sc. Data Science — University of Potsdam",
    period: "2022 – 2026 (expected) · BS CS, Daffodil Int'l University (GPA 3.8/4.0)",
    summary:
      "Thesis: Conversational vs. Static AI Assistance in Learning Analytics Dashboards — impacts on cognitive load and user performance.",
    highlights: [
      "LoRA fine-tuning of Mistral 7B and Qwen3 30B on aggregated xAPI learning-record data, retrieved via MCP connectors.",
      "Improved LLM-as-judge pedagogical-appropriateness score from 3.83 to 4.2 (1–5 Likert).",
    ],
    tech: ["Mistral 7B", "Qwen3 30B", "LoRA", "xAPI", "MCP"],
  },
];
