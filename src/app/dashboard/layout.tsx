"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHome,
  FiUser,
  FiBarChart2,
  FiLayers,
  FiBriefcase,
  FiFileText,
  FiMail,
  FiMessageSquare,
  FiSettings,
  FiMenu,
  FiX,
  FiExternalLink,
  FiLogOut,
  FiHeart,
  FiEdit3,
} from "react-icons/fi";
import { supabase } from "@/lib/supabase";
import { usePortfolio } from "@/data/portfolio-context";

const sidebarLinks = [
  { name: "Overview", href: "/dashboard", icon: FiHome },
  { name: "Hero", href: "/dashboard/hero", icon: FiUser },
  { name: "Stats", href: "/dashboard/stats", icon: FiBarChart2 },
  { name: "Services", href: "/dashboard/services", icon: FiLayers },
  { name: "Projects", href: "/dashboard/projects", icon: FiBriefcase },
  { name: "Resume", href: "/dashboard/resume", icon: FiFileText },
  { name: "Testimonials", href: "/dashboard/testimonials", icon: FiHeart },
  { name: "Blog", href: "/dashboard/blog", icon: FiEdit3 },
  { name: "Contact", href: "/dashboard/contact", icon: FiMail },
  { name: "Messages", href: "/dashboard/messages", icon: FiMessageSquare },
  { name: "Settings", href: "/dashboard/settings", icon: FiSettings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);

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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/dashboard/login");
  };

  // Login page renders directly without dashboard chrome
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Show loading while checking auth
  if (!authChecked || !isAuthed) {
    return (
      <div className="flex h-screen items-center justify-center" style={{ backgroundColor: "var(--color-bg)" }}>
        <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  return <DashboardContent handleLogout={handleLogout} pathname={pathname} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>{children}</DashboardContent>;
}

function DashboardContent({ children, handleLogout, pathname, sidebarOpen, setSidebarOpen }: {
  children: React.ReactNode;
  handleLogout: () => void;
  pathname: string;
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
}) {
  const { loading } = usePortfolio();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center flex-col gap-3" style={{ backgroundColor: "var(--color-bg)" }}>
        <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
        <p className="text-[#9a9aaa] font-mono text-xs">Loading portfolio data...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "var(--color-bg)" }}>
      {/* Sidebar — Desktop */}
      <aside className="hidden lg:flex flex-col w-[260px] border-r border-white/5 bg-[#16161c] shrink-0">
        <div className="flex items-center gap-3 px-6 h-16 border-b border-white/5">
          <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
            <span className="text-accent font-bold font-mono text-sm">M</span>
          </div>
          <span className="text-white font-mono font-bold text-sm tracking-wide">Dashboard</span>
        </div>

        <nav className="flex-1 py-4 px-3 flex flex-col gap-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-accent/15 text-accent"
                    : "text-[#9a9aaa] hover:bg-white/5 hover:text-white"
                }`}
              >
                <link.icon size={18} />
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-indicator"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-accent"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 pb-4 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-sm text-[#9a9aaa] hover:bg-white/5 hover:text-accent transition-all duration-200"
          >
            <FiExternalLink size={18} />
            View Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-sm text-red-400/60 hover:bg-red-400/5 hover:text-red-400 transition-all duration-200"
          >
            <FiLogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-[280px] bg-[#16161c] z-50 flex flex-col lg:hidden border-r border-white/5"
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
                  className="text-[#9a9aaa] hover:text-white transition-colors"
                >
                  <FiX size={22} />
                </button>
              </div>
              <nav className="flex-1 py-4 px-3 flex flex-col gap-1 overflow-y-auto">
                {sidebarLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-sm transition-all duration-200 ${
                        isActive
                          ? "bg-accent/15 text-accent"
                          : "text-[#9a9aaa] hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <link.icon size={18} />
                      {link.name}
                    </Link>
                  );
                })}
              </nav>
              <div className="px-3 pb-4 space-y-1">
                <Link
                  href="/"
                  target="_blank"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-sm text-[#9a9aaa] hover:bg-white/5 hover:text-accent transition-all"
                >
                  <FiExternalLink size={18} />
                  View Site
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-sm text-red-400/60 hover:bg-red-400/5 hover:text-red-400 transition-all"
                >
                  <FiLogOut size={18} />
                  Logout
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between h-16 px-6 border-b border-white/5 bg-[#16161c]/50 backdrop-blur-md shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-[#9a9aaa] hover:text-white transition-colors"
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
              <span className="text-accent font-mono text-xs font-bold">MA</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
