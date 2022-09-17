import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CANVAS_HEIGHT } from '../../utils';

const Canvas = () => {
  const stamp = useSelector((state) => state.editor.global.stamp);
  const layer = useSelector((state) => state.editor.global.layer);
  const size = useSelector((state) => state.editor.global.size);
  const filter = useSelector((state) => state.editor.global.filter);
  const fg = useSelector((state) => state.editor.global.fg);
  const cl = useSelector((state) => state.editor.global.cl);
  const [coords, setCoords] = useState(null);

  const handleMouseMove = (e) => {
    if (fg.canvas) {
      const rect = fg.canvas.getBoundingClientRect();
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
        drawFg(offsetX, offsetY, true, cl.ctx);
        break;
      case 'stickers':
        drawFg(offsetX, offsetY, false, fg.ctx);
        break;
      case 'stamps':
        drawFg(offsetX, offsetY, true, fg.ctx);
        break;
      default:
        return;
    }
  };

  const drawFg = (x, y, applyFilter, ctx) => {
    if (applyFilter) {
      ctx.filter = filter;
    } else {
      ctx.filter = 'none';
    }
    ctx.drawImage(
      stamp,
      x,
      y,
      size * stamp.naturalWidth,
      size * stamp.naturalHeight
    );
  };

  return (
    <div className="editor-canvas-wrapper">
      <canvas
        id="canvas-final-back"
        className="canvas"
        height={`${CANVAS_HEIGHT}px`}
        width={`${CANVAS_HEIGHT}px`}
      ></canvas>
      <canvas
        id="canvas-final-front"
        className="canvas"
        height={`${CANVAS_HEIGHT}px`}
        width={`${CANVAS_HEIGHT}px`}
      ></canvas>
      <canvas
        id="centerlabel"
        className="canvas"
        height={`${CANVAS_HEIGHT}px`}
        width={`${CANVAS_HEIGHT}px`}
      ></canvas>
      <canvas
        id="centerlabel-texture"
        className="canvas"
        height={`${CANVAS_HEIGHT}px`}
        width={`${CANVAS_HEIGHT}px`}
      ></canvas>
      <canvas
        id="canvas-bg"
        className="canvas"
        height={`${CANVAS_HEIGHT}px`}
        width={`${CANVAS_HEIGHT}px`}
      ></canvas>
      <canvas
        id="canvas-fg"
        className="canvas"
        height={`${CANVAS_HEIGHT}px`}
        width={`${CANVAS_HEIGHT}px`}
        onMouseMove={handleMouseMove}
        onClick={draw}
      ></canvas>
      <canvas
        id="bg-texture"
        className="canvas"
        height={`${CANVAS_HEIGHT}px`}
        width={`${CANVAS_HEIGHT}px`}
      ></canvas>
    </div>
  );
};

export default Canvas;
