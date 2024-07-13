import React, { useState, useEffect } from 'react';
import Counter from "./Counter";
import DecimalCounter from "./DecimalCounter";
import ToggleSwitch from "./ToggleSwitch";
import ColorSchemePicker from "./ColorSchemePicker";
import '../styles/ui.css';

function App() {
  const [rings, setRings] = useState(7);
  const [seed, setSeed] = useState(6);
  const [gridSize, setGridSize] = useState(15);
  const [dotScale, setDotScale] = useState(1.0);
  const [padding, setPadding] = useState(64);
  const [livePreview, setLivePreview] = useState(true);
  const [colors, setColors] = useState({ dotColor: { r: 0, g: 0, b: 0 }, frameColor: { r: 1, g: 1, b: 1 } });

  const isValidInput = () => {
    return (
      rings >= 1 && rings <= 100 &&
      seed >= 1 && seed <= 100 &&
      gridSize >= 1 && gridSize <= 100 &&
      dotScale >= 0.1 && dotScale <= 3 &&
      padding >= 0 && padding <= 200
    );
  };

  const handleGenerate = () => {
    if (isValidInput()) {
      const config = {
        rings: Number(rings),
        seed: Number(seed),
        gridSize: Number(gridSize * 2),
        dotScale: Number(dotScale),
        padding: Number(padding),
        dotColor: colors.dotColor,
        frameColor: colors.frameColor,
      };
      parent.postMessage({ pluginMessage: { type: 'applyConfig', config } }, '*');
    } else {
      console.error("Invalid input values");
    }
  };

  useEffect(() => {
    if (livePreview && isValidInput()) {
      handleGenerate();
    }
  }, [rings, seed, gridSize, dotScale, padding, colors]);

  return (
    <div className="App">
      <Counter label="Total rings" count={rings} onCountChange={setRings} min={1} max={100} onEnterPress={handleGenerate} />
      <Counter label="First ring size" count={seed} onCountChange={setSeed} min={1} max={100} onEnterPress={handleGenerate} />
      <Counter label="Dot size" count={gridSize} onCountChange={setGridSize} min={1} max={100} onEnterPress={handleGenerate} />
      <DecimalCounter label="Dot scale" count={dotScale} onCountChange={setDotScale} min={0.1} max={3} step={0.1} onEnterPress={handleGenerate} />
      <ColorSchemePicker onSchemeChange={setColors} />
      <ToggleSwitch label="Live Preview" isChecked={livePreview} onChange={setLivePreview} />

      <div className="cta-button" onClick={handleGenerate}>
        Generate
      </div>
    </div>
  );
}

export default App;