import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useApp, useScene } from "../../context/AppContext";
import { EMAIL, RESUME, ROLES } from "../../constants";
import { Magnetic, RollText } from "../common/ui";
import AuroraCanvas from "./AuroraCanvas";
import ParticleField from "./ParticleField";
import { Flair, FlairDefs, FlairShape } from "./HeroFlair";

// Playback speed of the name entrance: 1 = original, lower = slower.
const PACE = 0.7;

// How a letter arrives. Stand-in slots derive theirs: a digit flips over
// into its letter like a split-flap board; a shape spins away and the letter
// pops out where it was.
type Entrance = "drop" | "slide-l" | "slide-r" | "blur" | "flip" | "pop";

// Each letter can briefly be played by a stand-in — a shape or a leetspeak
// digit — before the real letter takes over. "keep" stand-ins don't leave:
// they shrink into an accent beside the name.
interface Slot {
  c: string;
  in?: Entrance;
  shape?: FlairShape;
  glyph?: string;
  keep?: { xPercent: number; yPercent: number; scale: number; rotation: number };
}

const entranceOf = (s: Slot): Entrance => (s.glyph ? "flip" : s.shape ? "pop" : s.in || "drop");

// Where each entrance starts from, and how it lands.
const FROM: Record<Entrance, gsap.TweenVars> = {
  drop: { yPercent: -190 },
  "slide-l": { xPercent: -130 },
  "slide-r": { xPercent: 130 },
  blur: { opacity: 0, scale: 1.35, filter: "blur(14px)" },
  flip: { opacity: 0, rotationX: -95, transformPerspective: 600 },
  pop: { scale: 0, rotation: -30 },
};
const TO: Record<Entrance, gsap.TweenVars> = {
  drop: { yPercent: 0, duration: 0.85, ease: "back.out(1.5)" },
  "slide-l": { xPercent: 0, duration: 0.9, ease: "expo.out" },
  "slide-r": { xPercent: 0, duration: 0.9, ease: "expo.out" },
  blur: { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1, ease: "power3.out", clearProps: "filter" },
  flip: { opacity: 1, rotationX: 0, duration: 0.6, ease: "back.out(1.8)", clearProps: "transform" },
  pop: { scale: 1, rotation: 0, duration: 0.65, ease: "back.out(2.2)" },
};

const NAME: Slot[][] = [
  [
    { c: "Y", shape: "spark", keep: { xPercent: -88, yPercent: -72, scale: 0.4, rotation: 0 } },
    { c: "A", glyph: "4" },
    { c: "S", glyph: "5" },
    { c: "H", in: "drop" },
  ],
  [
    { c: "P", in: "slide-l" },
    { c: "O", shape: "ring" },
    { c: "K", shape: "bolt" },
    { c: "H", in: "blur" },
    { c: "A", in: "drop" },
    { c: "R", shape: "squiggle", keep: { xPercent: 62, yPercent: 50, scale: 0.55, rotation: -14 } },
    { c: "N", in: "slide-r" },
    { c: "A", glyph: "4" },
  ],
];

