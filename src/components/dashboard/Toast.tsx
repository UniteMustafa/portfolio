"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle, FiX } from "react-icons/fi";
import { useEffect } from "react";

interface ToastProps {
  message: string;
  visible: boolean;
  onClose: () => void;
}

export default function Toast({ message, visible, onClose }: ToastProps) {
  useEffect(() => {
    if (visible) {
      const t = setTimeout(onClose, 3000);
      return () => clearTimeout(t);
    }
  }, [visible, onClose]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-[200] flex items-center gap-3 px-5 py-3.5 rounded-xl font-mono text-sm shadow-2xl border border-accent/20"
          style={{
            backgroundColor: "rgba(0, 170, 255, 0.1)",
            backdropFilter: "blur(16px)",
            color: "var(--color-accent)",
          }}
        >
          <FiCheckCircle size={18} />
          <span>{message}</span>
          <button onClick={onClose} className="ml-2 hover:text-white transition-colors">
            <FiX size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
