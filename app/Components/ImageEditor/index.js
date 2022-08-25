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
} from '../../Redux/editor';
import Center from './Center';
import StampSelector from './StampSelector';
import ControlPanel from './ControlPanel';
import { assetBaseURL } from '../../utils';

const ImageEditor = ({ setShowUpload, setShowEditor }) => {
  const dispatch = useDispatch();
  const stamp = useSelector((state) => state.editor.stamp);
  const overlay = useSelector((state) => state.editor.overlay);
  const size = useSelector((state) => state.editor.size);
  const fontSize = useSelector((state) => state.editor.fontSize);
  const fontColor = useSelector((state) => state.editor.fontColor);
  const filter = useSelector((state) => state.editor.filter);
  const artistFont = useSelector((state) => state.editor.artistFont);
  const trackFont = useSelector((state) => state.editor.trackFont);
  const fg = useSelector((state) => state.editor.fg);
  const layer = useSelector((state) => state.editor.layer);
  const artist = useSelector((state) => state.metadata.artist);
  const track = useSelector((state) => state.metadata.track);

  const drawInitialBg = (ctx1, ctx2) => {
    const clTextureImg = new Image(500, 500);
    clTextureImg.src = `${assetBaseURL}/RECORD_CENTERLABEL/Centerlabel_Texture.png`;
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

    const centerImg = new Image(500, 500);
    centerImg.src = `${assetBaseURL}/RECORD_CENTERLABEL/Record.png`;
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
    <div className="ie-modal container ff-3" id="dub" onMouseMove={moveOverlay}>
      <button
        id="dub-button"
        onClick={() => {
          props.showDub(false);
        }}
      >
        X
      </button>
      <StampSelector />
      <Center />
      <ControlPanel
        setShowUpload={setShowUpload}
        setShowEditor={setShowEditor}
        drawInitialBg={drawInitialBg}
      />
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
          style={{ color: fontColor, fontSize: `${fontSize}px` }}
        >
          {artist}
        </div>
      </Draggable>
      <Draggable>
        <div
          className={`track overlay ${trackFont.class}`}
          style={{ color: fontColor, fontSize: `${fontSize}px` }}
        >
          {track}
        </div>
      </Draggable>
    </div>
  );
};

export default ImageEditor;
