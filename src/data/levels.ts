import { LevelData } from '../types/game';

/*
  Tile codes:
  0 = Path
  1 = Wall
  2 = Exit Door
  3 = Golden Yarn Ball
  4 = Start Position
*/

export const LEVELS: LevelData[] = [
  // ---------------- LEVEL 1 ----------------
  {
    id: 1,
    name: 'The Cozy Parlor',
    subtitle: 'Warm carpets, soft armchairs, and 3 golden yarn balls.',
    story: 'Milo the cat snoozed off and woke up in the parlor! The door is bolted tight. Collect all 3 golden yarn balls to unlock the door and venture into the kitchen pantry.',
    width: 13,
    height: 13,
    targetTimeSeconds: 40,
    theme: {
      name: 'Cozy Living Room',
      floorColor: '#291811',
      floorPatternColor: '#3d251a',
      wallColor: '#78350f',
      wallTopColor: '#92400e',
      wallBorderColor: '#b45309',
      ambientLight: 'rgba(251, 191, 36, 0.08)',
      icon: '🛋️',
      accentColor: '#f59e0b',
    },
    startPos: { x: 1, y: 11 },
    exitPos: { x: 11, y: 1 },
    yarns: [
      { x: 1, y: 1 },
      { x: 11, y: 5 },
      { x: 5, y: 5 },
    ],
    layout: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 3, 0, 0, 1, 0, 0, 0, 1, 0, 0, 2, 1], // (1,1)=Yarn, (11,1)=Door
      [1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 1, 0, 0, 3, 0, 0, 0, 0, 1, 3, 1], // (5,5)=Yarn, (11,5)=Yarn
      [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 4, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1], // (1,11)=Start
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
  },

  // ---------------- LEVEL 2 ----------------
  {
    id: 2,
    name: 'The Kitchen Pantry',
    subtitle: 'Ceramic tiles, spice shelves, and 4 golden yarn balls.',
    story: 'The scent of roasted treats is everywhere! Navigate around the tall pantry cupboards and gather 4 golden yarns to reach the attic stairwell.',
    width: 15,
    height: 15,
    targetTimeSeconds: 55,
    theme: {
      name: 'Pantry Shelves',
      floorColor: '#0f172a',
      floorPatternColor: '#1e293b',
      wallColor: '#1e3a5f',
      wallTopColor: '#2563eb',
      wallBorderColor: '#60a5fa',
      ambientLight: 'rgba(96, 165, 250, 0.08)',
      icon: '🥣',
      accentColor: '#38bdf8',
    },
    startPos: { x: 1, y: 1 },
    exitPos: { x: 13, y: 13 },
    yarns: [
      { x: 13, y: 1 },
      { x: 1, y: 13 },
      { x: 7, y: 7 },
      { x: 13, y: 7 },
    ],
    layout: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 4, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 3, 1], // (1,1)=Start, (13,1)=Yarn
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 1, 3, 1, 0, 0, 0, 0, 3, 1], // (7,7)=Yarn, (13,7)=Yarn
      [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
      [1, 3, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 1], // (1,13)=Yarn, (13,13)=Door
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
  },

  // ---------------- LEVEL 3 ----------------
  {
    id: 3,
    name: 'The Dusty Attic',
    subtitle: 'Creaky floorboards, secret trunks, and 5 golden yarn balls.',
    story: 'Higher up in the house, the attic is filled with old treasures and winding rafters. Gather all 5 golden yarns to turn the brass handle on the skylight hatch.',
    width: 17,
    height: 17,
    targetTimeSeconds: 70,
    theme: {
      name: 'Attic Labyrinth',
      floorColor: '#1e1b18',
      floorPatternColor: '#2b2723',
      wallColor: '#422006',
      wallTopColor: '#572c08',
      wallBorderColor: '#713f12',
      ambientLight: 'rgba(217, 119, 6, 0.08)',
      icon: '📦',
      accentColor: '#fbbf24',
    },
    startPos: { x: 1, y: 1 },
    exitPos: { x: 15, y: 15 },
    yarns: [
      { x: 15, y: 1 },
      { x: 1, y: 9 },
      { x: 9, y: 7 },
      { x: 7, y: 15 },
      { x: 15, y: 9 },
    ],
    layout: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 4, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 3, 1], // (1,1)=Start, (15,1)=Yarn
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 1, 0, 1, 0, 0, 3, 1, 0, 0, 0, 1, 0, 1], // (9,7)=Yarn
      [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 3, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 3, 1], // (1,9)=Yarn, (15,9)=Yarn
      [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 3, 1, 0, 0, 0, 1, 0, 0, 2, 1], // (7,15)=Yarn, (15,15)=Door
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
  },

  // ---------------- LEVEL 4 ----------------
  {
    id: 4,
    name: 'The Conservatory Garden',
    subtitle: 'Mossy stone pavers, potted ferns, and 5 golden yarn balls.',
    story: 'Sunlight streams through glass domes! The lush conservatory is overgrown with climbing vines. Track down all 5 golden yarns to unlock the garden gate.',
    width: 17,
    height: 17,
    targetTimeSeconds: 75,
    theme: {
      name: 'Greenhouse Garden',
      floorColor: '#052e16',
      floorPatternColor: '#064e3b',
      wallColor: '#14532d',
      wallTopColor: '#166534',
      wallBorderColor: '#22c55e',
      ambientLight: 'rgba(74, 222, 128, 0.08)',
      icon: '🌿',
      accentColor: '#4ade80',
    },
    startPos: { x: 1, y: 15 },
    exitPos: { x: 15, y: 1 },
    yarns: [
      { x: 1, y: 1 },
      { x: 15, y: 15 },
      { x: 8, y: 8 },
      { x: 1, y: 7 },
      { x: 15, y: 7 },
    ],
    layout: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 3, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 1], // (1,1)=Yarn, (15,1)=Door
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
      [1, 3, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 3, 1], // (1,7)=Yarn, (15,7)=Yarn
      [1, 0, 1, 1, 1, 0, 1, 0, 3, 0, 1, 0, 1, 1, 1, 0, 1], // (8,8)=Yarn
      [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 4, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 3, 1], // (1,15)=Start, (15,15)=Yarn
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
  },

  // ---------------- LEVEL 5 ----------------
  {
    id: 5,
    name: 'The Wine Cellar Vault',
    subtitle: 'Cobblestone tunnels, oak barrels, and 6 golden yarn balls.',
    story: 'Beneath the manor lies an ancient wine vault with vaulted stone arches. Retrieve 6 golden yarn balls tucked beside the vintage barrels to unlock the cellar hatch.',
    width: 19,
    height: 19,
    targetTimeSeconds: 90,
    theme: {
      name: 'Cellar Vault',
      floorColor: '#271015',
      floorPatternColor: '#3b1219',
      wallColor: '#500724',
      wallTopColor: '#701a75',
      wallBorderColor: '#e11d48',
      ambientLight: 'rgba(244, 63, 94, 0.08)',
      icon: '🍷',
      accentColor: '#f43f5e',
    },
    startPos: { x: 1, y: 1 },
    exitPos: { x: 17, y: 17 },
    yarns: [
      { x: 17, y: 1 },
      { x: 1, y: 17 },
      { x: 9, y: 9 },
      { x: 1, y: 9 },
      { x: 17, y: 9 },
      { x: 9, y: 1 },
    ],
    layout: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 4, 0, 0, 1, 0, 0, 0, 1, 3, 1, 0, 0, 0, 1, 0, 0, 3, 1], // (1,1)=Start, (9,1)=Yarn, (17,1)=Yarn
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [1, 3, 1, 0, 0, 0, 0, 0, 1, 3, 1, 0, 0, 0, 0, 0, 1, 3, 1], // (1,9)=Yarn, (9,9)=Yarn, (17,9)=Yarn
      [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 3, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 2, 1], // (1,17)=Yarn, (17,17)=Door
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
  },

  // ---------------- LEVEL 6 ----------------
  {
    id: 6,
    name: 'The Rooftop Moon Maze',
    subtitle: 'Moonlit chimneys, starlight beams, and 7 golden yarns.',
    story: 'Out on the midnight slate rooftops! The nocturnal wind is brisk and magical. Collect all 7 golden yarn balls scattered across the towers to open the observatory portal.',
    width: 21,
    height: 21,
    targetTimeSeconds: 110,
    theme: {
      name: 'Midnight Rooftop',
      floorColor: '#0b132b',
      floorPatternColor: '#1c2541',
      wallColor: '#1e293b',
      wallTopColor: '#334155',
      wallBorderColor: '#64748b',
      ambientLight: 'rgba(56, 189, 248, 0.08)',
      icon: '🌙',
      accentColor: '#38bdf8',
    },
    startPos: { x: 10, y: 10 },
    exitPos: { x: 19, y: 1 },
    yarns: [
      { x: 1, y: 1 },
      { x: 1, y: 19 },
      { x: 19, y: 19 },
      { x: 1, y: 10 },
      { x: 19, y: 10 },
      { x: 10, y: 1 },
      { x: 10, y: 19 },
    ],
    layout: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 3, 0, 0, 1, 0, 0, 0, 1, 0, 3, 0, 1, 0, 0, 0, 1, 0, 0, 2, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 3, 1, 0, 1, 1, 1, 0, 1, 0, 4, 0, 1, 0, 1, 1, 1, 0, 1, 3, 1],
      [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 3, 0, 0, 1, 0, 0, 0, 1, 0, 3, 0, 1, 0, 0, 0, 1, 0, 0, 3, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
  },

  // ---------------- LEVEL 7 ----------------
  {
    id: 7,
    name: 'The Royal Cat Palace',
    subtitle: 'Gilded pillars, royal velvet carpets, and 8 legendary yarns.',
    story: 'The ultimate feline challenge! The majestic palace labyrinth holds 8 legendary golden yarn balls. Retrieve them all to crown yourself Supreme Maze Champion and claim total freedom!',
    width: 23,
    height: 23,
    targetTimeSeconds: 140,
    theme: {
      name: 'Royal Palace',
      floorColor: '#1e1035',
      floorPatternColor: '#2e1065',
      wallColor: '#3b0764',
      wallTopColor: '#581c87',
      wallBorderColor: '#d946ef',
      ambientLight: 'rgba(217, 70, 239, 0.09)',
      icon: '👑',
      accentColor: '#e879f9',
    },
    startPos: { x: 11, y: 11 }, // Cat starts in central throne room!
    exitPos: { x: 21, y: 1 },  // Grand royal gate top-right
    yarns: [
      { x: 1, y: 1 },
      { x: 21, y: 21 },
      { x: 1, y: 21 },
      { x: 1, y: 11 },
      { x: 21, y: 11 },
      { x: 10, y: 1 },
      { x: 10, y: 21 },
      { x: 7, y: 7 },
    ],
    layout: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 3, 0, 0, 1, 0, 0, 0, 1, 0, 3, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 2, 1], // (1,1)=Yarn, (10,1)->(10,1) or (11,1)=Yarn, (21,1)=Door
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 1, 3, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1], // (7,7)=Yarn
      [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1],
      [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 1], // (1,11)=Yarn, (11,11)=Start, (21,11)=Yarn
      [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
      [1, 3, 0, 0, 1, 0, 0, 0, 1, 0, 3, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 3, 1], // (1,21)=Yarn, (10,21)->(10,21) or (11,21)=Yarn, (21,21)=Yarn
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
  },
];
