"use client";

import { useState, useCallback } from "react";
import { motion, Reorder, useDragControls } from "framer-motion";
import { FiSave, FiPlus, FiTrash2, FiMenu } from "react-icons/fi";
import { usePortfolio } from "@/data/portfolio-context";
import Toast from "@/components/dashboard/Toast";
import type { ResumeData, ExperienceItem, EducationItem, SkillItem, AboutInfo } from "@/data/portfolio-data";

type ResumeTab = "experience" | "education" | "skills" | "about";

function ExpItemCard({ item, index, updateExp, removeExp }: any) {
  const controls = useDragControls();
  return (
    <Reorder.Item value={item} dragListener={false} dragControls={controls}>
      <div className="bg-[#1e1e26] rounded-xl p-5 border border-white/5 space-y-3">
        <div className="flex items-center justify-between">
          <div onPointerDown={(e) => controls.start(e)} className="cursor-grab active:cursor-grabbing p-2 -ml-2 hover:bg-white/5 rounded-md">
            <FiMenu className="text-[#9a9aaa]/60" />
          </div>
          <button onClick={() => removeExp(index)} className="text-red-400/60 hover:text-red-400 transition-colors p-1"><FiTrash2 size={14} /></button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input value={item.position} onChange={(e) => updateExp(index, "position", e.target.value)} placeholder="Position" className="bg-[#14141a] text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-accent font-mono text-sm border border-white/5" />
          <input value={item.company} onChange={(e) => updateExp(index, "company", e.target.value)} placeholder="Company" className="bg-[#14141a] text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-accent font-mono text-sm border border-white/5" />
          <input value={item.duration} onChange={(e) => updateExp(index, "duration", e.target.value)} placeholder="Duration" className="bg-[#14141a] text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-accent font-mono text-sm border border-white/5" />
        </div>
      </div>
    </Reorder.Item>
  );
}

function EduItemCard({ item, index, updateEdu, removeEdu }: any) {
  const controls = useDragControls();
  return (
    <Reorder.Item value={item} dragListener={false} dragControls={controls}>
      <div className="bg-[#1e1e26] rounded-xl p-5 border border-white/5 space-y-3">
        <div className="flex items-center justify-between">
          <div onPointerDown={(e) => controls.start(e)} className="cursor-grab active:cursor-grabbing p-2 -ml-2 hover:bg-white/5 rounded-md">
            <FiMenu className="text-[#9a9aaa]/60" />
          </div>
          <button onClick={() => removeEdu(index)} className="text-red-400/60 hover:text-red-400 transition-colors p-1"><FiTrash2 size={14} /></button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input value={item.degree} onChange={(e) => updateEdu(index, "degree", e.target.value)} placeholder="Degree" className="bg-[#14141a] text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-accent font-mono text-sm border border-white/5" />
          <input value={item.institution} onChange={(e) => updateEdu(index, "institution", e.target.value)} placeholder="Institution" className="bg-[#14141a] text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-accent font-mono text-sm border border-white/5" />
          <input value={item.duration} onChange={(e) => updateEdu(index, "duration", e.target.value)} placeholder="Duration" className="bg-[#14141a] text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-accent font-mono text-sm border border-white/5" />
        </div>
      </div>
    </Reorder.Item>
  );
}

function SkillItemCard({ item, index, updateSkill, removeSkill }: any) {
  const controls = useDragControls();
  return (
    <Reorder.Item value={item} dragListener={false} dragControls={controls}>
      <div className="bg-[#1e1e26] rounded-xl p-4 border border-white/5 flex items-center gap-3">
        <div onPointerDown={(e) => controls.start(e)} className="cursor-grab active:cursor-grabbing p-2 -ml-2 shrink-0 hover:bg-white/5 rounded-md">
          <FiMenu className="text-[#9a9aaa]/60" />
        </div>
        <select
          value={item.iconKey}
          onChange={(e) => updateSkill(index, "iconKey", e.target.value)}
          className="bg-[#14141a] text-white px-3 py-2.5 rounded-lg font-mono text-sm border border-white/5 outline-none focus:ring-1 focus:ring-accent w-[120px]"
        >
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="js">JavaScript</option>
          <option value="react">React</option>
          <option value="next">Next.js</option>
          <option value="tailwind">Tailwind</option>
          <option value="node">Node.js</option>
          <option value="figma">Figma</option>
        </select>
        <input
          value={item.name}
          onChange={(e) => updateSkill(index, "name", e.target.value)}
          placeholder="Skill name"
          className="flex-1 bg-[#14141a] text-white px-3 py-2.5 rounded-lg font-mono text-sm border border-white/5 outline-none focus:ring-1 focus:ring-accent"
        />
        <button onClick={() => removeSkill(index)} className="text-red-400/60 hover:text-red-400 transition-colors p-1 shrink-0"><FiTrash2 size={14} /></button>
      </div>
    </Reorder.Item>
  );
}

