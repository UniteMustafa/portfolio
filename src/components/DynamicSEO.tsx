"use client";

import { useEffect } from "react";
import { usePortfolio } from "@/data/portfolio-context";
import { usePathname } from "next/navigation";

/**
 * Client component that syncs document.title and meta description
 * with portfolio settings from Supabase/context.
 */
export default function DynamicSEO() {
  const { data } = usePortfolio();
  const pathname = usePathname();

  useEffect(() => {
    const { siteTitle, siteDescription } = data.settings;

    // Build page-specific title
    const pageNames: Record<string, string> = {
      "/": "",
      "/services": "Services",
      "/resume": "Resume",
      "/work": "Projects",
      "/blog": "Blog",
      "/contact": "Contact",
    };

    const pageName = pageNames[pathname];
    document.title = pageName
      ? `${pageName} | ${siteTitle}`
      : siteTitle;

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", siteDescription);
    }
  }, [data.settings, pathname]);

  return null;
}
