"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiCalendar, FiArrowRight, FiBookOpen } from "react-icons/fi";
import { usePortfolio } from "@/data/portfolio-context";

export default function BlogPage() {
  const { data } = usePortfolio();
  const posts = (data.blogPosts || [])
    .filter((p) => p.published)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block bg-[#232329] rounded-2xl overflow-hidden border border-white/5 hover:border-accent/20 transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,170,255,0.06)]"
                >
                  {/* Cover image or gradient fallback */}
                  {post.coverImage ? (
                    <div className="h-[200px] overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div
                      className="h-[200px] flex items-center justify-center"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(0,170,255,0.1) 0%, rgba(0,170,255,0.02) 100%)",
                      }}
                    >
                      <FiBookOpen
                        size={48}
                        className="text-accent/20 group-hover:text-accent/40 transition-colors duration-300"
                      />
                    </div>
                  )}

                  <div className="p-6 lg:p-8">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-accent/60 bg-accent/5 px-2.5 py-1 rounded-md font-mono text-[10px] uppercase tracking-wider border border-accent/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold font-mono text-white group-hover:text-accent transition-colors duration-300 mb-3">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p
                      className="font-mono text-sm leading-relaxed mb-4 line-clamp-3"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {post.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
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
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
}
