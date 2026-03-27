"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { supabase } from "@/lib/supabase";
import { usePortfolio } from "@/data/portfolio-context";
import SidebarNav from "@/components/dashboard/SidebarNav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);

  // Force-close mobile sidebar on every route change to prevent ghost overlays
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Skip auth check for the login page itself
  const isLoginPage = pathname === "/dashboard/login";

  useEffect(() => {
    if (isLoginPage) {
      setAuthChecked(true);
      return;
    }

    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace("/dashboard/login");
      } else {
        setIsAuthed(true);
      }
      setAuthChecked(true);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session && !isLoginPage) {
        router.replace("/dashboard/login");
        setIsAuthed(false);
      } else if (session) {
        setIsAuthed(true);
      }
    });

    return () => subscription.unsubscribe();
  }, [isLoginPage, router]);

  // Login page renders directly without dashboard chrome
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Show loading while checking auth
  if (!authChecked || !isAuthed) {
    return (
      <div className="flex h-screen items-center justify-center bg-bg">
        <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  return <DashboardContent sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>{children}</DashboardContent>;
}

function DashboardContent({
  children,
  sidebarOpen,
  setSidebarOpen,
}: {
  children: React.ReactNode;
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
}) {
  const { loading, data } = usePortfolio();
  const pathname = usePathname();
  const mainRef = useRef<HTMLDivElement>(null);

  // Reset scroll position on route change
  useEffect(() => {
    const mainEl = mainRef.current;
    if (mainEl) {
      requestAnimationFrame(() => {
        mainEl.scrollTo(0, 0);
      });
    }
  }, [pathname]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center flex-col gap-3 bg-bg">
        <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
        <p className="text-muted font-mono text-xs">Loading portfolio data...</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex overflow-hidden bg-bg">
      {/* Sidebar — Desktop */}
      <aside className="hidden lg:flex flex-col w-[260px] border-r border-white/5 bg-[#16161c] shrink-0">
        <div className="flex items-center gap-3 px-6 h-16 border-b border-white/5">
          <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
            <span className="text-accent font-bold font-mono text-sm">M</span>
          </div>
          <span className="text-white font-mono font-bold text-sm tracking-wide">Dashboard</span>
        </div>

        <SidebarNav />
      </aside>

      {/* Mobile sidebar overlay */}
      {/* Mobile sidebar overlay (Simplified without AnimatePresence to prevent ghost overlays on route change) */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : "-100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed left-0 top-0 bottom-0 w-[280px] bg-[#16161c] z-50 flex flex-col lg:hidden border-r border-white/5"
        style={{ pointerEvents: sidebarOpen ? "auto" : "none" }}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
              <span className="text-accent font-bold font-mono text-sm">M</span>
            </div>
            <span className="text-white font-mono font-bold text-sm">Dashboard</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-muted hover:text-white transition-colors"
          >
            <FiX size={22} />
          </button>
        </div>

        <SidebarNav onLinkClick={() => setSidebarOpen(false)} />
      </motion.aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden min-h-0">
        <header className="flex items-center justify-between h-16 px-6 border-b border-white/5 bg-[#16161c]/50 backdrop-blur-md shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-muted hover:text-white transition-colors"
          >
            <FiMenu size={22} />
          </button>
          <div className="hidden lg:block">
            <h1 className="text-white font-mono font-bold text-sm">
              Portfolio Manager
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
              <span className="text-accent font-mono text-xs font-bold">
                {data.hero.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
              </span>
            </div>
          </div>
        </header>

        <main ref={mainRef} className="flex-1 overflow-y-auto p-6 lg:p-8 min-h-0 overscroll-y-contain" style={{ WebkitOverflowScrolling: 'touch' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
