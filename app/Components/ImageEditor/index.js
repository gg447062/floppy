import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Draggable from 'react-draggable';
import {
  setOverlay,
  setBg,
  setFg,
  setCl,
  setFront,
  setBack,
} from '../../Redux/editor/global';
import Canvas from './Canvas';
import ControlPanel from './ControlPanel';
import { assetBaseURL, CANVAS_HEIGHT } from '../../utils';

const ImageEditor = ({ setShowUpload, setShowEditor }) => {
  const dispatch = useDispatch();
  const stamp = useSelector((state) => state.editor.global.stamp);
  const overlay = useSelector((state) => state.editor.global.overlay);
  const size = useSelector((state) => state.editor.global.size);
  const filter = useSelector((state) => state.editor.filter);
  const artistFont = useSelector((state) => state.editor.cl.artistFont);
  const artistSize = useSelector((state) => state.editor.cl.artistFontSize);
  const artistColor = useSelector((state) => state.editor.cl.artistFontColor);
  const trackFont = useSelector((state) => state.editor.cl.trackFont);
  const trackSize = useSelector((state) => state.editor.cl.trackFontSize);
  const trackColor = useSelector((state) => state.editor.cl.trackFontColor);
  const fg = useSelector((state) => state.editor.global.fg);
  const layer = useSelector((state) => state.editor.global.layer);
  const artist = useSelector((state) => state.metadata.artist);
  const track = useSelector((state) => state.metadata.track);

  const drawInitialBg = (ctx1, ctx2) => {
    const clTextureImg = new Image(CANVAS_HEIGHT, CANVAS_HEIGHT);
    clTextureImg.src = `${assetBaseURL}/RECORD_CENTERLABEL/Centerlabel_Texture.png`;
    clTextureImg.setAttribute('crossorigin', 'anonymous');
    clTextureImg.onload = () => {
      ctx1.filter = 'none';
      ctx1.drawImage(
        clTextureImg,
        0,
        0,
        clTextureImg.width,
        clTextureImg.height
      );
    };

    const centerImg = new Image(CANVAS_HEIGHT, CANVAS_HEIGHT);
    centerImg.src = `${assetBaseURL}/RECORD_CENTERLABEL/Record.png`;
    centerImg.setAttribute('crossorigin', 'anonymous');
    centerImg.onload = () => {
      ctx2.filter = 'none';
      ctx2.drawImage(centerImg, 0, 0, centerImg.width, centerImg.height);
    };
  };

  const moveOverlay = (e) => {
    if (!stamp) {
      return;
    }
    if (layer == 'stickers') {
      overlay.style.filter = 'none';
    } else {
      if (overlay.style.filter !== filter) overlay.style.filter = filter;
    }
    const rect = fg.canvas.getBoundingClientRect();
    const x = e.pageX - (stamp.naturalWidth * size) / 2;
    const y = e.pageY - (stamp.naturalHeight * size) / 2;
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

  useEffect(() => {
    const prepareCanvas = () => {
      const _bg = document.getElementById('canvas-bg');
      const _bgCtx = _bg.getContext('2d');
      const _bgTxt = document.getElementById('bg-texture');
      const _bgTxtCtx = _bgTxt.getContext('2d');
      const _fg = document.getElementById('canvas-fg');
      const _fgCtx = _fg.getContext('2d');
      const _cl = document.getElementById('centerlabel');
      const _clCtx = _cl.getContext('2d');
      const _clTxt = document.getElementById('centerlabel-texture');
      const _clTxtCtx = _clTxt.getContext('2d');
      const _overlay = document.getElementById('stamp-ol');
      const _front = document.getElementById('canvas-final-front');
      const _frontCtx = _front.getContext('2d');
      const _back = document.getElementById('canvas-final-back');
      const _backCtx = _back.getContext('2d');

      dispatch(setOverlay(_overlay));
      dispatch(setFg({ canvas: _fg, ctx: _fgCtx }));
      dispatch(
        setBg({ canvas: _bg, ctx: _bgCtx }, { canvas: _bgTxt, ctx: _bgTxtCtx })
      );
      dispatch(
        setCl({ canvas: _cl, ctx: _clCtx }, { canvas: _clTxt, ctx: _clTxtCtx })
      );
      dispatch(setFront({ canvas: _front, ctx: _frontCtx }));
      dispatch(setBack({ canvas: _back, ctx: _backCtx }));
      drawInitialBg(_clTxtCtx, _clCtx);
    };

    prepareCanvas();
  }, []);

  return (
    <div className="editor-wrapper ff-3" id="dub" onMouseMove={moveOverlay}>
      {/* <button
        id="dub-button"
        onClick={() => {
          props.showDub(false);
        }}
      >
        X
      </button> */}
      <ControlPanel
        setShowUpload={setShowUpload}
        setShowEditor={setShowEditor}
        drawInitialBg={drawInitialBg}
      />
      <Canvas />
      <img
        id="stamp-ol"
        className="overlay"
        src={stamp ? stamp.src : ''}
        height={stamp ? `${stamp.naturalHeight * size}px` : ''}
      ></img>
      <Draggable>
        <div
          id="artiste"
          className={`artist overlay ${artistFont.class}`}
          style={{ color: artistColor, fontSize: `${artistSize}px` }}
        >
          {artist}
        </div>
      </Draggable>
      <Draggable>
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

export default ImageEditor;
