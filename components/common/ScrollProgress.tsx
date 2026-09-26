import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const ScrollProgress = () => {
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const setScale = gsap.quickSetter(bar.current, "scaleX");
    ScrollTrigger.create({
      start: 0,
      end: "max",
      refreshPriority: -1,
      onUpdate: (self) => setScale(self.progress),
    });
  });

  return (
    <div className="scroll-progress" aria-hidden>
      <div ref={bar} className="scroll-progress__bar" />
    </div>
  );
};

export default ScrollProgress;
