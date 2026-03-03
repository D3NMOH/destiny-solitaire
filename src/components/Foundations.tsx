import Kabale from "../assets/Kabale.svg";
import Vex from "../assets/Vex.svg";
import Taken from "../assets/Taken.svg";
import Fallen from "../assets/Fallen.svg";
import { Card } from "./Card";

export default function Foundations({ gameState }: any) {
  return (
    <div className="foundations">
      {gameState.foundations.map((foundation: any, index: number) => {
        const suitIcons = [Kabale, Fallen, Vex, Taken];

        return (
          <div
            className="pile foundation-pile"
            key={index}
            data-foundation-index={index}
            onDragOver={(e) => e.preventDefault()}
          >
            {foundation.length > 0 ? (
              <Card card={foundation[foundation.length - 1]!} />
            ) : (
              <div className="empty-pile foundation-empty">
                <img
                  src={suitIcons[index]}
                  alt="suit"
                  className="foundation-suit-icon"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
