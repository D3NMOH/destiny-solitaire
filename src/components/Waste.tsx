import type { Card as CardProps, GameState } from "@/types";
import { Card } from "./Card";

export default function ({
  gameState,
  draggedCards,
  handlePointerDown,
  handleStockClick,
}: {
  gameState: GameState;
  draggedCards: CardProps[];
  handlePointerDown: any;
  handleStockClick: any;
}) {
  return (
    <div className="stock-waste">
      <div className="pile stock-pile" onClick={handleStockClick}>
        {gameState.stock.length > 0 ? (
          <Card card={gameState.stock[gameState.stock.length - 1]!} />
        ) : (
          <div className="empty-pile">
            <div className="reset-icon">↻</div>
          </div>
        )}
      </div>

      <div className="pile waste-pile">
        {gameState.waste.length > 0 ? (
          <Card
            card={gameState.waste[gameState.waste.length - 1]!}
            onPointerDown={(e) =>
              handlePointerDown(
                e,
                [gameState.waste[gameState.waste.length - 1]!],
                { type: "waste", index: 0 },
              )
            }
            style={{
              opacity: draggedCards.some(
                (c) => c.id === gameState.waste[gameState.waste.length - 1]?.id,
              )
                ? 0
                : 1,
            }}
          />
        ) : (
          <div className="empty-pile">
            <img
              src="/assets/vanguard.svg"
              alt="suit"
              className="foundation-suit-icon"
            />
          </div>
        )}
      </div>
    </div>
  );
}
