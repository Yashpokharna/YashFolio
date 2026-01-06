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
        <footer className="relative w-full py-20 overflow-hidden select-none bg-slate-950">
            
            {/* Background Pattern - Matching About Section with animations */}
            <div 
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(139, 92, 246, 0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(139, 92, 246, 0.03) 1px, transparent 1px)
                    `,
                    backgroundSize: '80px 80px',
                    animation: 'gridMove 20s linear infinite'
                }}
            />

            {/* Animated gradient orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div 
                    className="absolute rounded-full w-96 h-96 opacity-30 bg-purple-500/20 blur-3xl"
                    style={{
                        top: '10%',
                        left: '10%',
                        animation: 'float-orb 15s ease-in-out infinite'
                    }}
                />
                <div 
                    className="absolute rounded-full w-96 h-96 opacity-30 bg-pink-500/20 blur-3xl"
                    style={{
                        bottom: '10%',
                        right: '10%',
                        animation: 'float-orb 20s ease-in-out infinite reverse'
                    }}
                />
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-purple-400 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            opacity: Math.random() * 0.5 + 0.2,
                            animation: `float ${8 + Math.random() * 12}s ease-in-out infinite`,
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
            `}</style>

            <div className="container relative z-10 max-w-6xl px-6 mx-auto">
                <div className="mb-20 text-center">
                    <div 
                        className="inline-flex items-center gap-2 px-5 py-2 mb-8 transition-shadow duration-300 rounded-full shadow-xl bg-white/5 backdrop-blur-xl hover:shadow-purple-500/30"
                        style={{
                            animation: 'pulse-slow 3s ease-in-out infinite'
                        }}
                    >
                        <Sparkles 
                            className="w-4 h-4 text-purple-400 animate-pulse" 
                        />
                        <span className="text-sm font-bold tracking-widest text-purple-300 uppercase">Let's Connect</span>
                    </div>

                    <h2 className="mb-6 text-6xl font-black leading-none text-white md:text-7xl lg:text-8xl">
                        <span className="inline-block transition-transform duration-300 cursor-default">
                            Ready
                        </span>
                        {' '}
                        <span 
                            className="inline-block font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400"
                        >
                            to talk?
                        </span>
                    </h2>

                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-300">
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
                                    bg-slate-900/30 backdrop-blur-sm
                                    transition-all duration-500
                                    ${isHovered ? 'scale-110 bg-slate-900/50' : 'scale-100'}
                                `}>
                                    <div className={`
                                        absolute inset-0 opacity-0 group-hover:opacity-20
                                        bg-gradient-to-br ${socialColors[platform]}
                                        transition-opacity duration-500 blur-2xl
                                    `}></div>

                                    <div className="relative z-10 flex flex-col items-center gap-2">
                                        <Icon className={`w-5 h-5 text-slate-300 group-hover:text-white transition-all duration-500 ${isHovered ? 'scale-125 rotate-12' : ''}`} />
                                        <span className="text-xs font-semibold capitalize transition-colors duration-300 text-slate-300 group-hover:text-white">{platform}</span>
                                    </div>
                                    <div className="absolute inset-0 transition-transform duration-1000 -translate-x-full skew-x-12 group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
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
                        className="relative px-10 py-5 overflow-hidden transition-all duration-300 group rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-2xl hover:shadow-purple-500/50"
                    >
                        <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400"></div>
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
                        className="relative px-10 py-5 overflow-hidden font-bold transition-all duration-300 group rounded-2xl text-slate-300 hover:text-white bg-slate-900/30 backdrop-blur-sm hover:bg-slate-900/50"
                    >
                        <div className="relative flex items-center gap-3 text-lg">
                            <FileText className="w-6 h-6" />
                            <span>Download Resume</span>
                        </div>
                    </a>
                </div>

                {/* Divider */}
                <div className="flex items-center justify-center gap-4 mb-12">
                    <div className="w-20 h-px bg-gradient-to-r from-transparent to-slate-700"></div>
                    <Code2 
                        className="w-6 h-6 text-purple-400" 
                        style={{
                            animation: 'bounce-slow 2s ease-in-out infinite'
                        }}
                    />
                    <div className="w-20 h-px bg-gradient-to-l from-transparent to-slate-700"></div>
                </div>

                {/* Footer Bottom */}
                <div className="flex flex-col items-center justify-between gap-6 text-sm text-slate-400 md:flex-row">
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