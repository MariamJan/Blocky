import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trophy, RotateCcw } from 'lucide-react';

interface GameOverModalProps {
  isOpen: boolean;
  score: number;
  clearedLines: number;
  onRestart: () => void;
}

export const GameOverModal = ({ isOpen, score, clearedLines, onRestart }: GameOverModalProps) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md bg-card border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-foreground flex items-center justify-center gap-2">
            <Trophy className="w-6 h-6 text-game-yellow" />
            Game Over
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="text-center">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground">Final Score</p>
                <p className="text-2xl font-bold text-primary">{score.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                <p className="text-sm text-muted-foreground">Lines Cleared</p>
                <p className="text-2xl font-bold text-accent">{clearedLines}</p>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Great job! You've cleared {clearedLines} lines and scored {score.toLocaleString()} points.
            </p>
          </div>

          <div className="flex justify-center">
            <Button 
              onClick={onRestart}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-white font-semibold px-8 py-2 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Play Again
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};