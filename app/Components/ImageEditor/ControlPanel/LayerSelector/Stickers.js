import React from 'react';
import { assetBaseURL } from '../../../../utils';
import { SizeSelector } from './Controls';
import { setSize } from '../../../../Redux/editor/stickers';

const Stickers = ({ chooseStamp }) => {
  return (
    <div className="container stamps">
      <div>
        {[...Array(15)].map((_, i) => {
          return (
            <img
              id={`sticker_${i + 1}`}
              className="stamp"
              src={`${assetBaseURL}/STICKERS/STICKER_${i + 1}.png`}
              onClick={chooseStamp}
              key={i}
            />
          );
        })}
      </div>
      <SizeSelector action={setSize} />
    </div>
  );
};

export default Stickers;
