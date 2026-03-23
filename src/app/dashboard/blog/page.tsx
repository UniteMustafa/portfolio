"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { FiPlus, FiTrash2, FiSave, FiEye, FiEyeOff } from "react-icons/fi";
import { usePortfolio } from "@/data/portfolio-context";
import Toast from "@/components/dashboard/Toast";
import type { BlogPost } from "@/data/portfolio-data";

export default function BlogDashboardPage() {
  const { data, updateSection } = usePortfolio();
  const [posts, setPosts] = useState<BlogPost[]>(data.blogPosts || []);
  const [toast, setToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("Blog posts saved!");
  const closeToast = useCallback(() => setToast(false), []);

  const addPost = () => {
    const id = `bp_${Date.now()}`;
    setPosts([
      ...posts,
      {
        id,
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        coverImage: "",
        tags: [],
        publishedAt: new Date().toISOString(),
        published: false,
      },
    ]);
  };

  const updatePost = (index: number, field: keyof BlogPost, value: unknown) => {
    const updated = [...posts];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (updated[index] as any)[field] = value;

    // Auto-generate slug from title
    if (field === "title") {
      updated[index].slug = (value as string)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    setPosts(updated);
  };

  const removePost = (index: number) => {
    setPosts(posts.filter((_, i) => i !== index));
  };

  const togglePublished = (index: number) => {
    const updated = [...posts];
    updated[index].published = !updated[index].published;
    setPosts(updated);
  };

  const save = () => {
    updateSection("blogPosts", posts);
    setToastMsg("Blog posts saved!");
    setToast(true);
  };

  return (
    <div className="max-w-[800px] mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold font-mono text-white">Blog Posts</h1>
        <p className="text-[#9a9aaa] font-mono text-sm mt-1">
          Write and manage your blog articles.
        </p>
      </motion.div>

      {posts.map((post, i) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="bg-[#1e1e26] rounded-xl p-6 border border-white/5 space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-accent font-mono text-xs font-bold">
                Post #{i + 1}
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                  post.published
                    ? "bg-green-500/10 text-green-400"
                    : "bg-white/5 text-[#9a9aaa]/50"
                }`}
              >
                {post.published ? "Published" : "Draft"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => togglePublished(i)}
                className="text-[#9a9aaa]/40 hover:text-accent transition-colors p-1"
                title={post.published ? "Unpublish" : "Publish"}
              >
                {post.published ? <FiEye size={16} /> : <FiEyeOff size={16} />}
              </button>
              <button
                onClick={() => removePost(i)}
                className="text-red-400/40 hover:text-red-400 transition-colors p-1"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-[#9a9aaa] font-mono text-xs mb-1">Title</label>
              <input
                value={post.title}
                onChange={(e) => updatePost(i, "title", e.target.value)}
                className="w-full bg-[#14141a] text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-accent font-mono text-sm border border-white/5"
                placeholder="My Blog Post Title"
              />
            </div>
            <div>
              <label className="block text-[#9a9aaa] font-mono text-xs mb-1">Slug</label>
              <input
                value={post.slug}
                onChange={(e) => updatePost(i, "slug", e.target.value)}
                className="w-full bg-[#14141a] text-white/50 p-3 rounded-lg outline-none focus:ring-1 focus:ring-accent font-mono text-xs border border-white/5"
                placeholder="auto-generated-from-title"
              />
            </div>
            <div>
              <label className="block text-[#9a9aaa] font-mono text-xs mb-1">
                Tags (comma-separated)
              </label>
              <input
                value={post.tags.join(", ")}
                onChange={(e) =>
                  updatePost(
                    i,
                    "tags",
                    e.target.value.split(",").map((t) => t.trim()).filter(Boolean)
                  )
                }
                className="w-full bg-[#14141a] text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-accent font-mono text-sm border border-white/5"
                placeholder="React, Next.js, TypeScript"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#9a9aaa] font-mono text-xs mb-1">Excerpt</label>
            <textarea
              rows={2}
              value={post.excerpt}
              onChange={(e) => updatePost(i, "excerpt", e.target.value)}
              className="w-full bg-[#14141a] text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-accent font-mono text-sm border border-white/5 resize-none"
              placeholder="A short description of the post..."
            />
          </div>

          <div>
            <label className="block text-[#9a9aaa] font-mono text-xs mb-1">
              Content (Markdown)
            </label>
            <textarea
              rows={8}
              value={post.content}
              onChange={(e) => updatePost(i, "content", e.target.value)}
              className="w-full bg-[#14141a] text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-accent font-mono text-xs border border-white/5 resize-y leading-relaxed"
              placeholder="# My Post\n\nWrite your content in Markdown..."
            />
          </div>
        </motion.div>
      ))}

      <div className="flex items-center gap-3">
        <button
          onClick={addPost}
          className="flex items-center gap-2 px-5 py-3 bg-[#1e1e26] hover:bg-[#252530] text-white font-mono text-sm rounded-xl transition-colors border border-white/5"
        >
          <FiPlus size={16} /> Add Post
        </button>
        <button
          onClick={save}
          className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-[#1b1b22] font-bold font-mono text-sm rounded-xl transition-colors"
        >
          <FiSave size={16} /> Save
        </button>
      </div>

      <Toast message={toastMsg} visible={toast} onClose={closeToast} />
    </div>
  );
}
