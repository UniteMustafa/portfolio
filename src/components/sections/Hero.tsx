"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import { usePortfolio } from "@/data/portfolio-context";
import { socialIconMap } from "@/lib/constants";

export default function Hero() {
  const { data } = usePortfolio();
  const { name, subtitle, description, photoUrl, socialLinks } = data.hero;

  return (
    <section className="relative w-full h-full min-h-[65vh] md:min-h-0 flex items-center py-10 md:py-0 overflow-hidden">
      <div className="w-full max-w-[1300px] mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center gap-10 md:gap-20">

        {/* LEFT — Text content */}
        <motion.div
          className="flex-1 flex flex-col gap-5 text-center md:text-left md:mt-10 order-2 md:order-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Subtitle */}
          <motion.p
            className="text-sm font-mono tracking-widest"
            style={{ color: "var(--color-text-muted)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
          >
            {subtitle}
          </motion.p>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            <h1 className="font-mono font-bold leading-tight" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)" }}>
              <span className="text-white">Hello I&apos;m</span>
              <br />
              <span className="inline-flex items-center mt-1 md:mt-0">
                <motion.span
                  initial={{ backgroundPosition: "200% center" }}
                  animate={{ backgroundPosition: "-200% center" }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  className="bg-clip-text text-transparent bg-[length:200%_auto] tracking-tight"
                  style={{
                    backgroundImage: "linear-gradient(110deg, var(--color-accent) 0%, var(--color-accent) 40%, #ffffff 50%, var(--color-accent) 60%, var(--color-accent) 100%)",
                    filter: "drop-shadow(0 0 15px color-mix(in srgb, var(--color-accent) 30%, transparent))",
                  }}
                >
                  {name}
                </motion.span>
              </span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-sm md:text-base leading-relaxed max-w-[500px]"
            style={{ color: "var(--color-text-muted)", fontFamily: "JetBrains Mono, monospace" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            {description}
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center md:items-start gap-4 mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.5 }}
          >
            {/* Download CV */}
            <a
              href="/assets/resume.pdf"
              download
              className="flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold font-mono tracking-widest transition-all border border-accent text-accent hover:bg-accent hover:text-bg"
            >
              DOWNLOAD CV <FiDownload className="text-sm" />
            </a>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ iconKey, href, label }) => {
                const Icon = socialIconMap[iconKey] || FaGithub;
                return (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-accent text-accent hover:bg-accent hover:text-bg transition-all"
                  >
                    <Icon size={16} />
                  </Link>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT — Photo with orbit animation */}
        <motion.div
          className="flex-1 flex items-center justify-center md:justify-end mt-20 md:mt-16 relative order-1 md:order-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          {/* Orbit container */}
          <div className="relative w-[320px] h-[320px] md:w-[430px] md:h-[430px]">
            {/* Rotating orbit ring (SVG dashes) */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, ease: "linear", repeat: Infinity }}
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 360 360"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0"
              >
                <circle
                  cx="180"
                  cy="180"
                  r="165"
                  stroke="var(--color-accent)"
                  strokeWidth="2"
                  strokeDasharray="20 28"
                  strokeLinecap="round"
                  opacity="0.6"
                />
              </svg>
            </motion.div>

            {/* Counter-rotating inner ring */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: -360 }}
              transition={{ duration: 35, ease: "linear", repeat: Infinity }}
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 360 360"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0"
              >
                <circle
                  cx="180"
                  cy="180"
                  r="148"
                  stroke="var(--color-accent)"
                  strokeWidth="1.5"
                  strokeDasharray="8 40"
                  strokeLinecap="round"
                  opacity="0.35"
                />
              </svg>
            </motion.div>

            {/* Profile Image */}
            <div
              className="absolute inset-[10%] rounded-full overflow-hidden border-2"
              style={{ borderColor: "var(--color-accent)", boxShadow: "0 0 50px color-mix(in srgb, var(--color-accent) 18%, transparent)" }}
            >
              <Image
                src={photoUrl}
                alt={name}
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
