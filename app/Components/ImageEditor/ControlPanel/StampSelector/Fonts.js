import React from 'react';
import { useDispatch } from 'react-redux';
import { setArtistFont, setTrackFont } from '../../../../Redux/editor';
import { getFontName } from '../../../../utils';

const Fonts = ({ destination }) => {
  const dispatch = useDispatch();

  const selectFont = (e) => {
    if (destination === 'artist') {
      dispatch(
        setArtistFont({
          class: e.target.className,
          name: getFontName(e.target.id),
        })
      );
    } else {
      dispatch(
        setTrackFont({
          class: e.target.className,
          name: getFontName(e.target.id),
        })
      );
    }
  };

  return (
    <div className="fonts--wrapper">
      <div>Select Font</div>
      <ul className="fonts">
        {/* <li>---</li> */}
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

export default Fonts;
