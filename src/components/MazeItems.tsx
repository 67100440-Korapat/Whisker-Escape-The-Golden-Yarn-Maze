import React from 'react';

interface GoldenYarnProps {
  size: number;
}

export const GoldenYarnItem: React.FC<GoldenYarnProps> = ({ size }) => {
  return (
    <div
      className="relative flex items-center justify-center animate-yarn-float pointer-events-none select-none"
      style={{ width: size, height: size }}
    >
      {/* Golden Aura Glow */}
      <div
        className="absolute inset-0 rounded-full animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.45) 0%, rgba(245, 158, 11, 0.15) 50%, transparent 70%)',
          transform: 'scale(1.4)',
        }}
      />

      <svg
        viewBox="0 0 60 60"
        width={size * 0.88}
        height={size * 0.88}
        className="overflow-visible filter drop-shadow-md"
      >
        {/* Soft shadow */}
        <ellipse cx="30" cy="52" rx="18" ry="5" fill="rgba(0,0,0,0.3)" />

        {/* Loose yarn strand looping on ground */}
        <path
          d="M 22 45 Q 12 50, 8 46 Q 4 40, 14 38 Q 20 40, 24 44"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Main Yarn Ball Sphere */}
        <defs>
          <radialGradient id="yarnGradient" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="40%" stopColor="#fbbf24" />
            <stop offset="80%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#b45309" />
          </radialGradient>
        </defs>

        <circle cx="30" cy="30" r="18" fill="url(#yarnGradient)" />

        {/* Wound yarn strand textures */}
        <g stroke="#fef08a" strokeWidth="2" fill="none" opacity="0.85" strokeLinecap="round">
          {/* Overlapping curved bands of yarn */}
          <path d="M 16 24 Q 28 16, 44 24" />
          <path d="M 14 30 Q 30 22, 46 30" />
          <path d="M 15 36 Q 32 30, 44 38" />
          <path d="M 22 16 Q 38 28, 30 46" stroke="#b45309" strokeWidth="1.8" />
          <path d="M 28 14 Q 44 26, 36 44" stroke="#d97706" strokeWidth="1.8" />
          <path d="M 18 20 Q 32 34, 26 44" stroke="#fef3c7" strokeWidth="1.5" />
        </g>

        {/* Golden Sparkles */}
        <path
          d="M 44 14 Q 45 18, 49 19 Q 45 20, 44 24 Q 43 20, 39 19 Q 43 18, 44 14 Z"
          fill="#fef08a"
          className="animate-pulse"
        />
        <circle cx="16" cy="18" r="1.5" fill="#fef08a" />
        <circle cx="46" cy="38" r="1.5" fill="#fef08a" />
      </svg>
    </div>
  );
};

interface ExitDoorProps {
  size: number;
  isUnlocked: boolean;
  yarnsLeft: number;
}

