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
      <p>Select some glow colors here.</p>
      <GlowsDisplay />
    </div>
  );
}

export default App;
