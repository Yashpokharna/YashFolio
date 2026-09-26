import React, { useEffect, useRef } from "react";
import { gsap, SplitText, isTouch } from "@/lib/gsap";
import { useScene } from "../../context/AppContext";

/* ── Magnetic: children drift toward the pointer, spring back on leave ── */
export const Magnetic = ({
  children,
  strength = 0.35,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || isTouch()) return;
    const xTo = gsap.quickTo(el, "x", { duration: 1, ease: "elastic.out(1, 0.35)" });
    const yTo = gsap.quickTo(el, "y", { duration: 1, ease: "elastic.out(1, 0.35)" });
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, [strength]);

  return (
    <div ref={ref} className={`inline-block will-change-transform ${className}`}>
      {children}
    </div>
  );
};

/* ── Chapter label: "Chapter 02 ——— The Journey" ── */
export const ChapterLabel = ({
  num,
  title,
  dark = false,
  className = "",
}: {
  num: string;
  title: string;
  dark?: boolean;
  className?: string;
}) => (
  <div className={`chapter-label ${dark ? "is-dark" : ""} ${className}`} data-reveal>
    <span className="mono-label">Chapter {num}</span>
    <span className="chapter-label__line" />
    <span className="chapter-label__title font-serif italic">{title}</span>
  </div>
);

/* ── RollText: on hover of the closest link, letters roll up one after
      another to reveal an accent-coloured copy (via text-shadow) ── */
export const RollText = ({ text }: { text: string }) => (
  <span className="roll" aria-label={text}>
    {text.split("").map((c, i) => (
      <span key={i} className="roll__char" style={{ ["--i" as string]: i }} aria-hidden>
        {c === " " ? " " : c}
      </span>
    ))}
  </span>
);

/* ── SplitReveal: masked line/char reveal when scrolled into view ── */
export const SplitReveal = ({
  as: Tag = "div",
  by = "lines",
  className = "",
  delay = 0,
  start = "top 85%",
  children,
}: {
  as?: React.ElementType;
  by?: "lines" | "chars";
  className?: string;
  delay?: number;
  start?: string;
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLElement>(null);

  useScene(
    () => {
      const chars = by === "chars";
      SplitText.create(ref.current, {
        type: chars ? "words,chars" : "lines",
        linesClass: "tline",
        wordsClass: "tword",
        charsClass: "tchar",
        mask: chars ? "chars" : "lines",
        autoSplit: !chars,
        onSplit: (self) =>
          gsap.from(chars ? self.chars : self.lines, {
            yPercent: 115,
            rotate: chars ? 6 : 2.5,
            duration: 1.25,
            ease: "expo.out",
            stagger: chars ? 0.022 : 0.1,
            delay,
            scrollTrigger: {
              trigger: ref.current,
              start,
              toggleActions: "play none none reverse",
            },
          }),
      });
    },
    ref
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
};

/* ── Fade-up every [data-reveal] inside a scope as it enters ── */
export const revealOnScroll = (scope: Element | null) => {
  if (!scope) return;
  scope.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
    gsap.from(el, {
      y: 40,
      opacity: 0,
      duration: 1.1,
      ease: "expo.out",
      scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none reverse" },
    });
  });
};
