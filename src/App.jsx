import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Github, Linkedin } from 'lucide-react';

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
    description: "Built a centralized AI search engine scraping live web data to locate campus events in real-time. utilized Tavily API for data pipelines and React/TypeScript for a geospatial frontend.",
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

const Badge = ({ children }) => (
  <span className="px-3 py-1 text-xs font-medium text-blue-400 bg-blue-900/20 rounded-full border border-blue-900/50">
    {children}
  </span>
);

const Card = ({ title, date, description, tags, subtitle }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-6 rounded-2xl bg-[#111] border border-gray-800 hover:border-blue-500/50 transition-colors duration-300"
  >
    <div className="flex justify-between items-start mb-2">
      <div>
        <h3 className="text-xl font-bold text-gray-100">{title}</h3>
        {subtitle && <p className="text-sm text-blue-400 font-medium mb-1">{subtitle}</p>}
      </div>
      <span className="text-xs text-gray-500 font-mono">{date}</span>
    </div>
    <p className="text-gray-400 text-sm leading-relaxed mb-4">{description}</p>
    <div className="flex flex-wrap gap-2 mt-auto">
      {tags.map((tag, i) => (
        <Badge key={i}>{tag}</Badge>
      ))}
    </div>
  </motion.div>
);

const SectionHeader = ({ title }) => (
  <h2 className="text-3xl font-bold text-center text-gray-100 mb-12 mt-20">
    {title}
  </h2>
);

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 font-sans selection:bg-blue-500/30">
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-bold text-gray-100 text-lg">Aritha.</span>
          <div className="flex gap-6 text-sm font-medium text-gray-400">
            <a href="#projects" className="hover:text-blue-400 transition-colors">Projects</a>
            <a href="#experience" className="hover:text-blue-400 transition-colors">Experience</a>
            <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-20"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600 mb-6 tracking-tight">
            Hi, I'm {personalInfo.name.split(' ')[0]}
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-2">
            {personalInfo.title}
          </p>
          <p className="text-sm text-gray-500 mb-8">
            {personalInfo.education}
          </p>
          
          <div className="flex justify-center items-center gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <MapPin size={16} className="text-blue-500" /> {personalInfo.location}
            </span>
            <a href={personalInfo.socials.github} className="flex items-center gap-2 hover:text-white transition-colors">
              <Github size={16} className="text-blue-500" /> GitHub
            </a>
            <a href={personalInfo.socials.linkedin} className="flex items-center gap-2 hover:text-white transition-colors">
              <Linkedin size={16} className="text-blue-500" /> LinkedIn
            </a>
          </div>
        </motion.section>

        <SectionHeader title="Projects" />
        <div id="projects" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card {...project} />
            </motion.div>
          ))}
        </div>

        <SectionHeader title="Experience" />
        <div id="experience" className="space-y-6">
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                title={exp.role} 
                subtitle={exp.company}
                date={exp.date} 
                description={exp.description} 
                tags={exp.tags} 
              />
            </motion.div>
          ))}
        </div>

        <SectionHeader title="Technical Skills" />
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3"
        >
          {skills.map((skill, index) => (
            <span key={index} className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-400 text-sm hover:border-blue-500/30 hover:text-blue-400 transition-colors cursor-default">
              {skill}
            </span>
          ))}
        </motion.div>

        <footer id="contact" className="mt-32 text-center border-t border-gray-900 pt-12">
          <p className="text-gray-500 mb-4">Let's build something together.</p>
          <a href={`mailto:${personalInfo.email}`} className="text-2xl font-bold hover:text-blue-400 transition-colors">
            {personalInfo.email}
          </a>
          <p className="text-xs text-gray-700 mt-12">
            © 2026 Aritha Munasinghe. Built with React & Tailwind.
          </p>
        </footer>
      </main>
    </div>
  );
}