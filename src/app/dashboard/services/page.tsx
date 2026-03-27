"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, Reorder, useDragControls } from "framer-motion";
import { FiSave, FiPlus, FiTrash2, FiMenu } from "react-icons/fi";
import { usePortfolio } from "@/data/portfolio-context";
import Toast from "@/components/dashboard/Toast";
import type { ServiceItem } from "@/data/portfolio-data";

function ServiceItemCard({
  service,
  index,
  updateItem,
  removeService
}: {
  service: ServiceItem;
  index: number;
  updateItem: (index: number, field: keyof ServiceItem, value: string) => void;
  removeService: (index: number) => void;
}) {
  const controls = useDragControls();

  return (
    <Reorder.Item 
      value={service} 
      dragListener={false} 
      dragControls={controls}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.06 }}
        className="bg-[#1e1e26] rounded-xl p-5 border border-white/5 space-y-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              onPointerDown={(e) => controls.start(e)}
              className="cursor-grab active:cursor-grabbing p-2 -ml-2 rounded-md hover:bg-white/5 transition-colors"
              title="Drag to reorder"
            >
              <FiMenu className="text-[#9a9aaa]/60" />
            </div>
            <span className="text-accent font-mono font-bold text-lg">{service.num}</span>
          </div>
          <button
            onClick={() => removeService(index)}
            className="text-red-400/60 hover:text-red-400 transition-colors p-2"
          >
            <FiTrash2 size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#9a9aaa] font-mono text-xs mb-2">Title</label>
            <input
              value={service.title}
              onChange={(e) => updateItem(index, "title", e.target.value)}
              className="w-full bg-[#14141a] text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-accent transition-all font-mono text-sm border border-white/5"
            />
          </div>
          <div>
            <label className="block text-[#9a9aaa] font-mono text-xs mb-2">Link</label>
            <input
              value={service.href}
              onChange={(e) => updateItem(index, "href", e.target.value)}
              className="w-full bg-[#14141a] text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-accent transition-all font-mono text-sm border border-white/5"
            />
          </div>
        </div>

        <div>
          <label className="block text-[#9a9aaa] font-mono text-xs mb-2">Description</label>
          <textarea
            rows={2}
            value={service.description}
            onChange={(e) => updateItem(index, "description", e.target.value)}
            className="w-full bg-[#14141a] text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-accent transition-all font-mono text-sm border border-white/5 resize-none"
          />
          <p className="text-[#9a9aaa]/50 text-[10px] font-mono mt-1">Format text: **bold**, *italic*, [link text](url), & \n for new line.</p>
        </div>
      </motion.div>
    </Reorder.Item>
  );
}

export default function ServicesPage() {
  const { data, updateSection } = usePortfolio();
  const [services, setServices] = useState<ServiceItem[]>(data.services);
  const [toast, setToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("Services saved!");
  const bottomRef = useRef<HTMLDivElement>(null);
  const [justAdded, setJustAdded] = useState(false);

  const save = () => {
    // Re-number them
    const numbered = services.map((s, i) => ({
      ...s,
      num: String(i + 1).padStart(2, "0"),
    }));
    updateSection("services", numbered);
    setServices(numbered);
    setToastMsg("Services saved!");
    setToast(true);
  };

  const updateItem = (index: number, field: keyof ServiceItem, value: string) => {
    setServices((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const addService = () => {
    setServices((prev) => [
      ...prev,
      {
        num: String(prev.length + 1).padStart(2, "0"),
        title: "New Service",
        description: "",
        href: "/contact",
      },
    ]);
    setJustAdded(true);
    setToastMsg("New service added! Scroll down to edit it.");
    setToast(true);
  };

  useEffect(() => {
    if (justAdded && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      setJustAdded(false);
    }
  }, [justAdded, services.length]);

  const removeService = (index: number) => {
    setServices((prev) => prev.filter((_, i) => i !== index));
  };

  const closeToast = useCallback(() => setToast(false), []);

  return (
    <div className="max-w-[800px] mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-mono text-white">Services</h1>
          <p className="text-[#9a9aaa] font-mono text-sm mt-1">Manage the services you offer.</p>
        </div>
        <button
          onClick={addService}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent/10 text-accent font-mono text-sm hover:bg-accent/20 transition-colors"
        >
          <FiPlus size={16} /> Add Service
        </button>
      </motion.div>

      <Reorder.Group axis="y" values={services} onReorder={setServices} className="space-y-4">
        {services.map((service, i) => (
          <ServiceItemCard
            key={service.num + service.title}
            service={service}
            index={i}
            updateItem={updateItem}
            removeService={removeService}
          />
        ))}
      </Reorder.Group>

      <div ref={bottomRef} />

      <motion.button
        onClick={save}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-bg font-bold font-mono text-sm rounded-xl transition-colors"
      >
        <FiSave size={16} /> Save Changes
      </motion.button>

      <Toast message={toastMsg} visible={toast} onClose={closeToast} />
    </div>
  );
}
