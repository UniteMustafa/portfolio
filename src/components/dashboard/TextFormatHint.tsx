import { FiInfo } from "react-icons/fi";

export default function TextFormatHint() {
  return (
    <div className="flex items-center gap-1.5 mt-1.5 text-[#9a9aaa]/60 text-[10px] font-mono bg-white/5 w-fit px-2 py-1 rounded-md border border-white/5">
      <FiInfo size={10} className="shrink-0 text-accent/80" />
      <span>Markdown: **bold**, *italic*, [link](url), \n for line break</span>
    </div>
  );
}
