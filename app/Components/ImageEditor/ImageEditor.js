import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setStamp, setOverlay, setBg, setFg } from '../../Redux/editor';
import Center from './Center';
import Left from './Left';
import Right from './Right';

const ImageEditor = (props) => {
  const dispatch = useDispatch();
  const stamp = useSelector((state) => state.editor.stamp);
  const overlay = useSelector((state) => state.editor.overlay);
  const size = useSelector((state) => state.editor.size);
  const bg = useSelector((state) => state.editor.bg[0]);
  const fg = useSelector((state) => state.editor.fg[0]);
  const { showDub, showMinter } = props;

  const drawBg = () => {
    const _bg = document.getElementById('canvas-bg');
    const _bgCtx = _bg.getContext('2d');
    if (!bg) {
      dispatch(setBg([_bg, _bgCtx]));
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
    const _overlay = document.getElementById('overlay');

    dispatch(setOverlay(_overlay));
    dispatch(setFg([_fg, _fgCtx]));
    dispatch(setStamp(document.getElementById('bassface_stamp')));
    drawBg();
  };

  const moveOverlay = (e) => {
    if (!fg) {
      return;
    }
    const rect = fg.getBoundingClientRect();
    const x = e.pageX - 2 - size / 2;
    const y = e.pageY - 102 - size / 2;
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
    prepareCanvas();
  }, []);

  return (
    <div className="ie-modal container" id="dub" onMouseMove={moveOverlay}>
      <button
        id="dub-button"
        onClick={() => {
          props.showDub(false);
        }}
      >
        X
      </button>
      <Center />
      <Left />
      <Right showDub={showDub} showMinter={showMinter} />
      <img id="overlay" src={stamp ? stamp.src : ''} height={`${size}px`}></img>
    </div>
  );
};

export default ImageEditor;
