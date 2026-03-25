"use client";

import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { usePortfolio } from "@/data/portfolio-context";
import { navLinks, socialIconMap } from "@/lib/constants";

export default function Footer() {
  const { data } = usePortfolio();
  const { socialLinks } = data.hero;
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative z-10 w-full border-t mt-auto"
      style={{ borderColor: "rgba(255,255,255,0.06)" }}
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 py-10 md:py-14">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
          {/* Logo & tagline */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <Link
              href="/"
              className="text-white font-bold text-xl tracking-tight font-mono"
            >
              {data.settings.logoText}
              <span className="text-accent">.</span>
            </Link>
            <p
              className="text-sm font-mono max-w-[260px] text-center md:text-left text-muted"
            >
              {data.settings.tagline}
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <h4 className="text-white font-mono font-bold text-xs tracking-widest uppercase mb-1">
              Navigation
            </h4>
            <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-mono transition-colors hover:text-accent"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Social links */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <h4 className="text-white font-mono font-bold text-xs tracking-widest uppercase mb-1">
              Connect
            </h4>
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
                    className="w-9 h-9 flex items-center justify-center rounded-full border transition-all hover:bg-accent hover:border-accent group"
                    style={{ borderColor: "rgba(255,255,255,0.15)" }}
                  >
                    <Icon
                      size={14}
                      className="transition-colors group-hover:text-[#1b1b22]"
                      style={{ color: "var(--color-text-muted)" }}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <p
            className="text-xs font-mono"
            style={{ color: "var(--color-text-muted)" }}
          >
            © {year} {data.hero.name}. All rights reserved.
          </p>
          <p
            className="text-xs font-mono"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
