import { gsap, Linear } from "gsap";
import { useRef, useState } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { isSmallScreen, NO_MOTION_PREFERENCE_QUERY } from "pages";

// Register plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

const COLLABORATION_STYLE = {
  SLIDING_TEXT: "opacity-20 text-5xl md:text-7xl font-bold whitespace-nowrap",
  SECTION: "w-full relative select-none tall:py-36 py-48 section-container flex flex-col overflow-hidden",
  TITLE: "mt-6 md:mt-8 font-medium text-4xl md:text-5xl text-center",
};

const CollaborationSection = () => {
  const targetSection = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLHeadingElement>(null);
  const [willChange, setwillChange] = useState(false);

  /**
   * useGSAP replaces useEffect. 
   * It automatically handles cleanup (killing animations) 
   * and scoping (finding elements only inside targetSection).
   */
  useGSAP(
    () => {
      // 1. Gradient and Fade-in Animation
      const textTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: targetSection.current,
          start: "center bottom",
          end: "center center",
          scrub: 0,
          onToggle: (self) => setwillChange(self.isActive),
        },
      });

      textTimeline
        .from(quoteRef.current, { 
            opacity: 0, 
            duration: 2, 
            ease: Linear.easeNone 
        })
        .to(".text-strong", {
          backgroundPositionX: "100%",
          duration: 1,
          ease: Linear.easeNone,
        });

      // 2. Sliding Text Animation (Media Query Check)
      const { matches } = window.matchMedia(NO_MOTION_PREFERENCE_QUERY);

      if (matches) {
        const slidingTl = gsap.timeline({
          scrollTrigger: {
            trigger: targetSection.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0,
          },
        });

        slidingTl
          .to(".ui-left", {
            xPercent: isSmallScreen() ? -500 : -150,
            ease: Linear.easeNone,
          })
          .from(
            ".ui-right",
            { 
              xPercent: isSmallScreen() ? -500 : -150, 
              ease: Linear.easeNone 
            },
            "<" // Starts at the same time as the previous tween
          );
      }

      // 3. Crucial: Refresh ScrollTrigger after initializing
      // This forces GSAP to recalculate positions after the page is fully loaded.
      ScrollTrigger.refresh();
    },
    { scope: targetSection, dependencies: [] }
  );

  const renderSlidingText = (text: string, layoutClasses: string) => (
    <p className={`${layoutClasses} ${COLLABORATION_STYLE.SLIDING_TEXT}`}>
      {Array(5)
        .fill(text)
        .join("")}
    </p>
  );

  return (
    <section className={COLLABORATION_STYLE.SECTION} ref={targetSection}>
      {renderSlidingText(
        " User Interface Design  User Experience Design ",
        "ui-left"
      )}

      <h1
        ref={quoteRef}
        className={`${COLLABORATION_STYLE.TITLE} ${
          willChange ? "will-change-opacity" : ""
        }`}
      >
        Interested in <span className="font-bold text-strong">Collaboration</span>
        ?
      </h1>

      {renderSlidingText(
        " Frontend Development  Motion Graphics ",
        "mt-6 md:mt-8 ui-right"
      )}
      
      <div className="w-32 h-1 mx-auto mt-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-500" />
    </section>
  );
};

export default CollaborationSection;