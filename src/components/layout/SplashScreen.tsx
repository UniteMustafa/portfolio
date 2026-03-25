"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    // Lock scroll during splash
    document.body.style.overflow = "hidden";

    // Counter logic (0 to 100 in ~2 seconds)
    let start = Date.now();
    const duration = 2000;
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for numbers (easeOutCirc)
      const easeProgress = Math.sqrt(1 - Math.pow(progress - 1, 2));
      setPercent(Math.floor(easeProgress * 100));

      if (progress === 1) clearInterval(interval);
    }, 16);

    const timer = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, 2800);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
          
          {/* LEFT CURTAIN */}
          <motion.div
            className="absolute top-0 left-0 w-1/2 h-full z-10"
            style={{ backgroundColor: "#111116" }}
            exit={{ 
              x: "-100%", 
              transition: { delay: 0.1, duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
            }}
          />

          {/* RIGHT CURTAIN */}
          <motion.div
            className="absolute top-0 right-0 w-1/2 h-full z-10"
            style={{ backgroundColor: "#111116" }}
            exit={{ 
              x: "100%", 
              transition: { delay: 0.1, duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
            }}
          />

          {/* CONTENT INSIDE CURTAINS */}
          <motion.div 
            className="relative z-20 flex flex-col items-center justify-center mt-[-30px]"
            exit={{ opacity: 0, scale: 1.2, transition: { duration: 0.5 } }}
          >
            {/* SVG Logo drawing animation */}
            <motion.svg 
              width="120" 
              height="120" 
              viewBox="0 0 100 100" 
              className="mb-8"
              initial={{ filter: "drop-shadow(0px 0px 0px var(--color-accent))" }}
              animate={{ filter: "drop-shadow(0px 0px 20px color-mix(in srgb, var(--color-accent) 40%, transparent))" }}
              transition={{ delay: 2.2, duration: 0.4 }}
            >
              {/* Outer circle spinning */}
              <motion.circle
                cx="50"
                cy="50"
                r="46"
                stroke="var(--color-text-muted)"
                strokeWidth="1"
                fill="none"
                strokeDasharray="20 40"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                style={{ transformOrigin: "center" }}
              />

              {/* The 'M' Letter Path */}
              <motion.path
                d="M 25 75 L 25 25 L 50 50 L 75 25 L 75 75"
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              
              {/* Fill 'M' at the end */}
              <motion.path
                d="M 25 75 L 25 25 L 50 50 L 75 25 L 75 75"
                fill="var(--color-accent)"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.2, 0] }}
                transition={{ delay: 2, duration: 0.5 }}
              />
            </motion.svg>

            {/* Futuristic Counter & Bar */}
            <div className="flex flex-col items-center gap-4">
              <div 
                className="font-mono text-4xl font-light tracking-widest text-white"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {percent.toString().padStart(3, '0')}
                <span style={{ color: "var(--color-accent)", fontSize: "0.5em", verticalAlign: "top" }}>%</span>
              </div>
              
              <div className="w-[200px] h-[1px] bg-white/10 overflow-hidden relative">
                <motion.div 
                  className="absolute top-0 left-0 h-full"
                  style={{ backgroundColor: "var(--color-accent)", boxShadow: "0 0 10px var(--color-accent)" }}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, ease: "circOut" }}
                />
              </div>
            </div>
            
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
