// ─── Types ──────────────────────────────────────────────────────────
export interface SocialLink {
  iconKey: string;      // "github" | "linkedin" | "youtube" | "twitter"
  href: string;
  label: string;
}

export interface HeroData {
  name: string;
  subtitle: string;
  description: string;
  photoUrl: string;
  socialLinks: SocialLink[];
}

export interface StatItem {
  value: number;
  label: string;
}

export interface ServiceItem {
  num: string;
  title: string;
  description: string;
  href: string;
}

export interface StackItem {
  name: string;
}

export interface ProjectItem {
  num: string;
  category: string;
  title: string;
  description: string;
  stack: StackItem[];
  image: string;
  live: string;
  github: string;
}

export interface ExperienceItem {
  company: string;
  position: string;
  duration: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  duration: string;
}

export interface SkillItem {
  iconKey: string;     // "html" | "css" | "js" | "react" | "next" | "tailwind" | "node" | "figma"
  name: string;
}

export interface AboutInfo {
  fieldName: string;
  fieldValue: string;
}

export interface ResumeData {
  aboutTitle: string;
  aboutDescription: string;
  aboutInfo: AboutInfo[];
  experienceTitle: string;
  experienceDescription: string;
  experienceItems: ExperienceItem[];
  educationTitle: string;
  educationDescription: string;
  educationItems: EducationItem[];
  skillsTitle: string;
  skillsDescription: string;
  skillsList: SkillItem[];
}

export interface ContactInfoItem {
  iconKey: string;     // "phone" | "email" | "address"
  title: string;
  description: string;
}

export interface Reply {
  id: string;
  body: string;
  date: string;
}

