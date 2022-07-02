import React from 'react';
import Controls from './Controls';
import { useSelector, useDispatch } from 'react-redux';
import { setArtist, setTrack } from '../../Redux/metadata';
import SaveButton from './SaveButton';

const ControlPanel = ({ showDub, showMinter, drawInitialBg }) => {
  const dispatch = useDispatch();
  const fg = useSelector((state) => state.editor.fg);
  const bg = useSelector((state) => state.editor.bg);
  const bgTxt = useSelector((state) => state.editor.bgTexture);
  const cl = useSelector((state) => state.editor.cl);
  const clTxt = useSelector((state) => state.editor.clTexture);

  const reset = (full = false) => {
    fg.ctx.clearRect(0, 0, fg.canvas.width, fg.canvas.height);
    bg.ctx.clearRect(0, 0, bg.canvas.width, bg.canvas.height);
    bgTxt.ctx.clearRect(0, 0, bgTxt.canvas.width, bgTxt.canvas.height);
    cl.ctx.clearRect(0, 0, cl.canvas.width, cl.canvas.height);
    clTxt.ctx.clearRect(0, 0, clTxt.canvas.width, clTxt.canvas.height);
    dispatch(setArtist(''));
    dispatch(setTrack(''));
    drawInitialBg(clTxt.ctx, cl.ctx);
  };

  return (
    <div className="controls-wrapper">
      <Controls />
      <div className="controls permanent">
        <button id="clear" onClick={reset}>
          reset
        </button>
        <SaveButton reset={reset} />
      </div>
    </div>
  );
};

export default ControlPanel;
