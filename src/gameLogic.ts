import type { Card, Suit, Rank, GameState } from "./types";

import Void from "./assets/Void.svg";
import Solar from "./assets/Solar.svg";
import Stasis from "./assets/Stasis.svg";
import Strand from "./assets/Strand.svg";

const suits: Suit[] = [Void, Solar, Stasis, Strand];
const ranks: Rank[] = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

export function createDeck(): Card[] {
  const deck: Card[] = [];
  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({
        suit,
        rank,
        faceUp: false,
        id: `${suit}-${rank}`,
      });
    }
  }
  return deck;
}

export function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[randomIndex]] = [
      shuffled[randomIndex]!,
      shuffled[i]!,
    ];
  }
  return shuffled;
}

export function initializeGame(): GameState {
  const deck = shuffleDeck(createDeck());
  const tableau: Card[][] = [[], [], [], [], [], [], []];

  let cardIndex = 0;
  for (let i = 0; i < 7; i++) {
    for (let j = i; j < 7; j++) {
      const card = deck[cardIndex++];
      if (card) {
        if (i === j) {
          card.faceUp = true;
        }
        tableau[j]!.push(card);
      }
    }
  }

  const stock = deck
    .slice(cardIndex)
    .map((card) => ({ ...card, faceUp: false }));

  return {
    stock,
    waste: [],
    foundations: [[], [], [], []],
    tableau,
    selectedCards: [],
    selectedPile: null,
    moves: 0,
    time: 0,
    gameWon: false,
  };
}

export function getRankValue(rank: Rank): number {
  const values: Record<Rank, number> = {
    A: 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    J: 11,
    Q: 12,
    K: 13,
  };
  return values[rank];
}

export function isLight(suit: Suit): boolean {
  if (
    suit === "Solar" ||
    suit === "Void" ||
    suit === "solar" ||
    suit === "void"
  ) {
    return true;
  }

  if (suit.includes("Solar") || suit.includes("Void")) {
    return true;
  }

  return false;
}

export function canPlaceOnTableau(
  card: Card,
  targetCard: Card | null,
): boolean {
  if (!targetCard) {
    return getRankValue(card.rank) === 13;
  }

  return (
    getRankValue(targetCard.rank) === getRankValue(card.rank) + 1 &&
    isLight(card.suit) !== isLight(targetCard.suit)
  );
}

export function canPlaceOnFoundation(card: Card, foundation: Card[]): boolean {
  if (foundation.length === 0) {
    return getRankValue(card.rank) === 1;
  }

  const topCard = foundation[foundation.length - 1];
  if (!topCard) return false;

  return (
    card.suit === topCard.suit &&
    getRankValue(card.rank) === getRankValue(topCard.rank) + 1
  );
}

export function checkWinCondition(foundations: Card[][]): boolean {
  if (!foundations || foundations.length < 4) return false;
  return foundations.every(
    (foundation) => foundation && foundation.length === 13,
  );
}

export function getCardStackFromTableau(
  tableau: Card[][],
  pileIndex: number,
  cardIndex: number,
): Card[] {
  const pile = tableau[pileIndex];
  return pile ? pile.slice(cardIndex) : [];
}

export function autoMoveToFoundation(gameState: GameState): GameState | null {
  if (gameState.gameWon) return null;

  if (gameState.waste.length > 0) {
    const wasteCard = gameState.waste[gameState.waste.length - 1];
    if (wasteCard) {
      for (let i = 0; i < 4; i++) {
        const foundation = gameState.foundations[i];
        if (foundation && canPlaceOnFoundation(wasteCard, foundation)) {
          const newState = {
            ...gameState,
            foundations: [...gameState.foundations],
          };
          newState.waste = newState.waste.slice(0, -1);
          newState.foundations[i] = [...foundation, wasteCard];
          newState.moves++;
          return newState;
        }
      }
    }
  }

  for (let pileIndex = 0; pileIndex < 7; pileIndex++) {
    const tableauPile = gameState.tableau[pileIndex];
    if (tableauPile && tableauPile.length > 0) {
      const tableauCard = tableauPile[tableauPile.length - 1];
      if (tableauCard && tableauCard.faceUp) {
        for (let foundationIndex = 0; foundationIndex < 4; foundationIndex++) {
          const foundation = gameState.foundations[foundationIndex];
          if (foundation && canPlaceOnFoundation(tableauCard, foundation)) {
            const newState = {
              ...gameState,
              foundations: [...gameState.foundations],
            };
            const newTableauPile = newState.tableau[pileIndex];
            if (newTableauPile) {
              const updatedPile = newTableauPile.slice(0, -1);
              newState.tableau[pileIndex] = updatedPile;
              if (updatedPile.length > 0) {
                const lastCard = updatedPile[updatedPile.length - 1];
                if (lastCard) lastCard.faceUp = true;
              }
            }
            newState.foundations[foundationIndex] = [
              ...foundation,
              tableauCard,
            ];
            newState.moves++;
            return newState;
          }
        }
      }
    }
  }

  return null;
}
