"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { FiSave, FiPlus, FiTrash2 } from "react-icons/fi";
import { usePortfolio } from "@/data/portfolio-context";
import Toast from "@/components/dashboard/Toast";
import TextFormatHint from "@/components/dashboard/TextFormatHint";
import ImageUploader from "@/components/dashboard/ImageUploader";
import type { SocialLink } from "@/data/portfolio-data";

export default function HeroPage() {
  const { data, updateSection } = usePortfolio();
  const [hero, setHero] = useState(data.hero);
  const [toast, setToast] = useState(false);

  const save = () => {
    updateSection("hero", hero);
    setToast(true);
  };

  const updateField = (field: keyof typeof hero, value: string) => {
    setHero((prev) => ({ ...prev, [field]: value }));
  };

  const updateSocial = (index: number, field: keyof SocialLink, value: string) => {
    setHero((prev) => {
      const links = [...prev.socialLinks];
      links[index] = { ...links[index], [field]: value };
      return { ...prev, socialLinks: links };
    });
  };

  const addSocial = () => {
    setHero((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { iconKey: "github", href: "", label: "" }],
    }));
  };

  const removeSocial = (index: number) => {
    setHero((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index),
    }));
  };

  const closeToast = useCallback(() => setToast(false), []);

  return (
    <div className="max-w-[800px] mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold font-mono text-white">Hero Section</h1>
        <p className="text-[#9a9aaa] font-mono text-sm mt-1">Edit your landing page hero content.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-[#1e1e26] rounded-xl p-6 border border-white/5 space-y-5"
      >
        {/* Name */}
        <div>
          <label className="block text-[#9a9aaa] font-mono text-xs mb-2">Full Name</label>
          <input
            value={hero.name}
            onChange={(e) => updateField("name", e.target.value)}
            className="w-full bg-[#14141a] text-white p-3.5 rounded-lg outline-none focus:ring-1 focus:ring-accent transition-all font-mono text-sm border border-white/5"
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="block text-[#9a9aaa] font-mono text-xs mb-2">Subtitle / Role</label>
          <input
            value={hero.subtitle}
            onChange={(e) => updateField("subtitle", e.target.value)}
            className="w-full bg-[#14141a] text-white p-3.5 rounded-lg outline-none focus:ring-1 focus:ring-accent transition-all font-mono text-sm border border-white/5"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-[#9a9aaa] font-mono text-xs mb-2">Description</label>
          <textarea
            rows={4}
            value={hero.description}
            onChange={(e) => updateField("description", e.target.value)}
            className="w-full bg-[#14141a] text-white p-3.5 rounded-lg outline-none focus:ring-1 focus:ring-accent transition-all font-mono text-sm border border-white/5 resize-none"
          />
          <TextFormatHint />
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-[#9a9aaa] font-mono text-xs mb-2">Profile Photo</label>
          <ImageUploader 
            value={hero.photoUrl} 
            onChange={(url) => updateField("photoUrl", url)} 
          />
        </div>
      </motion.div>

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-[#1e1e26] rounded-xl p-6 border border-white/5 space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-white font-mono font-bold text-sm">Social Links</h2>
          <button
            onClick={addSocial}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/10 text-accent font-mono text-xs hover:bg-accent/20 transition-colors"
          >
            <FiPlus size={14} /> Add Link
          </button>
        </div>

        {hero.socialLinks.map((link, i) => (
          <div key={i} className="flex flex-col sm:flex-row gap-3 p-4 bg-[#14141a] rounded-lg border border-white/5">
            <select
              value={link.iconKey}
              onChange={(e) => updateSocial(i, "iconKey", e.target.value)}
              className="bg-[#1e1e26] text-white px-3 py-2.5 rounded-lg font-mono text-sm border border-white/5 outline-none focus:ring-1 focus:ring-accent sm:w-[130px]"
            >
              <option value="github">GitHub</option>
              <option value="linkedin">LinkedIn</option>
              <option value="youtube">YouTube</option>
              <option value="twitter">Twitter</option>
            </select>
            <input
              value={link.label}
              onChange={(e) => updateSocial(i, "label", e.target.value)}
              placeholder="Label"
              className="flex-1 bg-[#1e1e26] text-white px-3 py-2.5 rounded-lg font-mono text-sm border border-white/5 outline-none focus:ring-1 focus:ring-accent"
            />
            <input
              value={link.href}
              onChange={(e) => updateSocial(i, "href", e.target.value)}
              placeholder="URL"
              className="flex-[2] bg-[#1e1e26] text-white px-3 py-2.5 rounded-lg font-mono text-sm border border-white/5 outline-none focus:ring-1 focus:ring-accent"
            />
            <button
              onClick={() => removeSocial(i)}
              className="text-red-400/60 hover:text-red-400 transition-colors p-2 self-center"
            >
              <FiTrash2 size={16} />
            </button>
          </div>
        ))}
      </motion.div>

      {/* Save Button */}
      <motion.button
        onClick={save}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-[#1b1b22] font-bold font-mono text-sm rounded-xl transition-colors"
      >
        <FiSave size={16} /> Save Changes
      </motion.button>

      <Toast message="Hero section saved!" visible={toast} onClose={closeToast} />
    </div>
  );
}
