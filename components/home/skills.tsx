import { MENULINKS, SKILLS } from "../../constants";
import Image from "next/image";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Sparkles, Wrench } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SkillsSection = () => {
  const targetSection: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const skillsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initRevealAnimation = () => {
      // Animate badge
      if (badgeRef.current) {
        gsap.fromTo(
          badgeRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: badgeRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // Animate header words
      if (headerRef.current) {
        const words = headerRef.current.querySelectorAll(".header-word");
        gsap.fromTo(
          words,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Animate description
      if (descRef.current) {
        gsap.fromTo(
          descRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.3,
            scrollTrigger: {
              trigger: descRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // Animate skill cards
      if (skillsContainerRef.current) {
        const cards = skillsContainerRef.current.querySelectorAll(".skill-card");
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.05,
            scrollTrigger: {
              trigger: skillsContainerRef.current,
              start: "top 80%",
            },
          }
        );
      }
    };

    const timeoutId = setTimeout(() => {
      initRevealAnimation();
    }, 200);

    return () => {
      clearTimeout(timeoutId);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  // Combine all skills into one array
  const allSkills = [
    ...SKILLS.frontend,
  ];

  return (
    <section
      className="relative w-full py-20 overflow-hidden bg-slate-950"
      id={MENULINKS[3].ref}
      ref={targetSection}
    >
      {/* Subtle background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="container relative z-10 px-6 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-5 py-2 mb-6 border rounded-full opacity-0 bg-white/5 border-white/10 backdrop-blur-xl"
          >
            <Wrench className="w-4 h-4 text-purple-400 animate-pulse" />
            <span className="text-sm font-bold tracking-widest text-purple-300 uppercase">
              Skills & Technologies
            </span>
          </div>

          <h2
            ref={headerRef}
            className="mb-6 text-6xl font-black leading-tight text-white md:text-7xl lg:text-8xl"
          >
            <span className="inline-block opacity-0 header-word">My</span>{" "}
            <span className="relative inline-block">
              <span className="inline-block text-transparent opacity-0 header-word bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
                Toolbox
              </span>
            </span>
          </h2>

          <p
            ref={descRef}
            className="max-w-2xl mx-auto text-lg leading-relaxed opacity-0 text-slate-400 md:text-xl"
          >
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        {/* Skills Grid - Single unified grid */}
        <div
          ref={skillsContainerRef}
          className="grid max-w-5xl grid-cols-3 gap-4 mx-auto sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6"
        >
          {allSkills.map((skill) => (
            <div
              key={skill}
              className="opacity-0 skill-card group"
            >
              <div className="relative p-6 transition-all duration-300 rounded-2xl bg-slate-900/40 backdrop-blur-sm hover:bg-slate-900/60 hover:scale-105">
                {/* Icon */}
                <div className="flex flex-col items-center gap-3">
                  <div className="relative w-12 h-12">
                    <Image
                      src={`/skills/${skill}.svg`}
                      alt={skill}
                      width={48}
                      height={48}
                      className="object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Label */}
                  <p className="text-xs font-semibold text-center transition-colors duration-300 text-slate-400 group-hover:text-white">
                    {skill}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;