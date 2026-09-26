import { useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { useScene } from "../../context/AppContext";
import { STATS } from "../../constants";
import { ChapterLabel, revealOnScroll } from "../common/ui";
import Logo from "../common/Logo";

const BADGE_TEXT = "Full Stack ✦ UI / UX ✦ AI ✦ Mobile ✦ Motion ✦ ";

const Origin = () => {
  const root = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useScene(
    () => {
      // Words light up one by one as you scroll — the paragraph is pinned
      // until the whole thing has been "read".
      const split = SplitText.create(textRef.current, { type: "words", wordsClass: "tword" });
      split.words.forEach((w) => {
        if ((w as HTMLElement).closest(".hl")) w.classList.add("is-hl");
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            pin: ".origin-pin",
            start: "top top",
            end: "+=170%",
            scrub: 0.6,
          },
        })
        .fromTo(
          split.words,
          { opacity: 0.12 },
          { opacity: 1, stagger: 0.1, ease: "power1.out", duration: 0.6 }
        )
        .to(".origin-hint", { opacity: 0, duration: 0.5 }, "<");

      gsap.to(".origin-badge", {
        rotation: 360,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
      });

      // Stats count up once they're on screen.
      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const target = parseFloat(el.dataset.value || "0");
        const decimals = parseInt(el.dataset.decimals || "0", 10);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 2.2,
          ease: "power3.out",
          onUpdate: () => (el.textContent = obj.v.toFixed(decimals)),
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      gsap.from(".stat", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".origin-stats", start: "top 85%" },
      });

      revealOnScroll(root.current);
    },
    root
  );

  return (
    <section id="about" ref={root} className="chapter relative">
      <div className="origin-pin relative flex min-h-[100svh] flex-col justify-center px-pad py-28">
        <div className="origin-glow" aria-hidden />

        <div className="origin-badge" aria-hidden>
          <svg viewBox="0 0 200 200" className="h-full w-full">
            <defs>
              <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
            </defs>
            <text className="origin-badge__text">
              <textPath href="#badge-circle">{BADGE_TEXT}</textPath>
            </text>
          </svg>
          <Logo className="origin-badge__logo" />
        </div>

        <ChapterLabel num="01" title="The Origin" />

        <p ref={textRef} className="origin-text font-display">
          Hi, I&apos;m <span className="hl">Yash</span> — a full stack developer from India who fell
          for the space between <span className="hl">design and code.</span> I build interfaces that
          feel <span className="hl">alive</span>: fast, accessible and{" "}
          <span className="hl">obsessively detailed.</span> Today I craft enterprise products with
          Angular, React and Flutter — and teach them to <span className="hl">think with AI.</span>
        </p>

        <div className="origin-hint mt-10 flex items-center gap-3 mono-label text-fg/40">
          <span className="h-px w-10 bg-fg/30" /> Keep scrolling — the story reads itself
        </div>
      </div>

      <div className="origin-stats px-pad pb-28 md:pb-40">
        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-l border-white/10">
          {STATS.map((s) => (
            <div key={s.label} className="stat border-b border-r border-white/10">
              <div className="font-display stat-value">
                <span className="stat-num" data-value={s.value} data-decimals={s.decimals ?? 0}>
                  0
                </span>
                <span className="text-grad">{s.suffix}</span>
              </div>
              <p className="mt-3 text-sm md:text-base text-fg/55 max-w-[22ch]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Origin;
