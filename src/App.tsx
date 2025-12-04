// src/App.tsx
import type { FC } from "react";
import { useState } from "react";
import Home from "./pages/Home";
import AuraBackground, {
  type AuraPattern,
} from "./components/AuraBackground";

const App: FC = () => {
  const [pattern, setPattern] = useState<AuraPattern>("flow");

  return (
    <div className="app aura-app">
      <AuraBackground pattern={pattern} />
      <Home pattern={pattern} onPatternChange={setPattern} />
    </div>
  );
};

export default App;
