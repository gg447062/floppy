import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setColor, setFilter } from '../../Redux/editor';
import { Color, Solver } from '../../utils';

const Center = () => {
  const dispatch = useDispatch();
  const stamp = useSelector((state) => state.editor.stamp);
  const template = useSelector((state) => state.editor.template);
  const overlay = useSelector((state) => state.editor.overlay);
  const layer = useSelector((state) => state.editor.layer);
  const size = useSelector((state) => state.editor.size);
  const filter = useSelector((state) => state.editor.filter);
  const bg = useSelector((state) => state.editor.bg);
  // const bg = useSelector((state) => state.editor.bg[0]);
  // const bgCtx = useSelector((state) => state.editor.bg[1]);
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

  const drawFg = (x, y, applyFilter, ctx) => {
    if (applyFilter) {
      ctx.filter = filter;
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
    console.log(bg);
    const val = e.target.value;
    const r = parseInt(val.substring(1, 3), 16);
    const g = parseInt(val.substring(3, 5), 16);
    const b = parseInt(val.substring(5, 7), 16);

    const _color = new Color(r, g, b);
    const solver = new Solver(_color);
    const result = solver.solve();

    const filterCSS = result.filter;
    overlay.style.filter = filterCSS;
    dispatch(setFilter(filterCSS));
    dispatch(setColor(e.target.value));
    if (layer == 'template') {
      bg[1].clearRect(0, 0, bg[0].width, bg[0].height);
      bg[1].filter = filterCSS;
      bg[1].drawImage(template, 0, 0, 522, 522);
    }
  };

  return (
    <div className="center">
      <canvas
        id="canvas-final-mixdown"
        className="canvas"
        height="500px"
        width="500px"
      ></canvas>
      <canvas
        id="centerlabel"
        className="canvas"
        height="500px"
        width="500px"
      ></canvas>
      <canvas
        id="centerlabel-texture"
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
      <canvas
        id="bg-texture"
        className="canvas"
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
