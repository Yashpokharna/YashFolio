import { useRef, useState } from "react";
import { ArrowUp, ArrowUpRight, Check, Copy } from "lucide-react";
import { gsap, ScrollTrigger, isTouch, scrollToId } from "@/lib/gsap";
import { useScene } from "../../context/AppContext";
import { EMAIL } from "../../constants";
import { ChapterLabel, Magnetic, SplitReveal, revealOnScroll } from "../common/ui";
import { SOCIALS } from "../common/icons";

const SLIDE_A = "User Interface Design ✦ User Experience Design ✦ ";
const SLIDE_B = "Frontend Development ✦ Motion Graphics ✦ AI Integration ✦ ";

const Contact = () => {
  const root = useRef<HTMLElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
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
      ScrollTrigger.create({
        trigger: ".footer-mark",
        start: "top bottom",
        end: "bottom top",
        toggleClass: "is-live",
      });

      revealOnScroll(root.current);

      // A soft light follows the pointer across the wordmark while it's near.
      const section = root.current;
      const mark = markRef.current;
      if (!section || !mark || isTouch()) return;

      gsap.set(mark, { "--glow": 0 });
      const glow = gsap.quickTo(mark, "--glow", { duration: 0.6, ease: "power2.out" });
      const onMove = (e: PointerEvent) => {
        const r = mark.getBoundingClientRect();
        const near = e.clientY > r.top - 160 && e.clientY < r.bottom + 60;
        if (near) {
          mark.style.setProperty("--mx", `${e.clientX - r.left}px`);
          mark.style.setProperty("--my", `${e.clientY - r.top}px`);
        }
        glow(near ? 0.6 : 0);
      };
      section.addEventListener("pointermove", onMove);
      return () => section.removeEventListener("pointermove", onMove);
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
          <ChapterLabel num="05" title="The Next Chapter" />
          <SplitReveal as="h2" className="contact-title font-display mt-8">
            Let&apos;s write the next chapter{" "}
            <span className="font-serif italic font-normal text-grad">together.</span>
          </SplitReveal>
        </div>
        <div className="flex justify-center lg:justify-end">
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

      <div className="mx-pad mt-16 flex flex-col items-center gap-4 border-y border-white/10 py-8 text-center md:flex-row md:justify-between md:text-left" data-reveal>
        <a href={`mailto:${EMAIL}`} className="contact-email font-display link-underline">
          {EMAIL}
        </a>
        <button onClick={copy} className="pill-btn">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied to clipboard" : "Copy email"}
        </button>
      </div>

      <div className="contact-socials mt-12 grid grid-cols-4 gap-2 px-pad sm:flex sm:flex-wrap sm:justify-center sm:gap-4">
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

      <footer className="relative z-10 mt-16 grid justify-items-center gap-3 px-pad pb-6 pt-10 text-center mono-label text-fg/45 md:mt-24 md:grid-cols-3 md:items-center md:justify-items-stretch md:gap-4 md:text-left">
        <span>© {new Date().getFullYear()} Yash Pokharna</span>
        <span className="md:text-center">Handcrafted with passion & precision</span>
        <button onClick={() => scrollToId("home")} className="flex items-center gap-2 uppercase md:justify-self-end hover:text-fg transition-colors">
          Back to the beginning <ArrowUp className="h-3.5 w-3.5" />
        </button>
      </footer>

      <div ref={markRef} className="footer-mark font-display" aria-hidden>
        Yash Pokharna
      </div>
    </section>
  );
};

export default Contact;
