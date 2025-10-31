"use client";
import { useState } from "react";
import { Sparkles, MousePointer2 } from "lucide-react";

export default function ChemistryBusinessSection() {
  const [percentage, setPercentage] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const updatePercentage = (x: number, bounds: DOMRect) => {
    const newPercentage = (x / bounds.width) * 100;
    setPercentage(newPercentage);
  };
  
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    updatePercentage(x, bounds);
  };
  
  const handleTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - bounds.left;
    updatePercentage(x, bounds);
    setIsHovering(true);
  };

  const handleLeave = () => {
    setIsHovering(false);
    setPercentage(0);
  };

  return (
    <section className="relative w-full px-4 py-24 overflow-hidden text-center bg-slate-950 sm:py-32 lg:py-40">
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/30 to-slate-950" />
      
      {/* Animated gradient orbs */}
      <div className="absolute rounded-full top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 blur-3xl animate-pulse" />
      <div className="absolute rounded-full bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/5 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 border rounded-full bg-white/5 border-white/10 backdrop-blur-xl">
            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
            <span className="text-sm font-bold tracking-widest text-purple-300 uppercase">Interactive Experience</span>
          </div>
          
          <h2 className="mb-6 text-4xl font-black leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Sometimes you just need to{' '}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
                see it
              </span>
              <div className="absolute left-0 right-0 h-3 bottom-1 bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-lg" />
            </span>
          </h2>
          
          <div className="flex items-center justify-center gap-3 mt-6">
            <MousePointer2 className="w-5 h-5 text-purple-400 animate-pulse" />
            <p className="text-base text-slate-400 sm:text-lg md:text-xl">
              <span className="hidden sm:inline">Hover to reveal the magic</span>
              <span className="sm:hidden">Tap to reveal the magic</span>
            </p>
          </div>
        </div>

        {/* Interactive Animation Box */}
        <div
          className="relative mx-auto max-w-5xl rounded-3xl bg-slate-900/40 backdrop-blur-sm px-8 sm:px-12 py-20 sm:py-24 overflow-hidden flex items-center justify-center min-h-[280px] sm:min-h-[320px] lg:min-h-[360px] group cursor-none"
          onMouseMove={handleMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={handleLeave}
          onTouchStart={handleTouch}
          onTouchMove={handleTouch}
          onTouchEnd={handleLeave}
        >
          {/* Subtle grid pattern */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}
          />

          {/* Glow effect */}
          <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-purple-500/5 group-hover:opacity-100" />

          {/* Default Text (Left Side - Gray) */}
          <p
            className="absolute z-10 w-full px-6 text-2xl font-black text-center transition-all duration-500 ease-in-out pointer-events-none sm:text-4xl md:text-5xl lg:text-6xl text-slate-600"
            style={{
              clipPath: `inset(0 0 0 ${percentage}%)`,
            }}
          >
            You see a <span className="text-slate-500">Website</span>.
          </p>

          {/* Revealed Text (Right Side - Gradient) */}
          <p
            className="absolute z-20 w-full px-6 text-2xl font-black text-center transition-all duration-500 ease-in-out pointer-events-none sm:text-4xl md:text-5xl lg:text-6xl"
            style={{
              clipPath: `inset(0 ${100 - percentage + 0.5}% 0 0)`,
            }}
          >
            I craft an{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
              Experience
            </span>.
          </p>

          {/* Animated cursor line */}
          <div
            className="absolute top-0 bottom-0 z-30 transition-all duration-300 ease-out w-0.5"
            style={{
              left: `${percentage}%`,
              opacity: isHovering ? 1 : 0,
              background: 'linear-gradient(to bottom, transparent, rgba(139, 92, 246, 0.8), rgba(236, 72, 153, 0.8), transparent)'
            }}
          >
            {/* Glowing dot at cursor position */}
            <div className="absolute w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 bg-gradient-to-r from-purple-400 to-pink-400 blur-sm" />
            <div className="absolute w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 bg-gradient-to-r from-purple-300 to-pink-300" />
          </div>

          {/* Corner decorations */}
          <div className="absolute w-4 h-4 border-t-2 border-l-2 rounded-tl-lg top-4 left-4 border-purple-500/30" />
          <div className="absolute w-4 h-4 border-t-2 border-r-2 rounded-tr-lg top-4 right-4 border-pink-500/30" />
          <div className="absolute w-4 h-4 border-b-2 border-l-2 rounded-bl-lg bottom-4 left-4 border-purple-500/30" />
          <div className="absolute w-4 h-4 border-b-2 border-r-2 rounded-br-lg bottom-4 right-4 border-pink-500/30" />
        </div>

        {/* Bottom hint */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
          <p className="text-sm text-slate-500">
            Move your cursor across to reveal the difference
          </p>
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>

      </div>
    </section>
  );
}