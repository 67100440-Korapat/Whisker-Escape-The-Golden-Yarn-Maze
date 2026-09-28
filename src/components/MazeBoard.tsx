import React, { useRef, useEffect, useState, useMemo } from 'react';
import { CatCharacter } from './CatCharacter';
import { GoldenYarnItem, ExitDoorItem, PawPrintItem } from './MazeItems';
import {
  CatSkin,
  Direction,
  LevelData,
  PawPrint,
  Position,
  FloatingParticle,
} from '../types/game';

interface MazeBoardProps {
  level: LevelData;
  catPos: Position;
  direction: Direction;
  isMoving: boolean;
  stepCount: number;
  skin: CatSkin;
  collectedYarns: Set<string>;
  pawPrints: PawPrint[];
  particles: FloatingParticle[];
  isDoorUnlocked: boolean;
  onTileClick?: (x: number, y: number) => void;
  catMood: 'normal' | 'happy' | 'meow' | 'puzzled';
}

export const MazeBoard: React.FC<MazeBoardProps> = ({
  level,
  catPos,
  direction,
  isMoving,
  stepCount,
  skin,
  collectedYarns,
  pawPrints,
  particles,
  isDoorUnlocked,
  onTileClick,
  catMood,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [boardDimensions, setBoardDimensions] = useState({ width: 500, height: 500, cellSize: 36 });

  // Calculate responsive cell size based on viewport/container
  useEffect(() => {
    const updateSize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const availableWidth = Math.max(300, rect.width - 24);
      const availableHeight = Math.max(300, window.innerHeight - 230); // space for HUD & bottom controls

      const maxDimWidth = Math.floor(availableWidth / level.width);
      const maxDimHeight = Math.floor(availableHeight / level.height);
      const targetCellSize = Math.min(Math.max(maxDimWidth, 18), Math.max(maxDimHeight, 18), 52);

      setBoardDimensions({
        cellSize: targetCellSize,
        width: targetCellSize * level.width,
        height: targetCellSize * level.height,
      });
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [level.width, level.height]);

  const { cellSize, width, height } = boardDimensions;

  // Remaining yarn count
  const remainingYarns = useMemo(() => {
    return level.yarns.filter((y) => !collectedYarns.has(`${y.x},${y.y}`)).length;
  }, [level.yarns, collectedYarns]);

  return (
    <div
      ref={containerRef}
      className="flex-1 w-full flex items-center justify-center p-2 sm:p-4 overflow-hidden relative"
      style={{
        backgroundColor: level.theme.floorColor,
        backgroundImage: `radial-gradient(ellipse at 50% 50%, ${level.theme.ambientLight}, transparent 70%)`,
      }}
    >
      {/* Maze Container Box */}
      <div
        className="relative rounded-2xl shadow-2xl overflow-hidden border-4 select-none"
        style={{
          width,
          height,
          backgroundColor: level.theme.floorColor,
          borderColor: level.theme.wallBorderColor,
          boxShadow: `0 20px 40px -15px rgba(0, 0, 0, 0.7), inset 0 0 40px rgba(0,0,0,0.5)`,
        }}
      >
        {/* Floor Tiles Grid */}
        <div
          className="absolute inset-0 grid"
          style={{
            gridTemplateColumns: `repeat(${level.width}, ${cellSize}px)`,
            gridTemplateRows: `repeat(${level.height}, ${cellSize}px)`,
          }}
        >
          {level.layout.map((row, y) =>
            row.map((cellType, x) => {
              const isWall = cellType === 1;
              const isExit = level.exitPos.x === x && level.exitPos.y === y;
              const isStart = level.startPos.x === x && level.startPos.y === y;

              // Wall 3D visual look
              if (isWall) {
                return (
                  <div
                    key={`tile-${x}-${y}`}
                    className="relative"
                    style={{
                      backgroundColor: level.theme.wallColor,
                      boxShadow: `inset 0 3px 0 ${level.theme.wallTopColor}, inset 0 -3px 0 rgba(0,0,0,0.4), inset 3px 0 0 rgba(255,255,255,0.06), inset -3px 0 0 rgba(0,0,0,0.3)`,
                    }}
                  >
                    {/* Subtle brick / rafter texture line */}
                    {(x + y) % 2 === 0 && (
                      <div
                        className="absolute inset-0 opacity-15 pointer-events-none"
                        style={{
                          borderBottom: `1px solid ${level.theme.wallBorderColor}`,
                          borderRight: `1px solid ${level.theme.wallBorderColor}`,
                        }}
                      />
                    )}
                  </div>
                );
              }

              // Path Floor Tile
              return (
                <div
                  key={`tile-${x}-${y}`}
                  onClick={() => onTileClick?.(x, y)}
                  className="relative transition-colors duration-150"
                  style={{
                    backgroundColor: (x + y) % 2 === 0 ? level.theme.floorColor : level.theme.floorPatternColor,
                    boxShadow: 'inset 0 0 8px rgba(0,0,0,0.25)',
                  }}
                >
                  {/* Subtle wood plank or stone seam line */}
                  <div className="absolute inset-0 border border-black/10 pointer-events-none" />

                  {/* Start Pad Marker */}
                  {isStart && (
                    <div className="absolute inset-1 rounded-full border border-dashed border-amber-500/40 flex items-center justify-center pointer-events-none">
                      <span className="text-[10px] text-amber-500/60 font-mono">START</span>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Paw Prints Trail Layer */}
        {pawPrints.map((paw) => (
          <div
            key={paw.id}
            className="absolute transition-all duration-300"
            style={{
              left: paw.x * cellSize,
              top: paw.y * cellSize,
              width: cellSize,
              height: cellSize,
            }}
          >
            <PawPrintItem size={cellSize} opacity={paw.opacity} />
          </div>
        ))}

        {/* Golden Yarn Balls Layer */}
        {level.yarns.map((yarn) => {
          const yarnKey = `${yarn.x},${yarn.y}`;
          const isCollected = collectedYarns.has(yarnKey);
          if (isCollected) return null;

          return (
            <div
              key={`yarn-${yarnKey}`}
              className="absolute pointer-events-none z-10 flex items-center justify-center"
              style={{
                left: yarn.x * cellSize,
                top: yarn.y * cellSize,
                width: cellSize,
                height: cellSize,
              }}
            >
              <GoldenYarnItem size={cellSize} />
            </div>
          );
        })}

        {/* Exit Door */}
        <div
          className="absolute z-10 flex items-center justify-center pointer-events-none"
          style={{
            left: level.exitPos.x * cellSize,
            top: level.exitPos.y * cellSize,
            width: cellSize,
            height: cellSize,
          }}
        >
          <ExitDoorItem
            size={cellSize}
            isUnlocked={isDoorUnlocked}
            yarnsLeft={remainingYarns}
          />
        </div>

        {/* The Cat Character */}
        <div
          className="absolute z-20 pointer-events-none flex items-center justify-center transition-all duration-180 ease-out"
          style={{
            transform: `translate3d(${catPos.x * cellSize}px, ${catPos.y * cellSize}px, 0)`,
            width: cellSize,
            height: cellSize,
          }}
        >
          <CatCharacter
            skin={skin}
            direction={direction}
            isMoving={isMoving}
            stepPhase={stepCount}
            mood={catMood}
            size={cellSize * 1.15}
          />
        </div>

        {/* Floating Particle Overlay */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute pointer-events-none z-30 font-bold text-xs select-none transition-transform"
            style={{
              left: p.x * cellSize + cellSize / 2,
              top: p.y * cellSize - (1 - p.life) * 45,
              opacity: p.life,
              transform: `translate(-50%, -50%) scale(${0.8 + (1 - p.life) * 0.4})`,
            }}
          >
            {p.type === 'yarn' && (
              <span className="text-amber-300 filter drop-shadow-md text-sm font-heading flex items-center gap-1">
                <span>+1</span> 🧶
              </span>
            )}
            {p.type === 'heart' && (
              <span className="text-rose-400 filter drop-shadow-md text-base">
                ❤️
              </span>
            )}
            {p.type === 'meow' && (
              <span className="text-amber-200 filter drop-shadow-md text-xs font-heading font-semibold bg-slate-900/80 px-1.5 py-0.5 rounded-full border border-amber-400/40">
                {p.text || 'Meow!'}
              </span>
            )}
            {p.type === 'sparkle' && (
              <span className="text-yellow-200 filter drop-shadow-md text-sm">
                ✨
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
