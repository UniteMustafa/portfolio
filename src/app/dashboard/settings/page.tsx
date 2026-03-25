"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { FiSave, FiRefreshCw } from "react-icons/fi";
import { usePortfolio } from "@/data/portfolio-context";
import Toast from "@/components/dashboard/Toast";
import type { SiteSettings } from "@/data/portfolio-data";

const presetColors = [
  "#00aaff", "#a855f7", "#22c55e", "#f59e0b", "#ef4444",
  "#ec4899", "#06b6d4", "#f97316", "#6366f1", "#14b8a6",
];

export default function SettingsPage() {
  const { data, updateSection, resetAll } = usePortfolio();
  const [settings, setSettings] = useState<SiteSettings>(data.settings);
  const [toast, setToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("Settings saved!");

  const save = () => {
    updateSection("settings", settings);
    // Apply accent color to CSS custom property
    document.documentElement.style.setProperty("--color-accent", settings.accentColor);
    setToastMsg("Settings saved!");
    setToast(true);
  };

  const handleReset = () => {
    if (confirm("Reset ALL portfolio data to defaults? This cannot be undone.")) {
      resetAll();
      setToastMsg("All data reset to defaults!");
      setToast(true);
      setTimeout(() => window.location.reload(), 1000);
    }
  };

  const closeToast = useCallback(() => setToast(false), []);

  return (
    <div className="max-w-[800px] mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold font-mono text-white">Settings</h1>
        <p className="text-[#9a9aaa] font-mono text-sm mt-1">Site-wide configuration and theme settings.</p>
      </motion.div>

      {/* Site metadata */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-[#1e1e26] rounded-xl p-6 border border-white/5 space-y-5"
      >
        <h2 className="text-white font-mono font-bold text-sm">Site Metadata</h2>

        <div>
          <label className="block text-[#9a9aaa] font-mono text-xs mb-2">Site Title</label>
          <input
            value={settings.siteTitle}
            onChange={(e) => setSettings((p) => ({ ...p, siteTitle: e.target.value }))}
            className="w-full bg-[#14141a] text-white p-3.5 rounded-lg outline-none focus:ring-1 focus:ring-accent font-mono text-sm border border-white/5"
          />
        </div>

        <div>
          <label className="block text-[#9a9aaa] font-mono text-xs mb-2">Site Description</label>
          <textarea
            rows={3}
            value={settings.siteDescription}
            onChange={(e) => setSettings((p) => ({ ...p, siteDescription: e.target.value }))}
            className="w-full bg-[#14141a] text-white p-3.5 rounded-lg outline-none focus:ring-1 focus:ring-accent font-mono text-sm border border-white/5 resize-none"
          />
        </div>

        <div>
          <label className="block text-[#9a9aaa] font-mono text-xs mb-2">Logo Text (Navbar)</label>
          <input
            value={settings.logoText}
            onChange={(e) => setSettings((p) => ({ ...p, logoText: e.target.value }))}
            className="w-full bg-[#14141a] text-white p-3.5 rounded-lg outline-none focus:ring-1 focus:ring-accent font-mono text-sm border border-white/5"
          />
        </div>

        <div>
          <label className="block text-[#9a9aaa] font-mono text-xs mb-2">Footer Tagline</label>
          <input
            value={settings.tagline ?? ""}
            onChange={(e) => setSettings((p) => ({ ...p, tagline: e.target.value }))}
            placeholder="Crafting elegant digital experiences..."
            className="w-full bg-[#14141a] text-white p-3.5 rounded-lg outline-none focus:ring-1 focus:ring-accent font-mono text-sm border border-white/5"
          />
        </div>
      </motion.div>

      {/* Accent color */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-[#1e1e26] rounded-xl p-6 border border-white/5 space-y-5"
      >
        <h2 className="text-white font-mono font-bold text-sm">Theme</h2>

        <div>
          <label className="block text-[#9a9aaa] font-mono text-xs mb-3">Accent Color</label>
          <div className="flex items-center gap-3 flex-wrap">
            {presetColors.map((color) => (
              <button
                key={color}
                onClick={() => setSettings((p) => ({ ...p, accentColor: color }))}
                className={`w-8 h-8 rounded-full transition-all duration-200 border-2 ${
                  settings.accentColor === color ? "border-white scale-110" : "border-transparent"
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <div className="flex items-center gap-3 mt-4">
            <input
              type="color"
              value={settings.accentColor}
              onChange={(e) => setSettings((p) => ({ ...p, accentColor: e.target.value }))}
              className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent"
            />
            <input
              value={settings.accentColor}
              onChange={(e) => setSettings((p) => ({ ...p, accentColor: e.target.value }))}
              className="w-[120px] bg-[#14141a] text-white p-2.5 rounded-lg outline-none focus:ring-1 focus:ring-accent font-mono text-sm border border-white/5"
            />
            <div
              className="w-full h-10 rounded-lg"
              style={{ backgroundColor: settings.accentColor }}
            />
          </div>
        </div>
      </motion.div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <motion.button
          onClick={save}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-[#1b1b22] font-bold font-mono text-sm rounded-xl transition-colors"
        >
          <FiSave size={16} /> Save Settings
        </motion.button>

        <motion.button
          onClick={handleReset}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold font-mono text-sm rounded-xl transition-colors border border-red-500/20"
        >
          <FiRefreshCw size={16} /> Reset All Data
        </motion.button>
      </div>

      <Toast message={toastMsg} visible={toast} onClose={closeToast} />
    </div>
  );
}
