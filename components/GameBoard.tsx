"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import type { TileType } from "@/game/types";
import { useGame } from "@/context/GameProvider";
import { useSwipeGestures } from "@/hooks/useSwipeGestures";

function Tile({ type, x, y }: { type: TileType; x: number; y: number }) {
  const base =
    "w-10 h-10 sm:w-12 sm:h-12 min-w-[40px] min-h-[40px] flex items-center justify-center rounded";

  if (type === "wall") {
    return (
      <motion.div
        className={`${base} bg-cyber-wall border border-cyber-cyan/20`}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2 }}
      />
    );
  }
  if (type === "floor") {
    return (
      <div className={`${base} bg-cyber-bg-secondary/80 border border-cyber-cyan/5`} />
    );
  }
  if (type === "target") {
    return (
      <motion.div
        className={`${base} bg-cyber-bg-secondary/80 border border-cyber-green/30`}
        animate={{ boxShadow: ["0 0 8px rgba(0,255,136,0.2)", "0 0 16px rgba(0,255,136,0.3)", "0 0 8px rgba(0,255,136,0.2)"] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      >
        <div className="w-4 h-4 rounded-full bg-cyber-green/40" />
      </motion.div>
    );
  }
  if (type === "box") {
    return (
      <motion.div
        className={`${base} bg-cyber-purple/90 border-2 border-cyber-cyan/50 shadow-lg shadow-cyber-purple/30`}
        layout
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        whileTap={{ scale: 1.05 }}
      />
    );
  }
  if (type === "boxOnTarget") {
    return (
      <motion.div
        className={`${base} bg-cyber-green/80 border-2 border-cyber-cyan/70 shadow-lg shadow-cyber-green/40`}
        layout
        animate={{ boxShadow: ["0 0 12px rgba(0,255,136,0.4)", "0 0 20px rgba(0,255,136,0.6)", "0 0 12px rgba(0,255,136,0.4)"] }}
        transition={{ layout: { type: "spring", stiffness: 400, damping: 25 }, boxShadow: { duration: 1.5, repeat: Infinity, repeatType: "reverse" } }}
      />
    );
  }
  if (type === "player" || type === "playerOnTarget") {
    return (
      <motion.div
        className={`${base} bg-cyber-cyan/90 border-2 border-white/80 shadow-lg shadow-cyber-cyan/50`}
        layout
        animate={{
          boxShadow: [
            "0 0 12px rgba(0,245,255,0.5)",
            "0 0 24px rgba(0,245,255,0.8)",
            "0 0 12px rgba(0,245,255,0.5)",
          ],
        }}
        transition={{ layout: { type: "spring", stiffness: 400, damping: 25 }, boxShadow: { duration: 1.2, repeat: Infinity, repeatType: "reverse" } }}
      >
        <div className="w-3 h-3 rounded-full bg-white/90" />
      </motion.div>
    );
  }
  return <div className={base} />;
}

const MemoTile = memo(Tile);

function GameBoardInner() {
  const { state, onMove } = useGame();
  const { handleTouchStart, handleTouchEnd } = useSwipeGestures(onMove);

  const grid = state.grid;
  const cols = grid[0]?.length ?? 0;

  return (
    <div
      className="inline-flex flex-col rounded-xl overflow-hidden border-2 border-cyber-cyan/30 bg-cyber-bg-secondary/50 p-1"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {grid.map((row, y) => (
        <div key={y} className="flex">
          {row.map((cell, x) => (
            <MemoTile key={`${x}-${y}`} type={cell} x={x} y={y} />
          ))}
        </div>
      ))}
    </div>
  );
}

export const GameBoard = memo(GameBoardInner);
