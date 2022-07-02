import React, { useEffect, useState } from 'react';
import { useMoralis, useNewMoralisObject } from 'react-moralis';
import Moralis from 'moralis/';
import { useSelector } from 'react-redux';
import { cleanName, getFontName } from '../../utils';

const SaveButton = ({ reset }) => {
  const { isAuthenticated } = useMoralis();
  const { save } = useNewMoralisObject('Dubplate');
  const fontSize = useSelector((state) => state.editor.fontSize);
  const artist = useSelector((state) => state.metadata.artist);
  const track = useSelector((state) => state.metadata.track);
  const artistFont = useSelector((state) => state.editor.artistFont);
  const trackFont = useSelector((state) => state.editor.trackFont);
  const fontColor = useSelector((state) => state.editor.fontColor);
  const fg = useSelector((state) => state.editor.fg);
  const bg = useSelector((state) => state.editor.bg);
  const bgTxt = useSelector((state) => state.editor.bgTexture);
  const cl = useSelector((state) => state.editor.cl);
  const clTxt = useSelector((state) => state.editor.clTexture);
  const front = useSelector((state) => state.editor.front);
  const back = useSelector((state) => state.editor.back);

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

    return { frontImgURL, backImgURL };
  };

  const clearAndReset = () => {
    front.ctx.clearRect(0, 0, front.canvas.width, front.canvas.height);
    back.ctx.clearRect(0, 0, back.canvas.width, back.canvas.height);
    reset();
  };

  // this and saveToDatabase should be moved to another component
  const saveObject = (data) => {
    save(data, {
      onSuccess: (dubplate) => {
        return dubplate.id;
      },
      onError: (error) => {
        console.log(error);
        return error.message;
      },
    });
  };

  // will need to save audio too in the future

  const saveToDatabase = async (front, back, name) => {
    if (isAuthenticated) {
      const frontImage = new Moralis.File(`${name}_front.png`, {
        base64: front,
      });
      await frontImage.saveIPFS();
      const frontHash = frontImage.hash();

      const backImage = new Moralis.File(`${name}_back.png`, {
        base64: back,
      });
      await backImage.saveIPFS();
      const backHash = backImage.hash();

      const metadata = {
        name: track,
        artist: artist,
        description: 'a floppy dubplate',
        front: frontHash,
        back: backHash,
      };

      const jsonFile = new Moralis.File(`${name}_metadata.json`, {
        base64: btoa(JSON.stringify(metadata)),
      });

      await jsonFile.saveIPFS();
      const jsonHash = jsonFile.hash();

      const objectId = await saveObject({
        artist: artist,
        track: track,
        metadata: metadata,
        metadataHash: jsonHash,
      });
    }
  };

  const saveAndDownload = () => {
    const { frontImgURL, backImgURL } = drawFinalImages();
    saveToDatabase(
      frontImgURL,
      backImgURL,
      `${cleanName(artist)}_${cleanName(track)}`
    );
    const a = document.createElement('a');

    a.setAttribute('href', frontImgURL);
    a.download = 'test_front.png';
    a.click();

    a.setAttribute('href', backImgURL);
    a.download = 'test_back.png';
    a.click();

    a.remove();
    clearAndReset();
  };

  return <button onClick={saveAndDownload}>save</button>;
};

export default SaveButton;
