import { useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { gsap, isTouch } from "@/lib/gsap";
import { useScene } from "../../context/AppContext";
import { ChapterLabel, revealOnScroll } from "../common/ui";

const QUOTE = "I have a Strong Obsession for Attention to Detail.";
const HIGHLIGHT = ["strong", "obsession", "attention", "detail"];
const WORDS = QUOTE.split(" ");

// Tiny illustrations that sit on top of each principle card.
const CodeVisual = () => (
  <pre className="pv-code" aria-hidden>
    <span className="pv-ln">1</span>
    <span className="k">const</span> <span className="f">ship</span> = (idea: <span className="t">Idea</span>) =&gt;
    {"\n"}
    <span className="pv-ln">2</span>
    {"  "}
    <span className="f">polish</span>(idea, {"{"} edgeCases: <span className="k">true</span> {"}"});
    {"\n"}
    <span className="pv-ln">3</span>
    <span className="c">{"// typed, tested, readable"}</span>
    <span className="pv-caret" />
  </pre>
);

const CurveVisual = () => (
  <svg className="pv-curve" viewBox="0 0 260 130" aria-hidden>
    <defs>
      <linearGradient id="pv-curve-grad" x1="0" x2="1">
        <stop offset="0" stopColor="#67e8f9" />
        <stop offset="1" stopColor="#3b82f6" />
      </linearGradient>
    </defs>
    <line x1="26" y1="104" x2="78" y2="18" className="pv-handle" />
    <line x1="234" y1="92" x2="168" y2="18" className="pv-handle" />
    <path d="M26 104 C 78 18, 168 18, 234 92" pathLength={1} className="pv-path" />
    <circle cx="78" cy="18" r="4" className="pv-ctrl" />
    <circle cx="168" cy="18" r="4" className="pv-ctrl" />
    <rect x="21" y="99" width="10" height="10" className="pv-anchor" />
    <rect x="229" y="87" width="10" height="10" className="pv-anchor" />
  </svg>
);

const RING = 2 * Math.PI * 44;
const PerfVisual = () => (
  <div className="pv-perf" aria-hidden>
    <svg viewBox="0 0 110 110" className="pv-ring">
      <defs>
        <linearGradient id="pv-ring-grad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#67e8f9" />
          <stop offset="1" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <circle cx="55" cy="55" r="44" className="pv-ring__track" />
      <circle
        cx="55"
        cy="55"
        r="44"
        className="pv-ring__bar"
        strokeDasharray={RING}
        strokeDashoffset={RING}
      />
    </svg>
    <span className="pv-score font-display">100</span>
    <ul className="pv-metrics">
      <li>
        <i /> LCP <b>0.8s</b>
      </li>
      <li>
        <i /> CLS <b>0.00</b>
      </li>
      <li>
        <i /> FPS <b>60</b>
      </li>
    </ul>
  </div>
);

const PRINCIPLES = [
  {
    visual: CodeVisual,
    title: "Clean Code",
    body: "Readable, typed and reusable — code the next developer thanks you for.",
  },
  {
    visual: CurveVisual,
    title: "UI / UX Design",
    body: "Designed before it's built. Every state, every edge case, every breakpoint.",
  },
  {
    visual: PerfVisual,
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
        {WORDS.map((w, i) => (
          <span key={i} className="fw">
            <span className={HIGHLIGHT.some((h) => w.toLowerCase().includes(h)) ? "fw-hl" : undefined}>
              {w}
            </span>
            {/* The last word wears a design-tool selection box, handles and all. */}
            {i === WORDS.length - 1 && (
              <span className="fw-sel" aria-hidden>
                <i />
                <i />
                <i />
                <i />
                <b>Text · {w}</b>
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
};

const Obsession = () => {
  const root = useRef<HTMLElement>(null);
  const board = useRef<HTMLDivElement>(null);
  const [round, setRound] = useState(0);
  const [fallen, setFallen] = useState(false);
  const [size, setSize] = useState({ w: 0, h: 0 });

  // The artboard reports its real dimensions, like a selected frame would.
  useEffect(() => {
    const el = board.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) =>
      setSize({ w: Math.round(e.contentRect.width), h: Math.round(e.contentRect.height) })
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useScene(
    () => {
      gsap.to(".obs-glow", {
        yPercent: -18,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
      });

      // The frame draws itself in: border traces, then handles pop.
      gsap.fromTo(
        ".artboard__frame",
        { clipPath: "inset(0% 100% 100% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.4,
          ease: "expo.inOut",
          scrollTrigger: { trigger: ".artboard", start: "top 80%" },
        }
      );
      gsap.from(".artboard__h, .artboard__tag", {
        scale: 0,
        opacity: 0,
        stagger: 0.06,
        duration: 0.6,
        delay: 0.9,
        ease: "back.out(2)",
        scrollTrigger: { trigger: ".artboard", start: "top 80%" },
      });

      gsap.from(".principle", {
        y: 80,
        opacity: 0,
        stagger: 0.12,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: ".obs-principles", start: "top 85%" },
      });

      // Lighthouse-style score fills up and counts to 100.
      const score = { v: 0 };
      const scoreEl = root.current?.querySelector(".pv-score");
      gsap
        .timeline({ scrollTrigger: { trigger: ".pv-perf", start: "top 85%" } })
        .to(".pv-ring__bar", { strokeDashoffset: 0, duration: 1.8, ease: "power3.out" })
        .to(
          score,
          {
            v: 100,
            duration: 1.8,
            ease: "power3.out",
            onUpdate: () => {
              if (scoreEl) scoreEl.textContent = String(Math.round(score.v));
            },
          },
          0
        );

      revealOnScroll(root.current);
    },
    root
  );

  return (
    <section id="obsession" ref={root} className="chapter relative">
      <div className="obs-frame">
        <div className="obs-glow" aria-hidden />
        <div className="relative mx-auto max-w-[1500px] px-pad py-28 md:py-40">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <ChapterLabel num="04" title="The Obsession" />
            <p className="obs-warning" data-reveal>
              <span className="pulse-dot bg-accent" />
              Hovering may cause <b>&quot;Emotional Damage&quot;</b>
            </p>
          </div>

          <div ref={board} className={`artboard ${fallen ? "is-fallen" : ""}`}>
            <div className="artboard__frame" aria-hidden />
            <span className="artboard__tag artboard__tag--name" aria-hidden>
              <span className="artboard__hash">#</span> Frame 04 — attention-to-detail
            </span>
            <span className="artboard__tag artboard__tag--size" aria-hidden>
              {size.w} × {size.h}
            </span>
            {[0, 1, 2, 3].map((k) => (
              <span key={k} className="artboard__h" aria-hidden />
            ))}

            <FallingText key={round} onFall={() => setFallen(true)} />

            <span className="artboard__hint" aria-hidden>
              <span className="artboard__hint-a">↳ Hover the frame to stress-test the layout</span>
              <span className="artboard__hint-b">↳ Grab a word and throw it</span>
            </span>
          </div>

          <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between" data-reveal>
            <p className="max-w-xl text-lg md:text-xl text-fg/65 leading-relaxed">
              Every pixel, every interaction, every line of code matters in creating{" "}
              <span className="font-serif italic text-fg">exceptional</span> experiences.
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

          <div className="mt-28 md:mt-40 flex items-center gap-4" data-reveal>
            <span className="mono-label text-fg/45">Non-negotiables</span>
            <span className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
          </div>

          <div className="obs-principles mt-8 grid gap-4 md:grid-cols-3">
            {PRINCIPLES.map((p, i) => (
              <div
                key={p.title}
                className="principle group"
                onPointerMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
                }}
              >
                <span className="principle__fill" aria-hidden />
                <div className="principle__visual">
                  <p.visual />
                </div>
                <div className="relative mt-8 flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-3xl lg:text-4xl tracking-tight">{p.title}</h3>
                  <span className="mono-label text-fg/35">0{i + 1}</span>
                </div>
                <p className="relative mt-3 max-w-[34ch] text-fg/55 transition-colors duration-500 group-hover:text-fg/80">
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
