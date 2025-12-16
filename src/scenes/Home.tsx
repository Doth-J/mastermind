import { GameScene } from "@contexts/GameContext";
import useGame from "@hooks/useGame";
import { FaPlay } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";

export function Home() {
  const [game, setGame] = useGame();

  if (game.scene != "home") return <></>;

  const handleNavigation = (scene: GameScene) => {
    setGame((prev) => ({
      ...prev,
      scene,
    }));
  };
  return (
    <div className="w-full h-full flex flex-col gap-4 justify-center items-center fade-in">
      <div className="flex flex-col gap-2 justify-center items-center">
        <img src="./logo.svg" width={100} className="mb-4" />
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
        <div className="w-full flex justify-center text-gray-400/75 text-lg">
          Crack the Code
        </div>
      </div>
      <button
        className="w-full rounded-md flex gap-2 items-center justify-center bg-gray-600/10 px-2 py-3 tracking-wider font-bold text-white ring ring-gray-600/40 hover:bg-gray-600/25 hover:ring-gray-600/50 max-w-75"
        onClick={() => handleNavigation("play")}
      >
        Play
        <FaPlay size={15} />
      </button>
      <button
        className="w-full rounded-md flex gap-2 items-center justify-center bg-gray-600/10 px-2 py-3 tracking-wider font-bold text-white ring ring-gray-600/40 hover:bg-gray-600/25 hover:ring-gray-600/50 max-w-75"
        onClick={() => handleNavigation("settings")}
      >
        Settings <FaGear size={15} />
      </button>
      <a
        href="https://github.com/Doth-J"
        className="w-full flex items-center gap-2 md:gap-4 justify-center text-decoration-none text-slate-600 border-t-2 border-slate-700/50 pt-3 max-w-75 text-sm mt-5"
        target="_blank"
      >
        <span>Developed by Doth-J</span>
        <img
          src="https://avatars.githubusercontent.com/u/70350121?v=4"
          alt="DothIcon"
          className="grayscale"
          width={20}
        />
      </a>
    </div>
  );
}
