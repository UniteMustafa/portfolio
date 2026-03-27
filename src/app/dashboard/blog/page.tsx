"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, Reorder, useDragControls } from "framer-motion";
import { FiPlus, FiTrash2, FiSave, FiEye, FiEyeOff, FiMenu } from "react-icons/fi";
import { usePortfolio } from "@/data/portfolio-context";
import Toast from "@/components/dashboard/Toast";
import ImageUploader from "@/components/dashboard/ImageUploader";
import type { BlogPost } from "@/data/portfolio-data";
import { initDragScroll } from "@/utils/dragScroll";
import TextFormatHint from "@/components/dashboard/TextFormatHint";

function BlogItemCard({
  post,
  index,
  updatePost,
  removePost,
  togglePublished,
}: {
  post: BlogPost;
  index: number;
  updatePost: (i: number, f: keyof BlogPost, v: unknown) => void;
  removePost: (i: number) => void;
  togglePublished: (i: number) => void;
}) {
  const controls = useDragControls();

  return (
    <Reorder.Item value={post} dragListener={false} dragControls={controls} whileDrag={{ scale: 0.98, opacity: 0.8, zIndex: 50 }} className="relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="bg-[#1e1e26] rounded-xl p-6 border border-white/5 space-y-4"
      >
        {/* Post header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              onPointerDown={(e) => {
                e.preventDefault();
                controls.start(e);
                initDragScroll(e);
              }}
              className="cursor-grab active:cursor-grabbing p-3 -ml-3 rounded-md hover:bg-white/5 transition-colors touch-none select-none flex items-center justify-center shrink-0"
              title="Drag to reorder"
              style={{ touchAction: "none" }}
            >
              <FiMenu className="text-[#9a9aaa]/60" size={18} />
            </div>
            <span className="text-accent font-mono text-xs font-bold">
              Post #{index + 1}
            </span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                post.published
                  ? "bg-green-500/10 text-green-400"
                  : "bg-white/5 text-muted/50"
              }`}
            >
              {post.published ? "Published" : "Draft"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => togglePublished(index)}
              className="text-muted/40 hover:text-accent transition-colors p-1"
              title={post.published ? "Unpublish" : "Publish"}
            >
              {post.published ? <FiEye size={16} /> : <FiEyeOff size={16} />}
            </button>
            <button
              onClick={() => removePost(index)}
              className="text-red-400/40 hover:text-red-400 transition-colors p-1"
            >
              <FiTrash2 size={16} />
            </button>
          </div>
        </div>

        {/* Title (full width) */}
        <div>
          <label className="block text-muted font-mono text-xs mb-1">Title</label>
          <input
            value={post.title}
            onChange={(e) => updatePost(index, "title", e.target.value)}
            className="w-full bg-[#14141a] text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-accent font-mono text-sm border border-white/5"
            placeholder="My Blog Post Title"
          />
        </div>

        {/* Cover Image uploader — file picker + drag & drop */}
        <div>
          <label className="block text-muted font-mono text-xs mb-2">Cover Image</label>
          <ImageUploader
            value={post.coverImage}
            onChange={(url) => updatePost(index, "coverImage", url)}
          />
        </div>

        {/* Slug + Tags */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-muted font-mono text-xs mb-1">Slug</label>
            <input
              value={post.slug}
              onChange={(e) => updatePost(index, "slug", e.target.value)}
              className="w-full bg-[#14141a] text-white/50 p-3 rounded-lg outline-none focus:ring-1 focus:ring-accent font-mono text-xs border border-white/5"
              placeholder="auto-generated-from-title"
            />
          </div>
          <div>
            <label className="block text-muted font-mono text-xs mb-1">
              Tags (comma-separated)
            </label>
            <input
              value={post.tags.join(", ")}
              onChange={(e) =>
                updatePost(
                  index,
                  "tags",
                  e.target.value.split(",").map((t) => t.trim()).filter(Boolean)
                )
              }
              className="w-full bg-[#14141a] text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-accent font-mono text-sm border border-white/5"
              placeholder="React, Next.js, TypeScript"
            />
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-muted font-mono text-xs mb-1">Excerpt</label>
          <textarea
            rows={2}
            value={post.excerpt}
            onChange={(e) => updatePost(index, "excerpt", e.target.value)}
            className="w-full bg-[#14141a] text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-accent font-mono text-sm border border-white/5 resize-none"
            placeholder="A short description of the post..."
          />
          <TextFormatHint />
        </div>

        {/* Content */}
        <div>
          <label className="block text-muted font-mono text-xs mb-1">
            Content (Markdown)
          </label>
          <textarea
            rows={8}
            value={post.content}
            onChange={(e) => updatePost(index, "content", e.target.value)}
            className="w-full bg-[#14141a] text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-accent font-mono text-xs border border-white/5 resize-y leading-relaxed"
            placeholder={"# My Post\n\nWrite your content in Markdown..."}
          />
          <TextFormatHint />
        </div>
      </motion.div>
    </Reorder.Item>
  );
}

export default function BlogDashboardPage() {
  const { data, updateSection } = usePortfolio();
  const [posts, setPosts] = useState<BlogPost[]>(data.blogPosts || []);
  const [toast, setToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("Blog posts saved!");
  const closeToast = useCallback(() => setToast(false), []);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [justAdded, setJustAdded] = useState(false);

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
    setJustAdded(true);
    setToastMsg("New post added! Scroll down to edit it.");
    setToast(true);
  };

  useEffect(() => {
    if (justAdded && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      setJustAdded(false);
    }
  }, [justAdded, posts.length]);

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
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-mono text-white">Blog Posts</h1>
          <p className="text-muted font-mono text-sm mt-1">
            Write and manage your blog articles.
          </p>
        </div>
        <button
          onClick={addPost}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent/10 text-accent font-mono text-sm hover:bg-accent/20 transition-colors"
        >
          <FiPlus size={16} /> Add Post
        </button>
      </motion.div>

      <Reorder.Group axis="y" values={posts} onReorder={setPosts} className="space-y-6">
        {posts.map((post, i) => (
          <BlogItemCard
            key={post.id}
            post={post}
            index={i}
            updatePost={updatePost}
            removePost={removePost}
            togglePublished={togglePublished}
          />
        ))}
      </Reorder.Group>

      <div ref={bottomRef} />

      <motion.button
        onClick={save}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-bg font-bold font-mono text-sm rounded-xl transition-colors"
      >
        <FiSave size={16} /> Save
      </motion.button>

      <Toast message={toastMsg} visible={toast} onClose={closeToast} />
    </div>
  );
}
