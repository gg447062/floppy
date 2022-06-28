import React from 'react';
import { useMoralis, useNewMoralisObject } from 'react-moralis';
import Moralis from 'moralis/';
import Controls from './Controls';
import { useSelector, useDispatch } from 'react-redux';
import { setSize, setFontColor, setFontSize } from '../../Redux/editor';
import { setArtist, setTrack } from '../../Redux/metadata';
import Fonts from './Fonts';
import { Color, Solver } from '../../utils';

const Right = ({ showDub, showMinter, drawInitialBg }) => {
  const { isAuthenticated } = useMoralis();
  const { save } = useNewMoralisObject('Dubplate');
  const dispatch = useDispatch();
  const size = useSelector((state) => state.editor.size);
  const fontSize = useSelector((state) => state.editor.fontSize);
  const layer = useSelector((state) => state.editor.layer);
  const artist = useSelector((state) => state.metadata.artist);
  const track = useSelector((state) => state.metadata.track);
  const artistFont = useSelector((state) => state.editor.artistFont);
  const trackFont = useSelector((state) => state.editor.trackFont);
  const color = useSelector((state) => state.editor.color);
  const fg = useSelector((state) => state.editor.fg);
  const bg = useSelector((state) => state.editor.bg);
  const bgTexture = useSelector((state) => state.editor.bgTexture);
  const cl = useSelector((state) => state.editor.cl);
  const clTexture = useSelector((state) => state.editor.clTexture);

  const setStampSize = (e) => {
    dispatch(setSize(e.target.value));
  };

  const setTextSize = (e) => {
    dispatch(setFontSize(e.target.value));
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

  const writeTextToCanvas = (ctx, text, posX, posY, artist = true) => {
    if (artist) {
      ctx.font = `${fontSize}px ${artistFont.name}`;
    } else {
      ctx.font = `${fontSize}px ${trackFont.className}`;
    }
    ctx.fillStyle = color;
    ctx.fillText(text, posX, posY);
  };

  // look in to debouncing these next two functions
  const writeArtist = (e) => {
    dispatch(setArtist(e.target.value));
  };

  const writeTrack = (e) => {
    dispatch(setTrack(e.target.value));
  };

  const setTextColor = (e) => {
    const val = e.target.value;
    const r = parseInt(val.substring(1, 3), 16);
    const g = parseInt(val.substring(3, 5), 16);
    const b = parseInt(val.substring(5, 7), 16);

    const _color = new Color(r, g, b);
    const solver = new Solver(_color);
    const result = solver.solve();

    dispatch(setFontColor(e.target.value));
  };

  const saveObject = (data) => {
    save(data, {
      onSuccess: (dubplate) => {
        console.log(dubplate.id);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  // will need to save audio too in the future

  const saveToDatabase = async (front, back, name) => {
    console.log(front);
    if (isAuthenticated) {
      const frontImage = new Moralis.File(`${name}_front.png`, {
        base64: front,
      });
      await frontImage.saveIPFS();
      const frontHash = frontImage.hash();

      const back = new Moralis.File(`${name}_back.png`, {
        base64: front,
      });
      await back.saveIPFS();
      const backHash = back.hash();

      const metadata = {
        name: track,
        artist: artist,
        description: 'a floppy dubplate',
        front: frontHash,
        back: backHash,
      };

      const jsonFile = new Moralis.File(`${name}_metadata.json`, {
        base64: btoa(JSON.stringify(metadata)),
      });

      await jsonFile.saveIPFS();
      const jsonHash = jsonFile.hash();

      saveObject({
        artist: artist,
        track: track,
        metadata: metadata,
        metadataHash: jsonHash,
      });
    }
  };

  const saveAndDownload = () => {
    const finalBack = document.getElementById('canvas-final-back');
    const finalBackCtx = finalBack.getContext('2d');
    const finalFront = document.getElementById('canvas-final-front');
    const finalFrontCtx = finalFront.getContext('2d');

    finalFrontCtx.drawImage(cl.canvas, 0, 0);
    writeTextToCanvas(finalFrontCtx, artist, 250, 250);
    writeTextToCanvas(finalFrontCtx, track, 250, 290, false);
    finalFrontCtx.drawImage(clTexture.canvas, 0, 0);
    finalFrontCtx.drawImage(bg.canvas, 0, 0);
    finalFrontCtx.drawImage(fg.canvas, 0, 0);
    finalFrontCtx.drawImage(bgTexture.canvas, 0, 0);

    const frontImgURL = finalFront.toDataURL('image/png');
    const a = document.createElement('a');
    a.setAttribute('href', frontImgURL);
    a.download = 'test_front.png';
    a.click();

    finalBackCtx.drawImage(bg.canvas, 0, 0);
    finalBackCtx.drawImage(bgTexture.canvas, 0, 0);
    const finalImgURL = finalBack.toDataURL('image/png');

    saveToDatabase(frontImgURL, backImgURL, 'test');
    a.setAttribute('href', finalImgURL);
    a.download = 'test_back.png';
    a.click();

    a.remove();
    reset();
  };

  return (
    <div className="controls-wrapper">
      <Controls>
        <div className="container controls size">
          <input
            id="size-input"
            type="range"
            name="size"
            min="0.5"
            max="1"
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
            <input
              type="color"
              className="text-color"
              onChange={setTextColor}
            ></input>
            <input
              id="size-input"
              type="range"
              name="font-size"
              min="10"
              max="35"
              value={fontSize}
              step="1"
              onChange={setTextSize}
            />
            <label htmlFor="font-size">Font Size</label>
            <label htmlFor="artist">Artist Name</label>
            <input id="artist" name="artist" onChange={writeArtist}></input>
            <Fonts destination={'artist'} />
            <label htmlFor="track">Track Name</label>
            <input id="track" name="track" onChange={writeTrack}></input>
            <Fonts destination={'track'} />
          </div>
        </Controls>
      )}
      <div className="controls permanent">
        <button id="clear" onClick={reset}>
          reset
        </button>
        <button onClick={saveAndDownload}>save</button>
      </div>
    </div>
  );
};

export default Right;
