export type Suit = string | "Stasis" | "Strand" | "Solar" | "Void";
export type Rank =
  | "A"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K";

export interface Card {
  suit: Suit;
  rank: Rank;
  faceUp: boolean;
  id: string;
}

export interface GameState {
  stock: Card[];
  waste: Card[];
  foundations: Card[][];
  tableau: Card[][];
  selectedCards: Card[];
  selectedPile: string | null;
  moves: number;
  time: number;
  gameWon: boolean;
}

export interface CardProps {
  card: Card;
  onClick?: () => void;
  onPointerDown?: (e: React.PointerEvent) => void;
  style?: React.CSSProperties;
  isSelected?: boolean;
  zIndex?: number;
}

export interface DragOrigin {
  type: string;
  index: number;
}

export interface TopBar {
  setIsMenuOpen: any;
  isMenuOpen: boolean;
  language: Language;
  setLanguage: any;
  gameState: GameState;
  logo: any;
  handleAutoMove: () => void;
  handleNewGame: () => void;
  formatTime: (seconds: number) => string;
}

export interface Particles {
  id: number;
  x: number;
  y: number;
  suit: string;
  tx: number;
  ty: number;
  rot: number;
}

export type Language = "de" | "en" | "uk" | "ru";

export interface Translations {
  newGame: string;
  auto: string;
  time: string;
  moves: string;
  youWon: string;
  congratulations: string;
  playAgain: string;
}
