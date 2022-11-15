import React, { useState } from 'react';
import Grid from './Grid';
import Player3D from './Player3D';

export default function Crates() {
  const [grid, setGrid] = useState(true);
  const view = grid ? '3D' : 'GRID';
  const toggle = () => {
    const _grid = !grid;
    setGrid(_grid);
  };

  return (
    <div>
      <button className="toggle-switch" onClick={toggle}>
        {view}
      </button>
      {grid && <Grid />}
      {!grid && <Player3D />}
    </div>
  );
}