function AboutItemCard({ item, index, updateAbout, removeAbout }: any) {
  const controls = useDragControls();
  return (
    <Reorder.Item value={item} dragListener={false} dragControls={controls}>
      <div className="bg-[#1e1e26] rounded-xl p-4 border border-white/5 flex flex-col sm:flex-row items-center gap-3">
        <div onPointerDown={(e) => controls.start(e)} className="cursor-grab active:cursor-grabbing p-2 -ml-2 shrink-0 hover:bg-white/5 rounded-md self-start sm:self-auto">
          <FiMenu className="text-[#9a9aaa]/60" />
        </div>
        <input value={item.fieldName} onChange={(e) => updateAbout(index, "fieldName", e.target.value)} placeholder="Field name" className="w-full sm:w-[180px] bg-[#14141a] text-white px-3 py-2.5 rounded-lg font-mono text-sm border border-white/5 outline-none focus:ring-1 focus:ring-accent" />
        <input value={item.fieldValue} onChange={(e) => updateAbout(index, "fieldValue", e.target.value)} placeholder="Field value" className="flex-1 w-full bg-[#14141a] text-white px-3 py-2.5 rounded-lg font-mono text-sm border border-white/5 outline-none focus:ring-1 focus:ring-accent" />
        <button onClick={() => removeAbout(index)} className="text-red-400/60 hover:text-red-400 transition-colors p-1 shrink-0 self-end sm:self-auto"><FiTrash2 size={14} /></button>
      </div>
    </Reorder.Item>
  );
}

