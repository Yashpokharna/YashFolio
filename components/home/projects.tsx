import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Terminal, ArrowRight, ChevronDown } from 'lucide-react';
import { PROJECTS } from '../../constants';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { MENULINKS } from "../../constants";

gsap.registerPlugin(ScrollTrigger);

interface ProjectsSectionProps {
  isDesktop: boolean;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ isDesktop }) => {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [revealedProjects, setRevealedProjects] = useState<Set<number>>(new Set());
  const badgeRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const storyItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const techIcons: Record<string, string> = {
    html: "🌐",
    css: "🎨",
    react: "⚛️",
    next: "▲",
    tailwind: "💨",
    gsap: "🎬",
    npm: "📦",
    angular: "🅰️",
    typescript: "📘",
    figma: "🎨",
  };

  const chapterLabels = ["Prologue", "Chapter I", "Chapter II", "Chapter III", "Chapter IV", "Epilogue"];

  useEffect(() => {
    // Header animations
    const tl = gsap.timeline();
    if (badgeRef.current) {
      gsap.fromTo(badgeRef.current, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: badgeRef.current, start: "top 85%" }
      });
    }

    if (headerRef.current) {
      const words = headerRef.current.querySelectorAll(".header-word");
      gsap.fromTo(words, { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power2.out", stagger: 0.15,
        scrollTrigger: { trigger: headerRef.current, start: "top 80%" }
      });
      const glow = headerRef.current.querySelector(".header-glow");
      if (glow) {
        gsap.fromTo(glow, { scaleX: 0, opacity: 0 }, {
          scaleX: 1, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.5,
          scrollTrigger: { trigger: headerRef.current, start: "top 80%" }
        });
      }
    }

    if (descRef.current) {
      gsap.fromTo(descRef.current, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.3,
        scrollTrigger: { trigger: descRef.current, start: "top 85%" }
      });
    }

    // Story items — cinematic reveal per scroll
    storyItemsRef.current.forEach((el, i) => {
      if (!el) return;
      const isEven = i % 2 === 0;

      const img = el.querySelector('.story-image');
      const content = el.querySelector('.story-content');
      const line = el.querySelector('.story-line');
      const dot = el.querySelector('.story-dot');
      const chapter = el.querySelector('.story-chapter');

      if (line) {
        gsap.fromTo(line, { scaleY: 0 }, {
          scaleY: 1, duration: 1.2, ease: "power2.inOut",
          scrollTrigger: { trigger: el, start: "top 75%", end: "bottom 60%", scrub: false }
        });
      }

      if (dot) {
        gsap.fromTo(dot, { scale: 0, opacity: 0 }, {
          scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)",
          scrollTrigger: { trigger: el, start: "top 70%" }
        });
      }

      if (chapter) {
        gsap.fromTo(chapter, { y: -20, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 72%" }
        });
      }

      if (img) {
        gsap.fromTo(img,
          { x: isEven ? -60 : 60, opacity: 0, scale: 0.92 },
          {
            x: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 72%" }
          }
        );
      }

      if (content) {
        const children = content.querySelectorAll('.reveal-child');
        gsap.fromTo(children,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, ease: "power2.out", stagger: 0.12, delay: 0.2,
            scrollTrigger: { trigger: el, start: "top 72%" }
          }
        );
      }

      // Parallax on image
      if (img && isDesktop) {
        gsap.to(img, {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          }
        });
      }

      // Mark revealed
      ScrollTrigger.create({
        trigger: el,
        start: "top 72%",
        onEnter: () => setRevealedProjects(prev => new Set(Array.from(prev).concat(i)))
      });
    });

    return () => { ScrollTrigger.getAll().forEach(st => st.kill()); };
  }, []);

  return (
    <section
      id={MENULINKS[2].ref}
      ref={sectionRef}
      className={`relative min-h-screen py-20 overflow-hidden bg-slate-950 ${isDesktop ? "" : "px-4"}`}
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `linear-gradient(rgba(139,92,246,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,0.03) 1px,transparent 1px)`,
        backgroundSize: '80px 80px',
      }} />

      {/* Ambient orbs */}
      <div className="absolute rounded-full pointer-events-none top-1/4 left-1/4 w-96 h-96 opacity-5 blur-3xl"
        style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)' }} />
      <div className="absolute rounded-full pointer-events-none bottom-1/3 right-1/4 w-80 h-80 opacity-5 blur-3xl"
        style={{ background: 'radial-gradient(circle, #ec4899, transparent)' }} />

      <div className="container relative z-10 max-w-6xl px-6 mx-auto">

        {/* ── Header (unchanged) ── */}
        <div className="mb-24 text-center">
          <div ref={badgeRef} className="inline-flex items-center gap-2 px-5 py-2 mb-6 border rounded-full opacity-0 bg-white/5 border-white/10 backdrop-blur-xl">
            <Terminal className="w-4 h-4 text-purple-400 animate-pulse" />
            <span className="text-sm font-bold tracking-widest text-purple-300 uppercase">My Works</span>
          </div>

          <h2 ref={headerRef} className="mb-6 text-6xl font-black leading-tight text-white md:text-7xl lg:text-8xl" style={{ perspective: "1000px" }}>
            <span className="inline-block opacity-0 header-word">Featured</span>{' '}
            <span className="relative inline-block">
              <span className="inline-block leading-normal text-transparent opacity-0 header-word bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">Projects</span>
              <div className="absolute left-0 right-0 h-3 opacity-0 header-glow bottom-2 bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-lg" />
            </span>
          </h2>

          <p ref={descRef} className="max-w-3xl mx-auto text-lg leading-relaxed opacity-0 text-slate-400 md:text-xl">
            A showcase of my recent work in web development, featuring modern designs, smooth animations, and cutting-edge technologies.
          </p>

          {/* scroll hint */}
          <div className="flex flex-col items-center gap-2 mt-10 animate-bounce opacity-40">
            <span className="text-xs tracking-widest uppercase text-slate-500">Scroll to explore</span>
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </div>
        </div>

        {/* ── Storytelling Timeline ── */}
        <div className="relative">

          {/* Central spine line */}
          {isDesktop && (
            <div className="absolute top-0 bottom-0 w-px -translate-x-px left-1/2"
              style={{ background: 'linear-gradient(to bottom, transparent, rgba(139,92,246,0.2) 10%, rgba(139,92,246,0.2) 90%, transparent)' }} />
          )}

          <div className="space-y-32">
            {PROJECTS.map((project, index) => {
              const isEven = index % 2 === 0;
              const label = chapterLabels[index] ?? `Chapter ${index}`;

              return (
                <div
                  key={index}
                  ref={el => { storyItemsRef.current[index] = el; }}
                  className="relative"
                  onMouseEnter={() => setActiveProject(index)}
                  onMouseLeave={() => setActiveProject(null)}
                >
                  {/* Chapter label above */}
                  <div className={`story-chapter relative z-10 opacity-0 mb-6 flex items-center gap-3 ${isDesktop ? (isEven ? 'justify-start' : 'justify-end') : 'justify-start'}`}>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-px" style={{ background: 'linear-gradient(to right, #a855f7, #ec4899)' }} />
                      <span className="text-xs font-bold tracking-[0.3em] uppercase text-purple-400">
                        {label}
                      </span>
                      <div className="w-6 h-px" style={{ background: 'linear-gradient(to left, #a855f7, #ec4899)' }} />
                    </div>
                  </div>

                  {/* Timeline dot on spine */}
                  {isDesktop && (
                    <div className="absolute z-20 -translate-x-1/2 opacity-0 story-dot left-1/2 top-12">
                      <div className="relative w-5 h-5">
                        <div className="absolute inset-0 rounded-full animate-ping opacity-30"
                          style={{ background: project.gradient[0] }} />
                        <div className="relative w-5 h-5 border-2 rounded-full border-slate-950"
                          style={{ background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})` }} />
                      </div>
                    </div>
                  )}

                  {/* Two-col layout on desktop */}
                  <div className={`grid gap-8 items-center ${isDesktop ? 'grid-cols-2' : 'grid-cols-1'}`}>

                    {/* IMAGE side */}
                    <div className={`story-image opacity-0 ${isDesktop ? (isEven ? 'order-1' : 'order-2') : 'order-1'}`}>
                      <div
                        className="relative overflow-hidden cursor-pointer rounded-2xl"
                        style={{
                          boxShadow: activeProject === index
                            ? `0 0 60px ${project.gradient[0]}50, 0 20px 60px rgba(0,0,0,0.5)`
                            : '0 20px 60px rgba(0,0,0,0.4)',
                          transition: 'box-shadow 0.5s ease',
                        }}
                      >
                        {/* Image */}
                        <div className="relative overflow-hidden aspect-[16/10]">
                          <img
                            src={project.image}
                            alt={project.name}
                            className="object-cover w-full h-full transition-transform duration-700"
                            style={{ transform: activeProject === index ? 'scale(1.04)' : 'scale(1)' }}
                          />
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 transition-opacity duration-500"
                            style={{
                              background: `linear-gradient(135deg, ${project.gradient[0]}60, ${project.gradient[1]}40)`,
                              opacity: activeProject === index ? 0.5 : 0.25,
                            }} />
                          {/* Bottom fade */}
                          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-slate-950 to-transparent" />
                        </div>

                        {/* Hover overlay: visit button */}
                        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${activeProject === index ? 'opacity-100' : 'opacity-0'}`}>
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white rounded-xl backdrop-blur-md border border-white/20 hover:border-white/40 transition-all"
                            style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.85), rgba(236,72,153,0.85))' }}
                            onClick={e => e.stopPropagation()}
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>View Live</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* CONTENT side */}
                    <div className={`story-content ${isDesktop ? (isEven ? 'order-2 pl-8' : 'order-1 pr-8 text-right') : 'order-2'}`}>

                      {/* Project number */}
                      <div className="mb-3 reveal-child">
                        <span
                          className="font-black leading-none pointer-events-none select-none text-8xl"
                          style={{
                            WebkitTextStroke: '2px #a855f7',
                            color: 'transparent',
                            opacity: 0.6,
                            filter: 'drop-shadow(0 0 14px rgba(168,85,247,0.45))',
                          }}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>

                      {/* Name */}
                      <h3 className="mb-4 text-3xl font-black leading-tight text-white reveal-child md:text-4xl">
                        {project.name}
                      </h3>

                      {/* Divider */}
                      <div className={`reveal-child flex items-center gap-3 mb-5 ${isDesktop && !isEven ? 'justify-end' : ''}`}>
                        <div className="w-12 h-px rounded-full"
                          style={{ background: `linear-gradient(to right, ${project.gradient[0]}, ${project.gradient[1]})` }} />
                        <div className="w-1.5 h-1.5 rounded-full"
                          style={{ background: project.gradient[0] }} />
                      </div>

                      {/* Description as a "story paragraph" */}
                      <p className="mb-6 text-base leading-relaxed reveal-child text-slate-400 md:text-lg">
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className={`reveal-child flex flex-wrap gap-2 mb-7 ${isDesktop && !isEven ? 'justify-end' : ''}`}>
                        {project.tech.map((tech: string, i: number) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors duration-300"
                            style={{
                              background: `${project.gradient[0]}10`,
                              borderColor: `${project.gradient[0]}30`,
                              color: activeProject === index ? '#e2e8f0' : '#94a3b8',
                            }}
                          >
                            <span>{techIcons[tech] ?? "⚡"}</span>
                            <span className="capitalize">{tech}</span>
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className={`reveal-child ${isDesktop && !isEven ? 'flex justify-end' : ''}`}>
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 group rounded-xl hover:scale-105 hover:shadow-xl"
                          style={{
                            background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                            boxShadow: activeProject === index ? '0 0 30px rgba(168,85,247,0.5)' : '0 4px 20px rgba(168,85,247,0.25)',
                          }}
                        >
                          <span>Explore Project</span>
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Animated bottom border on active */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-px transition-all duration-700 origin-left"
                    style={{
                      background: `linear-gradient(to right, ${project.gradient[0]}, ${project.gradient[1]}, transparent)`,
                      transform: activeProject === index ? 'scaleX(1)' : 'scaleX(0)',
                      opacity: 0.4,
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* End of story marker */}
          <div className="flex flex-col items-center gap-3 mt-24 opacity-30">
            <div className="w-px h-16" style={{ background: 'linear-gradient(to bottom, rgba(139,92,246,0.4), transparent)' }} />
            <span className="text-xs tracking-[0.4em] uppercase text-slate-600">— fin —</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;