import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setStamp } from '../../Redux/editor';

const StampSelector = (props) => {
  const dispatch = useDispatch();
  const stamp = useSelector((state) => state.editor.stamp);

  const chooseStamp = (e) => {
    stamp.classList.remove('selected');
    dispatch(setStamp(e.target));
    e.target.classList.add('selected');
  };
  return (
    <div id="selector" className="container">
      <div id="stamps" className="container">
        <img
          id="bassface_stamp"
          className="stamp"
          src="assets/bassface_stamp/blue.png"
          onClick={chooseStamp}
        />
        <img
          id="floppy-disk"
          className="stamp selected"
          src="assets/floppy-disk/black.png"
          onClick={chooseStamp}
        />
        <img
          id="floppy-stamp"
          className="stamp"
          src="assets/floppy-stamp/blue.png"
          onClick={chooseStamp}
        />
        <img
          id="in-n-out-stamp"
          className="stamp"
          src="assets/in-n-out-stamp/blue.png"
          onClick={chooseStamp}
        />
        <img
          id="m27-stamp"
          className="stamp"
          src="assets/m27-stamp/blue.png"
          onClick={chooseStamp}
        />
        <img
          id="shake-stamp"
          className="stamp"
          src="assets/shake-stamp/blue.png"
          onClick={chooseStamp}
        />
      </div>
    </div>
  );
};

export default StampSelector;
