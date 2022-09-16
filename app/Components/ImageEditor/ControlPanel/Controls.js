import React from 'react';
import Fonts from './StampSelector/Fonts';
import { useSelector, useDispatch } from 'react-redux';
import {
  setSize,
  setFontColor,
  setFontSize,
  setColor,
  setFilter,
} from '../../../Redux/editor';
import { setArtist, setTrack } from '../../../Redux/metadata';
import { Color, Solver, CANVAS_HEIGHT } from '../../../utils';

const Controls = () => {
  const dispatch = useDispatch();
  const size = useSelector((state) => state.editor.size);
  const fontSize = useSelector((state) => state.editor.fontSize);
  const layer = useSelector((state) => state.editor.layer);
  const bg = useSelector((state) => state.editor.bg);
  const template = useSelector((state) => state.editor.template);
  const overlay = useSelector((state) => state.editor.overlay);

  const setColorFilter = (e) => {
    const val = e.target.value;
    const r = parseInt(val.substring(1, 3), 16);
    const g = parseInt(val.substring(3, 5), 16);
    const b = parseInt(val.substring(5, 7), 16);

    const _color = new Color(r, g, b);
    const solver = new Solver(_color);
    const result = solver.solve();

    const filterCSS = result.filter;
    overlay.style.filter = filterCSS;
    dispatch(setFilter(filterCSS));
    dispatch(setColor(e.target.value));
    if (layer == 'template' && template) {
      bg.ctx.clearRect(0, 0, bg.canvas.width, bg.canvas.height);
      bg.ctx.filter = filterCSS;
      bg.ctx.drawImage(template, 0, 0, CANVAS_HEIGHT, CANVAS_HEIGHT);
    }
  };

  const setStampSize = (e) => {
    dispatch(setSize(e.target.value));
  };

  const setTextSize = (e) => {
    dispatch(setFontSize(e.target.value));
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
  return (
    <div>
      <div className="container controls size">
        <input
          className="color-selector"
          type="color"
          style={{ width: '50px', height: '50px' }}
          onChange={setColorFilter}
        ></input>
        <input
          id="size-input"
          type="range"
          name="size"
          min="0.25"
          max="0.75"
          value={size}
          step=".01"
          onChange={setStampSize}
        />
        <label htmlFor="size">Size</label>
      </div>
      {layer == 'center-label' && (
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
      )}
    </div>
  );
};

export default Controls;
