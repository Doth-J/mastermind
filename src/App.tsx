import { Home } from "@scenes/Home";
import { Play } from "@scenes/Play";
import { Settings } from "@scenes/Settings";

export default function App() {
  return (
    <div className="w-full h-dvh p-4 flex justify-center">
      <Home />
      <Play />
      <Settings />
    </div>
  );
}
