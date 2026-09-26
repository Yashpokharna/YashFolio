export const METADATA = {
  title: "Yash Pokharna | Full Stack Developer",
  description:
    "The story of Yash Pokharna — a full stack developer from India crafting enterprise products, brand websites and AI-powered apps with React, Next.js, Angular and Flutter.",
  url: "https://yashpokharna.in",
};

export const EMAIL = "yashpokharna2002@gmail.com";
export const LOCATION = "Ahmedabad, India";
export const TIMEZONE = "Asia/Kolkata";
export const RESUME = "/Yash_Resume.pdf";

export const SOCIAL_LINKS = {
  github: "https://github.com/Yashpokharna",
  linkedin: "https://www.linkedin.com/in/yash-pokharna/",
  instagram: "https://www.instagram.com/yash__pokharna/",
  behance: "https://www.behance.net/yashpokharna2002",
};

// Each entry is a chapter of the story; `ref` is the section id.
export const MENULINKS = [
  { name: "Prologue", ref: "home" },
  { name: "Origin", ref: "about" },
  { name: "Journey", ref: "journey" },
  { name: "Works", ref: "works" },
  { name: "Obsession", ref: "obsession" },
  { name: "Toolbox", ref: "skills" },
  { name: "Contact", ref: "contact" },
];

// Roles that roll through the line under the hero name.
export const ROLES = [
  "Full Stack Developer",
  "Frontend Engineer",
  "UI / UX Craftsman",
  "AI Integrator",
  "Mobile App Developer",
];

export const STATS = [
  { value: 2, suffix: "+", label: "Years shipping to production" },
  { value: 340, suffix: "+", label: "DSA problems solved in Java" },
  { value: 7, suffix: "+", label: "Products launched & live" },
  { value: 8.11, suffix: "", label: "CGPA · B.E. Computer Science", decimals: 2 },
];

export interface IMilestone {
  year: string;
  phase: string;
  place: string;
  title: string;
  body: string;
  tags: string[];
}

export const JOURNEY: IMilestone[] = [
  {
    year: "2020",
    phase: "The First Line",
    place: "Chandigarh University, Punjab",
    title: "Hello, World.",
    body: "Started a B.E. in Computer Science and discovered that the browser is a canvas. HTML turned into CSS, CSS turned into JavaScript — and I never looked back.",
    tags: ["HTML", "CSS", "JavaScript", "Java"],
  },
  {
    year: "2022",
    phase: "Sharpening",
    place: "Late nights, LeetCode tabs",
    title: "Thinking in algorithms.",
    body: "Solved 340+ data-structure & algorithm problems in Java and earned an AMCAT Award of Excellence for logical and quantitative ability.",
    tags: ["Java", "DSA", "Problem Solving"],
  },
  {
    year: "2024",
    phase: "Into the Wild",
    place: "Twins Apparels · Bhilwara",
    title: "Graduated & shipped.",
    body: "Graduated with an 8.11 CGPA and joined Twins Apparels as a Full Stack Developer — building their factory website with Next.js, Tailwind and scroll-driven GSAP storytelling.",
    tags: ["Next.js", "Tailwind", "GSAP", "Deployment"],
  },
  {
    year: "2025",
    phase: "Going Enterprise",
    place: "WonderBotz · Ahmedabad",
    title: "Enterprise scale.",
    body: "Joined WonderBotz as a Jr. Consultant. Engineered the complete dashboard UI for EVAL NextGen — a real-time auction-monitoring platform for the Great American Group.",
    tags: ["Angular", "TypeScript", "REST APIs", "Agile"],
  },
  {
    year: "2026",
    phase: "Teaching Software to See",
    place: "Now · WonderBotz",
    title: "AI in the field.",
    body: "Architecting InspecTech — a tablet-first Flutter app for field inspections, exploring AI-based data extraction from inspection media to generate insights on the spot.",
    tags: ["Flutter", "Dart", "AI", "Material"],
  },
];

export interface IProject {
  name: string;
  category: string;
  meta: string; // year, or "Client" / "Personal" when undated
  description: string;
  gradient: [string, string];
  tech: string[];
  image?: string;
  url?: string;
  visual?: "inspection" | "dashboard";
}

