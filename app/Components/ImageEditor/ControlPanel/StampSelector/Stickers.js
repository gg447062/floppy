import React from 'react';
import { assetBaseURL } from '../../../../utils';

const Stickers = ({ chooseStamp }) => {
  return (
    <div className="container stamps">
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
  );
};

export default Stickers;
