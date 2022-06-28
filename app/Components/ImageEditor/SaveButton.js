import { useMoralis, useNewMoralisObject } from 'react-moralis';
import Moralis from 'moralis/';
import { useSelector } from 'react-redux';

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
  const bgTexture = useSelector((state) => state.editor.bgTexture);
  const cl = useSelector((state) => state.editor.cl);
  const clTexture = useSelector((state) => state.editor.clTexture);

  const writeTextToCanvas = (ctx, text, posX, posY, artist = true) => {
    if (artist) {
      ctx.font = `${fontSize}px ${artistFont.name}`;
    } else {
      ctx.font = `${fontSize}px ${trackFont.className}`;
    }
    ctx.fillStyle = fontColor;
    ctx.fillText(text, posX, posY);
  };

  const drawFinalImages = () => {
    const finalBack = document.getElementById('canvas-final-back');
    const finalBackCtx = finalBack.getContext('2d');
    const finalFront = document.getElementById('canvas-final-front');
    const finalFrontCtx = finalFront.getContext('2d');

    finalFrontCtx.drawImage(cl.canvas, 0, 0);
    writeTextToCanvas(finalFrontCtx, artist, 250, 250);
    writeTextToCanvas(finalFrontCtx, track, 250, 290, false);
    finalFrontCtx.drawImage(clTexture.canvas, 0, 0);
    finalFrontCtx.drawImage(bg.canvas, 0, 0);
    finalFrontCtx.drawImage(fg.canvas, 0, 0);
    finalFrontCtx.drawImage(bgTexture.canvas, 0, 0);
    const frontImgURL = finalFront.toDataURL('image/png');

    finalBackCtx.drawImage(bg.canvas, 0, 0);
    finalBackCtx.drawImage(bgTexture.canvas, 0, 0);
    const backImgURL = finalBack.toDataURL('image/png');

    return { frontImgURL, backImgURL };
  };

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

      const objectId = saveObject({
        artist: artist,
        track: track,
        metadata: metadata,
        metadataHash: jsonHash,
      });

      console.log(objectId);
    }
  };

  const saveAndDownload = () => {
    const { frontImgURL, backImgURL } = drawFinalImages();
    saveToDatabase(frontImgURL, backImgURL, 'test');

    const a = document.createElement('a');

    a.setAttribute('href', frontImgURL);
    a.download = 'test_front.png';
    a.click();

    a.setAttribute('href', backImgURL);
    a.download = 'test_back.png';
    a.click();

    a.remove();
    reset();
  };

  return <button onClick={saveAndDownload}>save</button>;
};

export default SaveButton;
