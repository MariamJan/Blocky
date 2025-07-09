import { GameGrid as GameGridType, Block, Position } from '@/types/game';
import { cn } from '@/lib/utils';

interface GameGridProps {
  grid: GameGridType;
  onCellClick?: (position: Position) => void;
  highlightedCells?: Position[];
  className?: string;
}

export const GameGrid = ({ grid, onCellClick, highlightedCells = [], className }: GameGridProps) => {
  return (
    <div className={cn(
      "grid grid-cols-10 gap-1 p-4 bg-grid-bg rounded-lg border-2 border-grid-border",
      "shadow-lg",
      className
    )}>
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isHighlighted = highlightedCells.some(
            pos => pos.x === colIndex && pos.y === rowIndex
          );
          
          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={cn(
                "aspect-square rounded-sm border border-grid-border transition-all duration-200",
                "cursor-pointer hover:bg-grid-border/50",
                cell.filled 
                  ? `bg-${cell.color} shadow-md` 
                  : "bg-grid-cell",
                isHighlighted && "ring-2 ring-accent animate-pulse-glow",
                cell.filled && "animate-block-place"
              )}
              onClick={() => onCellClick?.({ x: colIndex, y: rowIndex })}
            />
          );
        })
      )}
    </div>
  );
};

interface BlockPreviewProps {
  block: Block;
  isDragging?: boolean;
  onClick?: () => void;
  className?: string;
}

export const BlockPreview = ({ block, isDragging = false, onClick, className }: BlockPreviewProps) => {
  const { shape, color } = block;
  
  return (
    <div 
      className={cn(
        "p-3 bg-card rounded-lg border border-border cursor-pointer",
        "transition-all duration-200 hover:scale-105 hover:shadow-lg",
        "select-none",
        isDragging && "opacity-50 scale-110",
        className
      )}
      onClick={onClick}
    >
      <div 
        className="grid gap-1"
        style={{ 
          gridTemplateColumns: `repeat(${shape[0].length}, 1fr)`,
          gridTemplateRows: `repeat(${shape.length}, 1fr)`
        }}
      >
        {shape.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={cn(
                "aspect-square rounded-sm",
                cell === 1 
                  ? `bg-${color} shadow-sm border border-white/20` 
                  : "transparent"
              )}
              style={{ width: '20px', height: '20px' }}
            />
          ))
        )}
      </div>
    </div>
  );
};