import { useEffect, useRef, useState } from "react";
import {
  gsap,
  ScrollSmoother,
  ScrollTrigger,
  useGSAP,
  scrollToId,
} from "@/lib/gsap";
import { useApp } from "../../context/AppContext";
import { EMAIL, MENULINKS, RESUME } from "../../constants";
import Logo from "./Logo";
import { SOCIALS } from "./icons";

const Header = () => {
  const { ready } = useApp();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuTl = useRef<gsap.core.Timeline | null>(null);
  const firstRun = useRef(true);

  // Tuck the header away while scrolling down, bring it back on the way up.
  useGSAP(() => {
    const hide = gsap.to(headerRef.current, {
      yPercent: -130,
      duration: 0.5,
      ease: "power3.inOut",
      paused: true,
    });
    ScrollTrigger.create({
      start: 300,
      end: "max",
      refreshPriority: -1,
      onUpdate: (self) => (self.direction === 1 ? hide.play() : hide.reverse()),
      onLeaveBack: () => hide.reverse(),
    });
  });

  useGSAP(
    () => {
      if (!ready) return;
      gsap.from(".hd-item", {
        y: -40,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.08,
        delay: 0.7,
      });
    },
    { dependencies: [ready], scope: headerRef }
  );

  useGSAP(
    () => {
      const q = gsap.utils.selector(menuRef);
      menuTl.current = gsap
        .timeline({ paused: true, defaults: { ease: "expo.inOut" } })
        .set(menuRef.current, { visibility: "visible" })
        .fromTo(
          menuRef.current,
          { clipPath: "circle(0% at 94% 5%)" },
          { clipPath: "circle(150% at 94% 5%)", duration: 1.1 }
        )
        .fromTo(
          q(".mn-link-inner"),
          { yPercent: 115 },
          { yPercent: 0, duration: 1, ease: "expo.out", stagger: 0.05 },
          0.35
        )
        .fromTo(
          q(".mn-fade"),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "expo.out", stagger: 0.06 },
          0.55
        );
    },
    { scope: menuRef }
  );

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const smoother = ScrollSmoother.get();
    if (open) {
      menuTl.current?.timeScale(1).play();
      smoother?.paused(true);
    } else {
      menuTl.current?.timeScale(1.7).reverse();
      if (ready) smoother?.paused(false);
    }
  }, [open, ready]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    setTimeout(() => scrollToId(id), 350);
  };

  return (
    <>
      <header ref={headerRef} className="site-header">
        <a
          href="#home"
          className="hd-item flex items-center gap-3"
          onClick={(e) => {
            e.preventDefault();
            go("home");
          }}
          aria-label="Yash Pokharna — back to top"
        >
          <Logo className="h-7 w-auto" />
        </a>

        <button
          className={`hd-item menu-btn ${open ? "is-open" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="site-menu"
        >
          <span className="menu-btn__lines" aria-hidden>
            <i />
            <i />
          </span>
        </button>
      </header>

      <div id="site-menu" ref={menuRef} className="site-menu" aria-hidden={!open}>
        <div className="site-menu__glow" />
        <div className="relative h-full grid lg:grid-cols-[1.5fr_1fr] gap-10 px-pad pt-28 pb-10 overflow-y-auto">
          <nav aria-label="Chapters">
            <ul className="mn-list">
              {MENULINKS.map((link, i) => (
                <li key={link.ref}>
                  <a
                    href={`#${link.ref}`}
                    className="mn-link"
                    tabIndex={open ? 0 : -1}
                    onClick={(e) => {
                      e.preventDefault();
                      go(link.ref);
                    }}
                  >
                    <span className="mn-num mono-label">{String(i).padStart(2, "0")}</span>
                    <span className="mn-link-mask">
                      <span className="mn-link-inner font-display">{link.name}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <aside className="flex flex-col justify-end gap-10 lg:pb-4">
            <div className="mn-fade">
              <p className="mono-label text-fg/40 mb-3">Say hello</p>
              <a href={`mailto:${EMAIL}`} tabIndex={open ? 0 : -1} className="text-xl md:text-2xl font-display link-underline">
                {EMAIL}
              </a>
            </div>
            <div className="mn-fade">
              <p className="mono-label text-fg/40 mb-3">Elsewhere</p>
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {SOCIALS.map(({ name, href }) => (
                  <li key={name}>
                    <a href={href} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1} className="text-lg link-underline">
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mn-fade">
              <a href={RESUME} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1} className="pill-btn">
                Resume.pdf ↗
              </a>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default Header;
