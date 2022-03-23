import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setColor } from '../../Redux/editor';
import { Color, Solver } from '../../utils';

const Center = () => {
  const dispatch = useDispatch();
  const stamp = useSelector((state) => state.editor.stamp);
  const overlay = useSelector((state) => state.editor.overlay);
  const color = useSelector((state) => state.editor.color);
  const size = useSelector((state) => state.editor.size);
  const fg = useSelector((state) => state.editor.fg[0]);
  const fgCtx = useSelector((state) => state.editor.fg[1]);
  const [coords, setCoords] = useState(null);

  const handleMouseMove = (e) => {
    if (fg) {
      const rect = fg.getBoundingClientRect();
      const x = e.pageX - rect.left;
      const y = e.pageY - rect.top;
      setCoords([x, y]);
    }
  };

  const draw = () => {
    const [x, y] = coords;
    const offsetX = x - size / 2;
    const offsetY = y - size / 2;
    const img = stamp;
    fgCtx.filter = color;
    fgCtx.drawImage(img, offsetX, offsetY, size * 0.8, size);
  };

  const setColorFilter = (e) => {
    const val = e.target.value;
    const r = parseInt(val.substring(1, 3), 16);
    const g = parseInt(val.substring(3, 5), 16);
    const b = parseInt(val.substring(5, 7), 16);

    const color = new Color(r, g, b);
    const solver = new Solver(color);
    const result = solver.solve();

    const filterCSS = result.filter;
    overlay.style.filter = filterCSS;
    dispatch(setColor(filterCSS));
  };

  return (
    <div className="center">
      <canvas id="canvas-bg" height="500px" width="500px"></canvas>
      <canvas
        onMouseMove={handleMouseMove}
        onClick={draw}
        id="canvas-fg"
        height="500px"
        width="500px"
      ></canvas>
      <input
        className="color-selector"
        type="color"
        style={{ width: '50px', height: '50px' }}
        onChange={setColorFilter}
      ></input>
    </div>
  );
};

export default Center;
