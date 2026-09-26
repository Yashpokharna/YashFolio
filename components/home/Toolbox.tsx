import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useScene } from "../../context/AppContext";
import { MARQUEE_ROWS, SKILL_GROUPS } from "../../constants";
import { ChapterLabel, SplitReveal, revealOnScroll } from "../common/ui";

// Infinite strip whose speed and direction follow scroll velocity.
const VelocityMarquee = ({
  words,
  dir,
  variant,
}: {
  words: string[];
  dir: 1 | -1;
  variant: "outline" | "fill";
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useScene(
    () => {
      const loop = gsap.to(".mq-strip", { xPercent: -50, repeat: -1, duration: 34, ease: "none" });
      // Start deep into the repeat so it can run backwards indefinitely.
      loop.totalTime(loop.duration() * 500);
      loop.timeScale(dir);

      const setSkew = gsap.quickSetter(".mq-strip", "skewX", "deg");
      const clampSkew = gsap.utils.clamp(-10, 10);
      const proxy = { skew: 0 };

      ScrollTrigger.create({
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          const boost = gsap.utils.clamp(1, 7, 1 + Math.abs(velocity) / 350);
          const heading = dir * self.direction;
          gsap.killTweensOf(loop);
          gsap
            .timeline()
            .to(loop, { timeScale: heading * boost, duration: 0.15 })
            .to(loop, { timeScale: heading, duration: 1.4, ease: "power2.out" });

          const skew = clampSkew(velocity / -220);
          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            gsap.to(proxy, {
              skew: 0,
              duration: 0.9,
              ease: "power3",
              overwrite: true,
              onUpdate: () => setSkew(proxy.skew),
            });
          }
        },
      });
    },
    ref
  );

  const items = [...words, ...words];
  return (
    <div ref={ref} className={`marquee marquee--${variant}`} aria-hidden>
      <div className="mq-strip">
        {items.map((w, i) => (
          <span key={i} className="mq-item font-display">
            {w}
            <span className="mq-star">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};

const Toolbox = () => {
  const root = useRef<HTMLElement>(null);

  useScene(
    () => {
      gsap.utils.toArray<HTMLElement>(".tool-row").forEach((row) => {
        gsap
          .timeline({ scrollTrigger: { trigger: row, start: "top 90%" } })
          .from(row, { y: 50, opacity: 0, duration: 1, ease: "expo.out" })
          .from(row.querySelectorAll(".tool-pill"), {
            y: 20,
            opacity: 0,
            stagger: 0.05,
            duration: 0.7,
            ease: "back.out(2)",
          }, 0.2);
      });
      gsap.from(".tool-line", {
        scaleX: 0,
        duration: 1.4,
        ease: "expo.inOut",
        scrollTrigger: { trigger: ".toolbox-list", start: "top 90%" },
      });
      revealOnScroll(root.current);
    },
    root
  );

  return (
    <section id="skills" ref={root} className="chapter relative overflow-hidden py-28 md:py-40">
      <div className="flex flex-col justify-between gap-8 px-pad md:flex-row md:items-end">
        <div>
          <ChapterLabel num="04" title="The Toolbox" />
          <SplitReveal as="h2" className="toolbox-title font-display mt-6">
            Tools of the <span className="font-serif italic font-normal text-grad">trade.</span>
          </SplitReveal>
        </div>
        <p className="max-w-sm text-lg text-fg/60 leading-relaxed" data-reveal>
          The kit I reach for when a story needs telling — from the first pixel to production.
        </p>
      </div>

      <div className="mt-20 space-y-1 md:mt-28 md:space-y-3">
        <VelocityMarquee words={MARQUEE_ROWS[0]} dir={-1} variant="outline" />
        <VelocityMarquee words={MARQUEE_ROWS[1]} dir={1} variant="fill" />
      </div>

      <div className="toolbox-list relative mt-20 px-pad md:mt-32">
        <div className="tool-line h-px origin-left bg-white/15" />
        {SKILL_GROUPS.map((g, i) => (
          <div key={g.name} className="tool-row group">
            <span className="tool-row__fill" aria-hidden />
            <span className="mono-label relative text-fg/40 group-hover:text-ink/60">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="relative font-display tool-row__name">{g.name}</h3>
            <p className="relative hidden font-serif italic text-xl text-fg/45 lg:block group-hover:text-ink/70">
              {g.blurb}
            </p>
            <ul className="relative flex flex-wrap gap-2 md:justify-end">
              {g.items.map((it) => (
                <li key={it.label} className="tool-pill">
                  {it.icon ? (
                    <img src={it.icon} alt="" loading="lazy" decoding="async" className="h-4 w-4 object-contain" />
                  ) : (
                    <span className="tool-pill__dot" />
                  )}
                  {it.label}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Toolbox;
