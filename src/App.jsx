import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue, animate } from 'framer-motion';
import { MapPin, Github, Linkedin, Mail, ArrowUpRight, ChevronDown, FileText, ExternalLink } from 'lucide-react';

// --- Personal Data ---
const personalInfo = {
  name: "Aritha Munasinghe",
  role: "Full-Stack Engineer & AI Specialist",
  education: "B.S. Computer Science • California State University, Sacramento (Exp. May 2027)",
  location: "Sacramento, CA",
  email: "arithaltm@gmail.com",
  socials: {
    github: "https://github.com/ALTM005",
    linkedin: "https://linkedin.com/in/aritham",
    resume: "/Aritha_Resume.pdf" // Ensure you put your PDF in the 'public' folder and name it resume.pdf
  }
};

const experience = [
  {
    company: "DRM Electronics",
    role: "Junior Software Engineer",
    date: "Dec. 2023 – Aug. 2024",
    summary: "Led a full-stack performance overhaul to fix slow reporting and UI lag.",
    bullets: [
      "Optimized PostgreSQL databases to cut data retrieval time by 40%.",
      "Modernized the Angular frontend, making the app 25% more responsive.",
      "Scaled Node.js APIs to reliably handle high concurrent traffic.",
      "Built native Android prototypes to test cross-platform feasibility."
    ],
    tags: ["PostgreSQL", "Node.js", "Angular", "Java", "System Design"],
  },
  {
    company: "DRM Electronics",
    role: "Software Engineering Intern",
    date: "Aug. 2023 – Dec. 2023",
    summary: "Collaborated in an Agile team to build responsive web interfaces and streamline deployment.",
    bullets: [
      "Designed layouts that drove a 30% increase in user engagement.",
      "Engineered reusable Angular components to speed up future development.",
      "Implemented Node.js backend services for real-time data flow.",
      "Ensured reliable production releases using Git and CI/CD pipelines."
    ],
    tags: ["HTML/CSS", "JavaScript", "Node.js", "CI/CD", "Agile"]
  }
];

const projects = [
  {
    title: "DocSearch RAG",
    date: "Jan. 2026",
    description: "A Retrieval Augmented Generation (RAG) engine allowing natural language chat with PDF documents. Built with the 'Modern Data Stack' using Astra DB for vector search. Features a hybrid search architecture for sub-millisecond retrieval and uses GPT-3.5 Turbo to synthesize hallucination-free answers.",
    tags: ["Streamlit", "LangChain", "Astra DB", "OpenAI", "Python"],
    repoUrl: "https://github.com/ALTM005/doc-search-rag"
  },
  {
    title: "Generative AI Knowledge Engine",
    date: "Dec. 2025",
    description: "Engineered an end-to-end RAG pipeline using FastAPI for context-aware semantic search over unstructured datasets. Implemented PostgreSQL with pgvector for high-dimensional embedding storage, enabling sub-second retrieval speeds for LLM grounding.",
    tags: ["Python", "FastAPI", "PostgreSQL", "RAG", "pgvector"],
    repoUrl: "https://github.com/ALTM005/ai-knowledge-search"
  },
  {
    title: "AI-Powered Campus Navigator",
    date: "Oct. 2025",
    description: "Built a centralized AI search engine using FastAPI and OpenAI that scrapes live web data to locate events and resources in real-time. Designed a high-performance geospatial frontend with React and TypeScript to visualize dynamic event clusters.",
    tags: ["Python", "FastAPI", "Tavily API", "React", "TypeScript"],
    repoUrl: "https://github.com/ALTM005/campus-navigator"
  },
  {
    title: "Real-Time Collab Infrastructure",
    date: "Aug. 2025",
    description: "Architected a low-latency collaboration platform using Socket.IO, achieving sub-100ms synchronization. Designed a secure, sandboxed code execution environment using Docker to prevent malicious server-side operations while supporting 20+ languages.",
    tags: ["React", "TypeScript", "WebSocket", "Docker", "Supabase"],
    repoUrl: "https://github.com/ALTM005/code-collab"
  }
];

const skills = [
  "Python", "TypeScript", "React", "Next.js", "FastAPI", "Node.js",
  "PostgreSQL", "Vector DBs (Astra/pgvector)", "RAG Architectures", "LangChain",
  "Docker", "AWS (EC2/S3/Lambda)", "CI/CD", "Linux", "System Design"
];

// --- Components ---