export const PROJECTS: IProject[] = [
  {
    name: "InspecTech",
    category: "AI · Tablet App",
    meta: "2026",
    description:
      "An AI-powered field inspection app for the Great American Group. Tablet-first Flutter UI that turns inspection media into automated insights.",
    gradient: ["#064e3b", "#10b981"],
    tech: ["Flutter", "Dart", "Material", "AI"],
    visual: "inspection",
  },
  {
    name: "EVAL NextGen",
    category: "Enterprise Dashboard",
    meta: "2025",
    description:
      "Real-time auction monitoring for the Great American Group. I engineered the complete dashboard UI with reusable, performance-tuned components.",
    gradient: ["#1e1b4b", "#6366f1"],
    tech: ["Angular", "TypeScript", "Tailwind", "REST"],
    visual: "dashboard",
  },
  {
    name: "Twins Apparels",
    category: "Brand Website",
    meta: "2024 – 25",
    description:
      "A textile manufacturer's digital storefront — fully responsive, animated with scroll-triggered GSAP and deployed on a custom domain.",
    gradient: ["#3a0000", "#b91c1c"],
    tech: ["Next.js", "React", "GSAP", "Tailwind"],
    image: "/projects/TwinsApparels.jpg",
    url: "https://twinsapparels.in/",
  },
  {
    name: "Bolia & Co.",
    category: "Firm Website",
    meta: "Client",
    description:
      "A trustworthy web presence for a chartered accountancy firm — services, people and contact, as precise as the numbers they manage.",
    gradient: ["#003052", "#167187"],
    tech: ["Angular", "TypeScript", "Next.js", "npm"],
    image: "/projects/Bolia.jpg",
    url: "https://bolia.netlify.app/",
  },
  {
    name: "Resumify",
    category: "Web App",
    meta: "Personal",
    description:
      "Create professional resumes online — pick a layout, fill in the story, export a polished resume in minutes.",
    gradient: ["#134e4a", "#2dd4bf"],
    tech: ["React", "HTML", "CSS", "npm"],
    image: "/projects/Resumify.jpg",
    url: "https://resumify.yashpokharna.in/",
  },
  {
    name: "Track-IT",
    category: "Finance Tool",
    meta: "Personal",
    description:
      "An expense tracker that makes money visible — spending turned into charts and graphs you can actually read.",
    gradient: ["#0c4a6e", "#1abcfe"],
    tech: ["HTML", "CSS", "Tailwind", "JavaScript"],
    image: "/projects/trackit.jpg",
    url: "https://trackit.yashpokharna.in/",
  },
  {
    name: "3D Folio",
    category: "Interactive 3D",
    meta: "Personal",
    description:
      "A personal portfolio in three dimensions — custom-designed 3D models for every element, animated with GSAP.",
    gradient: ["#172554", "#3b82f6"],
    tech: ["React", "GSAP", "Tailwind", "Figma"],
    image: "/projects/3DPersonalFolio.jpg",
    url: "https://3dportfolio.yashpokharna.in/",
  },
];

export interface ISkillGroup {
  name: string;
  blurb: string;
  items: { label: string; icon?: string }[];
}

export const SKILL_GROUPS: ISkillGroup[] = [
  {
    name: "Frontend",
    blurb: "Interfaces that feel alive",
    items: [
      { label: "React", icon: "/skills/react.svg" },
      { label: "Next.js", icon: "/skills/next.svg" },
      { label: "Angular", icon: "/skills/angular.svg" },
      { label: "Tailwind", icon: "/skills/tailwind.svg" },
      { label: "HTML", icon: "/skills/html.svg" },
      { label: "CSS", icon: "/skills/css.svg" },
    ],
  },
  {
    name: "Languages",
    blurb: "Type-safe by default",
    items: [
      { label: "TypeScript", icon: "/projects/tech/typescript.svg" },
      { label: "JavaScript", icon: "/skills/javascript.svg" },
      { label: "Java" },
      { label: "Dart" },
    ],
  },
  {
    name: "Mobile",
    blurb: "Tablet-first, field-ready",
    items: [{ label: "Flutter" }, { label: "Dart" }, { label: "Material Design" }],
  },
  {
    name: "Backend & Data",
    blurb: "APIs that hold the story together",
    items: [
      { label: "Node.js" },
      { label: "REST APIs" },
      { label: "PostgreSQL" },
      { label: "pgAdmin" },
    ],
  },
  {
    name: "Motion & Design",
    blurb: "Pixels with intent",
    items: [
      { label: "GSAP", icon: "/skills/gsap.svg" },
      { label: "Figma", icon: "/skills/figma.svg" },
      { label: "Whimsical" },
      { label: "Lightroom", icon: "/skills/lightroom.svg" },
    ],
  },
  {
    name: "Workflow",
    blurb: "Ship it, review it, repeat",
    items: [
      { label: "Git", icon: "/skills/git.svg" },
      { label: "GitHub" },
      { label: "npm", icon: "/projects/tech/npm.svg" },
      { label: "Postman" },
      { label: "Azure Boards" },
    ],
  },
];

export const MARQUEE_ROWS = [
  ["React", "Next.js", "Angular", "TypeScript", "Flutter", "Tailwind"],
  ["Node.js", "PostgreSQL", "GSAP", "Figma", "Java", "Dart"],
];
