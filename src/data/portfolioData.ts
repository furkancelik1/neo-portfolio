// Central content source for the portfolio. Edit this file to update the site.

export type AccentColor = 'yellow' | 'pink' | 'cyan' | 'lime' | 'orange' | 'violet'

/** Static class maps so Tailwind can see every class at build time. */
export const accentBg: Record<AccentColor, string> = {
  yellow: 'bg-neo-yellow',
  pink: 'bg-neo-pink',
  cyan: 'bg-neo-cyan',
  lime: 'bg-neo-lime',
  orange: 'bg-neo-orange',
  violet: 'bg-neo-violet',
}

/** Raw hex values for animating colour (e.g. Framer Motion backgroundColor). */
export const accentHex: Record<AccentColor, string> = {
  yellow: '#FFE500',
  pink: '#FF5CDB',
  cyan: '#2DE2FF',
  lime: '#B6FF3B',
  orange: '#FF8A3D',
  violet: '#A68BFF',
}

export interface SocialLink {
  label: string
  href: string
  platform: 'github' | 'linkedin' | 'email' | 'website'
}

export interface PersonalInfo {
  name: string
  shortName: string
  role: string
  tagline: string
  location: string
  email: string
  availability: string
  badges: string[]
  bio: string[]
  socials: SocialLink[]
}

export interface SkillGroup {
  category: string
  accent: AccentColor
  items: string[]
}

export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  liveUrl?: string
  githubUrl?: string
  accent: AccentColor
  year?: string
  featured?: boolean
}

export interface TimelineItem {
  id: string
  type: 'work' | 'education'
  title: string
  organization: string
  period: string
  location?: string
  description: string
  accent: AccentColor
}

export interface NavLink {
  label: string
  href: `#${string}`
}

export const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export const personalInfo: PersonalInfo = {
  name: 'Ahmet Furkan Çelik',
  shortName: 'Furkan',
  role: 'Full Stack Developer',
  tagline: 'I build loud, fast, no-nonsense web apps.',
  location: 'Türkiye',
  email: 'furkan.celik35@outlook.com',
  availability: 'Open to internships & junior roles',
  badges: ['Open to Work', 'Full-Stack Developer', 'React + TypeScript'],
  bio: [
    'Web Design & Coding student at Bandırma Onyedi Eylül University and GOIT Full Stack Developer graduate.',
    'I work across the stack — React and TypeScript on the front, Node.js and databases on the back — and I care about interfaces that feel tactile and honest.',
  ],
  socials: [
    { label: 'GitHub', href: 'https://github.com/furkancelik1', platform: 'github' },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/ahmet-furkan-%C3%A7elik-099762398/',
      platform: 'linkedin',
    },
    { label: 'Email', href: 'mailto:furkan.celik35@outlook.com', platform: 'email' },
  ],
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'Frontend',
    accent: 'yellow',
    items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'HTML/CSS'],
  },
  {
    category: 'Backend',
    accent: 'pink',
    items: ['Node.js', 'Express', 'REST APIs', 'Auth / JWT'],
  },
  {
    category: 'Database',
    accent: 'cyan',
    items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Prisma'],
  },
  {
    category: 'Tools & CMS',
    accent: 'lime',
    items: ['Git & GitHub', 'Vite', 'WordPress', 'WooCommerce', 'Figma', 'Vercel'],
  },
]

/** Flat list used for the scrolling marquee. */
export const techStack: string[] = skillGroups.flatMap((g) => g.items)

