import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setOverlay,
  setBg,
  setFg,
  setCenterLabel,
  setLayer,
} from '../../Redux/editor';
import Center from './Center';
import Left from './Left';
import Right from './Right';

const ImageEditor = (props) => {
  const dispatch = useDispatch();
  const stamp = useSelector((state) => state.editor.stamp);
  const overlay = useSelector((state) => state.editor.overlay);
  const size = useSelector((state) => state.editor.size);
  const fg = useSelector((state) => state.editor.fg[0]);
  const layer = useSelector((state) => state.editor.layer);
  const { showDub, showMinter } = props;

  const drawInitialBg = (ctx1, ctx2) => {
    const bgImg = new Image(522, 522);
    bgImg.src = 'assets/TEMPLATES/cover-19/19_Cover.png';
    bgImg.onload = () => {
      ctx1.filter = 'none';
      ctx1.drawImage(bgImg, 0, 0, bgImg.width, bgImg.height);
    };
    const centerImg = new Image(522, 522);
    centerImg.src = 'assets/RECORD_CENTERLABEL/centerlabel.png';
    centerImg.onload = () => {
      ctx2.filter = 'none';
      ctx2.drawImage(centerImg, 0, 0, centerImg.width, centerImg.height);
    };
  };

  const prepareCanvas = () => {
    const _bg = document.getElementById('canvas-bg');
    const _bgCtx = _bg.getContext('2d');
    const _fg = document.getElementById('canvas-fg');
    const _fgCtx = _fg.getContext('2d');
    const _cl = document.getElementById('centerlabel');
    const _clCtx = _cl.getContext('2d');
    const _overlay = document.getElementById('overlay');

    dispatch(setOverlay(_overlay));
    dispatch(setCenterLabel([_cl, _clCtx]));
    dispatch(setFg([_fg, _fgCtx]));
    dispatch(setBg([_bg, _bgCtx]));
    dispatch(setLayer('template'));
    drawInitialBg(_bgCtx, _clCtx);
  };

  const moveOverlay = (e) => {
    if (!stamp) {
      return;
    }
    if (layer == 'stickers') {
      overlay.style.filter = 'none';
    }
    const rect = fg.getBoundingClientRect();
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
      <Right
        showDub={showDub}
        showMinter={showMinter}
        drawInitialBg={drawInitialBg}
      />
      <img
        id="overlay"
        src={stamp ? stamp.src : ''}
        height={stamp ? `${stamp.naturalHeight * size}px` : ''}
      ></img>
    </div>
  );
};

export default ImageEditor;
