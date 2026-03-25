"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCalendar,
  FiArrowRight,
  FiBookOpen,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { usePortfolio } from "@/data/portfolio-context";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

export default function BlogPage() {
  const { data } = usePortfolio();
  const posts = (data.blogPosts || [])
    .filter((p) => p.published)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

  const [[currentIndex, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    const nextIndex = currentIndex + newDirection;
    if (nextIndex >= 0 && nextIndex < posts.length) {
      setPage([nextIndex, newDirection]);
    }
  };

  const goToIndex = (index: number) => {
    const dir = index > currentIndex ? 1 : -1;
    setPage([index, dir]);
  };

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const post = posts[currentIndex];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.4, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-screen py-12 xl:py-0 w-full pt-[80px] md:pt-[100px]"
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 mt-8 md:mt-16 pb-20">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-mono text-white mb-3">
            Blog
          </h1>
          <p
            className="font-mono text-sm md:text-base max-w-[600px]"
            style={{ color: "var(--color-text-muted)" }}
          >
            Thoughts, tutorials, and insights on web development, design, and
            technology.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-[#232329] flex items-center justify-center mb-4">
              <FiBookOpen size={28} className="text-[#9a9aaa]/40" />
            </div>
            <p className="text-[#9a9aaa] font-mono text-sm">
              No posts yet — check back soon!
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {/* Carousel container */}
            <div className="relative w-full max-w-[750px]">
              {/* Left arrow */}
              <button
                onClick={() => paginate(-1)}
                disabled={currentIndex === 0}
                className={`absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 font-mono ${
                  currentIndex === 0
                    ? "bg-white/5 text-[#9a9aaa]/20 cursor-not-allowed"
                    : "bg-[#232329] text-white hover:bg-accent/20 hover:text-accent border border-white/5 hover:border-accent/30"
                }`}
              >
                <FiChevronLeft size={20} />
              </button>

              {/* Right arrow */}
              <button
                onClick={() => paginate(1)}
                disabled={currentIndex === posts.length - 1}
                className={`absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 font-mono ${
                  currentIndex === posts.length - 1
                    ? "bg-white/5 text-[#9a9aaa]/20 cursor-not-allowed"
                    : "bg-[#232329] text-white hover:bg-accent/20 hover:text-accent border border-white/5 hover:border-accent/30"
                }`}
              >
                <FiChevronRight size={20} />
              </button>

              {/* Post card with animation */}
              <div className="overflow-hidden px-8 md:px-0">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={post.id}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    }}
                  >
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group block bg-[#232329] rounded-2xl overflow-hidden border border-white/5 hover:border-accent/20 transition-all duration-300 hover:shadow-[0_0_40px_var(--color-accent-glow)]"
                    >
                      {/* Cover image or gradient fallback */}
                      {post.coverImage ? (
                        <div className="h-[250px] md:h-[300px] overflow-hidden relative">
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ) : (
                        <div
                          className="h-[250px] md:h-[300px] flex items-center justify-center"
                          style={{
                            background:
                              "linear-gradient(135deg, color-mix(in srgb, var(--color-accent) 10%, transparent) 0%, color-mix(in srgb, var(--color-accent) 2%, transparent) 100%)",
                          }}
                        >
                          <FiBookOpen
                            size={56}
                            className="text-accent/20 group-hover:text-accent/40 transition-colors duration-300"
                          />
                        </div>
                      )}

                      <div className="p-8 lg:p-10">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="text-accent/60 bg-accent/5 px-2.5 py-1 rounded-md font-mono text-[10px] uppercase tracking-wider border border-accent/10"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Title */}
                        <h2 className="text-2xl md:text-3xl font-bold font-mono text-white group-hover:text-accent transition-colors duration-300 mb-4">
                          {post.title}
                        </h2>

                        {/* Excerpt */}
                        <p
                          className="font-mono text-sm leading-relaxed mb-6 line-clamp-3"
                          style={{ color: "var(--color-text-muted)" }}
                        >
                          {post.excerpt}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-5 border-t border-white/5">
                          <div
                            className="flex items-center gap-2 font-mono text-xs"
                            style={{ color: "var(--color-text-muted)" }}
                          >
                            <FiCalendar size={12} />
                            {formatDate(post.publishedAt)}
                          </div>
                          <span className="flex items-center gap-1 text-accent font-mono text-xs font-bold group-hover:gap-2 transition-all duration-300">
                            Read more <FiArrowRight size={12} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Dot indicators + counter */}
            <div className="flex items-center gap-4 mt-8">
              <div className="flex items-center gap-2">
                {posts.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToIndex(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === currentIndex
                        ? "w-8 h-2.5 bg-accent"
                        : "w-2.5 h-2.5 bg-white/10 hover:bg-white/20"
                    }`}
                  />
                ))}
              </div>
              <span
                className="font-mono text-xs"
                style={{ color: "var(--color-text-muted)" }}
              >
                {currentIndex + 1} / {posts.length}
              </span>
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
}
