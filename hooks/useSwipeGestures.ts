"use client";

import { useCallback, useState } from "react";
import type { Direction } from "@/game/types";

const MIN_SWIPE_DISTANCE = 50;

export function useSwipeGestures(onSwipe: (direction: Direction) => void) {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (touch) setTouchStart({ x: touch.clientX, y: touch.clientY });
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStart) return;
      const touch = e.changedTouches[0];
      if (!touch) {
        setTouchStart(null);
        return;
      }
      const deltaX = touch.clientX - touchStart.x;
      const deltaY = touch.clientY - touchStart.y;
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (Math.abs(deltaX) > MIN_SWIPE_DISTANCE) {
          onSwipe(deltaX > 0 ? "RIGHT" : "LEFT");
        }
      } else {
        if (Math.abs(deltaY) > MIN_SWIPE_DISTANCE) {
          onSwipe(deltaY > 0 ? "DOWN" : "UP");
        }
      }
      setTouchStart(null);
    },
    [touchStart, onSwipe]
  );

  return { handleTouchStart, handleTouchEnd };
}
