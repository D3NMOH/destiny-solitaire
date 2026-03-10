import "./index.css";
import type { Card as CardType, GameState } from "./types";
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
import Tableau from "./components/Tableau";
import Foundations from "./components/Foundations";
import Waste from "./components/Waste";
import Settings from "./components/Settings";

import logo from "./assets/logo.webp";

import { useDragAndDrop } from "./hooks/useDragAndDrop";
import { useParticles } from "./hooks/useParticles";

// localization
import { translations } from "./data/translations";
import { langStore } from "./stores/langStore";

export function App() {
  const [gameState, setGameState] = useState<GameState>(initializeGame());
  const { language, setLanguage } = langStore();
  const [showSettings, setShowSettings] = useState(false);

  const timeRef = useRef<number | null>(null);

  const { particles, spawnParticles } = useParticles();
  const localizedText = translations[language];

  useEffect(() => {
    document.documentElement.lang = language as string;
  }, [language]);

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

  const prevPointerXRef = useRef<number | null>(null);
  const [dragRotation, setDragRotation] = useState(0);
  const movementTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (movementTimeoutRef.current) {
      clearTimeout(movementTimeoutRef.current);
    }

    if (pointerPosition && !isReturnAnimation) {
      if (prevPointerXRef.current !== null) {
        const dx = pointerPosition.x - prevPointerXRef.current;

        const cardHeight = 140;
        const stackHeight = (draggedCards.length - 1) * 30 + cardHeight;
        const centerY = stackHeight / 2;
        const leverage = (centerY - pointerOffset.y) / centerY;

        const targetRotation = Math.max(-15, Math.min(15, dx * 0.8 * leverage));
        setDragRotation(targetRotation);
      }
      prevPointerXRef.current = pointerPosition.x;

      movementTimeoutRef.current = window.setTimeout(() => {
        setDragRotation(0);
      }, 100);
    } else {
      prevPointerXRef.current = null;
      setDragRotation(0);
    }

    return () => {
      if (movementTimeoutRef.current) clearTimeout(movementTimeoutRef.current);
    };
  }, [pointerPosition, isReturnAnimation, draggedCards, pointerOffset]);

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
      <div className="aniBg2" />
      <TopBar
        language={language}
        setLanguage={setLanguage}
        gameState={gameState}
        logo={logo}
        handleAutoMove={handleAutoMove}
        handleNewGame={handleNewGame}
        formatTime={formatTime}
        setShowSettings={setShowSettings}
      />

      <div className="game-board">
        <div className="top-row">
          <div className="left-section">
            <Waste
              gameState={gameState}
              draggedCards={draggedCards}
              handlePointerDown={handlePointerDown}
              handleStockClick={handleStockClick}
            />
          </div>

          <Foundations gameState={gameState} />
        </div>

        <Tableau
          gameState={gameState}
          draggedCards={draggedCards}
          handlePointerDown={handlePointerDown}
          getCardStackFromTableau={getCardStackFromTableau}
        />
      </div>

      {pointerPosition && draggedCards.length > 0 && (
        <div
          className={`touch-preview ${isReturnAnimation ? "returning" : ""}`}
          style={{
            left: pointerPosition.x - pointerOffset.x,
            top: pointerPosition.y - pointerOffset.y,
            transform: `rotate(${dragRotation}deg)`,
            transformOrigin: `${pointerOffset.x}px ${pointerOffset.y}px`,
            transition: isReturnAnimation ? undefined : "transform 0.1s linear",
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

      <Settings show={showSettings} setShow={setShowSettings} />
    </div>
  );
}

export default App;
