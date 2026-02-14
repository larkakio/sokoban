"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { useGame } from "@/context/GameProvider";

function GameControlsInner() {
  const { onUndo, onRestart, setShowLevelSelect, state } = useGame();
  const canUndo = state.history.length > 0;

  const btn =
    "min-h-touch min-w-[44px] px-4 py-3 rounded-lg font-medium text-cyber-text bg-cyber-bg-secondary border border-cyber-cyan/40 hover:border-cyber-cyan hover:bg-cyber-cyan/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="flex gap-3 justify-center flex-wrap">
      <motion.button
        type="button"
        onClick={onUndo}
        disabled={!canUndo}
        className={btn}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
      >
        ↩ Undo
      </motion.button>
      <motion.button
        type="button"
        onClick={onRestart}
        className={btn}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
      >
        ↻ Restart
      </motion.button>
      <motion.button
        type="button"
        onClick={() => setShowLevelSelect(true)}
        className={btn}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
      >
        ≡ Levels
      </motion.button>
    </div>
  );
}

export const GameControls = memo(GameControlsInner);
