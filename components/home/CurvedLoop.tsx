import { PointerEvent, useEffect, useId, useMemo, useRef, useState } from "react";

// Text running along a curved SVG path; drag it to fling it the other way.
const CurvedLoop = ({
  text,
  speed = 1.5,
  curve = 350,
}: {
  text: string;
  speed?: number;
  curve?: number;
}) => {
  const unit = useMemo(() => text.replace(/\s+$/, "") + " ", [text]);
  const measureRef = useRef<SVGTextElement>(null);
  const pathRef = useRef<SVGTextPathElement>(null);
  const [spacing, setSpacing] = useState(0);
  const uid = useId().replace(/:/g, "");
  const pathId = `curve-${uid}`;

  const drag = useRef(false);
  const lastX = useRef(0);
  const vel = useRef(0);
  const dirRef = useRef<1 | -1>(-1);
  const offset = useRef(0);

  useEffect(() => {
    const measure = () => {
      if (measureRef.current) setSpacing(measureRef.current.getComputedTextLength());
    };
    measure();
    document.fonts?.ready.then(measure);
  }, [unit]);

  useEffect(() => {
    if (!spacing) return;
    offset.current = -spacing;
    let raf = 0;
    const step = () => {
      if (!drag.current && pathRef.current) {
        offset.current += dirRef.current * speed;
        if (offset.current <= -spacing) offset.current += spacing;
        if (offset.current > 0) offset.current -= spacing;
        pathRef.current.setAttribute("startOffset", `${offset.current}px`);
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [spacing, speed]);

  const onDown = (e: PointerEvent) => {
    drag.current = true;
    lastX.current = e.clientX;
    vel.current = 0;
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const onMove = (e: PointerEvent) => {
    if (!drag.current || !pathRef.current) return;
    const dx = e.clientX - lastX.current;
    lastX.current = e.clientX;
    vel.current = dx;
    offset.current += dx;
    if (offset.current <= -spacing) offset.current += spacing;
    if (offset.current > 0) offset.current -= spacing;
    pathRef.current.setAttribute("startOffset", `${offset.current}px`);
  };
  const onUp = () => {
    if (!drag.current) return;
    drag.current = false;
    if (vel.current !== 0) dirRef.current = vel.current > 0 ? 1 : -1;
  };

  const repeated = spacing ? Array(Math.ceil(1800 / spacing) + 2).fill(unit).join("") : unit;

  return (
    <div
      className="curved-loop"
      style={{ visibility: spacing ? "visible" : "hidden" }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerLeave={onUp}
      data-cursor="view"
      data-cursor-label="Drag"
    >
      <svg viewBox="0 0 1440 260" preserveAspectRatio="xMidYMid meet" className="curved-loop__svg">
        <text ref={measureRef} xmlSpace="preserve" style={{ visibility: "hidden", opacity: 0 }}>
          {unit}
        </text>
        <defs>
          <path id={pathId} d={`M-100,60 Q500,${60 + curve} 1540,60`} fill="none" />
          <linearGradient id={`grad-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#67e8f9" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        {spacing > 0 && (
          <text xmlSpace="preserve" fill={`url(#grad-${uid})`}>
            <textPath ref={pathRef} href={`#${pathId}`} startOffset={`${-spacing}px`} xmlSpace="preserve">
              {repeated}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};

export default CurvedLoop;
