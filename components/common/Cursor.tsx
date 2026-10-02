import { useEffect, useRef } from "react";
import { gsap, isTouch, prefersReducedMotion } from "@/lib/gsap";

type Mode = "" | "hover" | "view" | "plain";

// Blob diameter (px) per mode. "plain" is for links that animate their own
// hover state, so the blob only swells a little over them.
const SIZE: Record<Mode, number> = { "": 14, plain: 24, hover: 64, view: 104 };
// The blob element is drawn at this size and scaled, so every change is a
// compositor-only transform.
const BASE = 104;

// A liquid blob: it inverts whatever it passes over, stretches along the
// direction of travel and settles back into a circle when the pointer rests.
// Any element can opt into a mode with data-cursor="view|hover|plain" and an
// optional data-cursor-label.
const Cursor = () => {
  const root = useRef<HTMLDivElement>(null);
  const blob = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isTouch() || !root.current || !blob.current || !label.current) return;
    const el = root.current;
    const shape = blob.current;
    const text = label.current;
    document.documentElement.classList.add("has-cursor");

    const stretchy = !prefersReducedMotion();
    const pos = { x: -200, y: -200 };
    const target = { x: -200, y: -200 };
    const state = { size: SIZE[""], press: 1, angle: 0, stretch: 0 };
    let mode: Mode = "";
    let shown = false;

    const setPos = gsap.quickSetter(el, "css");
    const setShape = gsap.quickSetter(shape, "css");

    const tick = () => {
      const dt = gsap.ticker.deltaRatio();
      const ease = 1 - Math.pow(1 - 0.22, dt);
      const vx = (target.x - pos.x) * ease;
      const vy = (target.y - pos.y) * ease;
      pos.x += vx;
      pos.y += vy;

      // Stretch with speed, less so once the blob is big, and let it relax.
      const speed = Math.hypot(vx, vy) / dt;
      const want = stretchy ? Math.min(speed / 60, 0.55) * (SIZE[""] / Math.max(state.size, SIZE[""])) ** 0.4 : 0;
      state.stretch += (want - state.stretch) * (1 - Math.pow(1 - 0.18, dt));
      if (speed > 0.4) state.angle = Math.atan2(vy, vx);

      const s = (state.size / BASE) * state.press;
      setPos({ x: pos.x, y: pos.y });
      setShape({
        rotation: (state.angle * 180) / Math.PI,
        scaleX: s * (1 + state.stretch),
        scaleY: s * (1 - state.stretch * 0.45),
      });
    };
    gsap.ticker.add(tick);

    const setMode = (next: Mode, nextLabel = "") => {
      if (next !== mode) {
        el.classList.remove(`is-${mode || "idle"}`);
        el.classList.add(`is-${next || "idle"}`);
        mode = next;
        gsap.to(state, { size: SIZE[next], duration: 0.55, ease: "elastic.out(1, 0.65)", overwrite: "auto" });
      }
      if (text.textContent !== nextLabel) text.textContent = nextLabel;
    };
    el.classList.add("is-idle");

    const move = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!shown) {
        shown = true;
        pos.x = target.x;
        pos.y = target.y;
        gsap.to(el, { autoAlpha: 1, duration: 0.3 });
      }
    };

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const custom = t.closest<HTMLElement>("[data-cursor]");
      if (custom) setMode(custom.dataset.cursor as Mode, custom.dataset.cursorLabel || "");
      else if (t.closest("a, button, [role='button'], label")) setMode("hover");
      else setMode("");
    };

    const down = () => gsap.to(state, { press: 0.78, duration: 0.15, ease: "power2.out" });
    const up = () => gsap.to(state, { press: 1, duration: 0.6, ease: "elastic.out(1.1, 0.4)" });
    const leave = () => {
      shown = false;
      gsap.to(el, { autoAlpha: 0, duration: 0.3 });
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.documentElement.addEventListener("mouseleave", leave);

    return () => {
      gsap.ticker.remove(tick);
      gsap.killTweensOf([state, el]);
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div ref={root} className="cursor" aria-hidden>
      <div ref={blob} className="cursor__blob" />
      <span ref={label} className="cursor__label" />
    </div>
  );
};

export default Cursor;
