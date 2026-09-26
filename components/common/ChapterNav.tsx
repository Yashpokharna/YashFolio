import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, scrollToId } from "@/lib/gsap";
import { MENULINKS } from "../../constants";
import { useApp } from "../../context/AppContext";

// Fixed left-edge table of contents; the active chapter's tick stretches.
const ChapterNav = () => {
  const [active, setActive] = useState(0);
  const navRef = useRef<HTMLElement>(null);
  const { ready } = useApp();

  useGSAP(() => {
    MENULINKS.forEach((link, i) => {
      ScrollTrigger.create({
        trigger: `#${link.ref}`,
        start: "top center",
        end: "bottom center",
        refreshPriority: -1,
        onToggle: (self) => self.isActive && setActive(i),
      });
    });
  });

  useGSAP(
    () => {
      if (!ready) return;
      gsap.from(".cn-item", {
        x: -30,
        opacity: 0,
        stagger: 0.06,
        duration: 1,
        ease: "expo.out",
        delay: 1.2,
      });
    },
    { dependencies: [ready], scope: navRef }
  );

  return (
    <nav ref={navRef} className="chapter-nav" aria-label="Story progress">
      {MENULINKS.map((link, i) => (
        <button
          key={link.ref}
          className={`cn-item ${i === active ? "is-active" : ""}`}
          onClick={() => scrollToId(link.ref)}
        >
          <span className="cn-tick" />
          <span className="cn-label mono-label">
            {String(i).padStart(2, "0")} {link.name}
          </span>
        </button>
      ))}
    </nav>
  );
};

export default ChapterNav;
