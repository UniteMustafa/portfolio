"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { usePortfolio } from "@/data/portfolio-context";

// Module-level flag: false on every hard refresh (JS re-executes), true after first mount
let splashAlreadyPlayed = false;

function AnimatedNumber({
  target,
  duration = 2500,
  startDelay = 0,
}: {
  target: number;
  duration?: number;
  startDelay?: number;
}) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      let startTime: number | null = null;

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(target * eased));
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(step);
        }
      };

      rafRef.current = requestAnimationFrame(step);
    }, startDelay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, startDelay]);

  return <span>{count}</span>;
}

export default function Stats() {
  const { data } = usePortfolio();
  const startDelay = splashAlreadyPlayed ? 0 : 2500;

  useEffect(() => {
    splashAlreadyPlayed = true;
  }, []);

  return (
    <section
      className="w-full border-t pt-8 pb-8 md:pt-8 md:pb-2"
      style={{ borderColor: "rgba(255,255,255,0.06)" }}
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10">
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x justify-items-center md:justify-items-center"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          {data.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex items-center gap-3 md:px-8 md:first:pl-0 w-full justify-center md:justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + i * 0.1, duration: 0.5 }}
            >
              <span
                className="font-mono font-bold leading-none"
                style={{
                  color: "var(--color-text)",
                  fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                }}
              >
                <AnimatedNumber
                  target={stat.value}
                  duration={2500}
                  startDelay={startDelay}
                />
              </span>
              <span
                className="text-xs leading-snug font-mono whitespace-pre-line"
                style={{ color: "var(--color-text-muted)" }}
              >
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
