import React, { useState } from 'react';
import '../styles/ui.css';

function App() {
  const [rings, setRings] = useState(30);
  const [seed, setSeed] = useState(6);
  const [gridSize, setGridSize] = useState(30);
  const [dotScale, setDotScale] = useState(1);
  const [padding, setPadding] = useState(100);

  const handleSubmit = (event) => {
    event.preventDefault();
    const config = {
      rings,
      seed,
      gridSize,
      dotScale,
      padding
    };
    parent.postMessage({ pluginMessage: { type: 'applyConfig', config } }, '*');
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          Rings:
          <input type="number" value={rings} onChange={(e) => setRings(e.target.value)} />
        </label>
        <label>
          Seed:
          <input type="number" value={seed} onChange={(e) => setSeed(e.target.value)} />
        </label>
        <label>
          Grid Size:
          <input type="number" value={gridSize} onChange={(e) => setGridSize(e.target.value)} />
        </label>
        <label>
          Dot Scale:
          <input type="number" value={dotScale} onChange={(e) => setDotScale(e.target.value)} />
        </label>
        <label>
          Padding:
          <input type="number" value={padding} onChange={(e) => setPadding(e.target.value)} />
        </label>
        <button type="submit">Apply</button>
      </form>
    </div>
  );
}

export default App;