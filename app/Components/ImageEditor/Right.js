import React from 'react';
import Controls from './Controls';
import { useSelector, useDispatch } from 'react-redux';
import { setSize } from '../../Redux/editor';
import Fonts from './Fonts';

const Right = ({
  showDub,
  showMinter,
  drawInitialBg,
  setArtist,
  setTrack,
  artist,
  track,
}) => {
  const dispatch = useDispatch();
  const size = useSelector((state) => state.editor.size);
  const layer = useSelector((state) => state.editor.layer);
  const font = useSelector((state) => state.editor.font);
  const color = useSelector((state) => state.editor.color);
  const fg = useSelector((state) => state.editor.fg);
  const bg = useSelector((state) => state.editor.bg);
  const bgTexture = useSelector((state) => state.editor.bgTexture);
  const cl = useSelector((state) => state.editor.cl);
  const clTexture = useSelector((state) => state.editor.clTexture);

  const setStampSize = (e) => {
    dispatch(setSize(e.target.value));
  };

  const reset = () => {
    fg.ctx.clearRect(0, 0, fg.canvas.width, fg.canvas.height);
    bg.ctx.clearRect(0, 0, bg.canvas.width, bg.canvas.height);
    cl.ctx.clearRect(0, 0, cl.canvas.width, cl.canvas.height);
    clTexture.ctx.clearRect(
      0,
      0,
      clTexture.canvas.width,
      clTexture.canvas.height
    );
    drawInitialBg(clTexture.ctx, cl.ctx);
  };

  const writeTextToCanvas = (ctx, text, posX, posY) => {
    ctx.font = `30px ${font.name}`;
    ctx.fillStyle = color;
    ctx.fillText(text, posX, posY);
  };

  const writeArtist = (e) => {
    setArtist(e.target.value);
  };

  const writeTrack = (e) => {
    setTrack(e.target.value);
  };

  const save = () => {
    const final = document.getElementById('canvas-final-mixdown');
    const finalCtx = final.getContext('2d');

    finalCtx.drawImage(cl.canvas, 0, 0);
    writeTextToCanvas(finalCtx, artist, 250, 250);
    writeTextToCanvas(finalCtx, track, 250, 290);
    finalCtx.drawImage(clTexture.canvas, 0, 0);
    finalCtx.drawImage(bg.canvas, 0, 0);
    finalCtx.drawImage(fg.canvas, 0, 0);
    finalCtx.drawImage(bgTexture.canvas, 0, 0);

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
