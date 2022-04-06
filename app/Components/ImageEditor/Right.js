import React from 'react';
import Controls from './Controls';
import { useSelector, useDispatch } from 'react-redux';
import { setSize } from '../../Redux/editor';
import Fonts from './Fonts';

const Right = ({ showDub, showMinter, drawInitialBg, setArtist, setTrack }) => {
  const dispatch = useDispatch();
  const size = useSelector((state) => state.editor.size);
  const layer = useSelector((state) => state.editor.layer);
  const font = useSelector((state) => state.editor.font);
  const color = useSelector((state) => state.editor.color);
  const fg = useSelector((state) => state.editor.fg[0]);
  const fgCtx = useSelector((state) => state.editor.fg[1]);
  const bg = useSelector((state) => state.editor.bg[0]);
  const bgCtx = useSelector((state) => state.editor.bg[1]);
  const bgTexture = useSelector((state) => state.editor.bgTexture[0]);
  const cl = useSelector((state) => state.editor.cl[0]);
  const clCtx = useSelector((state) => state.editor.cl[1]);
  const clTexture = useSelector((state) => state.editor.clTexture[0]);
  const clTextureCtx = useSelector((state) => state.editor.clTexture[1]);

  const setStampSize = (e) => {
    dispatch(setSize(e.target.value));
  };

  const reset = () => {
    fgCtx.clearRect(0, 0, fg.width, fg.height);
    bgCtx.clearRect(0, 0, bg.width, bg.height);
    clCtx.clearRect(0, 0, bg.width, bg.height);
    clTextureCtx.clearRect(0, 0, bg.width, bg.height);
    drawInitialBg(clTextureCtx, clCtx);
  };

  // const writeTextToCanvas = (e) => {
  //   clCtx.font = font;
  //   clCtx.fillStyle = color;
  //   clCtx.fillText(e.target.value, 250, 250);
  // };

  const writeArtist = (e) => {
    setArtist(e.target.value);
  };

  const writeTrack = (e) => {
    setTrack(e.target.value);
  };

  const save = () => {
    const final = document.getElementById('canvas-final-mixdown');
    const finalCtx = final.getContext('2d');

    finalCtx.drawImage(cl, 0, 0);
    finalCtx.drawImage(clTexture, 0, 0);
    finalCtx.drawImage(bg, 0, 0);
    finalCtx.drawImage(fg, 0, 0);
    finalCtx.drawImage(bgTexture, 0, 0);

    const image = final.toDataURL();
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
            <input id="artist" name="artist" onChange={writeArtist}></input>
            <label htmlFor="track">Track Name</label>
            <input id="track" name="track" onChange={writeTrack}></input>
          </div>
          <Fonts />
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
