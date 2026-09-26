import { Github, Linkedin, Instagram } from "lucide-react";
import { SOCIAL_LINKS } from "../../constants";

const Behance = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M6.5 4.5h3.8c1.7 0 3.1 1.4 3.1 3.1 0 1-.5 1.9-1.2 2.4.9.5 1.5 1.5 1.5 2.6 0 1.7-1.4 3.1-3.1 3.1H6.5V4.5zm2 4.5h1.8c.6 0 1.1-.5 1.1-1.1s-.5-1.1-1.1-1.1H8.5V9zm0 4.7h1.8c.6 0 1.1-.5 1.1-1.1 0-.6-.5-1.1-1.1-1.1H8.5v2.2zM15.5 6h5v1.5h-5V6zm.5 5.5c0-2.2 1.8-4 4-4s4 1.8 4 4c0 .3 0 .5-.1.8h-6c.3 1.1 1.3 1.9 2.4 1.9.8 0 1.5-.4 2-.9l1.3 1c-.8.9-2 1.5-3.3 1.5-2.2 0-4-1.8-4-4zm6.2-.8c-.3-1-1.2-1.7-2.2-1.7s-1.9.7-2.2 1.7h4.4z" />
  </svg>
);

export const SOCIALS = [
  { name: "GitHub", href: SOCIAL_LINKS.github, Icon: Github, glow: "from-gray-500 to-gray-800" },
  { name: "LinkedIn", href: SOCIAL_LINKS.linkedin, Icon: Linkedin, glow: "from-blue-500 to-blue-800" },
  { name: "Instagram", href: SOCIAL_LINKS.instagram, Icon: Instagram, glow: "from-pink-500 via-purple-500 to-orange-500" },
  { name: "Behance", href: SOCIAL_LINKS.behance, Icon: Behance, glow: "from-blue-400 to-blue-700" },
];
