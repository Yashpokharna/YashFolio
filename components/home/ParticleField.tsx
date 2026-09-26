import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  fill: string;
  life: number;
  decay: number;
}

const COLORS = ["103,232,249", "103,232,249", "96,165,250", "255,255,255"];
const LINK_DIST = 90;
const LINK_DIST2 = LINK_DIST * LINK_DIST;
const REPEL_DIST = 130;
// Links are drawn in a few opacity bands, one path each, instead of one
// stroke call per pair.
const BANDS = 4;

const spawn = (w: number, h: number, anywhere: boolean): Particle => ({
  x: Math.random() * w,
  y: anywhere ? Math.random() * h : Math.random() < 0.5 ? -5 : h + 5,
  vx: (Math.random() - 0.5) * 0.3,
  vy: (Math.random() - 0.5) * 0.3,
  size: Math.random() * 1.6 + 0.3,
  alpha: Math.random() * 0.5 + 0.15,
  fill: `rgb(${COLORS[Math.floor(Math.random() * COLORS.length)]})`,
  life: 1,
  decay: Math.random() * 0.001 + 0.0002,
});

// The constellation from the old hero: drifting points that link up and
// scatter away from the pointer.
const ParticleField = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let pts: Particle[] = [];
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(120, Math.round((w * h) / 13000));
      pts = Array.from({ length: count }, () => spawn(w, h, true));
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    window.addEventListener("pointermove", onMove);

    let visible = true;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(canvas);

    let raf = 0;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!visible || document.hidden) return;
      ctx.clearRect(0, 0, w, h);

      ctx.lineWidth = 0.6;
      ctx.strokeStyle = "#67e8f9";
      const bands = Array.from({ length: BANDS }, () => new Path2D());
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST2) {
            const k = Math.min(BANDS - 1, Math.floor((Math.sqrt(d2) / LINK_DIST) * BANDS));
            bands[k].moveTo(a.x, a.y);
            bands[k].lineTo(b.x, b.y);
          }
        }
      }
      bands.forEach((path, k) => {
        ctx.globalAlpha = (1 - (k + 0.5) / BANDS) * 0.14;
        ctx.stroke(path);
      });

      for (const p of pts) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_DIST && dist > 0) {
          const force = ((REPEL_DIST - dist) / REPEL_DIST) * 0.06;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        if (p.life <= 0 || p.x < -10 || p.x > w + 10 || p.y < -10 || p.y > h + 10) {
          Object.assign(p, spawn(w, h, false));
        }
        ctx.globalAlpha = p.alpha * p.life;
        ctx.fillStyle = p.fill;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
};

export default ParticleField;
