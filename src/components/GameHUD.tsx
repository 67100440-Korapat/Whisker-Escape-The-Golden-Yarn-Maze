import React from 'react';
import { Volume2, VolumeX, RotateCcw, HelpCircle, Grid, Music } from 'lucide-react';
import { LevelData } from '../types/game';

interface GameHUDProps {
  level: LevelData;
  totalLevels: number;
  yarnsCollected: number;
  totalYarns: number;
  timeSeconds: number;
  steps: number;
  isUnlocked: boolean;
  isSoundMuted: boolean;
  isMusicMuted: boolean;
  onToggleSound: () => void;
  onToggleMusic: () => void;
  onRestart: () => void;
  onOpenLevelSelect: () => void;
  onOpenHelp: () => void;
  onMeow: () => void;
}

export const GameHUD: React.FC<GameHUDProps> = ({
  level,
  totalLevels,
  yarnsCollected,
  totalYarns,
  timeSeconds,
  steps,
  isUnlocked,
  isSoundMuted,
  isMusicMuted,
  onToggleSound,
  onToggleMusic,
  onRestart,
  onOpenLevelSelect,
  onOpenHelp,
  onMeow,
}) => {
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remaining.toString().padStart(2, '0')}`;
  };

  const isComplete = yarnsCollected === totalYarns;

  return (
    <header className="w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white select-none z-20">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        {/* Zone 1: Level Title & Theme */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onOpenLevelSelect}
            className="flex items-center gap-2 group text-left hover:opacity-85 transition-opacity focus:outline-none"
            title="Choose Level"
          >
            <span className="text-xl" role="img" aria-label={level.theme.name}>
              {level.theme.icon}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold tracking-wide uppercase">
                <span>Level {level.id} of {totalLevels}</span>
                <span className="text-slate-500">·</span>
                <span className="text-slate-400 font-normal truncate">{level.theme.name}</span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-white tracking-tight truncate leading-tight font-heading">
                {level.name}
              </h1>
            </div>
          </button>
        </div>

        {/* Zone 2: Objectives & Stats (Clean unboxed metadata, zero-pill discipline) */}
        <div className="flex items-center gap-4 sm:gap-6 text-sm">
          {/* Golden Yarn Tracker */}
          <div className="flex items-center gap-2">
            <span className="text-lg animate-yarn-float" role="img" aria-label="Golden Yarn">
              🧶
            </span>
            <div className="flex flex-col">
              <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
                Golden Yarn
              </span>
              <div className="flex items-baseline gap-1 font-mono tabular-nums">
                <span className={`text-base font-bold ${isComplete ? 'text-amber-400 font-semibold' : 'text-white'}`}>
                  {yarnsCollected}
                </span>
                <span className="text-slate-500 text-xs">/</span>
                <span className="text-slate-400 text-xs">{totalYarns}</span>
              </div>
            </div>
          </div>

          {/* Door Status */}
          <div className="hidden md:flex flex-col">
            <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
              Exit Door
            </span>
            <div className="flex items-center gap-1.5 text-xs font-medium">
              {isUnlocked ? (
                <span className="text-emerald-400 flex items-center gap-1 font-semibold animate-pulse">
                  <span>✨</span> Unlocked!
                </span>
              ) : (
                <span className="text-slate-400 flex items-center gap-1">
                  <span>🔒</span> Locked ({totalYarns - yarnsCollected} more)
                </span>
              )}
            </div>
          </div>

          {/* Time & Steps */}
          <div className="flex items-center gap-3 sm:gap-4 border-l border-slate-800 pl-3 sm:pl-4 text-xs font-mono tabular-nums text-slate-300">
            <div className="flex flex-col">
              <span className="text-[11px] text-slate-400 font-sans font-medium uppercase tracking-wider">
                Time
              </span>
              <span className="text-sm font-semibold text-white">{formatTime(timeSeconds)}</span>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-[11px] text-slate-400 font-sans font-medium uppercase tracking-wider">
                Steps
              </span>
              <span className="text-sm font-semibold text-slate-300">{steps}</span>
            </div>
          </div>
        </div>

        {/* Zone 3: Actions (Audio, Meow, Restart, Help) */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Quick Meow Button */}
          <button
            onClick={onMeow}
            className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 text-xs font-semibold rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors flex items-center gap-1.5 shadow-sm active:scale-95 whitespace-nowrap"
            title="Press Space or Click to Meow"
          >
            <span>🐾</span>
            <span className="hidden sm:inline">Meow!</span>
          </button>

          {/* Restart Level */}
          <button
            onClick={onRestart}
            className="p-1.5 sm:p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Restart Level (R)"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Audio Sound FX Toggle */}
          <button
            onClick={onToggleSound}
            className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
              isSoundMuted ? 'text-rose-400 hover:bg-rose-950/40' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title={isSoundMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
          >
            {isSoundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Music Toggle */}
          <button
            onClick={onToggleMusic}
            className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
              isMusicMuted ? 'text-slate-600 hover:text-slate-400 hover:bg-slate-800' : 'text-amber-400 hover:bg-slate-800'
            }`}
            title={isMusicMuted ? 'Enable Cozy Music' : 'Mute Music'}
          >
            <Music className="w-4 h-4" />
          </button>

          {/* Level Select */}
          <button
            onClick={onOpenLevelSelect}
            className="p-1.5 sm:p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Level Select"
          >
            <Grid className="w-4 h-4" />
          </button>

          {/* Help */}
          <button
            onClick={onOpenHelp}
            className="p-1.5 sm:p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Instructions & Controls"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
