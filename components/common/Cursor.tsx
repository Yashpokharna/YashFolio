import { useEffect, useRef, useState } from "react";
import { gsap, isTouch } from "@/lib/gsap";

type Mode = "" | "hover" | "view" | "plain"; // plain: keep the small ring

// Dot + trailing ring. Any element can opt into a mode with
// data-cursor="view|hover" and an optional data-cursor-label.
const Cursor = () => {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("");
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (isTouch()) return;
    document.documentElement.classList.add("has-cursor");

    const dx = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3" });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.5, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.5, ease: "power3" });
    let shown = false;

    const move = (e: MouseEvent) => {
      if (!shown) {
        shown = true;
        gsap.set([dot.current, ring.current], { x: e.clientX, y: e.clientY });
        gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.3 });
      }
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const custom = t.closest<HTMLElement>("[data-cursor]");
      if (custom) {
        setMode(custom.dataset.cursor as Mode);
        setLabel(custom.dataset.cursorLabel || "");
      } else if (t.closest("a, button, [role='button'], label")) {
        setMode("hover");
        setLabel("");
      } else {
        setMode("");
        setLabel("");
      }
    };

    const down = () => gsap.to(ring.current, { scale: 0.8, duration: 0.2 });
    const up = () => gsap.to(ring.current, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.4)" });
    const leave = () => {
      shown = false;
      gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.3 });
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.documentElement.addEventListener("mouseleave", leave);

    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <>
      <div ref={ring} className={`cursor-ring ${mode ? `is-${mode}` : ""}`}>
        <div className="cursor-ring__inner">
          <span className="cursor-label">{label}</span>
        </div>
      </div>
      <div ref={dot} className={`cursor-dot ${mode === "view" ? "is-hidden" : ""}`} />
    </>
  );
};

export default Cursor;
