import { useRef } from "react";
import { ArrowRight, ArrowUpRight, Lock } from "lucide-react";
import { gsap, ScrollTrigger, SplitText, prefersReducedMotion } from "@/lib/gsap";
import { useScene } from "../../context/AppContext";
import { IProject, PROJECTS, SOCIAL_LINKS } from "../../constants";
import { ChapterLabel, Magnetic } from "../common/ui";
import { DashboardVisual, InspectionVisual } from "./WorkVisuals";

const pad = (n: number) => String(n).padStart(2, "0");

const WorkPanel = ({ p, i }: { p: IProject; i: number }) => {
  const Media = p.url ? "a" : "div";
  const mediaProps = p.url
    ? { href: p.url, target: "_blank", rel: "noreferrer", "aria-label": `Visit ${p.name}` }
    : {};

  return (
    <article
      className="work-panel"
      style={{ ["--c1" as string]: p.gradient[0], ["--c2" as string]: p.gradient[1] }}
    >
      <div className="work-card">
        <Media
          {...mediaProps}
          className="work-media"
          data-cursor="view"
          data-cursor-label={p.url ? "Visit ↗" : "Private"}
        >
          <div className="work-media-inner">
            {p.image ? (
              <img
                src={p.image}
                srcSet={`${p.image.replace(/\.webp$/, "-960.webp")} 960w, ${p.image} 1920w`}
                sizes="(min-width: 768px) 72vw, 84vw"
                alt={`${p.name} website preview`}
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            ) : p.visual === "inspection" ? (
              <InspectionVisual />
            ) : (
              <DashboardVisual />
            )}
          </div>
          <div className="work-media-shade" />
          <div className="work-media-top mono-label">
            <span className="work-chip">{pad(i + 1)}</span>
            <span className="work-chip">{p.category}</span>
            <span className="work-chip ml-auto">{p.meta}</span>
          </div>
          <h3 className="work-title font-display">{p.name}</h3>
        </Media>

        <div className="work-info">
          <p className="work-fade text-fg/65 leading-relaxed">{p.description}</p>
          <div className="work-fade flex flex-wrap items-center gap-2 md:justify-end">
            {p.tech.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
            {p.url ? (
              <a href={p.url} target="_blank" rel="noreferrer" className="work-link">
                Live site <ArrowUpRight className="h-4 w-4" />
              </a>
            ) : (
              <span className="work-link is-private">
                <Lock className="h-3.5 w-3.5" /> Enterprise
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

const Works = () => {
  const root = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useScene(
    () => {
      const section = root.current!;
      const track = trackRef.current!;
      const q = gsap.utils.selector(root);
      const cur = q(".works-cur")[0];
      const name = q(".works-name")[0];
      const ticks = q(".works-tick");
      const glow = q(".works-glow")[0];
      const reduce = prefersReducedMotion();

      const distance = () => track.scrollWidth - window.innerWidth;

      // The cards sit off-screen inside a clipped, pinned track, so native
      // lazy-loading would only fetch each screenshot as it slides in. Start
      // fetching them all once the section is a screen away instead.
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom+=100%",
        once: true,
        onEnter: () => q<HTMLImageElement>(".work-media img").forEach((img) => (img.loading = "eager")),
      });

      // Velocity skew — cards lean into the scroll and settle back.
      const skewTo = gsap.quickSetter(q(".work-card"), "skewX", "deg");
      const clampSkew = gsap.utils.clamp(-7, 7);
      const proxy = { skew: 0 };

      const scrollTween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: ".works-pin",
          start: "top top",
          end: () => "+=" + distance(),
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            gsap.set(q(".works-fill"), { scaleX: self.progress });
            if (reduce) return;
            const skew = clampSkew(self.getVelocity() / -320);
            if (Math.abs(skew) > Math.abs(proxy.skew)) {
              proxy.skew = skew;
              gsap.to(proxy, {
                skew: 0,
                duration: 0.9,
                ease: "power3",
                overwrite: true,
                onUpdate: () => skewTo(proxy.skew),
              });
            }
          },
        },
      });

      const activate = (i: number) => {
        const p = PROJECTS[i];
        cur.textContent = pad(i + 1);
        name.textContent = p.name;
        ticks.forEach((t, k) => t.classList.toggle("is-active", k === i));
        gsap.to(glow, { "--g1": p.gradient[1], "--g0": p.gradient[0], duration: 1, ease: "power2.out" });
      };

      // Intro heading
      const introSplit = SplitText.create(q(".wi-split"), {
        type: "chars",
        charsClass: "tchar",
        mask: "chars",
      });
      gsap.from(introSplit.chars, {
        yPercent: 115,
        rotate: 8,
        stagger: 0.03,
        duration: 1.3,
        ease: "expo.out",
        scrollTrigger: { trigger: section, start: "top 60%", toggleActions: "play none none reverse" },
      });

      q(".work-panel").forEach((panel, i) => {
        const inContainer = { trigger: panel, containerAnimation: scrollTween };

        gsap.fromTo(
          panel.querySelector(".work-media"),
          { clipPath: "inset(6% 0% 6% 100% round 28px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 28px)",
            ease: "none",
            scrollTrigger: { ...inContainer, start: "left 100%", end: "left 35%", scrub: true },
          }
        );

        gsap.fromTo(
          panel.querySelector(".work-media-inner"),
          { xPercent: -7 },
          {
            xPercent: 7,
            ease: "none",
            scrollTrigger: { ...inContainer, start: "left right", end: "right left", scrub: true },
          }
        );

        const titleSplit = SplitText.create(panel.querySelector(".work-title"), {
          type: "chars",
          charsClass: "tchar",
          mask: "chars",
        });
        gsap.from(titleSplit.chars, {
          yPercent: 115,
          rotate: 10,
          stagger: 0.025,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { ...inContainer, start: "left 62%", toggleActions: "play none none reverse" },
        });

        gsap.from(panel.querySelectorAll(".work-fade, .work-media-top"), {
          y: 30,
          opacity: 0,
          stagger: 0.08,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { ...inContainer, start: "left 60%", toggleActions: "play none none reverse" },
        });

        ScrollTrigger.create({
          ...inContainer,
          start: "left 55%",
          end: "right 55%",
          onToggle: (self) => self.isActive && activate(i),
        });
      });

      gsap.from(q(".works-outro > *"), {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: q(".works-outro")[0],
          containerAnimation: scrollTween,
          start: "left 70%",
          toggleActions: "play none none reverse",
        },
      });

      activate(0);
    },
    root
  );

  return (
    <section id="works" ref={root} className="chapter relative">
      <div className="works-pin relative h-[100svh] overflow-hidden">
        <div className="works-glow" aria-hidden />

        <div ref={trackRef} className="works-track">
          <div className="works-intro">
            <ChapterLabel num="03" title="The Work" />
            <h2 className="works-intro-title font-display" aria-label="Selected works">
              <span className="wi-split block text-outline">Selected</span>
              <span className="block">
                <span className="wi-split">Works</span>
                <sup className="works-count font-mono">({pad(PROJECTS.length)})</sup>
              </span>
            </h2>
            <p className="mt-8 max-w-md text-fg/60 text-lg leading-relaxed">
              Enterprise dashboards, AI in the field, brand stories and side quests — the things
              I&apos;ve built so far.
            </p>
            <div className="mt-10 flex items-center gap-4 mono-label text-fg/50">
              Scroll sideways
              <span className="works-arrow">
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>

          {PROJECTS.map((p, i) => (
            <WorkPanel key={p.name} p={p} i={i} />
          ))}

          <div className="works-outro">
            <p className="mono-label text-fg/45">The vault</p>
            <h3 className="font-serif text-[clamp(44px,6vw,104px)] leading-[0.95]">
              That&apos;s not <em className="text-grad">all.</em>
            </h3>
            <p className="max-w-sm text-fg/60 text-lg">
              More experiments, clones and late-night ideas live on GitHub.
            </p>
            <div className="flex flex-wrap gap-3">
              <Magnetic>
                <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="pill-btn pill-btn--primary">
                  GitHub <ArrowUpRight className="h-4 w-4" />
                </a>
              </Magnetic>
            </div>
          </div>
        </div>

        <div className="works-hud">
          <span className="mono-label hidden md:inline text-fg/50">03 — Works</span>
          <div className="relative flex-1">
            <div className="h-px bg-white/10">
              <div className="works-fill absolute inset-x-0 top-0 h-px origin-left" />
            </div>
            <div className="absolute inset-x-0 -top-[3px] hidden md:flex justify-around">
              {PROJECTS.map((p) => (
                <span key={p.name} className="works-tick" />
              ))}
            </div>
          </div>
          <span className="mono-label works-name hidden sm:inline text-fg/70 min-w-[9ch] text-right" />
          <span className="mono-label tabular-nums">
            <span className="works-cur">01</span>
            <span className="text-fg/35"> / {pad(PROJECTS.length)}</span>
          </span>
        </div>
      </div>
    </section>
  );
};

export default Works;
