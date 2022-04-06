import React from 'react';
import { useDispatch } from 'react-redux';
import { setFont } from '../../Redux/editor';

const Fonts = () => {
  const dispatch = useDispatch();

  const selectFont = (e) => {
    dispatch(setFont(e.target.className));
  };

  return (
    <div className="container fonts">
      <div>Select Font</div>
      <ul>
        <li>---</li>
        {[...Array(33)].map((_, i) => {
          return (
            <li
              id={`ff-${i}`}
              className={`ff-${i}`}
              key={i}
              onClick={selectFont}
            >
              {`Font ${i + 1}`}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Fonts;
