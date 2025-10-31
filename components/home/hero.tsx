"use client";

import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import Image from "next/image";
import { gsap } from "gsap";
import { ArrowRight, Download, Mail, Sparkles, Terminal, Code } from "lucide-react";
import Button, { ButtonTypes } from "../common/button";
import { EMAIL, MENULINKS, SOCIAL_LINKS, TYPED_STRINGS } from "../../constants";

const HeroSection = React.memo(() => {
  const typedSpanElement: MutableRefObject<HTMLSpanElement | null> = useRef(null);
  const targetSection: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const typedInstanceRef = useRef<Typed | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const codeLines = [
    "const developer = {",
    "  name: 'Yash Pokharna',",
    "  skills: ['React', 'Next.js', 'TypeScript'],",
    "  passion: 'Building amazing things',",
    "  status: 'Full Stack Developer'",
    "}"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % codeLines.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const initTypeAnimation = () => {
    if (!typedSpanElement.current || typedInstanceRef.current) return null;

    const typed = new Typed(typedSpanElement.current, {
      strings: TYPED_STRINGS,
      typeSpeed: 60,
      startDelay: 0,
      backSpeed: 40,
      backDelay: 1200,
      loop: true,
      smartBackspace: true,
      showCursor: true,
      cursorChar: "|",
      fadeOut: false,
    });

    typedInstanceRef.current = typed;
    return typed;
  };

  const initRevealAnimation = () => {
    if (!targetSection.current) return;

    const elements = targetSection.current.querySelectorAll(".seq");
    
    if (elements.length === 0) return;

    const tl = gsap.timeline();
    
    tl.to(elements, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.15,
    });
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && typedSpanElement.current) {
      try {
        const typed = initTypeAnimation();
        
        setTimeout(() => {
          initRevealAnimation();
        }, 200);
      } catch (error) {
        console.error('Animation initialization error:', error);
      }
    }

    return () => {
      if (typedInstanceRef.current) {
        typedInstanceRef.current.destroy();
        typedInstanceRef.current = null;
      }
    };
  }, []);

  const renderSocialLinks = (): React.ReactNode =>
    Object.keys(SOCIAL_LINKS).map((el: keyof typeof SOCIAL_LINKS) => (
      <a
        href={SOCIAL_LINKS[el]}
        key={el}
        className="relative flex items-center justify-center transition-all duration-300 rounded-lg w-11 h-11 bg-slate-900/60 hover:bg-slate-800/80 hover:-translate-y-1 group backdrop-blur-sm"
        rel="noreferrer"
        target="_blank"
      >
        <Image 
          src={`/social/${el}.svg`} 
          alt={el} 
          width={18} 
          height={18}
          className="transition-transform duration-300 group-hover:scale-110"
        />
      </a>
    ));

  const { ref: heroSectionRef } = MENULINKS[0];

  return (
    <section
      className="relative flex items-center justify-center w-full min-h-screen pt-24 pb-16 overflow-hidden select-none bg-slate-950"
      id={heroSectionRef}
      ref={targetSection}
    >
      {/* Animated background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 via-slate-950 to-slate-950" />
      
      {/* Animated gradient orbs */}
      <div className="absolute rounded-full top-1/4 right-1/4 w-96 h-96 bg-purple-500/10 blur-3xl animate-pulse" />
      <div className="absolute rounded-full bottom-1/3 left-1/4 w-96 h-96 bg-pink-500/10 blur-3xl animate-pulse" style={{ animationDelay: '1s', animationDuration: '4s' }} />
      <div className="absolute rounded-full top-1/2 right-1/3 w-72 h-72 bg-blue-500/10 blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s' }} />
      
      {/* Floating lines/paths */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute w-px h-40 top-20 left-20 bg-gradient-to-b from-transparent via-purple-500 to-transparent animate-float" />
        <div className="absolute w-px h-32 top-40 right-32 bg-gradient-to-b from-transparent via-pink-500 to-transparent animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute w-px bottom-32 left-1/3 h-36 bg-gradient-to-b from-transparent via-blue-500 to-transparent animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute w-40 h-px top-1/3 right-1/4 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-float-horizontal" />
        <div className="absolute w-32 h-px bottom-1/4 left-1/4 bg-gradient-to-r from-transparent via-pink-500 to-transparent animate-float-horizontal" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="container relative z-10 max-w-6xl px-6 mx-auto">
        
        <div className="grid items-center gap-12 lg:grid-cols-2">
          
          {/* Left Column - Main Content */}
          <div className="flex flex-col items-start space-y-8">
          
            {/* Terminal-style header */}
            <div className="seq opacity-0 translate-y-[30px] w-full">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-slate-900/60 backdrop-blur-sm">
                <Terminal className="w-4 h-4 text-green-400" />
                <span className="font-mono text-sm text-slate-400">~/portfolio</span>
                <div className="flex gap-1.5 ml-auto">
                  <div className="w-2.5 h-2.5 bg-red-500 rounded-full" />
                  <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full" />
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                </div>
              </div>
            </div>

            {/* Main heading - Left aligned, bold statement */}
            <div className="w-full space-y-6">
              <div className="seq opacity-0 translate-y-[30px]">
                <h2 className="text-5xl font-black leading-tight text-white md:text-6xl lg:text-7xl xl:text-8xl">
                  Hi, I'm{' '}
                  <span className="relative inline-block">
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                      Yash
                    </span>
                    <div className="absolute left-0 right-0 h-4 bottom-2 bg-gradient-to-r from-purple-500/40 to-pink-500/40 blur-xl -z-10" />
                  </span>
                </h2>
              </div>

              {/* Typed animation in a code-style box */}
              <div className="seq opacity-0 translate-y-[30px] w-full max-w-2xl">
                <div className="p-6 rounded-xl bg-slate-900/40 backdrop-blur-sm">
                  <div className="flex items-start gap-3">
                    <Code className="flex-shrink-0 w-5 h-5 mt-1 text-purple-400" />
                    <p className="text-xl font-medium md:text-2xl text-slate-200">
                      <span ref={typedSpanElement}></span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Interactive code snippet */}
              <div className="seq opacity-0 translate-y-[30px] w-full max-w-2xl">
                <div className="p-6 font-mono text-sm rounded-xl bg-slate-900/40 backdrop-blur-sm">
                  {codeLines.map((line, index) => (
                    <div
                      key={index}
                      className={`transition-all duration-500 py-1 ${
                        index === activeIndex
                          ? 'text-purple-400 translate-x-2 bg-purple-500/10 -mx-2 px-2 rounded'
                          : 'text-slate-500'
                      }`}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA section */}
            <div className="flex flex-col gap-6 seq opacity-0 translate-y-[30px] w-full">
              <div className="flex flex-wrap gap-4">
                <a
                  href={`mailto:${EMAIL}`}
                  className="group inline-flex items-center gap-3 px-8 py-4 font-bold text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 hover:shadow-lg hover:shadow-purple-500/50 hover:-translate-y-0.5"
                >
                  <Mail className="w-5 h-5" />
                  <span>Get In Touch</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                
                <a
                  href="/Yash_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 font-bold transition-all duration-300 rounded-xl text-slate-200 bg-slate-900/40 hover:bg-slate-800/60 hover:-translate-y-0.5 backdrop-blur-sm"
                >
                  <Download className="w-5 h-5" />
                  <span>Resume</span>
                </a>
              </div>

              {/* Social links with label */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <span className="text-sm font-medium text-slate-500">Connect with me:</span>
                <div className="flex gap-2">
                  {renderSocialLinks()}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Element */}
          <div className="relative hidden lg:block">
            <div className="relative flex items-center justify-center w-full h-full">
              
              {/* Central glowing element */}
              <div className="relative w-80 h-80">
                {/* Rotating rings */}
                <div className="absolute inset-0 border-2 rounded-full border-purple-500/20 animate-spin-slow" />
                <div className="absolute border-2 rounded-full inset-8 border-pink-500/20 animate-spin-reverse" />
                <div className="absolute border-2 rounded-full inset-16 border-blue-500/20 animate-spin-slow" style={{ animationDuration: '20s' }} />
                
                {/* Center glow */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 blur-2xl animate-pulse" />
                </div>
                
                {/* Center content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                      YP
                    </div>
                    <div className="px-4 py-2 rounded-lg bg-slate-900/60 backdrop-blur-sm">
                      <p className="text-sm font-medium text-slate-400">Full Stack Developer</p>
                    </div>
                  </div>
                </div>
                
                {/* Floating tech badges */}
                <div className="absolute -top-4 left-1/4 px-3 py-1.5 rounded-lg bg-slate-900/80 backdrop-blur-sm shadow-lg animate-float">
                  <p className="text-xs font-bold text-purple-400">React</p>
                </div>
                <div className="absolute top-1/4 -right-8 px-3 py-1.5 rounded-lg bg-slate-900/80 backdrop-blur-sm shadow-lg animate-float" style={{ animationDelay: '0.5s' }}>
                  <p className="text-xs font-bold text-pink-400">Next.js</p>
                </div>
                <div className="absolute -bottom-4 right-1/4 px-3 py-1.5 rounded-lg bg-slate-900/80 backdrop-blur-sm shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                  <p className="text-xs font-bold text-blue-400">TypeScript</p>
                </div>
                <div className="absolute bottom-1/4 -left-8 px-3 py-1.5 rounded-lg bg-slate-900/80 backdrop-blur-sm shadow-lg animate-float" style={{ animationDelay: '1.5s' }}>
                  <p className="text-xs font-bold text-purple-400">Tailwind</p>
                </div>
              </div>
            </div>
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
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-horizontal {
          animation: float-horizontal 4s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 30s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 25s linear infinite;
        }
      `}</style>
    </section>
  );
});

HeroSection.displayName = "LandingHero";

export default HeroSection;