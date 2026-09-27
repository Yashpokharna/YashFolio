import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useScene } from "../../context/AppContext";
import { JOURNEY } from "../../constants";
import { ChapterLabel, revealOnScroll } from "../common/ui";

const N = JOURNEY.length;
const DIGITS = JOURNEY[0].year.length;

// For each digit position: the digit at every milestone, or null when that
// position never changes (so it renders static instead of as a rolling column).
const columns = Array.from({ length: DIGITS }, (_, k) => {
  const col = JOURNEY.map((m) => m.year[k]);
  return col.every((d) => d === col[0]) ? null : col;
});

const Journey = () => {
  const root = useRef<HTMLElement>(null);

  useScene(
    () => {
      const q = gsap.utils.selector(root);
      const cards = q(".journey-card");
      const ticks = q(".journey-tick");
      const rolling = q(".jy-col, .journey-roll");

      gsap.set(cards.slice(1), { yPercent: 140, rotation: 6, opacity: 0 });

      const setTick = (idx: number) =>
        ticks.forEach((t, i) => t.classList.toggle("is-active", i <= idx));
      setTick(0);

      const tl = gsap.timeline({
        defaults: { duration: 1, ease: "power2.inOut" },
        scrollTrigger: {
          trigger: root.current,
          pin: ".journey-pin",
          start: "top top",
          end: () => "+=" + (N - 1) * window.innerHeight * 0.95,
          scrub: 0.8,
          invalidateOnRefresh: true,
          snap: {
            snapTo: 1 / (N - 1),
            duration: { min: 0.25, max: 0.7 },
            delay: 0.08,
            ease: "power2.inOut",
          },
          onUpdate: (self) => setTick(Math.round(self.progress * (N - 1))),
        },
      });

      for (let i = 1; i < N; i++) {
        const at = i - 1;
        tl.to(cards[i], { yPercent: 0, rotation: 0, opacity: 1 }, at);
        // Earlier cards recede into a deck behind the new one.
        for (let j = 0; j < i; j++) {
          const depth = i - j;
          tl.to(
            cards[j],
            {
              // Receding cards peek out above the new one; less on phones,
              // where vertical room is tight.
              y: () => -depth * (window.innerWidth < 768 ? 12 : 22),
              scale: 1 - depth * 0.055,
              opacity: depth > 2 ? 0 : 1 - depth * 0.3,
            },
            at
          );
        }
        tl.to(rolling, { yPercent: (-100 * i) / N }, at);
      }
      tl.fromTo(q(".journey-fill"), { scaleX: 0 }, { scaleX: 1, ease: "none", duration: N - 1 }, 0);

      revealOnScroll(root.current);
    },
    root
  );

  return (
    <section id="journey" ref={root} className="chapter relative">
      <div className="journey-pin relative flex h-[100svh] flex-col overflow-hidden px-pad pt-20 pb-5 md:pt-28 md:pb-8">
        <div className="journey-grid-bg" aria-hidden />

        <div className="relative flex items-end justify-between gap-6">
          <div>
            <ChapterLabel num="02" title="The Journey" />
            <h2 className="journey-heading font-display mt-4 hidden sm:block" data-reveal>
              From first line to <span className="font-serif italic font-normal text-grad">first launch.</span>
            </h2>
          </div>
          <p className="mono-label hidden md:block text-right text-fg/40" data-reveal>
            Scroll to time-travel ↓
          </p>
        </div>

        <div className="relative grid min-h-0 flex-1 grid-rows-[auto_1fr] items-center gap-3 py-3 md:grid-cols-[1fr_1.15fr] md:grid-rows-1 md:gap-12 md:py-4">
          <div className="journey-left">
            <div className="journey-year font-display" aria-hidden>
              {columns.map((col, k) =>
                col ? (
                  <span key={k} className="jy-mask">
                    <span className="jy-col">
                      {col.map((d, i) => (
                        <span key={i}>{d}</span>
                      ))}
                    </span>
                  </span>
                ) : (
                  <span key={k} className="jy-static">
                    {JOURNEY[0].year[k]}
                  </span>
                )
              )}
            </div>
            <div className="journey-meta">
              <span className="jr-mask">
                <span className="journey-roll">
                  {JOURNEY.map((m) => (
                    <span key={m.year} className="font-serif italic">
                      {m.phase}
                    </span>
                  ))}
                </span>
              </span>
            </div>
          </div>

          <div className="journey-stack">
            {JOURNEY.map((m, i) => (
              <article key={m.year} className="journey-card" style={{ zIndex: i + 1 }}>
                <div className="journey-card__glow" aria-hidden />
                <span className="journey-card__num font-display" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-1.5 mono-label text-fg/45 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <span className="whitespace-nowrap">
                    {m.year} — {String(i + 1).padStart(2, "0")}/{String(N).padStart(2, "0")}
                  </span>
                  <span className="sm:text-right">{m.place}</span>
                </div>
                <div className="mt-5 flex flex-1 flex-col sm:mt-auto sm:block sm:flex-none">
                  <h3 className="font-display journey-card__title">{m.title}</h3>
                  <p className="mt-3 max-w-[48ch] text-[14px] leading-relaxed text-fg/65 sm:mt-4 sm:text-[15px] md:text-[17px]">
                    {m.body}
                  </p>
                  <ul className="mt-auto flex flex-wrap gap-2 pt-4 sm:mt-5 sm:pt-0">
                    {m.tags.map((t) => (
                      <li key={t} className="tag">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative h-px bg-white/10">
            <div className="journey-fill absolute inset-0 origin-left" />
          </div>
          <div className="mt-3 flex justify-between">
            {JOURNEY.map((m) => (
              <span key={m.year} className="journey-tick mono-label">
                {m.year}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;
