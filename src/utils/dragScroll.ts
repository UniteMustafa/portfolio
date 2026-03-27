export function initDragScroll(e: React.PointerEvent) {
  let scrollInterval: ReturnType<typeof setInterval>;
  let currentY = e.clientY;

  const handleMove = (ev: PointerEvent) => {
    currentY = ev.clientY;
  };

  const doScroll = () => {
    const threshold = 120; // Distance from edge (px) to start scrolling
    const speed = 15;     // Scroll amount per frame
    if (currentY < threshold) {
      window.scrollBy(0, -speed);
    } else if (window.innerHeight - currentY < threshold) {
      window.scrollBy(0, speed);
    }
  };

  scrollInterval = setInterval(doScroll, 16); // Run at ~60fps
  window.addEventListener("pointermove", handleMove);

  const handleUp = () => {
    clearInterval(scrollInterval);
    window.removeEventListener("pointermove", handleMove);
    window.removeEventListener("pointerup", handleUp);
    window.removeEventListener("pointercancel", handleUp);
  };

  window.addEventListener("pointerup", handleUp);
  window.addEventListener("pointercancel", handleUp);
}
