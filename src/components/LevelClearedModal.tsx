import React from 'react';
import { Star, ArrowRight, RotateCcw, Grid } from 'lucide-react';
import { LevelData } from '../types/game';

interface LevelClearedModalProps {
  level: LevelData;
  timeSeconds: number;
  steps: number;
  stars: number;
  hasNextLevel: boolean;
  onNextLevel: () => void;
  onReplay: () => void;
  onLevelSelect: () => void;
}

export const LevelClearedModal: React.FC<LevelClearedModalProps> = ({
  level,
  timeSeconds,
  steps,
  stars,
  hasNextLevel,
  onNextLevel,
  onReplay,
  onLevelSelect,
}) => {
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins}:${rem.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 select-none">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-md w-full p-6 sm:p-8 text-center shadow-2xl relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Level cleared badge */}
        <div className="text-4xl mb-2 animate-bounce">🚪✨</div>
        <div className="text-xs font-semibold text-amber-400 tracking-wider uppercase mb-1">
          Level {level.id} Complete
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-heading mb-4">
          Escape Successful!
        </h2>

        {/* Stars rating */}
        <div className="flex items-center justify-center gap-3 my-4">
          {[1, 2, 3].map((starNum) => {
            const isEarned = starNum <= stars;
            return (
              <div
                key={starNum}
                className={`transition-all duration-300 transform ${
                  isEarned ? 'text-amber-400 scale-110 drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]' : 'text-slate-700 scale-95'
                }`}
              >
                <Star className="w-9 h-9 fill-current stroke-current" />
              </div>
            );
          })}
        </div>
        <p className="text-xs text-slate-400 mb-6">
          {stars === 3
            ? 'Purr-fect performance! All golden yarns retrieved in record time.'
            : stars === 2
            ? 'Great navigation! Beat the par time to score 3 stars.'
            : 'Level escaped! Try a faster route to earn more stars.'}
        </p>

        {/* Clean unboxed stats */}
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-4 grid grid-cols-3 gap-2 text-center mb-6">
          <div>
            <div className="text-[11px] text-slate-400 uppercase tracking-wider mb-1">Your Time</div>
            <div className="text-base font-bold text-white font-mono tabular-nums">
              {formatTime(timeSeconds)}
            </div>
            <div className="text-[10px] text-slate-500 font-mono">Par: {formatTime(level.targetTimeSeconds)}</div>
          </div>
          <div>
            <div className="text-[11px] text-slate-400 uppercase tracking-wider mb-1">Golden Yarns</div>
            <div className="text-base font-bold text-amber-400 font-mono tabular-nums">
              {level.yarns.length} / {level.yarns.length}
            </div>
            <div className="text-[10px] text-slate-500">100% Found</div>
          </div>
          <div>
            <div className="text-[11px] text-slate-400 uppercase tracking-wider mb-1">Total Steps</div>
            <div className="text-base font-bold text-white font-mono tabular-nums">
              {steps}
            </div>
            <div className="text-[10px] text-slate-500">Paws Walked</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5">
          {hasNextLevel && (
            <button
              onClick={onNextLevel}
              className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-[0.98] text-slate-950 font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <span>Next Level</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={onReplay}
              className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-[0.98] text-slate-300 font-medium text-xs transition-colors flex items-center justify-center gap-1.5 border border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Play Again</span>
            </button>
            <button
              onClick={onLevelSelect}
              className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-[0.98] text-slate-300 font-medium text-xs transition-colors flex items-center justify-center gap-1.5 border border-slate-700"
            >
              <Grid className="w-3.5 h-3.5" />
              <span>All Levels</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
