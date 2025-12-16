import { createContext, Dispatch, SetStateAction } from "react";

export const GameValues = [
  "red",
  "blue",
  "green",
  "yellow",
  "white",
  "black",
  "cyan",
  "fuchsia",
] as const;
export type GameValues = (typeof GameValues)[number];
export type GameScene = "home" | "play" | "settings";
export type GameDifficulty =
  | "easy"
  | "normal"
  | "hard"
  | "challenging"
  | "extreme"
  | "impossible";

export type GameState = {
  scene: GameScene;
  solved: boolean;
  code: GameValues[];
  current: GameValues[];
  checks: Extract<GameValues, "white" | "black">[][];
  previous: GameValues[][];
  guesses: number;
  currentGuess: number;
  colors: number;
  difficulty: GameDifficulty;
};

export function getCodeSize(difficulty: GameDifficulty) {
  switch (difficulty) {
    case "easy":
      return 3;
    case "normal":
      return 4;
    case "hard":
      return 5;
    case "challenging":
      return 6;
    case "extreme":
      return 7;
    case "impossible":
      return 8;
  }
}
export function createCode(length: number, colors: number) {
  return Array.from({ length }, () => GameValues[(colors * Math.random()) | 0]);
}

export const GameContext = createContext<
  [GameState, Dispatch<SetStateAction<GameState>>] | undefined
>(undefined);
