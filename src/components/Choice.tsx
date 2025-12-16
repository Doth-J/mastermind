import { GameValues } from "@contexts/GameContext";
import { FaCircle } from "react-icons/fa";

export function Choice({
  value,
  disabled,
  handleClick,
}: {
  disabled: boolean;
  value: GameValues;
  handleClick: (value: GameValues) => void;
}) {
  const className = () => {
    switch (value) {
      case "black":
        return `rounded-lg flex gap-2 items-center text-xs w-full bg-white/5 p-2 text-base font-bold text-black ring ring-white/5 hover:bg-black/20 hover:ring-black/30 flex justify-center disabled:bg-gray-600/10 disabled:ring-gray-600/20 disabled:text-gray-500`;
      case "white":
        return `rounded-lg flex gap-2 items-center text-xs w-full bg-white/10 p-2 text-base font-bold text-white ring ring-white/10 hover:bg-white/20 hover:ring-white/30 flex justify-center disabled:bg-gray-600/10 disabled:ring-gray-600/20 disabled:text-gray-500`;
      case "red":
        return `rounded-lg flex gap-2 items-center text-xs w-full bg-red-400/10 p-2 text-base font-bold text-red-400 ring ring-red-400/10 hover:bg-red-400/20 hover:ring-red-400/30 flex justify-center disabled:bg-gray-600/10 disabled:ring-gray-600/20 disabled:text-gray-500`;
      case "blue":
        return `rounded-lg flex gap-2 items-center text-xs w-full bg-blue-400/10 p-2 text-base font-bold text-blue-400 ring ring-blue-400/10 hover:bg-blue-400/20 hover:ring-blue-400/30 flex justify-center disabled:bg-gray-600/10 disabled:ring-gray-600/20 disabled:text-gray-500`;
      case "yellow":
        return `rounded-lg flex gap-2 items-center text-xs w-full bg-yellow-400/10 p-2 text-base font-bold text-yellow-400 ring ring-yellow-400/10 hover:bg-yellow-400/20 hover:ring-yellow-400/30 flex justify-center disabled:bg-gray-600/10 disabled:ring-gray-600/20 disabled:text-gray-500`;
      case "green":
        return `rounded-lg flex gap-2 items-center text-xs w-full bg-green-400/10 p-2 text-base font-bold text-green-400 ring ring-green-400/10 hover:bg-green-400/20 hover:ring-green-400/30 flex justify-center disabled:bg-gray-600/10 disabled:ring-gray-600/20 disabled:text-gray-500`;
      case "cyan":
        return `rounded-lg flex gap-2 items-center text-xs w-full bg-cyan-400/10 p-2 text-base font-bold text-cyan-400 ring ring-cyan-400/10 hover:bg-cyan-400/20 hover:ring-cyan-400/30 flex justify-center disabled:bg-gray-600/10 disabled:ring-gray-600/20 disabled:text-gray-500`;
      case "fuchsia":
        return `rounded-lg flex gap-2 items-center text-xs w-full bg-fuchsia-400/10 p-2 text-base font-bold text-fuchsia-400 ring ring-fuchsia-400/10 hover:bg-fuchsia-400/20 hover:ring-fuchsia-400/30 flex justify-center disabled:bg-gray-600/10 disabled:ring-gray-600/20 disabled:text-gray-500`;
    }
  };
  const capitalizeFirst = (value: string) =>
    value[0].toUpperCase() + value.substring(1);
  return (
    <button
      disabled={disabled}
      className={className()}
      onClick={() => handleClick(value)}
    >
      <span className="hidden md:block">{capitalizeFirst(value)}</span>
      <FaCircle size={20} />
    </button>
  );
}
export default function Choices({
  colors,
  disabled,
  handleChoice,
}: {
  disabled: boolean;
  colors: number;
  handleChoice: (value: GameValues) => void;
}) {
  return (
    <div
      className={`grid ${
        colors <= 6 ? "grid-cols-3" : "grid-cols-4"
      } gap-3 place-items-center py-1`}
    >
      {GameValues.slice(0, colors).map((v, i) => (
        <Choice
          disabled={disabled}
          key={i}
          value={v}
          handleClick={handleChoice}
        />
      ))}
    </div>
  );
}
