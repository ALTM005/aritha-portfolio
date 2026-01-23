import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue, animate } from 'framer-motion';
import { MapPin, Github, Linkedin, Mail, ArrowUpRight, ChevronDown } from 'lucide-react';

// --- Personal Data (Unchanged) ---
const personalInfo = {
  name: "Aritha Munasinghe",
  title: "CS Student • Passionate about AI, RAG Architectures & Full-Stack Systems",
  education: "B.S. Computer Science • California State University, Sacramento (Exp. May 2027)",
  location: "Sacramento, CA",
  email: "arithaltm@gmail.com",
  socials: {
    github: "https://github.com/ALTM005",
    linkedin: "https://linkedin.com/in/aritham",
  }
};

const projects = [
  {
    title: "Generative AI Knowledge Retrieval Engine",
    date: "Dec. 2025",
    description: "Engineered an end-to-end RAG pipeline using FastAPI to enable context-aware semantic search. Implemented PostgreSQL with pgvector for high-dimensional embedding storage and sub-second retrieval.",
    tags: ["Python", "FastAPI", "PostgreSQL", "RAG", "pgvector"]
  },
  {
    title: "AI-Powered Campus Navigator",
    date: "Oct. 2025",
    description: "Built a centralized AI search engine scraping live web data to locate campus events in real-time. Utilized Tavily API for data pipelines and React/TypeScript for a geospatial frontend.",
    tags: ["Python", "FastAPI", "Tavily API", "React", "TypeScript"]
  },
  {
    title: "Real-Time Collaborative Infrastructure",
    date: "Aug. 2025",
    description: "Architected a low-latency collaboration platform using Socket.IO for sub-100ms synchronization. Designed a secure, sandboxed code execution environment using Docker.",
    tags: ["React", "TypeScript", "WebSocket", "Docker", "Supabase"]
  }
];

const experience = [
  {
    company: "DRM Electronics",
    role: "Junior Software Engineer",
    date: "Dec. 2023 – Aug. 2024",
    description: "Optimized PostgreSQL schemas reducing latency by 40%. Scaled Node.js backend for high concurrent traffic and modernized the Angular front-end for 25% faster responsiveness.",
    tags: ["PostgreSQL", "Node.js", "Angular", "Java"]
  },
  {
    company: "DRM Electronics",
    role: "Software Engineering Intern",
    date: "Aug. 2023 – Dec. 2023",
    description: "Developed responsive web interfaces driving a 30% increase in user engagement. Implemented Node.js backend services and engineered reusable Angular components.",
    tags: ["HTML/CSS", "JavaScript", "Node.js", "CI/CD"]
  }
];

const skills = [
  "Python", "SQL (PostgreSQL)", "TypeScript", "React", "FastAPI", 
  "Docker", "AWS", "RAG Architectures", "Vector DBs", "CI/CD"
];

// --- Fancy Components ---

/**
 * SpotlightCard: Tracks mouse position to create a glowing gradient effect
 */
function SpotlightCard({ children, className = "" }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group relative border border-white/10 bg-gray-900/50 overflow-hidden rounded-xl ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(59, 130, 246, 0.15),
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
    className="flex items-center gap-4 mb-12 mt-24"
  >
    <h2 className="text-3xl font-bold text-gray-100">{title}</h2>
    <div className="h-px bg-gradient-to-r from-blue-500/50 to-transparent flex-grow" />
  </motion.div>
);

const SocialLink = ({ href, icon: Icon, label }) => (
  <a 
    href={href} 
    target="_blank"
    rel="noreferrer"
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

  useEffect(() => {
    animate(color, COLORS, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  return (
    <motion.div 
      style={{ backgroundImage }}
      className="min-h-screen bg-gray-950 text-gray-300 font-sans selection:bg-blue-500/30 overflow-x-hidden"
    >
      {/* Floating Glass Navbar */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <nav className="bg-black/50 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 flex items-center gap-8 shadow-2xl">
          <span className="font-bold text-gray-100 text-lg tracking-tight">Aritha.</span>
          <div className="hidden md:flex gap-6 text-sm font-medium text-gray-400">
            {['Projects', 'Experience', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-blue-400 transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full" />
              </a>
            ))}
          </div>
        </nav>
      </div>

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-20 relative">
        
        {/* Hero Section */}
        <section className="min-h-[80vh] flex flex-col justify-center relative">
          {/* Background Glow Blob */}
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

            <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight mb-6">
              Building the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400">
                Future of AI.
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl leading-relaxed mb-10">
              {personalInfo.title}. Specializing in <span className="text-gray-100 font-semibold">RAG architectures</span>, 
              scalable systems, and full-stack engineering.
            </p>

            <div className="flex flex-wrap gap-4">
              <SocialLink href={personalInfo.socials.github} icon={Github} label="GitHub" />
              <SocialLink href={personalInfo.socials.linkedin} icon={Linkedin} label="LinkedIn" />
              <SocialLink href={`mailto:${personalInfo.email}`} icon={Mail} label="Email Me" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 text-sm"
          >
            <span>Scroll to explore</span>
            <ChevronDown className="animate-bounce" size={16} />
          </motion.div>
        </section>

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
                <SpotlightCard className="h-full p-8 flex flex-col hover:border-blue-500/30 transition-colors group">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-gray-100 group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="text-gray-600 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <p className="text-gray-400 leading-relaxed mb-6 flex-grow">
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
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2">
                    <div>
                      <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                      <p className="text-blue-400 font-medium">{exp.company}</p>
                    </div>
                    <span className="text-sm text-gray-500 font-mono bg-white/5 px-3 py-1 rounded-full">
                      {exp.date}
                    </span>
                  </div>
                  <p className="text-gray-400 mb-6 max-w-3xl">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skills Marquee */}
        <div className="mt-24">
          <h3 className="text-center text-gray-500 text-sm font-semibold uppercase tracking-widest mb-8">
            Technical Arsenal
          </h3>
          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
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
          <div className="mt-16 flex justify-center gap-6 text-sm text-gray-600">
             <span>{personalInfo.location}</span>
             <span>•</span>
             <span>© 2026 Aritha Munasinghe</span>
          </div>
        </footer>

      </main>
    </motion.div>
  );
}