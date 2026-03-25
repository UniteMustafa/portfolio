"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: "outline" | "filled";
  children: ReactNode;
  className?: string;
}

export default function Button({
  href,
  onClick,
  variant = "filled",
  children,
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold font-mono tracking-widest transition-all";
  const styles =
    variant === "outline"
      ? {
          borderColor: "var(--color-accent)",
          color: "var(--color-accent)",
          backgroundColor: "transparent",
          border: "1px solid var(--color-accent)",
        }
      : {
          backgroundColor: "var(--color-accent)",
          color: "var(--color-bg)",
          border: "none",
        };

  if (href) {
    return (
      <Link href={href} style={styles} className={`${base} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} style={styles} className={`${base} ${className}`}>
      {children}
    </button>
  );
}
