import React, { useState } from 'react';
import Grid from './Grid';
import Player3D from './Player3D';

export default function Crates() {
  const [view, setView] = useState('3d');

  return (
    <div>
      {view == 'grid' && <Grid />}
      {view == '3d' && <Player3D />}
    </div>
  );
}
