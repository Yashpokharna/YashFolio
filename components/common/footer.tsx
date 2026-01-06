import React, { useState } from 'react';
import { Mail, FileText, Github, Linkedin, Twitter, Instagram, Sparkles, ArrowRight, Code2, Rocket } from 'lucide-react';

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
        // Changed to bg-[#0a0a0a] (Neutral Black) to kill any blue tint
        <footer className="relative w-full overflow-hidden text-white bg-[#0a0a0a]">
            
            {/* Background Layer: Force neutral colors */}
            <div className="absolute inset-0 z-0 bg-[#0a0a0a]">
                {/* Subtle neutral gray gradient to replace the blue-ish slate */}
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-[#0a0a0a] to-[#050505] opacity-100"></div>
                
                {/* Dot pattern overlay - Pure White dots at very low opacity */}
                <div 
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
                        backgroundSize: '30px 30px'
                    }}
                ></div>

                {/* Grid pattern overlay */}
                <div 
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
                    }}
                ></div>
                
                {/* Animated color orbs - Reduced intensity to prevent "bluish" cast */}
                <div className="absolute top-0 left-0 w-full h-full opacity-20">
                    <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-900/40 rounded-full mix-blend-screen filter blur-[120px] animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-indigo-900/30 rounded-full mix-blend-screen filter blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full opacity-20"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    />
                ))}
            </div>

            <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          33% { transform: translateY(-20px) translateX(10px); }
          66% { transform: translateY(20px) translateX(-10px); }
        }
        @keyframes gradient-slide {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes rocket {
          0%, 100% { transform: translateY(0) rotate(-45deg); }
          50% { transform: translateY(-8px) rotate(-40deg); }
        }
      `}</style>

            <div className="relative z-10 px-6 py-24 mx-auto max-w-7xl lg:px-8">
                <div className="mb-20 text-center">
                    <div 
                        className="inline-flex items-center gap-2 px-4 py-2 mb-8 border rounded-full bg-white/5 backdrop-blur-sm border-white/10"
                        style={{
                            animation: 'pulse-slow 3s ease-in-out infinite'
                        }}
                    >
                        <Sparkles 
                            className="w-4 h-4 text-yellow-400" 
                            style={{
                                animation: 'spin-slow 3s linear infinite'
                            }}
                        />
                        <span className="text-sm font-medium">Let's Create Something Amazing</span>
                    </div>

                    <h2 className="mb-6 text-6xl font-black leading-none md:text-7xl lg:text-8xl">
                        <span className="inline-block transition-transform duration-300 cursor-default">
                            Ready
                        </span>
                        {' '}
                        <span 
                            className="inline-block font-black"
                            style={{
                                background: 'linear-gradient(90deg, #22d3ee, #a855f7, #ec4899, #22d3ee)',
                                backgroundSize: '200% auto',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                animation: 'gradient-slide 4s linear infinite'
                            }}
                        >
                            to talk?
                        </span>
                    </h2>

                    <p className="max-w-2xl mx-auto text-lg text-neutral-400 md:text-xl">
                        Got a project in mind? Let's build something extraordinary together.
                    </p>
                </div>

                {/* Social Cards */}
                <div className="grid max-w-3xl grid-cols-2 gap-4 mx-auto mb-16 md:grid-cols-4">
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
                                    p-4 rounded-2xl
                                    bg-white/5 backdrop-blur-sm
                                    border border-white/10
                                    transition-all duration-500
                                    ${isHovered ? 'scale-110 border-white/30' : 'scale-100'}
                                `}>
                                    <div className={`
                                        absolute inset-0 opacity-0 group-hover:opacity-100
                                        bg-gradient-to-br ${socialColors[platform]}
                                        transition-opacity duration-500
                                    `}></div>

                                    <div className="relative z-10 flex flex-col items-center gap-2">
                                        <Icon className={`w-5 h-5 transition-transform duration-500 ${isHovered ? 'scale-125 rotate-12' : ''}`} />
                                        <span className="text-xs font-semibold capitalize">{platform}</span>
                                    </div>
                                    <div className="absolute inset-0 transition-transform duration-1000 -translate-x-full skew-x-12 group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                                </div>
                            </a>
                        );
                    })}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col items-center justify-center gap-6 mb-20 sm:flex-row">
                    <a
                        href={`mailto:${EMAIL}`}
                        target="_blank"
                        rel="noreferrer"
                        className="relative px-10 py-5 overflow-hidden group rounded-2xl"
                    >
                        <div 
                            className="absolute inset-0"
                            style={{
                                background: 'linear-gradient(90deg, #9333ea, #ec4899, #ef4444, #9333ea)',
                                backgroundSize: '200% auto',
                                animation: 'gradient-slide 3s linear infinite'
                            }}
                        ></div>
                        <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400"></div>
                        <div className="relative flex items-center gap-3 text-lg font-bold text-white">
                            <Mail className="w-6 h-6" />
                            <span>Send Message</span>
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                        </div>
                    </a>

                    <a
                        href="/Yash_Resume.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="relative px-10 py-5 overflow-hidden font-bold text-white border border-white/20 bg-white/5 backdrop-blur-md group rounded-2xl"
                    >
                        <div className="relative flex items-center gap-3 text-lg">
                            <FileText className="w-6 h-6" />
                            <span>Download Resume</span>
                        </div>
                    </a>
                </div>

                {/* Divider */}
                <div className="flex items-center justify-center gap-4 mb-12">
                    <div className="w-20 h-px bg-gradient-to-r from-transparent to-white/20"></div>
                    <Code2 
                        className="w-6 h-6 text-purple-400" 
                        style={{
                            animation: 'bounce-slow 2s ease-in-out infinite'
                        }}
                    />
                    <div className="w-20 h-px bg-gradient-to-l from-transparent to-white/20"></div>
                </div>

                {/* Footer Bottom */}
                <div className="flex flex-col items-center justify-between gap-6 text-sm text-neutral-500 md:flex-row">
                    <div className="flex items-center gap-2">
                        <Rocket className="w-4 h-4 text-purple-400" />
                        <span>Handcrafted with passion & precision by Yash</span>
                    </div>
                    <p>© {currentYear} • All rights reserved</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;