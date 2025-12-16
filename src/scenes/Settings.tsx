import { createCode, getCodeSize } from "@contexts/GameContext";
import useGame from "@hooks/useGame";
import { ChangeEvent, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";

export function Settings() {
  const [game, setGame] = useGame();

  useEffect(() => {
    setGame((prev) => ({
      ...prev,
      code: createCode(getCodeSize(game.difficulty), game.colors),
      solved: false,
      current: [],
      currentGuess: 0,
      checks: [],
      previous: [],
    }));
  }, [game.difficulty, game.guesses, game.colors]);

  if (game.scene != "settings") return <></>;

  const handleSelection = (e: ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name;
    if (name != "difficulty" && name != "guesses" && name != "colors") return;

    setGame((prev) => ({
      ...prev,
      [name]: name == "difficulty" ? e.target.value : parseInt(e.target.value),
    }));
  };

  const handleBack = () => {
    setGame((prev) => ({
      ...prev,
      scene: "home",
    }));
  };

  return (
    <div className="w-full h-full flex flex-col gap-6 justify-center items-center fade-in">
      <div className="flex flex-col gap-2 justify-center items-center">
        <img src="/logo.svg" width={100} className="mb-4" />
        <div className="grid grid-cols-10 place-items-center gap-1 text-2xl text-slate-200">
          <div>M</div>
          <div>A</div>
          <div>S</div>
          <div>T</div>
          <div>E</div>
          <div>R</div>
          <div>M</div>
          <div>I</div>
          <div>N</div>
          <div>D</div>
        </div>
      </div>
      <div className="text-gray-400/75 text-xl tracking-wider">How to Play</div>
      <ul className="max-w-100 px-4 list-decimal flex flex-col gap-4 text-sm md:text-base">
        <li>
          <span className="font-bold">Guess</span>: Choose from the colors to
          make a guess.
        </li>
        <li>
          <span className="font-bold">Feedback</span>: Correct color in the
          correct position (black), correct color but in wrong position (white).
        </li>
        <li>
          <span className="font-bold">Repeat</span>: Makes guesses, using the
          feedback to deduce the code.
        </li>
      </ul>
      <div className="grid grid-cols-2 gap-4 w-full max-w-100">
        <div className="col-span-2 text-sm text-center tracking-wider py-4 text-gray-400/90">
          Correct Choice Odds:{" "}
          {(
            (1 / Math.pow(game.colors, getCodeSize(game.difficulty))) *
            100
          ).toFixed(9)}
          %
        </div>
        <div className="col-span-1 flex flex-col gap-1 w-full text-sm md:text-base">
          <label htmlFor="difficulty">&bull; Difficulty</label>
          <select
            name="difficulty"
            id="difficulty"
            className="outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500 p-2 rounded-md bg-slate-700 text-center"
            onChange={handleSelection}
            defaultValue={game.difficulty}
          >
            <option value="easy">Easy</option>
            <option value="normal">Normal</option>
            <option value="hard">Hard</option>
            <option value="challenging">Challenging</option>
            <option value="extreme">Extreme</option>
            <option value="impossible">Impossible</option>
          </select>
        </div>
        <div className="col-span-1 flex flex-col gap-1 w-full text-sm md:text-base">
          <label htmlFor="colors">&bull; Colors</label>
          <select
            name="colors"
            id="colors"
            className="outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500 p-2 rounded-md bg-slate-700 text-center"
            onChange={handleSelection}
            defaultValue={game.colors}
          >
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
        </div>
        <div className="col-span-2 flex flex-col gap-1 w-full text-sm md:text-base">
          <label htmlFor="guesses">&bull; Guesses</label>
          <select
            name="guesses"
            id="guesses"
            className="outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500 p-2 rounded-md bg-slate-700 text-center"
            onChange={handleSelection}
            defaultValue={game.guesses}
          >
            <option value="5">5 Guesses</option>
            <option value="10">10 Guesses</option>
            <option value="20">20 Guesses</option>
            <option value="30">30 Guesses</option>
            <option value="40">40 Guesses</option>
            <option value="50">50 Guesses</option>
            <option value="100">100 Guesses</option>
          </select>
        </div>
      </div>
      <button
        className="w-full rounded-md flex gap-2 items-center justify-center bg-gray-600/10 px-2 py-3 tracking-wider font-bold text-white ring ring-gray-600/40 hover:bg-gray-600/25 hover:ring-gray-600/50 max-w-100"
        onClick={handleBack}
      >
        <FaArrowLeft size={15} /> Back
      </button>
    </div>
  );
}
