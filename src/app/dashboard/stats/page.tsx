"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { FiSave } from "react-icons/fi";
import { usePortfolio } from "@/data/portfolio-context";
import Toast from "@/components/dashboard/Toast";
import type { StatItem } from "@/data/portfolio-data";

export default function StatsPage() {
  const { data, updateSection } = usePortfolio();
  const [stats, setStats] = useState<StatItem[]>(data.stats);
  const [toast, setToast] = useState(false);

  const save = () => {
    updateSection("stats", stats);
    setToast(true);
  };

  const update = (index: number, field: keyof StatItem, value: string | number) => {
    setStats((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const closeToast = useCallback(() => setToast(false), []);

  return (
    <div className="max-w-[800px] mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold font-mono text-white">Statistics</h1>
        <p className="text-[#9a9aaa] font-mono text-sm mt-1">Edit the stats displayed on your home page.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-[#1e1e26] rounded-xl p-5 border border-white/5 space-y-4"
          >
            <div>
              <label className="block text-[#9a9aaa] font-mono text-xs mb-2">Value</label>
              <input
                type="number"
                value={stat.value}
                onChange={(e) => update(i, "value", parseInt(e.target.value) || 0)}
                className="w-full bg-[#14141a] text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-accent transition-all font-mono text-sm border border-white/5"
              />
            </div>
            <div>
              <label className="block text-[#9a9aaa] font-mono text-xs mb-2">Label</label>
              <input
                value={stat.label.replace("\n", " ")}
                onChange={(e) => update(i, "label", e.target.value)}
                className="w-full bg-[#14141a] text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-accent transition-all font-mono text-sm border border-white/5"
              />
              <p className="text-[#9a9aaa]/50 text-[10px] font-mono mt-1">Use \n for line break</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        onClick={save}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-[#1b1b22] font-bold font-mono text-sm rounded-xl transition-colors"
      >
        <FiSave size={16} /> Save Changes
      </motion.button>

      <Toast message="Stats saved!" visible={toast} onClose={closeToast} />
    </div>
  );
}
