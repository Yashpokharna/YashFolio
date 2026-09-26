import { useRef, useState } from "react";
import { ArrowUp, ArrowUpRight, Check, Copy } from "lucide-react";
import { gsap, scrollToId } from "@/lib/gsap";
import { useScene } from "../../context/AppContext";
import { EMAIL } from "../../constants";
import { ChapterLabel, LocalTime, Magnetic, SplitReveal, revealOnScroll } from "../common/ui";
import { SOCIALS } from "../common/icons";
import CurvedLoop from "./CurvedLoop";

const SLIDE_A = "User Interface Design ✦ User Experience Design ✦ ";
const SLIDE_B = "Frontend Development ✦ Motion Graphics ✦ AI Integration ✦ ";

const Contact = () => {
  const root = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useScene(
    () => {
      const band = { trigger: ".collab", start: "top bottom", end: "bottom top", scrub: true };
      gsap.to(".slide-a", { xPercent: -35, ease: "none", scrollTrigger: band });
      gsap.fromTo(".slide-b", { xPercent: -35 }, { xPercent: 0, ease: "none", scrollTrigger: band });

      gsap.fromTo(
        ".collab-strong",
        { backgroundPositionX: "0%" },
        {
          backgroundPositionX: "100%",
          ease: "none",
          scrollTrigger: { trigger: ".collab", start: "center bottom", end: "center center", scrub: true },
        }
      );

      gsap.from(".contact-orb", {
        scale: 0,
        rotate: -90,
        duration: 1.6,
        ease: "elastic.out(1, 0.6)",
        scrollTrigger: { trigger: ".contact-orb", start: "top 90%" },
      });

      gsap.from(".social-card", {
        y: 50,
        opacity: 0,
        scale: 0.85,
        stagger: 0.08,
        duration: 0.9,
        ease: "back.out(1.6)",
        scrollTrigger: { trigger: ".contact-socials", start: "top 90%" },
      });

      gsap.fromTo(
        ".footer-mark",
        { yPercent: 70 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: { trigger: ".footer-mark", start: "top bottom+=600", end: "max", scrub: true },
        }
      );

      revealOnScroll(root.current);
    },
    root
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section id="contact" ref={root} className="chapter relative overflow-hidden pt-28 md:pt-40">
      <div className="collab select-none">
        <p className="slide-a collab-slide font-display">{SLIDE_A.repeat(4)}</p>
        <h3 className="px-pad my-6 text-center font-display text-[clamp(30px,4.5vw,68px)] md:my-10">
          Interested in <span className="collab-strong font-serif italic">collaboration</span>?
        </h3>
        <p className="slide-b collab-slide font-display">{SLIDE_B.repeat(4)}</p>
      </div>

      <div className="mt-28 grid items-end gap-14 px-pad md:mt-40 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <ChapterLabel num="06" title="The Next Chapter" />
          <SplitReveal as="h2" className="contact-title font-display mt-8">
            Let&apos;s write the next chapter{" "}
            <span className="font-serif italic font-normal text-grad">together.</span>
          </SplitReveal>
        </div>
        <div className="flex lg:justify-end">
          <Magnetic strength={0.4}>
            <a href={`mailto:${EMAIL}`} className="contact-orb" data-cursor="hover">
              <span className="contact-orb__ring" aria-hidden />
              <span className="relative flex flex-col items-center gap-1">
                <ArrowUpRight className="h-8 w-8" />
                <span className="font-display text-xl">Say hello</span>
              </span>
            </a>
          </Magnetic>
        </div>
      </div>

      <div className="mx-pad mt-16 flex flex-col gap-4 border-y border-white/10 py-8 md:flex-row md:items-center md:justify-between" data-reveal>
        <a href={`mailto:${EMAIL}`} className="contact-email font-display link-underline">
          {EMAIL}
        </a>
        <button onClick={copy} className="pill-btn self-start md:self-auto">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied to clipboard" : "Copy email"}
        </button>
      </div>

      <div className="contact-socials mt-12 flex flex-wrap justify-center gap-4 px-pad">
        {SOCIALS.map(({ name, href, Icon, glow }) => (
          <a key={name} href={href} target="_blank" rel="noreferrer" className="social-card group">
            <span className={`social-card__glow bg-gradient-to-br ${glow}`} aria-hidden />
            <span className="relative z-10 flex flex-col items-center gap-2">
              <Icon className="h-5 w-5 text-fg/70 transition-all duration-500 group-hover:rotate-12 group-hover:scale-125 group-hover:text-white" />
              <span className="text-xs font-semibold text-fg/70 transition-colors group-hover:text-white">
                {name.toLowerCase()}
              </span>
            </span>
            <span className="social-card__shimmer" aria-hidden />
          </a>
        ))}
      </div>

      <div className="relative mt-8">
        <CurvedLoop text="Let's Build Something Amazing ✦ " speed={1.4} curve={320} />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent md:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent md:w-40" />
      </div>

      <footer className="relative z-10 grid gap-4 px-pad pb-6 pt-10 mono-label text-fg/45 md:grid-cols-4 md:items-center">
        <span>© {new Date().getFullYear()} Yash Pokharna</span>
        <span>Handcrafted with passion & precision</span>
        <span>
          Local time · <LocalTime seconds /> IST
        </span>
        <button onClick={() => scrollToId("home")} className="flex items-center gap-2 md:justify-self-end hover:text-fg transition-colors">
          Back to the beginning <ArrowUp className="h-3.5 w-3.5" />
        </button>
      </footer>

      <div className="footer-mark font-display" aria-hidden>
        Yash Pokharna
      </div>
    </section>
  );
};

export default Contact;
