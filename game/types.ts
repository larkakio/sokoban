export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

export interface Position {
  x: number;
  y: number;
}

export type TileType = "wall" | "floor" | "target" | "box" | "boxOnTarget" | "player" | "playerOnTarget";

export interface GameState {
  grid: TileType[][];
  player: Position;
  boxes: Position[];
  targets: Position[];
  moves: number;
  history: GameSnapshot[];
}

export interface GameSnapshot {
  grid: TileType[][];
  player: Position;
  boxes: Position[];
}

export interface LevelDefinition {
  id: number;
  difficulty: "tutorial" | "easy" | "medium" | "hard" | "expert";
  data: string;
}
