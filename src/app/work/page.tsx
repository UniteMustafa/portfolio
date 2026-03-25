"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { usePortfolio } from "@/data/portfolio-context";

export default function WorkPage() {
  const { data } = usePortfolio();
  const [projectIndex, setProjectIndex] = useState(0);

  const activeProject = data.projects[projectIndex];

  const handleNext = () => {
    if (projectIndex === data.projects.length - 1) {
      setProjectIndex(0);
    } else {
      setProjectIndex(projectIndex + 1);
    }
  };

  const handlePrev = () => {
    if (projectIndex === 0) {
      setProjectIndex(data.projects.length - 1);
    } else {
      setProjectIndex(projectIndex - 1);
    }
  };

  if (!activeProject) return null;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.4, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-screen flex items-center justify-center py-12 xl:py-0 w-full pt-[80px] md:pt-[100px]"
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 mt-8 md:mt-24">
        <div className="flex flex-col xl:flex-row gap-[60px] xl:gap-[30px]">
          
          {/* Left Block (Text Content) */}
          <div className="w-full xl:w-[50%] flex flex-col justify-between order-2 xl:order-none">
            <div className="flex flex-col gap-[30px] h-[50%]">
              <div 
                className="text-8xl leading-none font-extrabold text-transparent font-mono"
                style={{ WebkitTextStroke: "2px white" }}
              >
                {activeProject.num}
              </div>
              
              <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize font-mono border-b-2 border-accent pb-3 w-fit">
                {activeProject.title}
              </h2>

              <p className="text-muted text-sm md:text-base leading-relaxed font-mono">
                {activeProject.description}
              </p>

              <ul className="flex flex-wrap gap-3">
                {activeProject.stack.map((item, index) => {
                  return (
                    <li 
                      key={index} 
                      className="text-accent bg-accent/10 px-4 py-1.5 rounded-lg font-mono text-sm shadow-[0_0_10px_var(--color-accent-glow)] border border-accent/20 transition-all hover:-translate-y-1 hover:bg-accent/20"
                    >
                      {item.name}
                    </li>
                  );
                })}
              </ul>

              {/* Dot indicators — Task 14 */}
              <div className="flex items-center gap-2">
                {data.projects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setProjectIndex(i)}
                    aria-label={`Go to project ${i + 1}`}
                    className={`rounded-full transition-all duration-300 ${
                      i === projectIndex
                        ? "w-8 h-2.5 bg-accent"
                        : "w-2.5 h-2.5 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>

              <div className="border border-white/20" />

              <div className="flex items-center gap-4">
                <Link 
                  href={`/work/${activeProject.num}`}
                  className="px-6 py-3 bg-accent hover:bg-accent-hover text-[#1b1b22] font-bold font-mono text-sm rounded-full transition-all flex items-center gap-2"
                >
                  View Details <BsArrowUpRight size={16} />
                </Link>

                <div className="w-[1px] h-10 bg-white/20 mx-2 hidden sm:block"></div>

                <Link href={activeProject.live || "#"}>
                  <div className={`w-[60px] h-[60px] rounded-full flex justify-center items-center group transition-all duration-300 ${activeProject.live ? "bg-bg-secondary hover:bg-accent" : "bg-white/5 cursor-not-allowed"}`}>
                    <BsArrowUpRight className={`text-2xl transition-all duration-500 ${activeProject.live ? "text-white group-hover:text-bg group-hover:rotate-45" : "text-muted/20"}`} />
                  </div>
                </Link>
                <Link href={activeProject.github || "#"}>
                  <div className={`w-[60px] h-[60px] rounded-full flex justify-center items-center group transition-all duration-300 ${activeProject.github ? "bg-bg-secondary hover:bg-accent" : "bg-white/5 cursor-not-allowed"}`}>
                    <BsGithub className={`text-2xl transition-colors ${activeProject.github ? "text-white group-hover:text-bg" : "text-muted/20"}`} />
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Block (Image Slider) */}
          <div className="w-full xl:w-[50%] flex flex-col gap-6 order-1 xl:order-none">
            <div className="relative h-[300px] sm:h-[400px] xl:h-[460px] w-full bg-[#232329] group overflow-hidden">
              <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none"></div>
              <div className="relative w-full h-full">
                <Image
                  src={activeProject.image}
                  fill
                  className="object-cover"
                  alt={activeProject.title}
                  priority
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-between xl:items-end xl:justify-end xl:bottom-0 z-20 px-2 xl:px-0">
                <button
                  onClick={handlePrev}
                  className="xl:hidden w-[44px] h-[44px] bg-accent flex justify-center items-center text-[#1b1b22] text-[22px] transition-all"
                >
                  <FiChevronLeft />
                </button>
                <button
                  onClick={handleNext}
                  className="xl:hidden w-[44px] h-[44px] bg-accent flex justify-center items-center text-[#1b1b22] text-[22px] transition-all"
                >
                  <FiChevronRight />
                </button>
              </div>
            </div>

            <div className="hidden xl:flex w-full justify-end gap-2">
              <button
                onClick={handlePrev}
                className="w-[44px] h-[44px] bg-accent hover:bg-accent-hover flex justify-center items-center text-[#1b1b22] text-[22px] transition-all"
              >
                <FiChevronLeft />
              </button>
              <button
                onClick={handleNext}
                className="w-[44px] h-[44px] bg-accent hover:bg-accent-hover flex justify-center items-center text-[#1b1b22] text-[22px] transition-all"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
