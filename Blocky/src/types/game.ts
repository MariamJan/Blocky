export type BlockShape = number[][];

export interface Block {
  id: string;
  shape: BlockShape;
  color: string;
  size: number;
}

export interface GridCell {
  filled: boolean;
  color: string;
}

export type GameGrid = GridCell[][];

export interface GameState {
  grid: GameGrid;
  currentBlocks: Block[];
  score: number;
  isGameOver: boolean;
  clearedLines: number;
}

export interface Position {
  x: number;
  y: number;
}

// Block shape definitions (Tetris-inspired)
export const BLOCK_SHAPES: BlockShape[] = [
  // Single block
  [[1]],
  
  // Double blocks
  [[1, 1]],
  [[1], [1]],
  
  // Triple blocks
  [[1, 1, 1]],
  [[1], [1], [1]],
  [[1, 1], [1, 0]],
  [[1, 1], [0, 1]],
  
  // Quad blocks
  [[1, 1, 1, 1]],
  [[1], [1], [1], [1]],
  [[1, 1], [1, 1]],
  
  // L-shapes
  [[1, 0], [1, 0], [1, 1]],
  [[1, 1, 1], [1, 0, 0]],
  [[1, 1], [0, 1], [0, 1]],
  [[0, 0, 1], [1, 1, 1]],
  
  // T-shapes
  [[0, 1, 0], [1, 1, 1]],
  [[1, 0], [1, 1], [1, 0]],
];

export const BLOCK_COLORS = [
  'game-red',
  'game-blue', 
  'game-green',
  'game-yellow',
  'game-orange',
  'game-purple',
  'game-cyan',
  'game-pink',
  'game-lime',
  'game-indigo'
];

export const GRID_SIZE = 10;