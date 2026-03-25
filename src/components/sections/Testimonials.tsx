"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FiStar } from "react-icons/fi";
import { usePortfolio } from "@/data/portfolio-context";

export default function Testimonials() {
  const { data } = usePortfolio();
  const testimonials = data.testimonials;

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="w-full py-16 md:py-24">
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-mono text-white mb-3">
            What People Say
          </h2>
          <p
            className="font-mono text-sm max-w-[500px] mx-auto"
            style={{ color: "var(--color-text-muted)" }}
          >
            Kind words from clients and collaborators I&apos;ve had the pleasure of
            working with.
          </p>
        </motion.div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, index) => {
            const initials = t.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase();

            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative bg-[#232329] rounded-2xl p-6 lg:p-8 border border-white/5 hover:border-accent/20 transition-all duration-300 group flex flex-col"
              >
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FiStar
                      key={i}
                      size={14}
                      className={i < t.rating ? "text-accent" : "text-white/10"}
                      style={i < t.rating ? { fill: "var(--color-accent)" } : undefined}
                    />
                  ))}
                </div>

                {/* Quote */}
                <p
                  className="font-mono text-sm leading-relaxed flex-1 mb-6"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  &ldquo;{t.body}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  {t.avatar ? (
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-xs"
                      style={{
                        backgroundColor: "color-mix(in srgb, var(--color-accent) 15%, transparent)",
                        color: "var(--color-accent)",
                      }}
                    >
                      {initials}
                    </div>
                  )}
                  <div>
                    <p className="text-white font-mono text-sm font-bold">
                      {t.name}
                    </p>
                    <p
                      className="font-mono text-xs"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {t.role}{t.company ? ` at ${t.company}` : ""}
                    </p>
                  </div>
                </div>

                {/* Decorative accent */}
                <div
                  className="absolute top-0 left-6 w-12 h-[3px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: "var(--color-accent)" }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
