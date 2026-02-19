import { useState, useEffect, useCallback } from "react";
import type { Card, DragOrigin, GameState } from "../types";
import { canPlaceOnTableau, canPlaceOnFoundation } from "../gameLogic";

export function useDragAndDrop(
  gameState: GameState,
  onDropOnTableau: (
    tableauIndex: number,
    cards: Card[],
    origin: DragOrigin,
  ) => void,
  onDropOnFoundation: (
    foundationIndex: number,
    card: Card,
    origin: DragOrigin,
    x: number,
    y: number,
  ) => void,
) {
  const [draggedCards, setDraggedCards] = useState<Card[]>([]);
  const [dragOrigin, setDragOrigin] = useState<DragOrigin | null>(null);
  const [pointerPosition, setPointerPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [pointerOffset, setPointerOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [startPosition, setStartPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [isReturnAnimation, setIsReturnAnimation] = useState(false);

  const handlePointerDown = (
    e: React.PointerEvent | React.MouseEvent | React.TouchEvent,
    cards: Card[],
    origin: DragOrigin,
  ) => {
    if ("button" in e && e.button !== 0) return;

    const clientX = "touches" in e ? e.touches[0]!.clientX : (e as any).clientX;
    const clientY = "touches" in e ? e.touches[0]!.clientY : (e as any).clientY;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const offsetY = clientY - rect.top;

    if ("pointerId" in e) {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    }

    setDraggedCards(cards);
    setDragOrigin(origin);
    setPointerPosition({ x: clientX, y: clientY });
    setPointerOffset({ x: offsetX, y: offsetY });
    setStartPosition({ x: clientX, y: clientY });
    setIsReturnAnimation(false);
  };

  const handlePointerMove = useCallback(
    (e: PointerEvent | MouseEvent | TouchEvent) => {
      if (draggedCards.length === 0 || isReturnAnimation) return;

      const clientX =
        "touches" in e
          ? (e as TouchEvent).touches[0]!.clientX
          : (e as MouseEvent).clientX;
      const clientY =
        "touches" in e
          ? (e as TouchEvent).touches[0]!.clientY
          : (e as MouseEvent).clientY;

      setPointerPosition({ x: clientX, y: clientY });
    },
    [draggedCards.length, isReturnAnimation],
  );

  const handlePointerUp = useCallback(
    (e: PointerEvent | MouseEvent | TouchEvent) => {
      if (draggedCards.length === 0 || isReturnAnimation) return;

      const clientX =
        "changedTouches" in e
          ? (e as TouchEvent).changedTouches[0]!.clientX
          : (e as MouseEvent).clientX;
      const clientY =
        "changedTouches" in e
          ? (e as TouchEvent).changedTouches[0]!.clientY
          : (e as MouseEvent).clientY;

      const element = document.elementFromPoint(clientX, clientY);
      let dropped = false;

      if (element) {
        const tableauPile = element.closest("[data-tableau-index]");
        const foundationPile = element.closest("[data-foundation-index]");

        if (tableauPile) {
          const index = parseInt(
            tableauPile.getAttribute("data-tableau-index")!,
          );
          const targetPile = gameState.tableau[index]!;
          const firstCard = draggedCards[0]!;
          const targetCard =
            targetPile.length > 0
              ? (targetPile[targetPile.length - 1] ?? null)
              : null;

          if (canPlaceOnTableau(firstCard, targetCard)) {
            if (dragOrigin) {
              onDropOnTableau(index, draggedCards, dragOrigin);
              dropped = true;
            }
          }
        } else if (foundationPile) {
          const index = parseInt(
            foundationPile.getAttribute("data-foundation-index")!,
          );
          const card = draggedCards[0]!;
          const foundation = gameState.foundations[index]!;

          if (
            draggedCards.length === 1 &&
            canPlaceOnFoundation(card, foundation)
          ) {
            const rect = foundationPile.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            if (dragOrigin) {
              onDropOnFoundation(index, card, dragOrigin, centerX, centerY);
              dropped = true;
            }
          }
        }
      }

      if (!dropped) {
        setIsReturnAnimation(true);
        if (startPosition) {
          setPointerPosition(startPosition);
        }
        setTimeout(() => {
          setDraggedCards([]);
          setDragOrigin(null);
          setPointerPosition(null);
          setStartPosition(null);
          setIsReturnAnimation(false);
        }, 300);
      } else {
        setDraggedCards([]);
        setDragOrigin(null);
        setPointerPosition(null);
        setStartPosition(null);
      }
    },
    [
      draggedCards,
      isReturnAnimation,
      startPosition,
      gameState,
      dragOrigin,
      onDropOnTableau,
      onDropOnFoundation,
    ],
  );

  useEffect(() => {
    if (draggedCards.length > 0) {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
    }
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [draggedCards.length, handlePointerMove, handlePointerUp]);

  return {
    draggedCards,
    dragOrigin,
    pointerPosition,
    pointerOffset,
    isReturnAnimation,
    handlePointerDown,
  };
}
