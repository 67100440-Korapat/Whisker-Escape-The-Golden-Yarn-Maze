import React from 'react';
import { Play, Grid, HelpCircle, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { CatSkin } from '../types/game';
import { CatCharacter } from './CatCharacter';

interface TitleScreenProps {
  skin: CatSkin;
  onSelectSkin: (skin: CatSkin) => void;
  onStartGame: () => void;
  onOpenLevelSelect: () => void;
  onOpenHelp: () => void;
  isSoundMuted: boolean;
  onToggleSound: () => void;
  onMeow: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  skin,
  onSelectSkin,
  onStartGame,
  onOpenLevelSelect,
  onOpenHelp,
  isSoundMuted,
  onToggleSound,
  onMeow,
}) => {
  const skins: { id: CatSkin; name: string }[] = [
    { id: 'orange', name: 'Ginger Milo' },
    { id: 'black', name: 'Midnight Shadow' },
    { id: 'calico', name: 'Calico Cleo' },
    { id: 'white', name: 'White Snowball' },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden select-none bg-slate-950 text-white">
      {/* Ambient background glow & stars */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top right quick controls */}
      <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
        <button
          onClick={onToggleSound}
          className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          title={isSoundMuted ? 'Unmute Sound' : 'Mute Sound'}
        >
          {isSoundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
        <button
          onClick={onOpenHelp}
          className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          title="How to Play"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
      </div>

      {/* Main Container */}
      <div className="max-w-lg w-full flex flex-col items-center text-center z-10">
        {/* Decorative Golden Yarn Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-4 tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>7-Level Labyrinth Adventure</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-heading leading-tight mb-2 text-white">
          Whisker <span className="text-amber-400">Escape</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-md mx-auto mb-6">
          Collect golden yarn balls to break the padlock seal and escape each maze!
        </p>

        {/* Animated Interactive Cat Stage */}
        <div
          onClick={onMeow}
          className="cursor-pointer group relative my-2 p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/50 shadow-xl transition-all duration-300 flex flex-col items-center"
          title="Click to Meow!"
        >
          {/* Subtle halo */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Cat sprite */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center transition-transform group-hover:scale-110">
            <CatCharacter
              skin={skin}
              direction="DOWN"
              isMoving={false}
              stepPhase={0}
              mood="normal"
              size={90}
            />
          </div>

          <div className="mt-2 text-xs font-medium text-amber-400/90 flex items-center gap-1 group-hover:text-amber-300">
            <span>🐾</span> Click kitty to Meow!
          </div>
        </div>

        {/* Cat Skin Selector Tabs */}
        <div className="my-5 w-full">
          <div className="text-xs text-slate-400 font-medium mb-2 uppercase tracking-wider">
            Choose Your Cat
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {skins.map((s) => {
              const isSelected = skin === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => onSelectSkin(s.id)}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all border ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-bold'
                      : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {s.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm mt-2">
          <button
            onClick={onStartGame}
            className="flex-1 py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-base transition-all shadow-lg hover:shadow-amber-500/25 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Start Adventure</span>
          </button>

          <button
            onClick={onOpenLevelSelect}
            className="py-3.5 px-5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition-colors border border-slate-700 flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <Grid className="w-4 h-4" />
            <span>Select Level</span>
          </button>
        </div>

        {/* Control hints */}
        <div className="mt-8 text-xs text-slate-500 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <span>Controls: <strong className="text-slate-400">Hold WASD</strong> or <strong className="text-slate-400">Arrow Keys</strong> to Walk</span>
          <span>·</span>
          <span>Space: <strong className="text-slate-400">Meow</strong></span>
          <span>·</span>
          <span>7 Handcrafted Mazes</span>
        </div>
      </div>
    </div>
  );
};
