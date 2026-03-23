"use client";

import { useMemo } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowLeft, FiCalendar, FiClock } from "react-icons/fi";
import { usePortfolio } from "@/data/portfolio-context";

/** Very simple markdown-to-HTML renderer for blog content */
function renderMarkdown(md: string): string {
  return md
    // Headers
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold font-mono text-white mt-8 mb-3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold font-mono text-white mt-10 mb-4">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold font-mono text-white mt-8 mb-4">$1</h1>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="bg-accent/10 text-accent px-1.5 py-0.5 rounded text-xs font-mono">$1</code>')
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li class="ml-4 pl-2 relative before:content-[\'•\'] before:absolute before:left-[-12px] before:text-accent">$1</li>')
    // Ordered lists
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 pl-2 list-decimal">$1</li>')
    // Paragraphs (lines not already wrapped)
    .replace(/^(?!<[hluod])((?!<).+)$/gm, '<p class="mb-4">$1</p>')
    // Line breaks
    .replace(/\n\n/g, "");
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const { data } = usePortfolio();

  const post = useMemo(() => {
    return data.blogPosts?.find((p) => p.slug === slug && p.published);
  }, [data.blogPosts, slug]);

  if (!post) {
    return notFound();
  }

  const readTime = Math.max(1, Math.ceil(post.content.split(/\s+/).length / 200));

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
      animate={{ opacity: 1, transition: { duration: 0.4 } }}
      className="min-h-screen py-12 pt-[100px] w-full"
    >
      <div className="w-full max-w-[800px] mx-auto px-6 md:px-10">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[#9a9aaa] hover:text-accent font-mono text-sm transition-colors mb-8"
        >
          <FiArrowLeft size={16} />
          Back to Blog
        </Link>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
          className="flex flex-wrap gap-2 mb-4"
        >
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-accent/60 bg-accent/5 px-2.5 py-1 rounded-md font-mono text-[10px] uppercase tracking-wider border border-accent/10"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.15 } }}
          className="text-3xl md:text-4xl font-bold font-mono text-white mb-4 leading-tight"
        >
          {post.title}
        </motion.h1>

        {/* Meta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
          className="flex items-center gap-5 mb-10 pb-8 border-b border-white/5"
        >
          <span
            className="flex items-center gap-2 font-mono text-xs"
            style={{ color: "var(--color-text-muted)" }}
          >
            <FiCalendar size={12} />
            {formatDate(post.publishedAt)}
          </span>
          <span
            className="flex items-center gap-2 font-mono text-xs"
            style={{ color: "var(--color-text-muted)" }}
          >
            <FiClock size={12} />
            {readTime} min read
          </span>
        </motion.div>

        {/* Cover image */}
        {post.coverImage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.25 } }}
            className="w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-10 border border-white/5"
          >
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        {/* Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
          className="prose-custom font-mono text-sm leading-relaxed"
          style={{ color: "var(--color-text-muted)" }}
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
        />

        {/* Bottom nav */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.4 } }}
          className="mt-16 pt-8 border-t border-white/5"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-hover font-mono text-sm font-bold transition-colors"
          >
            <FiArrowLeft size={14} />
            All Posts
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
