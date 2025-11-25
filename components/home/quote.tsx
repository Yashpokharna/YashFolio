import React, { useRef, useState, useEffect } from "react";
import { Quote, Sparkles, RefreshCw } from "lucide-react";

const FallingText = ({
  text = '',
  highlightWords = [],
  trigger = 'hover',
  gravity = 0.8,
  fontSize = '2rem'
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const [effectStarted, setEffectStarted] = useState(false);
  const wordsDataRef = useRef<any[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const mouseRef = useRef<any>({ x: 0, y: 0, pressed: false, draggedWord: null });

  useEffect(() => {
    if (!textRef.current) return;
    const words = text.split(' ');

    const newHTML = words
      .map((word, index) => {
        const isHighlighted = highlightWords.some(hw =>
          word.toLowerCase().includes(hw.toLowerCase())
        );
        return `<span
          data-word-index="${index}"
          class="inline-block mx-[2px] select-none ${
            isHighlighted
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 font-bold'
              : 'text-white'
          }"
          style="transition: none;"
        >
          ${word}
        </span>`;
      })
      .join(' ');

    textRef.current.innerHTML = newHTML;
  }, [text, highlightWords]);

  useEffect(() => {
    if (!effectStarted || !textRef.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();

    // ⭐ FIXED HERE
    const wordSpans = Array.from(
      textRef.current.querySelectorAll('span') as NodeListOf<HTMLSpanElement>
    );

    wordsDataRef.current = wordSpans.map((elem, index) => {
      const rect = elem.getBoundingClientRect();
      return {
        elem,
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top + rect.height / 2,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 2,
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 0.1,
        width: rect.width,
        height: rect.height,
        restitution: 0.6,
        delay: index * 30,
        isFrozen: false
      };
    });

    wordsDataRef.current.forEach(({ elem }) => {
      elem.style.position = 'absolute';
      elem.style.transformOrigin = 'center center';
    });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current!.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseDown = (e: MouseEvent) => {
      mouseRef.current.pressed = true;
      const rect = containerRef.current!.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      for (let word of wordsDataRef.current) {
        const dx = mx - word.x;
        const dy = my - word.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < Math.max(word.width, word.height) / 2 + 20) {
          mouseRef.current.draggedWord = word;
          word.offsetX = dx;
          word.offsetY = dy;
          break;
        }
      }
    };

    const handleMouseUp = () => {
      if (mouseRef.current.draggedWord) {
        mouseRef.current.draggedWord.vx += (Math.random() - 0.5) * 5;
        mouseRef.current.draggedWord.vy -= 3;
      }
      mouseRef.current.pressed = false;
      mouseRef.current.draggedWord = null;
    };

    containerRef.current.addEventListener('mousemove', handleMouseMove);
    containerRef.current.addEventListener('mousedown', handleMouseDown);
    containerRef.current.addEventListener('mouseup', handleMouseUp);
    containerRef.current.addEventListener('mouseleave', handleMouseUp);

    let startTime = Date.now();

    const animate = () => {
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (!containerRect) return;

      const width = containerRect.width;
      const height = containerRect.height;
      const currentTime = Date.now() - startTime;

      wordsDataRef.current.forEach(word => {
        if (currentTime < word.delay) return;

        if (word.isFrozen) {
          word.elem.style.left = `${word.x}px`;
          word.elem.style.top = `${word.y}px`;
          word.elem.style.transform = `translate(-50%, -50%) rotate(${word.rotation}rad)`;
          return;
        }

        if (mouseRef.current.draggedWord === word && mouseRef.current.pressed) {
          word.x = mouseRef.current.x - (word.offsetX || 0);
          word.y = mouseRef.current.y - (word.offsetY || 0);
          word.vx = 0;
          word.vy = 0;
          word.rotationSpeed = (Math.random() - 0.5) * 0.2;
        } else {
          word.vy += gravity;
          word.x += word.vx;
          word.y += word.vy;
          word.rotation += word.rotationSpeed;

          word.vx *= 0.98;
          word.vy *= 0.995;
        }

        if (word.y > height - word.height / 2 - 10) {
          word.y = height - word.height / 2 - 10;

          if (Math.abs(word.vy) < 1) {
            word.vx = 0;
            word.vy = 0;
            word.rotationSpeed = 0;
            word.isFrozen = true;
          } else {
            word.vy *= -word.restitution;
            word.vx *= 0.8;
            word.rotationSpeed *= 0.8;
          }
        }

        if (word.x > width - word.width / 2) {
          word.x = width - word.width / 2;
          word.vx *= -word.restitution;
        }
        if (word.x < word.width / 2) {
          word.x = word.width / 2;
          word.vx *= -word.restitution;
        }

        wordsDataRef.current.forEach(other => {
          if (other === word || !other.isFrozen) return;

          const dx = word.x - other.x;
          const dy = word.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = (word.width + other.width) / 2;

          if (dist < minDist) {
            const overlap = minDist - dist;
            const pushX = (dx / dist) * overlap * 0.5;
            const pushY = (dy / dist) * overlap * 0.5;

            word.x += pushX;
            word.y += pushY;
            other.x -= pushX;
            other.y -= pushY;
          }
        });

        word.elem.style.left = `${word.x}px`;
        word.elem.style.top = `${word.y}px`;
        word.elem.style.transform = `translate(-50%, -50%) rotate(${word.rotation}rad)`;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameRef.current!);
    };
  }, [effectStarted, gravity]);

  const handleTrigger = () => {
    if (!effectStarted) setEffectStarted(true);
  };

  return (
    <div
      id="falling-text"
      ref={containerRef}
      className="relative z-[1] w-full cursor-pointer text-center overflow-hidden"
      style={{ minHeight: "450px", paddingTop: "60px" }}
      onClick={trigger === "click" ? handleTrigger : undefined}
      onMouseEnter={trigger === "hover" ? handleTrigger : undefined}
    >
      <div
        ref={textRef}
        className="inline-block font-bold"
        style={{
          fontSize,
          lineHeight: 1.4,
        }}
      />
    </div>
  );
};

const QuoteSection = () => {
  return (
    <section className="relative w-full overflow-hidden select-none bg-slate-950">

      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/30 to-slate-950" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 py-32 section-container">
        <div className="flex flex-col items-center max-w-5xl px-6 mx-auto">

          <div className="mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl" />
              <div className="relative p-4 rounded-2xl bg-slate-900/40 backdrop-blur-sm">
                <Quote className="w-8 h-8 text-purple-400" />
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-2 mt-8">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
          <p className="text-lg text-slate-500">
            Danger⚠️: Hovering may cause <span className="font-extrabold text-purple-400">"Emotional Damage".</span>
          </p>
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>

          <div className="w-full">
            <FallingText
              text="I have a Strong Obsession for Attention to Detail."
              highlightWords={["Strong", "Obsession", "Attention", "Detail"]}
              trigger="hover"
              gravity={0.8}
              fontSize="clamp(2rem, 5vw, 3.75rem)"
            />
          </div>

          <p className="max-w-2xl mt-8 text-lg text-center md:text-xl text-slate-400">
            Every pixel, every interaction, every line of code matters in creating exceptional experiences.
          </p>

          <div className="flex items-center gap-3 mt-12">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" style={{ animationDelay: "0.5s" }} />
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
          </div>

        </div>
      </div>

    </section>
  );
};

export default QuoteSection;