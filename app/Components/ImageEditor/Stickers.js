import React from 'react';

const Stickers = ({ chooseStamp }) => {
  return (
    <div className="container stamps">
      {[...Array(15)].map((_, i) => {
        return (
          <img
            id={`sticker_${i + 1}`}
            className="stamp"
            src={`assets/STICKERS/sticker_${i + 1}.png`}
            onClick={chooseStamp}
            key={i}
          />
        );
      })}
    </div>
  );
};

export default Stickers;
