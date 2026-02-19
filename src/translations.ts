import type { Language, Translations } from "./types";

export const translations: Record<Language, Translations> = {
  de: {
    newGame: "Neues Spiel",
    auto: "Auto",
    time: "Zeit",
    moves: "Züge",
    youWon: "Du hast gewonnen!",
    congratulations: "Glückwunsch!",
    playAgain: "Nochmal spielen",
  },
  en: {
    newGame: "New Game",
    auto: "Auto",
    time: "Time",
    moves: "Moves",
    youWon: "You Won!",
    congratulations: "Congratulations!",
    playAgain: "Play Again",
  },
  uk: {
    newGame: "Нова гра",
    auto: "Авто",
    time: "Час",
    moves: "Ходи",
    youWon: "Ви виграли!",
    congratulations: "Вітаємо!",
    playAgain: "Грати знову",
  },
  ru: {
    newGame: "Новая игра",
    auto: "Авто",
    time: "Время",
    moves: "Ходы",
    youWon: "Вы выиграли!",
    congratulations: "Поздравляем!",
    playAgain: "Играть снова",
  },
};