const Hero = () => {
  const root = useRef<HTMLElement>(null);
  const built = useRef(false);
  const { ready, fontsReady } = useApp();

  // Initial states + the scroll-out. The scroll-out throws whole slots, while
  // the entrance animates the letters and stand-ins inside them, so the two
  // never fight over the same element.
  useScene(
    () => {
      gsap.utils.toArray<HTMLElement>(".hn-slot").forEach((slot) => {
        gsap.set(slot.querySelector(".hn-char"), FROM[slot.dataset.in as Entrance]);
      });
      gsap.set(".hn-standin", { autoAlpha: 0 });
      gsap.set(".hero-intro", { y: 40, opacity: 0 });
      gsap.set(".tag-text", { clipPath: "inset(0% 50% 0% 50%)" });
      gsap.set(".tag-brace", { autoAlpha: 0 });
      built.current = true;

      const rand = gsap.utils.random;
      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            pin: ".hero-pin",
            start: "top top",
            end: "+=110%",
            scrub: true,
          },
        })
        .to(
          ".hn-slot",
          {
            yPercent: () => rand(-320, -80),
            xPercent: () => rand(-90, 90),
            rotation: () => rand(-60, 60),
            scale: () => rand(0.5, 1.5),
            opacity: 0,
            ease: "power2.in",
            duration: 0.6,
            stagger: { each: 0.012, from: "center" },
          },
          0
        )
        .to(".hero-out", { y: -70, opacity: 0, filter: "blur(8px)", duration: 0.4, ease: "power1.in" }, 0)
        .to(".hero-out-bottom", { y: 60, opacity: 0, duration: 0.3, ease: "power1.in" }, 0)
        .to(".hero-bg", { scale: 1.3, opacity: 0.15, duration: 1, ease: "none" }, 0)
        .fromTo(
          ".hero-next",
          { opacity: 0, scale: 0.8, filter: "blur(14px)" },
          { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.35, ease: "power2.out" },
          0.42
        );
    },
    root
  );

  // Entrance, GSAP-homepage style: letters arrive one by one, each its own
  // way; some slots are first played by a shape or digit that gets swapped
  // for the real letter.
  useGSAP(
    () => {
      if (!ready || !built.current) return;
      const q = gsap.utils.selector(root);
      const tl = gsap.timeline({ delay: 0.3 });

      tl.from(".hero-bg-inner", { opacity: 0, scale: 1.15, duration: 2.4, ease: "power2.out" }, 0);

      q(".hn-slot").forEach((slot, i) => {
        const char = slot.querySelector(".hn-char");
        const standin = slot.querySelector<HTMLElement>(".hn-standin");
        const entrance = slot.dataset.in as Entrance;
        const at = 0.15 + i * 0.07;
        const arrive = (when: number) => tl.to(char, TO[entrance], when);

        if (!standin) {
          arrive(at + 0.12);
          return;
        }

        const swapAt = at + 0.6 + (i % 3) * 0.14;
        const isGlyph = entrance === "flip";

        if (isGlyph) {
          // Split-flap: the digit flips in, then flips away as the letter flips in.
          tl.fromTo(
            standin,
            { autoAlpha: 1, rotationX: -95, transformPerspective: 600 },
            { rotationX: 0, duration: 0.55, ease: "back.out(1.8)" },
            at
          )
            .to(standin, { rotationX: 95, autoAlpha: 0, duration: 0.24, ease: "power2.in" }, swapAt);
          arrive(swapAt + 0.2);
          return;
        }

        tl.fromTo(
          standin,
          { autoAlpha: 1, scale: 0, rotation: -120 },
          { scale: 1, rotation: 0, duration: 0.55, ease: "back.out(2.2)" },
          at
        );

        const keep = standin.dataset.keep ? JSON.parse(standin.dataset.keep) : null;
        if (keep) {
          // Shrink into an accent beside the name, then idle forever.
          tl.to(standin, { ...keep, duration: 0.8, ease: "expo.inOut" }, swapAt).call(
            () => {
              const inner = standin.querySelector(".hn-flair");
              if (standin.dataset.shape === "spark") {
                gsap.to(inner, { rotation: 360, duration: 10, ease: "none", repeat: -1 });
              } else {
                gsap.to(inner, { y: -6, rotation: 8, duration: 1.8, ease: "sine.inOut", yoyo: true, repeat: -1 });
              }
            },
            undefined,
            swapAt + 0.8
          );
        } else {
          tl.to(
            standin,
            { scale: 0, rotation: 140, autoAlpha: 0, duration: 0.38, ease: "back.in(2)" },
            swapAt
          );
        }
        arrive(swapAt + 0.2);
      });

      // Tagline: braces start together at the centre and part as the text opens.
      const tagText = q(".tag-text")[0];
      const half = tagText ? tagText.getBoundingClientRect().width / 2 : 0;
      tl.addLabel("tag", 1.45)
        .fromTo(".tag-brace", { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, "tag")
        .fromTo(".tag-brace--l", { x: half }, { x: 0, duration: 1.1, ease: "expo.inOut" }, "tag+=0.2")
        .fromTo(".tag-brace--r", { x: -half }, { x: 0, duration: 1.1, ease: "expo.inOut" }, "tag+=0.2")
        .to(".tag-text", { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "expo.inOut" }, "tag+=0.2")
        .to(".hero-intro", { y: 0, opacity: 1, duration: 1.2, ease: "expo.out", stagger: 0.08 }, 1.2);

      tl.timeScale(PACE);
    },
    { dependencies: [ready, fontsReady], scope: root }
  );

  // Role ticker: every few seconds the current role's letters roll up and
  // out while the next role's letters roll in behind them.
  useGSAP(
    () => {
      if (!ready || !fontsReady) return;
      const words = gsap.utils.toArray<HTMLElement>(".hero-role__word");
      const chars = words.map((w) => w.querySelectorAll(".hero-role__char"));
      gsap.set(chars.slice(1), { yPercent: 110 });

      // Step from whichever role is showing to the next, forever. (A
      // repeating timeline would fight itself over the first role on wrap.)
      let current = 0;
      const step = () => {
        const next = (current + 1) % words.length;
        gsap.to(chars[current], { yPercent: -110, duration: 0.45, ease: "power3.in", stagger: 0.015 });
        gsap.fromTo(
          chars[next],
          { yPercent: 110 },
          { yPercent: 0, duration: 0.6, ease: "power3.out", stagger: 0.015, delay: 0.25 }
        );
        current = next;
      };
      gsap.timeline({ repeat: -1, delay: 2.2 }).call(step, undefined, 2.4);
    },
    { dependencies: [ready, fontsReady], scope: root }
  );

  return (
    <section id="home" ref={root} className="chapter relative">
      <FlairDefs />
      <div className="hero-pin relative h-[100svh] w-full overflow-hidden">
        <div className="hero-bg absolute inset-0">
          <div className="hero-bg-inner absolute inset-0">
            <AuroraCanvas />
            <ParticleField />
          </div>
        </div>
        <div className="hero-vignette" aria-hidden />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-pad pb-24 text-center">
          <h1 className="hero-name font-display" aria-label="Yash Pokharna">
            {NAME.map((line, l) => (
              <span key={l} className="hero-line" aria-hidden>
                {line.map((s, i) => (
                  <span key={i} className="hn-slot" data-in={entranceOf(s)}>
                    <span className="hn-clip">
                      <span className="hn-char">{s.c}</span>
                    </span>
                    {(s.shape || s.glyph) && (
                      <span
                        className={`hn-standin ${s.glyph ? "hn-standin--glyph" : ""}`}
                        data-shape={s.shape}
                        data-keep={s.keep ? JSON.stringify(s.keep) : undefined}
                      >
                        {s.shape ? <Flair shape={s.shape} /> : s.glyph}
                      </span>
                    )}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <div className="hero-out">
            <p className="hero-tagline font-serif">
              <span className="tag-brace tag-brace--l" aria-hidden>
                {"{"}
              </span>
              <span className="tag-text">
                The gap between <em className="text-grad">idea</em> and{" "}
                <em className="text-grad">product</em>? That&apos;s me.
              </span>
              <span className="tag-brace tag-brace--r" aria-hidden>
                {"}"}
              </span>
            </p>
          </div>

          <div className="hero-out">
            <p className="hero-intro hero-role" aria-label={ROLES.join(", ")}>
              <span className="hero-role__dot" aria-hidden />
              <span className="hero-role__stack" aria-hidden>
                {ROLES.map((r) => (
                  <span key={r} className="hero-role__word">
                    {r.split("").map((c, i) => (
                      <span key={i} className="hero-role__char">
                        {c === " " ? "\u00A0" : c}
                      </span>
                    ))}
                  </span>
                ))}
              </span>
            </p>
          </div>
        </div>

        <div className="hero-out-bottom absolute inset-x-0 bottom-0 z-10 px-pad pb-6 md:pb-8">
          <div className="flex items-end justify-between gap-6">
            <div className="hero-intro">
              <Magnetic strength={0.2}>
                <a href={`mailto:${EMAIL}`} className="hero-link" data-cursor="plain">
                  <RollText text="Let's talk" />
                  <span className="hero-link__icon">
                    <ArrowUpRight />
                  </span>
                </a>
              </Magnetic>
            </div>

            <div className="hero-intro hero-scroll" aria-hidden>
              <span className="mono-label">Scroll</span>
              <span className="hero-scroll__line">
                <i />
              </span>
            </div>

            <div className="hero-intro">
              <Magnetic strength={0.2}>
                <a href={RESUME} target="_blank" rel="noreferrer" className="hero-link" data-cursor="plain">
                  <RollText text="Résumé" />
                  <span className="hero-link__icon">
                    <ArrowUpRight />
                  </span>
                </a>
              </Magnetic>
            </div>
          </div>
        </div>

        <div className="hero-next pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-pad opacity-0">
          <p className="font-serif text-center leading-[1.05] text-[clamp(40px,6.5vw,110px)]">
            Every story has a <em className="text-grad">beginning</em>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
