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
      bgColor: "from-purple-500/10 to-pink-500/10",
    },
    {
      title: "UI/UX Design",
      icon: Palette,
      skills: SKILLS.userInterface,
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-500/10 to-cyan-500/10",
    },
    {
      title: "Other Skills",
      icon: Layers,
      skills: SKILLS.other,
      color: "from-pink-500 to-orange-500",
      bgColor: "from-pink-500/10 to-orange-500/10",
    },
  ];

  const initRevealAnimation = (
    targetSection: MutableRefObject<HTMLDivElement | null>
  ): ScrollTrigger | void => {
    if (!targetSection.current) return;

    // Ensure visibility before animation starts
    gsap.set(targetSection.current.querySelectorAll(".seq"), { opacity: 1 });

    const revealTl = gsap.timeline({ defaults: { ease: Linear.easeNone } });
    revealTl.from(
      targetSection.current.querySelectorAll(".seq"),
      { opacity: 0, duration: 0.6, stagger: 0.3, y: 30 },
      "<"
    );

    return ScrollTrigger.create({
      trigger: targetSection.current.querySelector(".skills-wrapper"),
      start: "top 85%",
      end: "center center",
      animation: revealTl,
      scrub: false,
      onToggle: (self) => setWillChange(self.isActive),
    });
  };

  useEffect(() => {
    const trigger = initRevealAnimation(targetSection);
    return () => trigger?.kill();
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

      <div className="container relative z-10 max-w-6xl px-6 mx-auto">
        <div className="flex flex-col skills-wrapper">
          {/* Header Section */}
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 border rounded-full bg-white/5 border-white/10 backdrop-blur-xl seq">
              <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
              <span className="text-sm font-bold tracking-widest text-purple-300 uppercase">
                Skills & Expertise
              </span>
            </div>

            <h2 className="mb-6 text-5xl font-black leading-tight text-white md:text-6xl lg:text-7xl seq">
              What I{" "}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
                  Master
                </span>
                <div className="absolute left-0 right-0 h-3 bottom-2 bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-lg" />
              </span>
            </h2>

            <p className="max-w-2xl mx-auto text-lg text-slate-400 seq md:text-xl">
              Crafting exceptional digital experiences with modern tools and
              technologies
            </p>
          </div>

          {/* Skills Categories */}
          <div className="space-y-12">
            {categories.map((category, categoryIndex) => {
              const Icon = category.icon;

              return (
                <div
                  key={categoryIndex}
                  className={`seq transition-all duration-500 ${
                    willChange ? "will-change-opacity" : ""
                  }`}
                >
                  {/* Category Header */}
                  <div className="flex items-center justify-center gap-4 mb-8 md:justify-start">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-br ${category.color} shadow-lg`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white md:text-3xl">
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {category.skills.map((skill) => (
                      <div
                        key={skill}
                        className="relative flex flex-col items-center justify-center p-6 transition rounded-2xl bg-slate-900/40 backdrop-blur-sm hover:bg-slate-900/60"
                      >
                        {/* Skill Icon */}
                        <div className="relative mb-4">
                          <Image
                            src={`/skills/${skill}.svg`}
                            alt={skill}
                            width={56}
                            height={56}
                            className="object-contain"
                          />
                        </div>

                        {/* Skill Name */}
                        <span className="text-sm font-semibold text-center text-slate-400">
                          {skill}
                        </span>
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
