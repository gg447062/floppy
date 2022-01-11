import React, { useEffect, useState } from 'react';
import StampSelector from './StampSelector';

const DubPlate = (props) => {
  const [stamp, setStamp] = useState(null);
  const [coords, setCoords] = useState(null);
  const [size, setSize] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [[bg, bgCtx], setBg] = useState([]);
  const [[fg, fgCtx], setFg] = useState([]);

  const drawBg = () => {
    const _bg = document.getElementById('canvas-bg');
    const _bgCtx = _bg.getContext('2d');
    if (!bg) {
      setBg([_bg, _bgCtx]);
    }
    const img = new Image(522, 522);
    img.src = 'assets/white_jacket.jpeg';
    img.onload = () => {
      _bgCtx.drawImage(img, -10, -10, img.width, img.height);
    };
  };

  const prepareCanvas = () => {
    const _fg = document.getElementById('canvas-fg');
    const _fgCtx = _fg.getContext('2d');

    setFg([_fg, _fgCtx]);
    setStamp(document.getElementById('bassface_stamp'));
    drawBg();
  };

  const handleMouseMove = (e) => {
    if (fg) {
      const rect = fg.getBoundingClientRect();
      const x = e.pageX - rect.left;
      const y = e.pageY - rect.top;
      setCoords([x, y]);
    }
  };

  const moveOverlay = (e) => {
    const rect = fg.getBoundingClientRect();
    const x = e.pageX - 2 - size / 2;
    const y = e.pageY - 102 - size / 2;
    const overlay = document.getElementById('overlay');
    overlay.style.top = `${y}px`;
    overlay.style.left = `${x}px`;
    if (
      e.pageX > rect.right ||
      e.pageX < rect.left ||
      e.pageY < rect.top ||
      e.pageY > rect.bottom
    ) {
      overlay.style.opacity = 0;
    } else {
      if (overlay.style.opacity == 0) {
        overlay.style.opacity = 0.7;
      }
    }
  };

  const chooseStamp = (e) => {
    stamp.classList.remove('selected');
    setStamp(e.target);
    e.target.classList.add('selected');
  };

  const setStampSize = (e) => {
    setSize(e.target.value);
  };

  const setColor = (e) => {
    const index = stamp.src.lastIndexOf('/');
    const newSource = `${stamp.src.slice(0, index + 1)}${e.target.id}.png`;
    const img = new Image(stamp.width, stamp.height);
    img.src = newSource;
    setStamp(img);
  };

  // const setImageRotation = (e) => {
  //   setRotation(e.target.value);
  // };

  const draw = () => {
    const [x, y] = coords;
    const offsetX = x - size / 2; // - 250
    const offsetY = y - size / 2; // - 250
    const img = stamp;
    // fgCtx.translate(fg.height / 2, fg.width / 2);
    // if (rotation) {
    // fgCtx.translate(-fg.height / 2, -fg.width / 2);
    // fgCtx.rotate((parseInt(rotation) * Math.PI) / 180);
    // fgCtx.translate(-fg.height / 2, fg.width / 2);
    // }
    fgCtx.drawImage(img, offsetX, offsetY, size * 0.8, size);
    // fgCtx.setTransform(1, 0, 0, 1, 0, 0);
  };

  const clearFg = () => {
    fgCtx.clearRect(0, 0, fg.width, fg.height);
    setRotation(0);
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

  useEffect(() => {
    prepareCanvas();
  }, []);

  return (
    <div className="modal container" id="dub" onMouseMove={moveOverlay}>
      <button
        id="dub-button"
        onClick={() => {
          props.showDub(false);
        }}
      >
        X
      </button>
      <canvas id="canvas-bg" height="500px" width="500px"></canvas>
      <canvas
        onMouseMove={handleMouseMove}
        onClick={draw}
        id="canvas-fg"
        height="500px"
        width="500px"
      ></canvas>
      <StampSelector chooseStamp={chooseStamp} setColor={setColor} />
      <div id="controls" className="container">
        <label htmlFor="current">current</label>
        <img
          id="current"
          src={stamp ? stamp.src : ''}
          height="80px"
          name="current"
          style={{ transform: `rotate(${rotation}deg)` }}
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
        {/* <input
          id="size-input"
          type="range"
          name="rotation"
          min="-180"
          max="180"
          value={rotation}
          step="2"
          onChange={setImageRotation}
        />
        <label htmlFor="rotation">rotate</label> */}
        <button id="clear" onClick={clearFg}>
          reset
        </button>
        <button onClick={save}>save</button>
      </div>
      <img
        id="overlay"
        src={stamp ? stamp.src : ''}
        height={`${size}px`}
        style={{ transform: `rotate(${rotation}deg)` }}
      ></img>
    </div>
  );
};

export default DubPlate;
