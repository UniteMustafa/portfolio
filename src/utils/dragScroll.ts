import type React from "react";

export function initDragScroll(e: React.PointerEvent) {
  let scrollAnimationId: number;
  let currentY = e.clientY;

  // Cache container to avoid querying the DOM ~60 times per second
  const scrollContainer = document.querySelector("main") || window;
  const isMain = scrollContainer !== window;
  const mainEl = scrollContainer as HTMLElement;

  const handleMove = (ev: PointerEvent) => {
    currentY = ev.clientY;
  };

  const doScroll = () => {
    const threshold = 120; // Distance from edge (px) to start scrolling
    const speed = 15;      // Scroll amount per frame

    if (isMain) {
      const rect = mainEl.getBoundingClientRect();
      const targetY = currentY - rect.top;
      
      if (targetY < threshold) {
        mainEl.scrollBy(0, -speed);
      } else if (rect.bottom - currentY < threshold) {
        mainEl.scrollBy(0, speed);
      }
    } else {
      if (currentY < threshold) {
        window.scrollBy(0, -speed);
      } else if (window.innerHeight - currentY < threshold) {
        window.scrollBy(0, speed);
      }
    }

    scrollAnimationId = requestAnimationFrame(doScroll);
  };

  // Start the animation loop
  scrollAnimationId = requestAnimationFrame(doScroll);

  // Use capture phase to catch events before Framer Motion calls stopPropagation
  const eventOptions = { capture: true, passive: true };
  
  window.addEventListener("pointermove", handleMove, eventOptions);

  const handleUp = () => {
    cancelAnimationFrame(scrollAnimationId);
    window.removeEventListener("pointermove", handleMove, eventOptions);
    window.removeEventListener("pointerup", handleUp, eventOptions);
    window.removeEventListener("pointercancel", handleUp, eventOptions);
  };

  window.addEventListener("pointerup", handleUp, eventOptions);
  window.addEventListener("pointercancel", handleUp, eventOptions);
}
