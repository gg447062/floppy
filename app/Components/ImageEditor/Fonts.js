import React from 'react';
import { useDispatch } from 'react-redux';
import { setFont } from '../../Redux/editor';
import { fontNames } from '../../utils';

const Fonts = () => {
  const dispatch = useDispatch();

  const selectFont = (e) => {
    dispatch(
      setFont({ class: e.target.className, name: fontNames[e.target.id] })
    );
  };

  return (
    <div className="container fonts">
      <div>Select Font</div>
      <ul>
        <li>---</li>
        {[...Array(33)].map((_, i) => {
          return (
            <li id={i} className={`ff-${i}`} key={i} onClick={selectFont}>
              Sample
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Fonts;
