import { Block, Position } from '@/types/game';
import { BlockPreview } from './ConnectedGameGrid';
import { cn } from '@/lib/utils';

interface BlockSelectorProps {
  blocks: Block[];
  selectedBlock: Block | null;
  onBlockSelect: (block: Block) => void;
  className?: string;
}

export const BlockSelector = ({ 
  blocks, 
  selectedBlock, 
  onBlockSelect,
  className 
}: BlockSelectorProps) => {
  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-lg font-semibold text-foreground mb-3">Available Blocks</h3>
      
      <div className="grid grid-cols-1 gap-3">
        {blocks.map((block) => (
          <div
            key={block.id}
            className={cn(
              "transform transition-all duration-200",
              selectedBlock?.id === block.id && "ring-2 ring-accent scale-105"
            )}
          >
            <BlockPreview
              block={block}
              onClick={() => onBlockSelect(block)}
              className={cn(
                "hover:ring-2 hover:ring-primary/50",
                selectedBlock?.id === block.id && "ring-2 ring-accent bg-accent/10"
              )}
            />
          </div>
        ))}
      </div>

      {selectedBlock && (
        <div className="mt-4 p-3 bg-muted/50 rounded-lg border border-border">
          <p className="text-sm text-muted-foreground text-center">
            Click on the grid to place the selected block
          </p>
        </div>
      )}
    </div>
  );
};