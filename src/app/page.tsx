import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <div
      className="flex flex-col"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      {/* Hero — fills remaining space on desktop; natural height on mobile */}
      <div className="flex-1 flex items-center min-h-[calc(100vh-50px)]">
        <Hero />
      </div>

      {/* Stats — pinned to bottom on desktop; flows naturally on mobile */}
      <Stats />

      {/* Testimonials */}
      <Testimonials />
    </div>
  );
}
