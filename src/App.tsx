import React, { useEffect } from "react";
import "./App.css";
import GlowsDisplay from "./glows/GlowsDisplay";

function App() {
  useEffect(() => {
    document.title = "L4D2 Glow Picker";
  }, []);
  return (
    <div className="App">
      <h1>L4D2 Glow Picker</h1>
      <p>
        Upload a cfg file to import glows, or start customizing from the default
        glows.
      </p>
      <GlowsDisplay />
    </div>
  );
}

export default App;
