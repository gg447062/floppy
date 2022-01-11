import React from 'react';

const StampSelector = (props) => {
  const { chooseStamp, setColor } = props;
  return (
    <div id="selector" className="container">
      <div id="stamps" className="container">
        <img
          id="bassface_stamp"
          className="stamp selected"
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
      <div id="colors" className="container">
        <img
          id="blue"
          className="stamp"
          src="assets/stamp-colors/blue.png"
          onClick={setColor}
        />
        <img
          id="green"
          className="stamp"
          src="assets/stamp-colors/green.png"
          onClick={setColor}
        />
        <img
          id="orange"
          className="stamp"
          src="assets/stamp-colors/orange.png"
          onClick={setColor}
        />
        <img
          id="purple"
          className="stamp"
          src="assets/stamp-colors/purple.png"
          onClick={setColor}
        />
        <img
          id="red"
          className="stamp"
          src="assets/stamp-colors/red.png"
          onClick={setColor}
        />
      </div>
    </div>
  );
};

export default StampSelector;