export default function ResumeDashboardPage() {
  const { data, updateSection } = usePortfolio();
  const [resume, setResume] = useState<ResumeData>(data.resume);
  const [activeTab, setActiveTab] = useState<ResumeTab>("experience");
  const [toast, setToast] = useState(false);

  const save = () => {
    updateSection("resume", resume);
    setToast(true);
  };

  const closeToast = useCallback(() => setToast(false), []);

  // Experience helpers
  const updateExp = (i: number, field: keyof ExperienceItem, value: string) => {
    setResume((prev) => {
      const items = [...prev.experienceItems];
      items[i] = { ...items[i], [field]: value };
      return { ...prev, experienceItems: items };
    });
  };
  const addExp = () => {
    setResume((prev) => ({
      ...prev,
      experienceItems: [...prev.experienceItems, { company: "", position: "", duration: "" }],
    }));
  };
  const removeExp = (i: number) => {
    setResume((prev) => ({
      ...prev,
      experienceItems: prev.experienceItems.filter((_, idx) => idx !== i),
    }));
  };

  // Education helpers
  const updateEdu = (i: number, field: keyof EducationItem, value: string) => {
    setResume((prev) => {
      const items = [...prev.educationItems];
      items[i] = { ...items[i], [field]: value };
      return { ...prev, educationItems: items };
    });
  };
  const addEdu = () => {
    setResume((prev) => ({
      ...prev,
      educationItems: [...prev.educationItems, { institution: "", degree: "", duration: "" }],
    }));
  };
  const removeEdu = (i: number) => {
    setResume((prev) => ({
      ...prev,
      educationItems: prev.educationItems.filter((_, idx) => idx !== i),
    }));
  };

  // Skills helpers
  const updateSkill = (i: number, field: keyof SkillItem, value: string) => {
    setResume((prev) => {
      const items = [...prev.skillsList];
      items[i] = { ...items[i], [field]: value };
      return { ...prev, skillsList: items };
    });
  };
  const addSkill = () => {
    setResume((prev) => ({
      ...prev,
      skillsList: [...prev.skillsList, { iconKey: "html", name: "" }],
    }));
  };
  const removeSkill = (i: number) => {
    setResume((prev) => ({
      ...prev,
      skillsList: prev.skillsList.filter((_, idx) => idx !== i),
    }));
  };

  // About helpers
  const updateAbout = (i: number, field: keyof AboutInfo, value: string) => {
    setResume((prev) => {
      const items = [...prev.aboutInfo];
      items[i] = { ...items[i], [field]: value };
      return { ...prev, aboutInfo: items };
    });
  };
  const addAbout = () => {
    setResume((prev) => ({
      ...prev,
      aboutInfo: [...prev.aboutInfo, { fieldName: "", fieldValue: "" }],
    }));
  };
  const removeAbout = (i: number) => {
    setResume((prev) => ({
      ...prev,
      aboutInfo: prev.aboutInfo.filter((_, idx) => idx !== i),
    }));
  };

  const tabs: { key: ResumeTab; label: string }[] = [
    { key: "experience", label: "Experience" },
    { key: "education", label: "Education" },
    { key: "skills", label: "Skills" },
    { key: "about", label: "About" },
  ];

  return (
    <div className="max-w-[900px] mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold font-mono text-white">Resume</h1>
        <p className="text-[#9a9aaa] font-mono text-sm mt-1">Manage experience, education, skills, and about info.</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2.5 rounded-lg font-mono text-sm font-bold transition-all duration-200 ${
              activeTab === tab.key
                ? "bg-accent text-[#1b1b22]"
                : "bg-[#1e1e26] text-[#9a9aaa] hover:bg-[#1e1e26]/80 border border-white/5"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* EXPERIENCE TAB */}
      {activeTab === "experience" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="bg-[#1e1e26] rounded-xl p-5 border border-white/5 space-y-4">
            <div>
              <label className="block text-[#9a9aaa] font-mono text-xs mb-2">Section Title</label>
              <input
                value={resume.experienceTitle}
                onChange={(e) => setResume((p) => ({ ...p, experienceTitle: e.target.value }))}
                className="w-full bg-[#14141a] text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-accent font-mono text-sm border border-white/5"
              />
            </div>
            <div>
              <label className="block text-[#9a9aaa] font-mono text-xs mb-2">Section Description</label>
              <textarea
                rows={2}
                value={resume.experienceDescription}
                onChange={(e) => setResume((p) => ({ ...p, experienceDescription: e.target.value }))}
                className="w-full bg-[#14141a] text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-accent font-mono text-sm border border-white/5 resize-none"
              />
              <p className="text-[#9a9aaa]/50 text-[10px] font-mono mt-1">Format text: **bold**, *italic*, [link text](url), & \n for new line.</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h3 className="text-white font-mono font-bold text-sm">Items</h3>
            <button onClick={addExp} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/10 text-accent font-mono text-xs hover:bg-accent/20 transition-colors">
              <FiPlus size={14} /> Add
            </button>
          </div>

          <Reorder.Group axis="y" values={resume.experienceItems} onReorder={(newOrder) => setResume(p => ({ ...p, experienceItems: newOrder }))} className="space-y-3">
            {resume.experienceItems.map((item, i) => (
              <ExpItemCard key={item.company + item.position + i} item={item} index={i} updateExp={updateExp} removeExp={removeExp} />
            ))}
          </Reorder.Group>
        </motion.div>
      )}

      {/* EDUCATION TAB */}
      {activeTab === "education" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="bg-[#1e1e26] rounded-xl p-5 border border-white/5 space-y-4">
            <div>
              <label className="block text-[#9a9aaa] font-mono text-xs mb-2">Section Title</label>
              <input value={resume.educationTitle} onChange={(e) => setResume((p) => ({ ...p, educationTitle: e.target.value }))} className="w-full bg-[#14141a] text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-accent font-mono text-sm border border-white/5" />
            </div>
            <div>
              <label className="block text-[#9a9aaa] font-mono text-xs mb-2">Section Description</label>
              <textarea rows={2} value={resume.educationDescription} onChange={(e) => setResume((p) => ({ ...p, educationDescription: e.target.value }))} className="w-full bg-[#14141a] text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-accent font-mono text-sm border border-white/5 resize-none" />
              <p className="text-[#9a9aaa]/50 text-[10px] font-mono mt-1">Format text: **bold**, *italic*, [link text](url), & \n for new line.</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h3 className="text-white font-mono font-bold text-sm">Items</h3>
            <button onClick={addEdu} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/10 text-accent font-mono text-xs hover:bg-accent/20 transition-colors"><FiPlus size={14} /> Add</button>
          </div>

          <Reorder.Group axis="y" values={resume.educationItems} onReorder={(newOrder) => setResume(p => ({ ...p, educationItems: newOrder }))} className="space-y-3">
            {resume.educationItems.map((item, i) => (
              <EduItemCard key={item.institution + item.degree + i} item={item} index={i} updateEdu={updateEdu} removeEdu={removeEdu} />
            ))}
          </Reorder.Group>
        </motion.div>
      )}

      {/* SKILLS TAB */}
      {activeTab === "skills" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="bg-[#1e1e26] rounded-xl p-5 border border-white/5 space-y-4">
            <div>
              <label className="block text-[#9a9aaa] font-mono text-xs mb-2">Section Title</label>
              <input value={resume.skillsTitle} onChange={(e) => setResume((p) => ({ ...p, skillsTitle: e.target.value }))} className="w-full bg-[#14141a] text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-accent font-mono text-sm border border-white/5" />
            </div>
            <div>
              <label className="block text-[#9a9aaa] font-mono text-xs mb-2">Section Description</label>
              <textarea rows={2} value={resume.skillsDescription} onChange={(e) => setResume((p) => ({ ...p, skillsDescription: e.target.value }))} className="w-full bg-[#14141a] text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-accent font-mono text-sm border border-white/5 resize-none" />
              <p className="text-[#9a9aaa]/50 text-[10px] font-mono mt-1">Format text: **bold**, *italic*, [link text](url), & \n for new line.</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h3 className="text-white font-mono font-bold text-sm">Skills</h3>
            <button onClick={addSkill} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/10 text-accent font-mono text-xs hover:bg-accent/20 transition-colors"><FiPlus size={14} /> Add</button>
          </div>

          <Reorder.Group axis="y" values={resume.skillsList} onReorder={(newOrder) => setResume(p => ({ ...p, skillsList: newOrder }))} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {resume.skillsList.map((skill, i) => (
              <SkillItemCard key={skill.name + skill.iconKey + i} item={skill} index={i} updateSkill={updateSkill} removeSkill={removeSkill} />
            ))}
          </Reorder.Group>
        </motion.div>
      )}

      {/* ABOUT TAB */}
      {activeTab === "about" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="bg-[#1e1e26] rounded-xl p-5 border border-white/5 space-y-4">
            <div>
              <label className="block text-[#9a9aaa] font-mono text-xs mb-2">Section Title</label>
              <input value={resume.aboutTitle} onChange={(e) => setResume((p) => ({ ...p, aboutTitle: e.target.value }))} className="w-full bg-[#14141a] text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-accent font-mono text-sm border border-white/5" />
            </div>
            <div>
              <label className="block text-[#9a9aaa] font-mono text-xs mb-2">Section Description</label>
              <textarea rows={2} value={resume.aboutDescription} onChange={(e) => setResume((p) => ({ ...p, aboutDescription: e.target.value }))} className="w-full bg-[#14141a] text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-accent font-mono text-sm border border-white/5 resize-none" />
              <p className="text-[#9a9aaa]/50 text-[10px] font-mono mt-1">Format text: **bold**, *italic*, [link text](url), & \n for new line.</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h3 className="text-white font-mono font-bold text-sm">Info Fields</h3>
            <button onClick={addAbout} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/10 text-accent font-mono text-xs hover:bg-accent/20 transition-colors"><FiPlus size={14} /> Add</button>
          </div>

          <Reorder.Group axis="y" values={resume.aboutInfo} onReorder={(newOrder) => setResume(p => ({ ...p, aboutInfo: newOrder }))} className="space-y-3">
            {resume.aboutInfo.map((item, i) => (
              <AboutItemCard key={item.fieldName + i} item={item} index={i} updateAbout={updateAbout} removeAbout={removeAbout} />
            ))}
          </Reorder.Group>
        </motion.div>
      )}

      <motion.button
        onClick={save}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-[#1b1b22] font-bold font-mono text-sm rounded-xl transition-colors"
      >
        <FiSave size={16} /> Save All Resume Data
      </motion.button>

      <Toast message="Resume data saved!" visible={toast} onClose={closeToast} />
    </div>
  );
}
