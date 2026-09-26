// Shapes that stand in for letters during the hero entrance. They share
// gradients defined once in <FlairDefs />.

export type FlairShape = "spark" | "ring" | "bolt" | "squiggle";

export const FlairDefs = () => (
  <svg width="0" height="0" className="absolute" aria-hidden focusable="false">
    <defs>
      <linearGradient id="flair-a" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#a5f3fc" />
        <stop offset="55%" stopColor="#22d3ee" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
      <linearGradient id="flair-b" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0%" stopColor="#1d4ed8" />
        <stop offset="100%" stopColor="#60a5fa" />
      </linearGradient>
    </defs>
  </svg>
);

export const Flair = ({ shape }: { shape: FlairShape }) => {
  switch (shape) {
    case "spark":
      return (
        <svg viewBox="0 0 100 100" className="hn-flair">
          <g stroke="url(#flair-a)" strokeWidth="13" strokeLinecap="round">
            <line x1="50" y1="8" x2="50" y2="92" />
            <line x1="8" y1="50" x2="92" y2="50" />
            <line x1="20" y1="20" x2="80" y2="80" />
            <line x1="80" y1="20" x2="20" y2="80" />
          </g>
        </svg>
      );
    case "ring":
      return (
        <svg viewBox="0 0 100 100" className="hn-flair">
          <circle cx="50" cy="50" r="33" fill="none" stroke="url(#flair-b)" strokeWidth="17" />
        </svg>
      );
    case "bolt":
      return (
        <svg viewBox="0 0 100 100" className="hn-flair">
          <polygon points="60,4 16,58 45,58 36,96 84,38 55,38 66,4" fill="url(#flair-a)" />
        </svg>
      );
    case "squiggle":
      return (
        <svg viewBox="0 0 100 100" className="hn-flair">
          <path
            d="M8 58 C 18 26, 32 26, 38 50 S 56 76, 62 50 S 80 22, 92 44"
            fill="none"
            stroke="url(#flair-b)"
            strokeWidth="12"
            strokeLinecap="round"
          />
        </svg>
      );
  }
};
