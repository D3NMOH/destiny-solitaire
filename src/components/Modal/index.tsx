import styles from "./Modal.module.css";
export default function Modal({
  localizedText,
  handleNewGame,
  formatTime,
  time,
  moves,
}: any) {
  return (
    <div className={styles["modal-overlay"]} onClick={handleNewGame}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>🎉 {localizedText.youWon} 🎉</h2>
        <div className={styles["modal-stats"]}>
          <p>
            {localizedText.time}: <strong>{formatTime(time)}</strong>
          </p>
          <p>
            {localizedText.moves}: <strong>{moves}</strong>
          </p>
          <button
            className={`${styles.btn} ${styles["btn-primary"]} ${styles["btn-large"]}`}
            onClick={handleNewGame}
          >
            {localizedText.playAgain}
          </button>
        </div>
      </div>
    </div>
  );
}
