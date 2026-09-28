import React from 'react';
import { CatSkin, Direction } from '../types/game';

interface CatCharacterProps {
  skin: CatSkin;
  direction: Direction;
  isMoving: boolean;
  stepPhase: number;
  mood?: 'normal' | 'happy' | 'meow' | 'puzzled';
  size?: number;
}

export const CatCharacter: React.FC<CatCharacterProps> = ({
  skin,
  direction,
  isMoving,
  stepPhase,
  mood = 'normal',
  size = 40,
}) => {
  // Fur color palette according to skin
  const colors = {
    orange: {
      primary: '#f97316', // orange-500
      secondary: '#ea580c', // orange-600
      accent: '#fed7aa', // orange-200 (belly/muzzle)
      eyes: '#16a34a', // green
      innerEar: '#f43f5e',
      nose: '#f43f5e',
      stripes: '#c2410c',
    },
    black: {
      primary: '#1e293b', // slate-800
      secondary: '#0f172a', // slate-900
      accent: '#334155', // slate-700
      eyes: '#eab308', // luminous golden amber
      innerEar: '#f43f5e',
      nose: '#334155',
      stripes: '#020617',
    },
    calico: {
      primary: '#fffbeb', // cream white base
      secondary: '#ea580c', // ginger patch
      accent: '#334155', // dark slate patch
      eyes: '#0284c7', // sky blue
      innerEar: '#f43f5e',
      nose: '#f43f5e',
      stripes: '#c2410c',
    },
    white: {
      primary: '#f8fafc', // slate-50
      secondary: '#e2e8f0', // slate-200
      accent: '#ffffff',
      eyes: '#06b6d4', // cyan/ice blue
      innerEar: '#fb7185',
      nose: '#fb7185',
      stripes: '#cbd5e1',
    },
  }[skin];

  // Alternating paw offset when moving
  const pawOffset = isMoving ? (stepPhase % 2 === 0 ? 3 : -3) : 0;
  const tailSway = isMoving ? (stepPhase % 2 === 0 ? 8 : -8) : 0;

  return (
    <div
      className="relative flex items-center justify-center transition-transform duration-100 ease-out select-none"
      style={{
        width: size,
        height: size,
        transform: mood === 'happy' ? 'scale(1.15)' : 'scale(1)',
      }}
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className="overflow-visible filter drop-shadow-md"
      >
        {/* Soft shadow under the cat */}
        <ellipse
          cx="50"
          cy="85"
          rx="32"
          ry="10"
          fill="rgba(0, 0, 0, 0.28)"
        />

        {/* -------------------- FACING UP (BACK VIEW) -------------------- */}
        {direction === 'UP' && (
          <g>
            {/* Tail swishing upwards */}
            <path
              d={`M 50 68 Q ${38 + tailSway} 42, ${46 + tailSway * 1.5} 24 Q ${54 + tailSway * 1.5} 22, ${52 + tailSway} 34 Q ${48 + tailSway} 48, 54 68 Z`}
              fill={colors.primary}
              stroke={colors.secondary}
              strokeWidth="2"
            />
            {/* Back Paws */}
            <ellipse
              cx={34 + pawOffset}
              cy="76"
              rx="9"
              ry="8"
              fill={colors.secondary}
            />
            <ellipse
              cx={66 - pawOffset}
              cy="76"
              rx="9"
              ry="8"
              fill={colors.secondary}
            />

            {/* Cat Body Back */}
            <ellipse
              cx="50"
              cy="62"
              rx="24"
              ry="22"
              fill={colors.primary}
              stroke={colors.secondary}
              strokeWidth="2"
            />

            {/* Calico or Tabby back markings */}
            {skin === 'orange' && (
              <g opacity="0.6">
                <path d="M 40 52 L 48 56 L 40 60" stroke={colors.stripes} strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M 60 52 L 52 56 L 60 60" stroke={colors.stripes} strokeWidth="3" fill="none" strokeLinecap="round" />
              </g>
            )}
            {skin === 'calico' && (
              <g>
                <circle cx="42" cy="56" r="10" fill={colors.secondary} opacity="0.9" />
                <circle cx="58" cy="64" r="8" fill={colors.accent} opacity="0.9" />
              </g>
            )}

            {/* Back of Head */}
            <circle
              cx="50"
              cy="40"
              r="20"
              fill={colors.primary}
              stroke={colors.secondary}
              strokeWidth="2"
            />

            {/* Ears (pointing away) */}
            <polygon
              points="32,32 38,14 46,28"
              fill={colors.primary}
              stroke={colors.secondary}
              strokeWidth="2"
            />
            <polygon
              points="68,32 62,14 54,28"
              fill={colors.primary}
              stroke={colors.secondary}
              strokeWidth="2"
            />
          </g>
        )}

        {/* -------------------- FACING DOWN (FRONT VIEW) -------------------- */}
        {direction === 'DOWN' && (
          <g>
            {/* Tail peeking out side */}
            <path
              d={`M 66 70 Q ${82 + tailSway} 60, ${84 + tailSway} 42 Q ${88 + tailSway} 43, ${80 + tailSway} 68 Z`}
              fill={colors.primary}
              stroke={colors.secondary}
              strokeWidth="2"
            />

            {/* Front Paws */}
            <ellipse
              cx={34 - pawOffset}
              cy="79"
              rx="9"
              ry="7"
              fill={colors.accent}
              stroke={colors.secondary}
              strokeWidth="1.5"
            />
            <ellipse
              cx={66 + pawOffset}
              cy="79"
              rx="9"
              ry="7"
              fill={colors.accent}
              stroke={colors.secondary}
              strokeWidth="1.5"
            />

            {/* Body */}
            <ellipse
              cx="50"
              cy="64"
              rx="24"
              ry="20"
              fill={colors.primary}
              stroke={colors.secondary}
              strokeWidth="2"
            />

            {/* Belly patch */}
            <ellipse
              cx="50"
              cy="66"
              rx="13"
              ry="14"
              fill={colors.accent}
            />

            {/* Ears */}
            <polygon
              points="32,35 36,12 47,26"
              fill={colors.primary}
              stroke={colors.secondary}
              strokeWidth="2"
            />
            <polygon
              points="35,32 38,16 45,26"
              fill={colors.innerEar}
            />

            <polygon
              points="68,35 64,12 53,26"
              fill={colors.primary}
              stroke={colors.secondary}
              strokeWidth="2"
            />
            <polygon
              points="65,32 62,16 55,26"
              fill={colors.innerEar}
            />

            {/* Head */}
            <circle
              cx="50"
              cy="40"
              r="20"
              fill={colors.primary}
              stroke={colors.secondary}
              strokeWidth="2"
            />

            {/* Calico face patch */}
            {skin === 'calico' && (
              <path
                d="M 50 20 Q 66 22, 68 38 Q 62 50, 50 42 Z"
                fill={colors.secondary}
                opacity="0.95"
              />
            )}

            {/* Muzzle / Cheeks */}
            <ellipse cx="44" cy="45" rx="7" ry="5" fill={colors.accent} />
            <ellipse cx="56" cy="45" rx="7" ry="5" fill={colors.accent} />

            {/* Nose */}
            <polygon
              points="48,42 52,42 50,45"
              fill={colors.nose}
            />

            {/* Whiskers */}
            <line x1="26" y1="43" x2="38" y2="44" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="24" y1="48" x2="38" y2="47" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="74" y1="43" x2="62" y2="44" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="76" y1="48" x2="62" y2="47" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />

            {/* Eyes */}
            {mood === 'happy' ? (
              <g stroke="#0f172a" strokeWidth="2.5" fill="none" strokeLinecap="round">
                <path d="M 38 37 Q 42 32, 46 37" />
                <path d="M 54 37 Q 58 32, 62 37" />
              </g>
            ) : mood === 'meow' ? (
              <g>
                <circle cx="42" cy="36" r="5.5" fill={colors.eyes} />
                <circle cx="58" cy="36" r="5.5" fill={colors.eyes} />
                <circle cx="43" cy="35" r="2.5" fill="#000000" />
                <circle cx="59" cy="35" r="2.5" fill="#000000" />
                <circle cx="41" cy="34" r="1.5" fill="#ffffff" />
                <circle cx="57" cy="34" r="1.5" fill="#ffffff" />
                {/* Meow open mouth */}
                <ellipse cx="50" cy="49" rx="3.5" ry="4" fill="#f43f5e" />
              </g>
            ) : (
              <g>
                <ellipse cx="42" cy="36" rx="5" ry="6" fill={colors.eyes} />
                <ellipse cx="58" cy="36" rx="5" ry="6" fill={colors.eyes} />
                <ellipse cx="42" cy="36" rx="2" ry="5" fill="#000000" />
                <ellipse cx="58" cy="36" rx="2" ry="5" fill="#000000" />
                {/* Eye sparkle highlights */}
                <circle cx="41" cy="34" r="1.5" fill="#ffffff" />
                <circle cx="57" cy="34" r="1.5" fill="#ffffff" />
                {/* Cute little mouth */}
                <path
                  d="M 47 46 Q 50 48, 50 46 Q 50 48, 53 46"
                  stroke="#1e293b"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                />
              </g>
            )}

            {/* Little collar with golden bell */}
            <path d="M 40 54 Q 50 59, 60 54" stroke="#dc2626" strokeWidth="3" fill="none" strokeLinecap="round" />
            <circle cx="50" cy="57" r="3.5" fill="#f59e0b" stroke="#b45309" strokeWidth="1" />
          </g>
        )}

        {/* -------------------- FACING LEFT (PROFILE LEFT) -------------------- */}
        {direction === 'LEFT' && (
          <g>
            {/* Tail to right */}
            <path
              d={`M 66 65 Q ${82 + tailSway} 50, ${78 + tailSway} 32 Q ${74 + tailSway} 32, ${72 + tailSway} 52 Q 68 62, 60 66 Z`}
              fill={colors.primary}
              stroke={colors.secondary}
              strokeWidth="2"
            />

            {/* Back Paws */}
            <ellipse
              cx={62 - pawOffset}
              cy="78"
              rx="8"
              ry="7"
              fill={colors.secondary}
            />

            {/* Body */}
            <ellipse
              cx="48"
              cy="62"
              rx="24"
              ry="18"
              fill={colors.primary}
              stroke={colors.secondary}
              strokeWidth="2"
            />

            {/* Front Paws */}
            <ellipse
              cx={32 + pawOffset}
              cy="78"
              rx="8"
              ry="7"
              fill={colors.accent}
              stroke={colors.secondary}
              strokeWidth="1.5"
            />

            {/* Ears */}
            <polygon
              points="30,32 26,12 38,22"
              fill={colors.primary}
              stroke={colors.secondary}
              strokeWidth="2"
            />
            <polygon
              points="29,29 27,15 36,23"
              fill={colors.innerEar}
            />
            <polygon
              points="42,32 40,15 50,25"
              fill={colors.secondary}
              stroke={colors.secondary}
              strokeWidth="2"
            />

            {/* Head */}
            <circle
              cx="34"
              cy="38"
              r="18"
              fill={colors.primary}
              stroke={colors.secondary}
              strokeWidth="2"
            />

            {/* Left Muzzle */}
            <ellipse cx="23" cy="42" rx="7" ry="5" fill={colors.accent} />
            <polygon points="17,40 21,39 20,42" fill={colors.nose} />

            {/* Whiskers */}
            <line x1="8" y1="41" x2="19" y2="42" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="10" y1="46" x2="19" y2="44" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />

            {/* Left Eye */}
            <ellipse cx="28" cy="35" rx="4.5" ry="5.5" fill={colors.eyes} />
            <ellipse cx="27" cy="35" rx="1.8" ry="4.5" fill="#000000" />
            <circle cx="26" cy="33" r="1.3" fill="#ffffff" />
          </g>
        )}

        {/* -------------------- FACING RIGHT (PROFILE RIGHT) -------------------- */}
        {direction === 'RIGHT' && (
          <g>
            {/* Tail to left */}
            <path
              d={`M 34 65 Q ${18 - tailSway} 50, ${22 - tailSway} 32 Q ${26 - tailSway} 32, ${28 - tailSway} 52 Q 32 62, 40 66 Z`}
              fill={colors.primary}
              stroke={colors.secondary}
              strokeWidth="2"
            />

            {/* Back Paws */}
            <ellipse
              cx={38 + pawOffset}
              cy="78"
              rx="8"
              ry="7"
              fill={colors.secondary}
            />

            {/* Body */}
            <ellipse
              cx="52"
              cy="62"
              rx="24"
              ry="18"
              fill={colors.primary}
              stroke={colors.secondary}
              strokeWidth="2"
            />

            {/* Front Paws */}
            <ellipse
              cx={68 - pawOffset}
              cy="78"
              rx="8"
              ry="7"
              fill={colors.accent}
              stroke={colors.secondary}
              strokeWidth="1.5"
            />

            {/* Ears */}
            <polygon
              points="70,32 74,12 62,22"
              fill={colors.primary}
              stroke={colors.secondary}
              strokeWidth="2"
            />
            <polygon
              points="71,29 73,15 64,23"
              fill={colors.innerEar}
            />
            <polygon
              points="58,32 60,15 50,25"
              fill={colors.secondary}
              stroke={colors.secondary}
              strokeWidth="2"
            />

            {/* Head */}
            <circle
              cx="66"
              cy="38"
              r="18"
              fill={colors.primary}
              stroke={colors.secondary}
              strokeWidth="2"
            />

            {/* Right Muzzle */}
            <ellipse cx="77" cy="42" rx="7" ry="5" fill={colors.accent} />
            <polygon points="83,40 79,39 80,42" fill={colors.nose} />

            {/* Whiskers */}
            <line x1="92" y1="41" x2="81" y2="42" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="90" y1="46" x2="81" y2="44" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />

            {/* Right Eye */}
            <ellipse cx="72" cy="35" rx="4.5" ry="5.5" fill={colors.eyes} />
            <ellipse cx="73" cy="35" rx="1.8" ry="4.5" fill="#000000" />
            <circle cx="74" cy="33" r="1.3" fill="#ffffff" />
          </g>
        )}
      </svg>
    </div>
  );
};
