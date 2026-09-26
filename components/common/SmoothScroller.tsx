import { useEffect } from "react";
import {
  ScrollSmoother,
  ScrollTrigger,
  useGSAP,
  prefersReducedMotion,
} from "@/lib/gsap";
import { useApp } from "../../context/AppContext";

// Must render before any component that creates ScrollTriggers so the
// smoother exists first. Scrolling stays paused until the preloader lifts.
const SmoothScroller = (): null => {
  const { ready, fontsReady } = useApp();

  useGSAP(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: prefersReducedMotion() ? 0 : 1.15,
      smoothTouch: 0.1,
      effects: true,
    });
    smoother.paused(true);

    return () => smoother.kill();
  }, []);

  // Sections build their scenes (layout effects) once fonts load; measure
  // everything again afterwards.
  useEffect(() => {
    if (fontsReady) ScrollTrigger.refresh();
  }, [fontsReady]);

  useEffect(() => {
    if (!ready) return;
    ScrollSmoother.get()?.paused(false);
    ScrollTrigger.refresh();
  }, [ready]);

  return null;
};

export default SmoothScroller;
