import { useEffect, useRef } from "react";
import "./styles/Cursor.css";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) {
      return;
    }

    let rafId = 0;
    let isSnappedToIcons = false;
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { x: target.x, y: target.y };

    const updateCursorTransform = () => {
      cursor.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isSnappedToIcons) {
        target.x = e.clientX;
        target.y = e.clientY;
      }
    };

    const loop = () => {
      const smoothing = isSnappedToIcons ? 0.22 : 0.18;
      current.x += (target.x - current.x) * smoothing;
      current.y += (target.y - current.y) * smoothing;
      updateCursorTransform();
      rafId = requestAnimationFrame(loop);
    };

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-cursor]")
    );

    const handlers = elements.map((element) => {
      const onEnter = (e: MouseEvent) => {
        const targetElement = e.currentTarget as HTMLElement;

        if (element.dataset.cursor === "icons") {
          const rect = targetElement.getBoundingClientRect();
          cursor.classList.add("cursor-icons");
          cursor.style.setProperty("--cursorW", `${Math.max(rect.width - 20, 20)}px`);
          cursor.style.setProperty("--cursorH", `${Math.max(rect.height - 20, 20)}px`);
          isSnappedToIcons = true;
          target.x = rect.left + 10;
          target.y = rect.top + 10;
          return;
        }

        if (element.dataset.cursor === "disable") {
          cursor.classList.add("cursor-disable");
        }
      };

      const onLeave = () => {
        cursor.classList.remove("cursor-disable", "cursor-icons");
        cursor.style.removeProperty("--cursorW");
        cursor.style.removeProperty("--cursorH");
        isSnappedToIcons = false;
      };

      element.addEventListener("mouseenter", onEnter);
      element.addEventListener("mouseleave", onLeave);

      return { element, onEnter, onLeave };
    });

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
      handlers.forEach(({ element, onEnter, onLeave }) => {
        element.removeEventListener("mouseenter", onEnter);
        element.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef}></div>;
};

export default Cursor;
