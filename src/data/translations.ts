import type { List, Translations } from "../types";

export const languages: List[] = [
  { id: "de", name: "Deutsch" },
  { id: "en", name: "English" },
  { id: "uk", name: "Українська" },
  { id: "ru", name: "Русский" },
];

export const translations: Record<string, Translations> = {
  de: {
    newGame: "Neues Spiel",
    auto: "Auto",
    time: "Zeit",
    moves: "Züge",
    youWon: "Du hast gewonnen!",
    congratulations: "Glückwunsch!",
    playAgain: "Nochmal spielen",
    settings: "Einstellungen",
    preview: "Vorschau",
  },
  en: {
    newGame: "New Game",
    auto: "Auto",
    time: "Time",
    moves: "Moves",
    youWon: "You Won!",
    congratulations: "Congratulations!",
    playAgain: "Play Again",
    settings: "Settings",
    preview: "Preview",
  },
  uk: {
    newGame: "Нова гра",
    auto: "Авто",
    time: "Час",
    moves: "Ходи",
    youWon: "Ви виграли!",
    congratulations: "Вітаємо!",
    playAgain: "Грати знову",
    settings: "Налаштування",
    preview: "Перегляд",
  },
  ru: {
    newGame: "Новая игра",
    auto: "Авто",
    time: "Время",
    moves: "Ходы",
    youWon: "Вы выиграли!",
    congratulations: "Поздравляем!",
    playAgain: "Играть снова",
    settings: "Настройки",
    preview: "Предпросмотр",
  },
};
