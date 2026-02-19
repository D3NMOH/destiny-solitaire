import type { Particles } from "@/types";
import { useState, useCallback } from "react";

export function useParticles() {
  const [particles, setParticles] = useState<Particles[]>([]);

  const spawnParticles = useCallback((x: number, y: number, suit: string) => {
    const count = 24;
    const newParticles = Array.from({ length: count }).map(() => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 40 + Math.random() * 60;
      const deg = (angle * 180) / Math.PI + 90;

      const startX = x + (Math.random() - 0.5) * 80;
      const startY = y + (Math.random() - 0.5) * 120;

      return {
        id: Math.random() + Date.now(),
        x: startX,
        y: startY,
        suit,
        tx: Math.cos(angle) * distance,
        ty: Math.sin(angle) * distance,
        rot: deg,
      };
    });
    setParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles((prev) =>
        prev.filter((p) => !newParticles.find((n) => n.id === p.id)),
      );
    }, 800);
  }, []);

  return { particles, spawnParticles };
}