export interface Message {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  service: string;
  body: string;
  date: string;
  read: boolean;
  replies: Reply[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  body: string;
  avatar: string; // URL or initials fallback
  rating: number; // 1-5
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // markdown content
  coverImage: string;
  tags: string[];
  publishedAt: string;
  published: boolean;
}

export interface SiteSettings {
  siteTitle: string;
  siteDescription: string;
  accentColor: string;
  logoText: string;
}

export interface PortfolioData {
  hero: HeroData;
  stats: StatItem[];
  services: ServiceItem[];
  projects: ProjectItem[];
  resume: ResumeData;
  contactInfo: ContactInfoItem[];
  messages: Message[];
  testimonials: TestimonialItem[];
  blogPosts: BlogPost[];
  settings: SiteSettings;
}

// ─── Defaults (current hardcoded values) ────────────────────────────

export const defaultPortfolioData: PortfolioData = {
  hero: {
    name: "Mustafa Ali",
    subtitle: "Software Developer",
    description:
      "I excel at crafting elegant digital experiences and I am proficient in various programming languages and technologies. I specialize in building responsive, high-performance web applications that seamlessly blend beautiful design with robust logic.",
    photoUrl: "/assets/Mustafa Image.jpeg",
    socialLinks: [
      { iconKey: "github", href: "https://github.com", label: "GitHub" },
      { iconKey: "linkedin", href: "https://linkedin.com", label: "LinkedIn" },
      { iconKey: "youtube", href: "https://youtube.com", label: "YouTube" },
      { iconKey: "twitter", href: "https://twitter.com", label: "Twitter" },
    ],
  },

  stats: [
    { value: 12, label: "Years of\nexperience" },
    { value: 26, label: "Projects\ncompleted" },
    { value: 8, label: "Technologies\nmastered" },
    { value: 500, label: "Code\ncommits" },
  ],

  services: [
    {
      num: "01",
      title: "Web Development",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque consequat, faucibus et, et.",
      href: "/contact",
    },
    {
      num: "02",
      title: "UI/UX Design",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque consequat, faucibus et, et.",
      href: "/contact",
    },
    {
      num: "03",
      title: "Logo Design",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque consequat, faucibus et, et.",
      href: "/contact",
    },
    {
      num: "04",
      title: "SEO",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque consequat, faucibus et, et.",
      href: "/contact",
    },
  ],

  projects: [
    {
      num: "01",
      category: "frontend",
      title: "Frontend Project",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque consequat, faucibus et, et.",
      stack: [{ name: "Html 5" }, { name: "Css 3" }, { name: "Javascript" }],
      image: "/assets/work/thumb1.png",
      live: "",
      github: "",
    },
    {
      num: "02",
      category: "fullstack",
      title: "Fullstack Project",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque consequat, faucibus et, et.",
      stack: [{ name: "Next.js" }, { name: "Tailwind.css" }, { name: "Node.js" }],
      image: "/assets/work/thumb2.png",
      live: "",
      github: "",
    },
    {
      num: "03",
      category: "ui/ux",
      title: "UI/UX Project",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque consequat, faucibus et, et.",
      stack: [{ name: "Figma" }, { name: "Framer" }],
      image: "/assets/work/thumb3.png",
      live: "",
      github: "",
    },
  ],

  resume: {
    aboutTitle: "About me",
    aboutDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque consequat, faucibus et, et.",
    aboutInfo: [
      { fieldName: "Name", fieldValue: "Mustafa Ali" },
      { fieldName: "Experience", fieldValue: "12+ Years" },
      { fieldName: "Nationality", fieldValue: "Egyptian" },
      { fieldName: "Freelance", fieldValue: "Available" },
      { fieldName: "Skype", fieldValue: "mustafa.01" },
      { fieldName: "Languages", fieldValue: "Arabic, English" },
    ],
    experienceTitle: "My experience",
    experienceDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque consequat, faucibus et, et.",
    experienceItems: [
      { company: "Tech Solutions Inc.", position: "Full Stack Developer", duration: "2022 - Present" },
      { company: "Web Design Studio", position: "Front-End Developer Intern", duration: "Summer 2021" },
      { company: "E-commerce Startup", position: "Freelance Web Developer", duration: "2020 - 2021" },
      { company: "Tech Academy", position: "Teaching Assistant", duration: "2019 - 2020" },
      { company: "Digital Agency", position: "UI/UX Designer", duration: "2018 - 2019" },
      { company: "Software House", position: "Junior Developer", duration: "2017 - 2018" },
    ],
    educationTitle: "My education",
    educationDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque consequat, faucibus et, et.",
    educationItems: [
      { institution: "Online Course Platform", degree: "Full Stack Web Development Bootcamp", duration: "2023" },
      { institution: "Codecademy", degree: "Front-end Track", duration: "2022" },
      { institution: "Online Course", degree: "Programming Course", duration: "2020 - 2021" },
      { institution: "Tech Institute", degree: "Certified Web Developer", duration: "2019" },
    ],
    skillsTitle: "My skills",
    skillsDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque consequat, faucibus et, et.",
    skillsList: [
      { iconKey: "html", name: "HTML 5" },
      { iconKey: "css", name: "CSS 3" },
      { iconKey: "js", name: "JavaScript" },
      { iconKey: "react", name: "React.js" },
      { iconKey: "next", name: "Next.js" },
      { iconKey: "tailwind", name: "Tailwind CSS" },
      { iconKey: "node", name: "Node.js" },
      { iconKey: "figma", name: "Figma" },
    ],
  },

  messages: [],

  testimonials: [
    {
      id: "t1",
      name: "Sarah Johnson",
      role: "Product Manager",
      company: "TechCorp",
      body: "Mustafa delivered an exceptional web application that exceeded our expectations. His attention to detail and ability to translate complex requirements into elegant solutions is remarkable.",
      avatar: "",
      rating: 5,
    },
    {
      id: "t2",
      name: "Ahmed Hassan",
      role: "CTO",
      company: "StartupX",
      body: "Working with Mustafa was a fantastic experience. He brought creativity and technical expertise to our project, delivering on time and with outstanding quality.",
      avatar: "",
      rating: 5,
    },
    {
      id: "t3",
      name: "Emily Chen",
      role: "Design Lead",
      company: "DesignHub",
      body: "Mustafa has a rare combination of strong design sensibility and deep technical skills. He transformed our mockups into pixel-perfect, performant web experiences.",
      avatar: "",
      rating: 4,
    },
  ],

  blogPosts: [
    {
      id: "bp1",
      title: "Building a Modern Portfolio with Next.js",
      slug: "building-modern-portfolio-nextjs",
      excerpt: "A deep dive into creating a stunning developer portfolio using Next.js 14, Tailwind CSS, and Framer Motion with a Supabase backend.",
      content: "# Building a Modern Portfolio with Next.js\n\nIn this article, I'll walk you through the process of building a modern developer portfolio using some of the most powerful tools in the React ecosystem.\n\n## The Stack\n\n- **Next.js 14** — For server-side rendering and optimal performance\n- **Tailwind CSS** — For rapid, utility-first styling\n- **Framer Motion** — For smooth, premium animations\n- **Supabase** — For backend persistence and authentication\n\n## Key Design Decisions\n\nThe portfolio follows a dark theme with accent color customization, monospace typography for a developer-oriented feel, and carefully crafted micro-animations that make the experience feel alive.\n\n## What I Learned\n\nBuilding this project taught me the importance of balancing aesthetics with performance. Every animation is purposeful, and every component is optimized for both desktop and mobile experiences.",
      coverImage: "",
      tags: ["Next.js", "React", "Portfolio", "Web Development"],
      publishedAt: "2024-12-15T10:00:00Z",
      published: true,
    },
    {
      id: "bp2",
      title: "Why TypeScript Is Essential for Large Projects",
      slug: "typescript-essential-large-projects",
      excerpt: "Exploring how TypeScript's type system catches bugs early, improves developer experience, and makes refactoring large codebases a breeze.",
      content: "# Why TypeScript Is Essential for Large Projects\n\nTypeScript has become an indispensable tool in modern web development. Here's why I believe every serious project should adopt it.\n\n## Type Safety Saves Time\n\nWhile it may feel like extra work upfront, TypeScript's type checking catches entire categories of bugs before they reach production. From simple typos to complex type mismatches, the compiler has your back.\n\n## Better Developer Experience\n\nWith TypeScript, your IDE becomes incredibly powerful — autocomplete, inline documentation, and refactoring tools all work better when the editor understands your code's types.\n\n## Practical Tips\n\n1. Start with `strict: true` — it's worth the initial effort\n2. Use discriminated unions for state management\n3. Leverage generics for reusable utility types\n4. Don't overuse `any` — use `unknown` instead",
      coverImage: "",
      tags: ["TypeScript", "JavaScript", "Best Practices"],
      publishedAt: "2024-11-20T08:00:00Z",
      published: true,
    },
  ],

  contactInfo: [
    { iconKey: "phone", title: "Phone", description: "(+20) 123 456 7890" },
    { iconKey: "email", title: "Email", description: "mustafa@gmail.com" },
    { iconKey: "address", title: "Address", description: "Code Corner, Tech Town 13579" },
  ],

  settings: {
    siteTitle: "Mustafa Ali — Software Developer",
    siteDescription:
      "Portfolio of Mustafa Ali — Software Developer specializing in elegant digital experiences.",
    accentColor: "#00aaff",
    logoText: "Mustafa",
  },
};
