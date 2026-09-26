import { useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { gsap, isTouch } from "@/lib/gsap";
import { useScene } from "../../context/AppContext";
import { ChapterLabel, revealOnScroll } from "../common/ui";

const QUOTE = "I have a Strong Obsession for Attention to Detail.";
const HIGHLIGHT = ["strong", "obsession", "attention", "detail"];

const PRINCIPLES = [
  {
    title: "Clean Code",
    body: "Readable, typed and reusable — code the next developer thanks you for.",
  },
  {
    title: "UI / UX Design",
    body: "Designed before it's built. Every state, every edge case, every breakpoint.",
  },
  {
    title: "Performance",
    body: "Fast is a feature. Lean bundles, 60fps motion, accessible by default.",
  },
];

interface Body {
  el: HTMLElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  w: number;
  h: number;
  delay: number;
  frozen: boolean;
  ox?: number;
  oy?: number;
}

// Hover (or tap) and the sentence collapses under gravity. Words can be
// grabbed and thrown around afterwards.
const FallingText = ({ onFall }: { onFall: () => void }) => {
  const box = useRef<HTMLDivElement>(null);
  const fallRef = useRef(onFall);
  fallRef.current = onFall;
  const [started, setStarted] = useState(false);

  useScene(
    () => {
      gsap.from(".fw", {
        yPercent: 120,
        opacity: 0,
        rotate: 6,
        stagger: 0.06,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: box.current, start: "top 80%" },
      });
    },
    box
  );

  useEffect(() => {
    const container = box.current;
    if (!started || !container) return;
    fallRef.current();

    const words = Array.from(container.querySelectorAll<HTMLElement>(".fw"));
    gsap.killTweensOf(words);
    gsap.set(words, { clearProps: "all" });

    const cRect = container.getBoundingClientRect();
    const bodies: Body[] = words.map((el, i) => {
      const r = el.getBoundingClientRect();
      return {
        el,
        x: r.left - cRect.left + r.width / 2,
        y: r.top - cRect.top + r.height / 2,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 2,
        rot: 0,
        vr: (Math.random() - 0.5) * 0.1,
        w: r.width,
        h: r.height,
        delay: i * 30,
        frozen: false,
      };
    });
    bodies.forEach(({ el }) => {
      el.style.position = "absolute";
      el.style.margin = "0";
    });

    const pointer = { x: 0, y: 0, down: false, held: null as Body | null };
    const local = (e: PointerEvent) => {
      const r = container.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
    };
    const onMove = (e: PointerEvent) => local(e);
    const onDown = (e: PointerEvent) => {
      local(e);
      pointer.down = true;
      for (const b of bodies) {
        const dx = pointer.x - b.x;
        const dy = pointer.y - b.y;
        if (Math.hypot(dx, dy) < Math.max(b.w, b.h) / 2 + 20) {
          pointer.held = b;
          b.frozen = false;
          b.ox = dx;
          b.oy = dy;
          break;
        }
      }
    };
    const onUp = () => {
      if (pointer.held) {
        pointer.held.vx += (Math.random() - 0.5) * 5;
        pointer.held.vy -= 3;
      }
      pointer.down = false;
      pointer.held = null;
    };
    container.addEventListener("pointermove", onMove);
    container.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    const t0 = Date.now();
    let raf = 0;
    const tick = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      const elapsed = Date.now() - t0;

      for (const b of bodies) {
        if (elapsed < b.delay) continue;
        if (!b.frozen) {
          if (pointer.held === b && pointer.down) {
            b.x = pointer.x - (b.ox || 0);
            b.y = pointer.y - (b.oy || 0);
            b.vx = 0;
            b.vy = 0;
          } else {
            b.vy += 0.8;
            b.x += b.vx;
            b.y += b.vy;
            b.rot += b.vr;
            b.vx *= 0.98;
            b.vy *= 0.995;
          }
          // Half-extents of the rotated word, so tilted words rest on the
          // floor visually instead of sinking through it.
          const cos = Math.abs(Math.cos(b.rot));
          const sin = Math.abs(Math.sin(b.rot));
          const halfW = (b.w * cos + b.h * sin) / 2;
          const halfH = (b.w * sin + b.h * cos) / 2;
          const floor = height - halfH - 10;
          if (b.y > floor) {
            b.y = floor;
            if (Math.abs(b.vy) < 1) {
              b.vx = b.vy = b.vr = 0;
              b.frozen = pointer.held !== b;
            } else {
              b.vy *= -0.6;
              b.vx *= 0.8;
              b.vr *= 0.8;
            }
          }
          if (b.x > width - halfW) {
            b.x = width - halfW;
            b.vx *= -0.6;
          }
          if (b.x < halfW) {
            b.x = halfW;
            b.vx *= -0.6;
          }
          for (const o of bodies) {
            if (o === b || !o.frozen) continue;
            const dx = b.x - o.x;
            const dy = b.y - o.y;
            const dist = Math.hypot(dx, dy) || 1;
            const min = (b.w + o.w) / 2;
            if (dist < min && Math.abs(dy) < (b.h + o.h) / 2) {
              const push = (min - dist) * 0.5;
              b.x += (dx / dist) * push;
              b.y += (dy / dist) * push;
            }
          }
        }
        b.el.style.left = `${b.x}px`;
        b.el.style.top = `${b.y}px`;
        b.el.style.transform = `translate(-50%, -50%) rotate(${b.rot}rad)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener("pointermove", onMove);
      container.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [started]);

  return (
    <div
      ref={box}
      className="falling"
      data-cursor="view"
      data-cursor-label={started ? "Drag" : "Careful"}
      onPointerEnter={() => !isTouch() && setStarted(true)}
      onClick={() => setStarted(true)}
    >
      <div className="falling__text font-display">
        {QUOTE.split(" ").map((w, i) => (
          <span
            key={i}
            className={`fw ${HIGHLIGHT.some((h) => w.toLowerCase().includes(h)) ? "fw-hl" : ""}`}
          >
            {w}
          </span>
        ))}
      </div>
    </div>
  );
};

const Obsession = () => {
  const root = useRef<HTMLElement>(null);
  const [round, setRound] = useState(0);
  const [fallen, setFallen] = useState(false);

  useScene(
    () => {
      // The paper chapter unfolds out of a rounded card as it arrives…
      gsap.fromTo(
        ".obs-frame",
        { clipPath: "inset(12% 5% 0% 5% round 64px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "top 10%", scrub: true },
        }
      );
      // …and folds back up as it leaves.
      gsap.fromTo(
        ".obs-frame",
        { clipPath: "inset(0% 0% 0% 0% round 0px)" },
        {
          clipPath: "inset(0% 5% 10% 5% round 64px)",
          ease: "none",
          immediateRender: false,
          scrollTrigger: { trigger: root.current, start: "bottom 90%", end: "bottom top", scrub: true },
        }
      );

      gsap.from(".principle", {
        y: 80,
        opacity: 0,
        stagger: 0.12,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: ".obs-principles", start: "top 85%" },
      });

      revealOnScroll(root.current);
    },
    root
  );

  return (
    <section id="obsession" ref={root} className="chapter relative">
      <div className="obs-frame">
        <div className="mx-auto max-w-[1500px] px-pad py-28 md:py-40">
          <ChapterLabel num="04" title="The Obsession" dark />

          <div className="mt-10 flex flex-wrap items-center gap-3" data-reveal>
            <span className="pulse-dot bg-accent-deep" />
            <p className="text-base md:text-lg text-paper-ink/60">
              Danger ⚠️: Hovering may cause{" "}
              <span className="font-extrabold text-accent-deep">&quot;Emotional Damage&quot;.</span>
            </p>
            <span className="pulse-dot bg-accent-blue [animation-delay:.5s]" />
          </div>

          <FallingText key={round} onFall={() => setFallen(true)} />

          <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between" data-reveal>
            <p className="max-w-xl text-lg md:text-xl text-paper-ink/70 leading-relaxed">
              Every pixel, every interaction, every line of code matters in creating exceptional
              experiences.
            </p>
            <button
              className={`obs-reset ${fallen ? "is-visible" : ""}`}
              onClick={() => {
                setFallen(false);
                setRound((r) => r + 1);
              }}
            >
              <RotateCcw className="h-4 w-4" /> Undo the damage
            </button>
          </div>

          <div className="obs-principles mt-24 md:mt-36 grid md:grid-cols-3">
            {PRINCIPLES.map((p, i) => (
              <div key={p.title} className="principle group">
                <span className="principle__fill" aria-hidden />
                <span className="mono-label relative text-paper-ink/45 group-hover:text-white/70">
                  0{i + 1}
                </span>
                <h3 className="relative mt-16 md:mt-24 font-display text-4xl md:text-5xl tracking-tight">
                  {p.title}
                </h3>
                <p className="relative mt-4 max-w-[32ch] text-paper-ink/65 group-hover:text-white/80">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Obsession;
