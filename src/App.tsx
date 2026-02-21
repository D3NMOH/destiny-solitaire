import "./index.css";
import type { Card as CardType, GameState, Language } from "./types";
import { useEffect, useRef, useState } from "react";
import {
  autoMoveToFoundation,
  checkWinCondition,
  getCardStackFromTableau,
  initializeGame,
} from "./gameLogic";

// components
import TopBar from "./components/TopBar";
import Modal from "./components/Modal";
import { Card, getSuitClass } from "./components/Card";

// assets
import logo from "./assets/logo.webp";
import Kabale from "./assets/Kabale.svg";
import Vex from "./assets/Vex.svg";
import Taken from "./assets/Taken.svg";
import Fallen from "./assets/Fallen.svg";

import { translations } from "./translations";
import { useDragAndDrop } from "./hooks/useDragAndDrop";
import { useParticles } from "./hooks/useParticles";

export function App() {
  const [gameState, setGameState] = useState<GameState>(initializeGame());
  const [language, setLanguage] = useState<Language>("de");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const timeRef = useRef<number | null>(null);

  const { particles, spawnParticles } = useParticles();
  const localizedText = translations[language];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleDropOnTableau = (
    tableauIndex: number,
    cards: CardType[],
    origin: { type: string; index: number },
  ) => {
    const newState = { ...gameState };

    if (origin.type === "waste") {
      newState.waste = newState.waste.slice(0, -1);
    } else if (origin.type === "tableau") {
      const sourceTableau = newState.tableau[origin.index];
      if (sourceTableau) {
        const cardIndex = sourceTableau.findIndex((c) => c.id === cards[0]?.id);
        newState.tableau[origin.index] = sourceTableau.slice(0, cardIndex);

        const updatePile = newState.tableau[origin.index];
        if (updatePile && updatePile.length > 0) {
          const lastCard = updatePile[updatePile.length - 1];
          if (lastCard) lastCard.faceUp = true;
        }
      }
    }

    newState.tableau[tableauIndex] = [
      ...newState.tableau[tableauIndex]!,
      ...cards,
    ];
    newState.moves++;
    setGameState(newState);
  };

  const handleDropOnFoundation = (
    foundationIndex: number,
    card: CardType,
    origin: { type: string; index: number },
    visualX: number,
    visualY: number,
  ) => {
    spawnParticles(visualX, visualY, card.suit);

    const newState = {
      ...gameState,
      foundations: [...gameState.foundations],
    };

    if (origin.type === "waste") {
      newState.waste = newState.waste.slice(0, -1);
    } else if (origin.type === "tableau") {
      const sourceTableau = newState.tableau[origin.index];
      if (sourceTableau) {
        newState.tableau[origin.index] = sourceTableau.slice(0, -1);

        const updatePile = newState.tableau[origin.index];
        if (updatePile && updatePile.length > 0) {
          const lastCard = updatePile[updatePile.length - 1];
          if (lastCard) lastCard.faceUp = true;
        }
      }
    }

    const foundation = newState.foundations[foundationIndex]!;
    newState.foundations[foundationIndex] = [...foundation, card];
    newState.moves++;

    setGameState(newState);
  };

  const {
    draggedCards,
    pointerPosition,
    pointerOffset,
    isReturnAnimation,
    handlePointerDown,
  } = useDragAndDrop(gameState, handleDropOnTableau, handleDropOnFoundation);

  useEffect(() => {
    if (!gameState.gameWon) {
      timeRef.current = window.setInterval(() => {
        setGameState((prev) => ({ ...prev, time: prev.time + 1 }));
      }, 1000);
    } else {
      if (timeRef.current) {
        clearInterval(timeRef.current);
        timeRef.current = null;
      }
    }
    return () => {
      if (timeRef.current) clearInterval(timeRef.current);
    };
  }, [gameState.gameWon]);

  const handleStockClick = () => {
    if (gameState.stock.length > 0) {
      const newState = { ...gameState };
      const card = newState.stock.pop()!;
      card.faceUp = true;
      newState.waste.push(card);
      newState.moves++;
      setGameState(newState);
    } else if (gameState.waste.length > 0) {
      const newState = { ...gameState };
      newState.stock = newState.waste
        .reverse()
        .map((c) => ({ ...c, faceUp: false }));
      newState.waste = [];
      newState.moves++;
      setGameState(newState);
    }
  };

  const handleNewGame = () => {
    setGameState(initializeGame());
    setIsMenuOpen(false);
  };

  const handleAutoMove = () => {
    const newState = autoMoveToFoundation(gameState);
    if (newState) {
      const changeIndex = newState.foundations.findIndex(
        (f, i) => f.length > gameState.foundations[i]!.length,
      );

      if (changeIndex !== -1) {
        const foundationEl = document.querySelector(
          `[data-foundation-index="${changeIndex}"]`,
        );
        if (foundationEl) {
          const rect = foundationEl.getBoundingClientRect();
          const foundation = newState.foundations[changeIndex];
          if (foundation && foundation.length > 0) {
            spawnParticles(
              rect.left + rect.width / 2,
              rect.top + rect.width / 2,
              foundation[foundation.length - 1]!.suit,
            );
          }
        }
      }

      if (checkWinCondition(newState.foundations)) {
        newState.gameWon = true;
      }

      setGameState(newState);
    }
  };
  useEffect(() => {
    if (checkWinCondition(gameState.foundations)) {
      gameState.gameWon = true;
    }
  }, [handleDropOnFoundation, handleAutoMove]);

  return (
    <div className="app">
      <div className="aniBg" />

      <TopBar
        setIsMenuOpen={setIsMenuOpen}
        isMenuOpen={isMenuOpen}
        language={language}
        setLanguage={setLanguage}
        gameState={gameState}
        logo={logo}
        handleAutoMove={handleAutoMove}
        handleNewGame={handleNewGame}
        formatTime={formatTime}
      />

      <div className="game-board">
        <div className="top-row">
          <div className="left-section">
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
                        (c) =>
                          c.id ===
                          gameState.waste[gameState.waste.length - 1]?.id,
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
          </div>

          <div className="foundations">
            {gameState.foundations.map((foundation, index) => {
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
        </div>

        <div className="tableau">
          {gameState.tableau.map((pile, pileIndex) => (
            <div
              key={pileIndex}
              className="tableau-pile"
              data-tableau-index={pileIndex}
              onDragOver={(e) => e.preventDefault()}
            >
              {pile.length === 0 ? (
                <div className="empty-pile tableau-empty"></div>
              ) : (
                pile.map((card, cardIndex) => {
                  const canDrag = card.faceUp;
                  const cards = canDrag
                    ? getCardStackFromTableau(
                        gameState.tableau,
                        pileIndex,
                        cardIndex,
                      )
                    : [];

                  const isBeingDragged = draggedCards.some(
                    (c) => c.id === card.id,
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
      </div>

      {pointerPosition && draggedCards.length > 0 && (
        <div
          className={`touch-preview ${isReturnAnimation ? "returning" : ""}`}
          style={{
            left: pointerPosition.x - pointerOffset.x,
            top: pointerPosition.y - pointerOffset.y,
          }}
        >
          {draggedCards.map((card, index) => (
            <Card
              key={card.id}
              card={card}
              style={{ top: `${index * 30}px` }}
              zIndex={index}
            />
          ))}
        </div>
      )}

      {gameState.gameWon && (
        <Modal
          localizedText={localizedText}
          handleNewGame={handleNewGame}
          formatTime={formatTime}
          time={gameState.time}
          moves={gameState.moves}
        />
      )}

      {particles.map((p) => (
        <div
          key={p.id}
          className={`spark-particle ${getSuitClass(p.suit)}`}
          style={
            {
              left: p.x,
              top: p.y,
              "--tx": `${p.tx}px`,
              "--ty": `${p.ty}px`,
              "--rot": `${p.rot}deg`,
            } as any
          }
        />
      ))}
    </div>
  );
}

export default App;
