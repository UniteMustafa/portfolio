"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
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
  FiExternalLink,
  FiLogOut,
  FiHeart,
  FiEdit3,
} from "react-icons/fi";
import { supabase } from "@/lib/supabase";

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

interface SidebarNavProps {
  /** Called after a nav link is clicked — useful to close mobile overlay. */
  onLinkClick?: () => void;
}

export default function SidebarNav({ onLinkClick }: SidebarNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/dashboard/login");
  };

  return (
    <>
      <nav className="flex-1 py-4 px-3 flex flex-col gap-1 overflow-y-auto">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              onClick={onLinkClick}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-sm transition-all duration-200 ${
                isActive
                  ? "bg-accent/15 text-accent"
                  : "text-muted hover:bg-white/5 hover:text-white"
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
          onClick={onLinkClick}
          className="flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-sm text-muted hover:bg-white/5 hover:text-accent transition-all duration-200"
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
    </>
  );
}
