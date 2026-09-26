import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useApp } from "../../context/AppContext";

const GREETINGS = ["Hello", "Bonjour", "Hola", "Ciao", "नमस्ते"];
const COLUMNS = 5;
const FIRST_IN = 0.2; // when the first greeting starts rolling in
const STEP = 0.55; // time each greeting owns the slot
const ROLL = 0.45; // duration of one roll (out + in together)
const HOLD_LAST = 1; // नमस्ते holds while its gradient sweep plays

const Preloader = () => {
  const root = useRef<HTMLDivElement>(null);
  const { setReady } = useApp();
  const [gone, setGone] = useState(false);

  useGSAP(
    () => {
      if (!root.current) return;
      const q = gsap.utils.selector(root);
      const words = q(".pl-word");
      const last = words.length - 1;
      const lastAt = FIRST_IN + last * STEP;
      const exitAt = lastAt + ROLL + HOLD_LAST;

      const tl = gsap.timeline({ onComplete: () => setGone(true) });

      // Ticker: the outgoing greeting and the incoming one roll up together,
      // so the slot is never empty and they never overlap.
      tl.fromTo(
        words[0],
        { yPercent: 120, autoAlpha: 1 },
        { yPercent: 0, duration: ROLL, ease: "power3.out" },
        FIRST_IN
      );
      for (let i = 1; i <= last; i++) {
        const at = FIRST_IN + i * STEP;
        tl.to(words[i - 1], { yPercent: -120, duration: ROLL, ease: "power3.inOut" }, at).fromTo(
          words[i],
          { yPercent: 120, autoAlpha: 1 },
          { yPercent: 0, duration: ROLL, ease: "power3.inOut" },
          at
        );
      }

      // Finale: a cyan → blue band of light sweeps across नमस्ते once it lands.
      tl.fromTo(
        words[last],
        { backgroundPosition: "100% 0" },
        { backgroundPosition: "0% 0", duration: 1.1, ease: "power2.inOut" },
        lastAt + ROLL - 0.1
      );

      // Exit: the greeting rolls away first, then the curtain lifts.
      tl.addLabel("exit", exitAt)
        .to(words[last], { yPercent: -120, duration: 0.5, ease: "power3.in" }, "exit")
        .set(q(".pl-stage"), { autoAlpha: 0 }, "exit+=0.5")
        .to(
          q(".pl-col"),
          { yPercent: -100, duration: 1, ease: "expo.inOut", stagger: 0.06 },
          "exit+=0.45"
        )
        .call(() => setReady(true), undefined, "exit+=0.6");

      if (prefersReducedMotion()) tl.timeScale(2.5);
    },
    { scope: root }
  );

  if (gone) return null;

  return (
    <div ref={root} className="preloader" aria-hidden>
      <div className="pl-cols">
        {Array.from({ length: COLUMNS }).map((_, i) => (
          <div key={i} className="pl-col" />
        ))}
      </div>

      <div className="pl-stage">
        <div className="pl-words font-display">
          {GREETINGS.map((g, i) =>
            i < GREETINGS.length - 1 ? (
              <span key={g} className="pl-word">
                {g}
                <span className="text-grad">.</span>
              </span>
            ) : (
              <span key={g} className="pl-word pl-word--finale">
                {g}.
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Preloader;
