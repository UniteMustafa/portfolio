"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowDownRight } from "react-icons/bs";
import { usePortfolio } from "@/data/portfolio-context";

export default function ServicesPage() {
  const { data } = usePortfolio();

  return (
    <section className="min-h-screen flex items-center justify-center py-12 xl:py-0 w-full pt-[80px] md:pt-[100px]">
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 0.4, duration: 0.4, ease: "easeIn" },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-[60px] mt-8 md:mt-16"
        >
          {data.services.map((item, index) => {
            return (
              <div
                key={index}
                className="flex-1 flex flex-col justify-center gap-6 group cursor-pointer"
              >
                {/* Top: Number and Button */}
                <div className="w-full flex justify-between items-center">
                  <div
                    className="text-5xl font-extrabold text-transparent transition-all duration-500 font-mono [-webkit-text-stroke:1px_white] group-hover:[-webkit-text-stroke:1px_var(--color-accent)]"
                  >
                    {item.num}
                  </div>
                  <Link
                    href={item.href}
                    className="w-[70px] h-[70px] rounded-full bg-white group-hover:bg-accent transition-all duration-500 flex justify-center items-center"
                  >
                    <BsArrowDownRight className="text-[#1b1b22] text-3xl group-hover:-rotate-45 transition-transform duration-500" />
                  </Link>
                </div>
                
                {/* Title */}
                <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 font-mono border-b-2 border-accent pb-3 w-fit">
                  {item.title}
                </h2>
                
                {/* Description */}
                <p style={{ color: "var(--color-text-muted)", fontFamily: "JetBrains Mono, monospace" }}>
                  {item.description}
                </p>
                
                {/* Divider Line */}
                <div className="border-b border-white/20 w-full mt-4"></div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
