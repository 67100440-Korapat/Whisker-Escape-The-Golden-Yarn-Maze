import React from 'react';
import { X, Lock, Star, Play } from 'lucide-react';
import { LevelData, LevelRecord } from '../types/game';

interface LevelSelectModalProps {
  levels: LevelData[];
  currentLevelId: number;
  records: Record<number, LevelRecord>;
  onSelectLevel: (levelId: number) => void;
  onClose: () => void;
}

export const LevelSelectModal: React.FC<LevelSelectModalProps> = ({
  levels,
  currentLevelId,
  records,
  onSelectLevel,
  onClose,
}) => {
  const formatTime = (secs: number | null) => {
    if (secs === null) return '--:--';
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins}:${rem.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 select-none">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-3xl w-full p-6 text-white shadow-2xl relative max-h-[88vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
              Choose Maze Level
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Select any unlocked stage to play or improve your best time
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Levels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {levels.map((lvl) => {
            const rec = records[lvl.id] || { completed: false, bestTime: null, stars: 0 };
            // Level 1 is always unlocked. Level 2 is unlocked if level 1 is completed (or unlocked by default).
            // Let's make level unlocked if previous level completed or if it's level 1:
            const isUnlocked = lvl.id === 1 || records[lvl.id - 1]?.completed;
            const isCurrent = lvl.id === currentLevelId;

            return (
              <div
                key={lvl.id}
                className={`relative rounded-2xl p-4 flex flex-col justify-between transition-all duration-200 border ${
                  isUnlocked
                    ? isCurrent
                      ? 'bg-slate-800 border-amber-500/80 shadow-lg ring-1 ring-amber-500/40'
                      : 'bg-slate-800/60 border-slate-700 hover:border-slate-500 hover:bg-slate-800 cursor-pointer'
                    : 'bg-slate-900/40 border-slate-800/60 opacity-60'
                }`}
                onClick={() => {
                  if (isUnlocked) {
                    onSelectLevel(lvl.id);
                  }
                }}
              >
                {/* Level Top Info */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl" role="img" aria-label={lvl.name}>
                      {lvl.theme.icon}
                    </span>
                    {/* Stars */}
                    {isUnlocked && (
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3].map((s) => (
                          <Star
                            key={s}
                            className={`w-3.5 h-3.5 ${
                              s <= rec.stars
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-700'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                    {!isUnlocked && <Lock className="w-4 h-4 text-slate-600" />}
                  </div>

                  <div className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
                    Level {lvl.id}
                  </div>
                  <h3 className="text-base font-bold text-white leading-snug mb-1 font-heading">
                    {lvl.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                    {lvl.subtitle}
                  </p>
                </div>

                {/* Level Stats or Lock Prompt */}
                <div className="pt-3 border-t border-slate-700/60 text-xs">
                  {isUnlocked ? (
                    <div className="flex items-center justify-between text-slate-400">
                      <span>{lvl.yarns.length} Yarns</span>
                      <span className="font-mono tabular-nums text-slate-300">
                        {rec.bestTime ? formatTime(rec.bestTime) : 'New'}
                      </span>
                    </div>
                  ) : (
                    <span className="text-slate-500 text-[11px] flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Complete Level {lvl.id - 1}
                    </span>
                  )}

                  {isUnlocked && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectLevel(lvl.id);
                      }}
                      className={`w-full mt-3 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                        isCurrent
                          ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                          : 'bg-slate-700 text-white hover:bg-slate-600'
                      }`}
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>{isCurrent ? 'Current' : 'Play'}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="text-center text-xs text-slate-500">
          Escape through the exit door of each level to unlock the next maze!
        </div>
      </div>
    </div>
  );
};
