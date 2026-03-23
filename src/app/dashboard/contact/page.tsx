"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { FiSave, FiPlus, FiTrash2 } from "react-icons/fi";
import { usePortfolio } from "@/data/portfolio-context";
import Toast from "@/components/dashboard/Toast";
import type { ContactInfoItem } from "@/data/portfolio-data";

export default function ContactDashboardPage() {
  const { data, updateSection } = usePortfolio();
  const [contacts, setContacts] = useState<ContactInfoItem[]>(data.contactInfo);
  const [toast, setToast] = useState(false);

  const save = () => {
    updateSection("contactInfo", contacts);
    setToast(true);
  };

  const update = (i: number, field: keyof ContactInfoItem, value: string) => {
    setContacts((prev) => {
      const copy = [...prev];
      copy[i] = { ...copy[i], [field]: value };
      return copy;
    });
  };

  const add = () => {
    setContacts((prev) => [...prev, { iconKey: "phone", title: "", description: "" }]);
  };

  const remove = (i: number) => {
    setContacts((prev) => prev.filter((_, idx) => idx !== i));
  };

  const closeToast = useCallback(() => setToast(false), []);

  return (
    <div className="max-w-[800px] mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-mono text-white">Contact Info</h1>
          <p className="text-[#9a9aaa] font-mono text-sm mt-1">Update contact details displayed on your site.</p>
        </div>
        <button
          onClick={add}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent/10 text-accent font-mono text-sm hover:bg-accent/20 transition-colors"
        >
          <FiPlus size={16} /> Add Item
        </button>
      </motion.div>

      <div className="space-y-4">
        {contacts.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-[#1e1e26] rounded-xl p-5 border border-white/5 space-y-4"
          >
            <div className="flex items-center justify-between">
              <select
                value={item.iconKey}
                onChange={(e) => update(i, "iconKey", e.target.value)}
                className="bg-[#14141a] text-white px-3 py-2.5 rounded-lg font-mono text-sm border border-white/5 outline-none focus:ring-1 focus:ring-accent"
              >
                <option value="phone">Phone</option>
                <option value="email">Email</option>
                <option value="address">Address</option>
              </select>
              <button
                onClick={() => remove(i)}
                className="text-red-400/60 hover:text-red-400 transition-colors p-2"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#9a9aaa] font-mono text-xs mb-2">Title</label>
                <input
                  value={item.title}
                  onChange={(e) => update(i, "title", e.target.value)}
                  className="w-full bg-[#14141a] text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-accent font-mono text-sm border border-white/5"
                />
              </div>
              <div>
                <label className="block text-[#9a9aaa] font-mono text-xs mb-2">Value</label>
                <input
                  value={item.description}
                  onChange={(e) => update(i, "description", e.target.value)}
                  className="w-full bg-[#14141a] text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-accent font-mono text-sm border border-white/5"
                />
              </div>
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

      <Toast message="Contact info saved!" visible={toast} onClose={closeToast} />
    </div>
  );
}
