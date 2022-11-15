import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { useSelector, useDispatch } from 'react-redux';
import {
  setArtistPosition,
  setTrackPosition,
} from '../../Redux/editor/centerLabel';
import { CANVAS_HEIGHT } from '../../lib/utils';

const Canvas = () => {
  const dispatch = useDispatch();
  const stamp = useSelector((state) => state.editor.global.stamp);
  const layer = useSelector((state) => state.editor.global.layer);
  const size = useSelector((state) => state.editor.global.size);
  const filter = useSelector((state) => state.editor.global.filter);
  const fg = useSelector((state) => state.editor.global.fg);
  const cl = useSelector((state) => state.editor.global.cl);
  const artistFont = useSelector((state) => state.editor.cl.artistFont);
  const artistSize = useSelector((state) => state.editor.cl.artistFontSize);
  const artistColor = useSelector((state) => state.editor.cl.artistFontColor);
  const trackFont = useSelector((state) => state.editor.cl.trackFont);
  const trackSize = useSelector((state) => state.editor.cl.trackFontSize);
  const trackColor = useSelector((state) => state.editor.cl.trackFontColor);
  const artist = useSelector((state) => state.metadata.artist);
  const track = useSelector((state) => state.metadata.track);
  const [coords, setCoords] = useState(null);

  const handleStop = (e, data) => {
    const targetRect = e.target.getBoundingClientRect();
    const canvasRect = fg.canvas.getBoundingClientRect();
    const _x = targetRect.left - canvasRect.left;
    const _y = targetRect.bottom - canvasRect.top - targetRect.height / 4;
    console.log('target-y', targetRect.bottom, 'canvas-y', canvasRect.top);

    if (e.target.id === 'artiste') {
      dispatch(setArtistPosition([_x, _y]));
    } else {
      dispatch(setTrackPosition([_x, _y]));
    }
  };

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
      <Draggable onStop={handleStop}>
        <div
          id="artiste"
          className={`artist overlay ${artistFont.class}`}
          style={{ color: artistColor, fontSize: `${artistSize}px` }}
        >
          {artist}
        </div>
      </Draggable>
      <Draggable onStop={handleStop}>
        <div
          className={`track overlay ${trackFont.class}`}
          style={{ color: trackColor, fontSize: `${trackSize}px` }}
        >
          {track}
        </div>
      </Draggable>
    </div>
  );
};

export default Canvas;
