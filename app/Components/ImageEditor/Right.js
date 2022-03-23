import React from 'react';
import Controls from './Controls';
import { useSelector, useDispatch } from 'react-redux';
import { setSize } from '../../Redux/editor';

const Right = ({ showDub, showMinter }) => {
  const dispatch = useDispatch();
  const stamp = useSelector((state) => state.editor.stamp);
  const size = useSelector((state) => state.editor.size);
  const fg = useSelector((state) => state.editor.fg[0]);
  const fgCtx = useSelector((state) => state.editor.fg[1]);
  const bgCtx = useSelector((state) => state.editor.bg[1]);

  const setStampSize = (e) => {
    dispatch(setSize(e.target.value));
  };

  const clearFg = () => {
    fgCtx.clearRect(0, 0, fg.width, fg.height);
  };

  const save = () => {
    bgCtx.drawImage(fg, 0, 0);
    const image = bg.toDataURL();
    const a = document.createElement('a');
    a.setAttribute('href', image);
    a.download = 'test.png';
    a.click();
    a.remove();
    clearFg();
    drawBg();
  };

  const goToMint = () => {
    save();
    showDub(false);
    showMinter(true);
  };

  return (
    <React.Fragment>
      <Controls>
        <div className="container controls stamps">
          <label htmlFor="current">current</label>
          <img
            id="current"
            src={stamp ? stamp.src : ''}
            height="80px"
            name="current"
          />
          <input
            id="size-input"
            type="range"
            name="size"
            min="50"
            max="150"
            value={size}
            step="5"
            onChange={setStampSize}
          />
          <label htmlFor="size">Size</label>
        </div>
      </Controls>
      <div className="controls permanent">
        <button id="clear" onClick={clearFg}>
          reset
        </button>
        <button onClick={goToMint}>mint</button>
      </div>
    </React.Fragment>
  );
};

export default Right;