export const ExitDoorItem: React.FC<ExitDoorProps> = ({
  size,
  isUnlocked,
  yarnsLeft,
}) => {
  return (
    <div
      className={`relative flex items-center justify-center select-none ${
        isUnlocked ? 'animate-door-glow' : ''
      }`}
      style={{ width: size, height: size }}
    >
      {/* Background portal aura if unlocked */}
      {isUnlocked && (
        <div
          className="absolute inset-0 rounded-t-full animate-pulse-glow"
          style={{
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.6) 0%, rgba(59, 130, 246, 0.3) 60%, transparent 80%)',
            transform: 'scale(1.3)',
          }}
        />
      )}

      <svg
        viewBox="0 0 60 70"
        width={size * 0.95}
        height={size * 0.95}
        className="overflow-visible filter drop-shadow-lg"
      >
        {/* Door frame arch */}
        <path
          d="M 10 65 L 10 24 A 20 20 0 0 1 50 24 L 50 65 Z"
          fill={isUnlocked ? '#1e293b' : '#334155'}
          stroke={isUnlocked ? '#f59e0b' : '#64748b'}
          strokeWidth="3.5"
        />

        {isUnlocked ? (
          /* UNLOCKED: Swirling golden light doorway */
          <g>
            <defs>
              <linearGradient id="doorLight" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#60a5fa" />
              </linearGradient>
            </defs>

            {/* Radiant glowing opening */}
            <path
              d="M 14 65 L 14 26 A 16 16 0 0 1 46 26 L 46 65 Z"
              fill="url(#doorLight)"
              opacity="0.95"
            />

            {/* Door slightly swung open to the right */}
            <polygon
              points="46,26 55,22 55,62 46,65"
              fill="#b45309"
              stroke="#f59e0b"
              strokeWidth="1.5"
            />

            {/* Sparkle stars escaping door */}
            <path
              d="M 30 20 L 32 25 L 37 27 L 32 29 L 30 34 L 28 29 L 23 27 L 28 25 Z"
              fill="#ffffff"
            />
            <circle cx="24" cy="42" r="2" fill="#ffffff" />
            <circle cx="36" cy="48" r="2.5" fill="#ffffff" />

            {/* Golden welcome threshold */}
            <rect x="8" y="64" width="44" height="4" rx="2" fill="#f59e0b" />
          </g>
        ) : (
          /* LOCKED: Closed heavy wood door with padlock */
          <g>
            {/* Wooden door panels */}
            <path
              d="M 14 65 L 14 26 A 16 16 0 0 1 46 26 L 46 65 Z"
              fill="#451a03"
            />

            {/* Wood planks divider lines */}
            <line x1="24" y1="20" x2="24" y2="65" stroke="#78350f" strokeWidth="1.5" />
            <line x1="36" y1="20" x2="36" y2="65" stroke="#78350f" strokeWidth="1.5" />

            {/* Iron hinge studs */}
            <circle cx="16" cy="34" r="1.5" fill="#94a3b8" />
            <circle cx="16" cy="54" r="1.5" fill="#94a3b8" />

            {/* Brass Padlock */}
            <g transform="translate(23, 36)">
              {/* Shackle */}
              <path
                d="M 3 5 A 4 4 0 0 1 11 5 L 11 8 L 3 8 Z"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2"
              />
              {/* Body */}
              <rect x="1" y="7" width="12" height="10" rx="2" fill="#d97706" stroke="#92400e" strokeWidth="1" />
              {/* Keyhole */}
              <circle cx="7" cy="11" r="1.5" fill="#1e293b" />
              <line x1="7" y1="12" x2="7" y2="15" stroke="#1e293b" strokeWidth="1.2" />
            </g>

            {/* Remaining yarn indicator badge */}
            <g transform="translate(18, 52)">
              <rect x="0" y="0" width="24" height="11" rx="4" fill="#0f172a" opacity="0.85" />
              <text
                x="12"
                y="8.5"
                textAnchor="middle"
                fontSize="7.5"
                fontWeight="bold"
                fill="#f59e0b"
                fontFamily="Outfit, sans-serif"
              >
                {yarnsLeft} 🧶
              </text>
            </g>

            {/* Threshold */}
            <rect x="8" y="64" width="44" height="4" rx="2" fill="#64748b" />
          </g>
        )}
      </svg>
    </div>
  );
};

interface PawPrintProps {
  size: number;
  opacity: number;
}

export const PawPrintItem: React.FC<PawPrintProps> = ({ size, opacity }) => {
  return (
    <div
      className="absolute flex items-center justify-center pointer-events-none select-none transition-opacity duration-300"
      style={{
        width: size,
        height: size,
        opacity: Math.max(0, opacity),
      }}
    >
      <svg viewBox="0 0 40 40" width={size * 0.45} height={size * 0.45}>
        {/* Main pad */}
        <ellipse cx="20" cy="24" rx="7" ry="5.5" fill="rgba(251, 191, 36, 0.4)" />
        {/* 4 toe beans */}
        <circle cx="12" cy="14" r="2.4" fill="rgba(251, 191, 36, 0.45)" />
        <circle cx="17.5" cy="11" r="2.6" fill="rgba(251, 191, 36, 0.45)" />
        <circle cx="23.5" cy="11" r="2.6" fill="rgba(251, 191, 36, 0.45)" />
        <circle cx="29" cy="14" r="2.4" fill="rgba(251, 191, 36, 0.45)" />
      </svg>
    </div>
  );
};
