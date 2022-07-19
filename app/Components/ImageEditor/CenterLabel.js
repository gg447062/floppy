import React from 'react';
import { useSelector } from 'react-redux';
import { assetBaseURL } from '../../utils';

const CenterLabel = ({ chooseStamp }) => {
  const cl = useSelector((state) => state.editor.cl);
  const filter = useSelector((state) => state.editor.filter);

  const drawCenterLabel = (e) => {
    cl.ctx.clearRect(0, 0, cl.canvas.width, cl.canvas.height);
    const image = new Image(500, 500);
    image.src = `${assetBaseURL}/RECORD_CENTERLABEL/Centerlabel.png`;
    cl.ctx.filter = filter;
    image.onload = () => {
      cl.ctx.drawImage(image, 0, 0, 500, 500);
    };
  };

  return (
    <div className="container stamps">
      <img
        id={`cl_image`}
        className="stamp cl"
        src={`${assetBaseURL}/RECORD_CENTERLABEL/Record.png`}
        onClick={drawCenterLabel}
      />
      {[...Array(13)].map((_, i) => {
        return (
          <img
            id={`cl_${i + 1}`}
            className="stamp cl"
            src={`${assetBaseURL}/CENTER_LABEL_ASSETS/CL_${i + 1}.png`}
            onClick={chooseStamp}
            key={i}
          />
        );
      })}
    </div>
  );
};

export default CenterLabel;
