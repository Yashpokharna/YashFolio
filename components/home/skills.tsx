import { MENULINKS, SKILLS } from "../../constants";
import Image from "next/image";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
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

    const headerTl = gsap.timeline({ defaults: { ease: "power2.out" } });

    headerTl.from(
      target.current.querySelector(".header-badge"),
      { opacity: 0, scale: 0.8, duration: 1, ease: "back.out(1.7)" }
    );

    headerTl.from(
      target.current.querySelectorAll(".header-word"),
      { opacity: 0, y: 50, rotationX: -90, duration: 1, stagger: 0.15, ease: "back.out(1.5)" },
      "-=0.5"
    );

    headerTl.from(
      target.current.querySelector(".header-description"),
      { opacity: 0, y: 30, duration: 1 },
      "-=0.3"
    );

    ScrollTrigger.create({
      trigger: target.current.querySelector(".skills-wrapper"),
      start: "top 85%",
      animation: headerTl,
      once: true,
    });

    categories.forEach((_, index) => {
      const categoryEl = target.current?.querySelector(`.category-${index}`);
      if (!categoryEl) return;

      const categoryHeaderTl = gsap.timeline({ defaults: { ease: "power2.out" } });
      categoryHeaderTl
        .from(categoryEl.querySelector(".category-header"), {
          opacity: 0,
          x: -100,
          duration: 1.2,
        })
        .from(
          categoryEl.querySelector(".category-description"),
          {
            opacity: 0,
            y: 20,
            duration: 1,
          },
          "<0.4"
        );

      ScrollTrigger.create({
        trigger: categoryEl,
        start: "top 80%",
        animation: categoryHeaderTl,
        once: true,
      });

      const skillCards = categoryEl.querySelectorAll(".skill-card");
      const animationVariants = [
        { opacity: 0, x: -120, rotation: -15, duration: 1.4, ease: "power3.out" },
        { opacity: 0, y: 100, scale: 0.8, duration: 1.5, ease: "power2.out" },
        { opacity: 0, x: 120, rotation: 15, duration: 1.4, ease: "power3.out" },
        { opacity: 0, scale: 0.3, duration: 1.6, ease: "power2.out" },
        { opacity: 0, x: -80, y: 80, duration: 1.3, ease: "power2.out" },
        { opacity: 0, x: 80, y: 80, duration: 1.3, ease: "power2.out" },
        { opacity: 0, rotation: -90, scale: 0.5, duration: 1.5, ease: "power3.out" },
        { opacity: 0, y: -100, duration: 1.4, ease: "bounce.out" },
        { opacity: 0, scale: 0.4, rotation: 20, duration: 1.5, ease: "back.out(1.2)" },
        { opacity: 0, filter: "blur(20px)", scale: 1.2, duration: 1.6, ease: "power2.out" },
      ];

      skillCards.forEach((card, cardIndex) => {
        const animation = animationVariants[cardIndex % animationVariants.length];
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 92%",
            once: true,
          },
          ...animation,
          delay: cardIndex * 0.12,
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
      {/* Removed linear gradient background */}
      
      {/* Keep only animated gradient orbs */}
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
          {/* Header Section */}
          <div className="mb-20 text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 border rounded-full header-badge bg-white/5 border-white/10 backdrop-blur-xl">
              <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
              <span className="text-sm font-bold tracking-widest text-purple-300 uppercase">
                Skills & Expertise
              </span>
            </div>

            <h2 className="mb-6 text-5xl font-black leading-tight text-white md:text-6xl lg:text-7xl">
              <span className="inline-block header-word">What</span>{" "}
              <span className="inline-block header-word">I</span>{" "}
              <span className="relative inline-block header-word">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
                  Master
                </span>
                <div className="absolute left-0 right-0 h-3 bottom-2 bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-lg" />
              </span>
            </h2>

            <p className="max-w-2xl mx-auto text-lg header-description text-slate-400 md:text-xl">
              Crafting exceptional digital experiences with modern tools and
              technologies
            </p>
          </div>

          {/* Skills Categories */}
          <div className="space-y-32">
            {categories.map((category, i) => {
              const Icon = category.icon;
              return (
                <div key={i} className={`category-${i} relative`}>
                  {/* Background Glow */}
                  <div
                    className={`absolute -inset-32 ${category.bgGlow} rounded-full blur-[100px] opacity-20 pointer-events-none`}
                  />

                  {/* Category Header */}
                  <div className="relative mb-16 category-header">
                    <div className="flex flex-col items-center gap-8 text-center md:flex-row md:text-left">
                      <div className="relative group">
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${category.color} rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110`}
                        />
                        <div className="relative p-6 transition-all duration-700 border-2 shadow-2xl rounded-3xl bg-slate-900 border-slate-700 group-hover:scale-110 group-hover:rotate-3">
                          <Icon className="w-12 h-12 text-white drop-shadow-2xl" />
                        </div>
                        <div
                          className={`absolute -top-2 -right-2 w-3 h-3 rounded-full bg-gradient-to-br ${category.color} animate-ping`}
                        />
                        <div
                          className={`absolute -bottom-2 -left-2 w-2 h-2 rounded-full bg-gradient-to-br ${category.color}`}
                          style={{ animationDelay: "1s" }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3
                          className={`text-4xl md:text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r ${category.color} drop-shadow-2xl category-description`}
                        >
                          {category.title}
                        </h3>
                        <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
                          <div
                            className={`px-4 py-2 rounded-full bg-gradient-to-r ${category.color} shadow-2xl`}
                          >
                            <span className="text-base font-bold text-white">
                              {category.skills.length} Technologies
                            </span>
                          </div>
                          <div className="px-4 py-2 border rounded-full bg-slate-800/50 backdrop-blur-sm border-slate-700">
                            <span className="text-sm font-semibold text-slate-300">
                              Production Ready
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {category.skills.map((skill) => (
                      <div
                        key={skill}
                        className="p-3 transition-all duration-700 skill-card group rounded-2xl transform-gpu hover:scale-110"
                        style={{ perspective: "1000px" }}
                      >
                        <div className="relative flex flex-col items-center justify-center gap-2 p-3 border-2 shadow-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700 rounded-2xl group-hover:border-slate-600 group-hover:shadow-2xl">
                          <Image
                            src={`/skills/${skill}.svg`}
                            alt={skill}
                            width={40}
                            height={40}
                            className="object-contain drop-shadow-2xl"
                          />
                          <p className="text-sm font-semibold text-slate-300 group-hover:text-white">
                            {skill}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Divider */}
                  <div className="flex items-center justify-center gap-4 mt-12">
                    <div
                      className={`h-1 w-20 rounded-full bg-gradient-to-r ${category.color} opacity-50`}
                    />
                    <div
                      className={`w-3 h-3 rounded-full bg-gradient-to-br ${category.color}`}
                    />
                    <div
                      className={`h-1 w-20 rounded-full bg-gradient-to-r ${category.color} opacity-50`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px);
            opacity: 0.6;
          }
        }
        @keyframes float-horizontal {
          0%, 100% {
            transform: translateX(0);
            opacity: 0.3;
          }
          50% {
            transform: translateX(20px);
            opacity: 0.6;
          }
        }
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
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