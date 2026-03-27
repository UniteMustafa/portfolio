"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiHeart } from "react-icons/fi";
import { supabase } from "@/lib/supabase";

export default function LikeButton({ slug }: { slug: string }) {
  const [likes, setLikes] = useState<number | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Check local storage for previous likes
    try {
      const likedPosts = JSON.parse(localStorage.getItem("liked_posts") || "[]");
      if (likedPosts.includes(slug)) {
        setIsLiked(true);
      }
    } catch {
      // ignore
    }

    // Fetch initial likes from Supabase
    const fetchLikes = async () => {
      const { data, error } = await supabase
        .from("blog_post_likes")
        .select("like_count")
        .eq("slug", slug)
        .maybeSingle(); // Use maybeSingle to avoid 406 error if row doesn't exist yet
        
      if (!error && data) {
        setLikes(data.like_count);
      } else {
        setLikes(0);
      }
    };
    
    fetchLikes();
  }, [slug]);

  const handleLike = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (isLiked) return;

    // Optimistic UI update
    setIsLiked(true);
    setAnimate(true);
    setLikes((prev) => (prev !== null ? prev + 1 : 1));
    setTimeout(() => setAnimate(false), 300);

    // Save unique hit to local storage
    try {
      const likedPosts = JSON.parse(localStorage.getItem("liked_posts") || "[]");
      if (!likedPosts.includes(slug)) {
        likedPosts.push(slug);
        localStorage.setItem("liked_posts", JSON.stringify(likedPosts));
      }
    } catch {
      // ignore
    }

    // Ping the Supabase RPC function securely
    await supabase.rpc('increment_blog_like', { post_slug: slug });
  };

  // Render a tiny skeleton if we haven't loaded the counts yet
  if (likes === null) {
    return <div className="w-[70px] h-7 animate-pulse bg-white/5 rounded-full" />;
  }

  return (
    <button
      onClick={handleLike}
      disabled={isLiked}
      className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-xs font-bold transition-all duration-300 border ${
        isLiked 
          ? "bg-red-500/10 border-red-500/20 text-red-500 cursor-default" 
          : "bg-bg-secondary border-white/5 text-muted hover:bg-white/5 hover:border-white/10 hover:text-white"
      }`}
    >
      <motion.div
        animate={animate ? { scale: [1, 1.4, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        <FiHeart className={isLiked ? "fill-current" : ""} />
      </motion.div>
      <span>{likes}</span>
    </button>
  );
}
