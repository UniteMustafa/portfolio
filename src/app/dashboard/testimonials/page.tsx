"use client";

import { useState, useCallback } from "react";
import { motion, Reorder, useDragControls } from "framer-motion";
import { FiPlus, FiTrash2, FiSave, FiStar, FiMenu } from "react-icons/fi";
import { usePortfolio } from "@/data/portfolio-context";
import Toast from "@/components/dashboard/Toast";
import TextFormatHint from "@/components/dashboard/TextFormatHint";
import type { TestimonialItem } from "@/data/portfolio-data";
import { initDragScroll } from "@/utils/dragScroll";

function TestimonialItemCard({
  item,
  index,
  updateItem,
  removeItem,
}: {
  item: TestimonialItem;
  index: number;
  updateItem: (i: number, f: keyof TestimonialItem, v: string | number) => void;
  removeItem: (i: number) => void;
}) {
  const controls = useDragControls();

  return (
    <Reorder.Item value={item} dragListener={false} dragControls={controls} whileDrag={{ scale: 0.98, opacity: 0.8, zIndex: 50 }} className="relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="bg-[#1e1e26] rounded-xl p-6 border border-white/5 space-y-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              onPointerDown={(e) => {
                e.preventDefault();
                controls.start(e);
                initDragScroll(e);
              }}
              className="cursor-grab active:cursor-grabbing p-3 -ml-3 shrink-0 rounded-md hover:bg-white/5 transition-colors touch-none select-none flex items-center justify-center"
              title="Drag to reorder"
              style={{ touchAction: "none" }}
            >
              <FiMenu className="text-[#9a9aaa]/60" size={18} />
            </div>
            <span className="text-accent font-mono text-xs font-bold">
              Testimonial
            </span>
          </div>
          <button
            onClick={() => removeItem(index)}
            className="text-red-400/40 hover:text-red-400 transition-colors p-2 -mr-2"
          >
            <FiTrash2 size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#9a9aaa] font-mono text-xs mb-1">Name</label>
            <input
              value={item.name}
              onChange={(e) => updateItem(index, "name", e.target.value)}
              className="w-full bg-[#14141a] text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-accent font-mono text-sm border border-white/5"
            />
          </div>
          <div>
            <label className="block text-[#9a9aaa] font-mono text-xs mb-1">Role</label>
            <input
              value={item.role}
              onChange={(e) => updateItem(index, "role", e.target.value)}
              className="w-full bg-[#14141a] text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-accent font-mono text-sm border border-white/5"
            />
          </div>
          <div>
            <label className="block text-[#9a9aaa] font-mono text-xs mb-1">Company</label>
            <input
              value={item.company}
              onChange={(e) => updateItem(index, "company", e.target.value)}
              className="w-full bg-[#14141a] text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-accent font-mono text-sm border border-white/5"
            />
          </div>
          <div>
            <label className="block text-[#9a9aaa] font-mono text-xs mb-1">Rating</label>
            <div className="flex items-center gap-1 pt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => updateItem(index, "rating", star)}
                  className="transition-colors"
                >
                  <FiStar
                    size={20}
                    className={star <= item.rating ? "text-accent fill-accent" : "text-white/20"}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[#9a9aaa] font-mono text-xs mb-1">Testimonial</label>
          <textarea
            rows={3}
            value={item.body}
            onChange={(e) => updateItem(index, "body", e.target.value)}
            className="w-full bg-[#14141a] text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-accent font-mono text-sm border border-white/5 resize-none"
          />
          <TextFormatHint />
        </div>
      </motion.div>
    </Reorder.Item>
  );
}

export default function TestimonialsDashboardPage() {
  const { data, updateSection } = usePortfolio();
  const [items, setItems] = useState<TestimonialItem[]>(data.testimonials || []);
  const [toast, setToast] = useState(false);
  const closeToast = useCallback(() => setToast(false), []);

  const addItem = () => {
    setItems([
      ...items,
      {
        id: `t_${Date.now()}`,
        name: "",
        role: "",
        company: "",
        body: "",
        avatar: "",
        rating: 5,
      },
    ]);
  };

  const updateItem = (index: number, field: keyof TestimonialItem, value: string | number) => {
    const updated = [...items];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (updated[index] as any)[field] = value;
    setItems(updated);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const save = () => {
    updateSection("testimonials", items);
    setToast(true);
  };

  return (
    <div className="max-w-[800px] mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold font-mono text-white">Testimonials</h1>
        <p className="text-[#9a9aaa] font-mono text-sm mt-1">
          Manage client testimonials displayed on your home page.
        </p>
      </motion.div>

      <Reorder.Group axis="y" values={items} onReorder={setItems} className="space-y-6">
        {items.map((item, i) => (
          <TestimonialItemCard
            key={item.id}
            item={item}
            index={i}
            updateItem={updateItem}
            removeItem={removeItem}
          />
        ))}
      </Reorder.Group>

      <div className="flex items-center gap-3">
        <button
          onClick={addItem}
          className="flex items-center gap-2 px-5 py-3 bg-[#1e1e26] hover:bg-[#252530] text-white font-mono text-sm rounded-xl transition-colors border border-white/5"
        >
          <FiPlus size={16} /> Add Testimonial
        </button>
        <button
          onClick={save}
          className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-[#1b1b22] font-bold font-mono text-sm rounded-xl transition-colors"
        >
          <FiSave size={16} /> Save
        </button>
      </div>

      <Toast message="Testimonials saved!" visible={toast} onClose={closeToast} />
    </div>
  );
}
