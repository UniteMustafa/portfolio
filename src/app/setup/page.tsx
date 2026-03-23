"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function SetupPage() {
  const [status, setStatus] = useState("Checking...");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const setup = async () => {
      // Try to sign up the admin user
      setStatus("Creating admin account...");

      const { data, error } = await supabase.auth.signUp({
        email: "mustafa@admin.com",
        password: "admin123",
      });

      if (error) {
        if (error.message.includes("already registered")) {
          setStatus("✅ Admin account already exists! You can close this page and go to /dashboard/login");
          setDone(true);
          return;
        }
        setStatus(`❌ Error: ${error.message}`);
        return;
      }

      if (data.user) {
        setStatus("✅ Admin account created successfully! You can now go to /dashboard/login");
        setDone(true);
      }
    };

    setup();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--color-bg)" }}>
      <div className="bg-[#1e1e26] rounded-xl p-8 border border-white/5 max-w-md w-full mx-6 text-center">
        <h1 className="text-white font-mono font-bold text-xl mb-4">Setup</h1>
        <p className="text-[#9a9aaa] font-mono text-sm mb-6">{status}</p>
        {done && (
          <a
            href="/dashboard/login"
            className="inline-block px-6 py-3 bg-accent text-[#1b1b22] font-bold font-mono text-sm rounded-xl hover:bg-accent-hover transition-colors"
          >
            Go to Login →
          </a>
        )}
      </div>
    </div>
  );
}
