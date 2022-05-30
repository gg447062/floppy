import React from 'react';
import { assetBaseURL } from '../../utils';

const Stamps = ({ chooseStamp }) => {
  return (
    <div className="container stamps">
      <img
        id="bassface_stamp"
        className="stamp"
        src={`${assetBaseURL}/STAMPS/bassface-stamp.png`}
        onClick={chooseStamp}
      />
      <img
        id="floppy-disk"
        className="stamp"
        src={`${assetBaseURL}/STAMPS/floppy-disk-stamp.png`}
        onClick={chooseStamp}
      />
      <img
        id="floppy-stamp"
        className="stamp"
        src={`${assetBaseURL}/STAMPS/floppy-stamp.png`}
        onClick={chooseStamp}
      />
      <img
        id="in-n-out-stamp"
        className="stamp"
        src={`${assetBaseURL}/STAMPS/in-n-out-stamp.png`}
        onClick={chooseStamp}
      />
      <img
        id="m27-stamp"
        className="stamp"
        src={`${assetBaseURL}/STAMPS/m27-stamps.png`}
        onClick={chooseStamp}
      />
      <img
        id="shake-stamp"
        className="stamp"
        src={`${assetBaseURL}/STAMPS/m27-shake-stamp.png`}
        onClick={chooseStamp}
      />
    </div>
  );
};

export default Stamps;
