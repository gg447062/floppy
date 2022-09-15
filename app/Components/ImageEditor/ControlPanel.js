import React from 'react';
import Controls from './Controls';
import { useSelector, useDispatch } from 'react-redux';
import { setColor, setFilter } from '../../Redux/editor';
import { Color, Solver, CANVAS_HEIGHT } from '../../utils';
import { setArtist, setTrack } from '../../Redux/metadata';
import SaveButton from './SaveButton';
import StampSelector from './StampSelector';

const ControlPanel = ({ setShowUpload, setShowEditor, drawInitialBg }) => {
  const dispatch = useDispatch();
  const fg = useSelector((state) => state.editor.fg);
  const bg = useSelector((state) => state.editor.bg);
  const bgTxt = useSelector((state) => state.editor.bgTexture);
  const cl = useSelector((state) => state.editor.cl);
  const clTxt = useSelector((state) => state.editor.clTexture);
  const layer = useSelector((state) => state.editor.layer);
  const template = useSelector((state) => state.editor.template);
  const overlay = useSelector((state) => state.editor.overlay);

  const setColorFilter = (e) => {
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
    if (layer == 'template' && template) {
      bg.ctx.clearRect(0, 0, bg.canvas.width, bg.canvas.height);
      bg.ctx.filter = filterCSS;
      bg.ctx.drawImage(template, 0, 0, CANVAS_HEIGHT, CANVAS_HEIGHT);
    }
  };

  const clearCanvas = () => {
    fg.ctx.clearRect(0, 0, fg.canvas.width, fg.canvas.height);
    bg.ctx.clearRect(0, 0, bg.canvas.width, bg.canvas.height);
    bgTxt.ctx.clearRect(0, 0, bgTxt.canvas.width, bgTxt.canvas.height);
    cl.ctx.clearRect(0, 0, cl.canvas.width, cl.canvas.height);
    clTxt.ctx.clearRect(0, 0, clTxt.canvas.width, clTxt.canvas.height);
    drawInitialBg(clTxt.ctx, cl.ctx);
  };

  const reset = (full = false) => {
    clearCanvas();
    dispatch(setArtist(''));
    dispatch(setTrack(''));
  };

  return (
    <div className="controls-wrapper">
      <StampSelector />
      <Controls />
      <input
        className="color-selector"
        type="color"
        style={{ width: '50px', height: '50px' }}
        onChange={setColorFilter}
      ></input>
      <div className="controls permanent">
        <button id="clear" onClick={reset}>
          reset
        </button>
        <SaveButton
          clearCanvas={clearCanvas}
          setShowUpload={setShowUpload}
          setShowEditor={setShowEditor}
        />
      </div>
    </div>
  );
};

export default ControlPanel;