function SpotlightCard({ children, className = "", onClick }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onClick={onClick}
      className={`group relative border border-white/10 bg-gray-900/50 overflow-hidden rounded-xl ${className} ${onClick ? 'cursor-pointer' : ''}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(59, 130, 246, 0.10),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

const Badge = ({ children }) => (
  <span className="px-3 py-1 text-xs font-medium text-blue-300 bg-blue-500/10 rounded-full border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.1)]">
    {children}
  </span>
);

const SectionHeader = ({ title }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="flex items-center gap-4 mb-12 mt-32"
  >
    <h2 className="text-3xl font-bold text-gray-100">{title}</h2>
    <div className="h-px bg-gradient-to-r from-blue-500/50 to-transparent flex-grow" />
  </motion.div>
);

const SocialLink = ({ href, icon: Icon, label, download = false }) => (
  <a
    href={href}
    target={download ? "_self" : "_blank"}
    rel={download ? "" : "noreferrer"}
    download={download}
    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-blue-500/30 rounded-lg transition-all group"
  >
    <Icon size={18} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
    <span className="text-sm font-medium text-gray-300 group-hover:text-white">{label}</span>
  </a>
);

// --- Main Application ---

export default function Portfolio() {
  const COLORS = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];
  const color = useMotionValue(COLORS[0]);
  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const [activeSection, setActiveSection] = useState('hero');

  // Animation for background gradient
  useEffect(() => {
    animate(color, COLORS, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  // Scroll Spy Logic for Navbar
  useEffect(() => {
    const sections = ['hero', 'experience', 'projects', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 300; // Offset for better detection

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Global Style to fix Overscroll Background White Issue */}
      <style>{`
        html, body {
          background-color: #020617;
          scroll-behavior: smooth;
        }
      `}</style>

      <motion.div
        style={{ backgroundImage }}
        className="min-h-screen bg-gray-950 text-gray-300 font-sans selection:bg-blue-500/30 overflow-x-hidden"
      >
        {/* Floating Glass Navbar */}
        <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
          <nav className="bg-black/50 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 flex items-center gap-8 shadow-2xl pointer-events-auto">
            <span className="font-bold text-gray-100 text-lg tracking-tight">Aritha.</span>
            <div className="hidden md:flex gap-6 text-sm font-medium text-gray-400">
              {['Experience', 'Projects', 'Contact'].map((item) => {
                const id = item.toLowerCase();
                const isActive = activeSection === id;
                return (
                  <a
                    key={item}
                    href={`#${id}`}
                    className={`transition-colors relative hover:text-white ${isActive ? 'text-white' : 'text-gray-400'}`}
                  >
                    {item}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500"
                      />
                    )}
                  </a>
                );
              })}
            </div>
          </nav>
        </div>

        <main className="max-w-5xl mx-auto px-6 pt-32 pb-20 relative">

          {/* Hero Section */}
          <section id="hero" className="min-h-[85vh] flex flex-col justify-center relative">
            <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px] pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Open to work
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6">
                Hi, I'm {personalInfo.name.split(' ')[0]}. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400">
                  Full-Stack Engineer & <br /> AI Specialist.
                </span>
              </h1>

              <p className="text-xl text-gray-400 max-w-2xl leading-relaxed mb-8">
                I build scalable full-stack systems and intelligent AI solutions.
                CS Student at <span className="text-gray-100">Sacramento State</span>, specializing in
                <span className="text-gray-100 font-semibold"> RAG architectures</span> and modern web infrastructure.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <SocialLink href={personalInfo.socials.github} icon={Github} label="GitHub" />
                <SocialLink href={personalInfo.socials.linkedin} icon={Linkedin} label="LinkedIn" />
                <SocialLink href={`mailto:${personalInfo.email}`} icon={Mail} label="Email" />
                <SocialLink href={personalInfo.socials.resume} icon={FileText} label="Resume" download={true} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 text-sm"
            >
              <span className="text-xs uppercase tracking-widest">Scroll</span>
              <ChevronDown className="animate-bounce" size={16} />
            </motion.div>
          </section>

          {/* Experience Section */}
          <div id="experience">
            <SectionHeader title="Experience" />
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <SpotlightCard className="p-8">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
                      <div>
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                          {exp.role}
                        </h3>
                        <p className="text-blue-400 font-medium">{exp.company}</p>
                      </div>
                      <span className="text-sm text-gray-500 font-mono bg-white/5 px-3 py-1 rounded-full whitespace-nowrap">
                        {exp.date}
                      </span>
                    </div>

                    <p className="text-gray-400 mb-4 max-w-3xl leading-relaxed">
                      {exp.summary}
                    </p>

                    <ul className="list-disc list-outside ml-4 mb-6 text-gray-400 space-y-2 text-sm">
                      {exp.bullets.map((bullet, i) => (
                        <li key={i} className="pl-1">{bullet}</li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div id="projects">
            <SectionHeader title="Selected Projects" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <SpotlightCard
                    className="h-full p-8 flex flex-col hover:border-blue-500/30 transition-colors group"
                    onClick={() => window.open(project.repoUrl, '_blank')}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold text-gray-100 group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <ExternalLink size={20} className="text-gray-600 group-hover:text-blue-400 transition-colors" />
                    </div>
                    <p className="text-gray-400 leading-relaxed mb-6 flex-grow text-sm">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Skills Marquee */}
          <div className="mt-32">
            <h3 className="text-center text-gray-500 text-sm font-semibold uppercase tracking-widest mb-8">
              Technical Arsenal
            </h3>
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {skills.map((skill, index) => (
                <motion.span
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-300 text-sm font-medium hover:bg-white/10 hover:border-blue-500/30 hover:text-white transition-all cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Footer */}
          <footer id="contact" className="mt-40 text-center border-t border-white/5 pt-12 pb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Let's build something epic.</h2>
            <p className="text-gray-400 mb-8">
              Currently looking for Summer 2026 Internships.
            </p>
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(37,99,235,0.5)]"
            >
              Say Hello
            </a>
            <div className="mt-16 flex justify-center gap-6 text-sm font-medium text-gray-500">
              <span>{personalInfo.location}</span>
              <span className="text-gray-700">•</span>
              <span>© 2026 {personalInfo.name}</span>
            </div>
          </footer>

        </main>
      </motion.div>
    </>
  );
}