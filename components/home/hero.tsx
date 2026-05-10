"use client";

import React, {
  MutableRefObject,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { gsap } from "gsap";
import { Github, Linkedin, Instagram } from "lucide-react";
import { EMAIL, MENULINKS, SOCIAL_LINKS } from "../../constants";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  life: number;
  decay: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const ROLES = [
  "Frontend Engineer",
  "Full Stack Dev",
  "UI / UX Craftsman",
  "Mobile App Developer",
  "Creative Developer",
];

const BOOT_MESSAGES = [
  "sys.init() → loading portfolio...",
  "env: NODE_ENV=production",
  "status: ready to ship 🚀",
];

const STACK = [
  { label: "React", color: "#61dafb" },
  { label: "Next.js", color: "#ffffff" },
  { label: "Tailwind", color: "#38bdf8" },
  { label: "TypeScript", color: "#3178c6" },
  { label: "Node.js", color: "#68a063" },
  { label: "Figma", color: "#a855f7" },
  { label: "GSAP", color: "#88ce02" },
  { label: "Flutter", color: "#54c5f8" },
];

const GLITCH_CHARS = "!@#$%^&*<>?/\\|{}[]~";

const HUD_BARS = [
  { label: "Experience", value: "1.5 years", width: "45%" },
  { label: "AI / LLM", value: "API-integrated", width: "60%" },
  { label: "Code", value: "Type-safe", width: "80%" },
];

const HUD_TAGS = [
  { label: "Frontend Dev", active: true },
  { label: "Full Stack", active: true },
  { label: "UI / UX", active: true },
  { label: "Flutter / Mobile", active: true },
  { label: "AI Integrated", active: false },
];

// ─── Particle helpers ─────────────────────────────────────────────────────────
function createParticle(W: number, H: number, init = false): Particle {
  const colors = ["139,92,246", "139,92,246", "236,72,153", "255,255,255"];
  return {
    x: Math.random() * W,
    y: init ? Math.random() * H : Math.random() < 0.5 ? -5 : H + 5,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    size: Math.random() * 1.5 + 0.3,
    alpha: Math.random() * 0.4 + 0.1,
    color: colors[Math.floor(Math.random() * colors.length)],
    life: 1,
    decay: Math.random() * 0.001 + 0.0002,
  };
}

// ─── SVG Social Icons ─────────────────────────────────────────────────────────
const GitHubIcon = () => <Github width={20} height={20} />;
const LinkedInIcon = () => <Linkedin width={20} height={20} />;
const InstagramIcon = () => <Instagram width={20} height={20} />;

const BehanceIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.5 4.5h3.8c1.7 0 3.1 1.4 3.1 3.1 0 1-.5 1.9-1.2 2.4.9.5 1.5 1.5 1.5 2.6 0 1.7-1.4 3.1-3.1 3.1H6.5V4.5zm2 4.5h1.8c.6 0 1.1-.5 1.1-1.1s-.5-1.1-1.1-1.1H8.5V9zm0 4.7h1.8c.6 0 1.1-.5 1.1-1.1 0-.6-.5-1.1-1.1-1.1H8.5v2.2zM15.5 6h5v1.5h-5V6zm.5 5.5c0-2.2 1.8-4 4-4s4 1.8 4 4c0 .3 0 .5-.1.8h-6c.3 1.1 1.3 1.9 2.4 1.9.8 0 1.5-.4 2-.9l1.3 1c-.8.9-2 1.5-3.3 1.5-2.2 0-4-1.8-4-4zm6.2-.8c-.3-1-1.2-1.7-2.2-1.7s-1.9.7-2.2 1.7h4.4z" />
  </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────
const HeroSection = React.memo(() => {
  const sectionRef: MutableRefObject<HTMLElement | null> = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Role cycling
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleVisible, setRoleVisible] = useState(true);

  // Boot text
  const [bootText, setBootText] = useState("");
  const [bootDone, setBootDone] = useState(false);

  // Glitch
  const nameRef = useRef<HTMLSpanElement | null>(null);

  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ── Particle system ────────────────────────────────────────────
  const initParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    particlesRef.current = Array.from({ length: 120 }, () =>
      createParticle(W, H, true)
    );
  }, []);

  const animateParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    ctx.clearRect(0, 0, W, H);

    const pts = particlesRef.current;

    // Connection lines
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 80) {
          ctx.save();
          ctx.globalAlpha = (1 - d / 80) * 0.08;
          ctx.strokeStyle = "#8b5cf6";
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }

    // Particles
    pts.forEach((p) => {
      const dx = p.x - mx;
      const dy = p.y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = ((120 - dist) / 120) * 0.4;
        p.vx += (dx / dist) * force * 0.1;
        p.vy += (dy / dist) * force * 0.1;
      }
      p.vx *= 0.98;
      p.vy *= 0.98;
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;

      if (
        p.life <= 0 ||
        p.x < -10 ||
        p.x > W + 10 ||
        p.y < -10 ||
        p.y > H + 10
      ) {
        Object.assign(p, createParticle(W, H, false));
      }

      ctx.save();
      ctx.globalAlpha = p.alpha * p.life;
      ctx.fillStyle = `rgb(${p.color})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    rafRef.current = requestAnimationFrame(animateParticles);
  }, []);

  // ── Name glitch handler ────────────────────────────────────────
  const handleNameGlitch = useCallback(() => {
    const el = nameRef.current;
    if (!el) return;
    const chars = Array.from(el.querySelectorAll<HTMLSpanElement>(".hero-char"));
    chars.forEach((c, i) => {
      if (c.dataset.orig === " ") return;
      const orig = c.dataset.orig ?? c.textContent ?? "";
      let count = 0;
      const interval = setInterval(() => {
        c.textContent =
          GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        c.style.color =
          Math.random() < 0.5 ? "#a78bfa" : "#f472b6";
        count++;
        if (count > 6) {
          clearInterval(interval);
          c.textContent = orig;
          c.style.color = "";
        }
      }, 40 + i * 15);
    });
  }, []);

  // ── Canvas setup ───────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    initParticles();
    rafRef.current = requestAnimationFrame(animateParticles);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [initParticles, animateParticles]);

  // ── Boot text typewriter ───────────────────────────────────────
  useEffect(() => {
    let msgIdx = 0;
    let charIdx = 0;
    let timer: ReturnType<typeof setTimeout>;

    const type = () => {
      if (msgIdx >= BOOT_MESSAGES.length) {
        setBootText(BOOT_MESSAGES[BOOT_MESSAGES.length - 1]);
        setBootDone(true);
        return;
      }
      const msg = BOOT_MESSAGES[msgIdx];
      if (charIdx <= msg.length) {
        setBootText(msg.substring(0, charIdx));
        charIdx++;
        timer = setTimeout(type, 40 + Math.random() * 20);
      } else {
        timer = setTimeout(() => {
          setBootText("");
          charIdx = 0;
          msgIdx++;
          type();
        }, 700);
      }
    };

    const startTimer = setTimeout(type, 500);
    return () => {
      clearTimeout(startTimer);
      clearTimeout(timer);
    };
  }, []);

  // ── Role cycling ───────────────────────────────────────────────
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleVisible(false);
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
        setRoleVisible(true);
      }, 400);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // ── Initial glitch on load ───────────────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => {
      handleNameGlitch();
    }, 800);
    return () => clearTimeout(timer);
  }, [handleNameGlitch]);

  // ── GSAP entrance animations ───────────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Corners
      tl.to(".hero-corner", {
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      });

      // Name block
      tl.fromTo(
        ".hero-name-block",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
        "-=0.3"
      );

      // Role display
      tl.fromTo(
        ".hero-role-display",
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      );

      // Tagline words
      tl.fromTo(
        ".hero-tword",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
        },
        "-=0.2"
      );

      // CTA buttons — spring up from below, overshoot, settle
      tl.fromTo(
        ".hero-cta-btn",
        { y: 40, opacity: 0, scale: 0.8, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "elastic.out(1, 0.5)",
          stagger: 0.15,
        },
        "-=0.1"
      );

      // CTA glow pulse after landing
      tl.fromTo(
        ".hero-cta-btn",
        { boxShadow: "0 0 0px rgba(139,92,246,0)" },
        {
          boxShadow: "0 0 28px rgba(139,92,246,0.35)",
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.15,
          yoyo: true,
          repeat: 1,
        },
        "-=0.3"
      );

      // HUD panels
      tl.fromTo(
        ".hero-hud",
        { opacity: 0, x: (i) => i === 0 ? -20 : 20 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );

      // Social cards — fan in from below with blur + staggered elastic bounce
      tl.fromTo(
        ".hero-bottom-bar a",
        { y: 60, opacity: 0, scale: 0.6, filter: "blur(12px)", rotateX: 45 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          rotateX: 0,
          duration: 1,
          ease: "elastic.out(1, 0.55)",
          stagger: {
            each: 0.1,
            from: "center",
          },
        },
        "-=0.4"
      );

      // Bottom bar wrapper fade (just opacity, cards handle the motion)
      tl.set(".hero-bottom-bar", { opacity: 1 }, "-=1");

      // Scroll indicator
      tl.fromTo(
        ".hero-scroll-indicator",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.6"
      );

      // HUD bars animate after everything else
      tl.call(() => {
        barRefs.current.forEach((bar, i) => {
          if (!bar) return;
          const widths = ["45%", "60%", "80%"];
          gsap.to(bar, {
            width: widths[i],
            duration: 1.4,
            ease: "power2.out",
            delay: i * 0.15,
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const { ref: heroSectionRef } = MENULINKS[0];

  return (
    <section
      id={heroSectionRef}
      ref={sectionRef as MutableRefObject<HTMLElement>}
      className="relative w-full overflow-hidden"
      style={{
        minHeight: "100vh",
        background: "#111827",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Courier New', monospace",
      }}
    >
      {/* ── Particle canvas ── */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      />

      {/* ── Scanlines ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
          pointerEvents: "none",
        }}
      />

      {/* ── Vignette ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(17, 24, 39, 0.85) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Status bar ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          zIndex: 20,
          background: "rgba(255,255,255,0.03)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            background:
              "linear-gradient(90deg, #7c3aed, #ec4899, #7c3aed)",
            backgroundSize: "200% 100%",
            animation: "heroStatusLoad 2s ease 0.5s forwards, heroShimmer 3s linear 2.5s infinite",
            width: 0,
          }}
        />
      </div>

      {/* ── Corner brackets ── */}
      {(["tl", "tr", "bl", "br"] as const).map((pos) => (
        <div
          key={pos}
          className="hero-corner"
          style={{
            position: "absolute",
            width: 40,
            height: 40,
            zIndex: 20,
            opacity: 0,
            ...(pos === "tl" ? { top: 24, left: 24 } : {}),
            ...(pos === "tr" ? { top: 24, right: 24, transform: "scaleX(-1)" } : {}),
            ...(pos === "bl" ? { bottom: 24, left: 24, transform: "scaleY(-1)" } : {}),
            ...(pos === "br" ? { bottom: 24, right: 24, transform: "scale(-1,-1)" } : {}),
          }}
        >
          <svg viewBox="0 0 40 40" fill="none" width="100%" height="100%">
            <path
              d="M2 20 L2 2 L20 2"
              stroke={pos === "bl" || pos === "br" ? "rgba(236,72,153,0.4)" : "rgba(139,92,246,0.5)"}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      ))}

      {/* ── HUD Left ── */}
      {!isMobile && (
      <div
        className="hero-hud"
        style={{
          position: "absolute",
          left: 32,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          gap: 24,
          opacity: 0,
        }}
      >
        {HUD_BARS.map((item, i) => (
          <div
            key={item.label}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              borderLeft: "1px solid rgba(139,92,246,0.3)",
              paddingLeft: 12,
            }}
          >
            <span
              style={{
                fontSize: 9,
                letterSpacing: "0.2em",
                color: "rgba(139,92,246,0.5)",
                textTransform: "uppercase",
              }}
            >
              {item.label}
            </span>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>
              {item.value}
            </span>
            <div
              style={{
                width: 60,
                height: 2,
                background: "rgba(255,255,255,0.08)",
                borderRadius: 2,
                marginTop: 4,
                overflow: "hidden",
              }}
            >
              <div
                ref={(el) => { barRefs.current[i] = el; }}
                style={{
                  height: "100%",
                  background: "linear-gradient(90deg, #7c3aed, #ec4899)",
                  borderRadius: 2,
                  width: 0,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      )}

      {/* ── HUD Right ── */}
      {!isMobile && (
      <div
        className="hero-hud"
        style={{
          position: "absolute",
          right: 32,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          alignItems: "flex-end",
          opacity: 0,
        }}
      >
        {HUD_TAGS.map((tag) => (
          <span
            key={tag.label}
            style={{
              fontSize: 9,
              letterSpacing: "0.15em",
              color: tag.active ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            {tag.label}
            <span
              style={{
                display: "inline-block",
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: tag.active ? "#ec4899" : "#7c3aed",
                boxShadow: tag.active ? "0 0 8px #ec4899" : "0 0 6px #7c3aed",
              }}
            />
          </span>
        ))}
      </div>
      )}

      {/* ── Main content ── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          width: "100%",
          maxWidth: 860,
          padding: isMobile ? "0 24px" : "0 140px",
        }}
      >
        {/* Boot text */}
        <div
          style={{
            fontSize: 10,
            letterSpacing: "0.2em",
            color: "rgba(124,58,237,0.7)",
            textTransform: "uppercase",
            marginBottom: "2rem",
            height: 14,
            overflow: "hidden",
            fontFamily: "'Courier New', monospace",
          }}
        >
          {bootText}
          {!bootDone && (
            <span
              style={{
                display: "inline-block",
                width: 6,
                height: 11,
                background: "#7c3aed",
                marginLeft: 2,
                verticalAlign: "bottom",
                animation: "heroBlink 1s step-end infinite",
              }}
            />
          )}
        </div>

        {/* Name */}
        <div className="hero-name-block" style={{ marginBottom: "1rem", opacity: 0 }}>
          {/* Glitch name */}
          <span
            ref={nameRef}
            onMouseEnter={handleNameGlitch}
            style={{
              fontSize: "clamp(42px, 8vw, 88px)",
              fontWeight: 800,
              letterSpacing: "-0.05em",
              lineHeight: 1,
              fontFamily: "'Raleway', sans-serif",
              color: "#fff",
              display: "inline-block",
              cursor: "default",
              userSelect: "none",
              whiteSpace: "nowrap",
            }}
          >
            {"Yash Pokharna".split("").map((ch, i) => (
              <span
                key={i}
                className="hero-char"
                data-orig={ch}
                style={{
                  display: "inline-block",
                  transition: "color 0.05s",
                  color: ch === " " ? "transparent" : undefined,
                }}
              >
                {ch}
              </span>
            ))}
          </span>
        </div>

        {/* Role cycling */}
        <div
          className="hero-role-display"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            margin: "1.2rem 0 1.5rem",
            opacity: 0,
            minHeight: 28,
          }}
        >
          <span style={{ fontSize: 12, letterSpacing: "0.15em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>
            ./
          </span>
          <div style={{ overflow: "hidden", height: 24, minWidth: 220, position: "relative" }}>
            <span
              style={{
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                background: "linear-gradient(90deg, #a78bfa, #f472b6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                display: "block",
                transform: roleVisible ? "translateY(0)" : "translateY(-100%)",
                transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
                fontFamily: "'Courier New', monospace",
              }}
            >
              {ROLES[roleIndex]}
            </span>
          </div>
          <span style={{ fontSize: 12, letterSpacing: "0.15em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>
            --
          </span>
        </div>

        {/* Tagline */}
        <h1
          style={{
            fontSize: "clamp(28px, 5vw, 54px)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginBottom: "2rem",
            fontFamily: "'Raleway', sans-serif",
            color: "rgba(255,255,255,0.85)",
          }}
        >
          {["The gap between", "idea", "and product?", "That's me."].map(
            (word, i) => (
              <React.Fragment key={word}>
                <span
                  className="hero-tword"
                  style={{
                    display: "inline-block",
                    opacity: 0,
                    marginRight: "0.25em",
                    ...(i === 1 || i === 3
                      ? {
                        background:
                          "linear-gradient(120deg, #8b5cf6, #ec4899, #8b5cf6)",
                        backgroundSize: "200%",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        animation: "heroGradShift 4s ease-in-out infinite",
                      }
                      : {}),
                  }}
                >
                  {word}
                </span>
              </React.Fragment>
            )
          )}
        </h1>

        {/* Spacer */}
        <div style={{ marginBottom: "1rem" }} />

        {/* CTA buttons */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          <a
            href={`mailto:${EMAIL}`}
            className="hero-cta-btn"
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              padding: "12px 28px",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#fff",
              textDecoration: "none",
              fontFamily: "'Courier New', monospace",
              border: "1.5px solid rgba(139,92,246,0.4)",
              borderRadius: 6,
              background: "rgba(139,92,246,0.08)",
              transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
              opacity: 0,
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(139,92,246,0.7)";
              el.style.background = "rgba(139,92,246,0.12)";
              el.style.transform = "translateY(-2px)";
              el.style.boxShadow = "0 8px 32px rgba(139,92,246,0.2)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(139,92,246,0.4)";
              el.style.background = "rgba(139,92,246,0.08)";
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "none";
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Get in touch
          </a>

          <a
            href="/Yash_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="hero-cta-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "12px 28px",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              textDecoration: "none",
              fontFamily: "'Courier New', monospace",
              border: "1.5px solid rgba(255,255,255,0.1)",
              borderRadius: 6,
              transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
              background: "rgba(255,255,255,0.02)",
              opacity: 0,
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(255,255,255,0.25)";
              el.style.color = "rgba(255,255,255,0.9)";
              el.style.background = "rgba(255,255,255,0.05)";
              el.style.transform = "translateY(-2px)";
              el.style.boxShadow = "0 8px 32px rgba(255,255,255,0.08)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(255,255,255,0.1)";
              el.style.color = "rgba(255,255,255,0.5)";
              el.style.background = "rgba(255,255,255,0.02)";
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "none";
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Resume.pdf
          </a>
        </div>
      </div>

      {/* ── Bottom social bar ── */}
      <div
        className="hero-bottom-bar"
        style={{
          position: "absolute",
          bottom: 28,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          gap: isMobile ? 8 : 16,
          opacity: 0,
        }}
      >
        {[
          { href: SOCIAL_LINKS.github, icon: <GitHubIcon />, title: "GitHub", g1: "#374151", g2: "#111827" },
          { href: SOCIAL_LINKS.linkedin, icon: <LinkedInIcon />, title: "LinkedIn", g1: "#2563eb", g2: "#1e3a8a" },
          { href: SOCIAL_LINKS.instagram, icon: <InstagramIcon />, title: "Instagram", g1: "#ec4899", g2: "#a855f7" },
          { href: "https://behance.net/yashpokharna", icon: <BehanceIcon />, title: "Behance", g1: "#3b82f6", g2: "#1d4ed8" },
        ].map(({ href, icon, title, g1, g2 }) => (
          <a
            key={title}
            href={href}
            target="_blank"
            rel="noreferrer"
            title={title}
            style={{ position: "relative", width: isMobile ? 68 : 96, display: "flex", textDecoration: "none", opacity: 0 }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              const card = el.querySelector('[data-card]') as HTMLElement;
              const glow = el.querySelector('[data-glow]') as HTMLElement;
              const iconEl = el.querySelector('[data-icon]') as HTMLElement;
              const shimmer = el.querySelector('[data-shimmer]') as HTMLElement;
              const label = el.querySelector('[data-label]') as HTMLElement;
              if (card) { card.style.transform = "scale(1.1)"; }
              if (glow) { glow.style.opacity = "0.2"; }
              if (iconEl) { iconEl.style.transform = "scale(1.25) rotate(12deg)"; iconEl.style.color = "rgba(255,255,255,1)"; }
              if (shimmer) { shimmer.style.transform = "translateX(200%) skewX(12deg)"; }
              if (label) { label.style.color = "rgba(255,255,255,1)"; }
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              const card = el.querySelector('[data-card]') as HTMLElement;
              const glow = el.querySelector('[data-glow]') as HTMLElement;
              const iconEl = el.querySelector('[data-icon]') as HTMLElement;
              const shimmer = el.querySelector('[data-shimmer]') as HTMLElement;
              const label = el.querySelector('[data-label]') as HTMLElement;
              if (card) { card.style.transform = "scale(1)"; }
              if (glow) { glow.style.opacity = "0"; }
              if (iconEl) { iconEl.style.transform = "scale(1) rotate(0deg)"; iconEl.style.color = "rgba(203,213,225,0.7)"; }
              if (shimmer) { shimmer.style.transform = "translateX(-100%) skewX(12deg)"; }
              if (label) { label.style.color = "rgba(203,213,225,0.7)"; }
            }}
          >
            <div
              data-card="true"
              style={{
                position: "relative",
                overflow: "hidden",
                padding: 16,
                borderRadius: 16,
                background: "transparent",
                transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
                width: "100%",
              }}
            >
              {/* Per-platform gradient glow on hover */}
              <div
                data-glow="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: 0,
                  background: `linear-gradient(135deg, ${g1}, ${g2})`,
                  filter: "blur(24px)",
                  transition: "opacity 0.5s",
                  pointerEvents: "none",
                }}
              />

              {/* Content */}
              <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div
                  data-icon="true"
                  style={{ color: "rgba(203,213,225,0.7)", transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)" }}
                >
                  {icon}
                </div>
                <span
                  data-label="true"
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    textTransform: "capitalize",
                    transition: "color 0.3s",
                    color: "rgba(203,213,225,0.7)",
                    textAlign: "center",
                    fontFamily: "'Courier New', monospace",
                  }}
                >
                  {title.toLowerCase()}
                </span>
              </div>

              {/* Shimmer sweep */}
              <div
                data-shimmer="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  transform: "translateX(-100%) skewX(12deg)",
                  background: "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)",
                  transition: "transform 1s cubic-bezier(0.16,1,0.3,1)",
                  pointerEvents: "none",
                }}
              />
            </div>
          </a>
        ))}

      </div>

      {/* ── Scroll indicator ── */}
      <div
        className="hero-scroll-indicator"
        style={{
          position: "absolute",
          bottom: 28,
          right: 32,
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          gap: 10,
          opacity: 0,
        }}
      >
        <div style={{ width: 1, height: 50, background: "rgba(255,255,255,0.08)", position: "relative", overflow: "hidden" }}>
          <div
            style={{
              position: "absolute",
              top: "-40%",
              width: 1,
              height: "40%",
              background: "linear-gradient(to bottom, transparent, #7c3aed)",
              animation: "heroScrollRun 2s ease-in-out infinite",
            }}
          />
        </div>
        <span
          style={{
            fontSize: 9,
            letterSpacing: "0.25em",
            color: "rgba(255,255,255,0.15)",
            textTransform: "uppercase",
            writingMode: "vertical-rl",
          }}
        >
          Scroll
        </span>
      </div>

      {/* ── Global keyframes ── */}
      <style>{`
        @keyframes heroStatusLoad { to { width: 100%; } }
        @keyframes heroShimmer { 0%{background-position:0% 0%} 100%{background-position:200% 0%} }
        @keyframes heroBlink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes heroGradShift { 0%,100%{background-position:0%} 50%{background-position:100%} }
        @keyframes heroScrollRun { 0%{top:-40%} 100%{top:140%} }
      `}</style>
    </section>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;