import React, { useState } from 'react';
import Counter from "./Counter";
import '../styles/ui.css';

function App() {
  const [rings, setRings] = useState(30);
  const [seed, setSeed] = useState(6);
  const [gridSize, setGridSize] = useState(30);
  const [dotScale, setDotScale] = useState(1);
  const [padding, setPadding] = useState(100);

  const [count, setCount] = useState(9);

  const handleCountChange = (newCount) => {
    setCount(newCount);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const config = {
      rings: Number(rings),
      seed: Number(seed),
      gridSize: Number(gridSize),
      dotScale: Number(dotScale),
      padding: Number(padding),
    };
    parent.postMessage({ pluginMessage: { type: 'applyConfig', config } }, '*');
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
      <Counter label="Rings" count={rings} onCountChange={setRings} min={1} max={100} />
      <Counter label="Seed" count={seed} onCountChange={setSeed} min={1} max={100} />
      <Counter label="Grid Size" count={gridSize} onCountChange={setGridSize} min={1} max={100} />
      <Counter label="Dot Scale" count={dotScale} onCountChange={setDotScale} min={0.1} max={10} />
      <Counter label="Padding" count={padding} onCountChange={setPadding} min={0} max={200} />

        <button type="submit">Apply</button>
      </form>
    </div>
  );
}

export default App;