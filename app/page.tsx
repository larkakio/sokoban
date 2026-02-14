"use client";

import { useEffect } from "react";
import { useKeyboard } from "@/hooks/useKeyboard";
import { motion, AnimatePresence } from "framer-motion";
import { GameBoard } from "@/components/GameBoard";
import { GameControls } from "@/components/GameControls";
import { HUD } from "@/components/HUD";
import { LevelSelector } from "@/components/LevelSelector";
import { ShareButton } from "@/components/ShareButton";
import { useGame } from "@/context/GameProvider";
import { LEVELS } from "@/game/levels";

function vibrate(pattern: number | number[]) {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(pattern);
  }
}

export default function Home() {
  const { won, deadlock, state, levelId, onSelectLevel, onRestart, onMove } = useGame();
  useKeyboard(onMove);

  useEffect(() => {
    if (won) vibrate(200);
  }, [won]);

  useEffect(() => {
    if (deadlock) vibrate([50, 100, 50, 100, 50]);
  }, [deadlock]);

  const nextLevelId = LEVELS.find((l) => l.id > levelId)?.id;
  const isLastLevel = !nextLevelId;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 pb-8 bg-cyber-bg">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-cyber-bg via-cyber-bg-secondary/50 to-cyber-bg pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,245,255,0.08)_0%,_transparent_50%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold text-cyber-cyan tracking-wider">
          SOKOBAN CYBER
        </h1>
        <p className="text-cyber-text/70 text-sm">Swipe to move • Push boxes to targets</p>

        <HUD />

        <div className="flex justify-center overflow-auto">
          <GameBoard />
        </div>

        <GameControls />

        <ShareButton />

        {/* Deadlock modal */}
        <AnimatePresence>
          {deadlock && (
            <motion.div
              className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-cyber-bg-secondary border-2 border-cyber-red/60 rounded-2xl p-6 max-w-sm mx-4 text-center"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
              >
                <p className="text-cyber-red font-bold text-lg mb-2">Deadlock!</p>
                <p className="text-cyber-text/80 text-sm mb-4">
                  Impossible to solve from here. Restart?
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    type="button"
                    onClick={onRestart}
                    className="min-h-touch px-4 py-3 rounded-lg bg-cyber-red/20 border border-cyber-red text-cyber-text"
                  >
                    Restart
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Level complete modal */}
        <AnimatePresence>
          {won && (
            <motion.div
              className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-cyber-bg-secondary border-2 border-cyber-green/60 rounded-2xl p-6 max-w-sm mx-4 text-center"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
              >
                <p className="text-cyber-green font-bold text-xl mb-2">Level Complete!</p>
                <p className="text-cyber-text/80 text-sm mb-2">
                  {state.moves} moves
                </p>
                <div className="flex gap-3 justify-center flex-wrap mt-4">
                  {nextLevelId && (
                    <button
                      type="button"
                      onClick={() => onSelectLevel(nextLevelId)}
                      className="min-h-touch px-4 py-3 rounded-lg bg-cyber-green/20 border border-cyber-green text-cyber-text font-medium"
                    >
                      Next Level
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => onSelectLevel(levelId)}
                    className="min-h-touch px-4 py-3 rounded-lg bg-cyber-bg border border-cyber-cyan/40 text-cyber-text"
                  >
                    {isLastLevel ? "Play Again" : "Replay"}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <LevelSelector />
      </div>
    </main>
  );
}
