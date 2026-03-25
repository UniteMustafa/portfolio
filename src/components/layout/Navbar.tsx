"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { usePortfolio } from "@/data/portfolio-context";
import { navLinks } from "@/lib/constants";

export default function Navbar() {
  const pathname = usePathname();
  const { data } = usePortfolio();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastY, setLastY] = useState(0);

  const { scrollY } = useScroll();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 1200) {
        if (latest > lastY && latest > 60) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
    }
    setLastY(latest);
  });

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ backgroundColor: "rgba(27, 27, 34, 0.95)", backdropFilter: "blur(8px)" }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="relative inline-block text-white font-bold text-xl tracking-tight font-mono pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[50%] after:h-[2px] after:bg-accent"
        >
          {data.settings.logoText}
          <span className="text-accent">.</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-sm font-medium transition-colors hover:text-accent ${isActive ? "text-accent" : "text-[#9a9aaa]"
                  }`}
              >
                {link.name}
                {isActive && (
                  <motion.span
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                    style={{ backgroundColor: "var(--color-accent)" }}
                  />
                )}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="px-5 py-2 rounded-full text-sm font-bold font-mono transition-all"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "#1b1b22",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--color-accent-hover)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--color-accent)")
            }
          >
            Hire me
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white text-3xl z-40 transition-transform hover:scale-110 hover:text-accent"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <FiMenu />
        </button>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center p-6"
            style={{ 
              backgroundColor: "rgba(23, 23, 33, 0.98)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 text-white text-3xl p-3 rounded-full bg-white/5 hover:bg-white/10 hover:rotate-90 hover:text-accent transition-all duration-300"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <FiX />
            </button>

            {/* Menu Links */}
            <div className="flex flex-col items-center gap-8 w-full">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.4, type: "spring" }}
                    onClick={() => setMobileOpen(false)}
                  >
                    <Link
                      href={link.href}
                      className={`text-4xl sm:text-5xl font-bold font-mono transition-all duration-300 inline-block ${
                        isActive 
                          ? "text-accent scale-110" 
                          : "text-white/60 hover:text-white hover:scale-105"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile Footer CTA */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute bottom-12 left-6 right-6"
            >
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center w-full py-5 rounded-xl text-xl font-bold font-mono transition-all hover:scale-[1.02]"
                style={{
                  backgroundColor: "var(--color-accent)",
                  color: "#1b1b22",
                  boxShadow: "0 10px 30px -10px var(--color-accent)"
                }}
              >
                Hire me
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
