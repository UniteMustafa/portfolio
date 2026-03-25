import type { Metadata } from "next";
import Link from "next/link";
import { FiHome, FiArrowLeft } from "react-icons/fi";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The page you are looking for doesn't exist or has been moved.",
};

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="text-center max-w-md">
        {/* Big 404 */}
        <h1
          className="text-[120px] sm:text-[160px] font-extrabold leading-none font-mono text-transparent select-none"
          style={{ WebkitTextStroke: "2px var(--color-accent)" }}
        >
          404
        </h1>

        {/* Message */}
        <h2 className="text-white font-mono font-bold text-xl mt-2 mb-3">
          Page Not Found
        </h2>
        <p className="text-[#9a9aaa] font-mono text-sm leading-relaxed mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-bg font-bold font-mono text-sm rounded-full transition-all"
          >
            <FiHome size={16} />
            Go Home
          </Link>
          <Link
            href="javascript:history.back()"
            className="flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-accent text-muted hover:text-accent font-mono text-sm rounded-full transition-all"
          >
            <FiArrowLeft size={16} />
            Go Back
          </Link>
        </div>

        {/* Decorative accent line */}
        <div className="h-[2px] bg-accent/20 mt-12 mx-auto max-w-[200px]" />
      </div>
    </div>
  );
}
