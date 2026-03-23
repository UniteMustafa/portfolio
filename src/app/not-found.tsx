"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiHome, FiArrowLeft } from "react-icons/fi";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="text-center max-w-md">
        {/* Big 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1
            className="text-[120px] sm:text-[160px] font-extrabold leading-none font-mono text-transparent select-none"
            style={{ WebkitTextStroke: "2px var(--color-accent)" }}
          >
            404
          </h1>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-white font-mono font-bold text-xl mt-2 mb-3">
            Page Not Found
          </h2>
          <p className="text-[#9a9aaa] font-mono text-sm leading-relaxed mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-[#1b1b22] font-bold font-mono text-sm rounded-full transition-all"
          >
            <FiHome size={16} />
            Go Home
          </Link>
          <button
            onClick={() => history.back()}
            className="flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-accent text-[#9a9aaa] hover:text-accent font-mono text-sm rounded-full transition-all"
          >
            <FiArrowLeft size={16} />
            Go Back
          </button>
        </motion.div>

        {/* Decorative accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="h-[2px] bg-accent/20 mt-12 mx-auto max-w-[200px]"
        />
      </div>
    </div>
  );
}
