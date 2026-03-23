"use client";

import { motion } from "framer-motion";

/**
 * Full-page loading skeleton shown while portfolio data loads from Supabase.
 * Prevents the flash of default/empty data.
 */
export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--color-bg)" }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="w-10 h-10 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
        <p className="text-[#9a9aaa]/50 font-mono text-xs">Loading...</p>
      </motion.div>
    </div>
  );
}
