"use client";

import React, { createContext, useCallback, useContext, useReducer } from "react";
import type { Direction, GameState } from "@/game/types";
import { LEVELS } from "@/game/levels";
import {
  createInitialState,
  movePlayer,
  undoMove,
  checkWin,
  detectDeadlock,
  resetLevel,
} from "@/game/engine";

type GameAction =
  | { type: "MOVE"; direction: Direction }
  | { type: "UNDO" }
  | { type: "RESTART" }
  | { type: "SELECT_LEVEL"; levelId: number }
  | { type: "SET_LEVEL_SELECT"; show: boolean };

interface GameContextValue {
  state: GameState;
  levelId: number;
  levelData: string;
  won: boolean;
  deadlock: boolean;
  showLevelSelect: boolean;
  bestMoves: Record<number, number>;
  onMove: (d: Direction) => void;
  onUndo: () => void;
  onRestart: () => void;
  onSelectLevel: (id: number) => void;
  setShowLevelSelect: (show: boolean) => void;
}

const defaultLevel = LEVELS[0]!;
const initialState = createInitialState(defaultLevel.data);

function gameReducer(
  state: { game: GameState; levelId: number; levelData: string; showLevelSelect: boolean; bestMoves: Record<number, number> },
  action: GameAction
): typeof state {
  switch (action.type) {
    case "MOVE": {
      const next = movePlayer(state.game, action.direction);
      if (!next) return state;
      return { ...state, game: next };
    }
    case "UNDO": {
      const prev = undoMove(state.game);
      if (!prev) return state;
      return { ...state, game: prev };
    }
    case "RESTART":
      return { ...state, game: resetLevel(state.levelData) };
    case "SELECT_LEVEL": {
      const level = LEVELS.find((l) => l.id === action.levelId) ?? defaultLevel;
      return {
        ...state,
        levelId: level.id,
        levelData: level.data,
        game: createInitialState(level.data),
        showLevelSelect: false,
      };
    }
    case "SET_LEVEL_SELECT":
      return { ...state, showLevelSelect: action.show };
    default:
      return state;
  }
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, {
    game: initialState,
    levelId: defaultLevel.id,
    levelData: defaultLevel.data,
    showLevelSelect: false,
    bestMoves: {},
  });

  const won = checkWin(state.game);
  const deadlock = detectDeadlock(state.game);

  const onMove = useCallback((d: Direction) => dispatch({ type: "MOVE", direction: d }), []);
  const onUndo = useCallback(() => dispatch({ type: "UNDO" }), []);
  const onRestart = useCallback(() => dispatch({ type: "RESTART" }), []);
  const onSelectLevel = useCallback((id: number) => dispatch({ type: "SELECT_LEVEL", levelId: id }), []);
  const setShowLevelSelect = useCallback((show: boolean) => {
    dispatch({ type: "SET_LEVEL_SELECT", show });
  }, []);

  const value: GameContextValue = {
    state: state.game,
    levelId: state.levelId,
    levelData: state.levelData,
    won,
    deadlock,
    showLevelSelect: state.showLevelSelect,
    bestMoves: state.bestMoves,
    onMove,
    onUndo,
    onRestart,
    onSelectLevel,
    setShowLevelSelect,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}
