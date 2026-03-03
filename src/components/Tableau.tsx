import type { Card as CardProps } from "@/types";
import { Card } from "./Card";

export default function Tableau({
  gameState,
  draggedCards,
  handlePointerDown,
  getCardStackFromTableau,
}: any) {
  return (
    <div className="tableau">
      {gameState.tableau.map((pile: any, pileIndex: number) => (
        <div
          key={pileIndex}
          className="tableau-pile"
          data-tableau-index={pileIndex}
          onDragOver={(e) => e.preventDefault()}
        >
          {pile.length === 0 ? (
            <div className="empty-pile tableau-empty"></div>
          ) : (
            pile.map((card: CardProps, cardIndex: number) => {
              const canDrag = card.faceUp;
              const cards = canDrag
                ? getCardStackFromTableau(
                    gameState.tableau,
                    pileIndex,
                    cardIndex,
                  )
                : [];

              const isBeingDragged = draggedCards.some(
                (c: any) => c.id === card.id,
              );

              return (
                <Card
                  key={card.id}
                  card={card}
                  onPointerDown={(e) =>
                    canDrag &&
                    handlePointerDown(e, cards, {
                      type: "tableau",
                      index: pileIndex,
                    })
                  }
                  style={{
                    top: `${cardIndex * 30}px`,
                    opacity: isBeingDragged ? 0 : 1,
                    cursor: canDrag ? "grab" : "default",
                  }}
                  zIndex={cardIndex}
                />
              );
            })
          )}
        </div>
      ))}
    </div>
  );
}
