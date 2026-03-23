"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiLogIn, FiAlertCircle } from "react-icons/fi";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[400px]"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-4">
            <span className="text-accent font-bold font-mono text-xl">M</span>
          </div>
          <h1 className="text-white font-mono font-bold text-xl">Dashboard Login</h1>
          <p className="text-[#9a9aaa] font-mono text-sm mt-2">
            Sign in to manage your portfolio
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-sm"
            >
              <FiAlertCircle size={16} className="shrink-0" />
              {error}
            </motion.div>
          )}

          <div>
            <label className="block text-[#9a9aaa] font-mono text-xs mb-2">Email</label>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9a9aaa]/40" size={16} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@example.com"
                className="w-full bg-[#1e1e26] text-white pl-11 pr-4 py-3.5 rounded-xl outline-none focus:ring-1 focus:ring-accent transition-all font-mono text-sm border border-white/5"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#9a9aaa] font-mono text-xs mb-2">Password</label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9a9aaa]/40" size={16} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-[#1e1e26] text-white pl-11 pr-4 py-3.5 rounded-xl outline-none focus:ring-1 focus:ring-accent transition-all font-mono text-sm border border-white/5"
              />
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-accent hover:bg-accent-hover disabled:opacity-50 text-[#1b1b22] font-bold font-mono text-sm rounded-xl transition-all"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-[#1b1b22]/30 border-t-[#1b1b22] rounded-full animate-spin" />
            ) : (
              <>
                <FiLogIn size={16} /> Sign In
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
