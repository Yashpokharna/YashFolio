import { useEffect, useRef, useState } from "react";

const COLLABORATION_STYLE = {
  SLIDING_TEXT: "opacity-20 text-5xl md:text-7xl font-bold whitespace-nowrap",
  SECTION:
    "w-full relative select-none tall:py-36 py-48 section-container flex flex-col overflow-hidden bg-gradient-to-b from-transparent via-purple-950/10 to-transparent",
  TITLE: "mt-6 md:mt-8 font-medium text-4xl md:text-5xl text-center",
};

const CollaborationSection = () => {
  const quoteRef = useRef(null);
  const targetSection = useRef(null);
  const [willChange, setWillChange] = useState(false);

  useEffect(() => {
    // Register GSAP plugins
    if (typeof window !== 'undefined') {
      const gsap = require('gsap').gsap || require('gsap').default || require('gsap');
      const ScrollTrigger = require('gsap/dist/ScrollTrigger').ScrollTrigger || require('gsap/dist/ScrollTrigger').default;
      
      if (gsap.registerPlugin) {
        gsap.registerPlugin(ScrollTrigger);
      }

      const isSmallScreen = () => window.innerWidth < 768;

      // Text gradient animation
      const timeline = gsap.timeline({ defaults: { ease: 'none' } });
      timeline
        .from(quoteRef.current, { opacity: 0, duration: 2 })
        .to(quoteRef.current.querySelector(".text-strong"), {
          backgroundPositionX: "100%",
          duration: 1,
        });

      const textBgAnimation = ScrollTrigger.create({
        trigger: targetSection.current,
        start: "center bottom",
        end: "center center",
        scrub: 0,
        animation: timeline,
        onToggle: (self) => setWillChange(self.isActive),
      });

      // Sliding text animation
      let slidingAnimation;
      const { matches } = window.matchMedia('(prefers-reduced-motion: no-preference)');

      if (matches) {
        const slidingTl = gsap.timeline({ defaults: { ease: 'none' } });

        slidingTl
          .to(targetSection.current.querySelector(".ui-left"), {
            xPercent: isSmallScreen() ? -500 : -150,
          })
          .from(
            targetSection.current.querySelector(".ui-right"),
            { xPercent: isSmallScreen() ? -500 : -150 },
            "<"
          );

        slidingAnimation = ScrollTrigger.create({
          trigger: targetSection.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0,
          animation: slidingTl,
        });
      }

      return () => {
        textBgAnimation.kill();
        slidingAnimation?.kill();
      };
    }
  }, []);

  const renderSlidingText = (text, layoutClasses) => (
    <div className={`${layoutClasses}`}>
      <p className={`${COLLABORATION_STYLE.SLIDING_TEXT}`}>
        {Array(5)
          .fill(text)
          .reduce((str, el) => str.concat(el), "")}
      </p>
    </div>
  );

  const renderTitle = () => (
    <div className="relative">
      {/* Decorative glow effect behind text */}
      <div className="absolute inset-0 blur-3xl opacity-30 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600" />
      
      <h1
        ref={quoteRef}
        className={`${COLLABORATION_STYLE.TITLE} relative z-10 ${
          willChange ? "will-change-opacity" : ""
        }`}
      >
        Interested in{" "}
        <span className="font-bold text-strong bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto]" style={{ backgroundPositionX: "0%" }}>
          Collaboration
        </span>
        ?
      </h1>

      {/* Floating particles */}
      <div className="absolute w-2 h-2 bg-purple-400 rounded-full top-1/2 left-1/4 animate-float opacity-60" />
      <div className="absolute w-3 h-3 bg-pink-400 rounded-full top-1/3 right-1/3 animate-float-delay opacity-40" />
    </div>
  );

  return (
    <section className={COLLABORATION_STYLE.SECTION} ref={targetSection}>
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-64 h-64 rounded-full top-1/3 left-1/4 bg-purple-600/20 blur-3xl animate-pulse" />
        <div className="absolute rounded-full bottom-1/3 right-1/4 w-80 h-80 bg-pink-600/20 blur-3xl animate-pulse-delay" />
      </div>

      {renderSlidingText(
        " User Interface Design  User Experience Design ",
        "ui-left relative z-10"
      )}

      {renderTitle()}

      {renderSlidingText(
        " Frontend Development  Motion Graphics ",
        "mt-6 md:mt-8 ui-right relative z-10"
      )}

      {/* Enhanced decorative line with animated gradient */}
      <div className="relative z-10 flex items-center justify-center gap-3 mt-12">
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
        <div className="relative">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 animate-pulse" />
          <div className="absolute inset-0 w-3 h-3 rounded-full opacity-75 bg-gradient-to-r from-purple-600 to-pink-500 animate-ping" />
        </div>
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent" />
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-delay {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-15px) translateX(10px); }
        }
        
        @keyframes pulse-delay {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delay {
          animation: float-delay 4s ease-in-out infinite;
        }
        
        .animate-pulse-delay {
          animation: pulse-delay 3s ease-in-out infinite;
          animation-delay: 1.5s;
        }
      `}</style>
    </section>
  );
};

export default CollaborationSection;