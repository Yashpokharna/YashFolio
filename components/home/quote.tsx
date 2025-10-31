import { gsap, Linear } from "gsap";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Quote, Sparkles } from "lucide-react";

const QuoteSection = () => {
  const quoteRef: MutableRefObject<HTMLDivElement> = useRef(null);
  const targetSection: MutableRefObject<HTMLDivElement> = useRef(null);

  const [willChange, setwillChange] = useState(false);

  const initQuoteAnimation = (
    quoteRef: MutableRefObject<HTMLDivElement>,
    targetSection: MutableRefObject<HTMLDivElement>
  ): ScrollTrigger => {
    const timeline = gsap.timeline({ defaults: { ease: Linear.easeNone } });
    timeline
      .from(quoteRef.current, { opacity: 0, duration: 2 })
      .to(quoteRef.current.querySelector(".text-strong"), {
        backgroundPositionX: "100%",
        duration: 1,
      });

    return ScrollTrigger.create({
      trigger: targetSection.current,
      start: "center bottom",
      end: "center center",
      scrub: 0,
      animation: timeline,
      onToggle: (self) => setwillChange(self.isActive),
    });
  };

  useEffect(() => {
    const quoteAnimationRef = initQuoteAnimation(quoteRef, targetSection);

    return quoteAnimationRef.kill;
  }, [quoteRef, targetSection]);

  return (
    <section className="relative w-full overflow-hidden select-none bg-slate-950" ref={targetSection}>
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/30 to-slate-950" />
      
      {/* Centered gradient orb */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl" />
      
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute w-px h-32 top-20 left-1/4 bg-gradient-to-b from-transparent via-purple-500 to-transparent animate-float" />
        <div className="absolute w-px h-32 bottom-20 right-1/4 bg-gradient-to-b from-transparent via-pink-500 to-transparent animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute w-24 h-px top-1/2 left-20 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-float-horizontal" />
        <div className="absolute w-24 h-px top-1/2 right-20 bg-gradient-to-r from-transparent via-pink-500 to-transparent animate-float-horizontal" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative z-10 py-32 tall:py-48 section-container">
        <div className="flex flex-col items-center max-w-5xl px-6 mx-auto">
          
          {/* Decorative quote icon */}
          <div className="mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl" />
              <div className="relative p-4 rounded-2xl bg-slate-900/40 backdrop-blur-sm">
                <Quote className="w-8 h-8 text-purple-400" />
              </div>
            </div>
          </div>

          {/* Main Quote */}
          <h1
            ref={quoteRef}
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-center leading-tight text-white ${
              willChange ? "will-change-opacity" : ""
            }`}
          >
            I have a{" "}
            <span className="relative inline-block">
              <span className="text-transparent text-strong bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400" style={{ backgroundSize: "200% 200%" }}>
                strong
              </span>
              <div className="absolute left-0 right-0 h-3 bottom-1 bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-lg" />
            </span>{" "}
            obsession for attention to detail.
          </h1>

          {/* Subtitle/Description */}
          <p className="max-w-2xl mt-8 text-lg text-center md:text-xl text-slate-400">
            Every pixel, every interaction, every line of code matters in creating exceptional experiences.
          </p>

          {/* Decorative sparkles */}
          <div className="flex items-center gap-3 mt-12">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); opacity: 0.3; }
          50% { transform: translateY(-20px); opacity: 0.6; }
        }
        
        @keyframes float-horizontal {
          0%, 100% { transform: translateX(0); opacity: 0.3; }
          50% { transform: translateX(20px); opacity: 0.6; }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-horizontal {
          animation: float-horizontal 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default QuoteSection;