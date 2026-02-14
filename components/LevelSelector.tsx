"use client";

import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "@/context/GameProvider";
import { LEVELS } from "@/game/levels";

function LevelSelectorInner() {
  const { levelId, onSelectLevel, showLevelSelect, setShowLevelSelect } = useGame();

  if (!showLevelSelect) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowLevelSelect(false)}
      >
        <motion.div
          className="bg-cyber-bg-secondary border-2 border-cyber-cyan/40 rounded-2xl p-6 max-w-sm w-full mx-4 max-h-[80vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-cyber-text text-xl font-bold mb-4">Select Level</h2>
          <div className="grid grid-cols-5 gap-2">
            {LEVELS.map((l) => (
              <motion.button
                key={l.id}
                type="button"
                onClick={() => onSelectLevel(l.id)}
                className={`min-h-touch min-w-[44px] rounded-lg font-bold border-2 transition-colors ${
                  levelId === l.id
                    ? "bg-cyber-cyan text-cyber-bg border-cyber-cyan"
                    : "bg-cyber-bg border-cyber-cyan/40 text-cyber-text hover:border-cyber-cyan"
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {l.id}
              </motion.button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setShowLevelSelect(false)}
            className="mt-4 w-full py-3 rounded-lg bg-cyber-bg border border-cyber-cyan/40 text-cyber-text hover:border-cyber-cyan"
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export const LevelSelector = memo(LevelSelectorInner);
