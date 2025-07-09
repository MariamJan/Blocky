import { useState, useCallback } from 'react';
import { GameGrid, GameState, Block, Position, BLOCK_SHAPES, BLOCK_COLORS, GRID_SIZE } from '@/types/game';

const createEmptyGrid = (): GameGrid => {
  return Array(GRID_SIZE).fill(null).map(() =>
    Array(GRID_SIZE).fill(null).map(() => ({
      filled: false,
      color: ''
    }))
  );
};

const generateRandomBlock = (): Block => {
  const shape = BLOCK_SHAPES[Math.floor(Math.random() * BLOCK_SHAPES.length)];
  const color = BLOCK_COLORS[Math.floor(Math.random() * BLOCK_COLORS.length)];
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    shape,
    color,
    size: Math.max(shape.length, shape[0].length)
  };
};

const generateThreeBlocks = (): Block[] => {
  return [generateRandomBlock(), generateRandomBlock(), generateRandomBlock()];
};

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>(() => ({
    grid: createEmptyGrid(),
    currentBlocks: generateThreeBlocks(),
    score: 0,
    isGameOver: false,
    clearedLines: 0
  }));

  const canPlaceBlock = useCallback((block: Block, position: Position, grid: GameGrid): boolean => {
    const { shape } = block;
    const { x, y } = position;

    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (shape[row][col] === 1) {
          const gridX = x + col;
          const gridY = y + row;

          // Check bounds
          if (gridX < 0 || gridX >= GRID_SIZE || gridY < 0 || gridY >= GRID_SIZE) {
            return false;
          }

          // Check if cell is already filled
          if (grid[gridY][gridX].filled) {
            return false;
          }
        }
      }
    }

    return true;
  }, []);

  const placeBlock = useCallback((block: Block, position: Position) => {
    setGameState(prevState => {
      const newGrid = prevState.grid.map(row => [...row]);
      const { shape, color } = block;
      const { x, y } = position;

      // Place the block
      for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
          if (shape[row][col] === 1) {
            const gridX = x + col;
            const gridY = y + row;
            newGrid[gridY][gridX] = { filled: true, color };
          }
        }
      }

      // Remove the used block
      const remainingBlocks = prevState.currentBlocks.filter(b => b.id !== block.id);
      
      // Check for line clears
      const { clearedGrid, linesCleared } = clearCompleteLines(newGrid);
      
      // Calculate score (based on block size + cleared lines bonus)
      const blockScore = block.shape.flat().filter(cell => cell === 1).length * 10;
      const lineScore = linesCleared * 100;
      const newScore = prevState.score + blockScore + lineScore;

      // Generate new blocks if all are used
      const newBlocks = remainingBlocks.length === 0 ? generateThreeBlocks() : remainingBlocks;

      // Check game over
      const isGameOver = checkGameOver(clearedGrid, newBlocks);

      return {
        ...prevState,
        grid: clearedGrid,
        currentBlocks: newBlocks,
        score: newScore,
        clearedLines: prevState.clearedLines + linesCleared,
        isGameOver
      };
    });
  }, []);

  const clearCompleteLines = useCallback((grid: GameGrid) => {
    const newGrid = grid.map(row => [...row]);
    let linesCleared = 0;

    // Check rows
    for (let row = 0; row < GRID_SIZE; row++) {
      if (newGrid[row].every(cell => cell.filled)) {
        for (let col = 0; col < GRID_SIZE; col++) {
          newGrid[row][col] = { filled: false, color: '' };
        }
        linesCleared++;
      }
    }

    // Check columns
    for (let col = 0; col < GRID_SIZE; col++) {
      if (newGrid.every(row => row[col].filled)) {
        for (let row = 0; row < GRID_SIZE; row++) {
          newGrid[row][col] = { filled: false, color: '' };
        }
        linesCleared++;
      }
    }

    return { clearedGrid: newGrid, linesCleared };
  }, []);

  const checkGameOver = useCallback((grid: GameGrid, blocks: Block[]): boolean => {
    for (const block of blocks) {
      for (let y = 0; y <= GRID_SIZE - block.shape.length; y++) {
        for (let x = 0; x <= GRID_SIZE - block.shape[0].length; x++) {
          if (canPlaceBlock(block, { x, y }, grid)) {
            return false;
          }
        }
      }
    }
    return true;
  }, [canPlaceBlock]);

  const resetGame = useCallback(() => {
    setGameState({
      grid: createEmptyGrid(),
      currentBlocks: generateThreeBlocks(),
      score: 0,
      isGameOver: false,
      clearedLines: 0
    });
  }, []);

  return {
    gameState,
    canPlaceBlock,
    placeBlock,
    resetGame
  };
};