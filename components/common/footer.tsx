import React, { useState, useRef, useEffect, useMemo, useId, PointerEvent } from 'react';
import { Mail, Github, Linkedin, Dribbble, Instagram, Sparkles, ArrowRight, Code2, Rocket, Send } from 'lucide-react';
import { MENULINKS } from '../../constants';

const EMAIL = "yashpokharna2002@gmail.com";
const SOCIAL_LINKS = {
    linkedin: "https://linkedin.com/in/yash-pokharna",
    github: "https://github.com/Yashpokharna",
    instagram: "https://instagram.com/yash__pokharna",
    dribbble: "https://dribbble.com/yash-pokharna",
    behance: "https://www.behance.net/yashpokharna2002",
};

// Curved Loop Component
interface CurvedLoopProps {
    marqueeText?: string;
    speed?: number;
    className?: string;
    curveAmount?: number;
    direction?: 'left' | 'right';
    interactive?: boolean;
}

const CurvedLoop: React.FC<CurvedLoopProps> = ({
    marqueeText = '',
    speed = 2,
    className,
    curveAmount = 400,
    direction = 'left',
    interactive = true
}) => {
    const text = useMemo(() => {
        const hasTrailing = /\s|\u00A0$/.test(marqueeText);
        return (hasTrailing ? marqueeText.replace(/\s+$/, '') : marqueeText) + '\u00A0';
    }, [marqueeText]);

    const measureRef = useRef<SVGTextElement | null>(null);
    const textPathRef = useRef<SVGTextPathElement | null>(null);
    const pathRef = useRef<SVGPathElement | null>(null);
    const [spacing, setSpacing] = useState(0);
    const [offset, setOffset] = useState(0);
    const uid = useId();
    const pathId = `curve-${uid}`;
    const pathD = `M-100,80 Q500,${80 + curveAmount} 1540,80`;

    const dragRef = useRef(false);
    const lastXRef = useRef(0);
    const dirRef = useRef<'left' | 'right'>(direction);
    const velRef = useRef(0);

    const textLength = spacing;
    const totalText = textLength
        ? Array(Math.ceil(1800 / textLength) + 2)
            .fill(text)
            .join('')
        : text;
    const ready = spacing > 0;

    useEffect(() => {
        if (measureRef.current) setSpacing(measureRef.current.getComputedTextLength());
    }, [text, className]);

    useEffect(() => {
        if (!spacing) return;
        if (textPathRef.current) {
            const initial = -spacing;
            textPathRef.current.setAttribute('startOffset', initial + 'px');
            setOffset(initial);
        }
    }, [spacing]);

    useEffect(() => {
        if (!spacing || !ready) return;
        let frame = 0;
        let animationOffset = offset;
        
        const step = () => {
            if (!dragRef.current && textPathRef.current) {
                const delta = dirRef.current === 'right' ? speed : -speed;
                animationOffset += delta;
                
                const wrapPoint = spacing;
                if (animationOffset <= -wrapPoint) animationOffset += wrapPoint;
                if (animationOffset > 0) animationOffset -= wrapPoint;
                
                textPathRef.current.setAttribute('startOffset', animationOffset + 'px');
            }
            frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
        return () => cancelAnimationFrame(frame);
    }, [spacing, speed, ready, offset]);

    const onPointerDown = (e: PointerEvent) => {
        if (!interactive) return;
        dragRef.current = true;
        lastXRef.current = e.clientX;
        velRef.current = 0;
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
        if (!interactive || !dragRef.current || !textPathRef.current) return;
        const dx = e.clientX - lastXRef.current;
        lastXRef.current = e.clientX;
        velRef.current = dx;
        const currentOffset = parseFloat(textPathRef.current.getAttribute('startOffset') || '0');
        let newOffset = currentOffset + dx;
        const wrapPoint = spacing;
        if (newOffset <= -wrapPoint) newOffset += wrapPoint;
        if (newOffset > 0) newOffset -= wrapPoint;
        textPathRef.current.setAttribute('startOffset', newOffset + 'px');
        setOffset(newOffset);
    };

    const endDrag = () => {
        if (!interactive) return;
        dragRef.current = false;
        dirRef.current = velRef.current > 0 ? 'right' : 'left';
    };

    const cursorStyle = interactive ? (dragRef.current ? 'grabbing' : 'grab') : 'auto';

    return (
        <div
            className="flex items-center justify-center w-full"
            style={{ visibility: ready ? 'visible' : 'hidden', cursor: cursorStyle }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
        >
            <svg
                className="select-none w-full block text-[4rem] md:text-[5rem] lg:text-[6rem] font-black uppercase leading-none"
                viewBox="0 0 1440 280"
                preserveAspectRatio="xMidYMid meet"
                style={{ height: 'auto', minHeight: '200px', overflow: 'visible' }}
            >
                <text ref={measureRef} xmlSpace="preserve" style={{ visibility: 'hidden', opacity: 0, pointerEvents: 'none' }}>
                    {text}
                </text>
                <defs>
                    <path ref={pathRef} id={pathId} d={pathD} fill="none" stroke="transparent" />
                    <linearGradient id={`gradient-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: '#a855f7', stopOpacity: 0.3 }} />
                        <stop offset="50%" style={{ stopColor: '#ec4899', stopOpacity: 0.5 }} />
                        <stop offset="100%" style={{ stopColor: '#a855f7', stopOpacity: 0.3 }} />
                    </linearGradient>
                </defs>
                {ready && (
                    <text xmlSpace="preserve" className={className} fill={`url(#gradient-${uid})`}>
                        <textPath ref={textPathRef} href={`#${pathId}`} startOffset={offset + 'px'} xmlSpace="preserve">
                            {totalText}
                        </textPath>
                    </text>
                )}
            </svg>
        </div>
    );
};

const Footer = () => {
    const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
    const currentYear = new Date().getFullYear();
    const { ref: contactSectionRef } = MENULINKS.find(link => link.name === "Contact") || MENULINKS[4];

    const socialIcons: Record<string, React.ComponentType<any>> = {
        github: Github,
        linkedin: Linkedin,
        dribbble: Dribbble,
        behance: (props: any) => (
            <svg {...props} viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.5 4.5h3.8c1.7 0 3.1 1.4 3.1 3.1 0 1-.5 1.9-1.2 2.4.9.5 1.5 1.5 1.5 2.6 0 1.7-1.4 3.1-3.1 3.1H6.5V4.5zm2 4.5h1.8c.6 0 1.1-.5 1.1-1.1s-.5-1.1-1.1-1.1H8.5V9zm0 4.7h1.8c.6 0 1.1-.5 1.1-1.1 0-.6-.5-1.1-1.1-1.1H8.5v2.2zM15.5 6h5v1.5h-5V6zm.5 5.5c0-2.2 1.8-4 4-4s4 1.8 4 4c0 .3 0 .5-.1.8h-6c.3 1.1 1.3 1.9 2.4 1.9.8 0 1.5-.4 2-.9l1.3 1c-.8.9-2 1.5-3.3 1.5-2.2 0-4-1.8-4-4zm6.2-.8c-.3-1-1.2-1.7-2.2-1.7s-1.9.7-2.2 1.7h4.4z"/>
            </svg>
        ),
        instagram: Instagram
    };

    const socialColors: Record<string, string> = {
        github: 'from-gray-700 to-gray-900',
        linkedin: 'from-blue-600 to-blue-800',
        dribbble: 'from-pink-500 to-pink-700',
        behance: 'from-blue-500 to-blue-700',
        instagram: 'from-pink-500 via-purple-500 to-orange-500'
    };

    return (
        <footer className="relative w-full py-20 overflow-hidden select-none bg-slate-950" id={contactSectionRef}>
            
            {/* Background Pattern */}
            <div 
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(139, 92, 246, 0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(139, 92, 246, 0.03) 1px, transparent 1px)
                    `,
                    backgroundSize: '80px 80px'
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

            <style>{`
                @keyframes float-orb {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(30px, -30px) scale(1.1); }
                    66% { transform: translate(-30px, 30px) scale(0.9); }
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
                        <Send 
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
                <div className="grid max-w-3xl grid-cols-2 gap-4 mx-auto mb-16 md:grid-cols-5">
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

                {/* Contact Section - Unique Animated Design */}
                <div className="relative flex items-center justify-center mb-2">
                    <a
                        href={`mailto:${EMAIL}`}
                        className="relative group"
                    >
                        
                        {/* <div className="absolute inset-0 transition-opacity duration-500 rounded-full opacity-0 group-hover:opacity-100">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 blur-xl animate-spin-slow"></div>
                        </div> */}
                        
                        <div className="relative flex items-center gap-6 px-12 py-8">
                            {/* Floating mail icon with orbit effect */}
                            <div className="relative">
                                {/* Orbit ring */}
                                <div className="absolute transition-all duration-500 border-2 rounded-full -inset-8 border-purple-500/20 group-hover:border-purple-500/40 group-hover:scale-110"></div>
                                <div className="absolute transition-all duration-500 border rounded-full -inset-6 border-pink-500/20 group-hover:border-pink-500/40 group-hover:scale-105 group-hover:rotate-180" style={{ transitionDelay: '100ms' }}></div>
                                
                                {/* Icon container */}
                                <div className="relative flex items-center justify-center w-16 h-16 transition-all duration-500 rounded-full shadow-2xl bg-gradient-to-br from-purple-500 to-pink-500 group-hover:scale-110 shadow-purple-500/50">
                                    <Mail className="w-8 h-8 text-white transition-transform duration-500 group-hover:rotate-12" />
                                    
                                    {/* Pulse effect */}
                                    <div className="absolute inset-0 rounded-full opacity-0 bg-purple-500/50 animate-ping group-hover:opacity-75"></div>
                                </div>
                            </div>
                            
                            {/* Text with staggered letter animation */}
                            <div className="overflow-hidden">
                                <div className="space-y-2">
                                    <p className="text-sm font-bold tracking-[0.3em] text-purple-300 uppercase opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                                        Get In Touch
                                    </p>
                                    <div className="relative">
                                        <p className="text-2xl font-black tracking-tight text-white transition-all duration-500 md:text-3xl group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:via-pink-400 group-hover:to-purple-400">
                                            {EMAIL}
                                        </p>
                                        {/* Underline animation */}
                                        <div className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 group-hover:w-full transition-all duration-700"></div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Arrow with magnetic effect */}
                            <div className="relative hidden md:block">
                                <ArrowRight className="w-8 h-8 text-purple-400 transition-all duration-500 group-hover:translate-x-4 group-hover:text-pink-400 group-hover:scale-125" />
                                {/* Trail effect */}
                                <ArrowRight className="absolute top-0 left-0 w-8 h-8 transition-all duration-700 text-purple-400/30 group-hover:-translate-x-3 group-hover:opacity-0" />
                            </div>
                        </div>
                    </a>
                </div>

                <style jsx>{`
                    @keyframes spin-slow {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                    .animate-spin-slow {
                        animation: spin-slow 8s linear infinite;
                    }
                `}</style>

                {/* Curved Loop Animation - Full Width */}
            </div>
            
            <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mb-16 -mt-8 overflow-hidden py-8">
                <CurvedLoop 
                    marqueeText="Let's Build Something Amazing ✦ "
                    speed={1.5}
                    curveAmount={350}
                    direction="left"
                    interactive={true}
                />
                
                {/* Gradient overlays for fade effect */}
                <div className="absolute inset-y-0 left-0 w-32 pointer-events-none bg-gradient-to-r from-slate-950 to-transparent"></div>
                <div className="absolute inset-y-0 right-0 w-32 pointer-events-none bg-gradient-to-l from-slate-950 to-transparent"></div>
            </div>
            
            <div className="container relative z-10 max-w-6xl px-6 mx-auto">

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