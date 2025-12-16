import { GameContext } from "@contexts/GameContext";
import { useContext } from "react";

export default function useGame() {
  const game = useContext(GameContext);
  if (!game) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return game;
}
