"use client"; // ensure this is client-side only if using Next.js 13+

import { gsap, Linear } from "gsap";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const NO_MOTION_PREFERENCE_QUERY = "(prefers-reduced-motion: no-preference)";
const isSmallScreen = () => typeof window !== "undefined" && window.innerWidth < 768;

const COLLABORATION_STYLE = {
  SLIDING_TEXT: "opacity-20 text-5xl md:text-7xl font-bold whitespace-nowrap",
  SECTION:
    "w-full relative select-none tall:py-36 py-48 section-container flex flex-col items-center overflow-hidden",
  TITLE: "mt-6 md:mt-8 font-medium text-4xl md:text-5xl text-center z-10",
};

const CollaborationSection = () => {
  const quoteRef: MutableRefObject<HTMLHeadingElement | null> = useRef(null);
  const targetSection: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const leftTextRef = useRef<HTMLParagraphElement | null>(null);
  const rightTextRef = useRef<HTMLParagraphElement | null>(null);

  const [willChange, setWillChange] = useState(false);

  useEffect(() => {
    // only run on client
    if (typeof window === "undefined") return;
    if (!quoteRef.current || !targetSection.current) return;

    // register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // ===== Gradient Text Animation =====
    const strongText = quoteRef.current.querySelector(".text-strong");
    if (strongText) {
      gsap.from(quoteRef.current, { opacity: 0, duration: 1.5 });
      gsap.to(strongText, {
        backgroundPosition: "200% center",
        duration: 3,
        ease: Linear.easeNone,
        repeat: -1,
      });
    }

    // ===== Sliding Text Animation (Marquee) =====
    const distance = isSmallScreen() ? 800 : 400; // adjust for screen size

    if (leftTextRef.current) {
      gsap.to(leftTextRef.current, {
        x: -distance,
        duration: 15,
        ease: Linear.easeNone,
        repeat: -1,
      });
    }

    if (rightTextRef.current) {
      gsap.to(rightTextRef.current, {
        x: distance,
        duration: 15,
        ease: Linear.easeNone,
        repeat: -1,
      });
    }
  }, []);

  const renderSlidingText = (text: string, ref: MutableRefObject<HTMLParagraphElement | null>) => (
    <p ref={ref} className={`${COLLABORATION_STYLE.SLIDING_TEXT}`}>
      {Array(5).fill(text).join("")}
    </p>
  );

  return (
    <section className={COLLABORATION_STYLE.SECTION} ref={targetSection}>
      {renderSlidingText(
        " User Interface Design  User Experience Design ",
        leftTextRef
      )}

      <h1 ref={quoteRef} className={COLLABORATION_STYLE.TITLE}>
        Interested in <span className="font-bold text-strong">Collaboration</span>?
      </h1>

      {renderSlidingText(
        " Frontend Development  Motion Graphics ",
        rightTextRef
      )}

      <div className="w-32 h-1 mx-auto mt-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-500" />
    </section>
  );
};

export default CollaborationSection;
