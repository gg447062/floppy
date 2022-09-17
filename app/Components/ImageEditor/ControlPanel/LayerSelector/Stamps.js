import React from 'react';
import { useSelector } from 'react-redux';
import { assetBaseURL } from '../../../../utils';
import { ColorSelector, SizeSelector } from './Controls';
import { setFilter, setSize } from '../../../../Redux/editor/stamps';

const Stamps = ({ chooseStamp }) => {
  const size = useSelector((state) => state.editor.stamps.size);
  return (
    <div className="container stamps">
      <div>
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
      <ColorSelector action={setFilter} />
      <SizeSelector action={setSize} size={size} />
    </div>
  );
};

export default Stamps;
