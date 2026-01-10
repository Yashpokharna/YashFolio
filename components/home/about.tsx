import { gsap, Linear, Back } from "gsap";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Sparkles, Code2, Palette, Zap, Rocket, Person, UserCircle } from "lucide-react";
import { MENULINKS} from "../../constants";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const quoteRef = useRef<HTMLDivElement>(null);
  const targetSection = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const [willChange, setwillChange] = useState(false);

  const skills = [
    { icon: Code2, label: "Clean Code", color: "from-purple-500 to-blue-500", bgColor: "purple" },
    { icon: Palette, label: "UI/UX Design", color: "from-pink-500 to-purple-500", bgColor: "pink" },
    { icon: Zap, label: "Performance", color: "from-yellow-500 to-orange-500", bgColor: "orange" },
  ];

  const initRevealAnimation = useCallback(() => {
    ScrollTrigger.getAll().forEach(st => st.kill());

    if (badgeRef.current) {
      gsap.fromTo(badgeRef.current, 
        { opacity: 0, scale: 0.5, y: 30 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: badgeRef.current,
            start: "top 85%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          }
        }
      );
    }

    if (headerRef.current) {
      const words = headerRef.current.querySelectorAll(".header-word");
      
      gsap.fromTo(words,
        { 
          opacity: 0, 
          y: 60, 
          scale: 0.8,
          rotationX: -30
        },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          }
        }
      );

      const glow = headerRef.current.querySelector(".header-glow");
      if (glow) {
        gsap.fromTo(glow,
          { scaleX: 0, opacity: 0 },
          { 
            scaleX: 1, 
            opacity: 1, 
            duration: 1, 
            ease: "power3.out",
            delay: 0.5,
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
            }
          }
        );
      }
    }

    if (skillsRef.current) {
      const cards = skillsRef.current.querySelectorAll(".skill-card");
      
      cards.forEach((card, index) => {
        const effects = [
          // First card - Fade in from bottom with slight bounce
          {
            y: 100,
            opacity: 0,
            scale: 0.5,
          },
          // Second card - Pop in with scale
          {
            scale: 0,
            opacity: 0,
            rotation: -45,
          },
          // Third card - Slide from top with fade
          {
            y: -100,
            opacity: 0,
            scale: 0.5,
          }
        ];

        gsap.fromTo(card,
          effects[index],
          { 
            y: 0,
            opacity: 1, 
            scale: 1,
            rotation: 0,
            duration: 1, 
            ease: "back.out(1.7)",
            delay: 0.2 + (index * 0.2),
            scrollTrigger: {
              trigger: skillsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            }
          }
        );

        // Animate icon with a different timing
        const icon = card.querySelector(".skill-icon");
        if (icon) {
          gsap.fromTo(icon,
            {
              scale: 0,
              rotation: 180,
            },
            {
              scale: 1,
              rotation: 0,
              duration: 0.8,
              ease: "elastic.out(1, 0.5)",
              delay: 0.5 + (index * 0.2),
              scrollTrigger: {
                trigger: skillsRef.current,
                start: "top 80%",
              }
            }
          );
        }

        // Animate text separately
        const text = card.querySelector("span");
        if (text) {
          gsap.fromTo(text,
            {
              opacity: 0,
              y: 20,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              delay: 0.7 + (index * 0.2),
              scrollTrigger: {
                trigger: skillsRef.current,
                start: "top 80%",
              }
            }
          );
        }
      });
    }
  }, []);

  const initAboutAnimation = useCallback(() => {
    if (!quoteRef.current || !targetSection.current) return;

    const timeline = gsap.timeline({
      defaults: { ease: Linear.easeNone, duration: 0.1 },
    });

    const quotes = quoteRef.current.querySelectorAll(".about-1, .about-2, .about-3");
    timeline
      .fromTo(quotes[0], { opacity: 0.2 }, { opacity: 1 })
      .to(quotes[0], { opacity: 0.2, delay: 0.5 })
      .fromTo(quotes[1], { opacity: 0.2 }, { opacity: 1 }, "<")
      .to(quotes[1], { opacity: 0.2, delay: 1 })
      .fromTo(quotes[2], { opacity: 0.2 }, { opacity: 1 }, "<")
      .to(quotes[2], { opacity: 0.2, delay: 1.5 });

    ScrollTrigger.create({
      trigger: targetSection.current,
      start: "center 80%",
      end: "center top",
      scrub: 0,
      animation: timeline,
      onToggle: (self) => setwillChange(self.isActive),
    });
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      initRevealAnimation();
      initAboutAnimation();
    }, 200);

    return () => {
      clearTimeout(timeoutId);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [initRevealAnimation, initAboutAnimation]);

  const renderQuotes = (): React.ReactNode => (
    <h2 ref={quoteRef} className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl text-slate-300">
      <span className={`about-1 block mb-4 ${willChange ? "will-change-opacity" : ""}`}>
        I am a developer focused on creating{" "}
        <span className="text-white">responsive</span> and{" "}
        <span className="text-white">user-friendly</span> web experiences.
      </span>
      <span className={`about-2 block mb-4 ${willChange ? "will-change-opacity" : ""}`}>
        I work with modern tools like{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          React, Next.js, and Tailwind CSS
        </span>.
      </span>
      <span className={`about-3 block ${willChange ? "will-change-opacity" : ""}`}>
        I enjoy turning complex ideas into{" "}
        <span className="text-white">simple, elegant interfaces</span>.
      </span>
    </h2>
  );

  return (
    <section
      className="relative w-full py-20 overflow-hidden select-none bg-slate-950"
      id={MENULINKS[1].ref} ref={targetSection}
    >
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
        <div className="mb-16 text-center">
          <div 
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-5 py-2 mb-6 transition-shadow duration-300 rounded-full shadow-xl opacity-0 bg-white/5 backdrop-blur-xl hover:shadow-purple-500/30"
          >
            <UserCircle className="w-4 h-4 text-purple-400 animate-pulse" />
            <span className="text-sm font-bold tracking-widest text-purple-300 uppercase">About Me</span>
          </div>
          
          <h1 
            ref={headerRef}
            className="mb-6 text-6xl font-black leading-tight text-white md:text-7xl lg:text-8xl"
            style={{ perspective: "1000px" }}
          >
            <span className="inline-block opacity-0 header-word">Who</span>{' '}
            <span className="inline-block opacity-0 header-word">I</span>{' '}
            <span className="relative inline-block">
              <span className="inline-block text-transparent header-word bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
                Am
              </span>
              <div className="absolute left-0 right-0 h-1 rounded-full opacity-0 header-glow -bottom-2 bg-gradient-to-r from-purple-500/50 to-pink-500/50 blur-sm" />
            </span>
          </h1>
        </div>

        <div className="mb-20">
          {renderQuotes()}
        </div>

        {/* SKILLS CARDS - MINIMAL DESIGN */}
        <div ref={skillsRef} className="flex flex-wrap justify-center max-w-3xl gap-6 mx-auto">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div
                key={index}
                className="skill-card group"
              >
                {/* Compact card */}
                <div className="relative p-6 transition-all duration-500 transform bg-slate-900/30 backdrop-blur-sm rounded-2xl group-hover:scale-110 group-hover:bg-slate-900/50">
                  
                  {/* Subtle glow on hover */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`} />
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center gap-3 text-center">
                    
                    {/* Simple icon */}
                    <div className={`skill-icon w-14 h-14 rounded-xl bg-gradient-to-br ${skill.color} p-3 transition-all duration-500 group-hover:rotate-12`}>
                      <Icon className="w-full h-full text-white" />
                    </div>

                    {/* Label */}
                    <span className="text-sm font-semibold transition-colors duration-300 text-slate-300 group-hover:text-white">
                      {skill.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .skill-card {
          transition: all 0.3s ease;
        }
      `}</style>
    </section>
  );
};

export default AboutSection;