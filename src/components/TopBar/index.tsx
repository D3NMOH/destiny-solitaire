import { translations } from "@/data/translations";
import type { TopBar } from "@/types";
import styles from "./TopBar.module.css";
import SettingsIcon from "@/assets/icons/SettingsIcon";

export default function TopBar({
  language,
  gameState,
  logo,
  handleAutoMove,
  handleNewGame,
  formatTime,
  setShowSettings,
}: TopBar) {
  const localizedText = translations[language];

  return (
    <div className={styles["top-bar"]}>
      <div className={styles["top-bar-bg"]} />

      <div className={`${styles["game-controls"]}`}>
        <div className={styles["logo-container"]}>
          <img src={logo} alt="logo" className={`${styles["logo"]} logo`} />
        </div>
        <div className={styles["game-info"]}>
          <div className={styles["info-item"]}>
            <span className={styles["info-label"]}>{localizedText?.time}:</span>
            <span className={styles["info-value"]}>
              {formatTime(gameState.time)}
            </span>
          </div>
          <div className={styles["info-item"]}>
            <span className={styles["info-label"]}>
              {localizedText?.moves}:
            </span>
            <span className={styles["info-value"]}>{gameState.moves}</span>
          </div>
        </div>
        <div className={styles["menu-buttons"]}>
          <button
            className={`${styles.btn} `}
            onClick={() => {
              handleAutoMove();
            }}
            title={localizedText?.auto}
          >
            <span className={styles["control-button--icon"]}>✨</span>
          </button>
          <button
            className={`${styles.btn}`}
            onClick={handleNewGame}
            title={localizedText?.newGame}
          >
            <span className={styles["control-button--icon"]}>↻</span>
          </button>
          <button
            className={`${styles.btn}`}
            onClick={() => setShowSettings(true)}
            title={localizedText?.settings}
          >
            <SettingsIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
