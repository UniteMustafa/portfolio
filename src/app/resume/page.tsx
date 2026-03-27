"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaFigma,
  FaNodeJs
} from "react-icons/fa";
import { SiTailwindcss, SiNextdotjs } from "react-icons/si";
import { usePortfolio } from "@/data/portfolio-context";
import type { IconType } from "react-icons";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const skillIconMap: Record<string, IconType> = {
  html: FaHtml5,
  css: FaCss3,
  js: FaJs,
  react: FaReact,
  next: SiNextdotjs,
  tailwind: SiTailwindcss,
  node: FaNodeJs,
  figma: FaFigma,
};

const AnimatedTitleBox = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`relative inline-flex overflow-hidden rounded-xl p-[3px] ${className}`}>
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
      className="absolute top-1/2 left-1/2 w-[300%] h-[300%] origin-center -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(var(--color-accent)_0deg,transparent_180deg,var(--color-accent)_360deg)] z-0"
    />
    <div className="relative z-10 bg-[#1b1b22] px-6 py-4 rounded-xl w-full h-full flex items-center justify-center">
      {children}
    </div>
  </div>
);

type TabKey = "experience" | "education" | "skills" | "about";

export default function ResumePage() {
  const { data } = usePortfolio();
  const [activeTab, setActiveTab] = useState<TabKey>("experience");
  const resume = data.resume;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.4, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-screen flex justify-center py-12 xl:py-0 w-full pt-[80px] md:pt-[100px] xl:pt-[150px]"
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 mt-12 md:mt-16 xl:mt-0">
        <div className="flex flex-col xl:flex-row gap-[40px] xl:gap-0">
          
          {/* Left Column (Navigation) */}
          <div className="w-full xl:w-[400px] flex flex-col gap-8 border-b xl:border-b-0 xl:border-r border-white/10 pb-10 xl:pb-0 pr-0 xl:pr-[60px]">
            <h2 className="text-4xl md:text-[42px] font-bold font-mono border-b-2 border-accent pb-3 w-fit mx-auto xl:mx-0 mb-2">Why hire me?</h2>
            <div className="text-[#9a9aaa] leading-relaxed max-w-[380px] font-mono text-sm md:text-base prose prose-invert prose-p:my-0 prose-a:text-accent hover:prose-a:text-accent-hover prose-strong:text-white prose-em:text-white/80" style={{ whiteSpace: "pre-line" }}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {`Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nScelerisque consequat, faucibus et, et.`}
              </ReactMarkdown>
            </div>

            <div className="flex flex-col gap-4">
              {[
                { key: "experience", label: "Experience" },
                { key: "education", label: "Education" },
                { key: "skills", label: "Skills" },
                { key: "about", label: "About me" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as TabKey)}
                  className={`w-full text-center xl:text-left py-4 px-6 rounded-lg font-bold font-mono transition-all duration-300 ${activeTab === tab.key
                      ? "bg-accent text-[#1b1b22]"
                      : "bg-[#232329] text-white hover:bg-[#232329]/80"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column (Content) */}
          <div className="w-full xl:w-2/3 min-h-[480px] md:min-h-[550px] xl:min-h-[600px] xl:pl-[60px]">
            <AnimatePresence mode="wait">
              {/* EXPERIENCE */}
              {activeTab === "experience" && (
                <motion.div
                  key="experience"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-[30px]"
                >
                  <AnimatedTitleBox className="mb-2 mx-auto xl:mx-0 w-fit">
                    <h3 className="text-3xl md:text-4xl font-bold font-mono text-center xl:text-left w-fit">
                      {resume.experienceTitle}
                    </h3>
                  </AnimatedTitleBox>
                  <div className="text-[#9a9aaa] font-mono text-sm leading-relaxed mx-auto xl:mx-0 max-w-[600px] text-center xl:text-left prose prose-invert prose-p:my-0 prose-a:text-accent hover:prose-a:text-accent-hover prose-strong:text-white prose-em:text-white/80" style={{ whiteSpace: "pre-line" }}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {resume.experienceDescription}
                    </ReactMarkdown>
                  </div>

                  <div className="h-[400px] overflow-y-scroll resume-scroll pr-4 md:pr-6 mt-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                      {resume.experienceItems.map((item, index) => (
                        <div
                          key={index}
                          className="bg-[#232329] p-6 lg:p-8 rounded-xl flex flex-col justify-center items-center xl:items-start text-center xl:text-left gap-4"
                        >
                          <span className="text-accent font-mono">{item.duration}</span>
                          <h4 className="text-xl max-w-[260px] min-h-[50px] font-bold font-mono">
                            {item.position}
                          </h4>
                          <div className="flex items-center gap-3">
                            <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                            <p className="text-[#9a9aaa] font-mono text-sm">{item.company}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* EDUCATION */}
              {activeTab === "education" && (
                <motion.div
                  key="education"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-[30px]"
                >
                  <AnimatedTitleBox className="mb-2 mx-auto xl:mx-0 w-fit">
                    <h3 className="text-3xl md:text-4xl font-bold font-mono text-center xl:text-left w-fit">
                      {resume.educationTitle}
                    </h3>
                  </AnimatedTitleBox>
                  <div className="text-[#9a9aaa] font-mono text-sm leading-relaxed mx-auto xl:mx-0 max-w-[600px] text-center xl:text-left prose prose-invert prose-p:my-0 prose-a:text-accent hover:prose-a:text-accent-hover prose-strong:text-white prose-em:text-white/80" style={{ whiteSpace: "pre-line" }}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {resume.educationDescription}
                    </ReactMarkdown>
                  </div>

                  <div className="h-[400px] overflow-y-scroll resume-scroll pr-4 md:pr-6 mt-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                      {resume.educationItems.map((item, index) => (
                        <div
                          key={index}
                          className="bg-[#232329] p-6 lg:p-8 rounded-xl flex flex-col justify-center items-center xl:items-start text-center xl:text-left gap-4"
                        >
                          <span className="text-accent font-mono">{item.duration}</span>
                          <h4 className="text-xl max-w-[260px] min-h-[50px] font-bold font-mono">
                            {item.degree}
                          </h4>
                          <div className="flex items-center gap-3">
                            <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                            <p className="text-[#9a9aaa] font-mono text-sm">{item.institution}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* SKILLS */}
              {activeTab === "skills" && (
                <motion.div
                  key="skills"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-[30px]"
                >
                  <AnimatedTitleBox className="mb-2 mx-auto xl:mx-0 w-fit">
                    <h3 className="text-3xl md:text-4xl font-bold font-mono text-center xl:text-left w-fit">
                      {resume.skillsTitle}
                    </h3>
                  </AnimatedTitleBox>
                  <div className="text-[#9a9aaa] font-mono text-sm leading-relaxed mx-auto xl:mx-0 max-w-[600px] text-center xl:text-left prose prose-invert prose-p:my-0 prose-a:text-accent hover:prose-a:text-accent-hover prose-strong:text-white prose-em:text-white/80" style={{ whiteSpace: "pre-line" }}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {resume.skillsDescription}
                    </ReactMarkdown>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xl:gap-[30px] w-full mt-4">
                    {resume.skillsList.map((skill, index) => {
                      const Icon = skillIconMap[skill.iconKey] || FaHtml5;
                      return (
                        <div
                          key={index}
                          className="relative group flex items-center justify-center w-full h-[120px] sm:h-[150px] bg-[#232329] rounded-xl hover:bg-[#2a2a33] transition-colors"
                        >
                          <div className="text-5xl sm:text-6xl text-white group-hover:text-accent transition-colors duration-300">
                            <Icon />
                          </div>
                          <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                            <div className="bg-white text-[#1b1b22] px-3 py-1.5 rounded-md font-bold text-sm shadow-xl flex items-center justify-center">
                              {skill.name}
                              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-solid border-t-white border-t-[6px] border-x-transparent border-x-[6px] border-b-0"></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* ABOUT ME */}
              {activeTab === "about" && (
                <motion.div
                  key="about"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-[30px]"
                >
                  <AnimatedTitleBox className="mb-2 mx-auto xl:mx-0 w-fit">
                    <h3 className="text-3xl md:text-4xl font-bold font-mono text-center xl:text-left w-fit">
                      {resume.aboutTitle}
                    </h3>
                  </AnimatedTitleBox>
                  <div className="text-[#9a9aaa] font-mono text-sm leading-relaxed mx-auto xl:mx-0 max-w-[600px] text-center xl:text-left prose prose-invert prose-p:my-0 prose-a:text-accent hover:prose-a:text-accent-hover prose-strong:text-white prose-em:text-white/80" style={{ whiteSpace: "pre-line" }}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {resume.aboutDescription}
                    </ReactMarkdown>
                  </div>

                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-[30px] max-w-[740px] mx-auto xl:mx-0 mt-8">
                    {resume.aboutInfo.map((item, index) => (
                      <li
                        key={index}
                        className="bg-[#232329] p-4 lg:p-6 rounded-xl flex items-center justify-start gap-4 transition-all hover:bg-[#2a2a33]"
                      >
                        <span className="text-[#9a9aaa] font-mono text-sm min-w-[90px] xl:min-w-[100px] text-left">{item.fieldName}</span>
                        <span className="text-white font-mono text-base md:text-lg font-semibold text-left truncate">{item.fieldValue}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </motion.section>
  );
}
