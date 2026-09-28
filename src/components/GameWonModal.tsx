import React from 'react';
import { Trophy, Star, RotateCcw, Grid, Sparkles } from 'lucide-react';

interface GameWonModalProps {
  totalTime: number;
  totalSteps: number;
  totalStars: number;
  totalLevels: number;
  totalPossibleStars: number;
  totalPossibleYarns: number;
  onRestartAll: () => void;
  onLevelSelect: () => void;
}

export const GameWonModal: React.FC<GameWonModalProps> = ({
  totalTime,
  totalSteps,
  totalStars,
  totalLevels,
  totalPossibleStars,
  totalPossibleYarns,
  onRestartAll,
  onLevelSelect,
}) => {
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins}:${rem.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 select-none">
      <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-center shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-amber-500/25 blur-3xl pointer-events-none" />

        {/* Crown & Trophy */}
        <div className="relative inline-block mb-3">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400">
            <Trophy className="w-9 h-9 sm:w-11 sm:h-11" />
          </div>
          <div className="absolute -top-2 -right-2 text-2xl animate-bounce">
            👑
          </div>
        </div>

        <div className="text-xs font-semibold text-amber-400 tracking-wider uppercase mb-1 flex items-center justify-center gap-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Supreme Escape Complete</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-heading mb-2">
          You Mastered All {totalLevels} Mazes!
        </h2>
        <p className="text-sm text-slate-300 max-w-sm mx-auto mb-6">
          Every golden yarn ball has been collected! Milo the cat is now free to explore the world as the ultimate grand champion.
        </p>

        {/* Stats summary */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 grid grid-cols-3 gap-2 text-center mb-6">
          <div>
            <div className="text-[11px] text-slate-400 uppercase tracking-wider mb-1">Total Stars</div>
            <div className="text-lg font-bold text-amber-400 flex items-center justify-center gap-1 font-mono">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{totalStars} / {totalPossibleStars}</span>
            </div>
            <div className="text-[10px] text-slate-500">Collected</div>
          </div>
          <div>
            <div className="text-[11px] text-slate-400 uppercase tracking-wider mb-1">Total Time</div>
            <div className="text-lg font-bold text-white font-mono tabular-nums">
              {formatTime(totalTime)}
            </div>
            <div className="text-[10px] text-slate-500">Across {totalLevels} levels</div>
          </div>
          <div>
            <div className="text-[11px] text-slate-400 uppercase tracking-wider mb-1">Golden Yarns</div>
            <div className="text-lg font-bold text-amber-300 font-mono tabular-nums">
              {totalPossibleYarns} / {totalPossibleYarns}
            </div>
            <div className="text-[10px] text-slate-500">All collected!</div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onRestartAll}
            className="flex-1 py-3 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Play From Start</span>
          </button>
          <button
            onClick={onLevelSelect}
            className="flex-1 py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition-colors border border-slate-700 flex items-center justify-center gap-2 active:scale-95"
          >
            <Grid className="w-4 h-4" />
            <span>Select Level</span>
          </button>
        </div>
      </div>
    </div>
  );
};
