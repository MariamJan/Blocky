import { Trophy, Target, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface GameStatsProps {
  score: number;
  clearedLines: number;
  isGameOver: boolean;
}

export const GameStats = ({ score, clearedLines, isGameOver }: GameStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card className="p-4 bg-gradient-to-br from-card to-card/80 border-primary/20">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/20 rounded-lg">
            <Trophy className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Score</p>
            <p className="text-2xl font-bold text-foreground">{score.toLocaleString()}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-gradient-to-br from-card to-card/80 border-accent/20">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-accent/20 rounded-lg">
            <Target className="w-6 h-6 text-accent" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Lines Cleared</p>
            <p className="text-2xl font-bold text-foreground">{clearedLines}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-gradient-to-br from-card to-card/80 border-game-yellow/20">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${isGameOver ? 'bg-destructive/20' : 'bg-game-yellow/20'}`}>
            <Zap className={`w-6 h-6 ${isGameOver ? 'text-destructive' : 'text-game-yellow'}`} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            <p className={`text-lg font-bold ${isGameOver ? 'text-destructive' : 'text-game-yellow'}`}>
              {isGameOver ? 'Game Over' : 'Playing'}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};