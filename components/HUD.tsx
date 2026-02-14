"use client";

import { memo } from "react";
import { useGame } from "@/context/GameProvider";
import { LEVELS } from "@/game/levels";

function HUDInner() {
  const { state, levelId } = useGame();
  const totalLevels = LEVELS.length;
  const currentLevel = LEVELS.find((l) => l.id === levelId);

  return (
    <div className="flex justify-between items-center gap-4 px-2 py-2">
      <span className="text-cyber-text text-sm font-medium">
        Level {levelId}/{totalLevels}
        {currentLevel && (
          <span className="text-cyber-cyan/80 ml-2 text-xs">
            {currentLevel.difficulty}
          </span>
        )}
      </span>
      <span className="text-cyber-cyan font-bold tabular-nums">
        {state.moves} moves
      </span>
    </div>
  );
}

export const HUD = memo(HUDInner);
