"use client";

import { useState } from "react";

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
    <section className="w-full px-4 py-20 text-center sm:py-24 md:py-32 lg:py-40 bg-background">
      {/* Heading */}
      <div className="mb-10">
        <h2 className="text-4xl font-bold sm:text-5xl md:text-5xl text-foreground">
          Sometimes you just need to see it
        </h2>
        <p className="mt-3 text-base sm:text-lg text-muted-foreground md:text-2xl">
          ( On desktop: hover to see the magic ✨ · On mobile: tap to reveal ✨)
        </p>
      </div>

      {/* Animation Box */}
      <div
        className="relative mx-auto max-w-[90%] sm:max-w-4xl lg:max-w-5xl rounded-2xl bg-muted/5 px-6 sm:px-10 py-16 sm:py-20 shadow-xl overflow-hidden border border-white flex items-center justify-center h-[220px] sm:h-[260px] md:h-[280px] lg:h-[300px]"
        onMouseMove={handleMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={handleLeave}
        onTouchStart={handleTouch}
        onTouchMove={handleTouch}
        onTouchEnd={handleLeave}
      >
        {/* Default Line */}
        <p
          className="absolute z-10 w-full text-center text-2xl sm:text-4xl md:text-4xl lg:text-6xl font-bold text-gray-500 pointer-events-none transition-[clip-path] duration-500 ease-in-out"
          style={{
            clipPath: `inset(0 0 0 ${percentage}%)`,
          }}
        >
          You see a <span className="text-gray-500">Website</span>.
        </p>

        {/* Hover Line */}
        <p
          className="absolute z-20 w-full text-center text-2xl sm:text-4xl md:text-4xl lg:text-6xl font-bold text-foreground pointer-events-none transition-[clip-path] duration-500 ease-in-out"
          style={{
            clipPath: `inset(0 ${100 - percentage + 0.5}% 0 0)`,
          }}
        >
          I craft an <span className="text-primary">Experience</span>.
        </p>

        {/* Hover line indicator */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-primary to-transparent z-30 transition-all duration-300 ease-out"
          style={{
            left: `${percentage}%`,
            opacity: isHovering ? 1 : 0,
          }}
        />
      </div>
    </section>
  );
}
