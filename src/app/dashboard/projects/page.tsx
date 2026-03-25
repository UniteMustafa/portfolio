"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FiSave, FiPlus, FiTrash2, FiX, FiCheck } from "react-icons/fi";
import { usePortfolio } from "@/data/portfolio-context";
import Toast from "@/components/dashboard/Toast";
import ImageUploader from "@/components/dashboard/ImageUploader";
import type { ProjectItem } from "@/data/portfolio-data";

export default function ProjectsPage() {
  const { data, updateSection } = usePortfolio();
  const [projects, setProjects] = useState<ProjectItem[]>(data.projects);
  const [toast, setToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("Projects saved!");
  const bottomRef = useRef<HTMLDivElement>(null);

  const save = () => {
    const numbered = projects.map((p, i) => ({
      ...p,
      num: String(i + 1).padStart(2, "0"),
    }));
    updateSection("projects", numbered);
    setProjects(numbered);
    setToastMsg("Projects saved!");
    setToast(true);
  };

  const updateItem = (index: number, field: keyof ProjectItem, value: string) => {
    setProjects((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value } as ProjectItem;
      return copy;
    });
  };

  const updateStack = (projectIndex: number, stackIndex: number, value: string) => {
    setProjects((prev) => {
      const copy = [...prev];
      const stack = [...copy[projectIndex].stack];
      stack[stackIndex] = { name: value };
      copy[projectIndex] = { ...copy[projectIndex], stack };
      return copy;
    });
  };

  const addStackItem = (projectIndex: number) => {
    setProjects((prev) => {
      const copy = [...prev];
      copy[projectIndex] = {
        ...copy[projectIndex],
        stack: [...copy[projectIndex].stack, { name: "" }],
      };
      return copy;
    });
  };

  const removeStackItem = (projectIndex: number, stackIndex: number) => {
    setProjects((prev) => {
      const copy = [...prev];
      copy[projectIndex] = {
        ...copy[projectIndex],
        stack: copy[projectIndex].stack.filter((_, i) => i !== stackIndex),
      };
      return copy;
    });
  };

  const [justAdded, setJustAdded] = useState(false);

  const addProject = () => {
    setProjects((prev) => [
      ...prev,
      {
        num: String(prev.length + 1).padStart(2, "0"),
        category: "frontend",
        title: "New Project",
        description: "",
        stack: [{ name: "" }],
        image: "/assets/work/thumb1.png",
        live: "",
        github: "",
      },
    ]);
    setJustAdded(true);
    setToastMsg("New project added! Scroll down to edit it.");
    setToast(true);
  };

  // Scroll to new project when added
  useEffect(() => {
    if (justAdded && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      setJustAdded(false);
    }
  }, [justAdded, projects.length]);

  const removeProject = (index: number) => {
    setProjects((prev) => prev.filter((_, i) => i !== index));
  };

  const closeToast = useCallback(() => setToast(false), []);

  return (
    <div className="max-w-[900px] mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-mono text-white">Projects</h1>
          <p className="text-muted font-mono text-sm mt-1">Manage your portfolio projects.</p>
        </div>
        <button
          onClick={addProject}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent/10 text-accent font-mono text-sm hover:bg-accent/20 transition-colors"
        >
          <FiPlus size={16} /> Add Project
        </button>
      </motion.div>

      <div className="space-y-6">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-[#1e1e26] rounded-xl p-6 border border-white/5 space-y-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-accent font-mono font-bold text-2xl">{project.num}</span>
              <button
                onClick={() => removeProject(i)}
                className="text-red-400/60 hover:text-red-400 transition-colors p-2"
              >
                <FiTrash2 size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-muted font-mono text-xs mb-2">Title</label>
                <input
                  value={project.title}
                  onChange={(e) => updateItem(i, "title", e.target.value)}
                  className="w-full bg-[#14141a] text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-accent transition-all font-mono text-sm border border-white/5"
                />
              </div>
              <div>
                <label className="block text-muted font-mono text-xs mb-2">Category</label>
                <input
                  value={project.category}
                  onChange={(e) => updateItem(i, "category", e.target.value)}
                  className="w-full bg-[#14141a] text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-accent transition-all font-mono text-sm border border-white/5"
                />
              </div>
            </div>

            <div>
              <label className="block text-muted font-mono text-xs mb-2">Description</label>
              <textarea
                rows={2}
                value={project.description}
                onChange={(e) => updateItem(i, "description", e.target.value)}
                className="w-full bg-[#14141a] text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-accent transition-all font-mono text-sm border border-white/5 resize-none"
              />
            </div>

            {/* Project Image — file upload */}
            <div>
              <label className="block text-muted font-mono text-xs mb-2">Project Image</label>
              <ImageUploader
                value={project.image}
                onChange={(url) => updateItem(i, "image", url)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-muted font-mono text-xs mb-2">Live URL</label>
                <input
                  value={project.live}
                  onChange={(e) => updateItem(i, "live", e.target.value)}
                  className="w-full bg-[#14141a] text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-accent transition-all font-mono text-sm border border-white/5"
                />
              </div>
              <div>
                <label className="block text-muted font-mono text-xs mb-2">GitHub URL</label>
                <input
                  value={project.github}
                  onChange={(e) => updateItem(i, "github", e.target.value)}
                  className="w-full bg-[#14141a] text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-accent transition-all font-mono text-sm border border-white/5"
                />
              </div>
            </div>

            {/* Stack / Technologies */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-muted font-mono text-xs">Tech Stack</label>
                <button
                  onClick={() => addStackItem(i)}
                  className="text-accent font-mono text-xs hover:underline"
                >
                  + Add tech
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech, si) => (
                  <div
                    key={si}
                    className="flex items-center gap-1 bg-accent/10 border border-accent/20 rounded-lg pl-3 pr-1 py-1"
                  >
                    <input
                      value={tech.name}
                      onChange={(e) => updateStack(i, si, e.target.value)}
                      className="bg-transparent text-accent font-mono text-sm outline-none w-24"
                      placeholder="Tech name"
                    />
                    <button
                      onClick={() => removeStackItem(i, si)}
                      className="text-accent/40 hover:text-red-400 transition-colors p-1"
                    >
                      <FiX size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Scroll anchor */}
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
