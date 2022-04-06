import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTemplate } from '../../Redux/editor';

const Templates = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.editor.filter);
  const bg = useSelector((state) => state.editor.bg[0]);
  const bgCtx = useSelector((state) => state.editor.bg[1]);
  const bgTCtx = useSelector((state) => state.editor.bgTexture[1]);

  const drawBg = (e) => {
    const baseString = e.target.src.split('_')[0];

    bgCtx.clearRect(0, 0, bg.width, bg.height);
    bgTCtx.clearRect(0, 0, bg.width, bg.height);

    bgCtx.filter = filter;
    if (e.target.id !== 'cover-13') {
      const bgImg = new Image(522, 522);
      bgImg.src = `${baseString}_Cover.png`;

      bgImg.onload = () => {
        bgCtx.drawImage(bgImg, 0, 0, bgImg.width, bgImg.height);
      };
    }

    const textureImg = new Image(522, 522);
    textureImg.src = `${baseString}_Cover_Texture.png`;

    textureImg.onload = () => {
      bgTCtx.drawImage(textureImg, 0, 0, textureImg.width, textureImg.height);
    };

    dispatch(setTemplate(e.target));
  };
  return (
    <div className="container stamps">
      <img
        id="cover-1"
        className="stamp"
        src="assets/TEMPLATES/cover-1/01_Cover_Thumb.png"
        onClick={drawBg}
      />
      <img
        id="cover-2"
        className="stamp"
        src="assets/TEMPLATES/cover-2/02_Cover_Thumb.png"
        onClick={drawBg}
      />
      <img
        id="cover-3"
        className="stamp"
        src="assets/TEMPLATES/cover-3/03_Cover_Thumb.png"
        onClick={drawBg}
      />
      <img
        id="cover-4"
        className="stamp"
        src="assets/TEMPLATES/cover-4/04_Cover_Thumb.png"
        onClick={drawBg}
      />
      <img
        id="cover-5"
        className="stamp"
        src="assets/TEMPLATES/cover-5/05_Cover_Thumb.png"
        onClick={drawBg}
      />
      <img
        id="cover-6"
        className="stamp"
        src="assets/TEMPLATES/cover-6/06_Cover_Thumb.png"
        onClick={drawBg}
      />
      <img
        id="cover-7"
        className="stamp"
        src="assets/TEMPLATES/cover-7/07_Cover_Thumb.png"
        onClick={drawBg}
      />
      <img
        id="cover-9"
        className="stamp"
        src="assets/TEMPLATES/cover-9/09_Cover_Thumb.png"
        onClick={drawBg}
      />
      <img
        id="cover-13"
        className="stamp"
        src="assets/TEMPLATES/cover-13/13_Cover_Thumb.png"
        onClick={drawBg}
      />
      <img
        id="cover-14"
        className="stamp"
        src="assets/TEMPLATES/cover-14/14_Cover_Thumb.png"
        onClick={drawBg}
      />
      <img
        id="cover-15"
        className="stamp"
        src="assets/TEMPLATES/cover-15/15_Cover_Thumb.png"
        onClick={drawBg}
      />
      <img
        id="cover-16"
        className="stamp"
        src="assets/TEMPLATES/cover-16/16_Cover_Thumb.png"
        onClick={drawBg}
      />
      <img
        id="cover-17"
        className="stamp"
        src="assets/TEMPLATES/cover-17/17_Cover_Thumb.png"
        onClick={drawBg}
      />
      <img
        id="cover-18"
        className="stamp"
        src="assets/TEMPLATES/cover-18/18_Cover_Thumb.png"
        onClick={drawBg}
      />
      <img
        id="cover-19"
        className="stamp"
        src="assets/TEMPLATES/cover-19/19_Cover_Thumb.png"
        onClick={drawBg}
      />
    </div>
  );
};

export default Templates;
