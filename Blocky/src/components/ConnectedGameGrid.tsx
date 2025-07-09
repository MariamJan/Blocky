import { GameGrid as GameGridType, Block, Position } from '@/types/game';
import { cn } from '@/lib/utils';

interface GameGridProps {
  grid: GameGridType;
  onCellClick?: (position: Position) => void;
  highlightedCells?: Position[];
  className?: string;
}

export const GameGrid = ({ grid, onCellClick, highlightedCells = [], className }: GameGridProps) => {
  // Helper function to check if a cell should connect to adjacent cells
  const getConnectionStyle = (row: number, col: number) => {
    const cell = grid[row][col];
    if (!cell.filled) return { borders: '', corners: 'rounded-sm' };

    const connections = {
      top: row > 0 && grid[row - 1][col].filled && grid[row - 1][col].color === cell.color,
      bottom: row < 9 && grid[row + 1][col].filled && grid[row + 1][col].color === cell.color,
      left: col > 0 && grid[row][col - 1].filled && grid[row][col - 1].color === cell.color,
      right: col < 9 && grid[row][col + 1].filled && grid[row][col + 1].color === cell.color,
    };

    // Create border classes to hide borders where blocks connect
    let borderClasses = 'border-2';
    if (connections.top) borderClasses += ' border-t-transparent';
    if (connections.bottom) borderClasses += ' border-b-transparent';
    if (connections.left) borderClasses += ' border-l-transparent';
    if (connections.right) borderClasses += ' border-r-transparent';

    // Create corner radius classes
    let cornerClasses = '';
    const topLeft = !connections.top && !connections.left;
    const topRight = !connections.top && !connections.right;
    const bottomLeft = !connections.bottom && !connections.left;
    const bottomRight = !connections.bottom && !connections.right;

    if (topLeft) cornerClasses += ' rounded-tl-lg';
    if (topRight) cornerClasses += ' rounded-tr-lg';
    if (bottomLeft) cornerClasses += ' rounded-bl-lg';
    if (bottomRight) cornerClasses += ' rounded-br-lg';

    return {
      borders: borderClasses,
      corners: cornerClasses
    };
  };

  return (
    <div className={cn(
      "relative p-6 bg-gradient-to-br from-grid-bg to-grid-bg/80 rounded-xl border-2 border-grid-border",
      "shadow-2xl backdrop-blur-sm",
      className
    )}>
      {/* Grid container with minimal gaps for connection effect */}
      <div className="grid grid-cols-10 gap-0.5 relative">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isHighlighted = highlightedCells.some(
              pos => pos.x === colIndex && pos.y === rowIndex
            );
            
            const connectionStyle = getConnectionStyle(rowIndex, colIndex);
            
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={cn(
                  "aspect-square transition-all duration-300 relative overflow-hidden",
                  "cursor-pointer",
                  cell.filled 
                    ? [
                        connectionStyle.borders,
                        connectionStyle.corners,
                        "border-white/30 shadow-lg relative z-10"
                      ]
                    : [
                        "bg-grid-cell/80 rounded-sm border border-grid-border/30",
                        "hover:bg-grid-border/40 hover:border-grid-border/60"
                      ],
                  isHighlighted && [
                    "ring-2 ring-accent animate-pulse-glow z-20"
                  ]
                )}
                style={{
                  background: cell.filled 
                    ? `var(--block-${cell.color.replace('game-', '')})`
                    : undefined,
                  minHeight: '32px',
                  minWidth: '32px'
                }}
                onClick={() => onCellClick?.({ x: colIndex, y: rowIndex })}
              >
                {/* Inner glow effect for filled cells */}
                {cell.filled && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/10" 
                         style={{ borderRadius: 'inherit' }} />
                    <div className="absolute inset-1 bg-gradient-to-br from-white/20 to-transparent rounded-sm opacity-60" />
                  </>
                )}
                
                {/* Sparkle effect for highlighted cells */}
                {isHighlighted && (
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/50 to-transparent animate-pulse" 
                       style={{ borderRadius: 'inherit' }} />
                )}

                {/* Click indicator for empty cells */}
                {!cell.filled && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-30 transition-opacity">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Grid overlay for visual guidance */}
      <div className="absolute inset-6 pointer-events-none">
        <div className="w-full h-full opacity-10 rounded-lg"
             style={{
               backgroundImage: `
                 linear-gradient(to right, hsl(var(--grid-border)) 1px, transparent 1px),
                 linear-gradient(to bottom, hsl(var(--grid-border)) 1px, transparent 1px)
               `,
               backgroundSize: 'calc(10% - 0.5px) calc(10% - 0.5px)'
             }}
        />
      </div>
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
        "p-4 bg-gradient-to-br from-card to-card/60 rounded-xl border border-border/50",
        "transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer",
        "backdrop-blur-sm relative overflow-hidden group",
        "select-none",
        isDragging && "opacity-60 scale-110 rotate-3",
        className
      )}
      onClick={onClick}
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Connected block preview */}
      <div 
        className="grid gap-0 relative z-10 mx-auto w-fit"
        style={{ 
          gridTemplateColumns: `repeat(${shape[0].length}, 1fr)`,
          gridTemplateRows: `repeat(${shape.length}, 1fr)`
        }}
      >
        {shape.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            // Check connections within the shape for seamless look
            const connections = {
              top: rowIndex > 0 && shape[rowIndex - 1][colIndex] === 1,
              bottom: rowIndex < shape.length - 1 && shape[rowIndex + 1][colIndex] === 1,
              left: colIndex > 0 && shape[rowIndex][colIndex - 1] === 1,
              right: colIndex < shape[rowIndex].length - 1 && shape[rowIndex][colIndex + 1] === 1,
            };

            let borderClasses = cell === 1 ? 'border-2 border-white/30' : '';
            if (cell === 1) {
              if (connections.top) borderClasses += ' border-t-transparent';
              if (connections.bottom) borderClasses += ' border-b-transparent';
              if (connections.left) borderClasses += ' border-l-transparent';
              if (connections.right) borderClasses += ' border-r-transparent';
            }

            let cornerClasses = '';
            if (cell === 1) {
              const topLeft = !connections.top && !connections.left;
              const topRight = !connections.top && !connections.right;
              const bottomLeft = !connections.bottom && !connections.left;
              const bottomRight = !connections.bottom && !connections.right;

              if (topLeft) cornerClasses += ' rounded-tl-md';
              if (topRight) cornerClasses += ' rounded-tr-md';
              if (bottomLeft) cornerClasses += ' rounded-bl-md';
              if (bottomRight) cornerClasses += ' rounded-br-md';
            }

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={cn(
                  "aspect-square transition-all duration-200 relative overflow-hidden",
                  cell === 1 
                    ? [borderClasses, cornerClasses, "shadow-md"]
                    : "transparent"
                )}
                style={{ 
                  width: '28px', 
                  height: '28px',
                  background: cell === 1 
                    ? `var(--block-${color.replace('game-', '')})`
                    : 'transparent'
                }}
              >
                {/* Inner shine effect for connected blocks */}
                {cell === 1 && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-black/20" 
                         style={{ borderRadius: 'inherit' }} />
                    <div className="absolute inset-1 bg-gradient-to-br from-white/30 to-transparent rounded-sm opacity-70" />
                  </>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};