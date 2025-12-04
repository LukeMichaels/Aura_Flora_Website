// src/App.tsx
import type { FC } from "react";
import Home from "./pages/Home";
import AuraBackground from "./components/AuraBackground";

const App: FC = () => {
  return (
    <div className="app aura-app">
      <AuraBackground />
      <Home />
    </div>
  );
};

export default App;
