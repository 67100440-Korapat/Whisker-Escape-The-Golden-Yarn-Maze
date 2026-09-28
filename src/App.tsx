import React, { useState, useEffect, useRef, useCallback } from 'react';
import { LEVELS } from './data/levels';
import {
  CatSkin,
  Direction,
  GameState,
  LevelData,
  LevelRecord,
  PawPrint,
  Position,
  FloatingParticle,
} from './types/game';
import { sounds } from './audio/soundEngine';
import { GameHUD } from './components/GameHUD';
import { MazeBoard } from './components/MazeBoard';
import { TouchControls } from './components/TouchControls';
import { TitleScreen } from './components/TitleScreen';
import { LevelClearedModal } from './components/LevelClearedModal';
import { GameWonModal } from './components/GameWonModal';
import { LevelSelectModal } from './components/LevelSelectModal';
import { HelpModal } from './components/HelpModal';

export default function App() {
  // Game state
  const [gameState, setGameState] = useState<GameState>('MENU');
  const [currentLevelIndex, setCurrentLevelIndex] = useState<number>(0);
  const currentLevel: LevelData = LEVELS[currentLevelIndex] || LEVELS[0];

  // Cat State
  const [catPos, setCatPos] = useState<Position>(currentLevel.startPos);
  const [direction, setDirection] = useState<Direction>('DOWN');
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [stepCount, setStepCount] = useState<number>(0);
  const [catMood, setCatMood] = useState<'normal' | 'happy' | 'meow' | 'puzzled'>('normal');
  const [skin, setSkin] = useState<CatSkin>('orange');

  // Game Progress in Level
  const [collectedYarns, setCollectedYarns] = useState<Set<string>>(new Set());
  const [isDoorUnlocked, setIsDoorUnlocked] = useState<boolean>(false);
  const [timeSeconds, setTimeSeconds] = useState<number>(0);
  const [pawPrints, setPawPrints] = useState<PawPrint[]>([]);
  const [particles, setParticles] = useState<FloatingParticle[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Audio state
  const [isSoundMuted, setIsSoundMuted] = useState<boolean>(sounds.getIsMuted());
  const [isMusicMuted, setIsMusicMuted] = useState<boolean>(sounds.getIsMusicMuted());

  // Modals state
  const [showLevelSelect, setShowLevelSelect] = useState<boolean>(false);
  const [showHelp, setShowHelp] = useState<boolean>(false);

  // Records saved in localStorage
  const [records, setRecords] = useState<Record<number, LevelRecord>>(() => {
    const initialRecords: Record<number, LevelRecord> = {};
    LEVELS.forEach((l) => {
      initialRecords[l.id] = { completed: false, bestTime: null, stars: 0, bestSteps: null };
    });
    try {
      const saved = localStorage.getItem('whisker_escape_records');
      if (saved) {
        const parsed = JSON.parse(saved);
        LEVELS.forEach((l) => {
          if (parsed[l.id]) {
            initialRecords[l.id] = parsed[l.id];
          }
        });
      }
    } catch {
      // ignore
    }
    return initialRecords;
  });

  // State refs to guarantee fresh values during continuous move loop
  const catPosRef = useRef(catPos);
  catPosRef.current = catPos;
  const currentLevelRef = useRef(currentLevel);
  currentLevelRef.current = currentLevel;
  const collectedYarnsRef = useRef(collectedYarns);
  collectedYarnsRef.current = collectedYarns;
  const gameStateRef = useRef(gameState);
  gameStateRef.current = gameState;
  const timeSecondsRef = useRef(timeSeconds);
  timeSecondsRef.current = timeSeconds;
  const stepCountRef = useRef(stepCount);
  stepCountRef.current = stepCount;

  // Continuous movement loop refs
  const heldDirectionsRef = useRef<Set<Direction>>(new Set());
  const activeDirectionRef = useRef<Direction | null>(null);
  const moveIntervalRef = useRef<number | null>(null);
  const moveTimeoutRef = useRef<number | null>(null);
  const [walkSpeed, setWalkSpeed] = useState<'relaxed' | 'normal' | 'brisk'>(() => {
    const saved = localStorage.getItem('whisker_walk_speed');
    if (saved === 'relaxed' || saved === 'normal' || saved === 'brisk') return saved;
    return 'normal';
  });
  const walkSpeedRef = useRef(walkSpeed);
  walkSpeedRef.current = walkSpeed;

  const handleSelectWalkSpeed = (speed: 'relaxed' | 'normal' | 'brisk') => {
    setWalkSpeed(speed);
    walkSpeedRef.current = speed;
    localStorage.setItem('whisker_walk_speed', speed);
    sounds.playClick();
  };

  // Saved skin
  useEffect(() => {
    const savedSkin = localStorage.getItem('whisker_cat_skin') as CatSkin;
    if (savedSkin && ['orange', 'black', 'calico', 'white'].includes(savedSkin)) {
      setSkin(savedSkin);
    }
  }, []);

  const handleSelectSkin = (newSkin: CatSkin) => {
    setSkin(newSkin);
    localStorage.setItem('whisker_cat_skin', newSkin);
    sounds.playMeow();
  };

  // Timer Ref
  const timerRef = useRef<number | null>(null);

  // Toast banner timer
  const toastTimeoutRef = useRef<number | null>(null);
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  }, []);

  // Stop moving loop cleanly
  const stopMoving = useCallback(() => {
    if (moveTimeoutRef.current !== null) {
      clearTimeout(moveTimeoutRef.current);
      moveTimeoutRef.current = null;
    }
    if (moveIntervalRef.current !== null) {
      clearInterval(moveIntervalRef.current);
      moveIntervalRef.current = null;
    }
    activeDirectionRef.current = null;
    heldDirectionsRef.current.clear();
    setIsMoving(false);
  }, []);

  // Initialize or reset a level
  const initLevel = useCallback(
    (lvlIndex: number) => {
      stopMoving();
      const lvl = LEVELS[lvlIndex] || LEVELS[0];
      setCurrentLevelIndex(lvlIndex);
      setCatPos({ ...lvl.startPos });
      setDirection('DOWN');
      setIsMoving(false);
      setStepCount(0);
      setCatMood('normal');
      setCollectedYarns(new Set());
      setIsDoorUnlocked(false);
      setTimeSeconds(0);
      setPawPrints([]);
      setParticles([]);
      setGameState('PLAYING');
      showToast(`Level ${lvl.id}: Find all ${lvl.yarns.length} golden yarn balls!`);
    },
    [showToast, stopMoving]
  );

  // Handle Level Timer
  useEffect(() => {
    if (gameState === 'PLAYING') {
      timerRef.current = window.setInterval(() => {
        setTimeSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState]);

  // Paw prints fade timer
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setPawPrints((prev) =>
        prev
          .map((p) => {
            const age = (now - p.timestamp) / 1000;
            return { ...p, opacity: Math.max(0, 0.7 - age * 0.12) };
          })
          .filter((p) => p.opacity > 0.05)
      );
    }, 400);
    return () => clearInterval(interval);
  }, []);

  // Particle life decay loop
  useEffect(() => {
    if (particles.length === 0) return;
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            life: p.life - 0.08,
            y: p.y - p.vy,
          }))
          .filter((p) => p.life > 0)
      );
    }, 50);
    return () => clearInterval(interval);
  }, [particles.length]);

  // Trigger Meow
  const triggerMeow = useCallback(() => {
    sounds.playMeow();
    setCatMood('meow');
    setTimeout(() => setCatMood('normal'), 600);

    const meowTexts = ['Meow~', 'Purrr~', 'Mrrrow!'];
    const text = meowTexts[Math.floor(Math.random() * meowTexts.length)];
    const newParticle: FloatingParticle = {
      id: Math.random().toString(),
      x: catPosRef.current.x,
      y: catPosRef.current.y,
      type: Math.random() > 0.5 ? 'meow' : 'heart',
      vx: (Math.random() - 0.5) * 0.1,
      vy: 0.08,
      life: 1.0,
      text,
    };
    setParticles((prev) => [...prev, newParticle]);
  }, []);

  // Calculate stars earned on level clear
  const calculateStars = useCallback((time: number, target: number) => {
    if (time <= target) return 3;
    if (time <= target * 1.5) return 2;
    return 1;
  }, []);

  // Single step execution in a direction
  const executeStep = useCallback(
    (dir: Direction) => {
      if (gameStateRef.current !== 'PLAYING') return;

      setDirection(dir);

      let dx = 0;
      let dy = 0;
      if (dir === 'UP') dy = -1;
      if (dir === 'DOWN') dy = 1;
      if (dir === 'LEFT') dx = -1;
      if (dir === 'RIGHT') dx = 1;

      const currentX = catPosRef.current.x;
      const currentY = catPosRef.current.y;
      const lvl = currentLevelRef.current;
      const yarnsSet = collectedYarnsRef.current;

      const nextX = currentX + dx;
      const nextY = currentY + dy;

      // Check bounds
      if (nextX < 0 || nextX >= lvl.width || nextY < 0 || nextY >= lvl.height) {
        sounds.playBump();
        return;
      }

      // Check cell type
      const targetCell = lvl.layout[nextY][nextX];

      // 1 = Wall
      if (targetCell === 1) {
        sounds.playBump();
        return;
      }

      // 2 = Exit Door
      const isExitDoor = lvl.exitPos.x === nextX && lvl.exitPos.y === nextY;
      if (isExitDoor) {
        const remainingYarns = lvl.yarns.filter(
          (y) => !yarnsSet.has(`${y.x},${y.y}`)
        ).length;

        if (remainingYarns > 0) {
          // Locked!
          sounds.playDoorLocked();
          setCatMood('puzzled');
          setTimeout(() => setCatMood('normal'), 800);
          showToast(
            `The door is locked! Collect ${remainingYarns} more golden yarn${
              remainingYarns > 1 ? 's' : ''
            }! 🔒`
          );
          return;
        } else {
          // Unlocked! Win this level!
          stopMoving();
          sounds.playVictory();
          setCatPos({ x: nextX, y: nextY });

          const starsEarned = calculateStars(timeSecondsRef.current, lvl.targetTimeSeconds);

          // Update Records
          setRecords((prev) => {
            const currentRec = prev[lvl.id] || {
              completed: false,
              bestTime: null,
              stars: 0,
              bestSteps: null,
            };
            const updated: Record<number, LevelRecord> = {
              ...prev,
              [lvl.id]: {
                completed: true,
                bestTime:
                  currentRec.bestTime === null
                    ? timeSecondsRef.current
                    : Math.min(currentRec.bestTime, timeSecondsRef.current),
                stars: Math.max(currentRec.stars, starsEarned),
                bestSteps:
                  currentRec.bestSteps === null
                    ? stepCountRef.current + 1
                    : Math.min(currentRec.bestSteps, stepCountRef.current + 1),
              },
            };
            try {
              localStorage.setItem('whisker_escape_records', JSON.stringify(updated));
            } catch {
              // ignore
            }
            return updated;
          });

          // Check if this was final level
          if (lvl.id === LEVELS.length) {
            setGameState('GAME_WON');
          } else {
            setGameState('LEVEL_CLEARED');
          }
          return;
        }
      }

      // Valid move step!
      sounds.playStep();
      setIsMoving(true);
      setStepCount((s) => s + 1);

      // Leave paw print on current tile
      const newPaw: PawPrint = {
        id: `${currentX}-${currentY}-${Date.now()}`,
        x: currentX,
        y: currentY,
        opacity: 0.65,
        timestamp: Date.now(),
      };
      setPawPrints((prev) => [...prev.slice(-18), newPaw]);

      // Move cat position
      setCatPos({ x: nextX, y: nextY });
      setTimeout(() => setIsMoving(false), 160);

      // Check for Golden Yarn collection
      const yarnKey = `${nextX},${nextY}`;
      const isYarn = lvl.yarns.some((y) => y.x === nextX && y.y === nextY);

      if (isYarn && !yarnsSet.has(yarnKey)) {
        const nextCollected = new Set(yarnsSet);
        nextCollected.add(yarnKey);
        setCollectedYarns(nextCollected);
        collectedYarnsRef.current = nextCollected;

        sounds.playYarnPickup(nextCollected.size);
        setCatMood('happy');
        setTimeout(() => setCatMood('normal'), 600);

        // Spawn golden sparkle particles
        const newParticle: FloatingParticle = {
          id: Math.random().toString(),
          x: nextX,
          y: nextY,
          type: 'yarn',
          vx: 0,
          vy: 0.1,
          life: 1.0,
        };
        const starParticle: FloatingParticle = {
          id: Math.random().toString(),
          x: nextX + (Math.random() - 0.5) * 0.5,
          y: nextY - 0.3,
          type: 'sparkle',
          vx: 0,
          vy: 0.08,
          life: 0.9,
        };
        setParticles((prev) => [...prev, newParticle, starParticle]);

        const yarnsLeft = lvl.yarns.length - nextCollected.size;
        if (yarnsLeft === 0) {
          // All yarns found! Unlock door!
          setIsDoorUnlocked(true);
          sounds.playDoorUnlock();
          showToast('Door Unlocked! The exit is glowing golden! 🚪✨');
        } else {
          showToast(`Golden Yarn Collected! ${yarnsLeft} remaining.`);
        }
      }
    },
    [calculateStars, showToast, stopMoving]
  );

  // Start continuous movement while button or key is held down
  const startMoving = useCallback(
    (dir: Direction) => {
      if (gameStateRef.current !== 'PLAYING') return;

      // Clear any pending timeout or interval
      if (moveTimeoutRef.current !== null) {
        clearTimeout(moveTimeoutRef.current);
        moveTimeoutRef.current = null;
      }
      if (moveIntervalRef.current !== null) {
        clearInterval(moveIntervalRef.current);
        moveIntervalRef.current = null;
      }

      activeDirectionRef.current = dir;
      // Immediate first step for zero-latency response on press!
      executeStep(dir);

      // Calibrated hold-to-walk speed
      const speedConfig = {
        relaxed: { delay: 300, interval: 260 },
        normal: { delay: 250, interval: 220 },
        brisk: { delay: 210, interval: 175 },
      }[walkSpeedRef.current];

      // Initial hold delay before continuous repeat
      moveTimeoutRef.current = window.setTimeout(() => {
        if (
          gameStateRef.current === 'PLAYING' &&
          activeDirectionRef.current === dir
        ) {
          executeStep(dir);
          moveIntervalRef.current = window.setInterval(() => {
            if (
              gameStateRef.current === 'PLAYING' &&
              activeDirectionRef.current !== null
            ) {
              executeStep(activeDirectionRef.current);
            }
          }, speedConfig.interval);
        }
      }, speedConfig.delay);
    },
    [executeStep]
  );

  // Keyboard Event Listeners for continuous WASD and Arrow key walking
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if an input is focused
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      const key = e.key.toLowerCase();
      let dir: Direction | null = null;

      if (key === 'w' || key === 'arrowup') {
        dir = 'UP';
      } else if (key === 's' || key === 'arrowdown') {
        dir = 'DOWN';
      } else if (key === 'a' || key === 'arrowleft') {
        dir = 'LEFT';
      } else if (key === 'd' || key === 'arrowright') {
        dir = 'RIGHT';
      } else if (e.code === 'Space' || key === ' ') {
        e.preventDefault();
        triggerMeow();
        return;
      } else if (key === 'r') {
        e.preventDefault();
        if (gameStateRef.current === 'PLAYING') {
          initLevel(currentLevelIndex);
        }
        return;
      } else if (key === 'm') {
        e.preventDefault();
        const muted = sounds.toggleMute();
        setIsSoundMuted(muted);
        return;
      }

      if (dir) {
        e.preventDefault();
        heldDirectionsRef.current.add(dir);
        // Switch to the newly pressed direction immediately
        if (activeDirectionRef.current !== dir) {
          startMoving(dir);
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      let dir: Direction | null = null;

      if (key === 'w' || key === 'arrowup') dir = 'UP';
      else if (key === 's' || key === 'arrowdown') dir = 'DOWN';
      else if (key === 'a' || key === 'arrowleft') dir = 'LEFT';
      else if (key === 'd' || key === 'arrowright') dir = 'RIGHT';

      if (dir) {
        heldDirectionsRef.current.delete(dir);
        // If other movement keys are still held, switch to the latest one
        if (heldDirectionsRef.current.size > 0) {
          const remainingDirs = Array.from(heldDirectionsRef.current);
          const nextDir = remainingDirs[remainingDirs.length - 1];
          startMoving(nextDir);
        } else {
          stopMoving();
        }
      }
    };

    const handleWindowBlur = () => {
      stopMoving();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleWindowBlur);
      stopMoving();
    };
  }, [startMoving, stopMoving, triggerMeow, initLevel, currentLevelIndex]);

  // Audio toggles
  const handleToggleSound = () => {
    const muted = sounds.toggleMute();
    setIsSoundMuted(muted);
    if (!muted) sounds.playClick();
  };

  const handleToggleMusic = () => {
    const musicMuted = sounds.toggleMusic();
    setIsMusicMuted(musicMuted);
    if (!musicMuted) sounds.playClick();
  };

  // Advance to next level
  const handleNextLevel = () => {
    if (currentLevelIndex < LEVELS.length - 1) {
      initLevel(currentLevelIndex + 1);
    } else {
      setGameState('GAME_WON');
    }
  };

  // Replay current level
  const handleReplay = () => {
    initLevel(currentLevelIndex);
  };

  // Select level from modal
  const handleSelectLevel = (levelId: number) => {
    const index = LEVELS.findIndex((l) => l.id === levelId);
    if (index !== -1) {
      setShowLevelSelect(false);
      initLevel(index);
    }
  };

  // Calculate totals for Game Won modal
  const totalStars = Object.values(records).reduce((sum, r) => sum + r.stars, 0);
  const totalTime = Object.values(records).reduce((sum, r) => sum + (r.bestTime || 0), 0);
  const totalSteps = Object.values(records).reduce((sum, r) => sum + (r.bestSteps || 0), 0);
  const totalPossibleYarns = LEVELS.reduce((sum, lvl) => sum + lvl.yarns.length, 0);
  const totalPossibleStars = LEVELS.length * 3;

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 font-sans text-slate-100 select-none">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-300">
          <div className="bg-slate-900/95 border border-amber-500/50 text-amber-200 font-semibold px-4 py-2 rounded-2xl shadow-xl backdrop-blur-md text-xs sm:text-sm flex items-center gap-2 animate-bounce">
            <span>🐾</span>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Main View Switcher */}
      {gameState === 'MENU' ? (
        <TitleScreen
          skin={skin}
          onSelectSkin={handleSelectSkin}
          onStartGame={() => initLevel(0)}
          onOpenLevelSelect={() => setShowLevelSelect(true)}
          onOpenHelp={() => setShowHelp(true)}
          isSoundMuted={isSoundMuted}
          onToggleSound={handleToggleSound}
          onMeow={triggerMeow}
        />
      ) : (
        <div className="flex-1 flex flex-col w-full h-full overflow-hidden">
          {/* Top Bar HUD */}
          <GameHUD
            level={currentLevel}
            totalLevels={LEVELS.length}
            yarnsCollected={collectedYarns.size}
            totalYarns={currentLevel.yarns.length}
            timeSeconds={timeSeconds}
            steps={stepCount}
            isUnlocked={isDoorUnlocked}
            isSoundMuted={isSoundMuted}
            isMusicMuted={isMusicMuted}
            onToggleSound={handleToggleSound}
            onToggleMusic={handleToggleMusic}
            onRestart={handleReplay}
            onOpenLevelSelect={() => {
              stopMoving();
              setShowLevelSelect(true);
            }}
            onOpenHelp={() => {
              stopMoving();
              setShowHelp(true);
            }}
            onMeow={triggerMeow}
          />

          {/* Maze Playing Field */}
          <MazeBoard
            level={currentLevel}
            catPos={catPos}
            direction={direction}
            isMoving={isMoving}
            stepCount={stepCount}
            skin={skin}
            collectedYarns={collectedYarns}
            pawPrints={pawPrints}
            particles={particles}
            isDoorUnlocked={isDoorUnlocked}
            catMood={catMood}
          />

          {/* Bottom On-Screen Touch / D-Pad Controls with continuous Hold-to-Walk */}
          <footer className="w-full bg-slate-950/80 backdrop-blur-sm border-t border-slate-900/80 py-1 flex items-center justify-center shrink-0">
            <TouchControls
              onDirectionStart={(dir) => {
                heldDirectionsRef.current.add(dir);
                startMoving(dir);
              }}
              onDirectionEnd={() => {
                stopMoving();
              }}
              onMeow={triggerMeow}
            />
          </footer>
        </div>
      )}

      {/* Level Cleared Modal */}
      {gameState === 'LEVEL_CLEARED' && (
        <LevelClearedModal
          level={currentLevel}
          timeSeconds={timeSeconds}
          steps={stepCount}
          stars={calculateStars(timeSeconds, currentLevel.targetTimeSeconds)}
          hasNextLevel={currentLevelIndex < LEVELS.length - 1}
          onNextLevel={handleNextLevel}
          onReplay={handleReplay}
          onLevelSelect={() => setShowLevelSelect(true)}
        />
      )}

      {/* Game Won Celebration Modal */}
      {gameState === 'GAME_WON' && (
        <GameWonModal
          totalTime={totalTime || timeSeconds}
          totalSteps={totalSteps || stepCount}
          totalStars={totalStars}
          totalLevels={LEVELS.length}
          totalPossibleStars={totalPossibleStars}
          totalPossibleYarns={totalPossibleYarns}
          onRestartAll={() => initLevel(0)}
          onLevelSelect={() => setShowLevelSelect(true)}
        />
      )}

      {/* Level Select Modal */}
      {showLevelSelect && (
        <LevelSelectModal
          levels={LEVELS}
          currentLevelId={currentLevel.id}
          records={records}
          onSelectLevel={handleSelectLevel}
          onClose={() => setShowLevelSelect(false)}
        />
      )}

      {/* Help & Cat Customization Modal */}
      {showHelp && (
        <HelpModal
          currentSkin={skin}
          onSelectSkin={handleSelectSkin}
          walkSpeed={walkSpeed}
          onSelectWalkSpeed={handleSelectWalkSpeed}
          onClose={() => setShowHelp(false)}
        />
      )}
    </div>
  );
}
