import React, { useState } from 'react';
import { Mail, FileText, Github, Linkedin, Twitter, Instagram, Sparkles, ArrowRight, Code2, Rocket } from 'lucide-react';

// Mock constants - replace with your actual imports
const EMAIL = "yashpokharna2002@gmail.com";
const SOCIAL_LINKS = {
  github: "https://github.com/Yashpokharna",
  linkedin: "https://linkedin.com/in/yashpokharna",
  twitter: "https://twitter.com/yashpokharna",
  instagram: "https://instagram.com/yashpokharna"
};

const Footer = () => {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const currentYear = new Date().getFullYear();

  const socialIcons: Record<string, React.ComponentType<any>> = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    instagram: Instagram
  };

  const socialColors: Record<string, string> = {
    github: 'from-gray-700 to-gray-900',
    linkedin: 'from-blue-600 to-blue-800',
    twitter: 'from-sky-400 to-blue-600',
    instagram: 'from-pink-500 via-purple-500 to-orange-500'
  };

  return (
    <footer className="relative w-full overflow-hidden text-white bg-black">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-black to-slate-950"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-50"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          33% { transform: translateY(-20px) translateX(10px); }
          66% { transform: translateY(20px) translateX(-10px); }
        }
      `}</style>

      <div className="relative px-6 py-24 mx-auto max-w-7xl lg:px-8">
        {/* Main heading with decorative elements */}
        <div className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 border rounded-full bg-white/5 backdrop-blur-sm border-white/10">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium">Let's Create Something Amazing</span>
          </div>
          
          <h2 className="mb-6 text-6xl font-black leading-none md:text-7xl lg:text-8xl">
            <span className="inline-block transition-transform duration-300 cursor-default hover:scale-110">
              Ready
            </span>
            {' '}
            <span className="inline-block text-transparent transition-transform duration-300 cursor-default bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text hover:scale-110">
              to talk?
            </span>
          </h2>
          
          <p className="max-w-2xl mx-auto text-xl text-gray-400 md:text-2xl">
            Got a project in mind? Let's build something extraordinary together.
          </p>
        </div>

        {/* Interactive social cards */}
        <div className="grid max-w-4xl grid-cols-2 gap-4 mx-auto mb-16 md:grid-cols-4">
          {Object.entries(SOCIAL_LINKS).map(([platform, url]) => {
            const Icon = socialIcons[platform];
            const isHovered = hoveredSocial === platform;
            
            return (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setHoveredSocial(platform)}
                onMouseLeave={() => setHoveredSocial(null)}
                className="relative group"
              >
                <div className={`
                  relative overflow-hidden
                  p-6 rounded-2xl
                  bg-white/5 backdrop-blur-sm
                  border border-white/10
                  transition-all duration-500
                  ${isHovered ? 'scale-110 border-white/30' : 'scale-100'}
                `}>
                  {/* Animated gradient background on hover */}
                  <div className={`
                    absolute inset-0 opacity-0 group-hover:opacity-100
                    bg-gradient-to-br ${socialColors[platform]}
                    transition-opacity duration-500
                  `}></div>
                  
                  <div className="relative z-10 flex flex-col items-center gap-3">
                    <Icon className={`w-8 h-8 transition-transform duration-500 ${isHovered ? 'scale-125 rotate-12' : ''}`} />
                    <span className="text-sm font-semibold capitalize">{platform}</span>
                  </div>

                  {/* Shine effect */}
                  <div className="absolute inset-0 transition-transform duration-1000 -translate-x-full skew-x-12 group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </div>
              </a>
            );
          })}
        </div>

        {/* CTA Buttons with unique design */}
        <div className="flex flex-col items-center justify-center gap-6 mb-20 sm:flex-row">
          <a
            href={`mailto:${EMAIL}`}
            target="_blank"
            rel="noreferrer"
            className="relative px-10 py-5 overflow-hidden group rounded-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 animate-gradient-x"></div>
            <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400"></div>
            <div className="relative flex items-center gap-3 text-lg font-bold">
              <Mail className="w-6 h-6" />
              <span>Send Message</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
            </div>
          </a>
          
          <a
            href="/Yash_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="relative px-10 py-5 overflow-hidden font-bold text-black bg-white group rounded-2xl"
          >
            <div className="absolute inset-0 bg-white"></div>
            <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-cyan-200 to-purple-200 group-hover:opacity-100"></div>
            <div className="relative flex items-center gap-3 text-lg">
              <FileText className="w-6 h-6" />
              <span>Download Resume</span>
            </div>
          </a>
        </div>

        {/* Divider with icon */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="w-20 h-px bg-gradient-to-r from-transparent to-white/20"></div>
          <Code2 className="w-6 h-6 text-purple-400" />
          <div className="w-20 h-px bg-gradient-to-l from-transparent to-white/20"></div>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col items-center justify-between gap-6 text-sm text-gray-400 md:flex-row">
          <div className="flex items-center gap-2">
            <Rocket className="w-4 h-4 text-purple-400" />
            <span>Handcrafted with passion & precision by Yash</span>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#about" className="relative transition-colors duration-300 hover:text-white group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#work" className="relative transition-colors duration-300 hover:text-white group">
              Work
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#contact" className="relative transition-colors duration-300 hover:text-white group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>
          
          <p>© {currentYear} • All rights reserved</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;