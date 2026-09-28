export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export type GameState = 'MENU' | 'PLAYING' | 'PAUSED' | 'LEVEL_CLEARED' | 'GAME_WON';

export type CatSkin = 'orange' | 'black' | 'calico' | 'white';

export interface Position {
  x: number;
  y: number;
}

export interface YarnBall {
  id: string;
  x: number;
  y: number;
  collected: boolean;
}

export interface PawPrint {
  id: string;
  x: number;
  y: number;
  opacity: number;
  timestamp: number;
}

export interface FloatingParticle {
  id: string;
  x: number;
  y: number;
  type: 'heart' | 'yarn' | 'sparkle' | 'meow';
  vx: number;
  vy: number;
  life: number;
  text?: string;
}

export interface LevelTheme {
  name: string;
  floorColor: string;
  floorPatternColor: string;
  wallColor: string;
  wallTopColor: string;
  wallBorderColor: string;
  ambientLight: string;
  icon: string;
  accentColor: string;
}

export interface LevelData {
  id: number;
  name: string;
  subtitle: string;
  story: string;
  width: number;
  height: number;
  layout: number[][]; // 0: path, 1: wall, 2: exit door, 3: yarn, 4: start
  startPos: Position;
  exitPos: Position;
  yarns: { x: number; y: number }[];
  targetTimeSeconds: number; // for 3 stars
  theme: LevelTheme;
}

export interface LevelRecord {
  completed: boolean;
  bestTime: number | null;
  stars: number;
  bestSteps: number | null;
}
