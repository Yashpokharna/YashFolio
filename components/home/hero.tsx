"use client";

import React, { MutableRefObject, useEffect, useRef } from "react";
import Typed from "typed.js";
import Image from "next/image";
import { gsap } from "gsap";
import {
  ArrowRight,
  Download,
  Mail,
  Terminal,
  Code,
} from "lucide-react";
import { EMAIL, MENULINKS, SOCIAL_LINKS, TYPED_STRINGS } from "../../constants";

const HeroSection = React.memo(() => {
  const typedSpanElement: MutableRefObject<HTMLSpanElement | null> = useRef(null);
  const targetSection: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const typedInstanceRef = useRef<Typed | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);

  const initTypeAnimation = () => {
    if (!typedSpanElement.current || typedInstanceRef.current) return null;

    const typed = new Typed(typedSpanElement.current, {
      strings: TYPED_STRINGS,
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 1200,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    });

    typedInstanceRef.current = typed;
    return typed;
  };

  const initRevealAnimation = () => {
    if (!targetSection.current) return;

    const tl = gsap.timeline();

    // Animate "Hello, I am Yash" section word by word
    if (introRef.current) {
      const introWords = introRef.current.querySelectorAll(".intro-word");
      
      introWords.forEach((word, index) => {
        const introEffects = [
          // "Hello," - Fade and slide from top
          { 
            y: -60, 
            opacity: 0, 
            rotation: -15,
            duration: 1.4, 
            ease: "power3.out" 
          },
          // "I" - Scale up with bounce
          { 
            scale: 0, 
            opacity: 0, 
            duration: 1.2, 
            ease: "back.out(2)" 
          },
          // "am" - Slide from left with rotation
          { 
            x: -80, 
            opacity: 0,
            rotation: 20, 
            duration: 1.3, 
            ease: "power2.out" 
          },
          // "Yash" - 3D flip
          { 
            rotationY: 180, 
            opacity: 0, 
            transformOrigin: "50% 50%",
            duration: 1.5, 
            ease: "power3.out" 
          }
        ];
        
        gsap.fromTo(
          word,
          introEffects[index] || introEffects[0],
          {
            y: 0,
            x: 0,
            opacity: 1,
            scale: 1,
            rotation: 0,
            rotationY: 0,
            delay: 0.3 + (index * 0.3),
            duration: 1.2,
            ease: "power2.out"
          }
        );
      });

      // Animate the lines
      const lines = introRef.current.querySelectorAll(".intro-line");
      gsap.fromTo(
        lines,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
          delay: 0.2,
          stagger: 0.3
        }
      );
    }

    // Animate main heading word by word with unique effects
    if (headingRef.current) {
      const words = headingRef.current.querySelectorAll(".word");
      
      words.forEach((word, index) => {
        const effects = [
          // Word 1: "Crafting" - Slide up with fade and slight rotation
          { 
            y: 80, 
            opacity: 0,
            rotation: -10, 
            duration: 1.5, 
            ease: "power3.out" 
          },
          // Word 2: "elegant," - 3D Rotate with perspective
          { 
            rotationX: -90, 
            opacity: 0, 
            transformOrigin: "50% 50%",
            duration: 1.4, 
            ease: "back.out(1.5)" 
          },
          // Word 3: "performant" - Scale and blur
          { 
            scale: 0.3, 
            opacity: 0,
            filter: "blur(15px)", 
            duration: 1.6, 
            ease: "elastic.out(1, 0.6)" 
          },
          // Word 4: "web" - Slide from right with rotation
          { 
            x: 120, 
            opacity: 0,
            rotation: 25, 
            duration: 1.4, 
            ease: "power2.out" 
          },
          // Word 5: "experiences" - Wave effect with blur
          { 
            y: -70,
            filter: "blur(25px)", 
            opacity: 0, 
            duration: 1.7, 
            ease: "power3.out" 
          }
        ];
        
        gsap.fromTo(
          word,
          effects[index] || effects[0],
          {
            y: 0,
            x: 0,
            opacity: 1,
            scale: 1,
            rotation: 0,
            rotationX: 0,
            filter: "blur(0px)",
            delay: 1.8 + (index * 0.35), // Slower stagger, starts after intro
            duration: 1.4,
            ease: "power2.out"
          }
        );
      });
    }

    // Animate other elements with slower timing
    const terminalSection = targetSection.current.querySelector(".terminal-section");
    if (terminalSection) {
      gsap.fromTo(
        terminalSection,
        { 
          y: 50, 
          opacity: 0,
          scale: 0.9 
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.3,
          ease: "power2.out",
          delay: 3.5
        }
      );
    }

    const buttonsSection = targetSection.current.querySelector(".buttons-section");
    if (buttonsSection) {
      const buttons = buttonsSection.querySelectorAll("a");
      gsap.fromTo(
        buttons,
        { 
          y: 40, 
          opacity: 0,
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "back.out(1.5)",
          delay: 4.2,
          stagger: 0.25
        }
      );
    }

    const socialSection = targetSection.current.querySelector(".social-section");
    if (socialSection) {
      const socials = socialSection.querySelectorAll("a");
      gsap.fromTo(
        socials,
        { 
          scale: 0, 
          opacity: 0,
          rotation: -180
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
          delay: 4.8,
          stagger: 0.15
        }
      );
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && typedSpanElement.current) {
      initTypeAnimation();
      setTimeout(() => initRevealAnimation(), 300);
    }

    return () => {
      if (typedInstanceRef.current) {
        typedInstanceRef.current.destroy();
        typedInstanceRef.current = null;
      }
    };
  }, []);

  const renderSocialLinks = () =>
    Object.keys(SOCIAL_LINKS).map((key: keyof typeof SOCIAL_LINKS) => (
      <a
        key={key}
        href={SOCIAL_LINKS[key]}
        className="relative flex items-center justify-center transition-transform duration-300 rounded-lg w-11 h-11 bg-slate-900/60 backdrop-blur-sm hover:bg-slate-800/80 hover:-translate-y-1"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          src={`/social/${key}.svg`}
          alt={key}
          width={18}
          height={18}
          className="transition-transform duration-300 group-hover:scale-110"
        />
      </a>
    ));

  const { ref: heroSectionRef } = MENULINKS[0];

  return (
    <section
      id={heroSectionRef}
      ref={targetSection}
      className="relative flex flex-col items-center justify-center w-full min-h-screen px-6 pb-24 overflow-hidden text-center select-none pt-28 bg-slate-950"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 via-slate-950 to-slate-950" />
      <div className="absolute rounded-full top-1/4 right-1/4 w-96 h-96 bg-purple-500/10 blur-3xl animate-pulse" />
      <div
        className="absolute rounded-full bottom-1/3 left-1/4 w-96 h-96 bg-pink-500/10 blur-3xl animate-pulse"
        style={{ animationDelay: "1s", animationDuration: "4s" }}
      />
      <div
        className="absolute rounded-full top-1/2 right-1/3 w-72 h-72 bg-blue-500/10 blur-3xl animate-pulse"
        style={{ animationDelay: "2s", animationDuration: "5s" }}
      />
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute w-px h-40 top-20 left-20 bg-gradient-to-b from-transparent via-purple-500 to-transparent animate-float" />
        <div
          className="absolute w-px h-32 top-40 right-32 bg-gradient-to-b from-transparent via-pink-500 to-transparent animate-float"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute w-px bottom-32 left-1/3 h-36 bg-gradient-to-b from-transparent via-blue-500 to-transparent animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute w-40 h-px top-1/3 right-1/4 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-float-horizontal" />
        <div
          className="absolute w-32 h-px bottom-1/4 left-1/4 bg-gradient-to-r from-transparent via-pink-500 to-transparent animate-float-horizontal"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl space-y-12">
        {/* Enhanced "Hello, I am Yash" section */}
        <div 
          ref={introRef}
          className="flex items-center justify-center gap-5 text-slate-300"
          style={{ perspective: "1200px" }}
        >
          <span className="intro-line h-0.5 w-16 bg-gradient-to-r from-transparent via-purple-500 to-purple-500 rounded opacity-0" />
          <div className="flex items-center gap-3 text-3xl font-bold tracking-wide sm:text-4xl md:text-5xl">
            <span className="inline-block text-transparent opacity-0 intro-word bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text">
              Hello,
            </span>
            <span className="inline-block opacity-0 intro-word text-slate-200">
              I
            </span>
            <span className="inline-block opacity-0 intro-word text-slate-200">
              am
            </span>
            <span className="inline-block font-extrabold text-transparent opacity-0 intro-word bg-gradient-to-r from-pink-400 via-purple-400 to-pink-500 bg-clip-text">
              Yash
            </span>
          </div>
          <span className="intro-line h-0.5 w-16 bg-gradient-to-l from-transparent via-pink-500 to-pink-500 rounded opacity-0" />
        </div>

        <h1 
          ref={headingRef}
          className="text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
          style={{ perspective: "1000px" }}
        >
          <span className="inline-block opacity-0 word">Crafting</span>{" "}
          <span className="inline-block text-transparent opacity-0 word bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text">
            elegant,
          </span>{" "}
          <span className="inline-block text-transparent opacity-0 word bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text">
            performant
          </span>{" "}
          <span className="inline-block opacity-0 word">web</span>{" "}
          <span className="inline-block opacity-0 word">experiences</span>
        </h1>

        <div className="flex items-center justify-center gap-3 text-xl font-medium opacity-0 terminal-section text-slate-200 sm:text-2xl">
          <Terminal className="flex-shrink-0 w-6 h-6 text-emerald-400" />
          <span ref={typedSpanElement} />
          <span className="cursor-blink">|</span>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mt-8 buttons-section">
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 font-semibold text-white transition shadow-lg opacity-0 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-pink-500/50"
          >
            <Mail className="w-5 h-5" />
            Get in touch
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="/Yash_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-semibold transition opacity-0 text-slate-200 rounded-xl bg-slate-900/40 backdrop-blur-sm hover:bg-slate-800/60"
          >
            <Download className="w-5 h-5" />
            Resume
          </a>
        </div>

        <div className="flex justify-center gap-6 mt-10 social-section">
          {renderSocialLinks()}
        </div>
      </div>

      {/* Floating skill icons */}
      <div className="absolute top-16 left-8 w-14 h-14 animate-float">
        <Image
          src="/skills/react.svg"
          alt="React"
          width={56}
          height={56}
          className="object-contain"
        />
      </div>
      <div
        className="absolute top-32 right-12 w-14 h-14 animate-float"
        style={{ animationDelay: "0.8s" }}
      >
        <Image
          src="/skills/Figma.svg"
          alt="Figma"
          width={56}
          height={56}
          className="object-contain"
        />
      </div>
      <div
        className="absolute bottom-40 left-20 w-14 h-14 animate-float"
        style={{ animationDelay: "1.5s" }}
      >
        <Image
          src="/skills/next.svg"
          alt="Next.js"
          width={56}
          height={56}
          className="object-contain"
        />
      </div>
      <div
        className="absolute bottom-28 right-16 w-14 h-14 animate-float"
        style={{ animationDelay: "2.2s" }}
      >
        <Image
          src="/skills/tailwind.svg"
          alt="Tailwind"
          width={56}
          height={56}
          className="object-contain"
        />
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-15px);
            opacity: 0.7;
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .cursor-blink {
          animation: blink 1.2s steps(2, start) infinite;
        }
        @keyframes blink {
          to {
            visibility: hidden;
          }
        }
      `}</style>
    </section>
  );
});

HeroSection.displayName = "LandingHero";

export default HeroSection;