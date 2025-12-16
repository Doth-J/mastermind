import { ReactNode, useState } from "react";
import { createCode, GameContext, GameState } from "@contexts/GameContext";

export default function GameProvider({ children }: { children: ReactNode }) {
  const [game, setGame] = useState<GameState>({
    scene: "home",
    code: createCode(4, 6),
    solved: false,
    current: [],
    checks: [],
    previous: [],
    colors: 6,
    guesses: 10,
    currentGuess: 0,
    difficulty: "normal",
  });

  return (
    <GameContext.Provider value={[game, setGame]}>
      {children}
    </GameContext.Provider>
  );
}
