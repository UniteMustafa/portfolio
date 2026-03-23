"use client";

import { useMemo } from "react";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import { FiArrowLeft } from "react-icons/fi";
import { usePortfolio } from "@/data/portfolio-context";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const { data } = usePortfolio();

  const project = useMemo(() => {
    return data.projects.find((p) => p.num === id);
  }, [data.projects, id]);

  if (!project) {
    return notFound();
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.4 } }}
      className="min-h-screen py-12 pt-[100px] w-full"
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10">
        
        {/* Back Link */}
        <Link 
          href="/work" 
          className="inline-flex items-center gap-2 text-[#9a9aaa] hover:text-accent font-mono text-sm transition-colors mb-8"
        >
          <FiArrowLeft size={16} />
          Back to Projects
        </Link>

        {/* Hero Image */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
          className="relative w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden bg-[#232329] mb-12 border border-white/5"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1b1b22] via-transparent to-transparent opacity-80" />
        </motion.div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
            className="flex-1"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-8xl leading-none font-extrabold text-transparent font-mono" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.1)" }}>
                {project.num}
              </span>
              <div>
                <span className="text-accent font-mono text-sm tracking-widest uppercase mb-1 block">
                  {project.category}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-white font-mono break-words">
                  {project.title}
                </h1>
              </div>
            </div>

            <p className="text-[#9a9aaa] font-mono text-base leading-relaxed mt-8 bg-[#1e1e26] p-6 rounded-xl border border-white/5">
              {project.description}
            </p>
          </motion.div>

          {/* Sidebar / Meta */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
            className="w-full lg:w-[320px] shrink-0 space-y-8"
          >
            
            {/* Tech Stack */}
            <div className="bg-[#1e1e26] rounded-xl border border-white/5 p-6">
              <h3 className="text-white font-mono font-bold mb-4">Technologies</h3>
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((item, index) => (
                  <li 
                    key={index} 
                    className="text-accent bg-accent/10 px-3 py-1.5 rounded-lg font-mono text-xs border border-accent/20"
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>

            {/* Links */}
            <div className="bg-[#1e1e26] rounded-xl border border-white/5 p-6">
              <h3 className="text-white font-mono font-bold mb-4">Project Links</h3>
              <div className="flex flex-col gap-3">
                <Link 
                  href={project.live || "#"}
                  target={project.live ? "_blank" : undefined}
                  className={`flex items-center justify-between p-3 rounded-lg border font-mono text-sm transition-all ${
                    project.live 
                      ? "border-accent/20 bg-accent/5 hover:bg-accent hover:text-[#1b1b22] text-accent" 
                      : "border-white/5 bg-white/5 text-[#9a9aaa]/50 cursor-not-allowed"
                  }`}
                  onClick={(e) => !project.live && e.preventDefault()}
                >
                  <div className="flex items-center gap-2">
                    <BsArrowUpRight size={18} />
                    <span>Live Preview</span>
                  </div>
                  {!project.live && <span className="text-[10px] uppercase">N/A</span>}
                </Link>

                <Link 
                  href={project.github || "#"}
                  target={project.github ? "_blank" : undefined}
                  className={`flex items-center justify-between p-3 rounded-lg border font-mono text-sm transition-all ${
                    project.github 
                      ? "border-white/20 bg-white/5 hover:bg-white hover:text-[#1b1b22] text-white" 
                      : "border-white/5 bg-white/5 text-[#9a9aaa]/50 cursor-not-allowed"
                  }`}
                  onClick={(e) => !project.github && e.preventDefault()}
                >
                  <div className="flex items-center gap-2">
                    <BsGithub size={18} />
                    <span>Source Code</span>
                  </div>
                  {!project.github && <span className="text-[10px] uppercase">N/A</span>}
                </Link>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}
