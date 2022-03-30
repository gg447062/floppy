import React from 'react';

const Stamps = ({ chooseStamp }) => {
  return (
    <div className="container stamps">
      <img
        id="bassface_stamp"
        className="stamp"
        src="assets/STAMPS/bassface-stamp.png"
        onClick={chooseStamp}
      />
      <img
        id="floppy-disk"
        className="stamp"
        src="assets/STAMPS/floppy-disk-stamp.png"
        onClick={chooseStamp}
      />
      <img
        id="floppy-stamp"
        className="stamp"
        src="assets/STAMPS/floppy-stamp.png"
        onClick={chooseStamp}
      />
      <img
        id="in-n-out-stamp"
        className="stamp"
        src="assets/STAMPS/in-n-out-stamp.png"
        onClick={chooseStamp}
      />
      <img
        id="m27-stamp"
        className="stamp"
        src="assets/STAMPS/m27-stamp.png"
        onClick={chooseStamp}
      />
      <img
        id="shake-stamp"
        className="stamp"
        src="assets/STAMPS/m27-shake-stamp.png"
        onClick={chooseStamp}
      />
    </div>
  );
};

export default Stamps;
