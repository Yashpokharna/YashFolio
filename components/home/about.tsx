import { gsap, Linear } from "gsap";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Sparkles, Code2, Palette, Zap } from "lucide-react";
import { MENULINKS, SKILLS } from "../../constants";


// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const quoteRef: MutableRefObject<HTMLDivElement> = useRef(null);
  const targetSection: MutableRefObject<HTMLDivElement> = useRef(null);
  const [willChange, setwillChange] = useState(false);

  const skills = [
    { icon: Code2, label: "Clean Code", color: "from-purple-500 to-blue-500" },
    { icon: Palette, label: "UI/UX Design", color: "from-pink-500 to-purple-500" },
    { icon: Zap, label: "Performance", color: "from-yellow-500 to-orange-500" },
  ];

  const initAboutAnimation = (
    quoteRef: MutableRefObject<HTMLDivElement>,
    targetSection: MutableRefObject<HTMLDivElement>
  ): ScrollTrigger => {
    const timeline = gsap.timeline({
      defaults: { ease: Linear.easeNone, duration: 0.1 },
    });
    timeline
      .fromTo(
        quoteRef.current.querySelector(".about-1"),
        { opacity: 0.2 },
        { opacity: 1 }
      )
      .to(quoteRef.current.querySelector(".about-1"), {
        opacity: 0.2,
        delay: 0.5,
      })
      .fromTo(
        quoteRef.current.querySelector(".about-2"),
        { opacity: 0.2 },
        { opacity: 1 },
        "<"
      )
      .to(quoteRef.current.querySelector(".about-2"), {
        opacity: 0.2,
        delay: 1,
      })
      .fromTo(
        quoteRef.current.querySelector(".about-3"),
        { opacity: 0.2 },
        { opacity: 1 },
        "<"
      )
      .to(quoteRef.current.querySelector(".about-3"), {
        opacity: 0.2,
        delay: 1.5,
      });

    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: targetSection.current,
      start: "center 80%",
      end: "center top",
      scrub: 0,
      animation: timeline,
      onToggle: (self) => setwillChange(self.isActive),
    });
    return scrollTriggerInstance;
  };

  useEffect(() => {
    const aboutScrollTriggerInstance = initAboutAnimation(
      quoteRef,
      targetSection
    );

    return aboutScrollTriggerInstance.kill;
  }, [quoteRef, targetSection]);

  const renderQuotes = (): React.ReactNode => (
    <h2 ref={quoteRef} className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl text-slate-300">
      <span
        className={`about-1 block mb-4 ${
          willChange ? "will-change-opacity" : ""
        }`}
      >
        I am a developer focused on creating{" "}
        <span className="text-white">responsive</span> and{" "}
        <span className="text-white">user-friendly</span> web experiences.
      </span>
      <span
        className={`about-2 block mb-4 ${
          willChange ? "will-change-opacity" : ""
        }`}
      >
        I work with modern tools like{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          React, Next.js, and Tailwind CSS
        </span>.
      </span>
      <span
        className={`about-3 block ${
          willChange ? "will-change-opacity" : ""
        }`}
      >
        I enjoy turning complex ideas into{" "}
        <span className="text-white">simple, elegant interfaces</span>.
      </span>
    </h2>
  );

  return (
    <section
      className="relative w-full py-20 overflow-hidden select-none bg-slate-950"
      id={MENULINKS[2].ref} ref={targetSection}
    >
      {/* Subtle background */}
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />

      <div className="container relative z-10 max-w-6xl px-6 mx-auto">
        
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 border rounded-full bg-white/5 border-white/10 backdrop-blur-xl">
            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
            <span className="text-sm font-bold tracking-widest text-purple-300 uppercase">About Me</span>
          </div>
          
          <h1 className="mb-6 text-6xl font-black leading-tight text-white md:text-7xl lg:text-8xl">
            Who{' '}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
                I Am
              </span>
              <div className="absolute left-0 right-0 h-3 bottom-2 bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-lg" />
            </span>
          </h1>
        </div>

        {/* Animated Quote Section */}
        <div className="mb-16">
          {renderQuotes()}
        </div>

        {/* Skills Grid */}
        <div className="grid gap-4 md:grid-cols-3">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div
                key={index}
                className="relative p-6 overflow-hidden transition-all duration-500 group rounded-2xl bg-slate-900/30 hover:bg-slate-900/50 hover:scale-105"
              >
                {/* Gradient background */}
                <div 
                  className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${skill.color}`}
                />
                
                <div className="relative flex flex-col items-center text-center">
                  <div className={`p-4 mb-4 rounded-xl bg-gradient-to-br ${skill.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{skill.label}</h3>
                </div>

                {/* Glow effect */}
                <div 
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl bg-gradient-to-br ${skill.color}`}
                  style={{ transform: 'scale(1.1)' }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;