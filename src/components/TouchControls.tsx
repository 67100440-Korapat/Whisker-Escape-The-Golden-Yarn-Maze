import React from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { Direction } from '../types/game';

interface TouchControlsProps {
  onDirectionStart: (direction: Direction) => void;
  onDirectionEnd: () => void;
  onMeow: () => void;
}

export const TouchControls: React.FC<TouchControlsProps> = ({
  onDirectionStart,
  onDirectionEnd,
  onMeow,
}) => {
  const handlePointerDown = (dir: Direction, e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    onDirectionStart(dir);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    e.preventDefault();
    onDirectionEnd();
  };

  return (
    <div className="flex items-center justify-between w-full max-w-sm mx-auto px-4 py-2 pointer-events-auto select-none touch-none">
      {/* Meow quick action */}
      <button
        type="button"
        onClick={onMeow}
        className="w-14 h-14 rounded-2xl bg-amber-500/20 active:bg-amber-500/40 border border-amber-500/30 flex flex-col items-center justify-center text-amber-300 font-semibold text-xs shadow-md transition-transform active:scale-90"
        title="Meow (Space)"
      >
        <span className="text-xl">🐾</span>
        <span className="text-[10px] tracking-wide mt-0.5">Meow</span>
      </button>

      {/* D-Pad 4-way direction buttons with Hold-to-Walk */}
      <div className="relative w-36 h-36 flex items-center justify-center">
        {/* Background plate */}
        <div className="absolute inset-0 bg-slate-800/80 backdrop-blur-sm rounded-3xl border border-slate-700/60 shadow-xl" />

        {/* Up Button */}
        <button
          type="button"
          onPointerDown={(e) => handlePointerDown('UP', e)}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="absolute top-1 left-1/2 -translate-x-1/2 w-11 h-11 rounded-xl bg-slate-700/90 active:bg-amber-500 text-slate-200 active:text-slate-950 flex items-center justify-center shadow transition-all active:scale-95"
          aria-label="Hold to Move Up (W or Arrow Up)"
        >
          <ArrowUp className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Down Button */}
        <button
          type="button"
          onPointerDown={(e) => handlePointerDown('DOWN', e)}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="absolute bottom-1 left-1/2 -translate-x-1/2 w-11 h-11 rounded-xl bg-slate-700/90 active:bg-amber-500 text-slate-200 active:text-slate-950 flex items-center justify-center shadow transition-all active:scale-95"
          aria-label="Hold to Move Down (S or Arrow Down)"
        >
          <ArrowDown className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Left Button */}
        <button
          type="button"
          onPointerDown={(e) => handlePointerDown('LEFT', e)}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="absolute left-1 top-1/2 -translate-y-1/2 w-11 h-11 rounded-xl bg-slate-700/90 active:bg-amber-500 text-slate-200 active:text-slate-950 flex items-center justify-center shadow transition-all active:scale-95"
          aria-label="Hold to Move Left (A or Arrow Left)"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Right Button */}
        <button
          type="button"
          onPointerDown={(e) => handlePointerDown('RIGHT', e)}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="absolute right-1 top-1/2 -translate-y-1/2 w-11 h-11 rounded-xl bg-slate-700/90 active:bg-amber-500 text-slate-200 active:text-slate-950 flex items-center justify-center shadow transition-all active:scale-95"
          aria-label="Hold to Move Right (D or Arrow Right)"
        >
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Center decorative hub */}
        <div className="w-6 h-6 rounded-full bg-slate-900 border border-slate-700/80 pointer-events-none" />
      </div>
    </div>
  );
};

