"use client";

import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-xl p-6 ${className}`}
      style={{ backgroundColor: "var(--color-bg-secondary)" }}
    >
      {children}
    </div>
  );
}
