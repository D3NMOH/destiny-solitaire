import { translations } from "@/translations";
import type { Language, TopBar } from "@/types";
import styles from "./TopBar.module.css";

export default function TopBar({
  setIsMenuOpen,
  isMenuOpen,
  language,
  setLanguage,
  gameState,
  logo,
  handleAutoMove,
  handleNewGame,
  formatTime,
}: TopBar) {
  const localizedText = translations[language];

  return (
    <div className={styles["top-bar"]}>
      <div className={styles["top-bar-bg"]} />
      <div className={styles["game-header"]}>
        <button
          className={styles["hamburger-btn"]}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          <span
            className={`${styles["hamburger-line"]} ${isMenuOpen ? styles.open : ""}`}
          ></span>
          <span
            className={`${styles["hamburger-line"]} ${isMenuOpen ? styles.open : ""}`}
          ></span>
          <span
            className={`${styles["hamburger-line"]} ${isMenuOpen ? styles.open : ""}`}
          ></span>
        </button>
      </div>

      <div
        className={`${styles["game-controls"]} ${isMenuOpen ? styles["menu-open"] : ""}`}
      >
        <div className={styles["game-info"]}>
          <div className={styles["info-item"]}>
            <span className={styles["info-label"]}>{localizedText.time}:</span>
            <span className={styles["info-value"]}>
              {formatTime(gameState.time)}
            </span>
          </div>
          <div className={styles["info-item"]}>
            <span className={styles["info-label"]}>{localizedText.moves}:</span>
            <span className={styles["info-value"]}>{gameState.moves}</span>
          </div>
        </div>

        <img src={logo} alt="logo" className="logo" />

        <div className={styles["menu-buttons"]}>
          <button
            className={`${styles.btn} ${styles["btn-secondary"]}`}
            onClick={() => {
              handleAutoMove();
              setIsMenuOpen(false);
            }}
            title={localizedText.auto}
          >
            💡
          </button>
          <button
            className={`${styles.btn} ${styles["btn-primary"]}`}
            onClick={handleNewGame}
            title={localizedText.newGame}
          >
            ↻
          </button>
        </div>

        <div className={styles["language-selector"]}>
          {(["de", "en", "uk", "ru"] as Language[]).map((lang) => (
            <button
              className={`${styles["lang-btn"]} ${language === lang ? styles.active : ""}`}
              key={lang}
              onClick={() => setLanguage(lang)}
              title={lang.toUpperCase()}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {isMenuOpen && (
        <div className="menu-overlay" onClick={() => setIsMenuOpen(false)} />
      )}
    </div>
  );
}
