import React, { useState } from 'react';
import Counter from "./Counter";
import DecimalCounter from "./DecimalCounter";
import '../styles/ui.css';

function App() {
  const [rings, setRings] = useState(10);
  const [seed, setSeed] = useState(6);
  const [gridSize, setGridSize] = useState(15);
  const [dotScale, setDotScale] = useState(1.0);
  const [padding, setPadding] = useState(64);
  const [livePreview, setLivePreview] = useState(true);

  const handleGenerate = () => {
    // Run your plugin or perform the desired action here
    const config = {
      rings: Number(rings),
      seed: Number(seed),
      gridSize: Number(gridSize * 2),
      dotScale: Number(dotScale),
      padding: Number(padding),
    };
    parent.postMessage({ pluginMessage: { type: 'applyConfig', config } }, '*');
  };

  return (
    <div className="App">
      <Counter label="Total rings" count={rings} onCountChange={setRings} min={1} max={100} onEnterPress={handleGenerate}/>
      <Counter label="First ring size" count={seed} onCountChange={setSeed} min={1} max={100} onEnterPress={handleGenerate}/>
      <Counter label="Dot size" count={gridSize} onCountChange={setGridSize} min={1} max={100} onEnterPress={handleGenerate}/>
      <DecimalCounter label="Dot scale" count={dotScale} onCountChange={setDotScale} min={0.1} max={3} step={0.1} onEnterPress={handleGenerate} />
      {/* <label>
        <input
          type="checkbox"
          checked={livePreview}
          onChange={(e) => setLivePreview(e.target.checked)}
        />
        Live Preview
      </label> */}

      <div className="cta-button" onClick={handleGenerate}>
        Generate
      </div>
    </div>
  );
}

export default App;