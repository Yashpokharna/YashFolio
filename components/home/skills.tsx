import { MENULINKS, SKILLS } from "../../constants";
import Image from "next/image";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { gsap, Linear } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Sparkles, Code2, Palette, Layers } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SkillsSection = () => {
  const targetSection: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const [willChange, setWillChange] = useState(false);

  const categories = [
    {
      title: "Frontend Development",
      icon: Code2,
      skills: SKILLS.frontend,
      color: "from-purple-500 to-pink-500",
      bgGlow: "bg-purple-500/10",
    },
    {
      title: "UI/UX Design",
      icon: Palette,
      skills: SKILLS.userInterface,
      color: "from-blue-500 to-cyan-500",
      bgGlow: "bg-blue-500/10",
    },
    {
      title: "Other Skills",
      icon: Layers,
      skills: SKILLS.other,
      color: "from-pink-500 to-orange-500",
      bgGlow: "bg-pink-500/10",
    },
  ];

  const initRevealAnimation = (
    target: MutableRefObject<HTMLDivElement | null>
  ): ScrollTrigger | null => {
    if (!target.current) return null;

    gsap.set(target.current.querySelectorAll(".seq"), { opacity: 1 });

    // Header animation
    const headerTl = gsap.timeline({ defaults: { ease: "power2.out" } });
    headerTl.from(
      target.current.querySelectorAll(".header-seq"),
      { opacity: 0, y: 50, duration: 0.8, stagger: 0.2 },
      "<"
    );

    ScrollTrigger.create({
      trigger: target.current.querySelector(".skills-wrapper"),
      start: "top 85%",
      animation: headerTl,
      once: true,
    });

    // Animate each category
    categories.forEach((_, index) => {
      const categoryEl = target.current?.querySelector(`.category-${index}`);
      if (!categoryEl) return;

      // Category header animation
      const categoryHeaderTl = gsap.timeline({ defaults: { ease: "power2.out" } });
      categoryHeaderTl
        .from(categoryEl.querySelector(".category-header"), {
          opacity: 0,
          x: -100,
          duration: 0.8,
        })
        .from(
          categoryEl.querySelector(".category-line"),
          {
            scaleX: 0,
            duration: 1,
            ease: "power3.out",
          },
          "<0.3"
        );

      ScrollTrigger.create({
        trigger: categoryEl,
        start: "top 80%",
        animation: categoryHeaderTl,
        once: true,
      });

      // Skills cards animation
      const skillCards = categoryEl.querySelectorAll(".skill-card");
      skillCards.forEach((card, cardIndex) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            once: true,
          },
          opacity: 0,
          scale: 0.8,
          y: 50,
          rotation: -10,
          duration: 0.6,
          delay: cardIndex * 0.08,
          ease: "back.out(1.7)",
        });
      });
    });

    return ScrollTrigger.create({
      trigger: target.current.querySelector(".skills-wrapper"),
      start: "top 85%",
      end: "center center",
      scrub: false,
      onToggle: (self) => setWillChange(self.isActive),
    });
  };

  useEffect(() => {
    const trigger = initRevealAnimation(targetSection);
    return () => {
      if (trigger) trigger.kill();
    };
  }, []);

  return (
    <section
      className="relative w-full py-24 overflow-hidden bg-slate-950"
      id={MENULINKS[2].ref}
      ref={targetSection}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />

      {/* Animated gradient orbs */}
      <div className="absolute rounded-full top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 blur-3xl animate-pulse" />
      <div
        className="absolute rounded-full bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/5 blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      />

      {/* Floating lines */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute w-px h-40 top-20 left-20 bg-gradient-to-b from-transparent via-purple-500 to-transparent animate-float" />
        <div className="absolute w-32 h-px bottom-32 right-1/4 bg-gradient-to-r from-transparent via-pink-500 to-transparent animate-float-horizontal" />
      </div>

      <div className="container relative z-10 px-6 mx-auto max-w-7xl">
        <div className="flex flex-col skills-wrapper">
          {/* Header Section - KEPT SAME */}
          <div className="mb-20 text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 border rounded-full bg-white/5 border-white/10 backdrop-blur-xl header-seq">
              <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
              <span className="text-sm font-bold tracking-widest text-purple-300 uppercase">
                Skills & Expertise
              </span>
            </div>

            <h2 className="mb-6 text-5xl font-black leading-tight text-white md:text-6xl lg:text-7xl header-seq">
              What I{" "}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
                  Master
                </span>
                <div className="absolute left-0 right-0 h-3 bottom-2 bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-lg" />
              </span>
            </h2>

            <p className="max-w-2xl mx-auto text-lg text-slate-400 header-seq md:text-xl">
              Crafting exceptional digital experiences with modern tools and
              technologies
            </p>
          </div>

          {/* NEW REDESIGNED Skills Categories */}
          <div className="space-y-20">
            {categories.map((category, i) => {
              const Icon = category.icon;
              return (
                <div
                  key={i}
                  className={`category-${i} relative transition-all duration-500 ${
                    willChange ? "will-change-opacity" : ""
                  }`}
                >
                  {/* Decorative background glow */}
                  <div
                    className={`absolute -top-10 -left-10 w-64 h-64 ${category.bgGlow} rounded-full blur-3xl opacity-20 pointer-events-none`}
                  />

                  {/* Category Header with new design */}
                  <div className="flex flex-col gap-6 mb-10 category-header">
                    <div className="flex items-center gap-5">
                      <div
                        className={`relative p-4 rounded-2xl bg-gradient-to-br ${category.color} shadow-2xl shadow-purple-500/20`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-black text-white md:text-4xl">
                          {category.title}
                        </h3>
                        <p className="mt-1 text-sm text-slate-400">
                          {category.skills.length} technologies
                        </p>
                      </div>
                    </div>
                    
                    {/* Decorative line */}
                    <div className="relative h-1 overflow-hidden rounded-full category-line bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800">
                      <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-50`} />
                    </div>
                  </div>

                  {/* NEW Skills Grid with cards design */}
                  <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {category.skills.map((skill, skillIndex) => (
                      <div
                        key={skill}
                        className="relative skill-card group"
                      >
                        {/* Card background with hover effect */}
                        <div className="relative h-full p-6 transition-all duration-300 border rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-800/50 backdrop-blur-xl border-slate-700/50 hover:border-slate-600 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10">
                          
                          {/* Glowing effect on hover */}
                          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                          
                          {/* Skill icon */}
                          <div className="relative flex flex-col items-center justify-center h-full space-y-4">
                            <div className="relative">
                              {/* Icon glow effect */}
                              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />
                              
                              <div className="relative p-3 transition-colors duration-300 rounded-xl bg-slate-800/50 group-hover:bg-slate-700/50">
                                <Image
                                  src={`/skills/${skill}.svg`}
                                  alt={skill}
                                  width={48}
                                  height={48}
                                  className="object-contain transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                                />
                              </div>
                            </div>
                            
                            {/* Skill name */}
                            <div className="text-center">
                              <span className="text-sm font-bold transition-colors duration-300 text-slate-300 group-hover:text-white">
                                {skill}
                              </span>
                            </div>
                          </div>

                          {/* Corner accent */}
                          <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${category.color} opacity-10 rounded-bl-3xl rounded-tr-2xl`} />
                        </div>

                        {/* Floating particle effect on hover */}
                        <div className="absolute w-2 h-2 rounded-full opacity-0 -top-1 -right-1 bg-gradient-to-br from-purple-400 to-pink-400 group-hover:opacity-100 group-hover:animate-ping" />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px);
            opacity: 0.6;
          }
        }
        @keyframes float-horizontal {
          0%,
          100% {
            transform: translateX(0);
            opacity: 0.3;
          }
          50% {
            transform: translateX(20px);
            opacity: 0.6;
          }
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

export default SkillsSection;