export const projects: Project[] = [
  {
    id: 'capshion-ai',
    title: 'Capshion AI',
    description:
      'AI-powered mobile app that writes Instagram captions from your photos. Credit + subscription model with server-verified purchases, push notifications and analytics.',
    tags: ['React Native', 'Expo', 'Express', 'Supabase', 'OpenAI', 'RevenueCat'],
    githubUrl: 'https://github.com/furkancelik1/Capshion-AI',
    accent: 'violet',
    year: '2026',
    featured: true,
  },
  {
    id: 'yasin-karakurt',
    title: 'Yasin Karakurt',
    description:
      'Full-stack coaching platform for a personal trainer: workout & nutrition programs, client check-ins, water tracking, iyzico subscriptions, real-time notifications and an admin dashboard.',
    tags: ['Next.js', 'TypeScript', 'Express', 'Prisma', 'PostgreSQL', 'Socket.IO'],
    liveUrl: 'https://yasin-karakurt.vercel.app/',
    githubUrl: 'https://github.com/furkancelik1/yasin-karakurt',
    accent: 'lime',
    year: '2026',
    featured: true,
  },
  {
    id: 'twitter-clone',
    title: 'Twitter Clone',
    description:
      'A MERN-stack social feed with authentication, posting, likes, follows and real-time-ish updates.',
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    githubUrl: 'https://github.com/furkancelik1',
    accent: 'cyan',
    year: '2026',
  },
  {
    id: 'learn-lingo',
    title: 'LearnLingo',
    description:
      'Platform for finding online language tutors: browse and filter teachers, save favourites and book a trial lesson, with user accounts.',
    tags: ['React', 'React Router', 'Firebase', 'React Hook Form', 'Yup'],
    liveUrl: 'https://learn-lingo-ashy.vercel.app/',
    accent: 'yellow',
  },
  {
    id: 'travel-trucks',
    title: 'TravelTrucks',
    description:
      'Camper rental catalog: filter vans by location, type and equipment, save favourites, view details and reviews, and send a booking request.',
    tags: ['React', 'React Router', 'React Hook Form', 'Yup'],
    liveUrl: 'https://travel-trucks-opal-three.vercel.app/',
    accent: 'orange',
  },
  {
    id: 'baseline',
    title: 'BASELINE Store',
    description:
      'A WordPress + WooCommerce storefront with custom styling, product catalogue and checkout flow.',
    tags: ['WordPress', 'WooCommerce', 'PHP', 'CSS'],
    accent: 'violet',
    year: '2026',
  },
  {
    id: 'baseline-mobile',
    title: 'BASELINE Mobile',
    description:
      'Mobile companion to the BASELINE store: track body measurements and progress, view uploaded analysis reports, and log calories & macros.',
    tags: ['React Native', 'Expo', 'WooCommerce API', 'iOS'],
    accent: 'lime',
    year: '2026',
  },
  {
    id: 'aynali-carsi',
    title: 'Aynalı Çarşı',
    description:
      'Website demo for Tarihi Aynalı Çarşı Pide ve Cantık, a historic eatery in Bursa — menu, gallery, story and visit info, mobile-first.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Responsive'],
    accent: 'cyan',
    year: '2026',
  },
]

export const timeline: TimelineItem[] = [
  {
    id: 'bandirma',
    type: 'education',
    title: 'Web Design & Coding',
    organization: 'Bandırma Onyedi Eylül University',
    period: '2024 — Present',
    location: 'Balıkesir',
    description: 'Associate degree focused on modern frontend, UI design and web application development.',
    accent: 'yellow',
  },
  {
    id: 'goit',
    type: 'education',
    title: 'Full Stack Developer Program',
    organization: 'GOIT',
    period: '2025',
    description: 'Intensive bootcamp covering JavaScript, React, Node.js, databases and team projects.',
    accent: 'pink',
  },
  {
    id: 'mozaik',
    type: 'work',
    title: 'Intern — Frontend & Database',
    organization: 'Mozaik Bilişim',
    period: '2025',
    description: 'Built UI components and worked on database queries and data modelling for internal tools.',
    accent: 'cyan',
  },
  {
    id: 'cbu',
    type: 'education',
    title: 'Computer Technologies',
    organization: 'Manisa Celal Bayar University',
    period: '2022 — 2024',
    location: 'Manisa',
    description: 'Associate degree in computer programming fundamentals, networking and systems.',
    accent: 'lime',
  },
]
