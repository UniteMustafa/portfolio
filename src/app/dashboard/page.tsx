"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePortfolio } from "@/data/portfolio-context";
import {
  FiUser,
  FiBarChart2,
  FiLayers,
  FiBriefcase,
  FiFileText,
  FiMail,
  FiMessageSquare,
  FiArrowRight,
  FiHeart,
  FiEdit3,
} from "react-icons/fi";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" },
  }),
};

export default function DashboardPage() {
  const { data } = usePortfolio();

  const unreadCount = data.messages.filter((m) => !m.read).length;

  const quickStats = [
    { label: "Projects", value: data.projects.length, icon: FiBriefcase, color: "#00aaff" },
    { label: "Services", value: data.services.length, icon: FiLayers, color: "#a855f7" },
    { label: "Messages", value: data.messages.length, icon: FiMessageSquare, color: "#ec4899" },
    { label: "Skills", value: data.resume.skillsList.length, icon: FiBarChart2, color: "#f59e0b" },
    { label: "Testimonials", value: (data.testimonials || []).length, icon: FiHeart, color: "#ef4444" },
    { label: "Blog Posts", value: (data.blogPosts || []).length, icon: FiEdit3, color: "#22c55e" },
  ];

  const sections = [
    { name: "Hero Section", desc: "Edit name, subtitle, photo & social links", href: "/dashboard/hero", icon: FiUser },
    { name: "Statistics", desc: "Update your portfolio stats", href: "/dashboard/stats", icon: FiBarChart2 },
    { name: "Services", desc: "Manage your offered services", href: "/dashboard/services", icon: FiLayers },
    { name: "Projects", desc: "Add, edit, or remove projects", href: "/dashboard/projects", icon: FiBriefcase },
    { name: "Resume", desc: "Experience, education, skills & about", href: "/dashboard/resume", icon: FiFileText },
    { name: "Testimonials", desc: `${(data.testimonials || []).length} testimonials`, href: "/dashboard/testimonials", icon: FiHeart },
    { name: "Blog", desc: `${(data.blogPosts || []).length} posts`, href: "/dashboard/blog", icon: FiEdit3 },
    { name: "Contact Info", desc: "Update contact details", href: "/dashboard/contact", icon: FiMail },
    { name: "Messages", desc: unreadCount > 0 ? `${unreadCount} unread message${unreadCount !== 1 ? "s" : ""}` : "View & reply to messages", href: "/dashboard/messages", icon: FiMessageSquare },
  ];

  return (
    <div className="max-w-[1100px] mx-auto space-y-8">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl lg:text-3xl font-bold font-mono text-white">
          Welcome back, <span className="text-accent">{data.hero.name.split(" ")[0]}</span>
        </h1>
        <p className="text-[#9a9aaa] font-mono text-sm mt-2">
          Manage your portfolio content from one place.
        </p>
      </motion.div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="bg-[#1e1e26] rounded-xl p-5 border border-white/5 hover:border-white/10 transition-colors group"
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <stat.icon size={20} style={{ color: stat.color }} />
              </div>
            </div>
            <p className="text-3xl font-bold font-mono text-white">{stat.value}</p>
            <p className="text-[#9a9aaa] font-mono text-xs mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Section Cards */}
      <div>
        <h2 className="text-lg font-bold font-mono text-white mb-4">Manage Sections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, i) => (
            <motion.div
              key={section.name}
              custom={i + 4}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              <Link
                href={section.href}
                className="block bg-[#1e1e26] rounded-xl p-5 border border-white/5 hover:border-accent/30 transition-all duration-300 group hover:shadow-[0_0_30px_rgba(0,170,255,0.06)]"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <section.icon size={20} className="text-accent" />
                  </div>
                  <FiArrowRight className="text-[#9a9aaa] group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
                </div>
                <h3 className="text-white font-mono font-bold text-sm">{section.name}</h3>
                <p className="text-[#9a9aaa] font-mono text-xs mt-1">{section.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
