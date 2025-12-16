import Choices from "@components/Choice";
import { CodeRow, CodePeg } from "@components/Code";
import { createCode, GameValues, getCodeSize } from "@contexts/GameContext";
import useGame from "@hooks/useGame";
import { useRef } from "react";
import { FaArrowLeft, FaCheck } from "react-icons/fa";

export function Play() {
  const previousRef = useRef<HTMLDivElement | null>(null);
  const [game, setGame] = useGame();

  if (game.scene != "play") return <></>;

  const handleBack = () => {
    setGame((prev) => ({
      ...prev,
      scene: "home",
    }));
  };

  const handleChoice = (value: GameValues) => {
    if (game.current.length == game.code.length) return;
    setGame((prev) => ({ ...prev, current: [...prev.current, value] }));
  };

  const handleReset = () => {
    setGame((prev) => ({
      ...prev,
      code: createCode(getCodeSize(game.difficulty), game.colors),
      solved: false,
      current: [],
      currentGuess: 0,
      checks: [],
      previous: [],
    }));
  };

  const handleClear = () => {
    setGame((prev) => ({
      ...prev,
      current: [],
    }));
  };

  const handleGuess = () => {
    const guess = [...game.current];
    const code = [...game.code];

    if (guess.length !== code.length) return;

    let black = 0;
    let white = 0;

    // Track used positions
    const usedGuess = Array(guess.length).fill(false);
    const usedCode = Array(code.length).fill(false);

    // Phase 1: exact matches (black pegs)
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === code[i]) {
        black++;
        usedGuess[i] = true;
        usedCode[i] = true;
      }
    }

    // Phase 2: color-only matches (white pegs)
    for (let i = 0; i < guess.length; i++) {
      if (usedGuess[i]) continue;

      for (let j = 0; j < code.length; j++) {
        if (usedCode[j]) continue;

        if (guess[i] === code[j]) {
          white++;
          usedGuess[i] = true;
          usedCode[j] = true;
          break;
        }
      }
    }

    const check: Extract<GameValues, "white" | "black">[] = [
      ...Array(black).fill("black"),
      ...Array(white).fill("white"),
    ];

    if (previousRef.current) {
      previousRef.current.scrollIntoView({ behavior: "smooth" });
    }

    setGame((prev) => ({
      ...prev,
      currentGuess: prev.currentGuess + 1,
      solved: black === code.length,
      previous: [...prev.previous, guess],
      current: [],
      checks: [...prev.checks, check],
    }));
  };

  function CurrentChoice() {
    if (game.solved)
      return (
        <button
          className="w-full flex justify-around border-2 border-slate-300/15 bg-slate-500/15 rounded-lg items-center p-3 fade-in"
          onClick={handleReset}
        >
          <div className="tracking-wider text-xl text-green-400/50">
            You won!
          </div>
        </button>
      );
    else if (game.guesses == game.currentGuess)
      return (
        <button
          className="w-full flex justify-around border-2 border-slate-300/15 bg-slate-500/15 rounded-lg items-center p-3 fade-in"
          onClick={handleReset}
        >
          <div className="tracking-wider text-xl text-red-500/75">
            You lost!
          </div>
        </button>
      );
    else
      return (
        <>
          <button
            className="w-full flex justify-around border-2 bg-rose-600/15 border-rose-400/15 disabled:border-slate-300/15 disabled:bg-slate-500/15 rounded-lg items-center p-4"
            onClick={handleClear}
            disabled={game.current.length == 0}
          >
            {game.code.map((_, i) => (
              <CodePeg value={game.current[i]} key={i} />
            ))}
          </button>
          <Choices
            disabled={game.current.length == game.code.length}
            colors={game.colors}
            handleChoice={handleChoice}
          />
          <div className="w-full flex items-center gap-4">
            <button
              className="w-full rounded-md flex gap-2 items-center justify-center bg-emerald-600/25 px-2 py-3 text-sm tracking-wider font-bold text-white ring ring-emerald-600/10 hover:bg-emerald-600/30 hover:ring-emerald-600/30 disabled:bg-gray-600/10 disabled:ring-gray-500/30"
              onClick={handleGuess}
              disabled={game.current.length != game.code.length}
            >
              <FaCheck size={15} /> Check
            </button>
          </div>
        </>
      );
  }

  return (
    <div className="w-full h-full flex flex-col gap-2 max-w-225 pb-3 swing-in-top">
      <div className="flex justify-between text-xs md:text-base bg-slate-900/40 ring ring-slate-700/75 rounded-lg py-2 px-2">
        <div className="flex items-center gap-3 justify-center">
          <button
            className="w-10 rounded-full flex justify-center bg-gray-600/10 p-2 tracking-wider font-bold text-white ring ring-gray-600/40 hover:bg-gray-600/25 hover:ring-gray-600/50 max-w-100"
            onClick={handleBack}
          >
            <FaArrowLeft size={15} />
          </button>

          <div className="flex items-center gap-1">
            <span className="text-gray-300/50">Difficulty: </span>
            {game.difficulty[0].toUpperCase() + game.difficulty.substring(1)}
          </div>
        </div>
        <div className="flex items-center gap-1 pr-1">
          <span className="text-gray-300/50">Guesses:</span>
          {game.guesses - game.currentGuess}
        </div>
      </div>
      <button
        className="w-full flex justify-around border-2 bg-amber-600/10 border-amber-400/10  disabled:border-slate-300/15 disabled:bg-slate-500/15 rounded-lg items-center p-4"
        onClick={handleReset}
        disabled={game.current.length > 0 || game.previous.length == 0}
      >
        {game.code.map((_, i) => (
          <CodePeg key={i} value={game.solved ? _ : undefined} />
        ))}
      </button>
      <div
        className="grow transition-all rounded-lg bg-slate-900/40 ring ring-slate-700/75 p-3 gap-3 flex flex-col overflow-auto"
        ref={previousRef}
      >
        {game.previous.map((p, i) => (
          <CodeRow code={p} check={game.checks[i]} key={i} />
        ))}
      </div>
      <CurrentChoice />
    </div>
  );
}
