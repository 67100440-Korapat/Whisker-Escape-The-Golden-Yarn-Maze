import React from 'react';
import { X, Keyboard, Target, Key, PawPrint, Gauge } from 'lucide-react';
import { CatSkin } from '../types/game';

interface HelpModalProps {
  currentSkin: CatSkin;
  onSelectSkin: (skin: CatSkin) => void;
  walkSpeed: 'relaxed' | 'normal' | 'brisk';
  onSelectWalkSpeed: (speed: 'relaxed' | 'normal' | 'brisk') => void;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({
  currentSkin,
  onSelectSkin,
  walkSpeed,
  onSelectWalkSpeed,
  onClose,
}) => {
  const speeds: { id: 'relaxed' | 'normal' | 'brisk'; label: string; desc: string }[] = [
    { id: 'relaxed', label: 'Relaxed', desc: 'Gentle & steady' },
    { id: 'normal', label: 'Normal', desc: 'Balanced (recommended)' },
    { id: 'brisk', label: 'Brisk', desc: 'Faster pace' },
  ];

  const skins: { id: CatSkin; label: string; desc: string; previewEmoji: string }[] = [
    { id: 'orange', label: 'Milo (Ginger)', desc: 'Playful orange tabby cat', previewEmoji: '🐱' },
    { id: 'black', label: 'Shadow (Midnight)', desc: 'Sleek black cat with golden eyes', previewEmoji: '🐈‍⬛' },
    { id: 'calico', label: 'Cleo (Calico)', desc: 'Sweet tricolor lucky cat', previewEmoji: '🐾' },
    { id: 'white', label: 'Snowball (White)', desc: 'Fluffy white cat with icy blue eyes', previewEmoji: '🤍' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 select-none">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-lg w-full p-6 text-white shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🐱</span>
            <div>
              <h2 className="text-xl font-bold font-heading text-white">How to Play</h2>
              <p className="text-xs text-slate-400">Controls & Guide for Whisker Escape</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section 1: Objective */}
        <div className="mb-5 bg-slate-800/50 border border-slate-700/60 rounded-2xl p-4">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Target className="w-4 h-4" />
            <span>Mission Objective</span>
          </div>
          <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">1.</span>
              <span>
                <strong>Collect Golden Yarn Balls (🧶):</strong> Scout every corridor of the maze. You must collect <em>every single golden yarn</em> to break the door seal.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">2.</span>
              <span>
                <strong>Unlock the Exit Door (🚪):</strong> The exit door stays padlocked until all yarn balls are gathered. Once collected, it bursts into radiant golden light!
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">3.</span>
              <span>
                <strong>Escape through 7 Levels:</strong> Journey from the Cozy Parlor, Kitchen Pantry, Attic, Conservatory, and Wine Vault all the way to the Royal Cat Palace!
              </span>
            </li>
          </ul>
        </div>

        {/* Section 2: Controls */}
        <div className="mb-5 bg-slate-800/50 border border-slate-700/60 rounded-2xl p-4">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Keyboard className="w-4 h-4" />
            <span>Cat Controls (Hold to Walk)</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
              <div className="text-slate-400 text-[11px] mb-1">Hold Keys to Walk</div>
              <div className="flex items-center gap-1 font-mono text-amber-300 font-bold">
                <span className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">W</span>
                <span className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">A</span>
                <span className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">S</span>
                <span className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">D</span>
              </div>
              <div className="text-slate-400 text-[10px] mt-1">or Arrow Keys (↑ ↓ ← →)</div>
            </div>

            <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
              <div className="text-slate-400 text-[11px] mb-1">Cat Actions</div>
              <div className="flex items-center gap-1 font-mono text-amber-300 font-bold">
                <span className="bg-slate-800 px-2 py-0.5 rounded border border-slate-700 text-xs">SPACE</span>
                <span className="text-slate-400 font-normal">Meow!</span>
              </div>
              <div className="text-slate-400 text-[10px] mt-1">Press R to restart level</div>
            </div>
          </div>
          <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1.5">
            <Key className="w-3.5 h-3.5 text-slate-500" />
            <span>On touchscreens or mobile, use the on-screen D-Pad.</span>
          </div>
        </div>

        {/* Section 3: Walking Speed Setting */}
        <div className="mb-5 bg-slate-800/50 border border-slate-700/60 rounded-2xl p-4">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2.5">
            <Gauge className="w-4 h-4" />
            <span>Walking Pace (Hold Button Speed)</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {speeds.map((s) => {
              const isSelected = walkSpeed === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => onSelectWalkSpeed(s.id)}
                  className={`p-2.5 rounded-xl text-center transition-all border ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-md ring-1 ring-amber-400/50'
                      : 'bg-slate-900/40 border-slate-700/80 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <div className="text-xs font-semibold leading-tight">{s.label}</div>
                  <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-slate-900 font-medium' : 'text-slate-400'}`}>
                    {s.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 4: Cat Skin Customization */}
        <div className="mb-5 bg-slate-800/50 border border-slate-700/60 rounded-2xl p-4">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2.5">
            <PawPrint className="w-4 h-4" />
            <span>Choose Your Cat Companion</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {skins.map((s) => {
              const isSelected = currentSkin === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => onSelectSkin(s.id)}
                  className={`p-2.5 rounded-xl text-left transition-all border flex items-center gap-2.5 ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-500 text-white ring-1 ring-amber-500/50'
                      : 'bg-slate-900/40 border-slate-700/80 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <span className="text-xl">{s.previewEmoji}</span>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold truncate leading-tight">{s.label}</div>
                    <div className="text-[10px] text-slate-400 truncate">{s.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-colors shadow"
        >
          Got It, Let's Play!
        </button>
      </div>
    </div>
  );
};
