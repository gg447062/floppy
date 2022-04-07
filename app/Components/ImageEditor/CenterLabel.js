import React from 'react';
import { useSelector } from 'react-redux';

const CenterLabel = ({ chooseStamp }) => {
  const cl = useSelector((state) => state.editor.cl);
  const filter = useSelector((state) => state.editor.filter);

  const drawCenterLabel = (e) => {
    cl.ctx.clearRect(0, 0, cl.canvas.width, cl.canvas.height);
    cl.ctx.filter = filter;
    console.log(e.target);
    cl.ctx.drawImage(e.target, 0, 0, 522, 522);
  };

  return (
    <div className="container stamps">
      <img
        id={`cl_image`}
        className="stamp cl"
        src={`assets/RECORD_CENTERLABEL/record.png`}
        onClick={drawCenterLabel}
      />
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
