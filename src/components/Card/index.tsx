import React, { useState, useEffect } from "react";
import { isLight } from "@/gameLogic";
import type { CardProps } from "@/types";
import styles from "./card.module.css";

export function getSuitClass(suit: string): string {
  if (suit.includes("Void")) return "suit-void";
  if (suit.includes("Solar")) return "suit-solar";
  if (suit.includes("Stasis")) return "suit-stasis";
  if (suit.includes("Strand")) return "suit-strand";
  return "";
}

function getCardBackgroundImage(rank: string, suit: string): string | null {
  try {
    const suitName = suit.includes("Solar")
      ? "Solar"
      : suit.includes("Void")
        ? "Void"
        : suit.includes("Stasis")
          ? "Stasis"
          : suit.includes("Strand")
            ? "Strand"
            : null;

    if (suitName) {
      return `/assets/card/${rank}-${suitName}.webp`;
    }

    return null;
  } catch (e) {
    return null;
  }
}

export function Card({
  card,
  onClick,
  onPointerDown,
  style,
  isSelected = false,
  zIndex = 0,
}: CardProps) {
  const backgroundImage = getCardBackgroundImage(card.rank, card.suit);

  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [card.id, backgroundImage]);

  const showBackgroundImage = backgroundImage && !imageError;

  const suitClass = getSuitClass(card.suit);

  const isLightCard = isLight(card.suit);

  return (
    <div
      onClick={onClick}
      onPointerDown={onPointerDown}
      style={{ ...style, zIndex }}
      className={`${styles.card} ${card.faceUp ? styles["face-up"] : styles["face-down"]} ${isSelected ? styles.selected : ""}`}
    >
      {card.faceUp ? (
        <div
          className={`${styles["card-content"]} ${isLightCard ? styles.light : styles.dark} ${styles[suitClass]}`}
        >
          {!showBackgroundImage && (
            <div className={`${styles["card-corner"]} ${styles["top-left"]}`}>
              <span className={styles.rank}>{card.rank}</span>
              <img
                src={card.suit}
                alt="suit"
                className={styles["suit-icon-small"]}
              />
            </div>
          )}

          <div className={styles["card-center"]}>
            {showBackgroundImage ? (
              <img
                src={backgroundImage}
                alt={`${card.rank}`}
                className={styles["card-background-image"]}
                onError={() => setImageError(true)}
              />
            ) : (
              <>
                <img
                  src={card.suit}
                  alt="suit"
                  className={styles["suit-icon-large"]}
                />
              </>
            )}
          </div>

          {!showBackgroundImage && (
            <div
              className={`${styles["card-corner"]} ${styles["bottom-right"]}`}
            >
              <span className={styles.rank}>{card.rank}</span>
              <img
                src={card.suit}
                alt="suit"
                className={styles["suit-icon-small"]}
              />
            </div>
          )}
        </div>
      ) : (
        <div className={styles["card-back"]} />
      )}
    </div>
  );
}
