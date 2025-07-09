import { useState } from 'react';
import { useGameLogic } from '@/hooks/useGameLogic';
import { GameGrid } from '@/components/ConnectedGameGrid';
import { GameStats } from '@/components/GameStats';
import { BlockSelector } from '@/components/BlockSelector';
import { GameOverModal } from '@/components/GameOverModal';
import { Button } from '@/components/ui/button';
import { Block, Position } from '@/types/game';
import { RotateCcw, Sparkles } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const { gameState, canPlaceBlock, placeBlock, resetGame } = useGameLogic();
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);
  const [highlightedCells, setHighlightedCells] = useState<Position[]>([]);

  const handleBlockSelect = (block: Block) => {
    setSelectedBlock(block);
    setHighlightedCells([]);
  };

  const handleCellClick = (position: Position) => {
    if (!selectedBlock) {
      toast({
        title: "No block selected",
        description: "Please select a block first!",
        variant: "destructive"
      });
      return;
    }

    if (canPlaceBlock(selectedBlock, position, gameState.grid)) {
      placeBlock(selectedBlock, position);
      setSelectedBlock(null);
      setHighlightedCells([]);
      
      toast({
        title: "Block placed!",
        description: `+${selectedBlock.shape.flat().filter(cell => cell === 1).length * 10} points`,
      });
    } else {
      toast({
        title: "Cannot place block",
        description: "This position is not valid for the selected block.",
        variant: "destructive"
      });
    }
  };

  const handleRestart = () => {
    resetGame();
    setSelectedBlock(null);
    setHighlightedCells([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/80 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4 flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 text-accent animate-pulse" />
            Blocky
            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Place blocks strategically on the 10x10 grid. Clear full rows or columns to score points!
          </p>
        </div>

        {/* Game Stats */}
        <GameStats 
          score={gameState.score}
          clearedLines={gameState.clearedLines}
          isGameOver={gameState.isGameOver}
        />

        {/* Game Controls */}
        <div className="flex justify-center mb-6">
          <Button 
            onClick={handleRestart}
            variant="outline"
            className="bg-muted/50 hover:bg-muted border-border"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            New Game
          </Button>
        </div>

        {/* Game Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Block Selector */}
          <div className="lg:col-span-1">
            <BlockSelector
              blocks={gameState.currentBlocks}
              selectedBlock={selectedBlock}
              onBlockSelect={handleBlockSelect}
            />
          </div>

          {/* Game Grid */}
          <div className="lg:col-span-3 flex justify-center">
            <div className="max-w-lg w-full">
              <GameGrid
                grid={gameState.grid}
                onCellClick={handleCellClick}
                highlightedCells={highlightedCells}
                className="shadow-2xl"
              />
              
              {selectedBlock && (
                <div className="mt-4 p-4 bg-muted/30 rounded-lg border border-border text-center">
                  <p className="text-sm text-muted-foreground">
                    Selected: <span className="font-medium text-foreground">Block</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Click on the grid to place your block
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 p-6 bg-card/50 rounded-lg border border-border max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold mb-3 text-center">How to Play</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <p className="mb-2">🎯 <strong>Objective:</strong> Clear rows and columns by filling them completely</p>
              <p className="mb-2">🧩 <strong>Placement:</strong> Select a block, then click on the grid to place it</p>
            </div>
            <div>
              <p className="mb-2">🏆 <strong>Scoring:</strong> Earn points for placing blocks and clearing lines</p>
              <p className="mb-2">⚡ <strong>Game Over:</strong> When no blocks can be placed on the grid</p>
            </div>
          </div>
        </div>
      </div>

      {/* Game Over Modal */}
      <GameOverModal
        isOpen={gameState.isGameOver}
        score={gameState.score}
        clearedLines={gameState.clearedLines}
        onRestart={handleRestart}
      />
    </div>
  );
};

export default Index;
