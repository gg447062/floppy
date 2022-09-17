import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter, setSize } from '../../../../Redux/editor/global';
import {
  Color,
  Solver,
  CANVAS_HEIGHT,
  getFontName,
  assetBaseURL,
} from '../../../../utils';

const ColorSelector = ({
  action,
  action2 = null,
  value,
  isFont = false,
  isCL = false,
  isTemplate = false,
}) => {
  const dispatch = useDispatch();
  const bg = useSelector((state) => state.editor.global.bg);
  const template = useSelector((state) => state.editor.global.template);
  const overlay = useSelector((state) => state.editor.global.overlay);
  const cl = useSelector((state) => state.editor.global.cl);

  const drawBg = (filter) => {
    bg.ctx.clearRect(0, 0, bg.canvas.width, bg.canvas.height);
    bg.ctx.filter = filter;
    bg.ctx.drawImage(template, 0, 0, CANVAS_HEIGHT, CANVAS_HEIGHT);
  };

  const drawCenterLabel = (filter) => {
    cl.ctx.clearRect(0, 0, cl.canvas.width, cl.canvas.height);
    const image = new Image(CANVAS_HEIGHT, CANVAS_HEIGHT);
    image.src = `${assetBaseURL}/RECORD_CENTERLABEL/Centerlabel.png`;
    cl.ctx.filter = filter;
    image.onload = () => {
      cl.ctx.drawImage(image, 0, 0, CANVAS_HEIGHT, CANVAS_HEIGHT);
    };
  };

  const setTextColor = (e) => {
    dispatch(action(e.target.value));
  };

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
    dispatch(action(filterCSS));
    dispatch(action2(e.target.value));
    if (isTemplate && template) {
      drawBg(filterCSS);
    } else if (isCL) {
      drawCenterLabel(filterCSS);
    }
  };

  const handleChange = (e) => {
    if (isFont) {
      setTextColor(e);
    } else {
      setColorFilter(e);
    }
  };

  return (
    <input
      className="color-selector"
      type="color"
      style={{ width: '50px', height: '50px' }}
      value={value}
      onChange={handleChange}
    ></input>
  );
};

const SizeSelector = ({ action, size }) => {
  const dispatch = useDispatch();
  const setStampSize = (e) => {
    dispatch(setSize(e.target.value));
    dispatch(action(e.target.value));
  };

  return (
    <div>
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
  );
};

const TextInput = ({ action, title, label }) => {
  const dispatch = useDispatch();
  const write = (e) => {
    dispatch(action(e.target.value));
  };
  return (
    <div>
      <label htmlFor={label}>{title}</label>
      <input id={label} name={label} onChange={write}></input>
    </div>
  );
};

const FontSelector = ({ action, destination }) => {
  const dispatch = useDispatch();

  const selectFont = (e) => {
    dispatch(
      action({
        class: e.target.className,
        name: getFontName(e.target.id),
      })
    );
  };

  return (
    <div className="fonts--wrapper">
      <div>Select Font</div>
      <ul className="fonts">
        {[...Array(33)].map((_, i) => {
          return (
            <li
              id={`${destination}-font-${i}`}
              className={`ff-${i} fs-100`}
              key={i}
              onClick={selectFont}
            >
              Sample
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export { ColorSelector, SizeSelector, TextInput, FontSelector };
