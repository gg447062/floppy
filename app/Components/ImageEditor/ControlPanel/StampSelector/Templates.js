import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTemplate } from '../../../../Redux/editor';
import { assetBaseURL, CANVAS_HEIGHT } from '../../../../utils';

const Templates = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.editor.filter);
  const bg = useSelector((state) => state.editor.bg);
  const bgT = useSelector((state) => state.editor.bgTexture);

  const drawBg = (e) => {
    const baseString = e.target.src.split('_')[0];

    bg.ctx.clearRect(0, 0, bg.canvas.width, bg.canvas.height);
    bgT.ctx.clearRect(0, 0, bg.canvas.width, bg.canvas.height);

    bg.ctx.filter = filter;
    if (e.target.id !== 'cover-9') {
      const bgImg = new Image(CANVAS_HEIGHT, CANVAS_HEIGHT);
      bgImg.src = `${baseString}_Cover.png`;
      bgImg.onload = () => {
        bg.ctx.drawImage(bgImg, 0, 0, bgImg.width, bgImg.height);
      };
    }

    const textureImg = new Image(CANVAS_HEIGHT, CANVAS_HEIGHT);
    textureImg.src = `${baseString}_Cover_Texture.png`;

    textureImg.onload = () => {
      bgT.ctx.drawImage(textureImg, 0, 0, textureImg.width, textureImg.height);
    };

    dispatch(setTemplate(e.target));
  };

  return (
    <div className="container stamps">
      {[...Array(15)].map((_, i) => {
        return (
          <img
            key={i}
            id={`cover-${i + 1}`}
            className={'stamp'}
            src={`${assetBaseURL}/TEMPLATES/cover-${i + 1}/${String(
              i + 1
            ).padStart(2, 0)}_Cover_Thumb.png`}
            onClick={drawBg}
          />
        );
      })}
    </div>
  );
};

export default Templates;
