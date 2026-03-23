"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SplashScreen from "@/components/layout/SplashScreen";
import PageTransition from "@/components/layout/PageTransition";
import StairTransition from "@/components/layout/StairTransition";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { usePortfolio } from "@/data/portfolio-context";

export default function PortfolioShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { loading } = usePortfolio();
  const isDashboard = pathname.startsWith("/dashboard");
  // Pages that are designed to fit the viewport (no footer)
  const isHomePage = pathname === "/";

  useEffect(() => {
    if (isDashboard) {
      document.body.classList.remove("portfolio-page");
      document.body.classList.add("dashboard-page");
    } else {
      document.body.classList.remove("dashboard-page");
      document.body.classList.add("portfolio-page");
    }
  }, [isDashboard]);

  if (isDashboard) {
    // Dashboard gets its own layout — skip portfolio chrome
    return <>{children}</>;
  }

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <>
      {/* Animated Site Perimeter Light Strip */}
      <div
        className="fixed inset-0 z-50 pointer-events-none p-[3px] md:p-[4px] opacity-70"
        style={{
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      >
        <div
          className="absolute top-1/2 left-1/2 w-[200vw] h-[200vh] origin-center -translate-x-1/2 -translate-y-1/2 animate-[spin_8s_linear_infinite]"
          style={{
            background: "conic-gradient(var(--color-accent) 0deg, transparent 180deg, var(--color-accent) 360deg)"
          }}
        />
      </div>

      <SplashScreen />
      <StairTransition />
      <Navbar />
      <main className="relative z-10">
        <PageTransition>{children}</PageTransition>
      </main>
      {!isHomePage && <Footer />}
    </>
  );
}
