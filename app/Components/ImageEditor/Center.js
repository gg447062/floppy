import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setColor } from '../../Redux/editor';
import { Color, Solver } from '../../utils';

const Center = () => {
  const dispatch = useDispatch();
  const stamp = useSelector((state) => state.editor.stamp);
  const template = useSelector((state) => state.editor.template);
  const overlay = useSelector((state) => state.editor.overlay);
  const layer = useSelector((state) => state.editor.layer);
  const color = useSelector((state) => state.editor.color);
  const size = useSelector((state) => state.editor.size);
  const bg = useSelector((state) => state.editor.bg[0]);
  const bgCtx = useSelector((state) => state.editor.bg[1]);
  const fg = useSelector((state) => state.editor.fg[0]);
  const fgCtx = useSelector((state) => state.editor.fg[1]);
  const clCtx = useSelector((state) => state.editor.cl[1]);
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
    const offsetX = x - (stamp.naturalWidth * size) / 2;
    const offsetY = y - (stamp.naturalHeight * size) / 2;
    switch (layer) {
      case 'center-label':
        drawFg(offsetX, offsetY, true, clCtx);
        break;
      case 'stickers':
        drawFg(offsetX, offsetY, false, fgCtx);
        break;
      case 'stamps':
        drawFg(offsetX, offsetY, true, fgCtx);
        break;
      default:
        return;
    }
  };

  const drawFg = (x, y, filter, ctx) => {
    if (filter) {
      ctx.filter = color;
      ctx.globalAlpha = 0.8;
    } else {
      ctx.filter = 'none';
      ctx.globalAlpha = 1;
    }
    ctx.drawImage(
      stamp,
      x,
      y,
      size * stamp.naturalWidth,
      size * stamp.naturalHeight
    );
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
    if (layer == 'template') {
      bgCtx.clearRect(0, 0, bg.width, bg.height);
      bgCtx.filter = filterCSS;
      bgCtx.drawImage(template, 0, 0, 522, 522);
    }
  };

  return (
    <div className="center">
      <canvas
        id="centerlabel"
        className="canvas"
        height="500px"
        width="500px"
      ></canvas>
      <canvas
        id="canvas-bg"
        className="canvas"
        height="500px"
        width="500px"
      ></canvas>
      <canvas
        id="canvas-fg"
        className="canvas"
        height="500px"
        width="500px"
        onMouseMove={handleMouseMove}
        onClick={draw}
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
