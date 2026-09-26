import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";

// Register every plugin once, client-side only. All components import GSAP
// from here so there is exactly one ScrollTrigger instance in the bundle.
if (typeof window !== "undefined") {
  gsap.registerPlugin(
    ScrollTrigger,
    ScrollSmoother,
    SplitText,
    ScrambleTextPlugin,
    useGSAP
  );
  gsap.config({ nullTargetWarn: false });
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (process.env.NODE_ENV !== "production") {
    Object.assign(window, { gsap, ScrollTrigger, ScrollSmoother });
  }
}

export const isTouch = () =>
  typeof window !== "undefined" &&
  !window.matchMedia("(pointer: fine)").matches;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const scrollToId = (id: string) => {
  const smoother = ScrollSmoother.get();
  const el = document.getElementById(id);
  if (!el) return;
  if (smoother) smoother.scrollTo(el, true, "top top");
  else el.scrollIntoView({ behavior: "smooth" });
};

export { gsap, ScrollTrigger, ScrollSmoother, SplitText, useGSAP };
