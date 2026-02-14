import type { Direction, GameState, GameSnapshot, Position, TileType } from "./types";

const TILE_CHARS: Record<string, TileType> = {
  "#": "wall",
  " ": "floor",
  ".": "target",
  "$": "box",
  "*": "boxOnTarget",
  "@": "player",
  "+": "playerOnTarget",
};

const DIR_DELTA: Record<Direction, [number, number]> = {
  UP: [0, -1],
  DOWN: [0, 1],
  LEFT: [-1, 0],
  RIGHT: [1, 0],
};

function parseLevel(levelData: string): { grid: TileType[][]; player: Position; boxes: Position[]; targets: Position[] } {
  const lines = levelData.trim().split("\n").filter(Boolean);
  const grid: TileType[][] = [];
  let player: Position = { x: 0, y: 0 };
  const boxes: Position[] = [];
  const targets: Position[] = [];

  for (let y = 0; y < lines.length; y++) {
    const row: TileType[] = [];
    const line = lines[y];
    for (let x = 0; x < line.length; x++) {
      const char = line[x];
      const tile = TILE_CHARS[char] ?? "floor";
      row.push(tile);
      if (tile === "player" || tile === "playerOnTarget") {
        player = { x, y };
        row[row.length - 1] = tile === "player" ? "floor" : "target";
        if (tile === "playerOnTarget") targets.push({ x, y });
      } else if (tile === "box" || tile === "boxOnTarget") {
        boxes.push({ x, y });
        row[row.length - 1] = tile === "box" ? "floor" : "target";
        if (tile === "boxOnTarget") targets.push({ x, y });
      } else if (tile === "target") {
        targets.push({ x, y });
      }
    }
    grid.push(row);
  }

  return { grid, player, boxes, targets };
}

function isWall(grid: TileType[][], x: number, y: number): boolean {
  if (y < 0 || y >= grid.length || x < 0 || x >= grid[0].length) return true;
  return grid[y][x] === "wall";
}

function buildDisplayGrid(state: GameState): TileType[][] {
  const { grid, player, boxes } = state;
  const display: TileType[][] = grid.map((row) => [...row]);
  for (let y = 0; y < display.length; y++) {
    for (let x = 0; x < display[y].length; x++) {
      const base = grid[y]?.[x] ?? "floor";
      const isTarget = base === "target";
      if (player.x === x && player.y === y) {
        display[y][x] = isTarget ? "playerOnTarget" : "player";
      } else {
        const box = boxes.find((b) => b.x === x && b.y === y);
        if (box) display[y][x] = isTarget ? "boxOnTarget" : "box";
        else if (base === "target") display[y][x] = "target";
        else if (base !== "wall") display[y][x] = "floor";
      }
    }
  }
  return display;
}

export function createInitialState(levelData: string): GameState {
  const { grid, player, boxes, targets } = parseLevel(levelData);
  const display = buildDisplayGrid({ grid, player, boxes, targets, moves: 0, history: [] });
  return {
    grid: display,
    player: { ...player },
    boxes: boxes.map((b) => ({ ...b })),
    targets: targets.map((t) => ({ ...t })),
    moves: 0,
    history: [],
  };
}

export function detectDeadlock(state: GameState): boolean {
  const { grid, boxes, targets } = state;
  for (const box of boxes) {
    const onTarget = targets.some((t) => t.x === box.x && t.y === box.y);
    if (onTarget) continue;
    const hasWallAbove = isWall(grid, box.x, box.y - 1);
    const hasWallBelow = isWall(grid, box.x, box.y + 1);
    const hasWallLeft = isWall(grid, box.x - 1, box.y);
    const hasWallRight = isWall(grid, box.x + 1, box.y);
    if (
      (hasWallAbove && hasWallLeft) ||
      (hasWallAbove && hasWallRight) ||
      (hasWallBelow && hasWallLeft) ||
      (hasWallBelow && hasWallRight)
    ) {
      return true;
    }
  }
  return false;
}

export function checkWin(state: GameState): boolean {
  return state.targets.every((t) =>
    state.boxes.some((b) => b.x === t.x && b.y === t.y)
  );
}

function saveSnapshot(state: GameState): GameSnapshot {
  return {
    grid: state.grid.map((row) => row.map((c) => c)),
    player: { ...state.player },
    boxes: state.boxes.map((b) => ({ ...b })),
  };
}

export function movePlayer(state: GameState, direction: Direction): GameState | null {
  const [dx, dy] = DIR_DELTA[direction];
  const nx = state.player.x + dx;
  const ny = state.player.y + dy;

  if (isWall(state.grid, nx, ny)) return null;

  const boxIdx = state.boxes.findIndex((b) => b.x === nx && b.y === ny);
  if (boxIdx >= 0) {
    const bnx = nx + dx;
    const bny = ny + dy;
    if (isWall(state.grid, bnx, bny)) return null;
    if (state.boxes.some((b) => b.x === bnx && b.y === bny)) return null;
    const newBoxes = state.boxes.map((b, i) =>
      i === boxIdx ? { x: bnx, y: bny } : { ...b }
    );
    const newState: GameState = {
      ...state,
      player: { x: nx, y: ny },
      boxes: newBoxes,
      moves: state.moves + 1,
      history: [...state.history, saveSnapshot(state)],
    };
    if (detectDeadlock(newState)) return newState;
    return newState;
  }

  return {
    ...state,
    player: { x: nx, y: ny },
    moves: state.moves + 1,
    history: [...state.history, saveSnapshot(state)],
  };
}

export function undoMove(state: GameState): GameState | null {
  const last = state.history[state.history.length - 1];
  if (!last) return null;
  const { grid, player, boxes } = last;
  return {
    ...state,
    grid: grid.map((row) => row.map((c) => c)),
    player: { ...player },
    boxes: boxes.map((b) => ({ ...b })),
    moves: Math.max(0, state.moves - 1),
    history: state.history.slice(0, -1),
  };
}

export function resetLevel(levelData: string): GameState {
  return createInitialState(levelData);
}

export { buildDisplayGrid, parseLevel };
