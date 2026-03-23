"use client";

import { PortfolioProvider } from "@/data/portfolio-context";
import DynamicSEO from "@/components/DynamicSEO";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PortfolioProvider>
      <DynamicSEO />
      {children}
    </PortfolioProvider>
  );
}
