import React from 'react';
import Controls from './Controls';
import { useSelector, useDispatch } from 'react-redux';
import { setSize } from '../../Redux/editor';

const Right = ({ showDub, showMinter, drawInitialBg }) => {
  const dispatch = useDispatch();
  const size = useSelector((state) => state.editor.size);
  const layer = useSelector((state) => state.editor.layer);
  const color = useSelector((state) => state.editor.color);
  const fg = useSelector((state) => state.editor.fg[0]);
  const fgCtx = useSelector((state) => state.editor.fg[1]);
  const bg = useSelector((state) => state.editor.bg[0]);
  const bgCtx = useSelector((state) => state.editor.bg[1]);
  const cl = useSelector((state) => state.editor.cl[0]);
  const clCtx = useSelector((state) => state.editor.cl[1]);

  const setStampSize = (e) => {
    dispatch(setSize(e.target.value));
  };

  const reset = () => {
    fgCtx.clearRect(0, 0, fg.width, fg.height);
    bgCtx.clearRect(0, 0, bg.width, bg.height);
    drawInitialBg(bgCtx, clCtx);
  };

  const writeTextToCanvas = (e) => {
    clCtx.font = '48px sans-serif';
    clCtx.fillStyle = color;
    clCtx.fillText(e.target.value, 250, 250);
  };

  const save = () => {
    bgCtx.drawImage(cl, 0, 0);
    bgCtx.drawImage(fg, 0, 0);
    const image = bg.toDataURL();
    const a = document.createElement('a');
    a.setAttribute('href', image);
    a.download = 'test.png';
    a.click();
    a.remove();
    reset();
  };

  const goToMint = () => {
    save();
    showDub(false);
    showMinter(true);
  };

  return (
    <React.Fragment>
      <Controls>
        <div className="container controls size">
          <input
            id="size-input"
            type="range"
            name="size"
            min="0.01"
            max="0.25"
            value={size}
            step=".01"
            onChange={setStampSize}
          />
          <label htmlFor="size">Size</label>
        </div>
      </Controls>
      {layer == 'center-label' && (
        <Controls>
          <div className="container controls text">
            <label htmlFor="artist">Artist Name</label>
            <input
              id="artist"
              name="artist"
              onChange={writeTextToCanvas}
            ></input>
            <label htmlFor="track">Track Name</label>
            <input id="track" name="track" onChange={writeTextToCanvas}></input>
          </div>
        </Controls>
      )}
      <div className="controls permanent">
        <button id="clear" onClick={reset}>
          reset
        </button>
        <button onClick={goToMint}>mint</button>
      </div>
    </React.Fragment>
  );
};

export default Right;
