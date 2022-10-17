import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFrontURL, setBackURL } from '../../../Redux/metadata';

const SaveButton = ({ clearCanvas, setShowUpload, setShowEditor }) => {
  const dispatch = useDispatch();
  const artist = useSelector((state) => state.metadata.artist);
  const track = useSelector((state) => state.metadata.track);
  const artistFont = useSelector((state) => state.editor.cl.artistFont);
  const trackFont = useSelector((state) => state.editor.cl.trackFont);
  // ADD ARTIST AND TRACK FONT SIZE AND COLOR
  const fontSize = useSelector((state) => state.editor.fontSize);
  const fontColor = useSelector((state) => state.editor.fontColor);
  const fg = useSelector((state) => state.editor.global.fg);
  const bg = useSelector((state) => state.editor.global.bg);
  const bgTxt = useSelector((state) => state.editor.global.bgTexture);
  const cl = useSelector((state) => state.editor.global.cl);
  const clTxt = useSelector((state) => state.editor.global.clTexture);
  const front = useSelector((state) => state.editor.global.front);
  const back = useSelector((state) => state.editor.global.back);

  const writeTextToCanvas = (ctx, text, posX, posY, artist = true) => {
    if (artist) {
      ctx.font = `${fontSize}px ${artistFont.name}`;
    } else {
      ctx.font = `${fontSize}px ${trackFont.name}`;
    }
    ctx.fillStyle = fontColor;
    ctx.fillText(text, posX, posY);
  };

  const drawFinalImages = () => {
    front.ctx.drawImage(cl.canvas, 0, 0);
    writeTextToCanvas(front.ctx, artist, 250, 250);
    writeTextToCanvas(front.ctx, track, 250, 290, false);
    front.ctx.drawImage(clTxt.canvas, 0, 0);
    front.ctx.drawImage(bg.canvas, 0, 0);
    front.ctx.drawImage(fg.canvas, 0, 0);
    front.ctx.drawImage(bgTxt.canvas, 0, 0);
    const frontImgURL = front.canvas.toDataURL('image/png');

    back.ctx.save();
    back.ctx.scale(-1, 1);
    back.ctx.drawImage(cl.canvas, 0, 0, cl.canvas.width * -1, cl.canvas.height);
    back.ctx.drawImage(
      clTxt.canvas,
      0,
      0,
      clTxt.canvas.width * -1,
      clTxt.canvas.height
    );
    back.ctx.drawImage(bg.canvas, 0, 0, bg.canvas.width * -1, bg.canvas.height);
    back.ctx.drawImage(
      bgTxt.canvas,
      0,
      0,
      bgTxt.canvas.width * -1,
      bgTxt.canvas.height
    );
    back.ctx.restore();
    const backImgURL = back.canvas.toDataURL('image/png');

    dispatch(setFrontURL(frontImgURL));
    dispatch(setBackURL(backImgURL));
  };

  const clearAndReset = () => {
    front.ctx.clearRect(0, 0, front.canvas.width, front.canvas.height);
    back.ctx.clearRect(0, 0, back.canvas.width, back.canvas.height);
    clearCanvas();
  };

  const saveAndDownload = () => {
    drawFinalImages();

    // const a = document.createElement('a');
    // a.setAttribute('href', frontImgURL);
    // a.download = 'test_front.png';
    // a.click();
    // a.remove();

    clearAndReset();
    setShowEditor(false);
    setShowUpload(true);
  };

  return (
    <div id="save" onClick={saveAndDownload}>
      {/* save */}
    </div>
  );
};

export default SaveButton;
