import React from 'react';

const StampSelector = (props) => {
  const { chooseStamp } = props;
  return (
    <div id="_stamps" className="container">
      <img
        id="bassface_stamp"
        className="stamp"
        src="assets/bassface_stamp/blue.png"
        onClick={chooseStamp}
      />
      <img
        id="floppy-disk"
        className="stamp"
        src="assets/floppy-disk/blue.png"
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
  );
};

export default StampSelector;
