import React from 'react';

const CenterLabel = ({ chooseStamp }) => {
  return (
    <div className="container stamps">
      {[...Array(13)].map((_, i) => {
        return (
          <img
            id={`cl_${i + 1}`}
            className="stamp cl"
            src={`assets/CENTER_LABEL_ASSETS/cl_${i + 1}.png`}
            onClick={chooseStamp}
            key={i}
          />
        );
      })}
    </div>
  );
};

export default CenterLabel;
