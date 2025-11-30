import Image from "next/image";
import { useState, useEffect } from "react";
import Menu from "@/components/common/menu";
import { AlignJustify, X, Sparkles } from "lucide-react";

const Header = () => {
  const [menuVisible, setmenuVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <header className={`fixed top-0 z-50 w-full select-none transition-all duration-500 ${
        scrolled 
          ? "py-2 bg-gradient-to-b from-slate-950/60 via-slate-950/30 to-transparent" 
          : "py-4 bg-gradient-to-b from-slate-950/90 via-slate-950/50 to-transparent"
      }`}>
        
        {/* Animated gradient line at top */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50">
          <div 
            className="h-full transition-all duration-300 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 blur-sm"
            style={{
              width: '100px',
              transform: `translateX(${(mousePosition.x / window.innerWidth) * (window.innerWidth - 100)}px)`,
            }}
          />
        </div>

        {/* Floating particles background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-40 top-4 left-1/4 animate-ping" style={{ animationDuration: "3s" }} />
          <div className="absolute w-1 h-1 bg-pink-400 rounded-full opacity-40 top-6 right-1/3 animate-ping" style={{ animationDuration: "4s", animationDelay: "1s" }} />
          <div className="absolute w-1 h-1 rounded-full opacity-40 bg-cyan-400 top-5 left-2/3 animate-ping" style={{ animationDuration: "3.5s", animationDelay: "2s" }} />
        </div>

        <div className="flex items-center justify-between section-container">
          {/* Logo Section - Enhanced */}
          <a href="#home" className="relative group link">
            {/* Glow effect behind logo */}
            <div className="absolute inset-0 transition-opacity duration-500 rounded-full opacity-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-2xl group-hover:opacity-100" />
            
            {/* Logo with rotation effect */}
            <div className="relative transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
              <Image
                src="/logonew.svg"
                alt="Logo - Yash Pokharna"
                width={scrolled ? 45 : 50}
                height={scrolled ? 45 : 50}
                className="transition-all duration-500 drop-shadow-2xl"
              />
              
              {/* Orbiting dots around logo */}
              <div className="absolute w-2 h-2 transition-all duration-500 rounded-full opacity-0 -top-1 -right-1 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:opacity-100 group-hover:animate-ping" />
              <div className="absolute w-2 h-2 transition-all duration-500 rounded-full opacity-0 -bottom-1 -left-1 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:opacity-100 group-hover:animate-ping" style={{ animationDelay: "0.5s" }} />
            </div>
          </a>

          {/* Navigation Section - Futuristic Design */}
          <nav className={`outer-menu ${menuVisible ? "menu-visible" : ""} relative`}>
            {/* Hamburger Button - Redesigned */}
            <button
              className={`relative group flex items-center justify-center transition-all duration-500 link ${
                scrolled ? "w-10 h-10" : "w-11 h-11"
              }`}
              onClick={() => setmenuVisible(!menuVisible)}
              aria-label="Toggle menu"
            >
              {/* Outer ring with gradient */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 transition-all duration-500 group-hover:scale-110 ${
                menuVisible ? "rotate-180 scale-110" : ""
              }`} />
              
              {/* Inner background */}
              <div className="absolute transition-all duration-500 inset-1 rounded-xl bg-slate-900/90 backdrop-blur-sm group-hover:bg-slate-800/90" />
              
              {/* Border glow effect */}
              <div className={`absolute inset-0 rounded-2xl border-2 transition-all duration-500 ${
                menuVisible 
                  ? "border-pink-500 shadow-lg shadow-pink-500/50" 
                  : "border-slate-700 group-hover:border-purple-500 group-hover:shadow-lg group-hover:shadow-purple-500/30"
              }`} />

              {/* Icon with animation */}
              <div className="relative z-10 transition-all duration-500">
                {menuVisible ? (
                  <X className="w-5 h-5 text-pink-400 transition-transform duration-500 rotate-90" />
                ) : (
                  <AlignJustify className="w-5 h-5 text-purple-400 transition-all duration-500 group-hover:text-pink-400 group-hover:scale-110" />
                )}
              </div>

              {/* Corner sparkles */}
              <Sparkles className="absolute w-3 h-3 text-purple-400 transition-all duration-500 opacity-0 -top-1 -right-1 group-hover:opacity-100 group-hover:animate-pulse" />
              <Sparkles className="absolute w-3 h-3 text-pink-400 transition-all duration-500 opacity-0 -bottom-1 -left-1 group-hover:opacity-100 group-hover:animate-pulse" style={{ animationDelay: "0.3s" }} />
            </button>

            <Menu setmenuVisible={setmenuVisible} />
          </nav>
        </div>

        {/* Bottom gradient line */}
        <div className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-700/50 to-transparent transition-opacity duration-500 opacity-0`} />
      </header>

      {/* Global styles for animations */}
      <style jsx>{`
        @keyframes float-sparkle {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-10px) scale(1.2);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default Header;