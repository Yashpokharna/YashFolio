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
    const elements = targetSection.current.querySelectorAll(".seq");
    if (!elements.length) return;

    const tl = gsap.timeline();
    tl.to(elements, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.15,
    });

    // Word-by-word animation with different effects for each word
    if (headingRef.current) {
      const words = headingRef.current.querySelectorAll(".word");
      
      // Animate each word with different effects
      words.forEach((word, index) => {
        const effects = [
          // Word 1: "Crafting" - Slide up with fade
          { 
            y: 50, 
            opacity: 0, 
            duration: 1.2, 
            ease: "power3.out" 
          },
          // Word 2: "elegant," - Rotate and fade
          { 
            rotationX: -90, 
            opacity: 0, 
            transformOrigin: "50% 50%",
            duration: 1, 
            ease: "back.out(1.7)" 
          },
          // Word 3: "performant" - Scale up with fade
          { 
            scale: 0, 
            opacity: 0, 
            duration: 1.1, 
            ease: "elastic.out(1, 0.5)" 
          },
          // Word 4: "web" - Slide from left
          { 
            x: -100, 
            opacity: 0, 
            duration: 1, 
            ease: "power2.out" 
          },
          // Word 5: "experiences" - Blur effect with fade
          { 
            filter: "blur(20px)", 
            opacity: 0, 
            duration: 1.2, 
            ease: "power2.out" 
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
            rotationX: 0,
            filter: "blur(0px)",
            delay: 0.5 + (index * 0.2), // Slower stagger between words
            duration: 1,
            ease: "power2.out"
          }
        );
      });
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && typedSpanElement.current) {
      initTypeAnimation();
      setTimeout(() => initRevealAnimation(), 200);
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
      <div className="relative z-10 max-w-3xl space-y-14">
        {/* Horizontal line with text */}
        <div className="flex items-center justify-center gap-3 translate-y-6 opacity-0 seq text-slate-400">
          <span className="w-12 h-px bg-purple-600 rounded" />
          <span className="uppercase tracking-[0.18em] font-semibold text-purple-400">
            Hello, I am Yash
          </span>
          <span className="w-12 h-px bg-pink-500 rounded" />
        </div>

        <h1 
          ref={headingRef}
          className="text-5xl font-extrabold leading-tight tracking-tight text-white translate-y-6 opacity-0 seq sm:text-6xl md:text-7xl lg:text-8xl"
          style={{ perspective: "1000px" }}
        >
          <span className="inline-block opacity-0 word">Crafting</span>{" "}
          <span className="inline-block leading-normal text-transparent opacity-0 word bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text">
            Elegant,
          </span>{" "}
          <span className="inline-block text-transparent opacity-0 word bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text">
            Performant
          </span>{" "}
          <span className="inline-block opacity-0 word">Web</span>{" "}
          <span className="inline-block opacity-0 word">Experiences</span>
        </h1>

        <div className="flex items-center justify-center gap-3 text-xl font-medium translate-y-6 opacity-0 seq text-slate-200 sm:text-2xl">
          <Terminal className="flex-shrink-0 w-6 h-6 text-emerald-400" />
          <span ref={typedSpanElement} />
          <span className="cursor-blink">|</span>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mt-8 translate-y-6 opacity-0 seq">
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 font-semibold text-white transition shadow-lg rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-pink-500/50"
          >
            <Mail className="w-5 h-5" />
            Get in touch
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="/Yash_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-semibold transition text-slate-200 rounded-xl bg-slate-900/40 backdrop-blur-sm hover:bg-slate-800/60"
          >
            <Download className="w-5 h-5" />
            Resume
          </a>
        </div>

        <div className="flex justify-center gap-6 mt-10 translate-y-6 opacity-0 seq">
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
          src="/skills/next.svg"
          alt="Next.js"
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
          src="/skills/figma.svg"
          alt="Figma"
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