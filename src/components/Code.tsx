import { GameValues } from "@contexts/GameContext";
import { FaCircle } from "react-icons/fa";

export function CodePeg({ value }: { value?: GameValues }) {
  const className = () => {
    if (!value) return "text-gray-600";
    switch (value) {
      case "black":
        return "text-black";
      case "white":
        return "text-white";
      case "blue":
        return "text-blue-600";
      case "green":
        return "text-green-600";
      case "yellow":
        return "text-yellow-600";
      case "red":
        return "text-red-600";
      case "cyan":
        return "text-cyan-600";
      case "fuchsia":
        return "text-fuchsia-600";
    }
  };

  return <FaCircle className={className()} />;
}

export function CodeRow({
  code,
  check,
}: {
  code: GameValues[];
  check: Extract<GameValues, "white" | "black">[];
}) {
  return (
    <div className="grid grid-cols-4 gap-3 place-items-center">
      <div className="col-span-3 w-full py-2 justify-around flex items-center border-2  border-slate-300/15 bg-slate-500/15 rounded-lg text-xs md:text-base fade-in">
        {code.map((c, i) => (
          <CodePeg value={c} key={i} />
        ))}
      </div>
      <div className="col-span-1 w-full py-2 flex justify-around items-center border-2  border-slate-300/15 bg-slate-500/15 rounded-lg text-xs md:text-base fade-in">
        {check.map((c, i) => (
          <CodePeg value={c} key={i} />
        ))}
      </div>
    </div>
  );
}
